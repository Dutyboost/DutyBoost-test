import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";
const DARK_BG = "0F172A";
const DARK_CARD = "1E293B";
const SLATE = "334155";
const BLUE = "3B82F6";
const ORANGE = "EA580C";
const GREEN = "10B981";
const WHITE = "FFFFFF";

export async function exportRetailerPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";

  // ─────────────────────────────────────────────
  // SLIDE 1: COVER
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addShape({ type: "rect", x: 0, y: 0, w: 13.33, h: 0.1, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.6, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });
    s.addText("The Future of Airport Retail", { x: 1, y: 2.3, w: 11.3, h: 0.8, fontSize: 48, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("with DutyBoost", { x: 1, y: 3.15, w: 11.3, h: 0.5, fontSize: 28, color: ORANGE, align: "center", fontFace: "Calibri", italic: true });
    s.addText("A performance-based revenue layer that sends pre-motivated travelers to your store.\nYou only pay when they spend.", { x: 1.5, y: 3.85, w: 10.3, h: 0.8, fontSize: 13, color: "94A3B8", align: "center", fontFace: "Calibri" });
    const stats = [
      { v: "2.5%", l: "fee per transaction" },
      { v: "€0", l: "upfront cost" },
      { v: "40:1", l: "ROI" },
    ];
    stats.forEach(({ v, l }, i) => {
      const x = 1.5 + i * 3.5;
      s.addShape({ type: "roundRect", x, y: 4.85, w: 3.0, h: 0.95, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addText(v, { x, y: 4.9, w: 3.0, h: 0.4, fontSize: 24, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(l, { x, y: 5.35, w: 3.0, h: 0.35, fontSize: 9, color: "94A3B8", align: "center", fontFace: "Calibri" });
    });
  }

  // ─────────────────────────────────────────────
  // SLIDE 2: THE OPPORTUNITY
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("The Opportunity", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: BLUE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Airport retail: a €40B+ market with a conversion problem", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("The demand is there. The spending intent is there. The technology to capture it wasn't — until now.", { x: 1.5, y: 1.65, w: 10.3, h: 0.6, fontSize: 12, color: "94A3B8", align: "center", fontFace: "Calibri" });
    const stats = [
      { n: "€40B+", l: "Global airport retail revenue", s: "Source: ACI 2024" },
      { n: "2.4B", l: "International passengers/year", s: "Source: IATA 2024" },
      { n: "~10%", l: "Average store conversion rate", s: "Source: m1nd-set" },
      { n: "72%", l: "Travelers browse but don't buy", s: "Source: TFWA" },
    ];
    stats.forEach(({ n, l, s }, i) => {
      const x = 0.35 + i * 3.15;
      s.addShape({ type: "roundRect", x, y: 2.5, w: 2.95, h: 3.2, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addText(n, { x, y: 2.75, w: 2.95, h: 0.9, fontSize: 34, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(l, { x: x + 0.15, y: 3.75, w: 2.65, h: 1.0, fontSize: 10, color: "CBD5E1", align: "center", fontFace: "Calibri" });
    });
    s.addShape({ type: "roundRect", x: 0.4, y: 5.85, w: 12.5, h: 0.85, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.12 });
    s.addText("DutyBoost converts the 72% who browse into buyers — by giving them a financial reason to spend before they arrive.", { x: 0.6, y: 5.93, w: 12.1, h: 0.65, fontSize: 12, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
  }

  // ─────────────────────────────────────────────
  // SLIDE 3: HOW IT WORKS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("How It Works", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: ORANGE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Pre-qualified buyers. Delivered to your store.", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("Four simple steps — fully automated. No effort required from your staff beyond scanning a QR code.", { x: 0.5, y: 1.4, w: 12.3, h: 0.4, fontSize: 11, color: "94A3B8", align: "center", fontFace: "Calibri" });
    const steps = [
      { n: "1", t: "Partner sends DutyCredit", b: "Travel agency, airline, hotel or car rental sends traveler a DutyCredit before departure — via booking confirmation email." },
      { n: "2", t: "Traveler arrives at airport", b: "Traveler opens their QR code on their phone. Valid from departure day through arrival day. Min. spend €70 at any store." },
      { n: "3", t: "Staff scans at checkout", b: "Your cashier opens app.dutyboost.com/scan on any device. Traveler shows QR. System auto-applies discount and logs transaction." },
      { n: "4", t: "You pay 2.5% monthly", b: "DutyBoost sends one invoice per month for all completed transactions. Pay only on what sold. Zero upfront. Zero risk." },
    ];
    steps.forEach(({ n, t, b }, i) => {
      const x = 0.35 + i * 3.15;
      s.addShape({ type: "roundRect", x, y: 2.0, w: 2.95, h: 4.2, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addShape({ type: "roundRect", x: x + 1.0, y: 2.1, w: 0.95, h: 0.95, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.48 });
      s.addText(n, { x: x + 1.0, y: 2.12, w: 0.95, h: 0.91, fontSize: 18, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(t, { x: x + 0.1, y: 3.2, w: 2.75, h: 0.6, fontSize: 11, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
      s.addText(b, { x: x + 0.15, y: 3.9, w: 2.65, h: 2.1, fontSize: 9.5, color: "94A3B8", align: "center", fontFace: "Calibri", valign: "top" });
    });
  }

  // ─────────────────────────────────────────────
  // SLIDE 4: DUTYCREDIT TIERS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("DutyCredit Discount Layer", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: BLUE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("What the traveler receives — how the discount works", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 26, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("Travelers receive a tiered DutyCredit. The more they spend in your store, the bigger the saving they unlock.", { x: 0.5, y: 1.45, w: 12.3, h: 0.45, fontSize: 11, color: "94A3B8", align: "center", fontFace: "Calibri" });
    const tiers = [
      { e: "🟡", n: "Boarding", r: "€70–€99", s: "€5–€10", d: "Extra sale you wouldn't have had" },
      { e: "🔵", n: "Priority", r: "€100–€199", s: "€15–€30", d: "Most common tier — strong incentive" },
      { e: "🟢", n: "Lounge", r: "€200–€299", s: "€35–€45", d: "Premium traveler — larger basket" },
      { e: "🟣", n: "VIP", r: "€300+", s: "€60", d: "Top-tier — maximum revenue" },
    ];
    const cw = [1.2, 2.3, 2.0, 2.0, 4.9];
    let xh = 0.3;
    const h = ["", "Tier", "Min. Spend", "Max Saving", "What it means"];
    h.forEach((hh, i) => {
      s.addShape({ type: "rect", x: xh, y: 2.05, w: cw[i], h: 0.45, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(hh, { x: xh + 0.05, y: 2.07, w: cw[i] - 0.1, h: 0.41, fontSize: 9, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: "center" });
      xh += cw[i];
    });
    tiers.forEach(({ e, n, r, s: sv, d }, ri) => {
      let xr = 0.3;
      const bg = ri % 2 === 0 ? "1E293B" : SLATE;
      const vals = [e, n, r, sv, d];
      vals.forEach((v, ci) => {
        s.addShape({ type: "rect", x: xr, y: 2.5 + ri * 0.75, w: cw[ci], h: 0.71, fill: { color: bg }, line: { color: "475569", width: 1 } });
        const c = ci === 3 ? BLUE : WHITE;
        const b = ci === 3;
        const f = ci === 3 ? 12 : ci === 4 ? 9 : 10;
        s.addText(v, { x: xr + 0.05, y: 2.52 + ri * 0.75, w: cw[ci] - 0.1, h: 0.67, fontSize: f, bold: b, color: c, fontFace: "Calibri", valign: "middle", align: ci === 4 ? "left" : "center" });
        xr += cw[ci];
      });
    });
    s.addShape({ type: "roundRect", x: 0.3, y: 5.5, w: 12.73, h: 0.8, fill: { color: "7C3C1E" }, line: { color: "C2410C", width: 1 }, rectRadius: 0.1 });
    s.addText("⚠ Minimum basket €70 · Single use · Valid departure day through arrival day · Applied automatically at checkout via QR scan", { x: 0.5, y: 5.55, w: 12.33, h: 0.7, fontSize: 9.5, bold: true, color: "FED7AA", fontFace: "Calibri", valign: "middle", align: "center" });
  }

  // ─────────────────────────────────────────────
  // SLIDE 5: RETAILER VALUE PROPOSITION
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("For Airport Retailers", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: ORANGE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("More sales. Zero upfront cost.", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("A performance model that works entirely in your favour — you only pay when a traveler actually spends in your store.", { x: 0.5, y: 1.45, w: 12.3, h: 0.45, fontSize: 11, color: "94A3B8", align: "center", fontFace: "Calibri" });
    const benefits = [
      { t: "Performance model only", b: "2.5% fee per completed transaction. No monthly fee, no setup cost. If no one redeems, you pay nothing." },
      { t: "Pre-motivated buyers", b: "Travelers arrive with a DutyCredit already in hand — committed to spending €70+ in your store before they even get there." },
      { t: "No POS overhaul needed", b: "Simple QR scan at checkout on any phone, tablet or screen. Works alongside your existing system. Live in minutes." },
      { t: "Real-time dashboard", b: "See every DutyCredit redemption, transaction value, and channel attribution the moment it happens — per store, per day." },
      { t: "Multiple revenue channels", b: "DutyCredits flow from travel agencies, airlines, hotels and car rentals. Diversified pipeline — not dependent on one partner." },
      { t: "Scalable from day one", b: "Start with 1–3 stores. Add more as volume grows. No lock-in contracts. No minimum commitments." },
    ];
    benefits.forEach(({ t, b }, i) => {
      const c = i % 2; const r = Math.floor(i / 2);
      const x = 0.35 + c * 6.35; const y = 2.0 + r * 1.55;
      s.addShape({ type: "roundRect", x, y, w: 6.15, h: 1.35, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.1 });
      s.addText(`✓ ${t}`, { x: x + 0.2, y: y + 0.1, w: 5.8, h: 0.4, fontSize: 11, bold: true, color: BLUE, fontFace: "Calibri" });
      s.addText(b, { x: x + 0.2, y: y + 0.55, w: 5.8, h: 0.65, fontSize: 9.5, color: "94A3B8", fontFace: "Calibri" });
    });
  }

  // ─────────────────────────────────────────────
  // SLIDE 6: THE APP — FULL FLOW WITH MOCKUPS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("The App Experience", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: BLUE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Phase A: Sign Up & Activate", { x: 0.5, y: 0.8, w: 12.3, h: 0.35, fontSize: 14, bold: true, color: BLUE, fontFace: "Calibri" });
    s.addText("Step 1: Register", { x: 0.5, y: 1.2, w: 3.0, h: 0.25, fontSize: 10, bold: true, color: WHITE, fontFace: "Calibri" });
    s.addText("Fill in store details at dutyboost.com/get-started. Activated within 1 business day.", { x: 0.5, y: 1.5, w: 3.0, h: 0.8, fontSize: 8.5, color: "94A3B8", fontFace: "Calibri" });
    s.addText("Step 2: Welcome Email", { x: 3.9, y: 1.2, w: 3.0, h: 0.25, fontSize: 10, bold: true, color: WHITE, fontFace: "Calibri" });
    s.addText("Receive login credentials. Your scan URL is app.dutyboost.com/scan. Works on any device.", { x: 3.9, y: 1.5, w: 3.0, h: 0.8, fontSize: 8.5, color: "94A3B8", fontFace: "Calibri" });
    s.addText("Step 3: Dashboard Live", { x: 7.3, y: 1.2, w: 3.0, h: 0.25, fontSize: 10, bold: true, color: WHITE, fontFace: "Calibri" });
    s.addText("Dashboard starts empty and fills up automatically with every redemption. Nothing to configure.", { x: 7.3, y: 1.5, w: 3.0, h: 0.8, fontSize: 8.5, color: "94A3B8", fontFace: "Calibri" });
    s.addText("Phase B: Traveler Arrives & Scans", { x: 0.5, y: 2.5, w: 12.3, h: 0.35, fontSize: 14, bold: true, color: ORANGE, fontFace: "Calibri" });
    s.addText("Traveler shows QR on phone → Staff scans at checkout → Voucher details appear → One tap to confirm redemption.", { x: 0.5, y: 2.95, w: 12.3, h: 0.5, fontSize: 10, color: "94A3B8", fontFace: "Calibri" });
    s.addText("Phase C: After Redemption", { x: 0.5, y: 3.6, w: 12.3, h: 0.35, fontSize: 14, bold: true, color: GREEN, fontFace: "Calibri" });
    s.addText("Transaction Confirmed Instantly", { x: 0.5, y: 4.05, w: 3.5, h: 0.25, fontSize: 10, bold: true, color: WHITE, fontFace: "Calibri" });
    s.addText("Basket: €148 | Discount: -€25 | Paid: €123 | Fee: €3.70 | Your Revenue: €144.30", { x: 0.5, y: 4.35, w: 3.5, h: 0.7, fontSize: 8.5, color: "94A3B8", fontFace: "Calibri" });
    s.addText("Dashboard Updates Live", { x: 4.3, y: 4.05, w: 3.5, h: 0.25, fontSize: 10, bold: true, color: WHITE, fontFace: "Calibri" });
    s.addText("Today: €1,388 | Scans: 9 | Month: €18,598 | Avg: €154. All transactions logged automatically.", { x: 4.3, y: 4.35, w: 3.5, h: 0.7, fontSize: 8.5, color: "94A3B8", fontFace: "Calibri" });
    s.addText("Monthly Invoice", { x: 8.1, y: 4.05, w: 3.5, h: 0.25, fontSize: 10, bold: true, color: WHITE, fontFace: "Calibri" });
    s.addText("DutyCredits: 127 | Volume: €19,050 | Fee: €476.25 | ROI: 40:1. One invoice. Zero surprises.", { x: 8.1, y: 4.35, w: 3.5, h: 0.7, fontSize: 8.5, color: "94A3B8", fontFace: "Calibri" });
  }

  // ─────────────────────────────────────────────
  // SLIDE 7: REVENUE CHANNELS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("Revenue Channels", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: BLUE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Three sources of pre-motivated buyers", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const channels = [
      { t: "1. Travel Partners & Airlines", s: "Largest active channel", items: ["1.4B+ bookings/year", "4.5B passengers/year", "60–85% email open rate", "Pre-sold intent"] },
      { t: "2. Accommodations", s: "Future channel — model ready", items: ["2B+ room nights/year", "45–60% email open", "High-value guests", "Check-out trigger"] },
      { t: "3. Car Rental", s: "Future channel — model ready", items: ["115M+ rentals/year", "70–85% open rate", "14–28 day window", "Natural airport link"] },
    ];
    channels.forEach(({ t, s: sub, items }, i) => {
      const x = 0.3 + i * 4.35;
      s.addShape({ type: "roundRect", x, y: 1.55, w: 4.15, h: 5.0, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addText(t, { x: x + 0.15, y: 1.7, w: 3.85, h: 0.45, fontSize: 11, bold: true, color: BLUE, fontFace: "Calibri" });
      s.addText(sub, { x: x + 0.15, y: 2.2, w: 3.85, h: 0.3, fontSize: 8, color: "94A3B8", fontFace: "Calibri", italic: true });
      items.forEach((item, j) => {
        s.addText(`• ${item}`, { x: x + 0.15, y: 2.6 + j * 0.65, w: 3.85, h: 0.6, fontSize: 9.5, color: "CBD5E1", fontFace: "Calibri" });
      });
    });
  }

  // ─────────────────────────────────────────────
  // SLIDE 8: COMBINED REVENUE MODEL
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("Combined Revenue Potential", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: ORANGE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("What all channels mean for 1 store", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("Conservative modelling · Single airport store · Min. basket €70 · Mixed channel volume", { x: 0.5, y: 1.45, w: 12.3, h: 0.35, fontSize: 10, color: "94A3B8", align: "center", fontFace: "Calibri" });
    const rows = [
      { ch: "Travel Partners & Airlines", gr: "€291,000", fe: "€7,275" },
      { ch: "Accommodations", gr: "€45,000", fe: "€1,125" },
      { ch: "Car Rental", gr: "€48,000", fe: "€1,200" },
    ];
    const cw = [4.0, 3.3, 2.6, 3.4];
    let xh = 0.35;
    ["Channel", "Gross Revenue", "Fee (2.5%)", ""].forEach((h, i) => {
      s.addShape({ type: "rect", x: xh, y: 1.95, w: cw[i], h: 0.45, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(h, { x: xh + 0.05, y: 1.97, w: cw[i] - 0.1, h: 0.41, fontSize: 9, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: "center" });
      xh += cw[i];
    });
    rows.forEach(({ ch, gr, fe }, ri) => {
      let xr = 0.35;
      const bg = ri % 2 === 0 ? "1E293B" : SLATE;
      [ch, gr, fe, ""].forEach((v, ci) => {
        s.addShape({ type: "rect", x: xr, y: 2.4 + ri * 0.72, w: cw[ci], h: 0.68, fill: { color: bg }, line: { color: "475569", width: 1 } });
        const c = ci === 1 ? GREEN : WHITE;
        const b = ci === 1;
        const f = ci === 1 ? 12 : 10;
        s.addText(v, { x: xr + 0.08, y: 2.42 + ri * 0.72, w: cw[ci] - 0.12, h: 0.64, fontSize: f, bold: b, color: c, fontFace: "Calibri", valign: "middle", align: "center" });
        xr += cw[ci];
      });
    });
    let xt = 0.35;
    ["TOTAL", "€384,000", "€9,600", ""].forEach((v, ci) => {
      s.addShape({ type: "rect", x: xt, y: 4.25, w: cw[ci], h: 0.72, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(v, { x: xt + 0.08, y: 4.27, w: cw[ci] - 0.12, h: 0.68, fontSize: ci === 1 ? 14 : 11, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: "center" });
      xt += cw[ci];
    });
    s.addShape({ type: "roundRect", x: 0.8, y: 5.15, w: 11.73, h: 1.25, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.1 });
    s.addText("40:1", { x: 1.1, y: 5.3, w: 2.2, h: 0.95, fontSize: 32, bold: true, color: BLUE, align: "center", fontFace: "Calibri", valign: "middle" });
    s.addText("ROI\n\nYou earn €384k\nYou pay €9.6k\nZero upfront\nZero risk", { x: 3.6, y: 5.25, w: 8.8, h: 1.0, fontSize: 11, color: "CBD5E1", fontFace: "Calibri" });
  }

  // ─────────────────────────────────────────────
  // SLIDE 9: INTEGRATION
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("Integration", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: ORANGE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Simple by design. Live in days.", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const steps = [
      { n: "1", t: "Register your store", b: "Sign up at dutyboost.com. Add store name, airport, and category. Takes 5 minutes." },
      { n: "2", t: "Set up QR scanning", b: "Use our web app on any device with a camera. No hardware purchase. No API integration required to start." },
      { n: "3", t: "Receive your first DutyCredits", b: "DutyBoost activates your store. Travelers with DutyCredits for your airport can now visit your store." },
      { n: "4", t: "Track & grow", b: "Real-time dashboard shows daily scans, revenue, and channel breakdown. Expand to more stores when ready." },
    ];
    steps.forEach(({ n, t, b }, i) => {
      const x = 0.35 + i * 3.15;
      s.addShape({ type: "roundRect", x, y: 1.6, w: 2.95, h: 4.5, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addShape({ type: "roundRect", x: x + 1.0, y: 1.75, w: 0.95, h: 0.95, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.48 });
      s.addText(n, { x: x + 1.0, y: 1.77, w: 0.95, h: 0.91, fontSize: 18, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(t, { x: x + 0.1, y: 2.85, w: 2.75, h: 0.55, fontSize: 10, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
      s.addText(b, { x: x + 0.15, y: 3.5, w: 2.65, h: 2.3, fontSize: 9, color: "94A3B8", align: "center", fontFace: "Calibri", valign: "top" });
    });
  }

  // ─────────────────────────────────────────────
  // SLIDE 10: PILOT PLAN
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("Let's Start Together", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: BLUE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Pilot: 1–3 stores. Zero risk. Real results.", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const phases = [
      { t: "Phase 1 · Onboard", c: BLUE, p: ["Register 1–3 stores", "Set up QR scan app", "Agree on reporting", "DutyBoost activates", "3–5 business days"] },
      { t: "Phase 2 · Go Live", c: GREEN, p: ["DutyCredits live", "Staff briefed (10 min)", "Dashboard access", "Track redemptions", "Week 1–4"] },
      { t: "Phase 3 · Scale", c: ORANGE, p: ["Review monthly report", "Add channels", "Expand stores", "Explore POS API", "Month 2 onwards"] },
    ];
    phases.forEach(({ t, c, p }, i) => {
      const x = 0.3 + i * 4.35;
      s.addShape({ type: "roundRect", x, y: 1.55, w: 4.15, h: 5.0, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addText(t, { x: x + 0.15, y: 1.7, w: 3.85, h: 0.45, fontSize: 12, bold: true, color: c, fontFace: "Calibri" });
      p.forEach((pt, j) => {
        s.addText(`• ${pt}`, { x: x + 0.2, y: 2.3 + j * 0.7, w: 3.75, h: 0.65, fontSize: 10, color: "CBD5E1", fontFace: "Calibri" });
      });
    });
  }

  // ─────────────────────────────────────────────
  // SLIDE 11: CLOSING CTA
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addShape({ type: "rect", x: 0, y: 0, w: 13.33, h: 0.1, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.6, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });
    s.addText("Ready to turn your airport", { x: 1, y: 2.2, w: 11.3, h: 0.45, fontSize: 36, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("footfall into revenue?", { x: 1, y: 2.7, w: 11.3, h: 0.45, fontSize: 36, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const cta = [
      { l: "Performance only", s: "2.5% fee per transaction" },
      { l: "No upfront cost", s: "Zero risk to get started" },
      { l: "Live in days", s: "Simple QR — no POS overhaul" },
    ];
    cta.forEach(({ l, s: sub }, i) => {
      const x = 1.0 + i * 3.8;
      s.addShape({ type: "roundRect", x, y: 3.6, w: 3.5, h: 1.5, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.15 });
      s.addText(l, { x, y: 3.75, w: 3.5, h: 0.45, fontSize: 13, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(sub, { x, y: 4.25, w: 3.5, h: 0.45, fontSize: 10, color: "94A3B8", align: "center", fontFace: "Calibri" });
    });
    s.addText("hello@dutyboost.com · www.dutyboost.com", { x: 1, y: 5.5, w: 11.3, h: 0.45, fontSize: 14, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
    s.addText(`© ${new Date().getFullYear()} DutyBoost B.V. · The Future of Airport Retail`, { x: 1, y: 6.75, w: 11.3, h: 0.3, fontSize: 9, color: "475569", align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-AirportRetailer-Presentation.pptx" });
}