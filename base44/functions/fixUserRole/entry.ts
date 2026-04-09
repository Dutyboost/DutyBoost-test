/**
 * fixUserRole — one-time fix to re-invite and correct role for a specific user
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { email, role } = await req.json();
    if (!email || !role) return Response.json({ error: 'email and role required' }, { status: 400 });

    // Re-invite the user
    await base44.users.inviteUser(email, role);

    // Try to update role if user record exists
    const users = await base44.asServiceRole.entities.User.filter({ email });
    if (users.length > 0) {
      await base44.asServiceRole.entities.User.update(users[0].id, { role });
    }

    return Response.json({ success: true, email, role, userExists: users.length > 0 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});