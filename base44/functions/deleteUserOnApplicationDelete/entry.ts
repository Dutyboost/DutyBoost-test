import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data } = await req.json();

    if (event.type !== 'delete') {
      return Response.json({ success: true });
    }

    const { email } = data;
    if (!email) {
      return Response.json({ success: true });
    }

    const users = await base44.asServiceRole.entities.User.filter({ email });
    if (users.length === 0) {
      return Response.json({ success: true });
    }

    const user = users[0];
    await base44.asServiceRole.entities.User.delete(user.id);

    return Response.json({ success: true, deletedUserId: user.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});