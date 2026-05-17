import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";

// Dark theme colors matching the page
const BG_DARK = "020617";       // slate-950
const BG_CARD = "0F172A";       // slate-900
const BG_CARD2 = "1E293B";      // slate-800
const ORANGE = "FB923C";        // orange-400
const ORANGE_DARK = "EA580C";   // orange-600
const ORANGE_BG = "431407";     // orange-900/20
const GREEN = "4ADE80";         // green-400
const GREEN_BG = "052E16";      // green-900/20
const BLUE = "60A5FA";          // blue-400
const BLUE_BG = "172554";       // blue-900/20
const TEXT_WHITE = "F8FAFC";    // slate-50
const TEXT_LIGHT = "CBD5E1";    // slate-300
const TEXT_MUTED = "94A3B8";    // slate-400
const TEXT_DIM = "64748B";      // slate-500
const BORDER = "334155";        // slate-700

function addSlideHeader(s, label, title, accentColor = ORANGE) {
  // Left accent bar
  s.addShape("rect", { x: 0.5, y: 0.5, w: 0.06, h: 0.55, fill: { color: accentColor }, line: { color: accentColor, width: 0 } });
  s.addText(label.toUpperCase(), { x: 0.7, y: 0.5, w: 11.9, h: 0.22, fontSize: 9, bold: true, color: accentColor, fontFace: "Calibri", charSpacing: 3 });
  s.addText(title, { x: 0.7, y: 0.72, w: 11.9, h: 0.5, fontSize: 26, bold: true, color: TEXT_WHITE, fontFace: "Calibri" });
}

function addCard(s, x, y, w, h, borderColor = BORDER) {
  s.addShape("roundRect", { x, y, w, h, fill: { color: BG_CARD }, line: { color: borderColor, width: 1 }, rectRadius: 0.1 });
}

export async function exportRetailerPptxDark() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

  // ── SLIDE 1: Hero / Cover ──
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };

    // Top orange accent line
    s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 0.05, fill: { color: ORANGE_DARK }, line: { color: ORANGE_DARK, width: 0 } });

    // Logo (inverted — white version)
    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.7, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });

    // Badge pill
    s.addShape("roundRect", { x: 4.8, y: 2.2, w: 3.7, h: 0.35, fill: { color: ORANGE_BG }, line: { color: ORANGE_DARK, width: 1 }, rectRadius: 0.17 });
    s.addText("Airport Retail Partnership", { x: 4.8, y: 2.22, w: 3.7, h: 0.32, fontSize: 9, bold: true, color: ORANGE, align: "center", fontFace: "Calibri" });

    s.addText("Your store already has\nthe traffic.", { x: 1.0, y: 2.7, w: 11.3, h: 1.5, fontSize: 38, bold: true, color: TEXT_WHITE, align: "center", fontFace: "Calibri" });
    s.addText("DutyBoost converts it.", { x: 1.0, y: 4.2, w: 11.3, h: 0.7, fontSize: 38, bold: true, color: ORANGE, align: "center", fontFace: "Calibri" });

    s.addText("Millions of travelers pass through airport retail every day.\nDutyBoost pre-activates their purchase intent before they board.", { x: 1.5, y: 5.1, w: 10.3, h: 0.8, fontSize: 13, color: TEXT_MUTED, align: "center", fontFace: "Calibri" });

    // Pills row
    const pills = ["Zero setup cost", "Pre-qualified buyers", "Higher basket size", "Performance-based only"];
    pills.forEach((p, i) => {
      const x = 1.0 + i * 2.9;
      s.addShape("roundRect", { x, y: 6.1, w: 2.7, h: 0.3, fill: { color: ORANGE_BG }, line: { color: ORANGE_DARK, width: 1 }, rectRadius: 0.15 });
      s.addText(p, { x, y: 6.12, w: 2.7, h: 0.28, fontSize: 8, color: ORANGE, align: "center", fontFace: "Calibri", bold: true });
    });

    s.addText("hello@dutyboost.com  ·  © 2026 DutyBoost", { x: 0, y: 7.15, w: 13.33, h: 0.3, fontSize: 8, color: TEXT_DIM, align: "center", fontFace: "Calibri" });
  }

  // ── SLIDE 2: The Scale of Foot Traffic ──
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };
    addSlideHeader(s, "Why DutyBoost", "The world's biggest captive audience — walking past your store every day");

    const stats = [
      { stat: "4.8B", label: "Air passengers worldwide in 2024", detail: "IATA confirmed a record 4.8B segment passengers in 2024 — every one passing through an airport retail environment.", color: ORANGE },
      { stat: "188,500", label: "Travelers through Schiphol every day (2025)", detail: "Amsterdam Schiphol handled 68.8M travellers in 2025. That's 188,500/day · 1.32M/week · 5.73M/month.", color: ORANGE },
      { stat: "1h 10m", label: "Avg. dwell time in departures per traveler", detail: "After security, travelers have 1h 10min of free time on average. At Schiphol that rises to 146 minutes.", color: GREEN },
      { stat: "€68.2B", label: "Global duty-free & travel retail market 2024", detail: "Growing at 8.8% CAGR. Airport retail is the dominant channel — 61.7% of all duty-free sales happen airside.", color: GREEN },
    ];

    stats.forEach(({ stat, label, detail, color }, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.5 + col * 6.3;
      const y = 1.5 + row * 2.6;
      addCard(s, x, y, 6.1, 2.35, color === GREEN ? "166534" : ORANGE_DARK);
      s.addText(stat, { x: x + 0.2, y: y + 0.2, w: 5.7, h: 0.6, fontSize: 28, bold: true, color, fontFace: "Calibri" });
      s.addText(label, { x: x + 0.2, y: y + 0.85, w: 5.7, h: 0.35, fontSize: 10, bold: true, color: TEXT_WHITE, fontFace: "Calibri" });
      s.addText(detail, { x: x + 0.2, y: y + 1.22, w: 5.7, h: 0.9, fontSize: 9, color: TEXT_MUTED, fontFace: "Calibri" });
    });
  }

  // ── SLIDE 3: Schiphol Breakdown ──
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };
    addSlideHeader(s, "Why DutyBoost", "Schiphol Airport — Footfall Your Store Can Tap Into");

    const periods = [
      { period: "DAILY", value: "188,500", sub: "travelers through Schiphol" },
      { period: "WEEKLY", value: "1.32M", sub: "potential shoppers" },
      { period: "MONTHLY", value: "5.73M", sub: "departing travelers" },
      { period: "YEARLY", value: "68.8M", sub: "total passengers in 2025" },
    ];

    periods.forEach(({ period, value, sub }, i) => {
      const x = 0.5 + i * 3.1;
      addCard(s, x, 1.6, 2.85, 2.8, BORDER);
      s.addText(period, { x, y: 1.9, w: 2.85, h: 0.28, fontSize: 9, bold: true, color: TEXT_DIM, align: "center", fontFace: "Calibri", charSpacing: 2 });
      s.addText(value, { x, y: 2.25, w: 2.85, h: 0.75, fontSize: 26, bold: true, color: ORANGE, align: "center", fontFace: "Calibri" });
      s.addText(sub, { x, y: 3.05, w: 2.85, h: 0.3, fontSize: 9, color: TEXT_DIM, align: "center", fontFace: "Calibri" });
    });

    s.addText("Source: Schiphol Group Annual Traffic Review 2025  ·  68.8M ÷ 365 = 188,493/day", {
      x: 0.5, y: 4.6, w: 12.3, h: 0.3, fontSize: 8, color: TEXT_DIM, fontFace: "Calibri", italic: true
    });

    // Conversion teaser
    s.addShape("roundRect", { x: 0.5, y: 5.1, w: 12.3, h: 1.8, fill: { color: ORANGE_BG }, line: { color: ORANGE_DARK, width: 1 }, rectRadius: 0.1 });
    s.addText("The Conversion Gap", { x: 0.8, y: 5.25, w: 6, h: 0.3, fontSize: 11, bold: true, color: ORANGE, fontFace: "Calibri" });
    s.addText("Typical conversion without incentives: 28%   →   With DutyBoost pre-activation: up to 71%\nKearney: travelers are 63% more confident spending when they hold an active incentive.", {
      x: 0.8, y: 5.6, w: 11.8, h: 1.1, fontSize: 11, color: TEXT_LIGHT, fontFace: "Calibri"
    });
  }

  // ── SLIDE 4: Conversion Opportunity ──
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };
    addSlideHeader(s, "Why DutyBoost", "The conversion opportunity — and how pre-activation closes it", GREEN);

    const convStats = [
      { stat: "28%", color: TEXT_LIGHT, label: "Typical airport retail conversion without incentives", detail: "Only 1 in 4 browsing travelers makes a purchase. The other 75% browse and leave." },
      { stat: "63%", color: ORANGE, label: "More confident spending when incentivized", detail: "Kearney research: travelers with an active incentive are 63% more confident making a purchase at airport retail." },
      { stat: "71%", color: GREEN, label: "Conversion achievable with the right incentive", detail: "m1nd-set data: with targeted, pre-activated incentives, conversion rates can reach 71% among motivated segments." },
    ];

    convStats.forEach(({ stat, color, label, detail }, i) => {
      const x = 0.5 + i * 4.2;
      addCard(s, x, 1.5, 4.0, 3.5, color === TEXT_LIGHT ? BORDER : color === ORANGE ? ORANGE_DARK : "166534");
      s.addText(stat, { x, y: 1.75, w: 4.0, h: 0.8, fontSize: 42, bold: true, color, align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.15, y: 2.65, w: 3.7, h: 0.55, fontSize: 9, bold: true, color: TEXT_WHITE, fontFace: "Calibri" });
      s.addText(detail, { x: x + 0.15, y: 3.28, w: 3.7, h: 1.5, fontSize: 9, color: TEXT_MUTED, fontFace: "Calibri" });
    });

    // Pre-activation callout
    s.addShape("roundRect", { x: 0.5, y: 5.2, w: 12.3, h: 1.75, fill: { color: ORANGE_BG }, line: { color: ORANGE_DARK, width: 1 }, rectRadius: 0.1 });
    s.addText("⚡  The DutyBoost difference: purchase intent activated before arrival", { x: 0.75, y: 5.35, w: 11.8, h: 0.3, fontSize: 10, bold: true, color: TEXT_WHITE, fontFace: "Calibri" });
    s.addText("Conventional retail relies on catching a traveler's attention at the point of sale. DutyBoost works differently — it plants the seed days before the flight. When a traveler's booking confirmation arrives with a DutyCredit, they start thinking about where to spend it. By the time they clear security, they have a store in mind. They are not browsing. They are buying.", {
      x: 0.75, y: 5.7, w: 11.8, h: 1.1, fontSize: 9, color: TEXT_MUTED, fontFace: "Calibri"
    });
  }

  // ── SLIDE 5: How DutyBoost Works ──
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };
    addSlideHeader(s, "How DutyBoost", "Simple to operate. Powerful in impact.");

    const steps = [
      { num: "1", title: "Travel Partner Issues DutyCredit", desc: "When a traveler books a flight, hotel or car rental, their confirmation email includes a personalized DutyCredit QR code — weeks before they fly." },
      { num: "2", title: "Traveler Arrives Pre-Activated", desc: "They enter your store already motivated. They have a specific credit to spend at a minimum basket of €70 — and they're looking to use it." },
      { num: "3", title: "Cashier Scans the QR Code", desc: "One scan at checkout. Our system validates the QR instantly and applies the tiered discount automatically. No manual calculation." },
      { num: "4", title: "Higher Sale. Monthly Invoice.", desc: "You receive a single monthly invoice for 2.5% of gross redemption value (max €25/transaction). No upfront fees. No subscriptions." },
    ];

    steps.forEach(({ num, title, desc }, i) => {
      const x = 0.4 + i * 3.15;
      addCard(s, x, 1.5, 2.9, 3.6, ORANGE_DARK);
      // Number circle
      s.addShape("ellipse", { x: x + 1.15, y: 1.65, w: 0.55, h: 0.55, fill: { color: ORANGE_DARK }, line: { color: ORANGE_DARK, width: 0 } });
      s.addText(num, { x: x + 1.15, y: 1.66, w: 0.55, h: 0.52, fontSize: 13, bold: true, color: TEXT_WHITE, align: "center", fontFace: "Calibri" });
      s.addText(title, { x: x + 0.15, y: 2.35, w: 2.6, h: 0.55, fontSize: 9, bold: true, color: TEXT_WHITE, align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.15, y: 2.98, w: 2.6, h: 1.95, fontSize: 8.5, color: TEXT_MUTED, fontFace: "Calibri" });
    });

    s.addText("No POS integration required to start. You scan a QR code. We handle everything else.", {
      x: 0.5, y: 5.25, w: 12.3, h: 0.3, fontSize: 10, color: TEXT_DIM, align: "center", fontFace: "Calibri", italic: true
    });
  }

  // ── SLIDE 6: Discount Tier Table ──
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };
    addSlideHeader(s, "How DutyBoost", "DutyCredit Discount Structure — What Drives Basket Size");

    s.addText("Tiered discounts are designed to push basket sizes upward — not just reward existing spend", {
      x: 0.5, y: 1.12, w: 12.3, h: 0.3, fontSize: 10, color: TEXT_MUTED, fontFace: "Calibri"
    });

    const headers = ["Tier", "Min. Basket", "Traveler Saves", "Your Fee (2.5%)", "Your Net"];
    const colX = [0.5, 2.5, 4.9, 7.3, 9.9];
    const colW = [1.9, 2.3, 2.3, 2.5, 3.0];

    // Header row
    s.addShape("rect", { x: 0.5, y: 1.55, w: 12.3, h: 0.38, fill: { color: BG_CARD2 }, line: { color: BORDER, width: 0 } });
    headers.forEach((h, i) => {
      s.addText(h, { x: colX[i] + 0.1, y: 1.6, w: colW[i], h: 0.28, fontSize: 9, bold: true, color: TEXT_DIM, fontFace: "Calibri", charSpacing: 1 });
    });

    const rows = [
      { tier: "🟡  Boarding", basket: "€70 – €99", save: "€5 – €10", fee: "€1.75 – €2.50", net: "€56 – €86", rowBg: "1C1917" },
      { tier: "🔵  Priority", basket: "€100 – €199", save: "€10 – €30", fee: "€2.50 – €5.00", net: "€83 – €169", rowBg: "172554" },
      { tier: "🟢  Lounge", basket: "€200 – €299", save: "€30 – €60", fee: "€5.00 – €7.50", net: "€150 – €234", rowBg: "052E16" },
      { tier: "🟣  VIP", basket: "€300+", save: "€60 flat", fee: "max €25", net: "€215+ net", rowBg: "2E1065" },
    ];

    rows.forEach(({ tier, basket, save, fee, net, rowBg }, i) => {
      const y = 1.93 + i * 0.78;
      s.addShape("rect", { x: 0.5, y, w: 12.3, h: 0.72, fill: { color: rowBg }, line: { color: BORDER, width: 0.5 } });
      s.addText(tier, { x: colX[0] + 0.1, y: y + 0.18, w: colW[0], h: 0.36, fontSize: 10, bold: true, color: TEXT_WHITE, fontFace: "Calibri" });
      s.addText(basket, { x: colX[1] + 0.1, y: y + 0.18, w: colW[1], h: 0.36, fontSize: 10, color: TEXT_MUTED, fontFace: "Calibri" });
      s.addText(save, { x: colX[2] + 0.1, y: y + 0.18, w: colW[2], h: 0.36, fontSize: 10, bold: true, color: ORANGE, fontFace: "Calibri" });
      s.addText(fee, { x: colX[3] + 0.1, y: y + 0.18, w: colW[3], h: 0.36, fontSize: 10, color: TEXT_DIM, fontFace: "Calibri" });
      s.addText(net, { x: colX[4] + 0.1, y: y + 0.18, w: colW[4], h: 0.36, fontSize: 10, bold: true, color: GREEN, fontFace: "Calibri" });
    });

    s.addText("Net = basket − traveler saving − DutyBoost fee.  DutyCredit discount is fully covered by DutyBoost — not deducted from your margin.", {
      x: 0.5, y: 7.05, w: 12.3, h: 0.3, fontSize: 8, color: TEXT_DIM, fontFace: "Calibri", italic: true
    });
  }

  // ── SLIDE 7: Revenue Impact ──
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };
    addSlideHeader(s, "What DutyBoost Brings", "Measurable revenue uplift — per location, per day", GREEN);

    const metrics = [
      { metric: "Conversion Rate", baseline: "28%", with_db: "40–50%", lift: "+42–78%", color: ORANGE },
      { metric: "Avg. Basket Spend", baseline: "€20–€28", with_db: "€100–€140", lift: "4–5× uplift", color: ORANGE },
      { metric: "Daily Revenue (100 visitors)", baseline: "28 sales × €75 = €2,100", with_db: "45 sales × €120 = €5,400", lift: "+€3,300/day", color: GREEN },
    ];

    metrics.forEach(({ metric, baseline, with_db, lift, color }, i) => {
      const x = 0.4 + i * 4.1;
      addCard(s, x, 1.5, 3.9, 3.5, color === GREEN ? "166534" : ORANGE_DARK);
      s.addText(metric, { x: x + 0.15, y: 1.65, w: 3.6, h: 0.28, fontSize: 8, bold: true, color: TEXT_DIM, fontFace: "Calibri", charSpacing: 1 });
      s.addShape("rect", { x: x + 0.15, y: 2.0, w: 3.6, h: 0.55, fill: { color: BG_CARD2 }, line: { color: BORDER, width: 0 } });
      s.addText("Without DutyBoost:", { x: x + 0.25, y: 2.05, w: 2.0, h: 0.22, fontSize: 8, color: TEXT_DIM, fontFace: "Calibri" });
      s.addText(baseline, { x: x + 0.25, y: 2.28, w: 3.3, h: 0.22, fontSize: 9, bold: true, color: TEXT_MUTED, fontFace: "Calibri" });
      s.addShape("rect", { x: x + 0.15, y: 2.6, w: 3.6, h: 0.55, fill: { color: BG_DARK }, line: { color: BORDER, width: 0 } });
      s.addText("With DutyBoost:", { x: x + 0.25, y: 2.65, w: 2.0, h: 0.22, fontSize: 8, color: TEXT_LIGHT, fontFace: "Calibri" });
      s.addText(with_db, { x: x + 0.25, y: 2.88, w: 3.3, h: 0.22, fontSize: 9, bold: true, color: ORANGE, fontFace: "Calibri" });
      s.addShape("rect", { x: x + 0.15, y: 3.2, w: 3.6, h: 0.01, fill: { color: BORDER }, line: { color: BORDER, width: 0 } });
      s.addText(lift, { x: x + 0.15, y: 3.3, w: 3.6, h: 0.4, fontSize: 14, bold: true, color, align: "center", fontFace: "Calibri" });
    });

    // Annual impact box
    s.addShape("roundRect", { x: 0.4, y: 5.2, w: 12.4, h: 2.0, fill: { color: "052E16" }, line: { color: "166534", width: 1 }, rectRadius: 0.1 });
    s.addText("Annual Impact Estimate — Single Store Location", { x: 0.65, y: 5.32, w: 8, h: 0.28, fontSize: 10, bold: true, color: TEXT_WHITE, fontFace: "Calibri" });
    const rows = [
      { label: "Baseline (28% conversion, €75 avg basket, 100 DutyCredit visitors/day)", val: "€2,100/day", color: TEXT_MUTED },
      { label: "With DutyBoost (45% conversion, €120 avg basket)", val: "€5,400/day", color: ORANGE },
      { label: "Net daily uplift (after DutyBoost fee)", val: "€3,150/day", color: GREEN },
    ];
    rows.forEach(({ label, val, color }, i) => {
      s.addText(label, { x: 0.65, y: 5.7 + i * 0.33, w: 9.5, h: 0.28, fontSize: 9, color: color === TEXT_MUTED ? TEXT_DIM : TEXT_LIGHT, fontFace: "Calibri" });
      s.addText(val, { x: 10.2, y: 5.7 + i * 0.33, w: 2.4, h: 0.28, fontSize: 9, bold: true, color, align: "right", fontFace: "Calibri" });
    });
    s.addText("Annual additional revenue per location:", { x: 0.65, y: 6.7, w: 8, h: 0.35, fontSize: 11, bold: true, color: TEXT_WHITE, fontFace: "Calibri" });
    s.addText("€1,149,750", { x: 9.0, y: 6.68, w: 3.6, h: 0.38, fontSize: 18, bold: true, color: GREEN, align: "right", fontFace: "Calibri" });
  }

  // ── SLIDE 8: Complete Retailer Advantage ──
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };
    addSlideHeader(s, "What DutyBoost Brings", "The complete retailer advantage");

    const benefits = [
      { title: "Zero setup cost. Zero monthly fee.", desc: "Purely performance-based. You only pay 2.5% (max €25) when DutyBoost delivers a confirmed, incremental sale." },
      { title: "Pre-qualified, pre-motivated buyers", desc: "Every DutyCredit holder has a specific credit to spend. They arrive at your store with a mission." },
      { title: "Higher average basket size guaranteed", desc: "The minimum basket of €70 to unlock any tier means every DutyCredit redemption is a meaningful transaction." },
      { title: "No POS integration needed to start", desc: "Cashier scans a QR code on a mobile device. Full POS integration available but not required to begin earning." },
      { title: "Real-time analytics dashboard", desc: "Track redemptions, basket values, conversion rates, and monthly invoice totals — per day, per store." },
      { title: "Growing traveler partner network", desc: "Every new travel partner sends more pre-activated travelers to your store. The network effect works in your favor." },
      { title: "Traveler loyalty at your store", desc: "Travelers who redeem a DutyCredit remember your store as the place that gave them great value." },
      { title: "Consistent incremental footfall", desc: "DutyBoost delivers a steady stream of pre-activated shoppers every day — as long as partners keep issuing credits." },
    ];

    benefits.forEach(({ title, desc }, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.4 + col * 6.3;
      const y = 1.45 + row * 1.48;
      addCard(s, x, y, 6.1, 1.35, ORANGE_DARK);
      s.addText("✓", { x: x + 0.15, y: y + 0.12, w: 0.3, h: 0.28, fontSize: 11, bold: true, color: ORANGE, fontFace: "Calibri" });
      s.addText(title, { x: x + 0.5, y: y + 0.1, w: 5.4, h: 0.3, fontSize: 9, bold: true, color: TEXT_WHITE, fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.5, y: y + 0.44, w: 5.4, h: 0.75, fontSize: 8.5, color: TEXT_MUTED, fontFace: "Calibri" });
    });
  }

  // ── SLIDE 9: Market Growth Context ──
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };
    addSlideHeader(s, "Market Context", "The market is growing. Your share of it should too.", BLUE);

    const mktStats = [
      { stat: "+8.8%", label: "CAGR in global duty-free & travel retail through 2031", context: "Mordor Intelligence projects market growth from $102.5B in 2026 to $156.2B by 2031 — over 52% total growth in five years." },
      { stat: "+8.5%", label: "Conversion rate increase from targeted digital engagement (QR/mobile)", context: "Research confirms digital incentive tools — including QR codes and mobile vouchers — directly improve conversion rates at the point of sale." },
      { stat: "+10.6%", label: "Global air passenger growth in 2024 — the travelers keep coming", context: "IATA confirmed a 10.6% year-on-year surge in global passengers in 2024. More travelers = more footfall = more DutyCredit opportunities." },
      { stat: "62%", label: "of airport retailers already have QR/mobile digital capability", context: "The infrastructure for DutyBoost integration is already in place for most airport retailers. Adoption is plug-and-play." },
    ];

    mktStats.forEach(({ stat, label, context }, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.4 + col * 6.3;
      const y = 1.45 + row * 2.65;
      addCard(s, x, y, 6.1, 2.45, BLUE_BG);
      s.addText(stat, { x: x + 0.2, y: y + 0.2, w: 5.7, h: 0.7, fontSize: 30, bold: true, color: BLUE, fontFace: "Calibri" });
      s.addText(label, { x: x + 0.2, y: y + 0.98, w: 5.7, h: 0.4, fontSize: 9, bold: true, color: TEXT_WHITE, fontFace: "Calibri" });
      s.addText(context, { x: x + 0.2, y: y + 1.42, w: 5.7, h: 0.85, fontSize: 8.5, color: TEXT_MUTED, fontFace: "Calibri" });
    });
  }

  // ── SLIDE 10: CTA ──
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };

    // Orange gradient overlay at top
    s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 0.05, fill: { color: ORANGE_DARK }, line: { color: ORANGE_DARK, width: 0 } });

    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.5, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });

    // Badge
    s.addShape("roundRect", { x: 4.8, y: 1.95, w: 3.7, h: 0.35, fill: { color: ORANGE_BG }, line: { color: ORANGE_DARK, width: 1 }, rectRadius: 0.17 });
    s.addText("Ready to get started?", { x: 4.8, y: 1.97, w: 3.7, h: 0.32, fontSize: 9, bold: true, color: ORANGE, align: "center", fontFace: "Calibri" });

    s.addText("Pre-activated buyers.\nHigher baskets.\nZero setup cost.", { x: 1.0, y: 2.45, w: 11.3, h: 1.6, fontSize: 32, bold: true, color: TEXT_WHITE, align: "center", fontFace: "Calibri" });

    s.addText("Join the DutyBoost retail network and start converting the travelers\nalready walking past your store.", {
      x: 1.5, y: 4.2, w: 10.3, h: 0.8, fontSize: 13, color: TEXT_MUTED, align: "center", fontFace: "Calibri"
    });

    // CTA button styled box
    s.addShape("roundRect", { x: 4.2, y: 5.2, w: 4.9, h: 0.7, fill: { color: ORANGE_DARK }, line: { color: ORANGE_DARK, width: 0 }, rectRadius: 0.1 });
    s.addText("hello@dutyboost.com", { x: 4.2, y: 5.22, w: 4.9, h: 0.68, fontSize: 14, bold: true, color: TEXT_WHITE, align: "center", fontFace: "Calibri" });

    s.addText("© 2026 DutyBoost  ·  Chamber of Commerce (KvK): 42053181  ·  VAT: NL869492068B01", {
      x: 0, y: 7.1, w: 13.33, h: 0.3, fontSize: 8, color: TEXT_DIM, align: "center", fontFace: "Calibri"
    });
  }

  await pptx.writeFile({ fileName: "DutyBoost-Airport-Retailer-Dark.pptx" });
}