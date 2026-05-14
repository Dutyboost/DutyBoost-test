import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";

export async function exportAirportRetailerPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

  // --- SLIDE 1: Cover ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFF7ED" };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.5, w: 4.0, h: 1.5, sizing: { type: "contain", w: 4.0, h: 1.5 } });
    s.addShape(pptx.ShapeType.line, { x: 5.3, y: 2.2, w: 2.8, h: 0, line: { color: "EA580C", width: 2 } });
    s.addText("Convert Browsers\nInto Buyers", { x: 2.5, y: 2.5, w: 8.3, h: 1.8, fontSize: 36, bold: true, color: "0F172A", align: "center", fontFace: "Calibri", breakLine: false });
    s.addText("Zero upfront cost. Only pay when a traveler spends.\nDutyBoost for Airport Retailers.", { x: 1.5, y: 4.5, w: 10.3, h: 0.9, fontSize: 16, color: "64748B", align: "center", fontFace: "Calibri" });
  }

  // --- SLIDE 2: Market Opportunity ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("THE GLOBAL OPPORTUNITY", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("€95.76B market. Growing 9.8% annually.\n53% of airports upgrading retail by 2026.", { x: 1, y: 1.0, w: 11.3, h: 1.2, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const metrics = [
      { num: "€780B", label: "Projected market by 2027" },
      { num: "+53%", label: "Airports upgrading retail areas" },
      { num: "47 deals", label: "New retail concessions (2024)" },
    ];
    metrics.forEach(({ num, label }, i) => {
      const x = 0.8 + i * 3.9;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 3.0, w: 3.6, h: 2.8, fill: { color: "FFF7ED" }, line: { color: "EA580C", width: 1 }, rectRadius: 0.15 });
      s.addText(num, { x, y: 3.4, w: 3.6, h: 0.8, fontSize: 24, bold: true, color: "EA580C", align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.2, y: 4.4, w: 3.2, h: 1.0, fontSize: 11, color: "64748B", align: "center", fontFace: "Calibri" });
    });
  }

  // --- SLIDE 3: The Challenge ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFF7ED" };
    s.addText("YOUR CHALLENGE", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Thousands walk by daily.\nMost don't stop.", { x: 1, y: 1.0, w: 11.3, h: 1.0, fontSize: 32, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const challenges = [
      { title: "Foot traffic\nisn't converting", desc: "Browsers outnumber buyers. You need tools to influence purchase decisions." },
      { title: "Price-conscious\ntravelers", desc: "Rising airfares squeeze discretionary spending. Travelers want value." },
      { title: "High acquisition\ncost", desc: "Promotions & loyalty programs cost upfront with no guarantee of return." },
    ];
    challenges.forEach(({ title, desc }, i) => {
      const x = 0.8 + i * 4.0;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 2.8, w: 3.6, h: 3.5, fill: { color: "FFFFFF" }, line: { color: "EA580C", width: 2 }, rectRadius: 0.15 });
      s.addText(title, { x: x + 0.2, y: 3.0, w: 3.2, h: 1.0, fontSize: 12, bold: true, color: "EA580C", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: 4.2, w: 3.2, h: 1.8, fontSize: 11, color: "64748B", align: "center", fontFace: "Calibri" });
    });
  }

  // --- SLIDE 4: DutyBoost Solution ---
  {
    const s = pptx.addSlide();
    s.background = { color: "EA580C" };
    s.addText("THE DUTYBOOST SOLUTION", { x: 1, y: 0.5, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "FFE4D6", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Pre-qualified buyers.\nZero upfront cost.", { x: 1, y: 1.1, w: 11.3, h: 1.2, fontSize: 32, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("Travelers receive personalized vouchers before departure. They arrive at your store motivated to spend.\nYou only pay when revenue is generated.", { x: 1.5, y: 2.5, w: 10.3, h: 1.2, fontSize: 14, color: "FFE4D6", align: "center", fontFace: "Calibri" });
    
    const steps = [
      "Travel agency\nconfirms booking",
      "Traveler gets\nvoucher",
      "Arrives at your\nstore + motivated",
      "Scans QR &\nbuys",
      "You earn.",
      "DutyBoost\ntakes small fee"
    ];
    let xPos = 0.3;
    steps.forEach((step, i) => {
      const w = 2.0;
      s.addShape(pptx.ShapeType.roundRect, { x: xPos, y: 4.0, w, h: 2.4, fill: { color: i === 3 ? "F97316" : "FFFFFF" }, line: { color: "FFFFFF44", width: 1 }, rectRadius: 0.1 });
      s.addText(step, { x: xPos + 0.1, y: 4.4, w: w - 0.2, h: 1.6, fontSize: 10, bold: true, color: i === 3 ? "FFFFFF" : "EA580C", align: "center", fontFace: "Calibri" });
      xPos += w + 0.08;
    });
  }

  // --- SLIDE 5: Your Advantages ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("YOUR ADVANTAGES", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Why retailers choose DutyBoost", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const benefits = [
      { title: "Pre-qualified\nbuyers", desc: "Vouchers = intent.\nTravelers arrive motivated." },
      { title: "Pure\nperformance", desc: "Zero cost. Only pay\nwhen revenue is made." },
      { title: "Real-time\nanalytics", desc: "Track redemptions &\nrevenue attribution." },
      { title: "No POS\noverhaul", desc: "Simple QR scan.\nWorks with existing tills." },
    ];
    benefits.forEach(({ title, desc }, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.5 + col * 6.2;
      const y = 2.0 + row * 2.4;
      s.addShape(pptx.ShapeType.roundRect, { x, y, w: 6.0, h: 2.2, fill: { color: "FFF7ED" }, line: { color: "EA580C", width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x: x + 0.2, y: y + 0.3, w: 5.6, h: 0.8, fontSize: 13, bold: true, color: "EA580C", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: y + 1.15, w: 5.6, h: 0.8, fontSize: 11, color: "64748B", align: "center", fontFace: "Calibri" });
    });
  }

  // --- SLIDE 6: Revenue Example ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("REVENUE EXAMPLE", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("50 redemptions per week", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    s.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 2.0, w: 6.0, h: 3.2, fill: { color: "FFF7ED" }, line: { color: "EA580C", width: 1 }, rectRadius: 0.15 });
    s.addText("Per Redemption:", { x: 0.8, y: 2.3, w: 5.4, h: 0.4, fontSize: 12, bold: true, color: "EA580C", fontFace: "Calibri" });
    [
      { label: "Avg basket spend", val: "€250" },
      { label: "Avg discount", val: "€30" },
      { label: "Net sales", val: "€220" },
    ].forEach(({ label, val }, i) => {
      s.addText(label, { x: 1.0, y: 2.9 + i * 0.5, w: 3.8, h: 0.4, fontSize: 11, color: "64748B", fontFace: "Calibri" });
      s.addText(val, { x: 4.0, y: 2.9 + i * 0.5, w: 1.5, h: 0.4, fontSize: 11, bold: true, color: "0F172A", fontFace: "Calibri", align: "right" });
    });

    s.addShape(pptx.ShapeType.roundRect, { x: 6.8, y: 2.0, w: 6.0, h: 3.2, fill: { color: "EA580C" }, line: { color: "EA580C", width: 0 }, rectRadius: 0.15 });
    s.addText("Monthly (4 weeks):", { x: 7.1, y: 2.3, w: 5.4, h: 0.4, fontSize: 12, bold: true, color: "FFFFFF", fontFace: "Calibri" });
    [
      { label: "Redemptions", val: "200" },
      { label: "Incremental revenue", val: "€44,000" },
      { label: "Your net gain", val: "€42,000" },
    ].forEach(({ label, val }, i) => {
      s.addText(label, { x: 7.3, y: 2.9 + i * 0.5, w: 3.8, h: 0.4, fontSize: 11, color: "FFE4D6", fontFace: "Calibri" });
      s.addText(val, { x: 10.2, y: 2.9 + i * 0.5, w: 1.7, h: 0.4, fontSize: 11, bold: true, color: "FFFFFF", fontFace: "Calibri", align: "right" });
    });
  }

  // --- SLIDE 7: Pricing ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFF7ED" };
    s.addText("OUR PRICING", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Performance-based. Merchant-first.", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    s.addShape(pptx.ShapeType.roundRect, { x: 1.5, y: 2.1, w: 10.3, h: 0.6, fill: { color: "FFFFFF" }, line: { color: "EA580C", width: 2 }, rectRadius: 0.1 });
    s.addText("Platform fee: 2.5% of net sales (capped at €25 on baskets up to €1,000)", { x: 1.8, y: 2.2, w: 9.7, h: 0.4, fontSize: 13, bold: true, color: "EA580C", fontFace: "Calibri" });
    
    s.addText("All basket value above €1,000 goes entirely to you — no platform fee.", { x: 1.5, y: 3.0, w: 10.3, h: 0.8, fontSize: 14, bold: true, color: "0F172A", fontFace: "Calibri" });
    
    const examples = [
      { basket: "€100", net: "€85", fee: "€2.13", your: "€82.87" },
      { basket: "€300", net: "€240", fee: "€6.00", your: "€234.00" },
      { basket: "€1,500", net: "€1,440", fee: "€0*", your: "€1,440.00" },
    ];
    let yPos = 4.0;
    examples.forEach(({ basket, net, fee, your }, i) => {
      const bg = i === 0 ? "FFFFFF" : i === 1 ? "FFFFFF" : "E8C2A3";
      s.addShape(pptx.ShapeType.roundRect, { x: 1.5, y: yPos, w: 10.3, h: 0.5, fill: { color: bg }, line: { color: "EA580C", width: 0.5 }, rectRadius: 0.05 });
      s.addText(basket, { x: 1.7, y: yPos + 0.05, w: 2.0, h: 0.4, fontSize: 10, color: "0F172A", fontFace: "Calibri" });
      s.addText(net, { x: 3.9, y: yPos + 0.05, w: 2.0, h: 0.4, fontSize: 10, color: "0F172A", fontFace: "Calibri" });
      s.addText(fee, { x: 6.1, y: yPos + 0.05, w: 2.0, h: 0.4, fontSize: 10, color: i === 2 ? "EA580C" : "0F172A", bold: i === 2, fontFace: "Calibri" });
      s.addText(your, { x: 8.3, y: yPos + 0.05, w: 3.0, h: 0.4, fontSize: 10, bold: true, color: "EA580C", fontFace: "Calibri", align: "right" });
      yPos += 0.55;
    });
    s.addText("* On baskets >€1,000, all revenue above €1k is yours 100%", { x: 1.5, y: 6.0, w: 10.3, h: 0.4, fontSize: 9, color: "64748B", italic: true, fontFace: "Calibri" });
  }

  // --- SLIDE 8: Why DutyBoost ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("WHY DUTYBOOST", { x: 1, y: 0.4, w: 11.3, h: 0.4, fontSize: 11, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("We built this for airport retailers", { x: 1, y: 0.95, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const reasons = [
      { title: "Built for airports", desc: "We understand duty-free, travel retail, and terminal ops. Every feature is for your world." },
      { title: "Travel partner ecosystem", desc: "100+ integrated agencies sending targeted travelers to your store daily." },
      { title: "Merchant-first pricing", desc: "We profit only when you do. No fixed costs. Pure performance model." },
      { title: "Simple integration", desc: "QR scan at checkout. Works with your existing POS. Go live in hours." },
    ];
    let yPos = 2.0;
    reasons.forEach(({ title, desc }) => {
      s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: yPos, w: 11.6, h: 0.95, fill: { color: "FFF7ED" }, line: { color: "EA580C", width: 1 }, rectRadius: 0.1 });
      s.addText(title, { x: 1.2, y: yPos + 0.1, w: 2.5, h: 0.35, fontSize: 11, bold: true, color: "EA580C", fontFace: "Calibri" });
      s.addText(desc, { x: 3.9, y: yPos + 0.1, w: 8.3, h: 0.75, fontSize: 10, color: "64748B", fontFace: "Calibri" });
      yPos += 1.1;
    });
  }

  // --- SLIDE 9: CTA ---
  {
    const s = pptx.addSlide();
    s.background = { color: "EA580C" };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.3, w: 4.0, h: 1.5, sizing: { type: "contain", w: 4.0, h: 1.5 } });
    s.addText("Ready to boost your retail?", { x: 1, y: 2.2, w: 11.3, h: 1.0, fontSize: 38, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("Connect with our team to discuss integration, see a live demo,\nand start converting voucher traffic into revenue.", { x: 1.5, y: 3.4, w: 10.3, h: 1.0, fontSize: 15, color: "FFE4D6", align: "center", fontFace: "Calibri" });
    s.addText("rael@dutyboost.com", { x: 1, y: 4.8, w: 11.3, h: 0.5, fontSize: 16, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText(`© ${new Date().getFullYear()} DutyBoost`, { x: 1, y: 6.8, w: 11.3, h: 0.4, fontSize: 11, color: "FFE4D6", align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-For-Airport-Retailers.pptx" });
}