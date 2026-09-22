import { createClientFromRequest } from 'npm:@base44/sdk@0.8.49';

const DEFAULT_BATCH = 6;
const MAX_BATCH = 10;

const STORE_SCHEMA = {
  type: 'object',
  properties: {
    source_url: { type: 'string' },
    stores: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          category: { type: 'string' },
        },
        required: ['name'],
      },
    },
  },
  required: ['source_url', 'stores'],
};

function researchPrompt(airport) {
  return [
    `Compile a factual retail directory for ${airport.name} (IATA ${airport.code}) in ${airport.city}, ${airport.country}.`,
    '',
    'Steps:',
    "1. Find the airport operator's OWN official website (the authority / operator domain).",
    '2. Open its shop, retail and duty-free directory pages.',
    '3. List every shop, store and retail outlet named on those official pages.',
    '',
    'Strict rules:',
    '- Only include names that literally appear on the official airport website.',
    '- Use the trading name exactly as written there.',
    '- Never invent, guess, translate or pad the list with typical airport brands.',
    '- Do not use Wikipedia, news articles, blogs, third-party airport guides or retailer corporate sites as the source.',
    '- If the official site has no shop directory, or you cannot reach it, return an empty stores array and an empty source_url.',
    '- A generic phrase such as "Duty Free" may only be listed if that is genuinely the outlet name.',
    '',
    'Return source_url (the exact official page you read the shops from) and stores as an array of { name, category }.',
    'category must be one of: Duty Free, Fashion, Jewellery & Watches, Beauty & Cosmetics, Electronics, Souvenirs & Gifts, Food & Beverage, Convenience, Pharmacy, Books & News, Other.',
  ].join('\n');
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

    const pending = await base44.asServiceRole.entities.Airport.filter(
      { stores_researched: false },
      'code',
      batchSize,
    );

    if (!pending.length) {
      return Response.json({ processed: 0, stores_stored: 0, batch_full: false, done: true });
    }

    let stored = 0;
    const failures = [];
    const codes = [];

    for (const airport of pending) {
      codes.push(airport.code);
      try {
        const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
          prompt: researchPrompt(airport),
          add_context_from_internet: true,
          model: 'gemini_3_8_flash',
          response_json_schema: STORE_SCHEMA,
        });

        const sourceUrl = String(result?.source_url || '').trim();
        const stores = Array.isArray(result?.stores) ? result.stores : [];

        const rows = [];
        const seen = new Set();
        for (const s of stores) {
          const name = String(s?.name || '').trim();
          if (!name || name.length > 120) continue;
          const key = name.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          rows.push({
            airport_code: airport.code,
            airport_name: airport.name,
            store_name: name,
            category: String(s?.category || '').trim(),
            source_url: sourceUrl,
          });
        }

        if (rows.length && sourceUrl) {
          await base44.asServiceRole.entities.AirportStore.bulkCreate(rows);
          stored += rows.length;
        }
      } catch (err) {
        failures.push({ code: airport.code, error: String(err?.message || err) });
      }

      await base44.asServiceRole.entities.Airport.update(airport.id, { stores_researched: true });
    }

    return Response.json({
      processed: pending.length,
      codes,
      stores_stored: stored,
      batch_full: pending.length === batchSize,
      failures,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}