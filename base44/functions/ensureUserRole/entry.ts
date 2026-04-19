/**
 * ensureUserRole — called on first dashboard load
 *
 * Checks the current user's role. If unset, looks up their SignupApplication
 * and assigns the correct role (agency / retailer).
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // If user already has a proper custom role, nothing to do
    if (user.role && user.role !== 'user' && user.role !== 'admin') {
      return Response.json({ role: user.role, updated: false });
    }
    // Admins don't need role assignment
    if (user.role === 'admin') {
      return Response.json({ role: user.role, updated: false });
    }

    // Find matching invited application
    const apps = await base44.asServiceRole.entities.SignupApplication.filter({
      email: user.email,
      status: 'invited',
    });

    if (apps.length === 0) {
      return Response.json({ role: user.role || 'user', updated: false });
    }

    const app = apps[0];
    const role = app.business_type === 'Travel Partner' ? 'agency' : 'retailer';

    // Update user role
    const users = await base44.asServiceRole.entities.User.filter({ email: user.email });
    if (users.length > 0) {
      await base44.asServiceRole.entities.User.update(users[0].id, { role });
    }

    console.log(`Assigned role '${role}' to ${user.email}`);
    return Response.json({ role, updated: true });

  } catch (error) {
    console.error('ensureUserRole error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});