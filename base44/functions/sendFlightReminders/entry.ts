import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Find all active vouchers with a travel date tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const bookings = await base44.asServiceRole.entities.Booking.filter({ travel_date: tomorrowStr });
    let sent = 0;

    for (const booking of bookings) {
      if (!booking.traveler_email) continue;

      // Check traveler notification pref stored on the booking
      if (booking.flight_reminder_disabled === true) continue;

      // Find the voucher for this booking
      const vouchers = await base44.asServiceRole.entities.Voucher.filter({ booking_id: booking.booking_id });
      const voucher = vouchers.find(v => v.status === 'active');
      if (!voucher) continue;

      await base44.asServiceRole.integrations.Core.SendEmail({
        to: booking.traveler_email,
        subject: `✈️ Your flight is tomorrow — don't forget your DutyCredit!`,
        body: `
          <div style="font-family: sans-serif; max-width: 520px; margin: auto; padding: 24px;">
            <h2 style="color: #4f46e5;">✈️ Your flight is tomorrow!</h2>
            <p>You have an active DutyCredit to use at <strong>${voucher.airport}</strong> airport. Show it at any participating DutyBoost retailer to redeem your discount.</p>
            <div style="background: #f5f3ff; border: 1px solid #c4b5fd; border-radius: 12px; padding: 16px; margin: 16px 0; text-align: center;">
              <p style="color: #666; margin: 0 0 4px;">Your Discount</p>
              <p style="font-size: 36px; font-weight: bold; color: #4f46e5; margin: 0;">up to €60</p>
              <p style="color: #888; font-size: 13px; margin: 8px 0 0;">Code: <strong>${voucher.voucher_code}</strong></p>
            </div>
            <p style="text-align: center;">
              <a href="https://dutyboost.com/user-guide?booking_id=${booking.booking_id}" style="background:#4f46e5; color:white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">View My DutyCredit</a>
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 24px;">
              Don't want these reminders? 
              <a href="https://dutyboost.com/user-guide?unsubscribe=1&booking_id=${booking.booking_id}" style="color:#999;">Unsubscribe</a>
            </p>
          </div>
        `
      });
      sent++;
    }

    return Response.json({ success: true, reminders_sent: sent });
  } catch (error) {
    console.error('sendFlightReminders error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});