import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";
const DARK = "0F172A";
const BLUE = "1E40AF";
const ORANGE = "EA580C";
const SLATE = "64748B";
const WHITE = "FFFFFF";
const LIGHT_BLUE_BG = "EFF6FF";

function addFooter(s, text = "DutyBoost · The Future of Airport Retail · hello@dutyboost.com") {
  s.addShape("rect", { x: 0, y: 7.1, w: 13.33, h: 0.4, fill: { color: DARK }, line: { color: DARK, width: 0 } });
  s.addText(text, { x: 0.3, y: 7.12, w: 12.7, h: 0.3, fontSize: 8, color: "94A3B8", fontFace: "Calibri", align: "center" });
}

export async function exportRetailerPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";

  // ─────────────────────────────────────────────
  // SLIDE 1: COVER
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 0.08, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.5, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });
    s.addText("The Future of Airport Retail", { x: 1, y: 2.1, w: 11.3, h: 1.1, fontSize: 38, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("with DutyBoost", { x: 1, y: 3.1, w: 11.3, h: 0.6, fontSize: 22, color: ORANGE, align: "center", fontFace: "Calibri", italic: true });
    s.addText("A performance-based revenue layer for airport retailers.\nYou only pay when a traveler spends.", { x: 1.5, y: 4.05, w: 10.3, h: 0.9, fontSize: 14, color: "94A3B8", align: "center", fontFace: "Calibri" });
    const keyStats = [
      { v: "2.5%", l: "fee per transaction" },
      { v: "€0", l: "upfront cost" },
      { v: "40:1", l: "ROI" },
    ];
    keyStats.forEach(({ v, l }, i) => {
      const x = 1.5 + i * 3.5;
      s.addShape("roundRect", { x, y: 5.2, w: 3.0, h: 0.9, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.1 });
      s.addText(v, { x, y: 5.25, w: 3.0, h: 0.4, fontSize: 22, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(l, { x, y: 5.65, w: 3.0, h: 0.35, fontSize: 9, color: SLATE, align: "center", fontFace: "Calibri" });
    });
    s.addText("2026 · Confidential", { x: 1, y: 6.7, w: 11.3, h: 0.3, fontSize: 9, color: "475569", align: "center", fontFace: "Calibri" });
  }

  // ─────────────────────────────────────────────
  // SLIDE 2: THE OPPORTUNITY
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addText("SLIDE 2 · THE OPPORTUNITY", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: BLUE, charSpacing: 3, fontFace: "Calibri", align: "center" });
    s.addText("Airport retail: a €40B+ market with a conversion problem", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const stats = [
      { num: "€40B+", label: "Global airport retail revenue" },
      { num: "2.4B", label: "International passengers/year" },
      { num: "~10%", label: "Average conversion rate" },
      { num: "72%", label: "Travelers browse but don't buy" },
    ];
    stats.forEach(({ num, label }, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape("roundRect", { x, y: 1.85, w: 2.95, h: 3.2, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.12 });
      s.addText(num, { x, y: 2.1, w: 2.95, h: 1.0, fontSize: 34, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.15, y: 3.2, w: 2.65, h: 1.5, fontSize: 10, color: SLATE, align: "center", fontFace: "Calibri", valign: "top" });
    });
    s.addShape("roundRect", { x: 0.4, y: 5.25, w: 12.5, h: 0.85, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.12 });
    s.addText("DutyBoost converts the 72% who browse into buyers — by giving them a financial reason to spend before they arrive.", { x: 0.6, y: 5.33, w: 12.1, h: 0.65, fontSize: 12, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 3: HOW IT WORKS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addText("SLIDE 3 · HOW IT WORKS", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: ORANGE, charSpacing: 3, fontFace: "Calibri", align: "center" });
    s.addText("Pre-qualified buyers. Delivered to your store.", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const steps = [
      { num: "1", title: "Partner sends DutyCredit", body: "Travel agency, airline, hotel or car rental sends traveler a DutyCredit before departure." },
      { num: "2", title: "Traveler arrives at airport", body: "Traveler has a QR code — valid from departure day through arrival day. Min. spend €70." },
      { num: "3", title: "Staff scans at checkout", body: "Your cashier scans QR. System auto-applies discount. Transaction logged in real time." },
      { num: "4", title: "You pay 2.5% monthly", body: "One invoice per month for all completed transactions. You only pay on what sold." },
    ];
    steps.forEach(({ num, title, body }, i) => {
      const x = 0.35 + i * 3.18;
      s.addShape("roundRect", { x, y: 1.8, w: 3.0, h: 4.2, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.15 });
      s.addShape("roundRect", { x: x + 1.1, y: 1.9, w: 0.8, h: 0.8, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.4 });
      s.addText(num, { x: x + 1.1, y: 1.92, w: 0.8, h: 0.76, fontSize: 16, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(title, { x: x + 0.1, y: 2.85, w: 2.8, h: 0.6, fontSize: 12, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
      s.addText(body, { x: x + 0.15, y: 3.55, w: 2.7, h: 2.1, fontSize: 10.5, color: SLATE, align: "center", fontFace: "Calibri", valign: "top" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 4: DUTYCREDIT DISCOUNT TIERS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addText("SLIDE 4 · DUTYCREDIT DISCOUNT LAYER", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: BLUE, charSpacing: 3, fontFace: "Calibri", align: "center" });
    s.addText("What the traveler receives — how the discount works", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    const tiers = [
      { tier: "🟡 Boarding", range: "€70–€99", saving: "€5–€10", note: "Extra sale you wouldn't have had" },
      { tier: "🔵 Priority", range: "€100–€199", saving: "€15–€30", note: "Most common tier — strong incentive" },
      { tier: "🟢 Lounge", range: "€200–€299", saving: "€35–€45", note: "Premium traveler — larger basket" },
      { tier: "🟣 VIP", range: "€300+", saving: "€60", note: "Top-tier — maximum revenue" },
    ];
    const colW = [2.5, 2.0, 1.8, 6.8];
    let xh = 0.3;
    const headers = ["Tier", "Min. Spend", "Max Saving", "What it means"];
    headers.forEach((h, i) => {
      s.addShape("rect", { x: xh, y: 1.7, w: colW[i], h: 0.45, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(h, { x: xh + 0.05, y: 1.72, w: colW[i] - 0.1, h: 0.41, fontSize: 9.5, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: "center" });
      xh += colW[i];
    });
    tiers.forEach(({ tier, range, saving, note }, ri) => {
      let xr = 0.3;
      const vals = [tier, range, saving, note];
      const bg = ri % 2 === 0 ? LIGHT_BLUE_BG : "F8FAFC";
      vals.forEach((v, ci) => {
        s.addShape("rect", { x: xr, y: 2.15 + ri * 0.7, w: colW[ci], h: 0.66, fill: { color: bg }, line: { color: "E2E8F0", width: 1 } });
        s.addText(v, { x: xr + 0.08, y: 2.17 + ri * 0.7, w: colW[ci] - 0.12, h: 0.62, fontSize: ci === 2 ? 12 : 10, bold: ci === 2, color: ci === 2 ? BLUE : DARK, fontFace: "Calibri", valign: "middle", align: ci === 3 ? "left" : "center" });
        xr += colW[ci];
      });
    });
    s.addShape("roundRect", { x: 0.3, y: 5.95, w: 12.73, h: 0.75, fill: { color: "FFF7ED" }, line: { color: "FED7AA", width: 1 }, rectRadius: 0.1 });
    s.addText("⚠ Minimum basket €70 · Single use · Valid departure day through arrival day · Applied automatically at checkout", { x: 0.5, y: 6.0, w: 12.33, h: 0.65, fontSize: 10, bold: true, color: ORANGE, fontFace: "Calibri", valign: "middle", align: "center" });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 5: RETAILER VALUE PROPOSITION
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addText("SLIDE 5 · FOR AIRPORT RETAILERS", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: ORANGE, charSpacing: 3, fontFace: "Calibri", align: "center" });
    s.addText("More sales. Zero upfront cost.", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 28, bold: true, color: DARK, fontFace: "Calibri" });
    const benefits = [
      { title: "Performance model only", body: "2.5% fee per transaction. No setup cost." },
      { title: "Pre-motivated buyers", body: "Travelers arrive committed to spending €70+." },
      { title: "No POS overhaul", body: "Simple QR scan on any device." },
      { title: "Real-time dashboard", body: "Track redemptions, revenue, channels." },
      { title: "Multiple revenue channels", body: "Agencies, airlines, hotels, car rentals." },
      { title: "Scalable from day one", body: "Start with 1–3 stores. No lock-in." },
    ];
    benefits.forEach(({ title, body }, i) => {
      const col = i % 2; const row = Math.floor(i / 2);
      const x = 0.4 + col * 6.35; const y = 1.75 + row * 1.55;
      s.addShape("roundRect", { x, y, w: 6.15, h: 1.35, fill: { color: i % 2 === 0 ? "FFF7ED" : LIGHT_BLUE_BG }, line: { color: i % 2 === 0 ? "FED7AA" : "DBEAFE", width: 1 }, rectRadius: 0.1 });
      s.addText(`✓ ${title}`, { x: x + 0.2, y: y + 0.1, w: 5.8, h: 0.4, fontSize: 12, bold: true, color: DARK, fontFace: "Calibri" });
      s.addText(body, { x: x + 0.2, y: y + 0.55, w: 5.8, h: 0.65, fontSize: 10.5, color: SLATE, fontFace: "Calibri" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 6: THE APP — DASHBOARD MOCKUP
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addText("SLIDE 6 · THE APP EXPERIENCE", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: BLUE, charSpacing: 3, fontFace: "Calibri", align: "center" });
    s.addText("Three moments. Your dashboard updates live.", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 28, bold: true, color: DARK, fontFace: "Calibri" });
    s.addText("From sign-up to monthly invoice — everything tracked automatically. No manual admin.", { x: 0.5, y: 1.5, w: 12.3, h: 0.35, fontSize: 11, color: SLATE, align: "center", fontFace: "Calibri" });
    // Dashboard mockup
    s.addShape("roundRect", { x: 1.0, y: 2.1, w: 11.33, h: 4.5, fill: { color: "1E293B" }, line: { color: "334155", width: 1 }, rectRadius: 0.15 });
    s.addShape("rect", { x: 1.0, y: 2.1, w: 11.33, h: 0.4, fill: { color: "0F172A" }, line: { color: "0F172A", width: 0 } });
    s.addText("Relay Store · AMS T3 | Updated just now", { x: 1.3, y: 2.13, w: 10.7, h: 0.34, fontSize: 9, color: "94A3B8", fontFace: "Calibri" });
    const kpis = [
      { l: "Today's Revenue", v: "€1,388", c: "4ADE80" },
      { l: "Scans Today", v: "9", c: "93C5FD" },
      { l: "This Month", v: "€18,598", c: "C4B5FD" },
      { l: "Avg. Basket", v: "€154", c: "FB923C" },
    ];
    kpis.forEach(({ l, v, c }, i) => {
      const kx = 1.2 + (i % 2) * 5.3;
      const ky = 2.7 + Math.floor(i / 2) * 0.95;
      s.addShape("roundRect", { x: kx, y: ky, w: 4.8, h: 0.82, fill: { color: "334155" }, line: { color: "475569", width: 1 }, rectRadius: 0.08 });
      s.addText(l, { x: kx + 0.15, y: ky + 0.06, w: 2.2, h: 0.28, fontSize: 8, color: "94A3B8", fontFace: "Calibri" });
      s.addText(v, { x: kx + 2.4, y: ky + 0.06, w: 2.25, h: 0.7, fontSize: 18, bold: true, color: c, align: "right", fontFace: "Calibri" });
    });
    // Recent transactions
    s.addText("Recent Transactions", { x: 1.3, y: 4.7, w: 3.0, h: 0.25, fontSize: 9, bold: true, color: "CBD5E1", fontFace: "Calibri" });
    const txns = [
      { n: "J. Martens", v: "€144.30", ch: "Agency" },
      { n: "S. Bakker", v: "€187.50", ch: "Airline" },
      { n: "M. Chen", v: "€95.20", ch: "Hotel" },
    ];
    txns.forEach(({ n, v, ch }, i) => {
      const ty = 5.0 + i * 0.32;
      s.addText(n, { x: 1.3, y: ty, w: 3.0, h: 0.28, fontSize: 9, color: "CBD5E1", fontFace: "Calibri" });
      s.addText(v, { x: 4.4, y: ty, w: 2.0, h: 0.28, fontSize: 10, bold: true, color: "4ADE80", align: "right", fontFace: "Calibri" });
      s.addText(ch, { x: 6.6, y: ty, w: 5.5, h: 0.28, fontSize: 8, color: "94A3B8", fontFace: "Calibri" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 7: REVENUE CHANNELS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addText("SLIDE 7 · REVENUE CHANNELS", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: BLUE, charSpacing: 3, fontFace: "Calibri", align: "center" });
    s.addText("Three sources of pre-motivated buyers", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 28, bold: true, color: DARK, fontFace: "Calibri" });
    const channels = [
      { title: "1. Travel Partners & Airlines", sub: "Largest active channel", items: ["1.4B+ bookings/year", "4.5B passengers/year", "60–85% email open rate", "Pre-sold intent"] },
      { title: "2. Accommodations", sub: "Future channel — model ready", items: ["2B+ room nights/year", "45–60% departure email open", "High-value guests", "Check-out email trigger"] },
      { title: "3. Car Rental", sub: "Future channel — model ready", items: ["115M+ rentals/year", "70–85% open rate", "14–28 day booking window", "Natural airport link"] },
    ];
    channels.forEach(({ title, sub, items }, i) => {
      const x = 0.4 + i * 4.25;
      const colors = [BLUE, "059669", ORANGE];
      s.addShape("roundRect", { x, y: 1.6, w: 4.05, h: 5.3, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 }, rectRadius: 0.12 });
      s.addText(title, { x: x + 0.2, y: 1.75, w: 3.65, h: 0.45, fontSize: 11, bold: true, color: colors[i], fontFace: "Calibri" });
      s.addText(sub, { x: x + 0.2, y: 2.25, w: 3.65, h: 0.3, fontSize: 8, color: SLATE, fontFace: "Calibri", italic: true });
      items.forEach((item, j) => {
        s.addText(`• ${item}`, { x: x + 0.2, y: 2.65 + j * 0.6, w: 3.65, h: 0.55, fontSize: 9, color: "334155", fontFace: "Calibri" });
      });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 8: COMBINED REVENUE MODEL
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addText("SLIDE 8 · COMBINED REVENUE POTENTIAL", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: ORANGE, charSpacing: 3, fontFace: "Calibri", align: "center" });
    s.addText("What all channels mean for 1 store", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const rows = [
      { channel: "Travel Partners & Airlines", gross: "€291,000", fee: "€7,275" },
      { channel: "Accommodations", gross: "€45,000", fee: "€1,125" },
      { channel: "Car Rental", gross: "€48,000", fee: "€1,200" },
    ];
    const colW = [4.5, 3.5, 2.5, 2.8];
    let xh = 0.35;
    const headers = ["Channel", "Gross Revenue", "Fee (2.5%)", ""];
    headers.forEach((h, i) => {
      s.addShape("rect", { x: xh, y: 1.8, w: colW[i], h: 0.45, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(h, { x: xh + 0.05, y: 1.82, w: colW[i] - 0.1, h: 0.41, fontSize: 9.5, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: "center" });
      xh += colW[i];
    });
    rows.forEach(({ channel, gross, fee }, ri) => {
      let xr = 0.35;
      const vals = [channel, gross, fee, ""];
      const bg = ri % 2 === 0 ? LIGHT_BLUE_BG : "F8FAFC";
      vals.forEach((v, ci) => {
        s.addShape("rect", { x: xr, y: 2.25 + ri * 0.72, w: colW[ci], h: 0.68, fill: { color: bg }, line: { color: "E2E8F0", width: 1 } });
        s.addText(v, { x: xr + 0.08, y: 2.27 + ri * 0.72, w: colW[ci] - 0.12, h: 0.64, fontSize: ci === 1 ? 12 : 11, bold: ci === 1, color: ci === 1 ? "059669" : DARK, fontFace: "Calibri", valign: "middle", align: "center" });
        xr += colW[ci];
      });
    });
    let xt = 0.35;
    const totals = ["TOTAL", "€384,000", "€9,600", ""];
    totals.forEach((v, ci) => {
      s.addShape("rect", { x: xt, y: 4.6, w: colW[ci], h: 0.72, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(v, { x: xt + 0.08, y: 4.62, w: colW[ci] - 0.12, h: 0.68, fontSize: ci === 1 ? 14 : 11, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: "center" });
      xt += colW[ci];
    });
    s.addShape("roundRect", { x: 1.0, y: 5.5, w: 11.33, h: 1.3, fill: { color: "EFF6FF" }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.1 });
    s.addText("ROI: 40:1", { x: 1.3, y: 5.65, w: 3.0, h: 0.6, fontSize: 28, bold: true, color: BLUE, fontFace: "Calibri" });
    s.addText("You earn €384,000 in extra revenue.\nYou pay €9,600 in total fees.\nZero upfront cost. Zero risk.", { x: 4.5, y: 5.6, w: 7.5, h: 1.0, fontSize: 12, color: DARK, fontFace: "Calibri", valign: "middle" });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 9: INTEGRATION
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addText("SLIDE 9 · INTEGRATION", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: ORANGE, charSpacing: 3, fontFace: "Calibri", align: "center" });
    s.addText("Simple by design. Live in days.", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const steps = [
      { num: "1", title: "Register your store", body: "Sign up. Add store name, airport, category. Takes 5 minutes." },
      { num: "2", title: "Set up QR scanning", body: "Use our web app on any device. No hardware. No API integration required." },
      { num: "3", title: "Receive DutyCredits", body: "DutyBoost activates your store. Travelers can now redeem." },
      { num: "4", title: "Track & grow", body: "Real-time dashboard. Expand to more stores when ready." },
    ];
    steps.forEach(({ num, title, body }, i) => {
      const x = 0.35 + i * 3.18;
      s.addShape("roundRect", { x, y: 1.8, w: 3.0, h: 4.4, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.15 });
      s.addShape("roundRect", { x: x + 1.0, y: 1.9, w: 1.0, h: 1.0, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.5 });
      s.addText(num, { x: x + 1.0, y: 1.92, w: 1.0, h: 0.96, fontSize: 20, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(title, { x: x + 0.1, y: 3.0, w: 2.8, h: 0.55, fontSize: 12, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
      s.addText(body, { x: x + 0.15, y: 3.65, w: 2.7, h: 2.1, fontSize: 10.5, color: SLATE, align: "center", fontFace: "Calibri", valign: "top" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 10: PILOT PLAN
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addText("SLIDE 10 · LET'S START TOGETHER", { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color: BLUE, charSpacing: 3, fontFace: "Calibri", align: "center" });
    s.addText("Pilot: 1–3 stores. Zero risk. Real results.", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 28, bold: true, color: DARK, fontFace: "Calibri" });
    const phases = [
      { title: "Phase 1 · Onboard", color: BLUE, bg: LIGHT_BLUE_BG, points: ["Register 1–3 stores", "Set up QR scan app", "Agree on reporting", "DutyBoost activates", "3–5 business days"] },
      { title: "Phase 2 · Go Live", color: "059669", bg: "F0FDF4", points: ["DutyCredits live", "Staff briefed (10 min)", "Dashboard access", "Track redemptions", "Week 1–4"] },
      { title: "Phase 3 · Scale", color: ORANGE, bg: "FFF7ED", points: ["Review monthly report", "Add channels", "Expand stores", "Explore POS API", "Month 2 onwards"] },
    ];
    phases.forEach(({ title, color, bg, points }, i) => {
      const x = 0.35 + i * 4.3;
      s.addShape("roundRect", { x, y: 1.8, w: 4.1, h: 5.1, fill: { color: bg }, line: { color: bg === LIGHT_BLUE_BG ? "DBEAFE" : bg === "F0FDF4" ? "BBF7D0" : "FED7AA", width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x: x + 0.15, y: 1.95, w: 3.8, h: 0.5, fontSize: 12, bold: true, color, fontFace: "Calibri" });
      points.forEach((p, j) => {
        s.addText(`• ${p}`, { x: x + 0.2, y: 2.6 + j * 0.72, w: 3.7, h: 0.65, fontSize: 10.5, color: "334155", fontFace: "Calibri" });
      });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 11: CLOSING CTA
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 0.08, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.5, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });
    s.addText("Ready to turn your airport\nfootfall into revenue?", { x: 1, y: 2.1, w: 11.3, h: 1.5, fontSize: 34, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const ctaItems = [
      { label: "Performance only", sub: "2.5% fee per transaction" },
      { label: "No upfront cost", sub: "Zero risk to get started" },
      { label: "Live in days", sub: "Simple QR — no POS overhaul" },
    ];
    ctaItems.forEach(({ label, sub }, i) => {
      const x = 1.0 + i * 3.8;
      s.addShape("roundRect", { x, y: 4.0, w: 3.5, h: 1.4, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.15 });
      s.addText(label, { x, y: 4.15, w: 3.5, h: 0.45, fontSize: 13, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
      s.addText(sub, { x, y: 4.65, w: 3.5, h: 0.4, fontSize: 11, color: BLUE, align: "center", fontFace: "Calibri" });
    });
    s.addText("hello@dutyboost.com · www.dutyboost.com", { x: 1, y: 5.7, w: 11.3, h: 0.5, fontSize: 15, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
    s.addText(`© ${new Date().getFullYear()} DutyBoost B.V. · The Future of Airport Retail`, { x: 1, y: 6.75, w: 11.3, h: 0.3, fontSize: 9, color: SLATE, align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-AirportRetailer-Presentation.pptx" });
}