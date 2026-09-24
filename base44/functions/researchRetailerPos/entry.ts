import { createClientFromRequest } from 'npm:@base44/sdk@0.8.49';

const DEFAULT_BATCH = 12;
const MAX_BATCH = 25;
const CONCURRENCY = 4;

const POS_SCHEMA = {
  type: 'object',
  properties: {
    found: { type: 'boolean' },
    entries: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          pos_provider: { type: 'string' },
          source_url: { type: 'string' },
        },
        required: ['pos_provider', 'source_url'],
      },
    },
  },
  required: ['found', 'entries'],
};

function researchPrompt(company) {
  return [
    `Which point-of-sale (POS) system or retail platform does ${company} use in its airport stores?`,
    '',
    'Find the vendor and product name from a citable source: a vendor case study, a press release, a tender or contract award, trade-press coverage, the company\'s own corporate brochure or annual report, or its technology pages.',
    '',
    'Rules:',
    '- Report every POS system the company is documented to run, including different systems for different regions (for example one platform in Europe and another in North America).',
    '- Give the vendor / product name as it is written in the source (for example "NCR Voyix", "Adyen", "Aptos Store", "LS One by LS Retail", "Diebold Nixdorf TP.net", "Oracle Retail Store POS").',
    '- Only report a system you can cite with a URL; never guess.',
    '- Set found to false and return an empty entries array when nothing is documented.',
    '',
    'Return found and entries as an array of { pos_provider, source_url }.',
  ].join('\n');
}

async function researchOne(base44, company) {
  const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt: researchPrompt(company),
    add_context_from_internet: true,
    model: 'gemini_3_8_flash',
    response_json_schema: POS_SCHEMA,
  });

  const entries = Array.isArray(result?.entries) ? result.entries : [];

  const rows = [];
  const seen = new Set();
  for (const entry of entries) {
    const provider = String(entry?.pos_provider || '').trim();
    const sourceUrl = String(entry?.source_url || '').trim();
    if (!provider || !sourceUrl || provider.length > 120) continue;
    const key = provider.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({ retailer_name: company, pos_provider: provider, source_url: sourceUrl });
  }

  // Replace anything stored earlier for this company so re-runs stay clean.
  await base44.asServiceRole.entities.RetailerPosSystem.deleteMany({ retailer_name: company });

  if (rows.length) {
    await base44.asServiceRole.entities.RetailerPosSystem.bulkCreate(rows);
  } else {
    // Placeholder marks the company as researched with nothing citable found,
    // so it is not queued again.
    await base44.asServiceRole.entities.RetailerPosSystem.create({
      retailer_name: company,
      pos_provider: '',
      source_url: '',
    });
  }

  return rows.length;
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    // Scheduled / service invocations arrive without an Authorization header.
    // Interactive callers must be an admin.
    const authHeader = req.headers.get('authorization');
    if (authHeader) {
      let user = null;
      try {
        user = await base44.auth.me();
      } catch {
        user = null;
      }
      if (!user || user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const body = await req.json().catch(() => ({}));
    const batchSize = Math.min(Math.max(Number(body.batch_size) || DEFAULT_BATCH, 1), MAX_BATCH);

    const requested = Array.isArray(body.names)
      ? body.names.map((n) => String(n).trim()).filter(Boolean)
      : [];

    if (!requested.length) {
      return Response.json({ error: 'No retail operators supplied' }, { status: 400 });
    }

    const done = await base44.asServiceRole.entities.RetailerPosSystem.list('retailer_name', 1000);
    const doneNames = new Set((done || []).map((r) => String(r.retailer_name || '').toLowerCase()));

    const pending = requested.filter((n) => !doneNames.has(n.toLowerCase())).slice(0, batchSize);

    if (!pending.length) {
      return Response.json({ processed: 0, systems_stored: 0, done: true });
    }

    let stored = 0;
    const failures = [];

    // Bounded concurrency: a few operators researched at once.
    for (let i = 0; i < pending.length; i += CONCURRENCY) {
      const slice = pending.slice(i, i + CONCURRENCY);
      const results = await Promise.all(
        slice.map(async (company) => {
          try {
            return await researchOne(base44, company);
          } catch (err) {
            failures.push({ company, error: String(err?.message || err) });
            return 0;
          }
        }),
      );
      stored += results.reduce((a, b) => a + b, 0);
    }

    return Response.json({
      processed: pending.length,
      systems_stored: stored,
      batch_full: pending.length === batchSize,
      failures,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}