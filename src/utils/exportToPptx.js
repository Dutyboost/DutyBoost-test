import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";

function addBackground(slide, color1, color2, dark = false) {
  slide.background = { color: dark ? "0F172A" : "F8FAFF" };
}

export async function exportToPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

  // --- SLIDE 1: Cover ---
  {
    const s = pptx.addSlide();
    s.background = { color: "F0F6FF" };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.5, w: 4.0, h: 1.5, sizing: { type: "contain", w: 4.0, h: 1.5 } });
    s.addShape(pptx.ShapeType.line, { x: 5.8, y: 2.2, w: 1.8, h: 0, line: { color: "3B82F6", width: 2 } });
    s.addText("The Travel Retail\nConversion Layer", { x: 2.5, y: 2.5, w: 8.3, h: 1.8, fontSize: 36, bold: true, color: "0F172A", align: "center", fontFace: "Calibri", breakLine: false });
    s.addText("A platform where travel agencies, airlines, airport retailers,\nand travelers all win.", { x: 2.5, y: 4.5, w: 8.3, h: 0.9, fontSize: 16, color: "64748B", align: "center", fontFace: "Calibri" });
    const icons = ["Travel Agencies", "Airlines", "Retailers", "Travelers"];
    icons.forEach((label, i) => {
      s.addText(label, { x: 1.5 + i * 2.6, y: 5.7, w: 2.2, h: 0.4, fontSize: 11, color: "64748B", align: "center", fontFace: "Calibri" });
    });
  }

  // --- SLIDE 2: Problem ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addText("THE PROBLEM", { x: 1, y: 0.5, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "94A3B8", align: "center", fontFace: "Calibri", charSpacing: 3 });
    s.addText("€14B in airport retail revenue.\nAlmost none of it is coordinated.", { x: 1, y: 1.1, w: 11.3, h: 1.6, fontSize: 30, bold: true, color: "F1F5F9", align: "center", fontFace: "Calibri" });
    const problems = [
      { title: "Agencies", text: "Send travelers to airports but earn nothing from what happens there." },
      { title: "Retailers", text: "Have thousands of travelers walk by but struggle to convert them." },
      { title: "Travelers", text: "Get generic ads instead of personalised, relevant incentives." },
    ];
    problems.forEach(({ title, text }, i) => {
      const x = 0.8 + i * 4.0;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 3.2, w: 3.6, h: 3.5, fill: { color: "1E293B" }, line: { color: "334155", width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x, y: 3.4, w: 3.6, h: 0.5, fontSize: 14, bold: true, color: "F1F5F9", align: "center", fontFace: "Calibri" });
      s.addText(text, { x: x + 0.2, y: 4.1, w: 3.2, h: 2.2, fontSize: 12, color: "94A3B8", align: "left", fontFace: "Calibri", valign: "top" });
    });
  }

  // --- SLIDE 3: Solution ---
  {
    const s = pptx.addSlide();
    s.background = { color: "2563EB" };
    s.addText("THE SOLUTION", { x: 1, y: 0.6, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "BFDBFE", align: "center", fontFace: "Calibri", charSpacing: 3 });
    s.addText("DutyBoost connects the dots.", { x: 1, y: 1.2, w: 11.3, h: 1.0, fontSize: 34, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("A closed-loop incentive engine that turns booking data into targeted, redeemable\nvouchers — creating value for every player in the ecosystem.", { x: 1.5, y: 2.4, w: 10.3, h: 1.0, fontSize: 15, color: "DBEAFE", align: "center", fontFace: "Calibri" });
    const steps = ["Agency books trip", "→", "Traveler gets DutyCredit", "→", "Redeemed at retailer", "→", "Everyone earns"];
    const stepColors = ["FFFFFF33", null, "FFFFFF33", null, "FFFFFF33", null, "FB923C"];
    let xPos = 0.3;
    steps.forEach((step, i) => {
      if (step === "→") {
        s.addText("→", { x: xPos, y: 4.3, w: 0.5, h: 0.5, fontSize: 16, color: "BFDBFE", align: "center", fontFace: "Calibri" });
        xPos += 0.5;
      } else {
        const w = i === 6 ? 2.1 : 2.2;
        s.addShape(pptx.ShapeType.roundRect, { x: xPos, y: 4.1, w, h: 0.8, fill: { color: i === 6 ? "F97316" : "FFFFFF", transparency: i === 6 ? 0 : 80 }, line: { color: "FFFFFF44", width: 1 }, rectRadius: 0.1 });
        s.addText(step, { x: xPos, y: 4.15, w, h: 0.7, fontSize: 12, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
        xPos += w + 0.05;
      }
    });
  }

  // --- SLIDES 4-6: Stakeholders ---
  const stakeholders = [
    {
      label: "STAKEHOLDER 1", title: "Travel Agencies", accent: "2563EB",
      subtitle: "Turn every booking into a new revenue stream",
      pain: "You book the flights but earn nothing from what travelers do at the airport.",
      gains: ["Earn commission on every DutyCredit redemption your travelers make", "Give travelers a compelling reason to book with you again", "Access a real-time dashboard with agency-level analytics", "One-click API integration — no development effort needed"],
      quote: "Your agency earns money while your traveler shops at the airport. Zero extra work.",
      bg: "EFF6FF",
    },
    {
      label: "STAKEHOLDER 2", title: "Airlines", accent: "0284C7",
      subtitle: "Deepen passenger loyalty and drive ancillary revenue beyond the flight",
      pain: "Passengers choose airlines on price. Once they land, your brand influence ends.",
      gains: ["Reward frequent flyers with DutyBoost credits tied to flight bookings", "Differentiate your offering with a tangible, airport-spend perk", "Gain insight into passenger behavior across departure experiences", "White-label ready — integrate seamlessly into your existing loyalty programme"],
      quote: "Turn your boarding pass into a shopping passport. Passengers love it. Retailers benefit. You win loyalty.",
      bg: "F0F9FF",
    },
    {
      label: "STAKEHOLDER 3", title: "Airport Retailers", accent: "EA580C",
      subtitle: "Convert more browsers into buyers — with zero upfront cost",
      pain: "Travelers walk past your store daily. Most don't stop. You compete for the same fleeting attention.",
      gains: ["Receive pre-qualified, high-intent buyers with vouchers in hand", "No cost unless a voucher is redeemed — pure performance model", "Track footfall, redemption rates, and revenue attribution in real time", "Simple QR scan at checkout — no POS system overhaul needed"],
      quote: "You only pay when a traveler spends. DutyBoost sends them to you already motivated to buy.",
      bg: "FFF7ED",
    },
  ];

  stakeholders.forEach(({ label, title, accent, subtitle, pain, gains, quote, bg }) => {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText(label, { x: 0.5, y: 0.4, w: 4, h: 0.35, fontSize: 10, bold: true, color: accent, charSpacing: 2, fontFace: "Calibri" });
    s.addText(title, { x: 0.5, y: 0.85, w: 12.3, h: 0.7, fontSize: 28, bold: true, color: "0F172A", fontFace: "Calibri" });
    s.addText(subtitle, { x: 0.5, y: 1.55, w: 12.3, h: 0.4, fontSize: 14, color: "64748B", fontFace: "Calibri" });
    s.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 2.1, w: 12.3, h: 0.75, fill: { color: bg }, line: { color: accent, width: 1 }, rectRadius: 0.12 });
    s.addText(`😟 Today: ${pain}`, { x: 0.7, y: 2.15, w: 12.0, h: 0.65, fontSize: 11, color: "475569", fontFace: "Calibri", italic: true });
    gains.forEach((g, i) => {
      const col = i % 2; const row = Math.floor(i / 2);
      const x = 0.5 + col * 6.2; const y = 3.1 + row * 1.1;
      s.addShape(pptx.ShapeType.roundRect, { x, y, w: 6.0, h: 0.95, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 }, rectRadius: 0.1 });
      s.addText(`✓  ${g}`, { x: x + 0.15, y: y + 0.1, w: 5.7, h: 0.75, fontSize: 11, color: "334155", fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 5.4, w: 12.3, h: 0.8, fill: { color: accent }, line: { color: accent, width: 0 }, rectRadius: 0.15 });
    s.addText(`💡 ${quote}`, { x: 0.7, y: 5.45, w: 12.0, h: 0.7, fontSize: 12, bold: true, color: "FFFFFF", fontFace: "Calibri", valign: "middle" });
  });

  // --- SLIDE 7: Traveler ---
  {
    const s = pptx.addSlide();
    s.background = { color: "059669" };
    s.addText("THE TRAVELER", { x: 1, y: 0.5, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "A7F3D0", align: "center", fontFace: "Calibri", charSpacing: 3 });
    s.addText("The silent beneficiary", { x: 1, y: 1.1, w: 11.3, h: 0.9, fontSize: 32, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("Travelers don't need to do anything differently. They simply receive a personalised DutyCredit\nvoucher before departure — and spend it at participating stores.", { x: 1.5, y: 2.2, w: 10.3, h: 0.9, fontSize: 14, color: "D1FAE5", align: "center", fontFace: "Calibri" });
    const benefits = [
      { title: "Personalised", text: "Vouchers matched to their travel profile, departure airport, and timing." },
      { title: "Effortless", text: "One QR code at checkout. No app required. No loyalty card to carry." },
      { title: "Real value", text: "Genuine discounts at stores they were already walking past." },
    ];
    benefits.forEach(({ title, text }, i) => {
      const x = 0.8 + i * 4.0;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 3.5, w: 3.6, h: 2.8, fill: { color: "FFFFFF", transparency: 85 }, line: { color: "FFFFFF44", width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x, y: 3.7, w: 3.6, h: 0.5, fontSize: 14, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
      s.addText(text, { x: x + 0.2, y: 4.4, w: 3.2, h: 1.6, fontSize: 12, color: "D1FAE5", fontFace: "Calibri", valign: "top" });
    });
  }

  // --- SLIDE 8: Business Model ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("BUSINESS MODEL", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "94A3B8", align: "center", fontFace: "Calibri", charSpacing: 3 });
    s.addText("A model where everybody wins", { x: 1, y: 0.95, w: 11.3, h: 0.8, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    s.addText("DutyBoost operates on a pure performance model. No redemption, no fee.", { x: 1.5, y: 1.9, w: 10.3, h: 0.5, fontSize: 13, color: "64748B", align: "center", fontFace: "Calibri" });
    const players = [
      { label: "Travel Agency", earn: "Commission per redemption", color: "2563EB", bg: "EFF6FF" },
      { label: "Airline", earn: "Loyalty uplift + ancillary share", color: "0284C7", bg: "F0F9FF" },
      { label: "Retailer", earn: "Incremental footfall & sales", color: "EA580C", bg: "FFF7ED" },
      { label: "Traveler", earn: "Real discounts at departure", color: "059669", bg: "F0FDF4" },
    ];
    players.forEach(({ label, earn, color, bg }, i) => {
      const x = 0.5 + i * 3.15;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 2.7, w: 3.0, h: 2.5, fill: { color: bg }, line: { color: color, width: 1 }, rectRadius: 0.15 });
      s.addText(label, { x, y: 2.9, w: 3.0, h: 0.5, fontSize: 13, bold: true, color, align: "center", fontFace: "Calibri" });
      s.addText(earn, { x: x + 0.15, y: 3.55, w: 2.7, h: 1.2, fontSize: 11, color: "475569", align: "center", fontFace: "Calibri" });
    });
    s.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 5.5, w: 12.3, h: 0.75, fill: { color: "0F172A" }, line: { color: "0F172A", width: 0 }, rectRadius: 0.15 });
    s.addText("🔁  DutyBoost takes a small platform fee per transaction — only paid when value is exchanged.", { x: 0.7, y: 5.55, w: 12.0, h: 0.65, fontSize: 12, bold: true, color: "FFFFFF", fontFace: "Calibri", valign: "middle" });
  }

  // --- SLIDE 9: CTA ---
  {
    const s = pptx.addSlide();
    s.background = { color: "F0F6FF" };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.4, w: 4.0, h: 1.5, sizing: { type: "contain", w: 4.0, h: 1.5 } });
    s.addText("Ready to boost?", { x: 1, y: 2.2, w: 11.3, h: 1.0, fontSize: 38, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    s.addText("Whether you're a travel agency, airline, or airport retailer —\nDutyBoost is built for you. Let's talk.", { x: 1.5, y: 3.4, w: 10.3, h: 1.0, fontSize: 16, color: "475569", align: "center", fontFace: "Calibri" });
    s.addText("www.dutyboost.com", { x: 1, y: 4.7, w: 11.3, h: 0.5, fontSize: 14, bold: true, color: "2563EB", align: "center", fontFace: "Calibri" });
    s.addText(`© ${new Date().getFullYear()} DutyBoost · The Travel Retail Conversion Layer`, { x: 1, y: 6.8, w: 11.3, h: 0.35, fontSize: 9, color: "94A3B8", align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-Presentation.pptx" });
}