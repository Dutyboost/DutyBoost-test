import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { visit_id, ip_address } = await req.json();

    if (!ip_address || !visit_id) {
      return Response.json({ error: 'Missing visit_id or ip_address' }, { status: 400 });
    }

    // Skip private/local IPs
    if (
      ip_address.startsWith('127.') ||
      ip_address.startsWith('192.168.') ||
      ip_address.startsWith('10.') ||
      ip_address.startsWith('::1')
    ) {
      return Response.json({ skipped: true });
    }

    const apiKey = Deno.env.get('IPINFO_API_KEY');
    const resp = await fetch(`https://ipinfo.io/${ip_address}/json?token=${apiKey}`);
    if (!resp.ok) {
      return Response.json({ error: 'IPinfo lookup failed' }, { status: 502 });
    }
    const data = await resp.json();

    // org field is like "AS12345 Company Name" — extract name
    let org_name = null;
    let org_domain = null;
    if (data.org) {
      org_name = data.org.replace(/^AS\d+\s+/, '').trim();
    }
    if (data.hostname) {
      // Extract root domain from hostname
      const parts = data.hostname.split('.');
      if (parts.length >= 2) {
        org_domain = parts.slice(-2).join('.');
      }
    }

    await base44.asServiceRole.entities.PageVisit.update(visit_id, {
      org_name: org_name || undefined,
      org_domain: org_domain || undefined,
    });

    return Response.json({ ok: true, org_name, org_domain });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});