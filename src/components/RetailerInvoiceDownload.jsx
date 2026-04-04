import { useState } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText } from "lucide-react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function RetailerInvoiceDownload({ transactions, retailers, user }) {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [year, setYear] = useState(String(currentYear));

  const filtered = transactions.filter(t => {
    const d = new Date(t.created_date);
    return d.getMonth() + 1 === parseInt(month) && d.getFullYear() === parseInt(year);
  });

  const totalValue = filtered.reduce((s, t) => s + (t.transaction_value || 0), 0);
  const totalDiscount = filtered.reduce((s, t) => s + (t.discount_amount || 0), 0);
  const totalFee = filtered.reduce((s, t) => s + (t.platform_revenue || 0), 0);

  const handleDownload = () => {
    const doc = new jsPDF();
    const monthName = MONTHS[parseInt(month) - 1];
    const storeName = retailers[0]?.store_name || "Store";

    // Header
    doc.setFontSize(20);
    doc.setTextColor(31, 111, 255);
    doc.text("DutyBoost", 20, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("DutyBoost B.V. · KvK: 12345678 · VAT: NL123456789B01", 20, 28);
    doc.text("hello@dutyboost.com · dutyboost.com", 20, 34);

    // Invoice title
    doc.setFontSize(16);
    doc.setTextColor(31, 111, 255);
    doc.text(`Invoice — ${monthName} ${year}`, 20, 50);

    // Retailer address block
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(`Retailer: ${user?.company || storeName}`, 20, 60);
    let addrY = 60;
    if (user?.address) { addrY += 7; doc.text(user.address, 20, addrY); }
    if (user?.postal_city) { addrY += 7; doc.text(user.postal_city, 20, addrY); }
    if (user?.kvk) { addrY += 7; doc.text(`KVK: ${user.kvk}`, 20, addrY); }
    if (user?.vat) { addrY += 7; doc.text(`VAT: ${user.vat}`, 20, addrY); }
    doc.setTextColor(100);
    addrY += 7; doc.text(`Generated: ${new Date().toLocaleDateString("nl-NL")}`, 20, addrY);
    const tableHeaderY = addrY + 12;

    // Table header
    doc.setFillColor(235, 242, 255);
    doc.rect(20, tableHeaderY, 170, 8, "F");
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text("Date", 22, tableHeaderY + 6);
    doc.text("DutyCredit Code", 55, tableHeaderY + 6);
    doc.text("Store", 105, tableHeaderY + 6);
    doc.text("Sale (€)", 140, tableHeaderY + 6);
    doc.text("Discount (€)", 160, tableHeaderY + 6);
    doc.text("Fee (€)", 185, tableHeaderY + 6);

    // Rows
    doc.setTextColor(30);
    let y = tableHeaderY + 16;
    filtered.forEach((t, i) => {
      if (y > 265) { doc.addPage(); y = 20; }
      if (i % 2 === 0) {
        doc.setFillColor(245, 249, 255);
        doc.rect(20, y - 5, 170, 8, "F");
      }
      const date = new Date(t.created_date).toLocaleDateString("nl-NL");
      doc.setFontSize(9);
      doc.text(date, 22, y);
      doc.text(t.voucher_code || "-", 55, y);
      doc.text(t.store_name || "-", 105, y);
      doc.text(`${(t.transaction_value || 0).toFixed(2)}`, 140, y);
      doc.text(`${(t.discount_amount || 0).toFixed(2)}`, 160, y);
      doc.text(`${(t.platform_revenue || 0).toFixed(2)}`, 185, y);
      y += 8;
    });

    if (filtered.length === 0) {
      doc.setTextColor(150);
      doc.text("No transactions found for this period.", 22, y);
      y += 8;
    }

    // Totals
    y += 4;
    doc.setDrawColor(200);
    doc.line(20, y, 190, y);
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(31, 111, 255);
    doc.text("Total Transaction Value:", 110, y);
    doc.text(`€${totalValue.toFixed(2)}`, 170, y, { align: "right" });
    y += 7;
    doc.text("Total DutyCredit Discounts:", 110, y);
    doc.text(`€${totalDiscount.toFixed(2)}`, 170, y, { align: "right" });
    y += 7;
    doc.setFont(undefined, "bold");
    doc.setTextColor(255, 122, 0);
    doc.text("DutyBoost Platform Fee (5%, excl. VAT):", 110, y);
    doc.text(`€${totalFee.toFixed(2)}`, 170, y, { align: "right" });
    doc.setFont(undefined, "normal");
    y += 7;
    doc.setTextColor(80);
    doc.text("VAT 21%:", 110, y);
    const vatAmount = totalFee * 0.21;
    doc.text(`€${vatAmount.toFixed(2)}`, 170, y, { align: "right" });
    y += 7;
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.setTextColor(28, 28, 60);
    doc.text("Total Due (incl. VAT):", 110, y);
    doc.text(`€${(totalFee + vatAmount).toFixed(2)}`, 170, y, { align: "right" });
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);

    // Footer note
    y += 14;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("All DutyBoost fees are exclusive of VAT. VAT (21%) is added separately as shown above.", 20, y);
    doc.text("This document serves as an invoice for VAT / tax reporting purposes. Questions? hello@dutyboost.com", 20, y + 5);

    doc.save(`DutyBoost_Invoice_${monthName}_${year}.pdf`);
  };

  const handleDownloadCSV = () => {
    const monthName = MONTHS[parseInt(month) - 1];
    const headers = ["Date", "DutyCredit Code", "Store", "Sale (EUR)", "Discount (EUR)", "Platform Fee (EUR)"];
    const rows = filtered.map(t => [
      new Date(t.created_date).toLocaleDateString("nl-NL"),
      t.voucher_code || "",
      t.store_name || "",
      (t.transaction_value || 0).toFixed(2),
      (t.discount_amount || 0).toFixed(2),
      (t.platform_revenue || 0).toFixed(2)
    ]);
    rows.push(["", "", "TOTAL", totalValue.toFixed(2), totalDiscount.toFixed(2), totalFee.toFixed(2)]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DutyBoost_Transactions_${monthName}_${year}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold">Download Invoice</h3>
          <p className="text-sm text-muted-foreground">Monthly transaction invoice for tax purposes</p>
          <p className="text-xs text-amber-600 font-medium mt-0.5">All DutyBoost fees are exclusive of VAT (21% added separately)</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
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

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground text-xs">Transactions</p>
          <p className="font-semibold">{filtered.length}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground text-xs">Total Sales</p>
          <p className="font-semibold">€{totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground text-xs">Platform Fee (excl. VAT)</p>
          <p className="font-semibold">€{totalFee.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">+21% VAT = €{(totalFee * 1.21).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}