import pptxgen from "pptxgenjs";

// PNG logo (SVG renders unreliably in pptxgenjs)
const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";

const DARK = "0A0F1E";
const BLUE = "3B82F6";
const INDIGO = "6366F1";
const VIOLET = "8B5CF6";
const PURPLE = "A855F7";
const ORANGE = "F97316";
const GREEN = "22C55E";
const YELLOW = "EAB308";
const RED = "EF4444";
const SLATE = "64748B";
const WHITE = "FFFFFF";
const PANEL = "1E293B";
const PANEL_BORDER = "334155";

const AVOLTA_URL = "https://www.avoltaworld.com/sites/default/files/document/2026-05/Avolta_Q1%202026%20Presentation.pdf?utm_source=chatgpt.com";

function lightSlide(s) {
  s.background = { color: WHITE };
}

export async function exportInvestorPitchPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  pptx.author = "DutyBoost";
  pptx.title = "DutyBoost — Investor Pitch Deck 2026";

  // ============ SLIDE 1: COVER ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addImage({ path: LOGO_URL, x: 4.65, y: 1.1, w: 4.0, h: 1.2, sizing: { type: "contain", w: 4.0, h: 1.2 } });
    s.addText("The Circular Commercial Revenue", { x: 0.8, y: 2.6, w: 11.7, h: 0.7, fontSize: 30, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
    s.addText("Infrastructure for Global Travel", { x: 0.8, y: 3.25, w: 11.7, h: 0.7, fontSize: 30, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
    s.addText("Pre-Revenue / Pre-Seed Investment Opportunity", { x: 0.8, y: 4.1, w: 11.7, h: 0.5, fontSize: 16, color: SLATE, align: "center", fontFace: "Calibri" });
    const coverStats = [
      { val: "€37.1B", lbl: "Market" },
      { val: "€200K", lbl: "Seed Ask" },
      { val: "€22.05M", lbl: "Y5 Revenue" },
    ];
    coverStats.forEach(({ val, lbl }, i) => {
      const x = 1.8 + i * 3.3;
      s.addText(val, { x, y: 4.9, w: 3.0, h: 0.6, fontSize: 26, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(lbl, { x, y: 5.45, w: 3.0, h: 0.4, fontSize: 12, color: SLATE, align: "center", fontFace: "Calibri" });
    });
    s.addText("CONFIDENTIAL — 2026  |  Chamber of Commerce: 42053181  |  VAT: NL869492068B01", { x: 1.5, y: 6.4, w: 10.3, h: 0.4, fontSize: 10, color: SLATE, align: "center", fontFace: "Calibri" });
  }

  // ============ SLIDE 2: PROBLEM ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addText("THE PROBLEM", { x: 0.8, y: 0.4, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "left", fontFace: "Calibri", charSpacing: 3 });
    s.addText("73% of Airport Passengers", { x: 0.8, y: 0.85, w: 11.7, h: 0.7, fontSize: 28, bold: true, color: DARK, align: "left", fontFace: "Calibri" });
    s.addText("Never Make a Purchase", { x: 0.8, y: 1.45, w: 11.7, h: 0.7, fontSize: 28, bold: true, color: BLUE, align: "left", fontFace: "Calibri" });

    const leftStats = [
      { val: "9.8B", title: "Global passenger movements in 2025", sub: "+3.6% vs 2024 | +7.3% vs 2019 (ACI World)", color: BLUE },
      { val: "27%", title: "Avolta penetration benchmark", sub: "682M purchases from 2.5B passenger exposure", color: ORANGE, isLink: true },
      { val: "1.82B", title: "Non-purchasing passenger exposures", sub: "Within Avolta's benchmark alone", color: RED },
    ];
    leftStats.forEach((st, i) => {
      const y = 2.4 + i * 1.55;
      s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y, w: 5.6, h: 1.4, fill: { color: PANEL }, line: { color: PANEL_BORDER, width: 1 }, rectRadius: 0.12 });
      s.addText(st.val, { x: 1.0, y: y + 0.1, w: 5.2, h: 0.55, fontSize: 28, bold: true, color: st.color, align: "left", fontFace: "Calibri" });
      if (st.isLink) {
        s.addText([
          { text: "Avolta penetration benchmark", options: { fontSize: 13, bold: true, color: "93C5FD", fontFace: "Calibri", hyperlink: { url: AVOLTA_URL, tooltip: "Avolta Q1 2026 Presentation" } } },
          { text: "  (See slide 7 for more details)", options: { fontSize: 11, color: "94A3B8", fontFace: "Calibri" } },
        ], { x: 1.0, y: y + 0.72, w: 5.2, h: 0.55, align: "left", valign: "middle" });
      } else {
        s.addText(st.title, { x: 1.0, y: y + 0.72, w: 5.2, h: 0.32, fontSize: 13, bold: true, color: WHITE, align: "left", fontFace: "Calibri" });
        s.addText(st.sub, { x: 1.0, y: y + 1.04, w: 5.2, h: 0.3, fontSize: 11, color: "94A3B8", align: "left", fontFace: "Calibri" });
      }
    });

    const failures = [
      "Activation starts only after the traveller clears security",
      "Retailers compete for attention through impulse purchasing",
      "Travel & Corporate Partners hold the early relationship — but get zero retail participation",
      "No financial reason for a non-intending buyer to enter a store",
      "73% of passengers walk straight to the gate",
    ];
    s.addShape(pptx.ShapeType.roundRect, { x: 6.7, y: 2.4, w: 5.8, h: 2.95, fill: { color: PANEL }, line: { color: PANEL_BORDER, width: 1 }, rectRadius: 0.12 });
    s.addText("Traditional Airport Retail Failure Points", { x: 6.9, y: 2.55, w: 5.4, h: 0.4, fontSize: 14, bold: true, color: WHITE, align: "left", fontFace: "Calibri" });
    failures.forEach((f, i) => {
      s.addText("•", { x: 6.9, y: 3.0 + i * 0.45, w: 0.3, h: 0.35, fontSize: 12, color: RED, align: "left", fontFace: "Calibri" });
      s.addText(f, { x: 7.2, y: 3.0 + i * 0.45, w: 5.1, h: 0.35, fontSize: 10.5, color: "CBD5E1", align: "left", fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pptx.ShapeType.roundRect, { x: 6.7, y: 5.5, w: 5.8, h: 1.4, fill: { color: "1E3A8A" }, line: { color: BLUE, width: 1 }, rectRadius: 0.12 });
    s.addText("\"Large passenger flows do not automatically become retail customers. The 73% represents conversion headroom — not a permanent ceiling.\"", { x: 6.9, y: 5.6, w: 5.4, h: 1.2, fontSize: 11, italic: true, color: "BFDBFE", align: "left", fontFace: "Calibri", valign: "middle" });
  }

  // ============ SLIDE 3: SOLUTION ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addText("THE SOLUTION", { x: 0.8, y: 0.4, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "left", fontFace: "Calibri", charSpacing: 3 });
    s.addText("Activate the Traveller", { x: 0.8, y: 0.85, w: 11.7, h: 0.7, fontSize: 28, bold: true, color: DARK, align: "left", fontFace: "Calibri" });
    s.addText("Before Airport Arrival", { x: 0.8, y: 1.45, w: 11.7, h: 0.7, fontSize: 28, bold: true, color: BLUE, align: "left", fontFace: "Calibri" });

    const channels = [
      { title: "Flight Booking", desc: "DutyCredit distributed with airline confirmation", color: "60A5FA" },
      { title: "Hotel / OTA", desc: "DutyCredit distributed with booking confirmation", color: VIOLET },
      { title: "Car Rental", desc: "DutyCredit distributed with rental confirmation", color: GREEN },
      { title: "Corporate Travel", desc: "DutyCredit embedded in T&E and corporate booking flows", color: YELLOW },
    ];
    channels.forEach((c, i) => {
      const x = 0.8 + i * 3.05;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 2.35, w: 2.85, h: 1.9, fill: { color: PANEL }, line: { color: PANEL_BORDER, width: 1 }, rectRadius: 0.12 });
      s.addText(c.title, { x, y: 2.6, w: 2.85, h: 0.5, fontSize: 14, bold: true, color: c.color, align: "center", fontFace: "Calibri" });
      s.addText(c.desc, { x: x + 0.2, y: 3.2, w: 2.45, h: 0.9, fontSize: 11, color: "94A3B8", align: "center", fontFace: "Calibri", valign: "top" });
    });

    const steps = [
      "Partners distribute DutyCredit",
      "Traveller activates benefit",
      "Arrives with purchase intent",
      "Visits participating retailer",
      "Spends €100 → Saves €10",
      "POS validates transaction",
      "All participants earn",
    ];
    const stepW = 1.62;
    steps.forEach((step, i) => {
      const x = 0.8 + i * (stepW + 0.07);
      s.addShape(pptx.ShapeType.roundRect, { x, y: 4.5, w: stepW, h: 1.1, fill: { color: "1E3A8A" }, line: { color: BLUE, width: 1 }, rectRadius: 0.1 });
      s.addText(`Step ${i + 1}`, { x, y: 4.58, w: stepW, h: 0.3, fontSize: 9, bold: true, color: "60A5FA", align: "center", fontFace: "Calibri" });
      s.addText(step, { x: x + 0.08, y: 4.88, w: stepW - 0.16, h: 0.65, fontSize: 9.5, color: WHITE, align: "center", fontFace: "Calibri", valign: "top" });
    });

    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 5.8, w: 11.7, h: 1.2, fill: { color: "1E3A8A" }, line: { color: BLUE, width: 1 }, rectRadius: 0.12 });
    const solStats = [
      { val: "€1 – €60", lbl: "DutyCredit direct traveller value" },
      { val: "Performance-Based", lbl: "Zero upfront cost to any partner" },
      { val: "Participants", lbl: "All benefit from one transaction" },
    ];
    solStats.forEach((st, i) => {
      const x = 0.8 + i * 3.9;
      s.addText(st.val, { x, y: 5.9, w: 3.9, h: 0.5, fontSize: 18, bold: true, color: "60A5FA", align: "center", fontFace: "Calibri" });
      s.addText(st.lbl, { x, y: 6.4, w: 3.9, h: 0.5, fontSize: 11, color: "CBD5E1", align: "center", fontFace: "Calibri" });
    });
  }

  // ============ SLIDE 4: MARKET ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addText("MARKET OPPORTUNITY", { x: 0.8, y: 0.4, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "left", fontFace: "Calibri", charSpacing: 3 });
    s.addText("A €37.1 Billion Market — Already Exists", { x: 0.8, y: 0.85, w: 11.7, h: 0.7, fontSize: 26, bold: true, color: DARK, align: "left", fontFace: "Calibri" });
    s.addText("DutyBoost doesn't need to create the market. It connects what already exists.", { x: 0.8, y: 1.55, w: 11.7, h: 0.4, fontSize: 13, color: SLATE, align: "left", fontFace: "Calibri" });

    const markets = [
      { val: "€65.5B", lbl: "Worldwide DF&TR Industry", sub: "TFWA 2025 reference (€1 = US$1.13)", color: BLUE },
      { val: "€37.1B", lbl: "Airport DF&TR Market", sub: "56.6% airport-channel share (DutyBoost estimate)", color: INDIGO },
      { val: "€10.13B", lbl: "European Airport DF&TR", sub: "+5.5% value growth | +5.8% passenger growth (ETRC)", color: VIOLET },
    ];
    markets.forEach((m, i) => {
      const x = 0.8 + i * 3.95;
      const bg = i === 0 ? "EFF6FF" : i === 1 ? "EEF2FF" : "F5F3FF";
      s.addShape(pptx.ShapeType.roundRect, { x, y: 2.1, w: 3.7, h: 1.9, fill: { color: bg }, line: { color: m.color, width: 1 }, rectRadius: 0.12 });
      s.addText(m.val, { x, y: 2.25, w: 3.7, h: 0.7, fontSize: 24, bold: true, color: m.color, align: "center", fontFace: "Calibri" });
      s.addText(m.lbl, { x, y: 2.95, w: 3.7, h: 0.4, fontSize: 12, bold: true, color: "334155", align: "center", fontFace: "Calibri" });
      s.addText(m.sub, { x: x + 0.2, y: 3.35, w: 3.3, h: 0.55, fontSize: 10, color: SLATE, align: "center", fontFace: "Calibri" });
    });

    // Categories
    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 4.2, w: 5.85, h: 2.8, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 }, rectRadius: 0.12 });
    s.addText("Major DF&TR Categories (H1 2025)", { x: 1.0, y: 4.3, w: 5.45, h: 0.4, fontSize: 13, bold: true, color: "334155", align: "left", fontFace: "Calibri" });
    const cats = [
      { cat: "Fragrances & Cosmetics", val: "€5.74B", pct: 100 },
      { cat: "Wines & Spirits", val: "€3.27B", pct: 57 },
      { cat: "Fashion & Accessories", val: "€2.49B", pct: 43 },
      { cat: "Tobacco", val: "€2.11B", pct: 37 },
    ];
    cats.forEach((row, i) => {
      const y = 4.8 + i * 0.5;
      s.addText(row.cat, { x: 1.0, y, w: 2.4, h: 0.35, fontSize: 10, color: "475569", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addShape(pptx.ShapeType.roundRect, { x: 3.45, y: y + 0.08, w: 2.4, h: 0.2, fill: { color: "E2E8F0" }, line: { color: "E2E8F0" }, rectRadius: 0.05 });
      s.addShape(pptx.ShapeType.roundRect, { x: 3.45, y: y + 0.08, w: 2.4 * (row.pct / 100), h: 0.2, fill: { color: BLUE }, line: { color: BLUE }, rectRadius: 0.05 });
      s.addText(row.val, { x: 5.85, y, w: 0.7, h: 0.35, fontSize: 10, bold: true, color: "334155", align: "right", fontFace: "Calibri", valign: "middle" });
    });

    // Right column
    s.addShape(pptx.ShapeType.roundRect, { x: 6.85, y: 4.2, w: 5.65, h: 2.8, fill: { color: "FFFBEB" }, line: { color: "FDE68A", width: 1 }, rectRadius: 0.12 });
    s.addText("DutyBoost doesn't need to create:", { x: 7.05, y: 4.3, w: 5.25, h: 0.4, fontSize: 13, bold: true, color: "334155", align: "left", fontFace: "Calibri" });
    const exists = [
      "Airports — they already exist",
      "Passenger traffic — 9.8B annual movements",
      "Airport Retailers — they already operate stores",
      "Travel & Corporate Partners — they already communicate with travellers",
      "Enterprise POS — already processes transactions",
    ];
    exists.forEach((item, i) => {
      s.addText("✓", { x: 7.05, y: 4.8 + i * 0.4, w: 0.3, h: 0.35, fontSize: 11, bold: true, color: GREEN, align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(item, { x: 7.35, y: 4.8 + i * 0.4, w: 5.0, h: 0.35, fontSize: 10.5, color: "475569", align: "left", fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pptx.ShapeType.roundRect, { x: 7.05, y: 6.5, w: 5.25, h: 0.4, fill: { color: "DCFCE7" }, line: { color: "86EFAC" }, rectRadius: 0.08 });
    s.addText("DutyBoost's role: Connect the value between existing participants.", { x: 7.15, y: 6.52, w: 5.05, h: 0.36, fontSize: 10, bold: true, color: "166534", align: "center", fontFace: "Calibri", valign: "middle" });
  }

  // ============ SLIDE 5: CONVERSION ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addText("CONVERSION OPPORTUNITY", { x: 0.8, y: 0.4, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "left", fontFace: "Calibri", charSpacing: 3 });
    s.addText("Small Conversion Gains = Enormous Value at Scale", { x: 0.8, y: 0.85, w: 11.7, h: 0.7, fontSize: 24, bold: true, color: DARK, align: "left", fontFace: "Calibri" });

    // 73/27 card
    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.8, w: 5.85, h: 1.55, fill: { color: "FEF2F2" }, line: { color: "FECACA", width: 1 }, rectRadius: 0.12 });
    s.addText("73%", { x: 1.0, y: 1.95, w: 2.5, h: 0.7, fontSize: 30, bold: true, color: RED, align: "left", fontFace: "Calibri" });
    s.addText("Non-purchase exposure (Avolta benchmark)", { x: 1.0, y: 2.6, w: 2.8, h: 0.35, fontSize: 11, bold: true, color: "475569", align: "left", fontFace: "Calibri" });
    s.addText("= 1.82 billion unreached travellers", { x: 1.0, y: 2.92, w: 2.8, h: 0.3, fontSize: 10, color: SLATE, align: "left", fontFace: "Calibri" });
    s.addText("27%", { x: 3.8, y: 1.95, w: 2.6, h: 0.7, fontSize: 30, bold: true, color: GREEN, align: "right", fontFace: "Calibri" });
    s.addText("Currently converting", { x: 3.6, y: 2.6, w: 2.9, h: 0.35, fontSize: 11, bold: true, color: "475569", align: "right", fontFace: "Calibri" });
    s.addShape(pptx.ShapeType.line, { x: 1.0, y: 3.1, w: 5.45, h: 0, line: { color: "FECACA", width: 1 } });
    s.addText([
      { text: "Avolta penetration benchmark", options: { fontSize: 11, bold: true, color: BLUE, fontFace: "Calibri", hyperlink: { url: AVOLTA_URL, tooltip: "Avolta Q1 2026 Presentation" } } },
      { text: "  (See slide 7 for more details)", options: { fontSize: 10, color: SLATE, fontFace: "Calibri" } },
    ], { x: 1.0, y: 3.13, w: 5.45, h: 0.3, align: "left", valign: "middle" });

    // Conversion table
    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 3.5, w: 5.85, h: 3.5, fill: { color: "EFF6FF" }, line: { color: "BFDBFE", width: 1 }, rectRadius: 0.12 });
    s.addText("At 180M travellers reached (Year 5):", { x: 1.0, y: 3.6, w: 5.45, h: 0.4, fontSize: 13, bold: true, color: "1E3A8A", align: "left", fontFace: "Calibri" });
    const headers = ["Conversion", "Transactions", "Retail Value", "DB Revenue"];
    headers.forEach((h, i) => {
      const x = 1.0 + i * 1.38;
      s.addText(h, { x, y: 4.05, w: 1.32, h: 0.3, fontSize: 9, color: SLATE, align: i === 3 ? "right" : "left", fontFace: "Calibri" });
    });
    const rows = [
      { conv: "+0.5 pp", txns: "900K", retail: "€90M", db: "€1.575M", hl: false },
      { conv: "+1 pp", txns: "1.8M", retail: "€180M", db: "€3.15M", hl: true },
      { conv: "+2 pp", txns: "3.6M", retail: "€360M", db: "€6.30M", hl: false },
      { conv: "+5 pp", txns: "9.0M", retail: "€900M", db: "€15.75M", hl: false },
    ];
    rows.forEach((row, i) => {
      const y = 4.4 + i * 0.55;
      if (row.hl) s.addShape(pptx.ShapeType.roundRect, { x: 0.95, y: y - 0.05, w: 5.55, h: 0.5, fill: { color: "BFDBFE" }, line: { color: "BFDBFE" }, rectRadius: 0.05 });
      s.addText(row.conv, { x: 1.0, y, w: 1.35, h: 0.4, fontSize: 11, bold: row.hl, color: "1D4ED8", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(`${row.txns} txns`, { x: 2.38, y, w: 1.35, h: 0.4, fontSize: 11, bold: row.hl, color: "475569", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(row.retail, { x: 3.76, y, w: 1.35, h: 0.4, fontSize: 11, bold: row.hl, color: "475569", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(row.db, { x: 5.14, y, w: 1.36, h: 0.4, fontSize: 11, bold: true, color: "166534", align: "right", fontFace: "Calibri", valign: "middle" });
    });

    // Proposition
    s.addShape(pptx.ShapeType.roundRect, { x: 6.85, y: 1.8, w: 5.65, h: 3.0, fill: { color: "1E293B" }, line: { color: "334155" }, rectRadius: 0.12 });
    s.addText("The DutyBoost Proposition", { x: 7.05, y: 1.95, w: 5.25, h: 0.4, fontSize: 13, bold: true, color: WHITE, align: "left", fontFace: "Calibri" });
    const prop = [
      { from: "Retailers wait for passengers", to: "Passengers arrive with purchase intent" },
      { from: "Impulse-driven shopping", to: "Pre-activated economic incentive" },
      { from: "Partners earn nothing from retail", to: "Partners earn ancillary revenue" },
      { from: "POS is cost centre only", to: "POS participates in shared revenue" },
    ];
    prop.forEach((row, i) => {
      const y = 2.45 + i * 0.5;
      s.addShape(pptx.ShapeType.roundRect, { x: 7.05, y, w: 2.35, h: 0.4, fill: { color: "7F1D1D" }, line: { color: "7F1D1D" }, rectRadius: 0.06 });
      s.addText(row.from, { x: 7.15, y, w: 2.15, h: 0.4, fontSize: 9, color: "FCA5A5", align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText("→", { x: 9.4, y, w: 0.3, h: 0.4, fontSize: 12, bold: true, color: "60A5FA", align: "center", fontFace: "Calibri", valign: "middle" });
      s.addShape(pptx.ShapeType.roundRect, { x: 9.7, y, w: 2.6, h: 0.4, fill: { color: "14532D" }, line: { color: "14532D" }, rectRadius: 0.06 });
      s.addText(row.to, { x: 9.8, y, w: 2.4, h: 0.4, fontSize: 9, color: "86EFAC", align: "center", fontFace: "Calibri", valign: "middle" });
    });

    // Core insight
    s.addShape(pptx.ShapeType.roundRect, { x: 6.85, y: 4.95, w: 5.65, h: 2.05, fill: { color: BLUE }, line: { color: BLUE }, rectRadius: 0.12 });
    s.addText("The Core Insight", { x: 7.05, y: 5.05, w: 5.25, h: 0.35, fontSize: 11, bold: true, color: "BFDBFE", align: "left", fontFace: "Calibri" });
    s.addText("\"Is earning €87.50 from an incremental €100 retail sale — without any upfront acquisition cost — more valuable than earning €0 from a traveller who otherwise wouldn't have converted?\"", { x: 7.05, y: 5.4, w: 5.25, h: 1.2, fontSize: 11.5, bold: true, color: WHITE, align: "left", fontFace: "Calibri", valign: "top" });
    s.addText("Yes. Every time.", { x: 7.05, y: 6.6, w: 5.25, h: 0.35, fontSize: 11, color: "DBEAFE", align: "left", fontFace: "Calibri" });
  }

  // ============ SLIDE 6: MODEL ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addText("BUSINESS MODEL", { x: 0.8, y: 0.4, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "left", fontFace: "Calibri", charSpacing: 3 });
    s.addText("Performance-Based. Zero Upfront Cost.", { x: 0.8, y: 0.85, w: 11.7, h: 0.7, fontSize: 26, bold: true, color: DARK, align: "left", fontFace: "Calibri" });
    s.addText("Revenue is created only when a qualifying transaction is validated through Enterprise POS.", { x: 0.8, y: 1.55, w: 11.7, h: 0.4, fontSize: 12, color: SLATE, align: "left", fontFace: "Calibri" });

    // Tier table
    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 2.1, w: 6.5, h: 4.9, fill: { color: "1E293B" }, line: { color: "334155" }, rectRadius: 0.12 });
    s.addText("The DutyCredit Tier Structure", { x: 1.0, y: 2.2, w: 6.1, h: 0.4, fontSize: 14, bold: true, color: WHITE, align: "left", fontFace: "Calibri" });
    const tHeaders = ["Tier", "Basket", "Discount", "Traveller Saves"];
    tHeaders.forEach((h, i) => {
      const x = 1.0 + i * 1.55;
      s.addText(h, { x, y: 2.65, w: 1.5, h: 0.3, fontSize: 9, color: "94A3B8", align: i === 3 ? "right" : "left", fontFace: "Calibri" });
    });
    const tiers = [
      { tier: "Entry", range: "€20–€49", disc: "5%–7.5%", save: "€1.00–€3.19", hl: false },
      { tier: "Boarding", range: "€50–€99", disc: "7.5%–10%", save: "€3.75–€9.41", hl: false },
      { tier: "Standard", range: "€100–€149", disc: "10%–12.5%", save: "€10.00–€18.25", hl: true },
      { tier: "Plus", range: "€150–€199", disc: "12.5%–15%", save: "€18.75–€29.04", hl: false },
      { tier: "Lounge", range: "€200–€249", disc: "15%–17.5%", save: "€30.00–€42.75", hl: false },
      { tier: "Premium", range: "€250–€299", disc: "17.5%–20%", save: "€43.75–€57.00", hl: false },
      { tier: "VIP", range: "€300+", disc: "20% capped", save: "Up to €60", hl: false },
    ];
    tiers.forEach((row, i) => {
      const y = 3.0 + i * 0.55;
      if (row.hl) s.addShape(pptx.ShapeType.roundRect, { x: 0.95, y: y - 0.05, w: 6.2, h: 0.5, fill: { color: "1E40AF" }, line: { color: "1E40AF" }, rectRadius: 0.05 });
      s.addText(row.tier, { x: 1.0, y, w: 1.55, h: 0.4, fontSize: 11, bold: true, color: "60A5FA", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(row.range, { x: 2.55, y, w: 1.55, h: 0.4, fontSize: 11, color: "CBD5E1", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(row.disc, { x: 4.1, y, w: 1.55, h: 0.4, fontSize: 11, color: "FDE68A", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(row.save, { x: 5.65, y, w: 1.5, h: 0.4, fontSize: 11, bold: true, color: "86EFAC", align: "right", fontFace: "Calibri", valign: "middle" });
    });

    // Fee allocation
    s.addShape(pptx.ShapeType.roundRect, { x: 7.5, y: 2.1, w: 5.0, h: 2.95, fill: { color: "EFF6FF" }, line: { color: "BFDBFE", width: 1 }, rectRadius: 0.12 });
    s.addText("Platform Fee Allocation (2.5% of Original Retail Value)", { x: 7.7, y: 2.2, w: 4.6, h: 0.6, fontSize: 12, bold: true, color: "1E3A8A", align: "left", fontFace: "Calibri" });
    const fees = [
      { party: "Travel & Corporate Partner", share: "20% of fee", pct: "0.50%", val: "€0.50", color: BLUE },
      { party: "Enterprise POS Partner", share: "10% of fee", pct: "0.25%", val: "€0.25", color: INDIGO },
      { party: "DutyBoost", share: "70% of fee", pct: "1.75%", val: "€1.75", color: VIOLET },
    ];
    fees.forEach((row, i) => {
      const y = 2.85 + i * 0.7;
      s.addShape(pptx.ShapeType.roundRect, { x: 7.7, y, w: 0.15, h: 0.55, fill: { color: row.color }, line: { color: row.color }, rectRadius: 0.04 });
      s.addText(row.party, { x: 7.95, y, w: 3.0, h: 0.3, fontSize: 11, bold: true, color: "334155", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(`${row.share} = ${row.pct} of retail value`, { x: 7.95, y: y + 0.28, w: 3.0, h: 0.25, fontSize: 9, color: SLATE, align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(row.val, { x: 10.7, y, w: 1.7, h: 0.55, fontSize: 18, bold: true, color: row.color, align: "right", fontFace: "Calibri", valign: "middle" });
    });

    // At 1M transactions
    s.addShape(pptx.ShapeType.roundRect, { x: 7.5, y: 5.2, w: 5.0, h: 1.8, fill: { color: "F0FDF4" }, line: { color: "BBF7D0", width: 1 }, rectRadius: 0.12 });
    s.addText("At 1 Million €100 Transactions:", { x: 7.7, y: 5.3, w: 4.6, h: 0.35, fontSize: 12, bold: true, color: "14532D", align: "left", fontFace: "Calibri" });
    const impact = [
      { party: "Travellers", val: "€10M in savings" },
      { party: "Travel & Corporate Partners", val: "€500,000 ancillary revenue" },
      { party: "POS Partners", val: "€250,000 transaction revenue" },
      { party: "DutyBoost", val: "€1.75M infrastructure revenue" },
      { party: "Retailers", val: "€87.5M net before costs" },
    ];
    impact.forEach((row, i) => {
      const y = 5.65 + i * 0.27;
      s.addText(row.party, { x: 7.7, y, w: 2.6, h: 0.25, fontSize: 9.5, color: "475569", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(row.val, { x: 10.3, y, w: 2.1, h: 0.25, fontSize: 9.5, bold: true, color: "166534", align: "right", fontFace: "Calibri", valign: "middle" });
    });
  }

  // ============ SLIDE 7: TRANSACTION ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addText("ONE TRANSACTION — FIVE BENEFICIARIES", { x: 0.8, y: 0.4, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "left", fontFace: "Calibri", charSpacing: 3 });
    s.addText("€100 Original Qualifying Retail Value", { x: 0.8, y: 0.85, w: 11.7, h: 0.7, fontSize: 26, bold: true, color: DARK, align: "left", fontFace: "Calibri" });

    const beneficiaries = [
      { party: "Traveller", value: "€10.00", sub: "DutyCredit saving (10%)", color: GREEN },
      { party: "Airport Retailer", value: "€87.50", sub: "Net before normal costs (87.5%)", color: "60A5FA" },
      { party: "Travel & Corporate Partner", value: "€0.50", sub: "Ancillary revenue (0.5%)", color: YELLOW },
      { party: "POS Partner", value: "€0.25", sub: "Transaction revenue (0.25%)", color: PURPLE },
      { party: "DutyBoost", value: "€1.75", sub: "Infrastructure revenue (1.75%)", color: ORANGE },
    ];
    beneficiaries.forEach((p, i) => {
      const x = 0.8 + i * 2.4;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 1.8, w: 2.2, h: 2.6, fill: { color: PANEL }, line: { color: p.color, width: 1 }, rectRadius: 0.12 });
      s.addText(p.party, { x, y: 1.95, w: 2.2, h: 0.4, fontSize: 11, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
      s.addText(p.value, { x, y: 2.4, w: 2.2, h: 0.7, fontSize: 26, bold: true, color: p.color, align: "center", fontFace: "Calibri" });
      s.addText(p.sub, { x: x + 0.15, y: 3.2, w: 1.9, h: 1.0, fontSize: 10, color: "94A3B8", align: "center", fontFace: "Calibri", valign: "top" });
    });

    // Distribution bar
    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 4.6, w: 5.85, h: 2.4, fill: { color: PANEL }, line: { color: PANEL_BORDER, width: 1 }, rectRadius: 0.12 });
    s.addText("Total = €100.00", { x: 1.0, y: 4.7, w: 5.45, h: 0.3, fontSize: 10, bold: true, color: "94A3B8", align: "left", fontFace: "Calibri", charSpacing: 1 });
    const dist = [
      { pct: 10, color: GREEN, lbl: "Traveller 10%" },
      { pct: 87.5, color: BLUE, lbl: "Retailer 87.5%" },
      { pct: 0.5, color: YELLOW, lbl: "Partner 0.5%" },
      { pct: 0.25, color: PURPLE, lbl: "POS 0.25%" },
      { pct: 1.75, color: ORANGE, lbl: "DutyBoost 1.75%" },
    ];
    let xCursor = 1.0;
    const barW = 5.45;
    dist.forEach((d) => {
      const w = barW * (d.pct / 100);
      s.addShape(pptx.ShapeType.rect, { x: xCursor, y: 5.05, w, h: 0.5, fill: { color: d.color }, line: { color: d.color } });
      xCursor += w;
    });
    dist.forEach((d, i) => {
      const y = 5.7 + Math.floor(i / 3) * 0.45;
      const xCol = 1.0 + (i % 3) * 1.85;
      s.addShape(pptx.ShapeType.rect, { x: xCol, y: y + 0.05, w: 0.2, h: 0.2, fill: { color: d.color }, line: { color: d.color } });
      s.addText(d.lbl, { x: xCol + 0.25, y, w: 1.55, h: 0.3, fontSize: 9, color: "94A3B8", align: "left", fontFace: "Calibri", valign: "middle" });
    });

    // Integrate once
    s.addShape(pptx.ShapeType.roundRect, { x: 6.85, y: 4.6, w: 5.65, h: 2.4, fill: { color: "1E3A8A" }, line: { color: BLUE, width: 1 }, rectRadius: 0.12 });
    s.addText("Integrate Once. Deploy Repeatedly.", { x: 7.05, y: 4.75, w: 5.25, h: 0.5, fontSize: 16, bold: true, color: WHITE, align: "left", fontFace: "Calibri" });
    s.addText("A single Enterprise POS integration can enable DutyBoost across multiple retailers, stores, airports and geographic markets — creating fundamentally better scaling economics than building individual integrations per retailer.", { x: 7.05, y: 5.3, w: 5.25, h: 1.3, fontSize: 11, color: "CBD5E1", align: "left", fontFace: "Calibri", valign: "top" });
    s.addText("Technology strategy: INTEGRATE ONCE. DEPLOY REPEATEDLY.", { x: 7.05, y: 6.6, w: 5.25, h: 0.35, fontSize: 11, bold: true, color: "60A5FA", align: "left", fontFace: "Calibri" });
  }

  // ============ SLIDE 8: FLYWHEEL ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addText("THE GROWTH FLYWHEEL", { x: 0.8, y: 0.4, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "left", fontFace: "Calibri", charSpacing: 3 });
    s.addText("A Self-Reinforcing Circular Ecosystem", { x: 0.8, y: 0.85, w: 11.7, h: 0.7, fontSize: 26, bold: true, color: DARK, align: "left", fontFace: "Calibri" });

    // Network effects
    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.8, w: 5.85, h: 5.2, fill: { color: PANEL }, line: { color: PANEL_BORDER, width: 1 }, rectRadius: 0.12 });
    s.addText("Network Effects by Participant", { x: 1.0, y: 1.95, w: 5.45, h: 0.4, fontSize: 14, bold: true, color: WHITE, align: "left", fontFace: "Calibri" });
    const effects = [
      { party: "More Travel & Corporate Partners", effect: "→ More travellers reached before airport arrival" },
      { party: "More Retailers", effect: "→ More DutyCredit redemption opportunities" },
      { party: "More POS Integrations", effect: "→ More deployment capacity" },
      { party: "More Transactions", effect: "→ Stronger commercial evidence" },
      { party: "Stronger Evidence", effect: "→ Easier future partner acquisition" },
    ];
    effects.forEach((row, i) => {
      const y = 2.5 + i * 0.7;
      s.addText(row.party, { x: 1.0, y, w: 5.45, h: 0.3, fontSize: 11, bold: true, color: "60A5FA", align: "left", fontFace: "Calibri" });
      s.addText(row.effect, { x: 1.0, y: y + 0.28, w: 5.45, h: 0.3, fontSize: 10.5, color: "94A3B8", align: "left", fontFace: "Calibri" });
    });

    // Flywheel steps (right)
    s.addShape(pptx.ShapeType.roundRect, { x: 6.85, y: 1.8, w: 5.65, h: 4.05, fill: { color: PANEL }, line: { color: PANEL_BORDER, width: 1 }, rectRadius: 0.12 });
    s.addText("The Circular Flywheel", { x: 7.05, y: 1.95, w: 5.25, h: 0.4, fontSize: 14, bold: true, color: WHITE, align: "left", fontFace: "Calibri" });
    const wheel = "More Travel & Corporate Partners → More Travellers Reached → More DutyCredits Distributed → More Traveller Incentives → More Pre-Airport Activation → More Participating Retail Visits → More Retail Conversion → More Validated Transactions → More Retailer Revenue → More Partner Revenue → More DutyBoost Revenue → Stronger Partner Adoption → Greater Network Scale → More Travel & Corporate Partners";
    s.addText(wheel, { x: 7.05, y: 2.5, w: 5.25, h: 3.2, fontSize: 10.5, color: "CBD5E1", align: "left", fontFace: "Calibri", valign: "top" });

    // Quote
    s.addShape(pptx.ShapeType.roundRect, { x: 6.85, y: 6.0, w: 5.65, h: 1.0, fill: { color: "1E3A8A" }, line: { color: BLUE, width: 1 }, rectRadius: 0.12 });
    s.addText("\"A positive flywheel that creates growth for every stakeholder.\"", { x: 7.05, y: 6.1, w: 5.25, h: 0.55, fontSize: 13, bold: true, color: "BFDBFE", align: "left", fontFace: "Calibri", valign: "middle" });
    s.addText("Each new partner makes the platform more valuable for every existing partner.", { x: 7.05, y: 6.65, w: 5.25, h: 0.3, fontSize: 10, color: "94A3B8", align: "left", fontFace: "Calibri" });
  }

  // ============ SLIDE 9: FINANCIALS ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addText("FINANCIAL PROJECTIONS", { x: 0.8, y: 0.4, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "left", fontFace: "Calibri", charSpacing: 3 });
    s.addText("Five-Year Base Case — Positive EBITDA in Year 3", { x: 0.8, y: 0.85, w: 11.7, h: 0.7, fontSize: 24, bold: true, color: DARK, align: "left", fontFace: "Calibri" });

    // Table
    const finHeaders = ["Metric", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
    finHeaders.forEach((h, i) => {
      const x = 0.8 + i * 1.95;
      const isYear3 = i === 3;
      s.addShape(pptx.ShapeType.rect, { x, y: 1.7, w: 1.95, h: 0.45, fill: { color: isYear3 ? "1D4ED8" : "1E293B" }, line: { color: "1E293B" } });
      s.addText(h, { x, y: 1.72, w: i === 0 ? 1.85 : 1.95, h: 0.42, fontSize: 10.5, bold: true, color: WHITE, align: i === 0 ? "left" : "right", fontFace: "Calibri", valign: "middle" });
    });
    const finRows = [
      { label: "Travellers Reached", vals: ["1M", "8M", "30M", "80M", "180M"], hl: false },
      { label: "Validated Transactions", vals: ["30K", "320K", "1.5M", "4.8M", "12.6M"], hl: false },
      { label: "Original Retail Value", vals: ["€3.0M", "€32M", "€150M", "€480M", "€1.26B"], hl: false },
      { label: "Traveller Savings", vals: ["€300K", "€3.2M", "€15M", "€48M", "€126M"], hl: false },
      { label: "DutyBoost Revenue", vals: ["€52.5K", "€560K", "€2.625M", "€8.4M", "€22.05M"], hl: true },
      { label: "Operating Expenses", vals: ["€320K", "€570K", "€1.20M", "€2.80M", "€5.50M"], hl: false },
      { label: "EBITDA", vals: ["-€269.9K", "-€32.4K", "€1.335M", "€5.36M", "€16.046M"], hl: true },
      { label: "EBITDA Margin", vals: ["—", "—", "50.9%", "63.8%", "72.8%"], hl: false },
    ];
    finRows.forEach((row, ri) => {
      const y = 2.15 + ri * 0.5;
      const rowBg = row.hl ? "EFF6FF" : (ri % 2 === 0 ? "F8FAFC" : WHITE);
      finHeaders.forEach((_, ci) => {
        const x = 0.8 + ci * 1.95;
        const isYear3 = ci === 3;
        s.addShape(pptx.ShapeType.rect, { x, y, w: 1.95, h: 0.5, fill: { color: isYear3 ? "DBEAFE" : rowBg }, line: { color: "F1F5F9" } });
      });
      s.addText(row.label, { x: 0.85, y, w: 1.85, h: 0.5, fontSize: 10.5, bold: row.hl, color: row.hl ? "1D4ED8" : "334155", align: "left", fontFace: "Calibri", valign: "middle" });
      row.vals.forEach((v, ci) => {
        const x = 0.8 + (ci + 1) * 1.95;
        s.addText(v, { x, y, w: 1.95, h: 0.5, fontSize: 10.5, bold: row.hl, color: row.hl ? "1D4ED8" : "475569", align: "right", fontFace: "Calibri", valign: "middle" });
      });
    });

    // Bottom stats
    const finStats = [
      { val: "~710K", lbl: "Annual Break-Even Transactions", sub: "Year 3 forecast: 1.5M (2x break-even)", color: GREEN },
      { val: "€33.69M", lbl: "5-Year Cumulative Revenue", sub: "19.25M validated transactions", color: BLUE },
      { val: "72.8%", lbl: "Year 5 EBITDA Margin", sub: "Infrastructure platform economics", color: VIOLET },
    ];
    finStats.forEach((st, i) => {
      const x = 0.8 + i * 3.95;
      const bg = i === 0 ? "F0FDF4" : i === 1 ? "EFF6FF" : "F5F3FF";
      s.addShape(pptx.ShapeType.roundRect, { x, y: 6.25, w: 3.7, h: 0.95, fill: { color: bg }, line: { color: st.color, width: 1 }, rectRadius: 0.1 });
      s.addText(st.val, { x, y: 6.3, w: 3.7, h: 0.4, fontSize: 18, bold: true, color: st.color, align: "center", fontFace: "Calibri" });
      s.addText(st.lbl, { x, y: 6.7, w: 3.7, h: 0.25, fontSize: 10, bold: true, color: "334155", align: "center", fontFace: "Calibri" });
      s.addText(st.sub, { x, y: 6.94, w: 3.7, h: 0.22, fontSize: 8.5, color: SLATE, align: "center", fontFace: "Calibri" });
    });
  }

  // ============ SLIDE 10: FUNDING ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addText("FUNDING & USE OF CAPITAL", { x: 0.8, y: 0.4, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "left", fontFace: "Calibri", charSpacing: 3 });
    s.addText("€200,000 Seed Round — From Development to Live Deployment", { x: 0.8, y: 0.85, w: 11.7, h: 0.7, fontSize: 22, bold: true, color: DARK, align: "left", fontFace: "Calibri" });

    // Use of funds
    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.8, w: 6.5, h: 5.2, fill: { color: "1E293B" }, line: { color: "334155" }, rectRadius: 0.12 });
    s.addText("Use of Funds", { x: 1.0, y: 1.95, w: 6.1, h: 0.4, fontSize: 14, bold: true, color: WHITE, align: "left", fontFace: "Calibri" });
    const funds = [
      { label: "Platform & Product Development", amount: "€60,000", pct: 30, color: BLUE },
      { label: "Enterprise POS Integrations", amount: "€40,000", pct: 20, color: INDIGO },
      { label: "Commercial Partnerships & Rollout", amount: "€36,000", pct: 18, color: VIOLET },
      { label: "Legal, Privacy, Cybersecurity & IP", amount: "€22,000", pct: 11, color: PURPLE },
      { label: "Traveller Activation & Campaigns", amount: "€18,000", pct: 9, color: "EC4899" },
      { label: "Operations, Finance & Settlement", amount: "€12,000", pct: 6, color: "F43F5E" },
      { label: "Working Capital & Contingency", amount: "€12,000", pct: 6, color: "DC2626" },
    ];
    funds.forEach((item, i) => {
      const y = 2.45 + i * 0.62;
      s.addText(item.label, { x: 1.0, y, w: 4.0, h: 0.3, fontSize: 10.5, color: "CBD5E1", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(item.amount, { x: 5.0, y, w: 1.5, h: 0.3, fontSize: 10.5, bold: true, color: WHITE, align: "right", fontFace: "Calibri", valign: "middle" });
      s.addShape(pptx.ShapeType.roundRect, { x: 1.0, y: y + 0.32, w: 5.5, h: 0.18, fill: { color: "334155" }, line: { color: "334155" }, rectRadius: 0.05 });
      s.addShape(pptx.ShapeType.roundRect, { x: 1.0, y: y + 0.32, w: 5.5 * (item.pct / 30), h: 0.18, fill: { color: item.color }, line: { color: item.color }, rectRadius: 0.05 });
    });

    // Milestones
    s.addShape(pptx.ShapeType.roundRect, { x: 7.5, y: 1.8, w: 5.0, h: 4.45, fill: { color: "EFF6FF" }, line: { color: "BFDBFE", width: 1 }, rectRadius: 0.12 });
    s.addText("Priority Milestones with This Capital", { x: 7.7, y: 1.95, w: 4.6, h: 0.4, fontSize: 12, bold: true, color: "1E3A8A", align: "left", fontFace: "Calibri" });
    const milestones = [
      { n: "1", label: "Production-ready MVP", desc: "Stable DutyCredit issuance, validation & reporting" },
      { n: "2", label: "First Enterprise POS Integration", desc: "Reusable pathway to multiple retailers" },
      { n: "3", label: "First Airport Retailer Pilot", desc: "Live qualifying DutyBoost transactions" },
      { n: "4", label: "First Travel & Corporate Partner Launch", desc: "Real travellers receiving DutyCredits" },
      { n: "5", label: "First Validated Redemption", desc: "End-to-end commercial workflow proven" },
      { n: "6", label: "First Settlement Cycle", desc: "Multi-party allocation & reconciliation" },
    ];
    milestones.forEach((m, i) => {
      const y = 2.45 + i * 0.62;
      s.addShape(pptx.ShapeType.ellipse, { x: 7.7, y: y + 0.02, w: 0.4, h: 0.4, fill: { color: BLUE }, line: { color: BLUE } });
      s.addText(m.n, { x: 7.7, y: y + 0.02, w: 0.4, h: 0.4, fontSize: 11, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(m.label, { x: 8.2, y, w: 4.1, h: 0.3, fontSize: 10.5, bold: true, color: "1E3A8A", align: "left", fontFace: "Calibri", valign: "middle" });
      s.addText(m.desc, { x: 8.2, y: y + 0.27, w: 4.1, h: 0.28, fontSize: 9, color: SLATE, align: "left", fontFace: "Calibri", valign: "middle" });
    });

    // Note
    s.addShape(pptx.ShapeType.roundRect, { x: 7.5, y: 6.4, w: 5.0, h: 0.6, fill: { color: "FFFBEB" }, line: { color: "FCD34D", width: 1 }, rectRadius: 0.1 });
    s.addText("Capital is intended to finance measurable proof rather than premature organisational expansion. Milestone-based recruitment only.", { x: 7.7, y: 6.45, w: 4.6, h: 0.5, fontSize: 9.5, bold: true, color: "92400E", align: "left", fontFace: "Calibri", valign: "middle" });
  }

  // ============ SLIDE 11: INVESTMENT ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addText("INVESTMENT CASE", { x: 0.8, y: 0.4, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "left", fontFace: "Calibri", charSpacing: 3 });
    s.addText("Four Layers. One Opportunity.", { x: 0.8, y: 0.85, w: 11.7, h: 0.7, fontSize: 26, bold: true, color: DARK, align: "left", fontFace: "Calibri" });

    const layers = [
      { n: "1", layer: "Existing Market", headline: "+/- €37.1 Billion", body: "Estimated global Airport Duty-Free & Travel Retail market — already established, already generating revenue.", color: BLUE },
      { n: "2", layer: "Conversion Headroom", headline: "73% Non-Purchase Exposure", body: "Avolta's 2025 benchmark: 2.5B passenger exposure with only 27% penetration. 1.82B non-purchasing travellers represent untapped headroom.", color: INDIGO },
      { n: "3", layer: "Traveller Incentive", headline: "€1 – €60 Direct Value", body: "DutyBoost provides measurable, direct financial value to the traveller — not abstract loyalty points. A compelling economic reason to engage.", color: VIOLET },
      { n: "4", layer: "Pre-Airport Activation", headline: "Upstream Influence", body: "Travellers reached via airlines, OTAs, hotels, car rentals and corporate travel programmes — before they arrive at the airport. The commercial journey starts earlier.", color: PURPLE },
    ];
    layers.forEach((l, i) => {
      const x = 0.8 + (i % 2) * 6.0;
      const y = 1.8 + Math.floor(i / 2) * 1.95;
      s.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.7, h: 1.8, fill: { color: PANEL }, line: { color: l.color, width: 1 }, rectRadius: 0.12 });
      s.addShape(pptx.ShapeType.ellipse, { x: x + 0.2, y: y + 0.2, w: 0.45, h: 0.45, fill: { color: l.color }, line: { color: l.color } });
      s.addText(l.n, { x: x + 0.2, y: y + 0.2, w: 0.45, h: 0.45, fontSize: 13, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(`Layer ${l.n} — ${l.layer}`, { x: x + 0.8, y: y + 0.18, w: 4.7, h: 0.3, fontSize: 9, bold: true, color: l.color, align: "left", fontFace: "Calibri", charSpacing: 1 });
      s.addText(l.headline, { x: x + 0.8, y: y + 0.45, w: 4.7, h: 0.4, fontSize: 15, bold: true, color: WHITE, align: "left", fontFace: "Calibri" });
      s.addText(l.body, { x: x + 0.8, y: y + 0.85, w: 4.7, h: 0.85, fontSize: 9.5, color: "94A3B8", align: "left", fontFace: "Calibri", valign: "top" });
    });

    // Summary bar
    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 5.8, w: 11.7, h: 1.2, fill: { color: "1E3A8A" }, line: { color: BLUE, width: 1 }, rectRadius: 0.12 });
    const invStats = [
      { val: "€200K", lbl: "Seed Ask" },
      { val: "710K txns", lbl: "Break-Even (Year 3)" },
      { val: "€22.05M", lbl: "Year 5 Revenue" },
      { val: "€16.05M", lbl: "Year 5 EBITDA" },
    ];
    invStats.forEach((st, i) => {
      const x = 1.0 + i * 2.85;
      s.addText(st.val, { x, y: 5.9, w: 2.75, h: 0.45, fontSize: 18, bold: true, color: "60A5FA", align: "center", fontFace: "Calibri" });
      s.addText(st.lbl, { x, y: 6.35, w: 2.75, h: 0.3, fontSize: 9.5, color: "94A3B8", align: "center", fontFace: "Calibri" });
    });
    s.addShape(pptx.ShapeType.line, { x: 1.0, y: 6.72, w: 11.3, h: 0, line: { color: BLUE, width: 0.5 } });
    s.addText("The traveller already travels. The retailer already sells. The POS already processes. The partners already communicate.", { x: 1.0, y: 6.78, w: 11.3, h: 0.35, fontSize: 11, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("DutyBoost connects the value.", { x: 1.0, y: 7.05, w: 11.3, h: 0.35, fontSize: 14, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
  }

  // ============ SLIDE 12: INVITATION ============
  {
    const s = pptx.addSlide();
    lightSlide(s);
    s.addImage({ path: LOGO_URL, x: 5.65, y: 0.5, w: 2.0, h: 0.6, sizing: { type: "contain", w: 2.0, h: 0.6 } });
    s.addText("AN INVITATION", { x: 0.8, y: 1.25, w: 11.7, h: 0.35, fontSize: 11, bold: true, color: BLUE, align: "center", fontFace: "Calibri", charSpacing: 3 });
    s.addText("Join Us in Reimagining the Commercial Value of a", { x: 0.8, y: 1.65, w: 11.7, h: 0.55, fontSize: 22, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
    s.addText("Multi-Century-Old Industry", { x: 0.8, y: 2.15, w: 11.7, h: 0.55, fontSize: 22, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
    s.addText("Travel has existed for centuries, yet its commercial journey remains disconnected. Enormous value flows through every journey, but there is still no infrastructure connecting that value into one measurable, attributable and circular commercial transaction.", { x: 1.5, y: 2.85, w: 10.3, h: 1.0, fontSize: 12.5, color: SLATE, align: "center", fontFace: "Calibri" });
    s.addShape(pptx.ShapeType.roundRect, { x: 1.8, y: 3.95, w: 9.7, h: 1.35, fill: { color: PANEL }, line: { color: PANEL_BORDER, width: 1 }, rectRadius: 0.12 });
    s.addText("DutyBoost connects that value. Our Circular Commercial Revenue Infrastructure activates existing touch-points across the travel journey and connects participants around one validated transaction — creating measurable upside across the ecosystem.", { x: 2.0, y: 4.05, w: 9.3, h: 1.15, fontSize: 12, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
    s.addText("We are now ready to take DutyBoost from development to live deployment. This is an invitation to those who share our conviction to join us — and own a meaningful stake in an infrastructure built to commercially connect the global travel journey.", { x: 1.5, y: 5.45, w: 10.3, h: 0.95, fontSize: 12.5, color: SLATE, align: "center", fontFace: "Calibri" });
    s.addShape(pptx.ShapeType.roundRect, { x: 4.15, y: 6.5, w: 5.0, h: 0.6, fill: { color: BLUE }, line: { color: BLUE }, rectRadius: 0.15 });
    s.addText("€200,000 Seed Round", { x: 4.15, y: 6.5, w: 5.0, h: 0.6, fontSize: 16, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
    s.addText("The traveller already travels. Let's connect the value — together.", { x: 0.8, y: 7.2, w: 11.7, h: 0.4, fontSize: 13, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-Investor-Pitch-Deck-2026.pptx" });
}