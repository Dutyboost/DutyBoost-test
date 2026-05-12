import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function AgencyOnePager() {
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
    pdf.save('agency-one-pager.pdf');
  };

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 25%, hsl(216 45% 96%) 50%, hsl(220 40% 97%) 75%, hsl(216 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar — hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/agency-showcase">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </button>
        </Link>
        <LanguageSwitcher />
        <Button onClick={handleDownloadPDF} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Printer className="w-4 h-4" /> {t('common.download')}
        </Button>
      </div>

      {/* A4-style content */}
      <div className="print-content max-w-[794px] mx-auto px-8 py-2 print:py-0 print:px-0 bg-white flex flex-col" style={{ minHeight: '1122px' }}>

        {/* Header */}
        <div className="text-center border-b-2 border-green-500 pb-1">
          <DutyBoostLogo height={200} />
        </div>

        {/* MAIN CONTENT — grows to fill space */}
        <div className="flex-1 space-y-6">

        {/* HEADLINE SECTION */}
        <div className="text-center space-y-0.5">
          <h1 className="text-2xl font-heading font-bold leading-tight">Turning every booking into a loyalty asset and extra revenue</h1>
          <p className="text-muted-foreground text-xs max-w-xl mx-auto">
            DutyBoost turns every booking into a loyalty asset for your customers — and a new revenue stream for you. Travelers earn a flat DutyCredit based on their airport basket (min. €70). Fully automated. Zero operational impact.
          </p>
        </div>

        {/* SECTION 1: WHY IT MATTERS */}
        <div className="space-y-1.5">
          <h2 className="font-heading font-bold text-xs border-b-2 border-green-500 pb-1 text-green-700 uppercase tracking-wide">01 — Why DutyBoost Matters for Travel Partners</h2>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-50 rounded p-3 border border-border">
              <p className="font-semibold text-xs">Travelers expect more than a ticket</p>
              <p className="text-xs text-muted-foreground leading-snug">Today's travelers look for travel partners that add value beyond the booking. DutyBoost gives you a tangible, personalized financial spending perk to offer at no cost to you.</p>
            </div>
            <div className="bg-slate-50 rounded p-3 border border-border">
              <p className="font-semibold text-xs">Loyalty without a loyalty program</p>
              <p className="text-xs text-muted-foreground leading-snug">No points, no complex schemes. Just a real shopping spending credit waiting for your customer at the airport — tied directly to their booking with you.</p>
            </div>
            <div className="bg-slate-50 rounded p-3 border border-border">
              <p className="font-semibold text-xs">A reason to come back</p>
              <p className="text-xs text-muted-foreground leading-snug">Travelers who associate their airport experience with your brand are more likely to book again — and recommend you to others.</p>
            </div>
            <div className="bg-slate-50 rounded p-3 border border-border">
              <p className="font-semibold text-xs">Revenue you're currently leaving on the table</p>
              <p className="text-xs text-muted-foreground leading-snug">Every confirmed booking has untapped commission potential. DutyBoost captures it automatically — with no extra work from your team.</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: HOW IT WORKS */}
        <div className="space-y-1">
          <h2 className="font-heading font-bold text-xs border-b-2 border-green-500 pb-1 text-green-700 uppercase tracking-wide">02 — How DutyBoost Works</h2>
          <div className="grid grid-cols-4 gap-2">
            {[
              { num: "01", title: "Booking confirmed", desc: "Customer books a trip through your website or application" },
              { num: "02", title: "Credit auto-generated", desc: "DutyBoost creates a DutyCredit (€5–€60 flat tier) with a minimum basket spend of €70" },
              { num: "03", title: "Delivered by email", desc: "Traveler receives their confirmation email with their DutyCredit QR code included and ready for use at the airport — no app needed" },
              { num: "04", title: "Redeemed at airport", desc: "Customer shops at participating airport stores → you automatically earn commission" },
            ].map(s => (
              <div key={s.num} className="bg-green-50 rounded p-2 border border-green-100">
                <p className="text-lg font-heading font-bold text-green-300 leading-none">{s.num}</p>
                <p className="font-semibold text-xs text-green-800 mt-0.5">{s.title}</p>
                <p className="text-xs text-muted-foreground leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: WHAT IT BRINGS */}
        <div className="space-y-1">
          <h2 className="font-heading font-bold text-xs border-b-2 border-green-500 pb-1 text-green-700 uppercase tracking-wide">03 — What DutyBoost Brings to Travel Partners</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="border border-border rounded p-2 text-center">
              <p className="text-xl font-heading font-bold text-green-700 leading-tight">Up to €5</p>
              <p className="font-semibold text-xs">commission per redemption</p>
              <p className="text-xs text-muted-foreground leading-snug">20% of DutyBoost's 2.5% platform fee per transaction, capped at €5 — earned automatically, no sales effort required</p>
            </div>
            <div className="border border-border rounded p-2 text-center">
              <p className="text-xl font-heading font-bold text-green-700 leading-tight">0% fees</p>
              <p className="font-semibold text-xs">no cost to you, ever</p>
              <p className="text-xs text-muted-foreground leading-snug">DutyBoost is free for travel partners. Commission flows in from confirmed redemptions — paid monthly with full dashboard reporting</p>
            </div>
            <div className="border border-border rounded p-2 text-center">
              <p className="text-xl font-heading font-bold text-green-700 leading-tight">&lt; 1 day</p>
              <p className="font-semibold text-xs">to go live</p>
              <p className="text-xs text-muted-foreground leading-snug">Simple snippet integration. We handle everything else end-to-end</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="border border-border rounded p-2">
              <h3 className="font-heading font-bold text-xs">🤝 Stronger customer loyalty</h3>
              <p className="text-xs text-muted-foreground leading-snug">A memorable, personalized perk tied to every booking you make.</p>
            </div>
            <div className="border border-border rounded p-2">
              <h3 className="font-heading font-bold text-xs">💰 New passive revenue</h3>
              <p className="text-xs text-muted-foreground leading-snug">Commission flows in from airport spend — no additional sales, no manual work.</p>
            </div>
            <div className="border border-border rounded p-2">
              <h3 className="font-heading font-bold text-xs">⚡ Zero operational burden</h3>
              <p className="text-xs text-muted-foreground leading-snug">DutyBoost handles credit creation, delivery, redemption, and payouts automatically.</p>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="border-t-2 border-green-500 pt-2 text-center space-y-1">
          <p className="font-heading font-bold text-sm">Ready to turn your bookings into loyalty and revenue?</p>
          <div className="flex items-center justify-center gap-6">
            <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-green-700 underline underline-offset-2 hover:text-green-800 transition-colors">dutyboost.com</a>
            <a href="/?contact=1" className="text-xs font-semibold text-green-700 underline underline-offset-2 hover:text-green-800 transition-colors">
              Contact us
            </a>
          </div>
        </div>

        </div>{/* end flex-1 */}

        {/* Legal footer — pinned to bottom of A4 */}
        <div className="text-center pb-2 pt-1">
          <p className="text-xs text-muted-foreground">DutyBoost · KvK: 42053181 · dutyboost.com</p>
        </div>

      </div>
    </div>
  );
}