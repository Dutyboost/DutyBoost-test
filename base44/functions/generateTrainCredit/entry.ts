import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      booking_ref,
      train_operator,
      departure_station,
      arrival_station,
      traveler_email,
      traveler_name,
      ticket_price,
    } = body;

    if (!booking_ref || !train_operator || !departure_station || !arrival_station || !traveler_email || !ticket_price) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate credit value: 5% of ticket price, min €10, max €75
    const creditValue = Math.min(75, Math.max(10, Math.round(ticket_price * 0.05)));
    const tokenId = `TC-${booking_ref}-${Date.now()}`;

    // Expiry: 72 hours from now
    const expiry = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

    const credit = await base44.asServiceRole.entities.TrainCredit.create({
      token_id: tokenId,
      train_operator,
      departure_station,
      balance: creditValue,
      remaining_balance: creditValue,
      expiry,
      status: 'active',
      traveler_email,
      traveler_name: traveler_name || '',
    });

    // Send notification email
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: traveler_email,
      subject: `Your DutyCredit for ${departure_station} is ready — €${creditValue} to spend before you board`,
      body: `
        <h2>You've unlocked €${creditValue} at ${departure_station} shops!</h2>
        <p>Hi ${traveler_name || 'there'},</p>
        <p>Thanks for booking with <strong>${train_operator}</strong>. Before you board your train from <strong>${departure_station}</strong> to <strong>${arrival_station}</strong>, use your exclusive DutyCredit at participating station retailers.</p>
        <p><strong>Your DutyCredit code:</strong> ${tokenId}</p>
        <p><strong>Value:</strong> €${creditValue}</p>
        <p><strong>Valid at:</strong> ${departure_station} station retailers</p>
        <p><strong>Expires:</strong> 72 hours from booking</p>
        <p>Minimum spend: €50 at a single retailer. Show your QR code at checkout.</p>
        <p>Safe travels!</p>
        <p>— The DutyBoost Team</p>
      `,
    });

    return Response.json({ success: true, credit, token_id: tokenId, credit_value: creditValue });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});