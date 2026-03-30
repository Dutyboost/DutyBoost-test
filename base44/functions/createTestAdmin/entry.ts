import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Create admin user
    await base44.users.inviteUser('admin@dutyboost.com', 'admin');
    
    return Response.json({ success: true, message: 'Admin user invited. Check your email for the magic link.' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});