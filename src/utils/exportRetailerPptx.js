import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";
const DARK_BG = "0F172A";
const DARK_CARD = "1E293B";
const SLATE = "334155";
const SLATE_LIGHT = "64748B";
const BLUE = "3B82F6";
const BLUE_DARK = "1E40AF";
const ORANGE = "EA580C";
const WHITE = "FFFFFF";
const GREEN = "10B981";

function addDarkFooter(s) {
  s.addShape("rect", { x: 0, y: 7.05, w: 13.33, h: 0.45, fill: { color: DARK_BG }, line: { color: DARK_BG, width: 0 } });
  s.addText("hello@dutyboost.com · www.dutyboost.com", { x: 0.3, y: 7.12, w: 12.7, h: 0.3, fontSize: 8, color: "64748B", fontFace: "Calibri", align: "center" });
}

export async function exportRetailerPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";

  // ─────────────────────────────────────────────
  // SLIDE 1: COVER
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 0.1, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.6, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });
    s.addText("The Future of Airport Retail", { x: 1, y: 2.3, w: 11.3, h: 0.8, fontSize: 48, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("with DutyBoost", { x: 1, y: 3.15, w: 11.3, h: 0.5, fontSize: 28, color: ORANGE, align: "center", fontFace: "Calibri", italic: true });
    s.addText("A performance-based revenue layer that sends pre-motivated travelers to your store.\nYou only pay when they spend.", { x: 1.5, y: 3.85, w: 10.3, h: 0.8, fontSize: 13, color: "94A3B8", align: "center", fontFace: "Calibri" });
    const keyStats = [
      { v: "2.5%", l: "fee per transaction" },
      { v: "€0", l: "upfront cost" },
      { v: "40:1", l: "ROI" },
    ];
    keyStats.forEach(({ v, l }, i) => {
      const x = 1.5 + i * 3.5;
      s.addShape("roundRect", { x, y: 4.85, w: 3.0, h: 0.95, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addText(v, { x, y: 4.9, w: 3.0, h: 0.4, fontSize: 24, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(l, { x, y: 5.35, w: 3.0, h: 0.35, fontSize: 9, color: "94A3B8", align: "center", fontFace: "Calibri" });
    });
    s.addText("© 2026 DutyBoost B.V. · Confidential", { x: 1, y: 6.8, w: 11.3, h: 0.25, fontSize: 8, color: "475569", align: "center", fontFace: "Calibri" });
  }

  // ─────────────────────────────────────────────
  // SLIDE 2: THE OPPORTUNITY
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("SLIDE 2 · THE OPPORTUNITY", { x: 0.5, y: 0.35, w: 12.3, h: 0.28, fontSize: 8, bold: true, color: BLUE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Airport retail: a €40B+ market with a", { x: 0.5, y: 0.75, w: 12.3, h: 0.4, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("conversion problem", { x: 0.5, y: 1.15, w: 12.3, h: 0.4, fontSize: 28, bold: true, color: "EF4444", align: "center", fontFace: "Calibri" });
    const stats = [
      { num: "€40B+", label: "Global airport retail revenue" },
      { num: "2.4B", label: "International passengers/year" },
      { num: "~10%", label: "Average conversion rate" },
      { num: "72%", label: "Travelers browse but don't buy" },
    ];
    stats.forEach(({ num, label }, i) => {
      const x = 0.35 + i * 3.15;
      s.addShape("roundRect", { x, y: 1.75, w: 3.0, h: 3.3, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addText(num, { x, y: 2.05, w: 3.0, h: 0.95, fontSize: 36, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.15, y: 3.1, w: 2.7, h: 1.6, fontSize: 10, color: "CBD5E1", align: "center", fontFace: "Calibri", valign: "top" });
    });
    s.addShape("roundRect", { x: 0.35, y: 5.3, w: 12.63, h: 0.9, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.12 });
    s.addText("DutyBoost converts the 72% who browse into buyers — by giving them a financial reason to spend before they arrive.", { x: 0.6, y: 5.4, w: 12.13, h: 0.7, fontSize: 12, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
    addDarkFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 3: HOW IT WORKS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("SLIDE 3 · HOW IT WORKS", { x: 0.5, y: 0.35, w: 12.3, h: 0.28, fontSize: 8, bold: true, color: ORANGE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Pre-qualified buyers. Delivered to your store.", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const steps = [
      { num: "1", title: "Partner sends DutyCredit", body: "Travel agency, airline, hotel or car rental sends traveler a DutyCredit before departure." },
      { num: "2", title: "Traveler arrives at airport", body: "Traveler has a QR code — valid from departure day through arrival day. Min. spend €70." },
      { num: "3", title: "Staff scans at checkout", body: "Your cashier scans QR. System auto-applies discount. Transaction logged in real time." },
      { num: "4", title: "You pay 2.5% monthly", body: "One invoice per month for all completed transactions. Pay only on what sold." },
    ];
    steps.forEach(({ num, title, body }, i) => {
      const x = 0.35 + i * 3.15;
      s.addShape("roundRect", { x, y: 1.65, w: 3.0, h: 4.4, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addShape("roundRect", { x: x + 1.05, y: 1.75, w: 0.9, h: 0.9, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.45 });
      s.addText(num, { x: x + 1.05, y: 1.77, w: 0.9, h: 0.86, fontSize: 18, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(title, { x: x + 0.1, y: 2.8, w: 2.8, h: 0.6, fontSize: 11, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
      s.addText(body, { x: x + 0.15, y: 3.5, w: 2.7, h: 2.2, fontSize: 10, color: "94A3B8", align: "center", fontFace: "Calibri", valign: "top" });
    });
    addDarkFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 4: DUTYCREDIT TIERS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("SLIDE 4 · DUTYCREDIT DISCOUNT LAYER", { x: 0.5, y: 0.35, w: 12.3, h: 0.28, fontSize: 8, bold: true, color: BLUE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("What the traveler receives — how the discount works", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 26, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const tiers = [
      { tier: "🟡 Boarding", range: "€70–€99", saving: "€5–€10" },
      { tier: "🔵 Priority", range: "€100–€199", saving: "€15–€30" },
      { tier: "🟢 Lounge", range: "€200–€299", saving: "€35–€45" },
      { tier: "🟣 VIP", range: "€300+", saving: "€60" },
    ];
    const colW = [2.8, 2.8, 2.8, 3.9];
    let xh = 0.25;
    const headers = ["Tier", "Min. Spend", "Max Saving", "What it means"];
    headers.forEach((h, i) => {
      s.addShape("rect", { x: xh, y: 1.55, w: colW[i], h: 0.45, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(h, { x: xh + 0.05, y: 1.57, w: colW[i] - 0.1, h: 0.41, fontSize: 9, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: "center" });
      xh += colW[i];
    });
    tiers.forEach(({ tier, range, saving }, ri) => {
      let xr = 0.25;
      const vals = [tier, range, saving, "Tier for different spending levels"];
      const bg = ri % 2 === 0 ? "1E293B" : "334155";
      vals.forEach((v, ci) => {
        s.addShape("rect", { x: xr, y: 2.0 + ri * 0.75, w: colW[ci], h: 0.71, fill: { color: bg }, line: { color: "475569", width: 1 } });
        const textColor = ci === 2 ? BLUE : ci === 0 ? WHITE : "94A3B8";
        const fontSize = ci === 2 ? 13 : 10;
        const bold = ci === 2;
        s.addText(v, { x: xr + 0.08, y: 2.02 + ri * 0.75, w: colW[ci] - 0.12, h: 0.67, fontSize, bold, color: textColor, fontFace: "Calibri", valign: "middle", align: "center" });
        xr += colW[ci];
      });
    });
    s.addShape("roundRect", { x: 0.25, y: 5.55, w: 12.83, h: 0.8, fill: { color: "7C3C1E" }, line: { color: "C2410C", width: 1 }, rectRadius: 0.1 });
    s.addText("⚠ Minimum basket €70 · Single use · Valid departure day through arrival day · Applied automatically at checkout", { x: 0.45, y: 5.6, w: 12.43, h: 0.7, fontSize: 10, bold: true, color: "FED7AA", fontFace: "Calibri", valign: "middle", align: "center" });
    addDarkFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 5: RETAILER VALUE PROPOSITION
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("SLIDE 5 · FOR AIRPORT RETAILERS", { x: 0.5, y: 0.35, w: 12.3, h: 0.28, fontSize: 8, bold: true, color: ORANGE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("More sales. Zero upfront cost.", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
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
      const x = 0.35 + col * 6.35; const y = 1.55 + row * 1.6;
      s.addShape("roundRect", { x, y, w: 6.15, h: 1.42, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.1 });
      s.addText(`✓ ${title}`, { x: x + 0.2, y: y + 0.08, w: 5.8, h: 0.4, fontSize: 11, bold: true, color: BLUE, fontFace: "Calibri" });
      s.addText(body, { x: x + 0.2, y: y + 0.55, w: 5.8, h: 0.7, fontSize: 10, color: "94A3B8", fontFace: "Calibri" });
    });
    addDarkFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 6: THE APP DASHBOARD
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("SLIDE 6 · THE APP EXPERIENCE", { x: 0.5, y: 0.35, w: 12.3, h: 0.28, fontSize: 8, bold: true, color: BLUE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Your real-time dashboard. Updated live.", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addShape("roundRect", { x: 0.8, y: 1.55, w: 11.73, h: 4.8, fill: { color: "1E293B" }, line: { color: "475569", width: 1 }, rectRadius: 0.15 });
    s.addShape("rect", { x: 0.8, y: 1.55, w: 11.73, h: 0.42, fill: { color: "0F172A" }, line: { color: "0F172A", width: 0 } });
    s.addText("Relay Store · AMS T3 | Updated just now", { x: 1.05, y: 1.58, w: 11.2, h: 0.36, fontSize: 9, color: "94A3B8", fontFace: "Calibri" });
    const kpis = [
      { l: "Today's Revenue", v: "€1,388", c: GREEN },
      { l: "Scans Today", v: "9", c: BLUE },
      { l: "This Month", v: "€18,598", c: "C084FC" },
      { l: "Avg. Basket", v: "€154", c: ORANGE },
    ];
    kpis.forEach(({ l, v, c }, i) => {
      const kx = 1.0 + (i % 2) * 5.4;
      const ky = 2.2 + Math.floor(i / 2) * 1.05;
      s.addShape("roundRect", { x: kx, y: ky, w: 5.1, h: 0.92, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.08 });
      s.addText(l, { x: kx + 0.15, y: ky + 0.08, w: 2.3, h: 0.3, fontSize: 8, color: "94A3B8", fontFace: "Calibri" });
      s.addText(v, { x: kx + 2.5, y: ky + 0.08, w: 2.45, h: 0.76, fontSize: 20, bold: true, color: c, align: "right", fontFace: "Calibri" });
    });
    s.addText("Recent Transactions", { x: 1.05, y: 4.5, w: 3.5, h: 0.28, fontSize: 9, bold: true, color: "CBD5E1", fontFace: "Calibri" });
    const txns = [
      { n: "J. Martens — €144.30", ch: "Agency", c: "64B5F6" },
      { n: "S. Bakker — €187.50", ch: "Airline", c: "60A5FA" },
      { n: "M. Chen — €95.20", ch: "Hotel", c: "3B82F6" },
    ];
    txns.forEach(({ n, ch, c }, i) => {
      const ty = 4.85 + i * 0.35;
      s.addText(n, { x: 1.05, y: ty, w: 4.0, h: 0.3, fontSize: 9, color: "CBD5E1", fontFace: "Calibri" });
      s.addText(ch, { x: 5.3, y: ty, w: 6.1, h: 0.3, fontSize: 8, color: c, align: "right", fontFace: "Calibri" });
    });
    addDarkFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 7: REVENUE CHANNELS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("SLIDE 7 · REVENUE CHANNELS", { x: 0.5, y: 0.35, w: 12.3, h: 0.28, fontSize: 8, bold: true, color: BLUE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Three sources of pre-motivated buyers", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const channels = [
      { title: "Travel Partners & Airlines", sub: "Largest active channel", items: ["1.4B+ bookings/year", "4.5B passengers/year", "60–85% open rate", "Pre-sold intent"] },
      { title: "Accommodations", sub: "Future channel — model ready", items: ["2B+ room nights/year", "45–60% email open", "High-value guests", "Check-out trigger"] },
      { title: "Car Rental", sub: "Future channel — model ready", items: ["115M+ rentals/year", "70–85% open rate", "14–28 day window", "Natural airport link"] },
    ];
    channels.forEach(({ title, sub, items }, i) => {
      const x = 0.3 + i * 4.35;
      s.addShape("roundRect", { x, y: 1.55, w: 4.15, h: 5.35, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addText(title, { x: x + 0.15, y: 1.7, w: 3.85, h: 0.5, fontSize: 11, bold: true, color: BLUE, fontFace: "Calibri" });
      s.addText(sub, { x: x + 0.15, y: 2.25, w: 3.85, h: 0.32, fontSize: 8, color: "94A3B8", fontFace: "Calibri", italic: true });
      items.forEach((item, j) => {
        s.addText(`• ${item}`, { x: x + 0.15, y: 2.65 + j * 0.65, w: 3.85, h: 0.6, fontSize: 9, color: "CBD5E1", fontFace: "Calibri" });
      });
    });
    addDarkFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 8: COMBINED REVENUE MODEL
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("SLIDE 8 · COMBINED REVENUE POTENTIAL", { x: 0.5, y: 0.35, w: 12.3, h: 0.28, fontSize: 8, bold: true, color: ORANGE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("What all channels mean for 1 store", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const rows = [
      { channel: "Travel Partners & Airlines", gross: "€291,000", fee: "€7,275" },
      { channel: "Accommodations", gross: "€45,000", fee: "€1,125" },
      { channel: "Car Rental", gross: "€48,000", fee: "€1,200" },
    ];
    const colW = [4.8, 3.2, 2.4, 2.9];
    let xh = 0.3;
    const headers = ["Channel", "Gross Revenue", "Fee (2.5%)", ""];
    headers.forEach((h, i) => {
      s.addShape("rect", { x: xh, y: 1.55, w: colW[i], h: 0.45, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(h, { x: xh + 0.05, y: 1.57, w: colW[i] - 0.1, h: 0.41, fontSize: 9, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: "center" });
      xh += colW[i];
    });
    rows.forEach(({ channel, gross, fee }, ri) => {
      let xr = 0.3;
      const vals = [channel, gross, fee, ""];
      const bg = ri % 2 === 0 ? "1E293B" : "334155";
      vals.forEach((v, ci) => {
        s.addShape("rect", { x: xr, y: 2.0 + ri * 0.77, w: colW[ci], h: 0.73, fill: { color: bg }, line: { color: "475569", width: 1 } });
        const textColor = ci === 1 ? GREEN : WHITE;
        const fontSize = ci === 1 ? 13 : 10;
        const bold = ci === 1;
        s.addText(v, { x: xr + 0.08, y: 2.02 + ri * 0.77, w: colW[ci] - 0.12, h: 0.69, fontSize, bold, color: textColor, fontFace: "Calibri", valign: "middle", align: "center" });
        xr += colW[ci];
      });
    });
    let xt = 0.3;
    const totals = ["TOTAL", "€384,000", "€9,600", ""];
    totals.forEach((v, ci) => {
      s.addShape("rect", { x: xt, y: 4.3, w: colW[ci], h: 0.8, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(v, { x: xt + 0.08, y: 4.32, w: colW[ci] - 0.12, h: 0.76, fontSize: ci === 1 ? 15 : 11, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: "center" });
      xt += colW[ci];
    });
    s.addShape("roundRect", { x: 0.8, y: 5.25, w: 11.73, h: 1.35, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.1 });
    s.addText("40:1", { x: 1.1, y: 5.4, w: 2.5, h: 0.8, fontSize: 32, bold: true, color: BLUE, fontFace: "Calibri" });
    s.addText("You earn €384,000 in extra revenue.\nYou pay €9,600 in total fees.\nZero upfront cost. Zero risk.", { x: 3.8, y: 5.35, w: 8.5, h: 1.0, fontSize: 11, color: "CBD5E1", fontFace: "Calibri", valign: "middle" });
    addDarkFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 9: INTEGRATION
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("SLIDE 9 · INTEGRATION", { x: 0.5, y: 0.35, w: 12.3, h: 0.28, fontSize: 8, bold: true, color: ORANGE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Simple by design. Live in days.", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const steps = [
      { num: "1", title: "Register your store", body: "Sign up. Add store name, airport, category. Takes 5 minutes." },
      { num: "2", title: "Set up QR scanning", body: "Use our web app on any device. No hardware needed." },
      { num: "3", title: "Receive DutyCredits", body: "DutyBoost activates your store. Travelers can now redeem." },
      { num: "4", title: "Track & grow", body: "Real-time dashboard. Expand to more stores when ready." },
    ];
    steps.forEach(({ num, title, body }, i) => {
      const x = 0.3 + i * 3.2;
      s.addShape("roundRect", { x, y: 1.55, w: 3.05, h: 4.55, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addShape("roundRect", { x: x + 1.05, y: 1.68, w: 0.95, h: 0.95, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.48 });
      s.addText(num, { x: x + 1.05, y: 1.7, w: 0.95, h: 0.91, fontSize: 20, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(title, { x: x + 0.1, y: 2.8, w: 2.85, h: 0.55, fontSize: 11, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
      s.addText(body, { x: x + 0.15, y: 3.45, w: 2.75, h: 2.3, fontSize: 10, color: "94A3B8", align: "center", fontFace: "Calibri", valign: "top" });
    });
    addDarkFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 10: PILOT PLAN
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addText("SLIDE 10 · LET'S START TOGETHER", { x: 0.5, y: 0.35, w: 12.3, h: 0.28, fontSize: 8, bold: true, color: BLUE, charSpacing: 2, fontFace: "Calibri", align: "center" });
    s.addText("Pilot: 1–3 stores. Zero risk. Real results.", { x: 0.5, y: 0.75, w: 12.3, h: 0.6, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const phases = [
      { title: "Phase 1 · Onboard", color: BLUE, points: ["Register 1–3 stores", "Set up QR scan app", "Agree on reporting", "DutyBoost activates", "3–5 business days"] },
      { title: "Phase 2 · Go Live", color: GREEN, points: ["DutyCredits live", "Staff briefed (10 min)", "Dashboard access", "Track redemptions", "Week 1–4"] },
      { title: "Phase 3 · Scale", color: ORANGE, points: ["Review monthly report", "Add channels", "Expand stores", "Explore POS API", "Month 2 onwards"] },
    ];
    phases.forEach(({ title, color, points }, i) => {
      const x = 0.3 + i * 4.35;
      s.addShape("roundRect", { x, y: 1.55, w: 4.15, h: 5.35, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.12 });
      s.addText(title, { x: x + 0.15, y: 1.7, w: 3.85, h: 0.5, fontSize: 12, bold: true, color, fontFace: "Calibri" });
      points.forEach((p, j) => {
        s.addText(`• ${p}`, { x: x + 0.15, y: 2.35 + j * 0.75, w: 3.85, h: 0.7, fontSize: 10, color: "CBD5E1", fontFace: "Calibri" });
      });
    });
    addDarkFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 11: CLOSING CTA
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: DARK_BG };
    s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 0.1, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.6, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });
    s.addText("Ready to turn your airport", { x: 1, y: 2.2, w: 11.3, h: 0.45, fontSize: 36, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("footfall into revenue?", { x: 1, y: 2.7, w: 11.3, h: 0.45, fontSize: 36, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const ctaItems = [
      { label: "Performance only", sub: "2.5% fee per transaction" },
      { label: "No upfront cost", sub: "Zero risk to get started" },
      { label: "Live in days", sub: "Simple QR — no POS overhaul" },
    ];
    ctaItems.forEach(({ label, sub }, i) => {
      const x = 1.0 + i * 3.8;
      s.addShape("roundRect", { x, y: 3.6, w: 3.5, h: 1.5, fill: { color: SLATE }, line: { color: "475569", width: 1 }, rectRadius: 0.15 });
      s.addText(label, { x, y: 3.75, w: 3.5, h: 0.45, fontSize: 13, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(sub, { x, y: 4.25, w: 3.5, h: 0.45, fontSize: 10, color: "94A3B8", align: "center", fontFace: "Calibri" });
    });
    s.addText("hello@dutyboost.com · www.dutyboost.com", { x: 1, y: 5.5, w: 11.3, h: 0.45, fontSize: 14, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-AirportRetailer-Presentation.pptx" });
}