import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { PARTNER_VERTICALS } from '../../shared/partnerVerticals.ts';

const norm = (v: unknown) => String(v ?? "").trim().toLowerCase();

const matches = (a: unknown, b: unknown) => {
  const x = norm(a);
  const y = norm(b);
  if (!x || !y) return false;
  return x === y || x.includes(y) || y.includes(x);
};

const asList = (res: any): any[] => (Array.isArray(res) ? res : res?.items || []);

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch((e: any) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const email = norm(user.email);
    const accounts = asList(await base44.asServiceRole.entities.PartnerAccount.list("-created_date", 500));
    const account = accounts.find((a: any) => norm(a.contact_email) === email) || null;
    if (!account) return Response.json({ account: null });

    const config = PARTNER_VERTICALS[account.vertical];
    if (!config) return Response.json({ account, error: "Unknown dashboard" }, { status: 400 });
    if (account.status === "suspended") return Response.json({ account, suspended: true });

    const flow = Number(account.annual_flow) || 0;
    const flowNote = flow > 0 ? "" : "Add the partner's annual flow on the account to see penetration and the full chain.";

    if (config.side === "travel") {
      const tokens = asList(
        await base44.asServiceRole.entities.DutyCreditToken.filter(
          { travel_type: config.travelType },
          "-created_date",
          2000
        )
      );
      const mine = tokens.filter(
        (t: any) => matches(t.commission_partner, account.company_name) || matches(t.airline, account.company_name)
      );
      const redeemed = mine.filter((t: any) => t.status === "redeemed");
      const bought = redeemed.reduce((sum: number, t: any) => sum + (Number(t.basket_value) || 0), 0);

      const groups = new Map<string, any>();
      mine.forEach((t: any) => {
        const label = String(t.airport || "").trim() || "Not recorded";
        const row = groups.get(label) || { label, claims: 0, redeemed: 0, bought: 0 };
        row.claims += 1;
        if (t.status === "redeemed") {
          row.redeemed += 1;
          row.bought += Number(t.basket_value) || 0;
        }
        groups.set(label, row);
      });
      const rows = [...groups.values()].sort((a, b) => b.bought - a.bought);

      return Response.json({
        account,
        claims: mine.length,
        redeemed: redeemed.length,
        bought,
        flow,
        flowNote,
        flowLabel: config.flowUnit,
        rows,
        rowHeading: "Your activity by departure point",
        units: rows.length,
      });
    }

    // Retail verticals: only the stores this partner owns.
    const retailers = asList(await base44.asServiceRole.entities.Retailer.list("-created_date", 2000));
    const myStores = retailers.filter((r: any) => norm(r.owner_email) === email);
    const storeIds = myStores.map((r: any) => r.id);
    const storeNames = new Map<string, string>(myStores.map((r: any) => [r.id, r.store_name || "Unnamed store"]));

    const redemptions = storeIds.length
      ? asList(
          await base44.asServiceRole.entities.DutyCreditToken.filter(
            { status: "redeemed", redeemed_retailer_id: { $in: storeIds } },
            "-created_date",
            2000
          )
        )
      : [];

    const bought = redemptions.reduce((sum: number, t: any) => sum + (Number(t.basket_value) || 0), 0);
    const purchases = redemptions.filter((t: any) => Number(t.basket_value) > 0);

    const groups = new Map<string, any>();
    redemptions.forEach((t: any) => {
      const label = storeNames.get(t.redeemed_retailer_id) || "Unassigned store";
      const row = groups.get(label) || { label, claims: 0, redeemed: 0, bought: 0 };
      row.claims += 1;
      if (Number(t.basket_value) > 0) {
        row.redeemed += 1;
        row.bought += Number(t.basket_value) || 0;
      }
      groups.set(label, row);
    });
    const rows = [...groups.values()].sort((a, b) => b.bought - a.bought);

    return Response.json({
      account,
      claims: redemptions.length,
      redeemed: purchases.length,
      bought,
      flow,
      flowNote,
      flowLabel: config.flowUnit,
      rows,
      rowHeading: "Your activity by store",
      units: myStores.length,
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}