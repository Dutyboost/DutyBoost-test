import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";

export async function exportSchipholPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";

  // --- SLIDE 1: Cover ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.4, w: 4.0, h: 1.5, sizing: { type: "contain", w: 4.0, h: 1.5 } });
    s.addShape(pptx.ShapeType.roundRect, { x: 4.0, y: 2.1, w: 5.3, h: 0.35, fill: { color: "EA580C" }, line: { color: "EA580C", width: 0 }, rectRadius: 0.05 });
    s.addText("Amsterdam Airport Schiphol (AMS)", { x: 1, y: 2.6, w: 11.3, h: 0.4, fontSize: 12, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 1 });
    s.addText("Increase Retail Revenue 40%+\nWith DutyBoost", { x: 1, y: 3.1, w: 11.3, h: 1.4, fontSize: 36, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("Turn Schiphol browsers into buyers.\nZero setup cost. Performance-based.", { x: 1.5, y: 4.8, w: 10.3, h: 0.8, fontSize: 14, color: "94A3B8", align: "center", fontFace: "Calibri" });
    s.addText("#3 busiest airport in Europe · 71.7M passengers · 196K daily", { x: 1, y: 6.2, w: 11.3, h: 0.35, fontSize: 10, color: "64748B", align: "center", fontFace: "Calibri" });
  }

  // --- SLIDE 2: Zoom into Schiphol ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 0.4, w: 12.3, h: 1.2, fill: { color: "1E293B" }, line: { color: "334155", width: 1 }, rectRadius: 0.12 });
    s.addText("NOW LET'S ZOOM INTO SCHIPHOL", { x: 0.8, y: 0.5, w: 11.7, h: 0.3, fontSize: 10, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Global trends are real — here's what the opportunity looks like at AMS specifically", { x: 0.8, y: 0.85, w: 11.7, h: 0.45, fontSize: 13, color: "CBD5E1", align: "center", fontFace: "Calibri" });

    const stats = [
      { num: "71.7M", label: "Passengers (2024)", sub: "Schiphol Annual Report 2024" },
      { num: "196K", label: "Avg passengers/day", sub: "Schiphol Passenger Stats" },
      { num: "€900M+", label: "Non-aero retail revenue", sub: "Schiphol Annual Report 2024" },
      { num: "58 min", label: "Avg dwell time (above EU avg)", sub: "ACI Europe Report 2024" },
    ];
    stats.forEach(({ num, label, sub }, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 1.9, w: 3.0, h: 3.5, fill: { color: "1E293B" }, line: { color: "EA580C", width: 1 }, rectRadius: 0.12 });
      s.addText(num, { x, y: 2.3, w: 3.0, h: 0.7, fontSize: 22, bold: true, color: "EA580C", align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.15, y: 3.15, w: 2.7, h: 0.6, fontSize: 10, bold: true, color: "E2E8F0", align: "center", fontFace: "Calibri" });
      s.addText(sub, { x: x + 0.1, y: 3.9, w: 2.8, h: 0.8, fontSize: 8, color: "64748B", align: "center", fontFace: "Calibri", italic: true });
    });
  }

  // --- SLIDE 3: Retail Profile ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addText("SCHIPHOL'S RETAIL PROFILE", { x: 1, y: 0.4, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "60A5FA", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("A premium traveler base — above-average spend, highly international", { x: 1, y: 0.85, w: 11.3, h: 0.6, fontSize: 26, bold: true, color: "F8FAFC", align: "center", fontFace: "Calibri" });

    const profile = [
      { num: "85%", label: "International passengers", desc: "Higher duty-free eligibility and willingness to spend foreign currency." },
      { num: "€68", label: "Avg spend per pax at AMS", desc: "Above EU airport avg of €55. Schiphol travelers are premium buyers." },
      { num: "#3", label: "Busiest airport in Europe", desc: "Behind LHR & CDG. 300+ destinations, massive international catchment." },
    ];
    profile.forEach(({ num, label, desc }, i) => {
      const x = 0.5 + i * 4.1;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 1.8, w: 3.9, h: 4.0, fill: { color: "1E3A5F" }, line: { color: "3B82F6", width: 1 }, rectRadius: 0.12 });
      s.addText(num, { x, y: 2.1, w: 3.9, h: 0.8, fontSize: 28, bold: true, color: "60A5FA", align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.15, y: 3.0, w: 3.6, h: 0.5, fontSize: 10, bold: true, color: "E2E8F0", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.15, y: 3.65, w: 3.6, h: 1.9, fontSize: 9, color: "94A3B8", align: "center", fontFace: "Calibri" });
    });
    s.addText("Sources: Schiphol Group Annual Report 2024 · ACI Europe Connectivity Report 2024", { x: 1, y: 6.4, w: 11.3, h: 0.35, fontSize: 8, color: "475569", align: "center", fontFace: "Calibri", italic: true });
  }

  // --- SLIDE 4: The Conversion Gap ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addText("THE SCHIPHOL CONVERSION GAP", { x: 1, y: 0.4, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "F87171", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("71.7M passengers — yet most walk past without buying", { x: 1, y: 0.85, w: 11.3, h: 0.6, fontSize: 26, bold: true, color: "F8FAFC", align: "center", fontFace: "Calibri" });

    const gaps = [
      { num: "~28%", label: "Current conversion rate", color: "F87171" },
      { num: "~55K", label: "Daily transactions missed", color: "FB923C" },
      { num: "€3.7M", label: "Daily untapped revenue at AMS", color: "FCD34D" },
    ];
    gaps.forEach(({ num, label, color }, i) => {
      const x = 0.6 + i * 4.1;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 1.8, w: 3.9, h: 2.5, fill: { color: "2D1515" }, line: { color: color, width: 1 }, rectRadius: 0.12 });
      s.addText(num, { x, y: 2.1, w: 3.9, h: 0.8, fontSize: 26, bold: true, color, align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.15, y: 3.0, w: 3.6, h: 0.6, fontSize: 9, color: "E2E8F0", align: "center", fontFace: "Calibri" });
    });

    s.addText("Why Schiphol travelers don't convert:", { x: 1.0, y: 4.6, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "E2E8F0", fontFace: "Calibri" });
    const reasons = [
      "Prices perceived as high vs. Amsterdam city centre",
      "Time pressure — KLM hub connections are often tight",
      "No loyalty incentive to spend at Schiphol specifically",
      "Transit passengers have no airport loyalty programme",
    ];
    reasons.forEach((r, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      s.addText(`• ${r}`, { x: 1.0 + col * 6.0, y: 5.1 + row * 0.5, w: 5.8, h: 0.4, fontSize: 9, color: "94A3B8", fontFace: "Calibri" });
    });
    s.addText("Sources: Forbes Airport Shoppers Study 2026 · ACI Europe Report 2024 · Schiphol Group 2024", { x: 1, y: 6.8, w: 11.3, h: 0.3, fontSize: 8, color: "475569", align: "center", italic: true, fontFace: "Calibri" });
  }

  // --- SLIDE 5: What DutyBoost Delivers ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addText("WHAT DUTYBOOST DELIVERS AT SCHIPHOL", { x: 1, y: 0.4, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "4ADE80", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Turning Schiphol footfall into real revenue", { x: 1, y: 0.85, w: 11.3, h: 0.6, fontSize: 26, bold: true, color: "F8FAFC", align: "center", fontFace: "Calibri" });

    const metrics = [
      { label: "Conversion Rate", before: "~28%", after: "40%+", lift: "+42%" },
      { label: "Avg Transaction", before: "€68", after: "€85+", lift: "+25%" },
      { label: "Daily Revenue / Store", before: "€4,760", after: "€6,800+", lift: "+43%" },
    ];
    metrics.forEach(({ label, before, after, lift }, i) => {
      const x = 0.5 + i * 4.1;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 1.8, w: 3.9, h: 3.5, fill: { color: "1A2E1A" }, line: { color: "4ADE80", width: 1 }, rectRadius: 0.12 });
      s.addText(label, { x, y: 2.0, w: 3.9, h: 0.35, fontSize: 9, color: "94A3B8", align: "center", fontFace: "Calibri" });
      s.addText(`Before: ${before}`, { x: x + 0.15, y: 2.5, w: 3.6, h: 0.4, fontSize: 10, color: "94A3B8", align: "center", fontFace: "Calibri" });
      s.addText(`After: ${after}`, { x: x + 0.15, y: 3.0, w: 3.6, h: 0.4, fontSize: 11, bold: true, color: "FB923C", align: "center", fontFace: "Calibri" });
      s.addText(lift, { x: x + 0.15, y: 3.55, w: 3.6, h: 0.5, fontSize: 20, bold: true, color: "4ADE80", align: "center", fontFace: "Calibri" });
    });

    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 5.55, w: 11.7, h: 0.9, fill: { color: "1A2E1A" }, line: { color: "4ADE80", width: 1 }, rectRadius: 0.1 });
    s.addText("Annual additional revenue — single Schiphol location:", { x: 1.2, y: 5.65, w: 7.0, h: 0.4, fontSize: 10, color: "E2E8F0", fontFace: "Calibri" });
    s.addText("~€292,000/year", { x: 8.5, y: 5.65, w: 3.7, h: 0.4, fontSize: 14, bold: true, color: "4ADE80", align: "right", fontFace: "Calibri" });
    s.addText("250 DutyBoost-enabled visitors/day · net of 2.5% fee", { x: 1.2, y: 6.1, w: 11.1, h: 0.25, fontSize: 8, color: "64748B", fontFace: "Calibri", italic: true });
  }

  // --- SLIDE 6: Traveler Mix ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addText("SCHIPHOL'S TRAVELER MIX", { x: 1, y: 0.4, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "FBBF24", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Why AMS travelers are a DutyBoost sweet spot", { x: 1, y: 0.85, w: 11.3, h: 0.6, fontSize: 26, bold: true, color: "F8FAFC", align: "center", fontFace: "Calibri" });

    const mix = [
      { num: "52%", label: "Business & frequent flyers", desc: "Spend 2.4x more than leisure travelers. DutyBoost's corporate tier is built for this segment." },
      { num: "40%", label: "Transfer passengers", desc: "More dwell time, fewer tasks. Most likely to browse — and with a DutyCredit, most likely to convert." },
      { num: "300+", label: "Destinations from AMS", desc: "Asia-Pacific, Americas, Middle East — all high duty-free spend profiles." },
      { num: "€87+", label: "Long-haul avg spend", desc: "Long-haul pax spend significantly more — aligning with DutyBoost's Lounge and VIP tiers." },
    ];
    mix.forEach(({ num, label, desc }, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.4 + col * 6.3;
      const y = 1.7 + row * 2.4;
      s.addShape(pptx.ShapeType.roundRect, { x, y, w: 6.0, h: 2.2, fill: { color: "2D2A10" }, line: { color: "FBBF24", width: 1 }, rectRadius: 0.1 });
      s.addText(num, { x, y: y + 0.15, w: 6.0, h: 0.7, fontSize: 22, bold: true, color: "FBBF24", align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.2, y: y + 0.85, w: 5.6, h: 0.35, fontSize: 10, bold: true, color: "E2E8F0", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: y + 1.25, w: 5.6, h: 0.8, fontSize: 8.5, color: "94A3B8", align: "center", fontFace: "Calibri" });
    });
    s.addText("Sources: Schiphol Group Annual Report 2024 · ACI Europe Report 2024", { x: 1, y: 6.7, w: 11.3, h: 0.3, fontSize: 8, color: "475569", align: "center", italic: true, fontFace: "Calibri" });
  }

  // --- SLIDE 7: Discount Tiers ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addText("DUTYCREDIT TIERS AT SCHIPHOL", { x: 1, y: 0.35, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Schiphol avg basket (€68+) means most redemptions are Priority–VIP", { x: 1, y: 0.8, w: 11.3, h: 0.55, fontSize: 22, bold: true, color: "F8FAFC", align: "center", fontFace: "Calibri" });

    const headers = [
      { label: "Tier", x: 0.8, w: 1.8 },
      { label: "Min. Basket", x: 2.8, w: 2.2 },
      { label: "Discount", x: 5.2, w: 1.8 },
      { label: "AMS Relevance", x: 7.2, w: 5.5 },
    ];
    headers.forEach(({ label, x, w }) => {
      s.addText(label, { x, y: 1.6, w, h: 0.35, fontSize: 9, bold: true, color: "CBD5E1", fontFace: "Calibri" });
    });

    const tiers = [
      { tier: "Boarding", basket: "€50–€99", discount: "€5–€10", relevance: "Transit & short-haul intra-EU travelers", highlight: false },
      { tier: "Priority ★", basket: "€100–€199", discount: "€15–€30", relevance: "Core Schiphol segment — most common basket range", highlight: true },
      { tier: "Lounge", basket: "€200–€299", discount: "€35–€45", relevance: "Business & long-haul travelers to/from AMS", highlight: false },
      { tier: "VIP", basket: "€300+", discount: "€60", relevance: "Asia-Pacific / Americas / Middle East high spenders", highlight: false },
    ];
    tiers.forEach(({ tier, basket, discount, relevance, highlight }, i) => {
      const y = 2.05 + i * 0.9;
      const bg = highlight ? "2D1E0A" : i % 2 === 0 ? "1A1F2E" : "141925";
      const borderColor = highlight ? "EA580C" : "334155";
      s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 0.8, fill: { color: bg }, line: { color: borderColor, width: highlight ? 1.5 : 0.5 }, rectRadius: 0.06 });
      s.addText(tier, { x: 0.8, y: y + 0.1, w: 1.8, h: 0.55, fontSize: 9, bold: true, color: highlight ? "EA580C" : "E2E8F0", fontFace: "Calibri" });
      s.addText(basket, { x: 2.8, y: y + 0.1, w: 2.2, h: 0.55, fontSize: 9, color: "94A3B8", fontFace: "Calibri" });
      s.addText(discount, { x: 5.2, y: y + 0.1, w: 1.8, h: 0.55, fontSize: 9, bold: true, color: "FB923C", fontFace: "Calibri" });
      s.addText(relevance, { x: 7.2, y: y + 0.1, w: 5.5, h: 0.55, fontSize: 8.5, color: "94A3B8", fontFace: "Calibri" });
    });
    s.addText("Source: TFWA Duty Free Spend Understanding Study 2024 · ACI Europe Commercial Revenue Data", { x: 1, y: 6.7, w: 11.3, h: 0.3, fontSize: 8, color: "475569", align: "center", italic: true, fontFace: "Calibri" });
  }

  // --- SLIDE 8: How It Works ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addText("HOW DUTYBOOST WORKS AT SCHIPHOL", { x: 1, y: 0.4, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("4 steps from Dutch booking to Schiphol sale", { x: 1, y: 0.85, w: 11.3, h: 0.6, fontSize: 26, bold: true, color: "F8FAFC", align: "center", fontFace: "Calibri" });

    const steps = [
      { num: "1", title: "Booked via Dutch Travel Partner", desc: "Dutch OTA, agency, or corporate booker confirms flight. DutyCredit issued automatically in confirmation email." },
      { num: "2", title: "Traveler Arrives at AMS", desc: "Voucher in email. Valid at all DutyBoost stores at Schiphol. No app required." },
      { num: "3", title: "Walks Into Your Store", desc: "Already motivated. Shows QR. Tiered discounts drive higher basket spend." },
      { num: "4", title: "You Earn More Revenue", desc: "Higher conversion, higher basket. Fee only on actual redemption." },
    ];
    let xPos = 0.35;
    steps.forEach(({ num, title, desc }, i) => {
      const w = 2.9;
      s.addShape(pptx.ShapeType.roundRect, { x: xPos, y: 1.9, w, h: 4.2, fill: { color: "1E293B" }, line: { color: "EA580C", width: 1 }, rectRadius: 0.12 });
      s.addShape(pptx.ShapeType.ellipse, { x: xPos + 1.15, y: 2.1, w: 0.6, h: 0.6, fill: { color: "EA580C" }, line: { color: "EA580C", width: 0 } });
      s.addText(num, { x: xPos + 1.15, y: 2.1, w: 0.6, h: 0.6, fontSize: 18, bold: true, color: "FFFFFF", align: "center", valign: "middle", fontFace: "Calibri" });
      s.addText(title, { x: xPos + 0.1, y: 2.85, w: w - 0.2, h: 0.7, fontSize: 10, bold: true, color: "F8FAFC", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: xPos + 0.15, y: 3.65, w: w - 0.3, h: 2.2, fontSize: 8.5, color: "94A3B8", align: "center", fontFace: "Calibri" });
      xPos += w + 0.15;
    });
  }

  // --- SLIDE 9: Why Schiphol ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addText("WHY DUTYBOOST IS BUILT FOR SCHIPHOL", { x: 1, y: 0.4, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "EA580C", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Built in the Netherlands. Starting at AMS.", { x: 1, y: 0.85, w: 11.3, h: 0.6, fontSize: 26, bold: true, color: "F8FAFC", align: "center", fontFace: "Calibri" });

    const reasons = [
      { title: "Dutch Travel Partner Network First", desc: "DutyBoost is founded in NL. First rollout targets Dutch OTAs and corporate bookers — your exact customer base." },
      { title: "Schiphol Traveler Profile Matches", desc: "International, high-spend, long-haul, business — the segments DutyBoost targets are the same segments Schiphol serves most." },
      { title: "Zero Operational Burden", desc: "One QR scan at checkout. No POS overhaul. Compatible with existing Schiphol retail setups." },
      { title: "Pre-Motivated Buyers", desc: "Travelers arrive at AMS already holding a DutyCredit — looking for your store, not browsing aimlessly." },
      { title: "Network Effect Compounds", desc: "Every new Dutch travel partner adds more AMS-bound customers with vouchers. Volume grows passively." },
      { title: "Real-Time Schiphol Analytics", desc: "See which travel partner sends customers to your AMS store — by day, time, and passenger segment." },
    ];
    let idx = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 2; col++) {
        if (idx < reasons.length) {
          const x = 0.4 + col * 6.3;
          const y = 1.7 + row * 1.7;
          const { title, desc } = reasons[idx];
          s.addShape(pptx.ShapeType.roundRect, { x, y, w: 6.0, h: 1.55, fill: { color: "1E293B" }, line: { color: "EA580C", width: 1 }, rectRadius: 0.1 });
          s.addText(`✓  ${title}`, { x: x + 0.2, y: y + 0.12, w: 5.6, h: 0.4, fontSize: 9.5, bold: true, color: "F97316", fontFace: "Calibri" });
          s.addText(desc, { x: x + 0.2, y: y + 0.55, w: 5.6, h: 0.85, fontSize: 8.5, color: "94A3B8", fontFace: "Calibri" });
          idx++;
        }
      }
    }
  }

  // --- SLIDE 10: CTA ---
  {
    const s = pptx.addSlide();
    s.background = { color: "0F172A" };
    s.addShape(pptx.ShapeType.roundRect, { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: "1A0A00" }, line: { color: "EA580C", width: 3 }, rectRadius: 0 });
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.3, w: 4.0, h: 1.5, sizing: { type: "contain", w: 4.0, h: 1.5 } });
    s.addText("Amsterdam Airport Schiphol · AMS", { x: 1, y: 2.0, w: 11.3, h: 0.35, fontSize: 11, color: "EA580C", bold: true, align: "center", fontFace: "Calibri" });
    s.addText("Ready to unlock Schiphol's\nfull revenue potential?", { x: 1, y: 2.45, w: 11.3, h: 1.3, fontSize: 34, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText("~€292,000 additional revenue per location/year · Zero setup cost · Join the first AMS retailers", { x: 1.5, y: 3.9, w: 10.3, h: 0.6, fontSize: 13, color: "94A3B8", align: "center", fontFace: "Calibri" });
    s.addText("hello@dutyboost.com", { x: 1, y: 5.0, w: 11.3, h: 0.5, fontSize: 16, bold: true, color: "EA580C", align: "center", fontFace: "Calibri" });
    s.addText("www.dutyboost.com", { x: 1, y: 5.6, w: 11.3, h: 0.35, fontSize: 12, color: "94A3B8", align: "center", fontFace: "Calibri" });
    s.addText(`© ${new Date().getFullYear()} DutyBoost B.V. — Amsterdam, Netherlands`, { x: 1, y: 6.8, w: 11.3, h: 0.3, fontSize: 9, color: "475569", align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-Schiphol-AMS-Retailers.pptx" });
}