import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";

const GradientDivider = () => (
  <div style={{ height: '2px', background: 'linear-gradient(to right, #8b5cf6, #06b6d4, #10b981)', width: '100%' }} />
);

export default function AccommodationPartnerOnePager() {
  const handleDownloadPDF = async () => {
    const element = document.querySelector('.print-content');
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4', { compress: true });
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('accommodation-partner-one-pager.pdf');
  };

  const steps = [
    { num: "01", title: "Guest books accommodation", desc: "A guest books a hotel, hostel, or rental property via your platform." },
    { num: "02", title: "DutyCredit issued pre-departure", desc: "If the guest has an upcoming flight, DutyBoost issues a DutyCredit in their booking confirmation." },
    { num: "03", title: "Guest redeems at airport", desc: "The guest spends their DutyCredit at a participating airport retail store before their flight." },
    { num: "04", title: "Commission paid to you", desc: "DutyBoost tracks each redemption and pays you a commission — automatically every month." },
  ];

  const why = [
    { title: "Passive income on existing bookings", desc: "No new product to sell. Every flight-adjacent accommodation booking becomes a potential commission source." },
    { title: "Differentiate your platform", desc: "Offer travelers a tangible perk — airport shopping credit — that no standard accommodation platform provides." },
    { title: "Works for OTAs, hotels & vacation rentals", desc: "Any accommodation platform where guests travel to or from an airport can participate in DutyBoost." },
    { title: "Guest satisfaction uplift", desc: "Guests who feel rewarded at booking leave better reviews and rebook more often." },
  ];

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(270 60% 97%) 0%, hsl(190 50% 95%) 50%, hsl(160 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </Link>
        <Button onClick={handleDownloadPDF} className="gap-2" style={{ background: 'linear-gradient(to right, #8b5cf6, #06b6d4)' }}>
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
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-purple-200 text-purple-700 bg-purple-50">Accommodation Partner Program</span>
          </div>
        </div>
        <GradientDivider />

        <div className="flex-1 flex flex-col justify-between">

          {/* Headline */}
          <div className="text-center py-3">
            <h1 className="text-lg font-heading font-bold leading-tight">Reward Your Guests at the Airport — and Earn While You Sleep</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">
              DutyBoost lets accommodation platforms generate passive commission revenue from their existing guest bookings. Every flying guest gets a DutyCredit — a personalized airport retail voucher — and you earn a commission whenever they redeem it.
            </p>
          </div>

          {/* Section 1 */}
          <div className="py-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#7c3aed' }}>Why Accommodation Partners Join DutyBoost</h2>
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
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#0891b2' }}>How It Works</h2>
            <div className="mb-2"><GradientDivider /></div>
            <div className="grid grid-cols-4 gap-2">
              {steps.map(s => (
                <div key={s.num} className="bg-cyan-50 rounded p-3 border border-cyan-100">
                  <p className="text-lg font-heading font-bold text-cyan-300 leading-none">{s.num}</p>
                  <p className="font-semibold text-xs text-cyan-800 mt-1">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 — Revenue */}
          <div className="py-2 mt-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#059669' }}>Revenue Potential For Accommodation Partners</h2>
            <div className="mb-2"><GradientDivider /></div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#8b5cf6' }}>€0.67</p>
                <p className="font-semibold text-xs mt-0.5">Avg. commission per booking</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">Based on 20% redemption rate among flight-adjacent bookings</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#06b6d4' }}>€13,400</p>
                <p className="font-semibold text-xs mt-0.5">Annual commission at 100K bookings</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">Passive income — no operational involvement required</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#10b981' }}>€0</p>
                <p className="font-semibold text-xs mt-0.5">Cost to participate</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">No fees, no subscription, no infrastructure investment</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">Hotels & OTAs</h3>
                <p className="text-xs text-muted-foreground leading-snug">Issue DutyCredits via booking confirmation emails. Guests flying to/from airports qualify automatically.</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">Vacation Rentals</h3>
                <p className="text-xs text-muted-foreground leading-snug">Platforms like Airbnb-style sites can offer DutyCredits to guests who indicate air travel in their trip details.</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">Corporate Travel</h3>
                <p className="text-xs text-muted-foreground leading-snug">Business travelers flying and staying are high-value DutyCredit redeemers — and high-commission earners for you.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <GradientDivider />
            <div className="text-center py-4">
              <p className="font-heading font-bold text-sm">Add a revenue stream to every guest booking — with zero effort.</p>
              <div className="flex items-center justify-center gap-6 mt-0.5">
                <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-purple-700 underline underline-offset-2 hover:text-purple-800 transition-colors">dutyboost.com</a>
                <a href="mailto:hello@dutyboost.com" className="text-xs font-semibold text-purple-700 underline underline-offset-2 hover:text-purple-800 transition-colors">hello@dutyboost.com</a>
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