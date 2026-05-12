import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

const GradientDivider = () => (
  <div style={{ height: '2px', background: 'linear-gradient(to right, #3b82f6, #14b8a6, #f59e0b)', width: '100%' }} />
);

export default function AgencyOnePager() {
  const { t } = useTranslation();

  const handleDownloadPDF = async () => {
    const element = document.querySelector('.print-content');
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4', { compress: true });
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('travel-partner-one-pager.pdf');
  };

  const steps = [
    { num: "01", title: "Booking confirmed", desc: "Customer books a trip through your website or application" },
    { num: "02", title: "Credit auto-generated", desc: "DutyBoost creates a DutyCredit (€5–€60 flat tier) with a minimum basket spend of €70" },
    { num: "03", title: "Delivered by email", desc: "Traveler receives their DutyCredit QR code directly in their confirmation email — no app needed" },
    { num: "04", title: "Redeemed at airport", desc: "Customer shops at participating airport stores → you automatically earn commission" },
  ];

  const why = [
    { title: "Travelers expect more than a ticket", desc: "Today's travelers look for travel partners that add value beyond their booking. DutyBoost gives a tangible, personalised spending perk to them through you." },
    { title: "Loyalty without a loyalty program", desc: "No points, no complex schemes. Just a real shopping credit waiting at the airport — tied directly to their booking with you." },
    { title: "A reason to come back", desc: "Travelers who associate their airport experience with your brand are more likely to book again — and recommend you to others." },
    { title: "Revenue you're currently leaving on the table", desc: "Every confirmed booking has untapped commission potential. DutyBoost captures it automatically for you — with no extra work from your team." },
  ];

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 50%, hsl(216 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      {/* Print toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/agency-showcase">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </button>
        </Link>
        <LanguageSwitcher />
        <Button onClick={handleDownloadPDF} className="gap-2" style={{ background: 'linear-gradient(to right, #3b82f6, #14b8a6)' }}>
          <Printer className="w-4 h-4" /> {t('common.download')}
        </Button>
      </div>

      {/* A4 content */}
      <div
        className="print-content max-w-[794px] mx-auto px-8 py-6 print:py-0 print:px-0 bg-white flex flex-col"
        style={{ minHeight: '1122px', maxHeight: '1122px', overflow: 'hidden' }}
      >
        {/* Header */}
        <div className="text-center pb-2">
          <DutyBoostLogo height={110} />
        </div>
        <GradientDivider />

        <div className="flex-1 flex flex-col justify-between">

          {/* Headline */}
          <div className="text-center py-3">
            <h1 className="text-lg font-heading font-bold leading-tight">Turning every booking into a loyalty asset and extra revenue</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">
              DutyBoost turns every booking into a loyalty asset for your customers — and a new revenue stream for you. Travelers earn a flat DutyCredit based on their airport basket (min. €70). Fully automated. Zero operational impact.
            </p>
          </div>

          {/* Section 1 */}
          <div className="py-2">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: '#1d4ed8' }}>01 — Why DutyBoost Matters for Travel Partners</h2>
            <div className="mb-1.5"><GradientDivider /></div>
            <div className="grid grid-cols-2 gap-2">
              {why.map(c => (
                <div key={c.title} className="bg-slate-50 rounded p-3 border border-border">
                  <p className="font-semibold text-xs mb-0.5">{c.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <div className="py-2">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: '#0f766e' }}>02 — How DutyBoost Works</h2>
            <div className="mb-1.5"><GradientDivider /></div>
            <div className="grid grid-cols-4 gap-2">
              {steps.map(s => (
                <div key={s.num} className="bg-teal-50 rounded p-3 border border-teal-100">
                  <p className="text-lg font-heading font-bold text-teal-300 leading-none">{s.num}</p>
                  <p className="font-semibold text-xs text-teal-800 mt-1">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 */}
          <div className="py-2">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: '#b45309' }}>03 — What DutyBoost Brings to Travel Partners</h2>
            <div className="mb-1.5"><GradientDivider /></div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#3b82f6' }}>Up to €5</p>
                <p className="font-semibold text-xs mt-0.5">commission per redemption</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">20% of DutyBoost's 2.5% platform fee per transaction — earned automatically, no sales effort required</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#14b8a6' }}>0% fees</p>
                <p className="font-semibold text-xs mt-0.5">no cost to you, ever</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">DutyBoost is free for travel partners. Commission flows from confirmed redemptions — paid monthly with full reporting</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#f59e0b' }}>&lt; 1 day</p>
                <p className="font-semibold text-xs mt-0.5">to go live</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">Simple snippet integration. We handle everything else end-to-end</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">🤝 Stronger customer loyalty</h3>
                <p className="text-xs text-muted-foreground leading-snug">A memorable, personalized perk tied to every booking you make.</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">💰 New passive revenue</h3>
                <p className="text-xs text-muted-foreground leading-snug">Commission flows in from airport spend — no additional sales, no manual work.</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">⚡ Zero operational burden</h3>
                <p className="text-xs text-muted-foreground leading-snug">DutyBoost handles credit creation, delivery, redemption, and payouts automatically.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
          <GradientDivider />
          <div className="text-center py-4">
            <p className="font-heading font-bold text-sm">Ready to turn your bookings into loyalty and revenue?</p>
            <div className="flex items-center justify-center gap-6 mt-0.5">
              <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 transition-colors">dutyboost.com</a>
              <a href="/?contact=1" className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 transition-colors">Contact us</a>
            </div>
          </div>
          </div>

        </div>

        {/* Legal footer */}
        <div className="text-center pb-1">
          <p className="text-xs text-muted-foreground">DutyBoost · KvK: 42053181 · dutyboost.com</p>
        </div>

      </div>
    </div>
  );
}