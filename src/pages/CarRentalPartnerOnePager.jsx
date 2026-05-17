import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";

const GradientDivider = () => (
  <div style={{ height: '2px', background: 'linear-gradient(to right, #f97316, #ef4444, #eab308)', width: '100%' }} />
);

export default function CarRentalPartnerOnePager() {
  const handleDownloadPDF = async () => {
    const element = document.querySelector('.print-content');
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4', { compress: true });
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('car-rental-partner-one-pager.pdf');
  };

  const steps = [
    { num: "01", title: "Customer books a rental", desc: "A customer books a car at an airport pickup location via your platform." },
    { num: "02", title: "DutyCredit attached", desc: "DutyBoost adds a personalized QR voucher to the booking confirmation — ready to use airside." },
    { num: "03", title: "Customer shops before pickup", desc: "The customer arrives early, redeems their DutyCredit at airport retail stores, then picks up their car." },
    { num: "04", title: "Commission earned", desc: "You receive a commission for every redemption linked to your rental bookings." },
  ];

  const why = [
    { title: "Airport pickups = perfect timing", desc: "Car rental customers arrive at the airport early. DutyBoost puts that dwell time to work — for them and for you." },
    { title: "Zero-cost revenue on confirmed bookings", desc: "No new UI, no new product. DutyCredits flow from your confirmation emails automatically with a simple integration." },
    { title: "Stand out from competitors", desc: "Offer travelers an airport shopping reward that no other car rental platform provides. Convert more bookings." },
    { title: "High-value customer segment", desc: "Car rental customers are typically longer-haul, higher-spend travelers — exactly the profile that redeems DutyCredits most." },
  ];

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(135deg, hsl(25 60% 97%) 0%, hsl(20 50% 95%) 50%, hsl(45 55% 96%) 100%)', backgroundAttachment: 'fixed' }}>
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </Link>
        <Button onClick={handleDownloadPDF} className="gap-2" style={{ background: 'linear-gradient(to right, #f97316, #ef4444)' }}>
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
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-orange-200 text-orange-700 bg-orange-50">Car Rental Partner Program</span>
          </div>
        </div>
        <GradientDivider />

        <div className="flex-1 flex flex-col justify-between">

          {/* Headline */}
          <div className="text-center py-3">
            <h1 className="text-lg font-heading font-bold leading-tight">Your Airport Car Rental Customers Shop More — You Earn More</h1>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">
              Car rental customers picking up at airports arrive with time to spare. DutyBoost activates that dwell time with personalized airport retail incentives — and pays you a commission every time they redeem.
            </p>
          </div>

          {/* Section 1 */}
          <div className="py-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#c2410c' }}>Why Car Rental Partners Join DutyBoost</h2>
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
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#b91c1c' }}>How It Works</h2>
            <div className="mb-2"><GradientDivider /></div>
            <div className="grid grid-cols-4 gap-2">
              {steps.map(s => (
                <div key={s.num} className="bg-orange-50 rounded p-3 border border-orange-100">
                  <p className="text-lg font-heading font-bold text-orange-300 leading-none">{s.num}</p>
                  <p className="font-semibold text-xs text-orange-800 mt-1">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 — Revenue */}
          <div className="py-2 mt-2">
            <h2 className="font-heading font-bold text-xs mb-2 uppercase tracking-wide pt-2" style={{ color: '#a16207' }}>Revenue Potential For Car Rental Partners</h2>
            <div className="mb-2"><GradientDivider /></div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#f97316' }}>€0.67</p>
                <p className="font-semibold text-xs mt-0.5">Avg. commission per rental</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">Airport pickup rentals qualify automatically for DutyCredit issuance</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#ef4444' }}>€13,400</p>
                <p className="font-semibold text-xs mt-0.5">Annual commission at 100K rentals</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">Fully automated — no manual commission tracking or invoicing</p>
              </div>
              <div className="border border-border rounded p-3 text-center">
                <p className="text-2xl font-heading font-bold leading-tight" style={{ color: '#eab308' }}>€0</p>
                <p className="font-semibold text-xs mt-0.5">Cost to join</p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">No fees, no setup costs, no operational burden</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">Airport-only activations</h3>
                <p className="text-xs text-muted-foreground leading-snug">DutyCredits are only issued for airport pickup/dropoff rentals — so every credit reaches the right customer at the right time.</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">Booking conversion boost</h3>
                <p className="text-xs text-muted-foreground leading-snug">Customers choosing between two rental providers will prefer the one that gives them airport shopping credit.</p>
              </div>
              <div className="border border-border rounded p-3">
                <h3 className="font-heading font-bold text-xs mb-0.5">Monthly automated payouts</h3>
                <p className="text-xs text-muted-foreground leading-snug">DutyBoost handles all tracking, validation, and commission payments. You receive a monthly summary and transfer.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <GradientDivider />
            <div className="text-center py-4">
              <p className="font-heading font-bold text-sm">Earn commission on every airport car rental — without lifting a finger.</p>
              <div className="flex items-center justify-center gap-6 mt-0.5">
                <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800 transition-colors">dutyboost.com</a>
                <a href="mailto:hello@dutyboost.com" className="text-xs font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800 transition-colors">hello@dutyboost.com</a>
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