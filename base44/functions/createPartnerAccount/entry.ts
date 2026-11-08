import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { PARTNER_VERTICALS } from '../../shared/partnerVerticals.ts';

const norm = (v: unknown) => String(v ?? "").trim().toLowerCase();

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch((e: any) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const company_name = String(body.company_name || "").trim();
    const vertical = String(body.vertical || "").trim();
    const contact_email = norm(body.contact_email);

    if (!company_name || !contact_email) {
      return Response.json({ error: "Company name and login email are required" }, { status: 400 });
    }
    if (!PARTNER_VERTICALS[vertical]) {
      return Response.json({ error: "Choose a dashboard for this partner" }, { status: 400 });
    }

    const listResult = await base44.asServiceRole.entities.PartnerAccount.list("-created_date", 500);
    const accounts: any[] = Array.isArray(listResult) ? listResult : listResult?.items || [];
    const existing = accounts.find((a: any) => norm(a.contact_email) === contact_email && a.vertical === vertical);
    if (existing) {
      return Response.json({ error: "This login already has that dashboard" }, { status: 409 });
    }

    const account = await base44.asServiceRole.entities.PartnerAccount.create({
      company_name,
      vertical,
      contact_email,
      contact_name: String(body.contact_name || "").trim() || null,
      annual_flow: Number(body.annual_flow) || 0,
      status: "invited",
    });

    return Response.json({ account });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}