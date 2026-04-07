import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { applicationId, bankAccountName, bankIban } = await req.json();

    if (!applicationId || !bankAccountName || !bankIban) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Store bank details for payout processing
    await base44.asServiceRole.entities.SignupApplication.update(applicationId, {
      bank_account_name: bankAccountName,
      bank_iban: bankIban,
    });

    return Response.json({ success: true, message: 'Payout setup initialized' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});