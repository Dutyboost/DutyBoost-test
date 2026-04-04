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
    let addrY = 60;
    if (user?.address) { addrY += 7; doc.text(user.address, 20, addrY); }
    if (user?.postal_city) { addrY += 7; doc.text(user.postal_city, 20, addrY); }
    if (user?.kvk) { addrY += 7; doc.text(`KVK: ${user.kvk}`, 20, addrY); }
    doc.setTextColor(100);
    addrY += 7; doc.text(`Generated: ${new Date().toLocaleDateString("nl-NL")}`, 20, addrY);
    const summaryBoxY = addrY + 10;

    // Summary box
    doc.setFillColor(235, 242, 255);
    doc.roundedRect(20, summaryBoxY, 170, 36, 3, 3, "F");
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text("Total DutyCredits Issued:", 25, summaryBoxY + 10);
    doc.setTextColor(28,28,60);
    doc.text(String(filtered.length), 130, summaryBoxY + 10);
    doc.setTextColor(80);
    doc.text("Redeemed DutyCredits:", 25, summaryBoxY + 18);
    doc.setTextColor(28,28,60);
    doc.text(String(redeemed.length), 130, summaryBoxY + 18);
    doc.setTextColor(80);
    doc.text("Total Travelers Covered:", 25, summaryBoxY + 26);
    doc.setTextColor(28,28,60);
    doc.text(String(totalTravelers), 130, summaryBoxY + 26);
    doc.setTextColor(80);
    doc.text("Travelers with Redemptions:", 25, summaryBoxY + 34);
    doc.setTextColor(28,28,60);
    doc.text(String(redeemedTravelers), 130, summaryBoxY + 34);

    // Commission breakdown
    const breakY = summaryBoxY + 50;
    doc.setFontSize(13);
    doc.setTextColor(28,28,60);
    doc.text("Commission Breakdown", 20, breakY);
    doc.setDrawColor(200);
    doc.line(20, breakY + 3, 190, breakY + 3);

    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`Commission rate: €${COMMISSION_RATE.toFixed(2)} per traveler (on redemption)`, 20, breakY + 13);
    doc.text(`Confirmed commission (redeemed): ${redeemedTravelers} travelers × €${COMMISSION_RATE.toFixed(2)}`, 20, breakY + 21);
    doc.setFontSize(12);
    doc.setTextColor(0, 196, 140);
    doc.setFont(undefined, "bold");
    doc.text(`= €${totalCommission}`, 160, breakY + 21, { align: "right" });
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`Forecast commission (all issued): ${totalTravelers} travelers × €${COMMISSION_RATE.toFixed(2)}`, 20, breakY + 29);
    doc.setTextColor(150);
    doc.text(`= €${forecastCommission} (pending redemptions)`, 160, breakY + 29, { align: "right" });

    // Airport breakdown
    const abSectionY = breakY + 45;
    doc.setFontSize(13);
    doc.setTextColor(28,28,60);
    doc.text("Commission by Airport / Retailer", 20, abSectionY);
    doc.setDrawColor(200);
    doc.line(20, abSectionY + 3, 190, abSectionY + 3);

    const byAirport = {};
    redeemed.forEach(v => {
      const key = v.airport || "Unknown";
      if (!byAirport[key]) byAirport[key] = { travelers: 0, vouchers: 0 };
      byAirport[key].travelers += (v.traveler_count || 1);
      byAirport[key].vouchers += 1;
    });
    const airportRows = Object.entries(byAirport).sort((a,b) => b[1].travelers - a[1].travelers);

    doc.setFillColor(235, 242, 255);
    doc.rect(20, abSectionY + 6, 170, 8, "F");
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text("Airport", 22, abSectionY + 12);
    doc.text("Redeemed Vouchers", 75, abSectionY + 12);
    doc.text("Travelers", 125, abSectionY + 12);
    doc.text("Commission (€)", 158, abSectionY + 12);

    let abY = abSectionY + 22;
    if (airportRows.length === 0) {
      doc.setTextColor(150);
      doc.text("No redeemed vouchers for this period.", 22, abY);
      abY += 8;
    } else {
      airportRows.forEach(([airport, data], i) => {
        if (abY > 270) { doc.addPage(); abY = 20; }
        if (i % 2 === 0) { doc.setFillColor(245,249,255); doc.rect(20, abY - 5, 170, 8, "F"); }
        doc.setFontSize(9);
        doc.setTextColor(28,28,60);
        doc.text(airport, 22, abY);
        doc.setTextColor(80);
        doc.text(String(data.vouchers), 75, abY);
        doc.text(String(data.travelers), 125, abY);
        doc.setTextColor(0,140,80);
        doc.text(`€ ${(data.travelers * COMMISSION_RATE).toFixed(2)}`, 158, abY);
        abY += 8;
      });
    }

    // Transaction table
    const tableY = abY + 8;
    doc.setFontSize(13);
    doc.setTextColor(28,28,60);
    doc.text("DutyCredit Detail", 20, tableY);
    doc.line(20, tableY + 3, 190, tableY + 3);

    doc.setFillColor(235, 242, 255);
    doc.rect(20, tableY + 6, 170, 8, "F");
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text("Issued", 22, tableY + 12);
    doc.text("Code", 50, tableY + 12);
    doc.text("Airport", 95, tableY + 12);
    doc.text("Travelers", 130, tableY + 12);
    doc.text("Type", 155, tableY + 12);
    doc.text("Status", 175, tableY + 12);

    doc.setTextColor(30);
    let y = tableY + 22;
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