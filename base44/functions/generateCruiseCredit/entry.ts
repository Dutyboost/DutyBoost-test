import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      voyage_id,
      cruise_line,
      ship_name,
      port_of_call,
      cabin_number,
      passenger_email,
      passenger_name,
      ticket_price,
    } = body;

    if (!ship_name || !port_of_call || !passenger_email || !ticket_price) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Credit value: 5% of the fare, min €10, max €75
    const creditValue = Math.min(75, Math.max(10, Math.round(Number(ticket_price) * 0.05)));
    const tokenId = `CC-${voyage_id || 'VOY'}-${Date.now()}`;

    // Valid for 72 hours from issue
    const expiry = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

    const credit = await base44.asServiceRole.entities.CruiseCredit.create({
      token_id: tokenId,
      voyage_id: voyage_id || '',
      cruise_line: cruise_line || '',
      ship_name,
      port_of_call,
      cabin_number: cabin_number || '',
      passenger_name: passenger_name || '',
      passenger_email,
      balance: creditValue,
      remaining_balance: creditValue,
      expiry,
      status: 'active',
    });

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: passenger_email,
      subject: `Your €${creditValue} port DutyCredit for ${port_of_call} is ready`,
      body: `
        <h2>You've unlocked €${creditValue} to spend at ${port_of_call}</h2>
        <p>Hi ${passenger_name || 'there'},</p>
        <p>Thanks for sailing with <strong>${cruise_line || 'us'}</strong> on <strong>${ship_name}</strong>. During your stop in <strong>${port_of_call}</strong>, use your exclusive DutyCredit at participating port retailers.</p>
        <p><strong>Your DutyCredit code:</strong> ${tokenId}</p>
        <p><strong>Value:</strong> €${creditValue}</p>
        <p><strong>Valid at:</strong> ${port_of_call} partner retailers</p>
        <p><strong>Expires:</strong> 72 hours from issue</p>
        <p>Minimum spend: €50 at a single retailer. Show your QR code at checkout.</p>
        <p>Enjoy your port call!</p>
        <p>— The DutyBoost Team</p>
      `,
    });

    return Response.json({ success: true, credit, token_id: tokenId, credit_value: creditValue });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}