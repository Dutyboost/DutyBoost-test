import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Receipt } from "lucide-react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const fmtMoney = (v) =>
  `€ ${Number(v || 0).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const dateOf = (t) => new Date(t.date || t.created_date);

/**
 * Monthly self-billed incentive statements for the partners whose share is paid
 * out of the DutyBoost platform fee. They do not invoice DutyBoost, so every
 * month is documented here for their bookkeeping and the tax authorities.
 */
export default function PartnerIncentiveReceipts({
  transactions = [],
  commissionField = "platform_revenue",
  partnerLabel = "Partner",
  user,
}) {
  const currentYear = new Date().getFullYear();

  const years = useMemo(() => {
    const set = new Set([currentYear, currentYear - 1, currentYear - 2]);
    transactions.forEach((t) => {
      const d = dateOf(t);
      if (!isNaN(d)) set.add(d.getFullYear());
    });
    return [...set].sort((a, b) => b - a);
  }, [transactions, currentYear]);

  const [year, setYear] = useState(String(currentYear));

  const months = useMemo(() => {
    const buckets = MONTHS.map((label, i) => ({ label, month: i + 1, rows: [], share: 0, gross: 0 }));
    transactions.forEach((t) => {
      const d = dateOf(t);
      if (isNaN(d) || d.getFullYear() !== Number(year)) return;
      const bucket = buckets[d.getMonth()];
      bucket.rows.push(t);
      bucket.share += Number(t[commissionField]) || 0;
      bucket.gross += Number(t.transaction_value) || 0;
    });
    return buckets.filter((b) => b.rows.length > 0);
  }, [transactions, year, commissionField]);

  const yearShare = months.reduce((s, b) => s + b.share, 0);
  const yearGross = months.reduce((s, b) => s + b.gross, 0);
  const yearRows = months.reduce((s, b) => s + b.rows.length, 0);

  const download = (bucket) => {
    const doc = new jsPDF();
    const period = `${bucket.label} ${year}`;

    doc.setFontSize(20);
    doc.setTextColor(31, 111, 255);
    doc.text("DutyBoost", 20, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("DutyBoost B.V. · Self-billed incentive statement", 20, 28);
    doc.text("hello@dutyboost.com · dutyboost.com", 20, 34);

    doc.setFontSize(16);
    doc.setTextColor(31, 111, 255);
    doc.text(`Incentive Statement — ${period}`, 20, 50);

    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(`${partnerLabel}: ${user?.company || user?.full_name || "—"}`, 20, 60);
    let y = 60;
    if (user?.address) { y += 7; doc.text(user.address, 20, y); }
    if (user?.postal_city) { y += 7; doc.text(user.postal_city, 20, y); }
    if (user?.kvk) { y += 7; doc.text(`CoC: ${user.kvk}`, 20, y); }
    if (user?.vat) { y += 7; doc.text(`VAT: ${user.vat}`, 20, y); }
    if (user?.bank_iban) { y += 7; doc.text(`IBAN: ${user.bank_iban}`, 20, y); }
    doc.setTextColor(100);
    y += 7; doc.text(`Issued: ${new Date().toLocaleDateString("nl-NL")}`, 20, y);

    const boxY = y + 10;
    doc.setFillColor(235, 242, 255);
    doc.roundedRect(20, boxY, 170, 26, 3, 3, "F");
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text("Redemptions in period:", 25, boxY + 10);
    doc.text("Gross retail sales:", 25, boxY + 18);
    doc.text("Incentive share payable:", 25, boxY + 26);
    doc.setTextColor(28, 28, 60);
    doc.text(String(bucket.rows.length), 130, boxY + 10);
    doc.text(fmtMoney(bucket.gross), 130, boxY + 18);
    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 140, 80);
    doc.text(fmtMoney(bucket.share), 130, boxY + 26);
    doc.setFont(undefined, "normal");

    const tableY = boxY + 38;
    doc.setFillColor(235, 242, 255);
    doc.rect(20, tableY, 170, 8, "F");
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text("Date", 22, tableY + 6);
    doc.text("DutyCredit", 50, tableY + 6);
    doc.text("Store", 95, tableY + 6);
    doc.text("Sale (€)", 140, tableY + 6);
    doc.text("Share (€)", 175, tableY + 6);

    doc.setTextColor(30);
    let rowY = tableY + 16;
    bucket.rows.forEach((t, i) => {
      if (rowY > 265) { doc.addPage(); rowY = 20; }
      if (i % 2 === 0) { doc.setFillColor(245, 249, 255); doc.rect(20, rowY - 5, 170, 8, "F"); }
      doc.setFontSize(9);
      doc.text(dateOf(t).toLocaleDateString("nl-NL"), 22, rowY);
      doc.text(t.voucher_code || "-", 50, rowY);
      doc.text((t.store_name || "-").slice(0, 22), 95, rowY);
      doc.text((Number(t.transaction_value) || 0).toFixed(2), 140, rowY);
      doc.text((Number(t[commissionField]) || 0).toFixed(2), 175, rowY);
      rowY += 8;
    });

    rowY += 4;
    doc.setDrawColor(200);
    doc.line(20, rowY, 190, rowY);
    rowY += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.setTextColor(28, 28, 60);
    doc.text("Total incentive share:", 110, rowY);
    doc.setTextColor(0, 140, 80);
    doc.text(fmtMoney(bucket.share), 180, rowY, { align: "right" });
    doc.setFont(undefined, "normal");

    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text("This statement documents the incentive share paid by DutyBoost B.V. under the platform fee sharing agreement.", 20, 282);
      doc.text("It is not an invoice. Keep it with your bookkeeping for tax reporting. Questions? hello@dutyboost.com", 20, 287);
    }

    doc.save(`DutyBoost_Incentive_${bucket.label}_${year}.pdf`);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Receipt className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Your share of the platform fee, documented month by month. DutyBoost issues these instead of an invoice.
          </p>
        </div>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
          <SelectContent>
            {years.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {months.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">
          No incentive share recorded for {year} yet. Receipts appear here as soon as your channels convert.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left py-2 px-2 font-medium">Month</th>
                <th className="text-right py-2 px-2 font-medium">Redemptions</th>
                <th className="text-right py-2 px-2 font-medium">Gross sales</th>
                <th className="text-right py-2 px-2 font-medium">Your share</th>
                <th className="text-right py-2 px-2 font-medium">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {months.map((b) => (
                <tr key={b.month} className="border-b border-border last:border-0">
                  <td className="py-2.5 px-2 font-medium">{b.label} {year}</td>
                  <td className="py-2.5 px-2 text-right">{b.rows.length}</td>
                  <td className="py-2.5 px-2 text-right text-muted-foreground">{fmtMoney(b.gross)}</td>
                  <td className="py-2.5 px-2 text-right font-semibold text-emerald-600">{fmtMoney(b.share)}</td>
                  <td className="py-2.5 px-2 text-right">
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => download(b)}>
                      <Download className="w-3 h-3" /> PDF
                    </Button>
                  </td>
                </tr>
              ))}
              <tr className="bg-muted/40 font-semibold">
                <td className="py-2.5 px-2">Total {year}</td>
                <td className="py-2.5 px-2 text-right">{yearRows}</td>
                <td className="py-2.5 px-2 text-right">{fmtMoney(yearGross)}</td>
                <td className="py-2.5 px-2 text-right text-emerald-600">{fmtMoney(yearShare)}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}