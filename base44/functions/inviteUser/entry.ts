import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, fullName, company, businessType, website, kvk, vat, bookingSystem, airport, storeCategory } = await req.json();

    if (!email || !fullName || !company || !businessType) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save application to database
    await base44.asServiceRole.entities.SignupApplication.create({
      full_name: fullName,
      email,
      company,
      business_type: businessType,
      website: website || null,
      kvk: kvk || null,
      vat: vat || null,
      booking_system: bookingSystem || null,
      airport: airport || null,
      store_category: storeCategory || null,
      status: 'pending'
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});