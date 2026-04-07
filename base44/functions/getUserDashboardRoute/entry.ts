import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if email has a SignupApplication (retailer or agency)
    const apps = await base44.asServiceRole.entities.SignupApplication.filter({ email: user.email });
    if (apps.length > 0) {
      const app = apps[0];
      if (app.business_type === 'Airport Retailer') {
        return Response.json({ route: '/retailer-dashboard' });
      } else if (app.business_type === 'Travel Agency') {
        return Response.json({ route: '/agency-portal' });
      }
    }

    // Check if email is in Retailer entity
    const retailers = await base44.asServiceRole.entities.Retailer.filter({ owner_email: user.email });
    if (retailers.length > 0) {
      return Response.json({ route: '/retailer-dashboard' });
    }

    // Default to traveler portal
    return Response.json({ route: '/traveler-portal' });
  } catch (error) {
    console.error('Error routing user:', error);
    return Response.json({ route: '/traveler-portal' });
  }
});