import pptxgen from "pptxgenjs";
import { fmtNum, fmtEur, fmtCompact } from "@/utils/formatNumber";
import { computeCompanyTotals, computeCompanyStoreCount } from "@/utils/retailerCalc";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";

const ORANGE = "EA580C";
const BLUE = "2563EB";
const GREEN = "059669";
const DARK = "0F172A";
const SLATE = "64748B";

export async function exportDutyBoostPptx(company, conversionRate = 3) {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";

  const totals = computeCompanyTotals(company.airports, conversionRate);
  const storeCount = company.storeCount ?? computeCompanyStoreCount(company.airports);
  const airportCount = company.airports.length;
  const companyName = "Crème Duty Free";

  // --- SLIDE 1: Cover ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFF7ED" };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.5, w: 4.0, h: 1.5, sizing: { type: "contain", w: 4.0, h: 1.5 } });
    s.addShape(pptx.ShapeType.line, { x: 5.3, y: 2.2, w: 2.8, h: 0, line: { color: ORANGE, width: 2 } });
    s.addText("Turning Pre-Departure\nPassengers into Shoppers", { x: 1.5, y: 2.5, w: 10.3, h: 1.8, fontSize: 36, bold: true, color: DARK, align: "center", fontFace: "Calibri", breakLine: false });
    s.addText("The Travel Retail Conversion Layer — built for Airport Retailers.", { x: 1.5, y: 4.5, w: 10.3, h: 0.9, fontSize: 16, color: SLATE, align: "center", fontFace: "Calibri" });
    s.addText("WHY  →  HOW  →  WHAT", { x: 1, y: 5.5, w: 11.3, h: 0.4, fontSize: 12, bold: true, color: ORANGE, align: "center", fontFace: "Calibri", charSpacing: 4 });
  }

  // --- SLIDE 2: WHY — The Problem ---
  {
    const s = pptx.addSlide();
    s.background = { color: DARK };
    s.addText("WHY", { x: 1, y: 0.5, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "94A3B8", align: "center", fontFace: "Calibri", charSpacing: 4 });
    s.addText("Millions walk by daily.\nMost don't stop.", { x: 1, y: 1.1, w: 11.3, h: 1.6, fontSize: 30, bold: true, color: "F1F5F9", align: "center", fontFace: "Calibri" });
    const problems = [
      { title: "Low conversion", desc: "Only 15–25% of departing passengers shop at airport retail. The rest walk past your stores." },
      { title: "No pre-activation", desc: "Travelers arrive with no intent to buy. Generic ads don't influence purchase decisions." },
      { title: "High acquisition cost", desc: "Promotions and loyalty programs cost upfront with no guarantee of return." },
    ];
    problems.forEach(({ title, desc }, i) => {
      const x = 0.8 + i * 4.0;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 3.2, w: 3.6, h: 3.5, fill: { color: "1E293B" }, line: { color: "334155", width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x, y: 3.4, w: 3.6, h: 0.5, fontSize: 14, bold: true, color: "F1F5F9", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: 4.1, w: 3.2, h: 2.2, fontSize: 12, color: "94A3B8", align: "left", fontFace: "Calibri", valign: "top" });
    });
  }

  // --- SLIDE 3: WHY — The Opportunity ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("WHY — THE OPPORTUNITY", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: ORANGE, align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("A massive, untapped market.", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
    const stats = [
      { num: fmtCompact(totals.totalDailyTravelers * 365, "en"), label: `Annual air passengers — ${company.name}` },
      { num: fmtCompact(totals.totalDailyTravelers, "en"), label: `Daily departing travelers — ${company.name}` },
      { num: "1h 10m", label: "Average dwell time at gate" },
      { num: "€95B", label: "Global airport retail market" },
    ];
    stats.forEach(({ num, label }, i) => {
      const x = 0.5 + i * 3.15;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 2.3, w: 3.0, h: 2.5, fill: { color: "FFF7ED" }, line: { color: ORANGE, width: 1 }, rectRadius: 0.15 });
      s.addText(num, { x, y: 2.6, w: 3.0, h: 0.8, fontSize: 24, bold: true, color: ORANGE, align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.15, y: 3.5, w: 2.7, h: 1.0, fontSize: 11, color: SLATE, align: "center", fontFace: "Calibri" });
    });
    s.addShape(pptx.ShapeType.roundRect, { x: 1.5, y: 5.3, w: 10.3, h: 1.0, fill: { color: "FFF7ED" }, line: { color: ORANGE, width: 1 }, rectRadius: 0.12 });
    s.addText("DutyBoost pre-activates just 1% of these travelers — turning browsers into motivated buyers before they reach your store.", { x: 1.8, y: 5.4, w: 9.7, h: 0.8, fontSize: 12, color: DARK, align: "center", fontFace: "Calibri" });
  }

  // --- SLIDE 4: HOW — The Ecosystem ---
  {
    const s = pptx.addSlide();
    s.background = { color: BLUE };
    s.addText("HOW", { x: 1, y: 0.6, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "BFDBFE", align: "center", fontFace: "Calibri", charSpacing: 4 });
    s.addText("Three flows. One platform.", { x: 1, y: 1.2, w: 11.3, h: 1.0, fontSize: 34, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("DutyBoost connects travel partners, travelers, and airport retailers in a closed-loop incentive engine.", { x: 1.5, y: 2.4, w: 10.3, h: 0.6, fontSize: 15, color: "DBEAFE", align: "center", fontFace: "Calibri" });
    const flows = [
      { label: "Travel Partner", desc: "Issues DutyCredits\nto bookers", color: "FFFFFF", bg: "FFFFFF" },
      { label: "Traveler", desc: "Receives DutyCredit\n→ shops at airport", color: "FFFFFF", bg: "FFFFFF33" },
      { label: "Airport Retailer", desc: "Scans QR →\nincremental revenue", color: ORANGE, bg: ORANGE },
    ];
    flows.forEach(({ label, desc, color: tc, bg }, i) => {
      const x = 0.8 + i * 4.1;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 3.5, w: 3.6, h: 2.5, fill: { color: bg, transparency: i === 1 ? 80 : 0 }, line: { color: "FFFFFF44", width: 1 }, rectRadius: 0.15 });
      s.addText(label, { x, y: 3.8, w: 3.6, h: 0.5, fontSize: 14, bold: true, color: tc, align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: 4.5, w: 3.2, h: 1.2, fontSize: 12, color: tc, align: "center", fontFace: "Calibri" });
      if (i < 2) {
        s.addText("→", { x: x + 3.6, y: 4.3, w: 0.5, h: 0.5, fontSize: 20, bold: true, color: "BFDBFE", align: "center", fontFace: "Calibri" });
      }
    });
  }

  // --- SLIDE 5: HOW — Traveller Flow ---
  {
    const s = pptx.addSlide();
    s.background = { color: GREEN };
    s.addText("HOW — FLOW 1", { x: 1, y: 0.5, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "A7F3D0", align: "center", fontFace: "Calibri", charSpacing: 3 });
    s.addText("The Traveller", { x: 1, y: 1.1, w: 11.3, h: 0.9, fontSize: 32, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("Receives a DutyCredit from their travel partner — or claims one themselves from the DutyBoost platform.", { x: 1.5, y: 2.2, w: 10.3, h: 0.9, fontSize: 14, color: "D1FAE5", align: "center", fontFace: "Calibri" });
    const wins = [
      { title: "Guaranteed discount", desc: "Save up to €60 per shopping basket at participating airport stores." },
      { title: "No app needed", desc: "One QR code at checkout. No loyalty card, no signup friction." },
      { title: "Real value", desc: "Genuine discounts at stores they were already walking past." },
    ];
    wins.forEach(({ title, desc }, i) => {
      const x = 0.8 + i * 4.0;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 3.5, w: 3.6, h: 2.8, fill: { color: "FFFFFF", transparency: 85 }, line: { color: "FFFFFF44", width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x, y: 3.7, w: 3.6, h: 0.5, fontSize: 14, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: 4.4, w: 3.2, h: 1.6, fontSize: 12, color: "D1FAE5", align: "center", fontFace: "Calibri", valign: "top" });
    });
  }

  // --- SLIDE 6: HOW — Travel Partner Flow ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("HOW — FLOW 2", { x: 1, y: 0.5, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: BLUE, align: "center", fontFace: "Calibri", charSpacing: 3 });
    s.addText("The Travel Partner", { x: 1, y: 1.1, w: 11.3, h: 0.9, fontSize: 32, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
    s.addText("Gives DutyCredits to travelers for booking on their platform — and earns passive ancillary revenue.", { x: 1.5, y: 2.2, w: 10.3, h: 0.6, fontSize: 14, color: SLATE, align: "center", fontFace: "Calibri" });
    const wins = [
      { title: "More loyalty", desc: "Travelers get a tangible reason to book again. DutyCredit = a perk that costs you nothing upfront." },
      { title: "Passive revenue", desc: "Earn commission on every DutyCredit redemption your travelers make at airport retail." },
      { title: "Zero effort", desc: "One-click API integration. No development needed — we handle everything." },
    ];
    wins.forEach(({ title, desc }, i) => {
      const x = 0.8 + i * 4.0;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 3.2, w: 3.6, h: 3.2, fill: { color: "EFF6FF" }, line: { color: BLUE, width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x, y: 3.4, w: 3.6, h: 0.5, fontSize: 14, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: 4.1, w: 3.2, h: 2.0, fontSize: 12, color: SLATE, align: "center", fontFace: "Calibri", valign: "top" });
    });
  }

  // --- SLIDE 7: HOW — Airport Retailer Flow ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFF7ED" };
    s.addText("HOW — FLOW 3", { x: 1, y: 0.5, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: ORANGE, align: "center", fontFace: "Calibri", charSpacing: 3 });
    s.addText("The Airport Retailer", { x: 1, y: 1.1, w: 11.3, h: 0.9, fontSize: 32, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
    s.addText("Inform passing travelers with signage. Scan them in-store. Use QR code stands to activate walkers.", { x: 1.5, y: 2.2, w: 10.3, h: 0.6, fontSize: 14, color: SLATE, align: "center", fontFace: "Calibri" });
    const wins = [
      { title: "Store signage", desc: "Counter signage and entrance stands inform travelers that you accept DutyCredits — increasing footfall.", stat: "+1%", statLabel: "incremental conversion" },
      { title: "Scan & redeem", desc: "Cashier scans the traveler's QR code. Two API calls. Discount applied automatically at the till." },
      { title: "In-store QR stands", desc: "Place QR code signage in-store so walking travelers can claim a DutyBoost credit on the spot — increasing basket size." },
    ];
    wins.forEach(({ title, desc }, i) => {
      const x = 0.8 + i * 4.0;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 3.2, w: 3.6, h: 3.2, fill: { color: "FFFFFF" }, line: { color: ORANGE, width: 2 }, rectRadius: 0.15 });
      s.addText(title, { x, y: 3.4, w: 3.6, h: 0.5, fontSize: 14, bold: true, color: ORANGE, align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: 4.1, w: 3.2, h: 2.0, fontSize: 12, color: SLATE, align: "center", fontFace: "Calibri", valign: "top" });
    });
  }

  // --- SLIDE 8: WHAT — Global Aggregation ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("WHAT — REVENUE PROJECTION", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: ORANGE, align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText(companyName, { x: 1, y: 0.9, w: 11.3, h: 0.7, fontSize: 24, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
    s.addText(`Global Aggregation — ${fmtNum(airportCount)} airports · ${fmtNum(storeCount)} stores · 3% conversion`, { x: 1, y: 1.6, w: 11.3, h: 0.4, fontSize: 13, color: SLATE, align: "center", fontFace: "Calibri" });
    const kpis = [
      { num: fmtEur(totals.dailyNet, 0), label: "Daily Net Revenue", color: DARK },
      { num: fmtEur(totals.monthlyNet, 0), label: "Monthly Net Revenue", color: GREEN },
      { num: fmtEur(totals.annualNet, 0), label: "Annual Net Revenue", color: GREEN },
      { num: fmtEur(totals.annualFee, 0), label: "Annual Platform Fee", color: ORANGE },
    ];
    kpis.forEach(({ num, label, color: tc }, i) => {
      const x = 0.5 + i * 3.15;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 2.4, w: 3.0, h: 2.2, fill: { color: i < 3 ? "F0FDF4" : "FFF7ED" }, line: { color: tc, width: 1 }, rectRadius: 0.15 });
      s.addText(num, { x, y: 2.7, w: 3.0, h: 0.9, fontSize: 18, bold: true, color: tc, align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.1, y: 3.7, w: 2.8, h: 0.6, fontSize: 11, color: SLATE, align: "center", fontFace: "Calibri" });
    });
    const extra = [
      { num: fmtNum(totals.totalDailyTravelers), label: "Daily Travelers" },
      { num: fmtNum(totals.dailyRedemptions), label: "Daily Redemptions" },
      { num: `€${totals.avgBasket.toFixed(2)}`, label: "Avg Basket" },
      { num: fmtNum(storeCount), label: "Total Stores" },
    ];
    extra.forEach(({ num, label }, i) => {
      const x = 0.5 + i * 3.15;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 4.9, w: 3.0, h: 1.5, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 }, rectRadius: 0.12 });
      s.addText(num, { x, y: 5.1, w: 3.0, h: 0.5, fontSize: 16, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.1, y: 5.7, w: 2.8, h: 0.4, fontSize: 10, color: SLATE, align: "center", fontFace: "Calibri" });
    });
    s.addText("Incremental revenue: 3% of pre-departure travelers who shop because they were pre-activated by a DutyCredit.", { x: 1, y: 6.7, w: 11.3, h: 0.4, fontSize: 9, color: SLATE, align: "center", fontFace: "Calibri", italic: true });
  }

  // --- SLIDE 9: WHAT — POS Implementation ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addText("WHAT — POS IMPLEMENTATION", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: ORANGE, align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Go live in 1–2 days.", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: "F1F5F9", align: "center", fontFace: "Calibri" });
    s.addText("Two API calls. Works with any POS system. No overhaul needed.", { x: 1.5, y: 1.7, w: 10.3, h: 0.4, fontSize: 14, color: "94A3B8", align: "center", fontFace: "Calibri" });
    const options = [
      { title: "Option A — API Integration", badge: "Recommended", desc: "Your POS calls the DutyBoost API directly. 1 line of code. Full automation." },
    ];
    options.forEach(({ title, badge, desc }, i) => {
      const x = 3.5;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 2.5, w: 5.0, h: 3.5, fill: { color: "1E293B" }, line: { color: ORANGE, width: 2 }, rectRadius: 0.15 });
      s.addText(badge, { x: x + 0.3, y: 2.7, w: 4.4, h: 0.3, fontSize: 9, bold: true, color: ORANGE, fontFace: "Calibri", charSpacing: 1 });
      s.addText(title, { x: x + 0.3, y: 3.1, w: 4.4, h: 0.5, fontSize: 13, bold: true, color: "F1F5F9", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.3, y: 3.7, w: 4.4, h: 2.0, fontSize: 11, color: "94A3B8", fontFace: "Calibri", valign: "top" });
    });
    const steps = ["1. Customer presents QR", "2. Cashier scans & validates", "3. Basket entered at checkout", "4. Discount applied automatically"];
    steps.forEach((step, i) => {
      s.addText(`${i + 1}.`, { x: 0.8, y: 6.3 + i * 0.0, w: 0.4, h: 0.3, fontSize: 10, bold: true, color: ORANGE, fontFace: "Calibri" });
    });
    s.addText("Flow: Scan QR → Validate (API) → Enter basket → Redeem (API) → Discount applied", { x: 0.8, y: 6.3, w: 11.7, h: 0.4, fontSize: 11, bold: true, color: "F1F5F9", fontFace: "Calibri" });
  }

  // --- SLIDE 10: WHAT — Dashboard Preview ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("WHAT — YOUR DASHBOARD", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: ORANGE, align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Real-time analytics at your fingertips", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
    const tabs = [
      { title: "Dashboard Tab", desc: "KPI cards: redemptions, net revenue, avg sale, platform fee. Bar charts for daily/monthly/yearly performance. Recent scan log with discount % and sale value." },
      { title: "Aggregation Tab", desc: "All airports combined. Total redemptions, gross revenue, platform fee, net revenue. Airport-by-airport breakdown table. Top 15 airports bar chart." },
      { title: "Profile Tab", desc: "Company details, store list, contact info, integration settings. API keys, webhook URLs, and billing configuration." },
    ];
    tabs.forEach(({ title, desc }, i) => {
      const x = 0.5 + i * 4.1;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 2.2, w: 3.8, h: 3.8, fill: { color: "FFF7ED" }, line: { color: ORANGE, width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x: x + 0.2, y: 2.4, w: 3.4, h: 0.5, fontSize: 14, bold: true, color: ORANGE, fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: 3.1, w: 3.4, h: 2.7, fontSize: 11, color: SLATE, fontFace: "Calibri", valign: "top" });
    });
  }

  // --- SLIDE 11: CTA ---
  {
    const s = pptx.addSlide();
    s.background = { color: ORANGE };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.3, w: 4.0, h: 1.5, sizing: { type: "contain", w: 4.0, h: 1.5 } });
    s.addText("Ready to boost your retail?", { x: 1, y: 2.2, w: 11.3, h: 1.0, fontSize: 38, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("Connect with our team to discuss integration, see a live demo,\nand start converting voucher traffic into revenue.", { x: 1.5, y: 3.4, w: 10.3, h: 1.0, fontSize: 15, color: "FFE4D6", align: "center", fontFace: "Calibri" });
    s.addText("rael@dutyboost.com", { x: 1, y: 4.8, w: 11.3, h: 0.5, fontSize: 16, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText(`© ${new Date().getFullYear()} DutyBoost · The Travel Retail Conversion Layer`, { x: 1, y: 6.8, w: 11.3, h: 0.4, fontSize: 11, color: "FFE4D6", align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-Presentation.pptx" });
}