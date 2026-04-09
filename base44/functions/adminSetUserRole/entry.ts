/**
 * adminSetUserRole — admin-only function to force-set a user's role
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

    // Use asServiceRole to update the user
    const users = await base44.asServiceRole.entities.User.filter({ email });
    if (users.length === 0) {
      return Response.json({ error: `No user found with email: ${email}` }, { status: 404 });
    }

    const targetUser = users[0];
    console.log(`Updating user ${email} (id: ${targetUser.id}) from role '${targetUser.role}' to '${role}'`);

    await base44.asServiceRole.entities.User.update(targetUser.id, { role });

    // Verify the update
    const updated = await base44.asServiceRole.entities.User.filter({ email });
    const newRole = updated[0]?.role;

    return Response.json({ success: true, email, old_role: targetUser.role, new_role: newRole });

  } catch (error) {
    console.error('adminSetUserRole error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});