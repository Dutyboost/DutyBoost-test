import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const applications = await base44.asServiceRole.entities.SignupApplication.list('', 1000);
    let deleted = 0;

    for (const app of applications) {
      await base44.asServiceRole.entities.SignupApplication.delete(app.id);
      deleted++;
    }

    return Response.json({ success: true, deleted });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});