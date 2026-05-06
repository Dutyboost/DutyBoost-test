import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const voucherId = body?.event?.entity_id;
    if (!voucherId) return Response.json({ skipped: true });

    // Use the payload data directly if available (entity automation), else list and find
    const voucher = body?.data || (await base44.asServiceRole.entities.Voucher.list('-created_date', 1000)).find(v => v.id === voucherId);
    if (!voucher || voucher.status !== 'redeemed') return Response.json({ skipped: true });

    // Check agency notification preferences
    if (voucher.agency_email) {
      const users = await base44.asServiceRole.entities.User.filter({ email: voucher.agency_email });
      const agencyUser = users[0];
      const prefsRaw = agencyUser?.notification_prefs;
      let prefs = {};
      try { prefs = prefsRaw ? JSON.parse(prefsRaw) : {}; } catch { prefs = {}; }
      
      if (prefs.redeemed === false) {
        return Response.json({ skipped: 'agency notifications disabled' });
      }

      await base44.asServiceRole.integrations.Core.SendEmail({
        to: voucher.agency_email,
        subject: `DutyCredit Redeemed — Booking ${voucher.booking_id}`,
        body: `
          <div style="font-family: sans-serif; max-width: 520px; margin: auto; padding: 24px;">
            <h2 style="color: #4f46e5;">✅ DutyCredit Redeemed</h2>
            <p>A traveler has just redeemed a DutyCredit linked to one of your bookings.</p>
            <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
              <tr><td style="padding: 8px; color: #666;">Booking ID</td><td style="padding: 8px; font-weight: bold;">${voucher.booking_id}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding: 8px; color: #666;">Voucher Code</td><td style="padding: 8px; font-weight: bold;">${voucher.voucher_code}</td></tr>
              <tr><td style="padding: 8px; color: #666;">DutyCredit Value</td><td style="padding: 8px; font-weight: bold;">€${voucher.discount_percentage}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding: 8px; color: #666;">Airport</td><td style="padding: 8px; font-weight: bold;">${voucher.airport}</td></tr>
            </table>
            <p style="color: #666; font-size: 13px;">To manage your notification settings, visit your <a href="https://dutyboost.com/dashboard" style="color:#4f46e5;">Agency Dashboard</a>.</p>
          </div>
        `
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('notifyVoucherRedeemed error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});