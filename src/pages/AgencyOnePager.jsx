import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";

export default function AgencyOnePager() {
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
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </Link>
        <Button onClick={handleDownloadPDF} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Printer className="w-4 h-4" /> Download
        </Button>
      </div>

      {/* A4-style content */}
      <div className="print-content max-w-[794px] mx-auto px-10 py-4 print:py-0 print:px-0 space-y-4 bg-white">

        {/* Header */}
        <div className="text-center border-b-2 border-green-500 pb-2">
          <DutyBoostLogo height={150} />
        </div>

        {/* HEADLINE SECTION */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-heading font-bold">Turning every booking into extra revenue</h1>
          <p className="text-muted-foreground text-xs max-w-xl mx-auto">
            A simple solution that rewards travelers with airport spending credit — while you earn automatically.
          </p>
        </div>

        {/* VALUE STRIP */}
        <div className="bg-green-50 rounded-lg px-6 py-3 text-center text-sm font-medium text-green-900 border border-green-200">
          No extra work · New income stream · Better customer experience
        </div>

        {/* CORE BENEFITS - 3 columns */}
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4 space-y-2">
            <h3 className="font-heading font-bold text-sm">💰 Earn more from every booking</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Get paid when travelers spend their credit at the airport. No limits. No extra sales effort.</p>
          </div>
          <div className="border border-border rounded-lg p-4 space-y-2">
            <h3 className="font-heading font-bold text-sm">⚙️ Fully automatic</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">We handle everything: credit creation, email delivery, QR codes, and payouts.</p>
          </div>
          <div className="border border-border rounded-lg p-4 space-y-2">
            <h3 className="font-heading font-bold text-sm">✨ Add value for your customers</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Give travelers a real, usable reward — not just points or discounts.</p>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="space-y-3">
          <h2 className="font-heading font-bold text-sm border-b border-border pb-2">How It Works</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { num: "1", title: "Booking confirmed", desc: "Customer books a trip" },
              { num: "2", title: "Credit created", desc: "DutyBoost generates a shopping credit" },
              { num: "3", title: "Credit sent", desc: "Traveler receives a QR code" },
              { num: "4", title: "Spent at airport", desc: "Customer shops → you earn" },
            ].map(s => (
              <div key={s.num} className="space-y-1">
                <p className="text-2xl font-heading font-bold text-green-200">{s.num}</p>
                <p className="font-semibold text-xs">{s.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PROOF / METRICS */}
        <div className="bg-green-50 rounded-lg p-4 grid grid-cols-3 gap-4 text-center border border-green-200">
          <div>
            <p className="text-2xl font-heading font-bold text-green-700">€1–€3</p>
            <p className="text-xs text-muted-foreground mt-0.5">average extra revenue per booking</p>
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-green-700">1%</p>
            <p className="text-xs text-muted-foreground mt-0.5">commission on airport spend</p>
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-green-700">&lt; 1 day</p>
            <p className="text-xs text-muted-foreground mt-0.5">integration time</p>
          </div>
        </div>

        {/* WHY IT WORKS */}
        <div className="space-y-2 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h2 className="font-heading font-bold text-sm">Why It Works</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Zero operational effort. No upfront investment. No customer acquisition cost. Just a new revenue stream from your existing bookings.
          </p>
        </div>

        {/* INTEGRATION */}
        <div className="space-y-1.5">
          <h3 className="font-heading font-bold text-sm border-b border-border pb-1.5">Simple API Integration</h3>
          <p className="text-xs text-muted-foreground">One connection. Fully automated. No operational impact.</p>
        </div>

        {/* CALL TO ACTION */}
        <div className="border-t-2 border-green-500 pt-4 text-center space-y-2">
          <p className="font-heading font-bold text-sm">Start earning from your bookings today</p>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <p>🌐 dutyboost.com</p>
            <p>📩 integrations@dutyboost.com</p>
          </div>
        </div>

      </div>
    </div>
  );
}