import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";

export async function exportTravelPartnerPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

  // --- SLIDE 1: Cover ---
  {
    const s = pptx.addSlide();
    s.background = { color: "EFF6FF" };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.5, w: 4.0, h: 1.5, sizing: { type: "contain", w: 4.0, h: 1.5 } });
    s.addShape(pptx.ShapeType.line, { x: 4.8, y: 2.2, w: 3.7, h: 0, line: { color: "2563EB", width: 2 } });
    s.addText("Turn Bookings Into\nRevenue", { x: 2.5, y: 2.5, w: 8.3, h: 1.8, fontSize: 36, bold: true, color: "0F172A", align: "center", fontFace: "Calibri", breakLine: false });
    s.addText("Earn commission on every airport sale.\nDutyBoost for Travel Partners.", { x: 1.5, y: 4.5, w: 10.3, h: 0.9, fontSize: 16, color: "64748B", align: "center", fontFace: "Calibri" });
  }

  // --- SLIDE 2: The Market ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("THE MARKET SHIFT", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "2563EB", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Commissions are shrinking.\nTravelers expect more value.", { x: 1, y: 1.0, w: 11.3, h: 1.2, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const stats = [
      { num: "$141.3B", label: "US travel booked through advisors (2026)" },
      { num: "26%", label: "Of total travel market share" },
      { num: "0–2%", label: "Average airline commission today" },
    ];
    stats.forEach(({ num, label }, i) => {
      const x = 0.8 + i * 3.9;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 3.0, w: 3.6, h: 2.8, fill: { color: "EFF6FF" }, line: { color: "2563EB", width: 1 }, rectRadius: 0.15 });
      s.addText(num, { x, y: 3.4, w: 3.6, h: 0.8, fontSize: 22, bold: true, color: "2563EB", align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.2, y: 4.4, w: 3.2, h: 1.0, fontSize: 10, color: "64748B", align: "center", fontFace: "Calibri" });
    });
  }

  // --- SLIDE 3: The Problem ---
  {
    const s = pptx.addSlide();
    s.background = { color: "EFF6FF" };
    s.addText("THE COMMISSION PROBLEM", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "2563EB", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("You earn once. Then nothing.", { x: 1, y: 1.0, w: 11.3, h: 1.0, fontSize: 32, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const problems = [
      { title: "One-time\ncommission", desc: "You earn on the flight. That's it. No way to monetize airport spending." },
      { title: "Shrinking\nrates", desc: "Airlines pay 0–2%. Hotels 5–10%. Every year they cut more." },
      { title: "No loyalty\ntool", desc: "Travelers choose by price. You need a perk to create stickiness." },
    ];
    problems.forEach(({ title, desc }, i) => {
      const x = 0.8 + i * 4.0;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 2.8, w: 3.6, h: 3.5, fill: { color: "FFFFFF" }, line: { color: "2563EB", width: 2 }, rectRadius: 0.15 });
      s.addText(title, { x: x + 0.2, y: 3.0, w: 3.2, h: 1.0, fontSize: 12, bold: true, color: "2563EB", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: 4.2, w: 3.2, h: 1.6, fontSize: 11, color: "64748B", align: "center", fontFace: "Calibri" });
    });
  }

  // --- SLIDE 4: The Solution ---
  {
    const s = pptx.addSlide();
    s.background = { color: "2563EB" };
    s.addText("THE DUTYBOOST SOLUTION", { x: 1, y: 0.5, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "BFDBFE", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Earn on airport spending.\nZero extra work.", { x: 1, y: 1.1, w: 11.3, h: 1.2, fontSize: 32, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("One API call at booking confirmation. We handle everything else:\nvoucher creation, QR codes, redemption tracking, and payouts.", { x: 1.5, y: 2.5, w: 10.3, h: 1.0, fontSize: 14, color: "DBEAFE", align: "center", fontFace: "Calibri" });
    
    const steps = [
      "1. Integration",
      "One API call",
      "2. Automatic",
      "Vouchers created",
      "3. Traveler",
      "Receives QR code",
      "4. Redemption",
      "At airport store",
      "5. Commission",
      "0.5% net sales"
    ];
    let xPos = 0.2;
    for (let i = 0; i < steps.length; i += 2) {
      const w = 2.4;
      s.addShape(pptx.ShapeType.roundRect, { x: xPos, y: 4.0, w, h: 2.4, fill: { color: "FFFFFF" }, line: { color: "FFFFFF44", width: 1 }, rectRadius: 0.1 });
      s.addText(steps[i], { x: xPos + 0.1, y: 4.2, w: w - 0.2, h: 0.4, fontSize: 9, bold: true, color: "2563EB", align: "center", fontFace: "Calibri" });
      s.addText(steps[i + 1], { x: xPos + 0.1, y: 4.8, w: w - 0.2, h: 1.4, fontSize: 10, color: "2563EB", align: "center", fontFace: "Calibri" });
      xPos += w + 0.08;
    }
  }

  // --- SLIDE 5: Benefits ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("YOUR BENEFITS", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "2563EB", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Why travel partners love DutyBoost", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const benefits = [
      { title: "Zero extra\nwork", desc: "One API call.\nThat's it. We handle\neverything else." },
      { title: "Real commission\nincome", desc: "0.5% per redemption.\nAutomated payouts\nmonthly." },
      { title: "Customer\ndifferentiation", desc: "Give travelers a perk.\n'Book with us for\nairport discounts.'" },
      { title: "Full visibility", desc: "Real-time dashboard.\nSee voucher performance\n& earnings." },
      { title: "No risk", desc: "We handle creation,\nvalidation, redemption,\nand payout." },
      { title: "Scales with\nyou", desc: "More bookings =\nmore commission.\nPassive income." },
    ];
    let idx = 0;
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const x = 0.5 + col * 4.1;
        const y = 2.0 + row * 2.5;
        if (idx < benefits.length) {
          const { title, desc } = benefits[idx];
          s.addShape(pptx.ShapeType.roundRect, { x, y, w: 3.9, h: 2.3, fill: { color: "EFF6FF" }, line: { color: "2563EB", width: 1 }, rectRadius: 0.15 });
          s.addText(title, { x: x + 0.15, y: y + 0.25, w: 3.6, h: 0.8, fontSize: 11, bold: true, color: "2563EB", align: "center", fontFace: "Calibri" });
          s.addText(desc, { x: x + 0.15, y: y + 1.1, w: 3.6, h: 1.0, fontSize: 10, color: "64748B", align: "center", fontFace: "Calibri" });
          idx++;
        }
      }
    }
  }

  // --- SLIDE 6: Revenue Example ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("REVENUE EXAMPLE", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "2563EB", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("500 bookings/month (avg €800 each)", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const metrics = [
      { label: "Redemption rate", val: "35%" },
      { label: "Vouchers redeemed", val: "175" },
      { label: "Avg net sale", val: "€220" },
      { label: "Monthly commission", val: "€385" },
      { label: "Annual bonus", val: "€4,620" },
    ];
    let yPos = 2.0;
    metrics.forEach(({ label, val }, i) => {
      const isFinal = i === metrics.length - 1;
      s.addShape(pptx.ShapeType.roundRect, { x: 2.0, y: yPos, w: 9.3, h: 0.7, fill: { color: isFinal ? "EFF6FF" : "FFFFFF" }, line: { color: isFinal ? "2563EB" : "E2E8F0", width: isFinal ? 2 : 1 }, rectRadius: 0.1 });
      s.addText(label, { x: 2.5, y: yPos + 0.1, w: 5.0, h: 0.5, fontSize: 12, color: "64748B", fontFace: "Calibri" });
      s.addText(val, { x: 8.0, y: yPos + 0.1, w: 3.0, h: 0.5, fontSize: 12, bold: true, color: isFinal ? "2563EB" : "0F172A", align: "right", fontFace: "Calibri" });
      yPos += 0.8;
    });
  }

  // --- SLIDE 7: How It Works ---
  {
    const s = pptx.addSlide();
    s.background = { color: "EFF6FF" };
    s.addText("INTEGRATION", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "2563EB", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Simple. One API call.", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    s.addShape(pptx.ShapeType.roundRect, { x: 1.0, y: 2.0, w: 11.3, h: 3.5, fill: { color: "1E293B" }, line: { color: "2563EB", width: 1 }, rectRadius: 0.12 });
    const code = `POST /api/vouchers/generate
{
  "booking_id": "BK12345",
  "traveler_email": "john@example.com",
  "total_ticket_price": 800,
  "number_of_travelers": 2,
  "departure_airport": "AMS"
}`;
    s.addText(code, { x: 1.5, y: 2.3, w: 10.3, h: 2.9, fontSize: 9, color: "E2E8F0", fontFace: "Courier New" });
    
    s.addText("That's it. DutyBoost creates the voucher, sends the email, and tracks redemptions.", { x: 1.0, y: 5.8, w: 11.3, h: 0.8, fontSize: 13, color: "0F172A", align: "center", fontFace: "Calibri", bold: true });
  }

  // --- SLIDE 8: Why DutyBoost ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("WHY DUTYBOOST", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "2563EB", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Built by travel partners, for travel partners", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const reasons = [
      { title: "Travel-native", desc: "Built by people who understand booking systems, commissions, and traveler behavior." },
      { title: "Merchant network", desc: "100+ airport retailers already connected. Your vouchers have guaranteed redemption." },
      { title: "Merchant-first", desc: "We don't take margin from your commission. 0.5% goes directly to you." },
      { title: "Real-time dashboard", desc: "See every voucher created, redeemed, and track exact commission earnings." },
    ];
    let yPos = 2.0;
    reasons.forEach(({ title, desc }) => {
      s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: yPos, w: 11.6, h: 0.95, fill: { color: "EFF6FF" }, line: { color: "2563EB", width: 1 }, rectRadius: 0.1 });
      s.addText(title, { x: 1.2, y: yPos + 0.1, w: 2.2, h: 0.35, fontSize: 11, bold: true, color: "2563EB", fontFace: "Calibri" });
      s.addText(desc, { x: 3.6, y: yPos + 0.1, w: 8.6, h: 0.75, fontSize: 10, color: "64748B", fontFace: "Calibri" });
      yPos += 1.1;
    });
  }

  // --- SLIDE 9: CTA ---
  {
    const s = pptx.addSlide();
    s.background = { color: "2563EB" };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.3, w: 4.0, h: 1.5, sizing: { type: "contain", w: 4.0, h: 1.5 } });
    s.addText("Turn your bookings into revenue", { x: 1, y: 2.2, w: 11.3, h: 1.0, fontSize: 38, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("Integrate DutyBoost today and start earning commission tomorrow.\nNo setup costs. No risk.", { x: 1.5, y: 3.4, w: 10.3, h: 1.0, fontSize: 15, color: "DBEAFE", align: "center", fontFace: "Calibri" });
    s.addText("rael@dutyboost.com", { x: 1, y: 4.8, w: 11.3, h: 0.5, fontSize: 16, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText(`© ${new Date().getFullYear()} DutyBoost`, { x: 1, y: 6.8, h: 0.4, w: 11.3, fontSize: 11, color: "DBEAFE", align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-For-Travel-Partners.pptx" });
}