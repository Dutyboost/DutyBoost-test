import DutyBoostLogo from "./DutyBoostLogo";

// Commission rates
const AGENCY_REVENUE_SHARE = "20%"; // of DutyBoost's 5% = effectively 1% of ticket value
const RETAILER_COMMISSION = "5%";

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
                    <td className="px-4 py-3 text-muted-foreground">Access to the DutyBoost platform, dashboard, and API integration for issuing DutyCredits to travelers. No setup or subscription fees.</td>
                    <td className="px-4 py-3 text-right font-medium">€0</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 font-medium">New Revenue Stream — Commission Share</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      For every DutyCredit voucher redeemed by one of your travelers at a participating airport retailer, DutyBoost collects a 5% platform fee from the retailer based on the gross sales value. As a DutyBoost partner, your agency receives <strong>{AGENCY_REVENUE_SHARE} of that 5%</strong> as a revenue share — automatically credited monthly. This is a fully passive new revenue stream with zero operational overhead.
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-primary">{AGENCY_REVENUE_SHARE} of 5%<br/><span className="text-xs text-muted-foreground font-normal">(= 1% of gross sales value)</span></td>
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
                    <td className="px-4 py-3 font-medium">DutyCredit Redemption Platform Fee</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Each time a traveler redeems a DutyCredit voucher in your store, DutyBoost charges a platform fee of <strong>{RETAILER_COMMISSION} of the gross sales value</strong> generated by that traveler at point of sale. <strong>DutyBoost only charges this fee upon an actual confirmed DutyCredit redemption — there are no charges without a redemption.</strong> The discount given to the traveler is fully funded by DutyBoost — you only pay the platform fee on actual sales driven by DutyCredit redemptions.
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-primary">{RETAILER_COMMISSION} of gross sales value<br/><span className="text-xs text-muted-foreground font-normal">per redeemed voucher</span></td>
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
              <p>• DutyBoost pays your agency 20% of the 5% platform fee collected from airport retailers on each confirmed DutyCredit redemption.</p>
              <p>• Revenue share payouts are calculated monthly and transferred to your registered bank account by the 15th of the following month.</p>
              <p>• There are no costs, fees, or charges to the agency — this is a purely additive revenue stream.</p>
              <p>• A minimum payout threshold of €10 applies; amounts below this are carried over to the next month.</p>
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