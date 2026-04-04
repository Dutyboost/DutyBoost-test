import { useState } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, BarChart3, FileText } from "lucide-react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const COMMISSION_RATE = 0.20; // €0.20 per traveler per redeemed voucher

export default function AgencyCommissionDownload({ vouchers, agencyName, user }) {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  const [period, setPeriod] = useState("all");
  const [year, setYear] = useState(String(currentYear));

  const filtered = vouchers.filter(v => {
    if (period === "all") return true;
    const d = new Date(v.created_date);
    return d.getMonth() + 1 === parseInt(period) && d.getFullYear() === parseInt(year);
  });

  const redeemed = filtered.filter(v => v.status === "redeemed");
  const totalTravelers = filtered.reduce((s, v) => s + (v.traveler_count || 1), 0);
  const redeemedTravelers = redeemed.reduce((s, v) => s + (v.traveler_count || 1), 0);
  const totalCommission = (redeemedTravelers * COMMISSION_RATE).toFixed(2);
  const forecastCommission = (totalTravelers * COMMISSION_RATE).toFixed(2);

  const handleDownload = () => {
    const doc = new jsPDF();
    const periodLabel = period === "all"
      ? `Full Year ${year}`
      : `${MONTHS[parseInt(period) - 1]} ${year}`;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(31, 111, 255);
    doc.text("DutyBoost", 20, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("DutyBoost B.V. · Commission Statement", 20, 28);
    doc.text("hello@dutyboost.com · dutyboost.com", 20, 34);

    // Title
    doc.setFontSize(16);
    doc.setTextColor(31, 111, 255);
    doc.text(`Commission Report — ${periodLabel}`, 20, 50);

    // Agency address block
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(`Agency: ${user?.company || agencyName || "Travel Agency"}`, 20, 60);
    if (user?.address) doc.text(user.address, 20, 67);
    if (user?.postal_city) doc.text(user.postal_city, 20, 74);
    let addrY = (user?.postal_city ? 74 : user?.address ? 67 : 60) + 7;
    if (user?.kvk) { doc.text(`KVK: ${user.kvk}`, 20, addrY); addrY += 7; }
    if (user?.vat) { doc.text(`VAT: ${user.vat}`, 20, addrY); addrY += 7; }
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString("nl-NL")}`, 20, addrY);

    // Summary box
    doc.setFillColor(235, 242, 255);
    doc.roundedRect(20, 72, 170, 36, 3, 3, "F");
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text("Total DutyCredits Issued:", 25, 82);
    doc.setTextColor(28,28,60);
    doc.text(String(filtered.length), 130, 82);
    doc.setTextColor(80);
    doc.text("Redeemed DutyCredits:", 25, 90);
    doc.setTextColor(28,28,60);
    doc.text(String(redeemed.length), 130, 90);
    doc.setTextColor(80);
    doc.text("Total Travelers Covered:", 25, 98);
    doc.setTextColor(28,28,60);
    doc.text(String(totalTravelers), 130, 98);
    doc.setTextColor(80);
    doc.text("Travelers with Redemptions:", 25, 106);
    doc.setTextColor(28,28,60);
    doc.text(String(redeemedTravelers), 130, 106);

    // Commission breakdown
    doc.setFontSize(13);
    doc.setTextColor(28,28,60);
    doc.text("Commission Breakdown", 20, 124);
    doc.setDrawColor(200);
    doc.line(20, 127, 190, 127);

    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`Commission rate: €${COMMISSION_RATE.toFixed(2)} per traveler (on redemption)`, 20, 135);
    doc.text(`Confirmed commission (redeemed): ${redeemedTravelers} travelers × €${COMMISSION_RATE.toFixed(2)}`, 20, 143);
    doc.setFontSize(12);
    doc.setTextColor(0, 196, 140);
    doc.setFont(undefined, "bold");
    doc.text(`= €${totalCommission}`, 160, 143, { align: "right" });
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`Forecast commission (all issued): ${totalTravelers} travelers × €${COMMISSION_RATE.toFixed(2)}`, 20, 151);
    doc.setTextColor(150);
    doc.text(`= €${forecastCommission} (pending redemptions)`, 160, 151, { align: "right" });



    // Transaction table
    doc.setFontSize(13);
    doc.setTextColor(28,28,60);
    doc.text("DutyCredit Detail", 20, 167);
    doc.line(20, 170, 190, 170);

    doc.setFillColor(235, 242, 255);
    doc.rect(20, 173, 170, 8, "F");
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text("Issued", 22, 179);
    doc.text("Code", 50, 179);
    doc.text("Airport", 95, 179);
    doc.text("Travelers", 130, 179);
    doc.text("Type", 155, 179);
    doc.text("Status", 175, 179);

    doc.setTextColor(30);
    let y = 190;
    filtered.forEach((v, i) => {
      if (y > 270) { doc.addPage(); y = 20; }
      if (i % 2 === 0) {
        doc.setFillColor(245, 249, 255);
        doc.rect(20, y - 5, 170, 8, "F");
      }
      const date = new Date(v.created_date).toLocaleDateString("nl-NL");
      doc.setFontSize(8);
      doc.text(date, 22, y);
      doc.text(v.voucher_code || "-", 50, y);
      doc.text(v.airport || "-", 95, y);
      doc.text(String(v.traveler_count || 1), 130, y);
      doc.text(v.travel_type || "-", 155, y);
      doc.text(v.status || "-", 175, y);
      y += 8;
    });

    if (filtered.length === 0) {
      doc.setTextColor(150);
      doc.text("No DutyCredits found for this period.", 22, y);
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(180);
      doc.text("This document is for tax and accounting purposes. DutyBoost B.V. · hello@dutyboost.com", 20, 288);
    }

    doc.save(`DutyBoost_Commission_${periodLabel.replace(/ /g, "_")}.pdf`);
  };

  const handleDownloadCSV = () => {
    const periodLabel = period === "all"
      ? `Full Year ${year}`
      : `${MONTHS[parseInt(period) - 1]} ${year}`;

    const headers = ["Issued Date", "Voucher Code", "Airport", "Travelers", "Travel Type", "Status", "Discount %", "Commission (EUR)"];
    const rows = filtered.map(v => [
      new Date(v.created_date).toLocaleDateString("nl-NL"),
      v.voucher_code || "",
      v.airport || "",
      v.traveler_count || 1,
      v.travel_type || "",
      v.status || "",
      v.discount_percentage || "",
      v.status === "redeemed" ? ((v.traveler_count || 1) * COMMISSION_RATE).toFixed(2) : "0.00"
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DutyBoost_Vouchers_${periodLabel.replace(/ /g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold">Download Commission Report</h3>
          <p className="text-sm text-muted-foreground">Commission accumulation statement for tax purposes</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Full Year</SelectItem>
            {MONTHS.map((m, i) => (
              <SelectItem key={i} value={String(i + 1)}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
          <SelectContent>
            {years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" /> Download PDF
        </Button>
        <Button onClick={handleDownloadCSV} variant="outline" className="gap-2">
          <FileText className="w-4 h-4" /> Download CSV
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground text-xs">DutyCredits</p>
          <p className="font-semibold">{filtered.length}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground text-xs">Redeemed</p>
          <p className="font-semibold">{redeemed.length}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground text-xs">Confirmed Commission</p>
          <p className="font-semibold text-primary">€{totalCommission}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground text-xs">Forecast</p>
          <p className="font-semibold">€{forecastCommission}</p>
        </div>
      </div>
    </div>
  );
}