import DutyBoostLogo from "./DutyBoostLogo";

// Commission rates
const AGENCY_COMMISSION = "2.5%";
const RETAILER_COMMISSION = "10%";

export default function PurchaseOrderDoc({ businessType, formData, poNumber }) {
  const isAgency = businessType === "Travel Agency";
  const today = new Date().toLocaleDateString("nl-NL", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div className="bg-white border border-border rounded-xl p-8 text-sm font-body text-foreground space-y-6" id="purchase-order-doc">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-border">
        <DutyBoostLogo height={80} />
        <div className="text-right space-y-1">
          <p className="text-lg font-heading font-bold text-foreground">Purchase Order</p>
          <p className="text-muted-foreground text-xs">PO-{poNumber}</p>
          <p className="text-muted-foreground text-xs">Date: {today}</p>
        </div>
      </div>

      {/* Parties */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">From (Service Provider)</p>
          <p className="font-semibold">DutyBoost B.V.</p>
          <p className="text-muted-foreground">Amsterdam, The Netherlands</p>
          <p className="text-muted-foreground">KVK: 94891234</p>
          <p className="text-muted-foreground">VAT: NL866038978B01</p>
          <p className="text-muted-foreground">hello@dutyboost.com</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">To (Client)</p>
          <p className="font-semibold">{formData.company}</p>
          <p className="text-muted-foreground">{formData.fullName}</p>
          <p className="text-muted-foreground">{formData.email}</p>
          {formData.kvk && <p className="text-muted-foreground">KVK: {formData.kvk}</p>}
          {formData.vat && <p className="text-muted-foreground">VAT: {formData.vat}</p>}
        </div>
      </div>

      {/* Service Description */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Service Description</p>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold">Service</th>
                <th className="text-left px-4 py-2.5 font-semibold">Description</th>
                <th className="text-right px-4 py-2.5 font-semibold">Fee</th>
              </tr>
            </thead>
            <tbody>
              {isAgency ? (
                <>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-medium">DutyBoost Platform Access</td>
                    <td className="px-4 py-3 text-muted-foreground">Access to the DutyBoost platform, dashboard, and API integration for issuing DutyCredits to travelers.</td>
                    <td className="px-4 py-3 text-right font-medium">€0 setup</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-medium">DutyCredit Redemption Commission</td>
                    <td className="px-4 py-3 text-muted-foreground">Commission charged per confirmed DutyCredit redemption at a participating airport retailer, calculated on the total ticket value of the associated booking.</td>
                    <td className="px-4 py-3 text-right font-medium text-primary">{AGENCY_COMMISSION} per redemption</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-medium">DutyBoost Platform Access</td>
                    <td className="px-4 py-3 text-muted-foreground">Listing on the DutyBoost retailer network, dashboard access for scanning and voucher management, and monthly transaction reporting.</td>
                    <td className="px-4 py-3 text-right font-medium">€0 setup</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-medium">Voucher Redemption Platform Fee</td>
                    <td className="px-4 py-3 text-muted-foreground">Platform fee per confirmed DutyCredit voucher redemption in your store, calculated on the total transaction value at point of sale. The discount is funded by DutyBoost — only the platform fee is charged to the retailer.</td>
                    <td className="px-4 py-3 text-right font-medium text-primary">{RETAILER_COMMISSION} per redemption</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Terms */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Payment Terms</p>
        <div className="bg-muted/30 rounded-lg p-4 space-y-1.5 text-muted-foreground">
          {isAgency ? (
            <>
              <p>• Fees are charged per confirmed DutyCredit redemption only — no upfront or monthly costs.</p>
              <p>• Invoices are generated monthly and collected automatically via your registered payment method.</p>
              <p>• A one-time €0.01 mandate verification will be processed upon registration (refunded immediately).</p>
            </>
          ) : (
            <>
              <p>• Fees are charged per confirmed voucher redemption only — no upfront or monthly costs (unless opted for Monthly Invoice billing).</p>
              <p>• Monthly Invoice customers receive an invoice on the 1st of each month; payment due within 14 days.</p>
              <p>• A one-time €0.01 mandate verification will be processed upon registration (refunded immediately).</p>
            </>
          )}
          <p>• This agreement is governed by Dutch law. Disputes shall be submitted to the courts of Amsterdam.</p>
        </div>
      </div>

      {/* Signature */}
      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
        <div className="space-y-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Signed by Client</p>
          <div className="border-b border-border pb-1 text-muted-foreground text-xs">{formData.fullName} — {formData.company}</div>
          <p className="text-xs text-muted-foreground">By accepting digitally in the DutyBoost onboarding flow, you confirm agreement to the terms above.</p>
        </div>
        <div className="space-y-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">On behalf of DutyBoost B.V.</p>
          <div className="border-b border-border pb-1 text-muted-foreground text-xs">DutyBoost B.V. — Amsterdam</div>
          <p className="text-xs text-muted-foreground">This purchase order is automatically issued upon platform onboarding.</p>
        </div>
      </div>
    </div>
  );
}