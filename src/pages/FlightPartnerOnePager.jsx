import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

const GradientDivider = () => (
  <div style={{ height: '2px', background: 'linear-gradient(to right, #3b82f6, #14b8a6, #f59e0b)', width: '100%' }} />
);

export default function FlightPartnerOnePager() {
  const handleDownloadPDF = async () => {
    const element = document.querySelector('.print-content');
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4', { compress: true });
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('flight-partner-one-pager.pdf');
  };

  const steps = [
    { num: "01", title: "Booking confirmation", desc: "Traveler completes a flight booking on your platform." },
    { num: "02", title: "DutyCredit issued", desc: "DutyBoost automatically attaches a personalized QR voucher to the confirmation email." },
    { num: "03", title: "Traveler shops at airport", desc: "The traveler redeems their DutyCredit at participating retail stores airside." },
    { num: "04", title: "You earn commission", desc: "DutyBoost pays you a per-redemption commission — no admin required." },
  ];

  const why = [
    { title: "New revenue stream, zero effort", desc: "Commission flows automatically for every redemption tied to your bookings. No account management, no invoicing from your side." },
    { title: "Strengthen traveler loyalty", desc: "Every booking now comes with a tangible reward at the airport — travelers associate that value with your brand." },
    { title: "Zero integration overhead", desc: "A single lightweight booking confirmation snippet or API call is all it takes to start issuing DutyCredits." },
    { title: "Works for all route types", desc: "Short-haul, long-haul, domestic — every flight booking with airport departure qualifies for a DutyCredit." },
  ];

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 50%, hsl(216 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </Link>
        <LanguageSwitcher />
        <Button onClick={handleDownloadPDF} className="gap-2" style={{ background: 'linear-gradient(to right, #3b82f6, #14b8a6)' }}>
          <Printer className="w-4 h-4" /> Download PDF
        </Button>
      </div>

      <div
        className="print-content max-w-[794px] mx-auto px-8 py-6 print:py-0 print:px-0 bg-white flex flex-col"
        style={{ minHeight: '1122px', maxHeight: '1122px', overflow: 'hidden' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2">
          <DutyBoostLogo height={90} />
          <div className="text-right">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-200 text-blue-700 bg-blue-50">Flight Partner Program</span>
          </div>
        </div>
        <GradientDivider />

        <div className="flex-1 flex flex-col justify-between">

          {/* Headline */}
          <div className="text-center py-3">
            <h1 className="text-lg font-heading font-bold leading-tight">Turn Every Flight Booking Into Airport Retail Commission</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">
              DutyBoost connects your flight confirmations to airport retail — automatically. Travelers receive a personalized DutyCredit discount voucher with every booking, and you earn a commission every time they redeem it at the airport.
            </p>
          </div>

          {/* Section 1 */}
          <div className="py-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#1d4ed8' }}>Why Flight Partners Join DutyBoost</h2>
            <div className="mb-2"><GradientDivider /></div>
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
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#0f766e' }}>How It Works</h2>
            <div className="mb-2"><GradientDivider /></div>
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

          {/* Section 3 — Revenue & Stats */}
          <div className="py-2 mt-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#b45309' }}>Revenue Potential For Flight Partners</h2>
            <div className="mb-2"><GradientDivider /></div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#3b82f6' }}>€0.67</p>
                <p className="font-semibold text-xs mt-0.5">Avg. commission per booking</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">Based on 20% redemption rate and avg DutyBoost basket</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#14b8a6' }}>€13,400</p>
                <p className="font-semibold text-xs mt-0.5">Annual commission at 100K bookings</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">At 20% redemption rate, €3.38 avg commission per redemption</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#f59e0b' }}>€0</p>
                <p className="font-semibold text-xs mt-0.5">Cost to you</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">No setup, no subscription, no operational work required</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">Performance-based only</h3>
                <p className="text-xs text-muted-foreground leading-snug">You earn only when travelers actually redeem — zero risk, pure upside.</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">Scales with your volume</h3>
                <p className="text-xs text-muted-foreground leading-snug">More bookings = more DutyCredits issued = more commission. No caps.</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">Enhances traveler experience</h3>
                <p className="text-xs text-muted-foreground leading-snug">Travelers remember the flight booking that rewarded them. Repeat bookings increase.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <GradientDivider />
            <div className="text-center py-4">
              <p className="font-heading font-bold text-sm">Ready to turn your flight bookings into airport retail revenue?</p>
              <div className="flex items-center justify-center gap-6 mt-0.5">
                <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 transition-colors">dutyboost.com</a>
                <a href="mailto:hello@dutyboost.com" className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 transition-colors">hello@dutyboost.com</a>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center pb-1">
          <p className="text-xs text-muted-foreground">© 2026 DutyBoost B.V. — Confidential partner document. Not for redistribution.</p>
        </div>
      </div>
    </div>
  );
}