import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9a64855b0_ChatGPT_Image_Mar_30__2026__03_06_29_PM-removebg-preview.png";
const DARK = "0F172A";
const BLUE = "1E40AF";
const BLUE_LIGHT = "3B6EF5";
const ORANGE = "EA580C";
const SLATE = "64748B";
const WHITE = "FFFFFF";
const LIGHT_BLUE_BG = "EFF6FF";
const GRAD_START = "1A3A2A"; // dark green
const GRAD_END = "3D1A00";  // dark orange/brown

function addFooter(s, text = "DutyBoost · The Future of Airport Retail · hello@dutyboost.com") {
  s.addShape("rect", { x: 0, y: 7.1, w: 13.33, h: 0.4, fill: { color: DARK }, line: { color: DARK, width: 0 } });
  s.addText(text, { x: 0.3, y: 7.12, w: 12.7, h: 0.3, fontSize: 8, color: "94A3B8", fontFace: "Calibri", align: "center" });
}

function addSectionLabel(s, text, color = BLUE) {
  s.addText(text, { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color, charSpacing: 3, fontFace: "Calibri", align: "center" });
}

function addDivider(s, x, y, w, color = BLUE_LIGHT) {
  s.addShape("rect", { x, y, w, h: 0.04, fill: { color }, line: { color, width: 0 } });
}

function addDarkGradBg(s) {
  s.background = { color: DARK };
}

export async function exportRetailerPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

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
    addDivider(s, 4.5, 3.85, 4.33, ORANGE);
    s.addText("A performance-based revenue layer for airport retailers.\nYou only pay when a traveler spends.", { x: 1.5, y: 4.05, w: 10.3, h: 0.9, fontSize: 14, color: "94A3B8", align: "center", fontFace: "Calibri" });
    s.addText("2026 · Confidential", { x: 1, y: 6.7, w: 11.3, h: 0.3, fontSize: 9, color: "475569", align: "center", fontFace: "Calibri" });
  }

  // ─────────────────────────────────────────────
  // SLIDE 2: THE OPPORTUNITY
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "THE OPPORTUNITY");
    s.addText("Airport retail: a €40B+ market with a conversion problem", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.6, 3);
    const stats = [
      { num: "€40B+", label: "Global airport retail revenue (2024)\nSource: Airport Council International" },
      { num: "2.4B", label: "International passengers per year\nSource: IATA 2024" },
      { num: "~10%", label: "Average conversion rate at airport stores\nSource: m1nd-set Airport Retail Research" },
      { num: "72%", label: "Of travelers browse but don't buy\nSource: TFWA World Exhibition Research" },
    ];
    stats.forEach(({ num, label }, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape("roundRect", { x, y: 1.85, w: 2.95, h: 3.2, fill: { color: i % 2 === 0 ? LIGHT_BLUE_BG : "F8FAFC" }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.12 });
      s.addText(num, { x, y: 2.1, w: 2.95, h: 1.0, fontSize: 34, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.15, y: 3.2, w: 2.65, h: 1.5, fontSize: 10, color: SLATE, align: "center", fontFace: "Calibri", valign: "top" });
    });
    s.addShape("roundRect", { x: 0.4, y: 5.25, w: 12.5, h: 0.85, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.12 });
    s.addText("DutyBoost converts the 72% who browse into buyers — by giving them a reason to spend before they arrive.", { x: 0.6, y: 5.33, w: 12.1, h: 0.65, fontSize: 12, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 3: HOW IT WORKS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "HOW IT WORKS", ORANGE);
    s.addText("Pre-qualified buyers. Delivered to your store.", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const steps = [
      { num: "1", title: "Partner sends DutyCredit", body: "Travel agency, airline, hotel or car rental sends traveler a DutyCredit before departure." },
      { num: "2", title: "Traveler arrives at airport", body: "Traveler has a QR code — valid today only, only at participating stores. Min. spend €70." },
      { num: "3", title: "Traveler scans at checkout", body: "Cashier scans QR. POS automatically applies the tiered discount. Transaction logged in real time." },
      { num: "4", title: "Retailer pays 2.5% fee", body: "DutyBoost invoices you monthly. You only pay on completed transactions — zero risk." },
    ];
    steps.forEach(({ num, title, body }, i) => {
      const x = 0.35 + i * 3.18;
      s.addShape("roundRect", { x, y: 1.8, w: 3.0, h: 4.2, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.15 });
      s.addShape("roundRect", { x: x + 1.1, y: 1.9, w: 0.8, h: 0.8, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.4 });
      s.addText(num, { x: x + 1.1, y: 1.92, w: 0.8, h: 0.76, fontSize: 16, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(title, { x: x + 0.1, y: 2.85, w: 2.8, h: 0.6, fontSize: 12, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
      s.addText(body, { x: x + 0.15, y: 3.55, w: 2.7, h: 2.1, fontSize: 10.5, color: SLATE, align: "center", fontFace: "Calibri", valign: "top" });
    });
    addFooter(s, "DutyBoost · Pure Performance. No redemption, no fee.");
  }

  // ─────────────────────────────────────────────
  // SLIDE 4: DUTYCREDIT DISCOUNT TIERS (NEW)
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "THE DUTYCREDIT DISCOUNT LAYER");
    s.addText("What the traveler receives — how the discount works", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 5, BLUE);

    // Intro line
    s.addText("Travelers receive a DutyCredit tied to their trip. The discount is tiered by spend — the more they spend in your store, the higher the saving they unlock.", {
      x: 0.5, y: 1.65, w: 12.3, h: 0.55, fontSize: 12, color: SLATE, fontFace: "Calibri"
    });

    // Tier table headers
    const headers = ["Tier", "Min. Basket", "Max Saving", "What it means for you"];
    const colW = [2.2, 1.8, 1.8, 7.1];
    let xh = 0.4;
    headers.forEach((h, i) => {
      s.addShape("rect", { x: xh, y: 2.3, w: colW[i], h: 0.5, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(h, { x: xh + 0.05, y: 2.32, w: colW[i] - 0.1, h: 0.46, fontSize: 10, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: i === 3 ? "left" : "center" });
      xh += colW[i];
    });

    const tiers = [
      { tier: "🟡  Boarding DutyCredit", min: "€70",  max: "€10", note: "Traveler spends €70–€99 — you earn an extra sale you wouldn't have had.", bg: "FFFBEB" },
      { tier: "🔵  Priority DutyCredit",  min: "€100", max: "€30", note: "Mid-range basket €100–€199 — most common tier. Strong conversion incentive.", bg: LIGHT_BLUE_BG },
      { tier: "🟢  Lounge DutyCredit",    min: "€200", max: "€45", note: "High-value spend €200–€299 — premium traveler segment, larger basket sizes.", bg: "F0FDF4" },
      { tier: "🟣  VIP DutyCredit",       min: "€300", max: "€60", note: "Top-tier traveler — €300+ spend delivers maximum store revenue.", bg: "F5F3FF" },
    ];

    tiers.forEach(({ tier, min, max, note, bg }, ri) => {
      const vals = [tier, min, max, note];
      let xr = 0.4;
      vals.forEach((v, ci) => {
        s.addShape("rect", { x: xr, y: 2.8 + ri * 0.78, w: colW[ci], h: 0.74, fill: { color: ci === 0 ? bg : "F8FAFC" }, line: { color: "E2E8F0", width: 1 } });
        s.addText(v, {
          x: xr + 0.08, y: 2.82 + ri * 0.78, w: colW[ci] - 0.12, h: 0.7,
          fontSize: ci === 0 ? 11 : ci === 2 ? 13 : 10,
          bold: ci === 2,
          color: ci === 2 ? BLUE : DARK,
          fontFace: "Calibri", valign: "middle", align: ci === 3 ? "left" : "center"
        });
        xr += colW[ci];
      });
    });

    // Minimum basket note
    s.addShape("roundRect", { x: 0.4, y: 6.0, w: 12.5, h: 0.75, fill: { color: "FFF7ED" }, line: { color: "FED7AA", width: 1 }, rectRadius: 0.1 });
    s.addText("⚠  Minimum basket size to activate any DutyCredit: €70  ·  Single use  ·  Valid on travel date only  ·  Applied automatically at checkout via QR scan", {
      x: 0.6, y: 6.05, w: 12.1, h: 0.65, fontSize: 10.5, bold: true, color: ORANGE, fontFace: "Calibri", valign: "middle", align: "center"
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 5: RETAILER VALUE PROPOSITION
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "FOR AIRPORT RETAILERS");
    s.addText("More sales. Zero upfront cost.", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 28, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 2.5, ORANGE);
    const points = [
      { icon: "✓", title: "Performance model only", body: "2.5% fee per completed transaction. No monthly fee, no setup cost, no risk." },
      { icon: "✓", title: "Pre-motivated buyers", body: "Travelers arrive with a DutyCredit — already committed to spending €70+ in your store." },
      { icon: "✓", title: "No POS overhaul needed", body: "Simple QR scan at checkout. Works alongside your existing system in minutes." },
      { icon: "✓", title: "Real-time dashboard", body: "Track DutyCredit redemptions, transaction volume, and revenue attribution per store, per day." },
      { icon: "✓", title: "Multiple income channels", body: "DutyCredits arrive from travel agencies, airlines, hotels & car rentals — diversified flow." },
      { icon: "✓", title: "Scalable from day one", body: "Start with 1–3 stores. Add locations as volume grows. No lock-in." },
    ];
    points.forEach(({ icon, title, body }, i) => {
      const col = i % 2; const row = Math.floor(i / 2);
      const x = 0.4 + col * 6.35; const y = 1.75 + row * 1.55;
      s.addShape("roundRect", { x, y, w: 6.15, h: 1.35, fill: { color: i % 2 === 0 ? "FFF7ED" : LIGHT_BLUE_BG }, line: { color: i % 2 === 0 ? "FED7AA" : "DBEAFE", width: 1 }, rectRadius: 0.1 });
      s.addText(`${icon}  ${title}`, { x: x + 0.2, y: y + 0.1, w: 5.8, h: 0.4, fontSize: 12, bold: true, color: DARK, fontFace: "Calibri" });
      s.addText(body, { x: x + 0.2, y: y + 0.55, w: 5.8, h: 0.65, fontSize: 10.5, color: SLATE, fontFace: "Calibri" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 6: REVENUE CHANNEL 1 — Travel Partners
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "REVENUE CHANNEL 1 · TRAVEL PARTNERS");
    s.addText("Travel Agencies & OTAs", { x: 0.5, y: 0.75, w: 8, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    s.addShape("roundRect", { x: 9.0, y: 0.65, w: 3.8, h: 0.75, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.1 });
    s.addText("Largest active channel", { x: 9.0, y: 0.72, w: 3.8, h: 0.6, fontSize: 11, bold: true, color: BLUE, align: "center", fontFace: "Calibri", valign: "middle" });
    addDivider(s, 0.5, 1.5, 3, BLUE);
    s.addShape("roundRect", { x: 0.4, y: 1.65, w: 6.0, h: 4.6, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.12 });
    s.addText("Industry Context", { x: 0.6, y: 1.8, w: 5.6, h: 0.4, fontSize: 11, bold: true, color: BLUE, fontFace: "Calibri" });
    const travelFacts = [
      "• 1.4B+ international travel bookings per year (UNWTO 2024)",
      "• OTAs (Booking.com, Expedia) process 50%+ of leisure travel",
      "• Booking confirmation emails: 60–70% open rate (Mailchimp Travel Benchmark)",
      "• Average basket at airport duty-free: €55–€80 (TFWA 2023)",
      "• Agency commission model: proven — already used for insurance, hotels, transfers",
    ];
    travelFacts.forEach((f, i) => {
      s.addText(f, { x: 0.6, y: 2.35 + i * 0.68, w: 5.6, h: 0.6, fontSize: 10.5, color: "334155", fontFace: "Calibri", valign: "top" });
    });
    s.addShape("roundRect", { x: 6.7, y: 1.65, w: 6.2, h: 4.6, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 }, rectRadius: 0.12 });
    s.addText("What this means for your store", { x: 6.9, y: 1.8, w: 5.8, h: 0.4, fontSize: 11, bold: true, color: DARK, fontFace: "Calibri" });
    const retailerMeans = [
      { t: "Pre-sold intent", b: "Agency sends DutyCredit before departure — traveler already plans to spend €70+ in your store." },
      { t: "Volume at scale", b: "A single mid-size agency sends 10k+ travelers/year to Dutch airports." },
      { t: "Revenue example", b: "10k travelers × 20% conversion × €75 avg = €150,000 gross / €3,750 fee to DutyBoost." },
      { t: "Seasonality buffer", b: "Agency bookings peak Jan–Mar & Sep–Oct — filling your quieter periods." },
    ];
    retailerMeans.forEach(({ t, b }, i) => {
      s.addText(`▸  ${t}`, { x: 6.9, y: 2.35 + i * 1.0, w: 5.8, h: 0.35, fontSize: 11, bold: true, color: BLUE, fontFace: "Calibri" });
      s.addText(b, { x: 6.9, y: 2.72 + i * 1.0, w: 5.8, h: 0.55, fontSize: 10, color: SLATE, fontFace: "Calibri" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 7: REVENUE CHANNEL 1b — Airlines
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "REVENUE CHANNEL 1 · TRAVEL PARTNERS (CONT.)");
    s.addText("Airlines & Inflight", { x: 0.5, y: 0.75, w: 8, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    s.addShape("roundRect", { x: 9.0, y: 0.65, w: 3.8, h: 0.75, fill: { color: "F0F9FF" }, line: { color: "BAE6FD", width: 1 }, rectRadius: 0.1 });
    s.addText("High-volume channel", { x: 9.0, y: 0.72, w: 3.8, h: 0.6, fontSize: 11, bold: true, color: "0284C7", align: "center", fontFace: "Calibri", valign: "middle" });
    addDivider(s, 0.5, 1.5, 3, "0284C7");
    s.addShape("roundRect", { x: 0.4, y: 1.65, w: 6.0, h: 4.6, fill: { color: "F0F9FF" }, line: { color: "BAE6FD", width: 1 }, rectRadius: 0.12 });
    s.addText("Industry Context", { x: 0.6, y: 1.8, w: 5.6, h: 0.4, fontSize: 11, bold: true, color: "0284C7", fontFace: "Calibri" });
    const airlineFacts = [
      "• 4.5B passengers flew in 2024 (IATA Global Outlook)",
      "• Airline booking confirmation: #1 most-opened transactional email (70–85% open rate)",
      "• Ancillary revenue per pax: €25–€55 (Ideaworks 2023 CarTrawler Report)",
      "• 61% of travelers shop at airports on departure (m1nd-set 2023)",
      "• Inflight WiFi reach: 300M+ passengers per year and growing (Inmarsat)",
    ];
    airlineFacts.forEach((f, i) => {
      s.addText(f, { x: 0.6, y: 2.35 + i * 0.68, w: 5.6, h: 0.6, fontSize: 10.5, color: "334155", fontFace: "Calibri", valign: "top" });
    });
    s.addShape("roundRect", { x: 6.7, y: 1.65, w: 6.2, h: 4.6, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 }, rectRadius: 0.12 });
    s.addText("What this means for your store", { x: 6.9, y: 1.8, w: 5.8, h: 0.4, fontSize: 11, bold: true, color: DARK, fontFace: "Calibri" });
    const airlineMeansRetailer = [
      { t: "Massive reach", b: "Even 1 regional airline route at AMS = 500k+ pax/year potential audience." },
      { t: "Booking-triggered", b: "DutyCredit issued at booking — traveler has weeks to plan their €70+ store visit." },
      { t: "Revenue example", b: "100k pax × 20% conversion × €80 avg = €1.6M gross / €40,000 fee to DutyBoost." },
      { t: "Inflight activation", b: "WiFi portal & IFE reminders keep the DutyCredit top-of-mind on the plane." },
    ];
    airlineMeansRetailer.forEach(({ t, b }, i) => {
      s.addText(`▸  ${t}`, { x: 6.9, y: 2.35 + i * 1.0, w: 5.8, h: 0.35, fontSize: 11, bold: true, color: "0284C7", fontFace: "Calibri" });
      s.addText(b, { x: 6.9, y: 2.72 + i * 1.0, w: 5.8, h: 0.55, fontSize: 10, color: SLATE, fontFace: "Calibri" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 8: REVENUE CHANNEL 2 — Hotels
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "REVENUE CHANNEL 2 · HOTELS");
    s.addText("Hotels — The Departure Moment", { x: 0.5, y: 0.75, w: 8, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    s.addShape("roundRect", { x: 9.0, y: 0.65, w: 3.8, h: 0.75, fill: { color: "F0FDF4" }, line: { color: "BBF7D0", width: 1 }, rectRadius: 0.1 });
    s.addText("Future channel — model ready", { x: 9.0, y: 0.72, w: 3.8, h: 0.6, fontSize: 10, bold: true, color: "059669", align: "center", fontFace: "Calibri", valign: "middle" });
    addDivider(s, 0.5, 1.5, 3, "059669");
    s.addShape("roundRect", { x: 0.4, y: 1.65, w: 6.0, h: 4.6, fill: { color: "F0FDF4" }, line: { color: "BBF7D0", width: 1 }, rectRadius: 0.12 });
    s.addText("Industry Context", { x: 0.6, y: 1.8, w: 5.6, h: 0.4, fontSize: 11, bold: true, color: "059669", fontFace: "Calibri" });
    const hotelFacts = [
      "• 1.7B hotel room nights booked annually (STR Global 2024)",
      "• Post-stay / departure email open rate: 45–60% (HospitalityNet)",
      "• 70%+ of hotel guests travel by air (UNWTO Visitor Profile)",
      "• Hotel check-out email is the most underutilised touchpoint in travel",
      "• Loyalty programme members spend 22% more on average (McKinsey)",
    ];
    hotelFacts.forEach((f, i) => {
      s.addText(f, { x: 0.6, y: 2.35 + i * 0.68, w: 5.6, h: 0.6, fontSize: 10.5, color: "334155", fontFace: "Calibri", valign: "top" });
    });
    s.addShape("roundRect", { x: 6.7, y: 1.65, w: 6.2, h: 4.6, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 }, rectRadius: 0.12 });
    s.addText("What this means for your store", { x: 6.9, y: 1.8, w: 5.8, h: 0.4, fontSize: 11, bold: true, color: DARK, fontFace: "Calibri" });
    const hotelMeansRetailer = [
      { t: "Check-out triggers spend", b: "Hotel sends DutyCredit at check-out — guest heads to airport ready to spend €70+." },
      { t: "High-value guests", b: "Hotel guests have higher disposable income and spend more per airport visit." },
      { t: "Revenue example", b: "100k hotel guests × 20% conversion × €75 avg = €1.5M gross / €37,500 fee to DutyBoost." },
      { t: "No operational change", b: "Entirely email-based. No app, no hardware, no hotel staff involvement." },
    ];
    hotelMeansRetailer.forEach(({ t, b }, i) => {
      s.addText(`▸  ${t}`, { x: 6.9, y: 2.35 + i * 1.0, w: 5.8, h: 0.35, fontSize: 11, bold: true, color: "059669", fontFace: "Calibri" });
      s.addText(b, { x: 6.9, y: 2.72 + i * 1.0, w: 5.8, h: 0.55, fontSize: 10, color: SLATE, fontFace: "Calibri" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 9: REVENUE CHANNEL 3 — Car Rental
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "REVENUE CHANNEL 3 · CAR RENTAL");
    s.addText("Car Rental — Every Booking a Departure Moment", { x: 0.5, y: 0.75, w: 10, h: 0.7, fontSize: 24, bold: true, color: DARK, fontFace: "Calibri" });
    s.addShape("roundRect", { x: 10.2, y: 0.65, w: 2.7, h: 0.75, fill: { color: "FFF7ED" }, line: { color: "FED7AA", width: 1 }, rectRadius: 0.1 });
    s.addText("Future channel — model ready", { x: 10.2, y: 0.72, w: 2.7, h: 0.6, fontSize: 9, bold: true, color: ORANGE, align: "center", fontFace: "Calibri", valign: "middle" });
    addDivider(s, 0.5, 1.5, 3, ORANGE);
    s.addShape("roundRect", { x: 0.4, y: 1.65, w: 6.0, h: 4.6, fill: { color: "FFF7ED" }, line: { color: "FED7AA", width: 1 }, rectRadius: 0.12 });
    s.addText("Industry Context", { x: 0.6, y: 1.8, w: 5.6, h: 0.4, fontSize: 11, bold: true, color: ORANGE, fontFace: "Calibri" });
    const carFacts = [
      "• 115M+ car rental transactions per year in Europe alone (ACRISS / Statista 2024)",
      "• Booking confirmation email open rate: 70–85% (highest in travel industry)",
      "• 80% of car rentals connect to or depart from an airport (ACRISS)",
      "• Rental booking window: avg 14–28 days in advance — long intent-building period",
      "• Loyalty is the #1 differentiation battleground between Hertz, Avis, Enterprise, Sixt",
    ];
    carFacts.forEach((f, i) => {
      s.addText(f, { x: 0.6, y: 2.35 + i * 0.68, w: 5.6, h: 0.6, fontSize: 10.5, color: "334155", fontFace: "Calibri", valign: "top" });
    });
    s.addShape("roundRect", { x: 6.7, y: 1.65, w: 6.2, h: 4.6, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 }, rectRadius: 0.12 });
    s.addText("What this means for your store", { x: 6.9, y: 1.8, w: 5.8, h: 0.4, fontSize: 11, bold: true, color: DARK, fontFace: "Calibri" });
    const carMeansRetailer = [
      { t: "Natural airport association", b: "Car rental = departure logistics. A DutyCredit at the airport feels native and expected." },
      { t: "Early intent", b: "Booked weeks ahead — traveler has time to plan their €70+ store visit." },
      { t: "Revenue example", b: "100k rentals × 15% conversion × €80 avg = €1.2M gross / €30,000 fee to DutyBoost." },
      { t: "B2B multiplier", b: "Corporate rental accounts can embed DutyCredit in employee travel policy — recurring volume." },
    ];
    carMeansRetailer.forEach(({ t, b }, i) => {
      s.addText(`▸  ${t}`, { x: 6.9, y: 2.35 + i * 1.0, w: 5.8, h: 0.35, fontSize: 11, bold: true, color: ORANGE, fontFace: "Calibri" });
      s.addText(b, { x: 6.9, y: 2.72 + i * 1.0, w: 5.8, h: 0.55, fontSize: 10, color: SLATE, fontFace: "Calibri" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 10: COMBINED REVENUE POTENTIAL
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "COMBINED REVENUE POTENTIAL", ORANGE);
    s.addText("What all channels mean for 1 store", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("Conservative modelling · Single airport store · Min. basket €70 · Mixed channel volume", { x: 0.5, y: 1.5, w: 12.3, h: 0.35, fontSize: 11, color: "94A3B8", align: "center", fontFace: "Calibri" });
    const rows = [
      { channel: "Travel Agencies & OTAs", issued: "5,000/yr", conv: "20%", avg: "€75", gross: "€75,000", fee: "€1,875", color: BLUE },
      { channel: "Airlines", issued: "15,000/yr", conv: "18%", avg: "€80", gross: "€216,000", fee: "€5,400", color: "0284C7" },
      { channel: "Hotels", issued: "3,000/yr", conv: "20%", avg: "€75", gross: "€45,000", fee: "€1,125", color: "059669" },
      { channel: "Car Rental", issued: "4,000/yr", conv: "15%", avg: "€80", gross: "€48,000", fee: "€1,200", color: ORANGE },
    ];
    const headers = ["Channel", "DutyCredits Issued", "Conversion", "Avg Spend", "Gross Revenue", "DutyBoost Fee (2.5%)"];
    const colW = [3.2, 1.9, 1.5, 1.5, 2.0, 2.3];
    let xh = 0.35;
    headers.forEach((h, i) => {
      s.addShape("rect", { x: xh, y: 1.95, w: colW[i], h: 0.45, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(h, { x: xh + 0.05, y: 1.97, w: colW[i] - 0.1, h: 0.41, fontSize: 9.5, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: i === 0 ? "left" : "center" });
      xh += colW[i];
    });
    rows.forEach(({ channel, issued, conv, avg, gross, fee, color }, ri) => {
      const vals = [channel, issued, conv, avg, gross, fee];
      let xr = 0.35;
      vals.forEach((v, ci) => {
        const bg = ri % 2 === 0 ? LIGHT_BLUE_BG : "F8FAFC";
        s.addShape("rect", { x: xr, y: 2.4 + ri * 0.72, w: colW[ci], h: 0.68, fill: { color: bg }, line: { color: "E2E8F0", width: 1 } });
        s.addText(v, { x: xr + 0.08, y: 2.42 + ri * 0.72, w: colW[ci] - 0.1, h: 0.64, fontSize: ci === 0 ? 11 : 12, bold: ci === 4 || ci === 5, color: ci === 0 ? color : ci === 4 ? "059669" : ci === 5 ? "DC2626" : DARK, fontFace: "Calibri", valign: "middle", align: ci === 0 ? "left" : "center" });
        xr += colW[ci];
      });
    });
    let xt = 0.35;
    const totals = ["TOTAL", "27,000/yr", "", "", "€384,000 gross", "€9,600/yr"];
    totals.forEach((v, ci) => {
      s.addShape("rect", { x: xt, y: 5.33, w: colW[ci], h: 0.72, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(v, { x: xt + 0.08, y: 5.35, w: colW[ci] - 0.1, h: 0.68, fontSize: ci === 4 ? 14 : 11, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: ci === 0 ? "left" : "center" });
      xt += colW[ci];
    });
    s.addText("* You earn €384,000 in incremental sales. You pay €9,600 in total fees. ROI: 40:1  ·  Min. basket €70 applied throughout.", { x: 0.35, y: 6.2, w: 12.6, h: 0.35, fontSize: 10, color: "94A3B8", fontFace: "Calibri", italic: true, align: "center" });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 11: BUSINESS TRAVEL (Future)
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "FUTURE CHANNEL · CORPORATE & BUSINESS TRAVEL");
    s.addText("Corporate Travel — The B2B Multiplier", { x: 0.5, y: 0.75, w: 9, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    s.addShape("roundRect", { x: 9.8, y: 0.65, w: 3.1, h: 0.75, fill: { color: "F5F3FF" }, line: { color: "C4B5FD", width: 1 }, rectRadius: 0.1 });
    s.addText("In development", { x: 9.8, y: 0.72, w: 3.1, h: 0.6, fontSize: 11, bold: true, color: "7C3AED", align: "center", fontFace: "Calibri", valign: "middle" });
    addDivider(s, 0.5, 1.5, 3, "7C3AED");
    const corpPoints = [
      { t: "What is it?", b: "Companies pre-load F&B and retail budgets for travelling employees. Spend is tracked by cost centre, department, and policy." },
      { t: "Why retailers benefit?", b: "Corporate travelers fly 2–4x/month. DutyCredit becomes a recurring per-trip benefit — guaranteed footfall from known accounts." },
      { t: "Policy engine", b: "Employers set daily limits (e.g. €20 F&B, €50 retail). Traveler uses QR at your store. Min. basket €70 applies." },
      { t: "Market size", b: "Global corporate travel spend: $1.4 trillion (GBTA 2024). F&B at airports alone: ~$3.5B annually." },
      { t: "Value for retailer", b: "Predictable recurring spend from high-frequency corporate accounts. B2B contracts = stable monthly revenue baseline." },
      { t: "Integration", b: "Same QR scan as leisure DutyCredits — zero extra complexity at checkout." },
    ];
    corpPoints.forEach(({ t, b }, i) => {
      const col = i % 2; const row = Math.floor(i / 2);
      const x = 0.4 + col * 6.45; const y = 1.75 + row * 1.55;
      s.addShape("roundRect", { x, y, w: 6.2, h: 1.4, fill: { color: "F5F3FF" }, line: { color: "C4B5FD", width: 1 }, rectRadius: 0.1 });
      s.addText(t, { x: x + 0.2, y: y + 0.1, w: 5.8, h: 0.4, fontSize: 11, bold: true, color: "7C3AED", fontFace: "Calibri" });
      s.addText(b, { x: x + 0.2, y: y + 0.55, w: 5.8, h: 0.7, fontSize: 10.5, color: SLATE, fontFace: "Calibri" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 12: INTEGRATION
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "INTEGRATION", ORANGE);
    s.addText("Simple by design. Live in days.", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const steps = [
      { num: "1", title: "Register your store", body: "Sign up at dutyboost.com. Add your store name, airport, and category. Takes 5 minutes." },
      { num: "2", title: "Set up QR scanning", body: "Use our web app on any device with a camera. No hardware purchase. No API integration required to start." },
      { num: "3", title: "Receive your first DutyCredits", body: "DutyBoost activates your store. Travelers with DutyCredits for your airport can now visit your store." },
      { num: "4", title: "Track & grow", body: "Real-time dashboard shows daily scans, revenue, and channel breakdown. Expand to more stores when ready." },
    ];
    steps.forEach(({ num, title, body }, i) => {
      const x = 0.35 + i * 3.18;
      s.addShape("roundRect", { x, y: 1.7, w: 3.0, h: 4.4, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.15 });
      s.addShape("roundRect", { x: x + 1.0, y: 1.8, w: 1.0, h: 1.0, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.5 });
      s.addText(num, { x: x + 1.0, y: 1.83, w: 1.0, h: 0.94, fontSize: 20, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(title, { x: x + 0.1, y: 2.95, w: 2.8, h: 0.55, fontSize: 12, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
      s.addText(body, { x: x + 0.15, y: 3.6, w: 2.7, h: 2.1, fontSize: 10.5, color: SLATE, align: "center", fontFace: "Calibri", valign: "top" });
    });
    s.addShape("roundRect", { x: 0.35, y: 6.3, w: 12.63, h: 0.55, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.1 });
    s.addText("Optional POS API available for high-volume stores — full webhook & transaction sync included.", { x: 0.5, y: 6.33, w: 12.35, h: 0.47, fontSize: 11, color: WHITE, fontFace: "Calibri", align: "center", valign: "middle" });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 13: PILOT
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "LET'S START TOGETHER");
    s.addText("Pilot: 1–3 stores. Zero risk. Real results.", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 28, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 4, BLUE);
    const cols = [
      {
        title: "Phase 1 · Onboard",
        color: BLUE, bg: LIGHT_BLUE_BG,
        points: [
          "Register 1–3 stores",
          "Set up QR scan app (any device)",
          "Agree on reporting cadence",
          "DutyBoost activates your store",
          "Timeline: 3–5 business days",
        ]
      },
      {
        title: "Phase 2 · Go Live",
        color: "059669", bg: "F0FDF4",
        points: [
          "First DutyCredits live from agency channel",
          "Staff briefed on QR scan process (10 min)",
          "Live dashboard access granted",
          "First redemptions tracked in real time",
          "Timeline: Week 1–4",
        ]
      },
      {
        title: "Phase 3 · Scale",
        color: ORANGE, bg: "FFF7ED",
        points: [
          "Review monthly report together",
          "Add airline & hotel channels",
          "Expand to additional store locations",
          "Explore POS API for deeper integration",
          "Timeline: Month 2 onwards",
        ]
      }
    ];
    cols.forEach(({ title, color, bg, points }, i) => {
      const x = 0.35 + i * 4.3;
      s.addShape("roundRect", { x, y: 1.7, w: 4.1, h: 5.1, fill: { color: bg }, line: { color: bg === LIGHT_BLUE_BG ? "DBEAFE" : bg === "F0FDF4" ? "BBF7D0" : "FED7AA", width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x: x + 0.15, y: 1.85, w: 3.8, h: 0.5, fontSize: 12, bold: true, color, fontFace: "Calibri" });
      points.forEach((p, j) => {
        s.addText(`•  ${p}`, { x: x + 0.2, y: 2.55 + j * 0.72, w: 3.7, h: 0.6, fontSize: 11, color: "334155", fontFace: "Calibri" });
      });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 14: CLOSING CTA
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 0.08, fill: { color: ORANGE }, line: { color: ORANGE, width: 0 } });
    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.5, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });
    s.addText("Ready to turn your airport\nfootfall into revenue?", { x: 1, y: 2.1, w: 11.3, h: 1.5, fontSize: 34, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    addDivider(s, 4.5, 3.8, 4.33, ORANGE);
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
    s.addText("hello@dutyboost.com  ·  www.dutyboost.com", { x: 1, y: 5.7, w: 11.3, h: 0.5, fontSize: 15, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
    s.addText(`© ${new Date().getFullYear()} DutyBoost B.V. · The Future of Airport Retail`, { x: 1, y: 6.75, w: 11.3, h: 0.3, fontSize: 9, color: SLATE, align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-AirportRetailer-Presentation.pptx" });
}