import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

// Normalise a company name for fuzzy comparison
function normaliseName(name = '') {
  return name
    .toLowerCase()
    .replace(/\b(b\.?v\.?|n\.?v\.?|v\.?o\.?f\.?|bvba|ltd|gmbh|inc|llc|group|holding|holdings)\b/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function namesMatch(a = '', b = '') {
  const na = normaliseName(a);
  const nb = normaliseName(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.includes(nb) || nb.includes(na)) return true;
  // Levenshtein-lite: allow 2 char diff for short names
  if (Math.abs(na.length - nb.length) > 3) return false;
  let diff = 0;
  const longer = na.length > nb.length ? na : nb;
  const shorter = na.length > nb.length ? nb : na;
  for (let i = 0; i < shorter.length; i++) {
    if (longer[i] !== shorter[i]) diff++;
  }
  diff += longer.length - shorter.length;
  return diff <= 2;
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const { kvk, vat, company } = await req.json();

  if (!kvk || !vat || !company) {
    return Response.json({ error: 'Missing required fields: kvk, vat, company' }, { status: 400 });
  }

  const KVK_API_KEY = Deno.env.get('KVK_API_KEY');
  const testMode = !KVK_API_KEY;

  const errors = [];
  let kvkCompanyName = null;
  let vatCompanyName = null;

  // ── 1. KVK Lookup ────────────────────────────────────────────────────────
  if (testMode) {
    // No API key yet — skip KVK check, return a clear test-mode notice
    console.log('[validateKvk] TEST MODE: KVK_API_KEY not set, skipping KVK lookup');
  } else {
    // Format: 8-digit number only
    const kvkClean = kvk.replace(/\D/g, '');
    if (kvkClean.length !== 8) {
      errors.push({ field: 'kvk', message: 'KVK number must be exactly 8 digits.' });
    } else {
      try {
        const kvkRes = await fetch(
          `https://api.kvk.nl/api/v2/zoeken?kvkNummer=${kvkClean}`,
          {
            headers: {
              'apikey': KVK_API_KEY,
              'Accept': 'application/json',
            },
          }
        );

        if (kvkRes.status === 404) {
          errors.push({ field: 'kvk', message: 'KVK number not found. Please enter a valid, active Dutch KVK number.' });
        } else if (!kvkRes.ok) {
          errors.push({ field: 'kvk', message: 'KVK lookup failed. Please try again.' });
        } else {
          const kvkData = await kvkRes.json();
          const results = kvkData?.resultaten || [];
          if (results.length === 0) {
            errors.push({ field: 'kvk', message: 'KVK number not found. Please enter a valid, active Dutch KVK number.' });
          } else {
            const entry = results[0];
            kvkCompanyName = entry.naam || entry.handelsnaam || '';

            if (!namesMatch(kvkCompanyName, company)) {
              errors.push({
                field: 'company',
                message: `Company name does not match KVK records. KVK shows: "${kvkCompanyName}". Please enter your registered company name.`,
              });
            }

            // Check active status
            if (entry.indActief === false || entry.indActief === 'Nee') {
              errors.push({ field: 'kvk', message: 'This KVK registration is inactive. Only active businesses can register.' });
            }
          }
        }
      } catch (e) {
        console.error('[validateKvk] KVK API error:', e.message);
        errors.push({ field: 'kvk', message: 'Could not reach the KVK registry. Please try again.' });
      }
    }
  }

  // ── 2. EU VIES VAT Validation ─────────────────────────────────────────────
  const vatClean = vat.toUpperCase().replace(/\s/g, '');
  const vatCountry = vatClean.slice(0, 2);
  const vatNumber = vatClean.slice(2);

  if (vatCountry !== 'NL') {
    errors.push({ field: 'vat', message: 'Only Dutch VAT numbers (NL…) are supported at this time.' });
  } else {
    try {
      const viesRes = await fetch(
        `https://ec.europa.eu/taxation_customs/vies/rest-api/ms/${vatCountry}/vat/${vatNumber}`,
        { headers: { 'Accept': 'application/json' } }
      );

      if (!viesRes.ok) {
        errors.push({ field: 'vat', message: 'VAT validation service unavailable. Please try again.' });
      } else {
        const viesData = await viesRes.json();

        if (!viesData.isValid) {
          errors.push({ field: 'vat', message: 'VAT number is not valid or not registered in the EU VIES system.' });
        } else {
          vatCompanyName = viesData.name || '';

          // Cross-check VAT company name with KVK company name if we have both
          if (!testMode && kvkCompanyName && vatCompanyName && vatCompanyName !== '---') {
            if (!namesMatch(kvkCompanyName, vatCompanyName)) {
              errors.push({
                field: 'vat',
                message: `VAT registration (${vatCompanyName}) does not match the KVK registration (${kvkCompanyName}). Please ensure your KVK and VAT numbers belong to the same company.`,
              });
            }
          }
        }
      }
    } catch (e) {
      console.error('[validateKvk] VIES error:', e.message);
      // VIES can be flaky — soft error, don't block
      console.warn('[validateKvk] VIES unreachable, skipping VAT check');
    }
  }

  return Response.json({
    valid: errors.length === 0,
    testMode,
    kvkCompanyName,
    vatCompanyName,
    errors,
  });
});