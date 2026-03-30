import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const adminEmails = ['israelmartis@gmail.com', 'admin@dutyboost.com'];
    
    const allUsers = await base44.asServiceRole.entities.User.list();
    
    for (const email of adminEmails) {
      const userRecord = allUsers.find(u => u.email === email);
      if (userRecord) {
        if (userRecord.role !== 'admin') {
          await base44.asServiceRole.entities.User.update(userRecord.id, { role: 'admin' });
        }
      }
    }

    return Response.json({ 
      success: true, 
      message: `Both ${adminEmails.join(' and ')} now have admin access`
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});