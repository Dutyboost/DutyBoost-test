import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function RetailerOnePager() {
  const { t } = useTranslation();
  const handleDownloadPDF = async () => {
    const element = document.querySelector('.print-content');
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4', { compress: true });
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= 297;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }
    pdf.save('retailer-one-pager.pdf');
  };

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 25%, hsl(216 45% 96%) 50%, hsl(220 40% 97%) 75%, hsl(216 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar — hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/retailer-showcase">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </button>
        </Link>
        <LanguageSwitcher />
        <Button onClick={handleDownloadPDF} className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
          <Printer className="w-4 h-4" /> {t('common.download')}
        </Button>
      </div>

      {/* A4-style content */}
      <div className="print-content max-w-[794px] mx-auto px-8 py-2 print:py-0 print:px-0 bg-white flex flex-col" style={{ minHeight: '1122px' }}>

        {/* Header */}
        <div className="text-center border-b-2 border-orange-500 pb-1">
          <DutyBoostLogo height={200} />
        </div>

        {/* MAIN CONTENT — grows to fill space */}
        <div className="flex-1 space-y-6">

          {/* HEADLINE SECTION */}
          <div className="text-center space-y-0.5">
            <h1 className="text-2xl font-heading font-bold leading-tight">Turn passing travelers into paying customers — automatically</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto">
              DutyBoost sends pre-qualified, high-intent shoppers directly to your store with a personalized spending credit. Travelers receive a flat DutyCredit — €10 on €70–€99, €30 on €100–€199, €45 on €200–€299, or €60 on €300+ spend. You only pay 2.5% (max €25) when we deliver a sale.
            </p>
          </div>

          {/* SECTION 1: WHY IT MATTERS */}
          <div className="space-y-1.5">
            <h2 className="font-heading font-bold text-xs border-b-2 border-orange-500 pb-1 text-orange-700 uppercase tracking-wide">01 — Why DutyBoost Matters for Airport Retailers</h2>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-slate-50 rounded p-3 border border-border">
                <p className="font-semibold text-xs">Most travelers walk past without buying</p>
                <p className="text-xs text-muted-foreground leading-snug">Airport footfall is high but conversion is low. Travelers need a compelling reason to stop, enter, and spend. DutyBoost provides exactly that — a personalized discount incentive tied to their trip.</p>
              </div>
              <div className="bg-slate-50 rounded p-3 border border-border">
                <p className="font-semibold text-xs">Pre-qualified buyers, not random browsers</p>
                <p className="text-xs text-muted-foreground leading-snug">DutyCredits are tied to confirmed travel bookings. Every customer arriving with a QR code is a real traveler at your airport, with a specific credit to spend — at your store.</p>
              </div>
              <div className="bg-slate-50 rounded p-3 border border-border">
                <p className="font-semibold text-xs">Performance-based: you only pay for sales</p>
                <p className="text-xs text-muted-foreground leading-snug">No upfront fees, no subscription costs. DutyBoost's commission applies only when a DutyCredit is redeemed at your location. Zero risk, pure upside.</p>
              </div>
              <div className="bg-slate-50 rounded p-3 border border-border">
                <p className="font-semibold text-xs">Higher basket size per transaction</p>
                <p className="text-xs text-muted-foreground leading-snug">Travelers with a DutyCredit are motivated to spend more. The credit applies on purchases of €70+, driving higher transaction values and larger baskets per visit.</p>
              </div>
            </div>
          </div>

          {/* SECTION 2: HOW IT WORKS */}
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-xs border-b-2 border-orange-500 pb-1 text-orange-700 uppercase tracking-wide">02 — How DutyBoost Works</h2>
            <div className="grid grid-cols-4 gap-2">
              {[
                { num: "01", title: "Traveler is booked", desc: "A traveler books a trip through a DutyBoost-connected travel partner" },
                { num: "02", title: "Credit sent by email", desc: "They receive a personalized QR code with a spending credit — before departure" },
                { num: "03", title: "They visit your store", desc: "Traveler presents their QR at checkout. You scan and validate in seconds" },
                { num: "04", title: "Transaction recorded", desc: "DutyBoost logs the sale, applies the discount, and invoices you monthly" },
              ].map(s => (
                <div key={s.num} className="bg-orange-50 rounded p-2 border border-orange-100">
                  <p className="text-lg font-heading font-bold text-orange-300 leading-none">{s.num}</p>
                  <p className="font-semibold text-xs text-orange-800 mt-0.5">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: WHAT IT BRINGS */}
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-xs border-b-2 border-orange-500 pb-1 text-orange-700 uppercase tracking-wide">03 — What DutyBoost Brings to Airport Retailers</h2>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold text-orange-700 leading-tight">€10–€60</p>
                <p className="font-semibold text-xs">flat DutyCredit tiers</p>
                <p className="text-xs text-muted-foreground leading-snug">€10 on €70–€99 · €30 on €100–€199 · €45 on €200–€299 · €60 on €300+ — every redemption drives a qualified, high-value purchase</p>
              </div>
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold text-orange-700 leading-tight">2.5% (max €25)</p>
                <p className="font-semibold text-xs">fee on confirmed redemptions only</p>
                <p className="text-xs text-muted-foreground leading-snug">No setup fees, no subscription. You pay 2.5% of gross sales, capped at €25 per transaction. The DutyCredit is fully covered by the platform — not deducted from your margin.</p>
              </div>
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold text-orange-700 leading-tight">&lt; 1 day</p>
                <p className="font-semibold text-xs">to go live</p>
                <p className="text-xs text-muted-foreground leading-snug">Simple QR scanner setup. No POS integration required to get started</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs">🛍️ More store footfall</h3>
                <p className="text-xs text-muted-foreground leading-snug">Targeted travelers are directed to participating stores — not just browsing the terminal.</p>
              </div>
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs">📊 Real-time dashboard</h3>
                <p className="text-xs text-muted-foreground leading-snug">Track redemptions, transaction values, and monthly invoices in your retailer portal.</p>
              </div>
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs">⚡ Zero operational burden</h3>
                <p className="text-xs text-muted-foreground leading-snug">DutyBoost handles credit generation, distribution, and billing — you just scan and sell.</p>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="border-t-2 border-orange-500 pt-2 text-center space-y-1">
            <p className="font-heading font-bold text-sm">Ready to convert more travelers into customers?</p>
            <div className="flex items-center justify-center gap-6">
              <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800 transition-colors">dutyboost.com</a>
            </div>
          </div>

        </div>{/* end flex-1 */}

        {/* Legal footer — pinned to bottom of A4 */}
        <div className="text-center pb-2 pt-1">
          <p className="text-xs text-muted-foreground">DutyBoost. All rights reserved. 2026. KVK: 42053181</p>
        </div>

      </div>
    </div>
  );
}