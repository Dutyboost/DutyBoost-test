import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { applicationId, action, rejectionReason } = await req.json();
    if (!applicationId || !action) {
      return Response.json({ error: 'Missing applicationId or action' }, { status: 400 });
    }

    const apps = await base44.asServiceRole.entities.SignupApplication.filter({ id: applicationId });
    const app = apps[0];
    if (!app) return Response.json({ error: 'Application not found' }, { status: 404 });

    if (action === 'reject') {
      await base44.asServiceRole.entities.SignupApplication.update(applicationId, { status: 'rejected' });
      // Notify admin of rejection (they are an app user so SendEmail works)
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: user.email,
        subject: `Application rejected: ${app.full_name}`,
        body: `<p>You rejected the application from <strong>${app.full_name}</strong> (${app.email}).</p>${rejectionReason ? `<p>Reason: ${rejectionReason}</p>` : ''}`
      });
      return Response.json({ success: true, action: 'rejected' });
    }

    // Approve
    const userRole = app.business_type === 'Travel Agency' ? 'agency' : 'retailer';
    await base44.asServiceRole.entities.SignupApplication.update(applicationId, { status: 'invited' });

    // Create retailer record for Airport Retailers
    if (app.business_type === 'Airport Retailer' && app.airport) {
      const existingRetailers = await base44.asServiceRole.entities.Retailer.filter({ owner_email: app.email });
      if (existingRetailers.length === 0) {
        await base44.asServiceRole.entities.Retailer.create({
          store_name: app.company,
          airport: app.airport,
          category: app.store_category || 'Retail',
          description: `${app.company} at ${app.airport}`,
          owner_email: app.email
        });
      }
    }

    // Invite user — platform sends its own login email automatically
    await base44.users.inviteUser(app.email, 'user');

    // Update to custom role after invite
    try {
      const existingUsers = await base44.asServiceRole.entities.User.filter({ email: app.email });
      if (existingUsers.length > 0) {
        await base44.asServiceRole.entities.User.update(existingUsers[0].id, { role: userRole });
      }
    } catch (e) {
      console.log("Role update error:", e.message);
    }

    return Response.json({ success: true, action: 'approved' });
  } catch (error) {
    console.error("approveApplication error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});