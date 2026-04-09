/**
 * assignRoleOnUserCreate — triggered by entity automation on User create
 *
 * When a new user registers, checks if there's an approved SignupApplication
 * for their email and assigns the correct role (agency / retailer).
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    if (payload.event?.type !== 'create') {
      return Response.json({ skipped: true });
    }

    const user = payload.data;
    if (!user?.email) return Response.json({ skipped: true, reason: 'No email' });

    // Find matching invited application
    const apps = await base44.asServiceRole.entities.SignupApplication.filter({
      email: user.email,
      status: 'invited',
    });

    if (apps.length === 0) {
      console.log(`No matching application for ${user.email}`);
      return Response.json({ skipped: true, reason: 'No matching application' });
    }

    const app = apps[0];
    const role = app.business_type === 'Travel Agency' ? 'agency' : 'retailer';

    await base44.asServiceRole.entities.User.update(user.id, { role });

    console.log(`Assigned role '${role}' to ${user.email}`);
    return Response.json({ success: true, email: user.email, role });

  } catch (error) {
    console.error('assignRoleOnUserCreate error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});