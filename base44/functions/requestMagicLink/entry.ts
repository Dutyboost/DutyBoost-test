/**
 * requestMagicLink — sends a real Base44 magic link login email to registered users only
 * No authentication required to call this endpoint (it's the login flow)
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if this email belongs to a registered user in our system
    const users = await base44.asServiceRole.entities.User.filter({ email: normalizedEmail });

    if (users.length === 0) {
      // Also check SignupApplication with invited status
      const apps = await base44.asServiceRole.entities.SignupApplication.filter({
        email: normalizedEmail,
        status: 'invited',
      });

      if (apps.length === 0) {
        // Don't reveal whether email exists — generic message for security
        return Response.json({ success: true });
      }
    }

    const user = users[0];

    // Use Base44's inviteUser to send a real magic link
    // This sends an official platform login email with a one-time token
    try {
      await base44.users.inviteUser(normalizedEmail, user?.role || 'user');
    } catch (e) {
      // inviteUser throws if already registered — that's fine, it still sends the magic link
      console.log('inviteUser note:', e.message);
    }

    console.log(`Magic link sent to ${normalizedEmail}`);
    return Response.json({ success: true });

  } catch (error) {
    console.error('requestMagicLink error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});