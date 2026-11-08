import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VERTICAL_BY_KEY, TRAVEL_VERTICALS, RETAIL_VERTICALS } from "@/lib/partnerVerticals";
import { fmtNum } from "@/utils/formatNumber";
import { Loader2, UserPlus } from "lucide-react";

const EMPTY = { company_name: "", vertical: "", contact_name: "", contact_email: "", annual_flow: "" };

/**
 * One account per partner company: the dashboard it opens is fixed here, so the
 * login can only ever reach its own vertical and its own figures.
 */
export default function PartnerAccountsTab() {
  const [accounts, setAccounts] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const load = () => {
    base44.entities.PartnerAccount
      .list("-created_date", 200)
      .then((list) => setAccounts(list || []))
      .catch(() => setAccounts([]));
  };

  useEffect(load, []);

  const set = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await base44.functions.invoke("createPartnerAccount", {
        ...form,
        annual_flow: Number(form.annual_flow) || 0,
      });

      // The platform sends the invitation; the partner sets their own password.
      let invited = true;
      try {
        await base44.users.inviteUser(form.contact_email, "user");
      } catch {
        invited = false;
      }

      setMessage({
        type: "ok",
        text: invited
          ? `${form.company_name} added. An invitation to set the login password has been sent to ${form.contact_email}.`
          : `${form.company_name} added. The invitation could not be sent — invite this email from App Users if the person has no access yet.`,
      });
      setForm(EMPTY);
      load();
    } catch (error) {
      setMessage({ type: "error", text: error?.response?.data?.error || "The account could not be created." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <form onSubmit={submit} className="bg-card rounded-2xl border border-border p-5 sm:p-6 space-y-4">
        <div>
          <h3 className="font-heading font-bold">Create a partner account</h3>
          <p className="text-sm text-muted-foreground mt-1">
            The partner is linked to one dashboard. On sign-in the app opens that dashboard and shows only that
            company's figures. Travel partners are matched on their carrier or partner name in the DutyCredits; retail
            partners on the stores that list this login as owner email.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="company_name">Partner company</Label>
            <Input id="company_name" value={form.company_name} onChange={set("company_name")} placeholder="e.g. KLM" required />
          </div>

          <div className="space-y-1.5">
            <Label>Dashboard</Label>
            <Select value={form.vertical} onValueChange={(v) => setForm((f) => ({ ...f, vertical: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose the partner's dashboard" />
              </SelectTrigger>
              <SelectContent>
                <p className="px-2 py-1.5 text-xs uppercase tracking-wide text-muted-foreground">Travel partners</p>
                {TRAVEL_VERTICALS.map((v) => (
                  <SelectItem key={v.key} value={v.key}>{v.label}</SelectItem>
                ))}
                <p className="px-2 py-1.5 text-xs uppercase tracking-wide text-muted-foreground">Travel retail partners</p>
                {RETAIL_VERTICALS.map((v) => (
                  <SelectItem key={v.key} value={v.key}>{v.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact_name">Contact name</Label>
            <Input id="contact_name" value={form.contact_name} onChange={set("contact_name")} placeholder="Optional" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact_email">Login email</Label>
            <Input id="contact_email" type="email" value={form.contact_email} onChange={set("contact_email")} placeholder="name@company.com" required />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="annual_flow">Annual flow</Label>
            <Input id="annual_flow" type="number" min="0" value={form.annual_flow} onChange={set("annual_flow")} placeholder="Passengers, visitors or nights per year" />
            <p className="text-xs text-muted-foreground">
              Feeds the turnover chain as the flow term for this partner only.
            </p>
          </div>
        </div>

        {message && (
          <p className={`text-sm ${message.type === "error" ? "text-destructive" : "text-emerald-600"}`}>{message.text}</p>
        )}

        <Button type="submit" disabled={saving} className="gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
          Create account
        </Button>
      </form>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5 sm:p-6 pb-3">
          <h3 className="font-heading font-bold">Partner accounts</h3>
          <p className="text-sm text-muted-foreground mt-1">Each login below opens exactly one dashboard.</p>
        </div>

        {!accounts ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : accounts.length === 0 ? (
          <p className="px-5 sm:px-6 pb-6 text-sm text-muted-foreground">No partner accounts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="text-left font-medium px-5 sm:px-6 py-2">Company</th>
                  <th className="text-left font-medium px-3 py-2">Dashboard</th>
                  <th className="text-left font-medium px-3 py-2">Login</th>
                  <th className="text-right font-medium px-3 py-2">Annual flow</th>
                  <th className="text-left font-medium px-5 sm:px-6 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id} className="border-b border-border last:border-0">
                    <td className="px-5 sm:px-6 py-2.5 font-medium">{account.company_name}</td>
                    <td className="px-3 py-2.5">{VERTICAL_BY_KEY[account.vertical]?.label || account.vertical}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{account.contact_email}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{fmtNum(account.annual_flow)}</td>
                    <td className="px-5 sm:px-6 py-2.5">
                      <Badge variant={account.status === "active" ? "default" : "secondary"}>{account.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}