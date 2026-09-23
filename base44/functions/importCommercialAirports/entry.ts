import { createClientFromRequest } from 'npm:@base44/sdk@0.8.49';

const CSV_URL = 'https://davidmegginson.github.io/ourairports-data/airports.csv';
const CHUNK = 200;

// Minimal RFC-4180 CSV parser (handles quoted fields and escaped quotes)
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); rows.push(row); row = []; field = '';
    } else if (c !== '\r') {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function countryName(iso) {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(iso) || iso;
  } catch {
    return iso;
  }
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const authHeader = req.headers.get('authorization');
    if (authHeader) {
      const user = await base44.auth.me().catch(() => null);
      if (!user || user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const res = await fetch(CSV_URL);
    if (!res.ok) throw new Error(`Dataset fetch failed: ${res.status}`);
    const rows = parseCsv(await res.text());
    if (rows.length < 2) throw new Error('Dataset empty');

    const header = rows[0];
    const idx = {
      type: header.indexOf('type'),
      name: header.indexOf('name'),
      country: header.indexOf('iso_country'),
      city: header.indexOf('municipality'),
      scheduled: header.indexOf('scheduled_service'),
      iata: header.indexOf('iata_code'),
    };

    const candidates = [];
    const seen = new Set();
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      const type = (r[idx.type] || '').trim();
      const iata = (r[idx.iata] || '').trim().toUpperCase();
      const scheduled = (r[idx.scheduled] || '').trim().toLowerCase();
      const name = (r[idx.name] || '').trim();
      const iso = (r[idx.country] || '').trim();
      if (!iata || iata.length !== 3 || !name) continue;
      if (scheduled !== 'yes') continue;
      if (!['large_airport', 'medium_airport', 'small_airport'].includes(type)) continue;
      if (seen.has(iata)) continue;
      seen.add(iata);
      candidates.push({
        code: iata,
        name,
        city: (r[idx.city] || '').trim(),
        country: countryName(iso),
        stores_researched: false,
      });
    }

    const existing = await base44.asServiceRole.entities.Airport.list('code', 5000);
    const existingCodes = new Set(existing.map((a) => (a.code || '').toUpperCase()));

    const toCreate = candidates.filter((c) => !existingCodes.has(c.code));

    let created = 0;
    for (let i = 0; i < toCreate.length; i += CHUNK) {
      const chunk = toCreate.slice(i, i + CHUNK);
      await base44.asServiceRole.entities.Airport.bulkCreate(chunk);
      created += chunk.length;
    }

    return Response.json({
      dataset_total_rows: rows.length - 1,
      commercial_with_iata: candidates.length,
      already_on_file: candidates.length - toCreate.length,
      created,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}