import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";
const DARK = "0F172A";
const BLUE = "1E40AF";
const BLUE_LIGHT = "3B6EF5";
const PURPLE = "6366F1";
const ORANGE = "EA580C";
const SLATE = "64748B";
const WHITE = "FFFFFF";
const LIGHT_BLUE_BG = "EFF6FF";
const LIGHT_PURPLE_BG = "F5F3FF";

function addFooter(s, text = "DutyBoost · Partnership Program · hello@dutyboost.com") {
  s.addShape("rect", { x: 0, y: 7.1, w: 13.33, h: 0.4, fill: { color: DARK }, line: { color: DARK, width: 0 } });
  s.addText(text, { x: 0.3, y: 7.12, w: 12.7, h: 0.3, fontSize: 8, color: "94A3B8", fontFace: "Calibri", align: "center" });
}

function addSectionLabel(s, text, color = BLUE) {
  s.addText(text, { x: 0.5, y: 0.35, w: 12.3, h: 0.3, fontSize: 9, bold: true, color, charSpacing: 3, fontFace: "Calibri", align: "center" });
}

function addDivider(s, x, y, w, color = BLUE_LIGHT) {
  s.addShape("rect", { x, y, w, h: 0.04, fill: { color }, line: { color, width: 0 } });
}

export async function exportTravelPartnerPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

  // ─────────────────────────────────────────────
  // SLIDE 1: COVER
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 0.08, fill: { color: PURPLE }, line: { color: PURPLE, width: 0 } });
    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.5, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });
    s.addText("Partner with DutyBoost", { x: 1, y: 2.1, w: 11.3, h: 1.1, fontSize: 38, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("Add value to your customers. Earn commission.", { x: 1, y: 3.1, w: 11.3, h: 0.6, fontSize: 22, color: ORANGE, align: "center", fontFace: "Calibri", italic: true });
    addDivider(s, 4.5, 3.85, 4.33, ORANGE);
    s.addText("A white-label loyalty program that delivers exclusive airport\nretail discounts to your travelers and generates recurring commission.", { x: 1.5, y: 4.05, w: 10.3, h: 0.9, fontSize: 14, color: "94A3B8", align: "center", fontFace: "Calibri" });
    s.addText("2026 · Confidential", { x: 1, y: 6.7, w: 11.3, h: 0.3, fontSize: 9, color: "475569", align: "center", fontFace: "Calibri" });
  }

  // ─────────────────────────────────────────────
  // SLIDE 2: THE OPPORTUNITY
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "THE OPPORTUNITY");
    s.addText("72% of travelers browse but don't buy at airports", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.6, 3);
    const stats = [
      { num: "€40B+", label: "Global airport retail opportunity\nSource: Airport Council International" },
      { num: "2.4B", label: "International air passengers/year\nSource: IATA 2024" },
      { num: "72%", label: "Browse but don't buy\nSource: TFWA World Exhibition Research" },
      { num: "€35–€80", label: "Average airport duty-free basket\nSource: TFWA 2023" },
    ];
    stats.forEach(({ num, label }, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape("roundRect", { x, y: 1.85, w: 2.95, h: 3.2, fill: { color: i % 2 === 0 ? LIGHT_BLUE_BG : "F8FAFC" }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.12 });
      s.addText(num, { x, y: 2.1, w: 2.95, h: 1.0, fontSize: 34, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.15, y: 3.2, w: 2.65, h: 1.5, fontSize: 10, color: SLATE, align: "center", fontFace: "Calibri", valign: "top" });
    });
    s.addShape("roundRect", { x: 0.4, y: 5.25, w: 12.5, h: 0.85, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.12 });
    s.addText("DutyBoost helps you convert the 72% who browse — by giving your customers a reason to spend.", { x: 0.6, y: 5.33, w: 12.1, h: 0.65, fontSize: 12, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 3: YOUR VALUE PROPOSITION
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "YOUR VALUE PROPOSITION");
    s.addText("DutyCredit: A loyalty tool that drives spending", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 28, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    const benefits = [
      { title: "Differentiate Your Platform", body: "Exclusive benefit your customers won't find elsewhere. Pure competitive advantage." },
      { title: "Improve Customer Loyalty", body: "Travelers remember the extra value you provided. Higher lifetime value, lower churn." },
      { title: "Increase NPS & Satisfaction", body: "Give customers what they want: real savings at moments they care about (airports)." },
      { title: "Zero Operational Burden", body: "We handle retailer relationships, fraud, payouts, customer support. You just send emails." },
      { title: "Generate Recurring Revenue", body: "Passive commission on every booking. No customer service overhead." },
      { title: "Build Data & Insights", body: "Understand your traveler behavior at airports. Spending patterns. Channel performance." },
    ];
    benefits.forEach(({ title, body }, i) => {
      const col = i % 2; const row = Math.floor(i / 2);
      const x = 0.4 + col * 6.35; const y = 1.75 + row * 1.55;
      s.addShape("roundRect", { x, y, w: 6.15, h: 1.35, fill: { color: i % 2 === 0 ? "F0F9FF" : LIGHT_PURPLE_BG }, line: { color: i % 2 === 0 ? "DBEAFE" : "C4B5FD", width: 1 }, rectRadius: 0.1 });
      s.addText(`✓  ${title}`, { x: x + 0.2, y: y + 0.1, w: 5.8, h: 0.4, fontSize: 12, bold: true, color: DARK, fontFace: "Calibri" });
      s.addText(body, { x: x + 0.2, y: y + 0.55, w: 5.8, h: 0.65, fontSize: 10.5, color: SLATE, fontFace: "Calibri" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 4: HOW IT WORKS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "HOW IT WORKS");
    s.addText("4-step process for travel partners", { x: 0.5, y: 0.75, w: 12.3, h: 0.8, fontSize: 28, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
    addDivider(s, 0.5, 1.6, 3, BLUE);
    const steps = [
      { num: "1", title: "You issue DutyCredits", body: "Include QR code in your booking confirmation email. We provide the template." },
      { num: "2", title: "Traveler receives DutyCredit", body: "Valid from departure day through arrival day. Min. spend €70 to activate." },
      { num: "3", title: "Traveler redeems at airport retail store", body: "Cashier scans QR. Tiered discount applied automatically. One-time use." },
      { num: "4", title: "You earn commission", body: "0.5% of gross DutyCredit value. Monthly payouts to your bank account." },
    ];
    steps.forEach(({ num, title, body }, i) => {
      const x = 0.35 + i * 3.18;
      s.addShape("roundRect", { x, y: 2.0, w: 3.0, h: 4.0, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.15 });
      s.addShape("roundRect", { x: x + 1.1, y: 2.1, w: 0.8, h: 0.8, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.4 });
      s.addText(num, { x: x + 1.1, y: 2.12, w: 0.8, h: 0.76, fontSize: 16, bold: true, color: WHITE, align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(title, { x: x + 0.1, y: 3.0, w: 2.8, h: 0.5, fontSize: 11, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
      s.addText(body, { x: x + 0.15, y: 3.6, w: 2.7, h: 2.1, fontSize: 10, color: SLATE, align: "center", fontFace: "Calibri", valign: "top" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 5: DUTYCREDIT TIERS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "DUTYCREDIT DISCOUNT TIERS");
    s.addText("What your customers receive — tiered by spend", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 5, BLUE);

    const headers = ["Tier", "Min. Basket", "Customer Saving", "What it means"];
    const colW = [2.2, 2.0, 2.0, 6.8];
    let xh = 0.4;
    headers.forEach((h, i) => {
      s.addShape("rect", { x: xh, y: 2.3, w: colW[i], h: 0.5, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
      s.addText(h, { x: xh + 0.05, y: 2.32, w: colW[i] - 0.1, h: 0.46, fontSize: 10, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle", align: i === 3 ? "left" : "center" });
      xh += colW[i];
    });

    const tiers = [
      { tier: "🟡 Boarding", min: "€70–€99", save: "€5–€10", note: "Entry-level value. Converts price-conscious travelers." },
      { tier: "🔵 Priority", min: "€100–€199", save: "€15–€30", note: "Most popular tier. Strong conversion incentive for mid-market travelers." },
      { tier: "🟢 Lounge", min: "€200–€299", save: "€35–€45", note: "Premium travelers. Higher basket, bigger savings." },
      { tier: "🟣 VIP", min: "€300+", save: "€60", note: "Top spenders. Flat €60 reward = maximum retailer revenue." },
    ];

    tiers.forEach(({ tier, min, save, note }, ri) => {
      const vals = [tier, min, save, note];
      let xr = 0.4;
      vals.forEach((v, ci) => {
        s.addShape("rect", { x: xr, y: 2.8 + ri * 0.78, w: colW[ci], h: 0.74, fill: { color: ci === 0 ? "F8FAFC" : "FFFFFF" }, line: { color: "E2E8F0", width: 1 } });
        s.addText(v, {
          x: xr + 0.08, y: 2.82 + ri * 0.78, w: colW[ci] - 0.12, h: 0.7,
          fontSize: ci === 0 ? 11 : ci === 2 ? 12 : 10,
          bold: ci === 2,
          color: ci === 2 ? BLUE : DARK,
          fontFace: "Calibri", valign: "middle", align: ci === 3 ? "left" : "center"
        });
        xr += colW[ci];
      });
    });

    s.addShape("roundRect", { x: 0.4, y: 6.0, w: 12.5, h: 0.75, fill: { color: "FFF7ED" }, line: { color: "FED7AA", width: 1 }, rectRadius: 0.1 });
    s.addText("⚠ Min. €70 basket · Single use · Valid departure through arrival · Auto-applied at checkout",
      { x: 0.6, y: 6.05, w: 12.1, h: 0.65, fontSize: 10.5, bold: true, color: ORANGE, fontFace: "Calibri", valign: "middle", align: "center" });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 6: WHY PARTNER — BENEFITS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "WHY PARTNER WITH DUTYBOOST");
    s.addText("Your competitive advantage", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 28, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 2.5, PURPLE);
    
    const keyPoints = [
      { icon: "📱", title: "Exclusive Loyalty Tool", body: "Feature customers won't find in competing platforms. Pure differentiation." },
      { icon: "💰", title: "Recurring Revenue Stream", body: "0.5% commission per booking — passive income that scales with your volume." },
      { icon: "🎯", title: "Increase Customer Stickiness", body: "Customers remember and value the extra benefit. Lower churn, higher LTV." },
      { icon: "⚙️", title: "Zero Integration Burden", body: "Email-based delivery. No API required. We handle all the complexity." },
      { icon: "📊", title: "Data & Insights", body: "Understand traveler behavior. Real-time analytics. Performance dashboards." },
      { icon: "🚀", title: "White-Label Option", body: "Premium partners can brand DutyCredit as their own. Custom commission models." },
    ];

    keyPoints.forEach(({ icon, title, body }, i) => {
      const col = i % 2; const row = Math.floor(i / 2);
      const x = 0.4 + col * 6.35; const y = 1.75 + row * 1.55;
      s.addShape("roundRect", { x, y, w: 6.15, h: 1.35, fill: { color: i % 2 === 0 ? LIGHT_PURPLE_BG : LIGHT_BLUE_BG }, line: { color: i % 2 === 0 ? "C4B5FD" : "DBEAFE", width: 1 }, rectRadius: 0.1 });
      s.addText(`${icon}  ${title}`, { x: x + 0.2, y: y + 0.1, w: 5.8, h: 0.4, fontSize: 12, bold: true, color: DARK, fontFace: "Calibri" });
      s.addText(body, { x: x + 0.2, y: y + 0.55, w: 5.8, h: 0.65, fontSize: 10.5, color: SLATE, fontFace: "Calibri" });
    });
    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 7: REVENUE MODEL
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "REVENUE MODEL");
    s.addText("How you earn commission", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 28, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 2.5, "059669");

    s.addShape("roundRect", { x: 0.5, y: 1.7, w: 12.3, h: 5.0, fill: { color: "F0FDF4" }, line: { color: "BBF7D0", width: 1 }, rectRadius: 0.15 });
    
    s.addText("Commission Calculation (Mid-size OTA Example)", { x: 0.8, y: 1.95, w: 11.7, h: 0.4, fontSize: 13, bold: true, color: "059669", fontFace: "Calibri" });
    
    const calcs = [
      { label: "Annual bookings issued", value: "100,000" },
      { label: "Participation rate", value: "20%" },
      { label: "DutyCredits issued", value: "20,000" },
      { label: "Average DutyCredit value", value: "€35" },
      { label: "Total gross spend", value: "€700,000" },
      { label: "Commission rate", value: "0.5%" },
    ];

    calcs.forEach(({ label, value }, i) => {
      const y = 2.55 + i * 0.62;
      s.addText(label, { x: 1.0, y, w: 7.5, h: 0.5, fontSize: 12, color: "334155", fontFace: "Calibri" });
      s.addText(value, { x: 8.7, y, w: 3.5, h: 0.5, fontSize: 12, bold: true, color: "059669", align: "right", fontFace: "Calibri" });
    });

    s.addShape("rect", { x: 1.0, y: 6.2, w: 11.3, h: 0.05, fill: { color: "059669" }, line: { color: "059669", width: 0 } });
    s.addText("Annual Commission Earned", { x: 1.0, y: 6.35, w: 7.5, h: 0.5, fontSize: 13, bold: true, color: DARK, fontFace: "Calibri" });
    s.addText("€3,500/year", { x: 8.7, y: 6.35, w: 3.5, h: 0.5, fontSize: 18, bold: true, color: "059669", align: "right", fontFace: "Calibri" });

    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 8: SCALING POTENTIAL
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "SCALING POTENTIAL");
    s.addText("From one program to multiple channels", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 3, BLUE);

    const scenarios = [
      { title: "Phase 1: Agency Only", desc: "Start with booking confirmation emails. Minimal setup. Validate customer response." },
      { title: "Phase 2: Multi-Channel Expansion", desc: "Airlines, hotels, car rental partners also distribute your DutyCredit. Volume grows." },
      { title: "Phase 3: Premium Tier", desc: "White-label option. Corporate partnerships. Specialized programs for corporate travel." },
    ];

    scenarios.forEach(({ title, desc }, i) => {
      const x = 0.4 + i * 4.25;
      const color = i === 0 ? LIGHT_BLUE_BG : i === 1 ? "F0FDF4" : LIGHT_PURPLE_BG;
      const borderColor = i === 0 ? "DBEAFE" : i === 1 ? "BBF7D0" : "C4B5FD";
      s.addShape("roundRect", { x, y: 1.7, w: 4.05, h: 5.1, fill: { color }, line: { color: borderColor, width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x: x + 0.2, y: 1.95, w: 3.65, h: 0.6, fontSize: 12, bold: true, color: DARK, fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: 2.75, w: 3.65, h: 3.5, fontSize: 11, color: SLATE, fontFace: "Calibri", valign: "top" });
    });

    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 9: INTEGRATION OPTIONS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "INTEGRATION OPTIONS");
    s.addText("Choose what works for your tech stack", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 2.5, BLUE);

    const integrations = [
      { title: "1. Email Distribution", features: ["QR code in transactional email", "Template provided", "No code required", "Lowest setup time"] },
      { title: "2. API Integration", features: ["Programmatic issuance", "Real-time tracking", "Webhook support", "Full control"] },
      { title: "3. White-Label (Premium)", features: ["Custom branding", "Dedicated commission model", "Separate payment terms", "Premium partners only"] },
    ];

    integrations.forEach(({ title, features }, i) => {
      const x = 0.4 + i * 4.25;
      const color = i === 0 ? LIGHT_BLUE_BG : i === 1 ? "F0FDF4" : LIGHT_PURPLE_BG;
      const borderColor = i === 0 ? "DBEAFE" : i === 1 ? "BBF7D0" : "C4B5FD";
      s.addShape("roundRect", { x, y: 1.7, w: 4.05, h: 5.1, fill: { color }, line: { color: borderColor, width: 1 }, rectRadius: 0.15 });
      s.addText(title, { x: x + 0.2, y: 1.95, w: 3.65, h: 0.5, fontSize: 11, bold: true, color: DARK, fontFace: "Calibri" });
      features.forEach((f, j) => {
        s.addText(`• ${f}`, { x: x + 0.2, y: 2.6 + j * 0.7, w: 3.65, h: 0.6, fontSize: 10.5, color: SLATE, fontFace: "Calibri" });
      });
    });

    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 10: CASE STUDY METRICS
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "CASE STUDY: MID-SIZE OTA");
    s.addText("Example: 100k annual bookings", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 2, BLUE);

    const metrics = [
      { category: "Volume", metric: "100,000", sub: "Annual bookings" },
      { category: "Participation", metric: "20%", sub: "Customers opting in" },
      { category: "DutyCredits Issued", metric: "20,000/year", sub: "Per customer " },
      { category: "Avg Value", metric: "€35", sub: "Per DutyCredit" },
      { category: "Annual Spend", metric: "€700,000", sub: "Gross value" },
      { category: "Your Commission", metric: "€3,500", sub: "Annual passive revenue" },
    ];

    metrics.forEach(({ category, metric, sub }, i) => {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const x = 0.4 + col * 6.35;
      const y = 1.7 + row * 1.6;
      
      s.addShape("roundRect", { x, y, w: 6.15, h: 1.4, fill: { color: i % 2 === 0 ? LIGHT_BLUE_BG : "F8FAFC" }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.1 });
      s.addText(category, { x: x + 0.2, y: y + 0.15, w: 5.75, h: 0.3, fontSize: 10, color: SLATE, fontFace: "Calibri" });
      s.addText(metric, { x: x + 0.2, y: y + 0.5, w: 5.75, h: 0.45, fontSize: 16, bold: true, color: BLUE, fontFace: "Calibri" });
      s.addText(sub, { x: x + 0.2, y: y + 1.0, w: 5.75, h: 0.35, fontSize: 9.5, color: SLATE, fontFace: "Calibri" });
    });

    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 11: ROLLOUT PHASES
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "LAUNCH PLAN");
    s.addText("From partnership to scale", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 2, BLUE);

    const phases = [
      {
        phase: "Phase 1: Setup & Pilot",
        timeline: "Week 1-2",
        points: ["Sign partnership agreement", "Receive email template", "Configure commission rate", "Ready to distribute DutyCredits"]
      },
      {
        phase: "Phase 2: Go Live & Monitor",
        timeline: "Week 3-6",
        points: ["Send first batch of DutyCredits", "Track redemption data", "Customer engagement review", "Optimize send strategy"]
      },
      {
        phase: "Phase 3: Expand & Optimize",
        timeline: "Month 2+",
        points: ["Add more distribution channels", "Increase participation rate", "Scale to white-label option", "Recurring revenue grows"]
      }
    ];

    phases.forEach(({ phase, timeline, points }, i) => {
      const x = 0.35 + i * 4.3;
      s.addShape("roundRect", { x, y: 1.7, w: 4.1, h: 5.1, fill: { color: i === 0 ? LIGHT_BLUE_BG : i === 1 ? "F0FDF4" : LIGHT_PURPLE_BG }, line: { color: i === 0 ? "DBEAFE" : i === 1 ? "BBF7D0" : "C4B5FD", width: 1 }, rectRadius: 0.15 });
      s.addText(phase, { x: x + 0.15, y: 1.85, w: 3.8, h: 0.5, fontSize: 12, bold: true, color: DARK, fontFace: "Calibri" });
      s.addText(timeline, { x: x + 0.15, y: 2.35, w: 3.8, h: 0.35, fontSize: 9, color: SLATE, fontFace: "Calibri", italic: true });
      points.forEach((p, j) => {
        s.addText(`• ${p}`, { x: x + 0.2, y: 2.85 + j * 0.68, w: 3.7, h: 0.6, fontSize: 10.5, color: "334155", fontFace: "Calibri" });
      });
    });

    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 12: OUR SUPPORT
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    addSectionLabel(s, "OUR SUPPORT");
    s.addText("You're never alone in this partnership", { x: 0.5, y: 0.75, w: 12.3, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Calibri" });
    addDivider(s, 0.5, 1.5, 3, "059669");

    const support = [
      { icon: "👥", title: "Dedicated Partner Manager", desc: "Your single point of contact. Regular check-ins. Growth strategy together." },
      { icon: "📊", title: "Real-Time Analytics Dashboard", desc: "Track volume, participation rate, redemption data, customer feedback." },
      { icon: "📧", title: "Email Templates & Copy", desc: "Pre-written, tested templates. Customize with your branding." },
      { icon: "🎓", title: "Training & Onboarding", desc: "Staff training. API documentation. Developer support." },
      { icon: "💬", title: "Marketing Support", desc: "Help communicating the benefit to your customers." },
      { icon: "🔒", title: "Compliance & Security", desc: "We handle fraud, chargeback risk, regulatory compliance." },
    ];

    support.forEach(({ icon, title, desc }, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.4 + col * 6.35;
      const y = 1.75 + row * 1.55;
      s.addShape("roundRect", { x, y, w: 6.15, h: 1.35, fill: { color: i % 2 === 0 ? LIGHT_BLUE_BG : "F0FDF4" }, line: { color: i % 2 === 0 ? "DBEAFE" : "BBF7D0", width: 1 }, rectRadius: 0.1 });
      s.addText(`${icon}  ${title}`, { x: x + 0.2, y: y + 0.1, w: 5.8, h: 0.4, fontSize: 12, bold: true, color: DARK, fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.2, y: y + 0.55, w: 5.8, h: 0.65, fontSize: 10.5, color: SLATE, fontFace: "Calibri" });
    });

    addFooter(s);
  }

  // ─────────────────────────────────────────────
  // SLIDE 13: CLOSING CTA
  // ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: WHITE };
    s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 0.08, fill: { color: PURPLE }, line: { color: PURPLE, width: 0 } });
    s.addImage({ path: LOGO_URL, x: 4.9, y: 0.5, w: 3.5, h: 1.3, sizing: { type: "contain", w: 3.5, h: 1.3 } });
    s.addText("Ready to unlock new revenue\nfor your business?", { x: 1, y: 2.1, w: 11.3, h: 1.5, fontSize: 34, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    addDivider(s, 4.5, 3.8, 4.33, ORANGE);
    
    const ctaItems = [
      { label: "Zero Setup Cost", sub: "No integration fees" },
      { label: "Recurring Revenue", sub: "0.5% commission" },
      { label: "No Burden", sub: "We handle everything" },
    ];
    ctaItems.forEach(({ label, sub }, i) => {
      const x = 1.0 + i * 3.8;
      s.addShape("roundRect", { x, y: 4.0, w: 3.5, h: 1.4, fill: { color: LIGHT_BLUE_BG }, line: { color: "DBEAFE", width: 1 }, rectRadius: 0.15 });
      s.addText(label, { x, y: 4.15, w: 3.5, h: 0.45, fontSize: 13, bold: true, color: DARK, align: "center", fontFace: "Calibri" });
      s.addText(sub, { x, y: 4.65, w: 3.5, h: 0.4, fontSize: 11, color: BLUE, align: "center", fontFace: "Calibri" });
    });
    s.addText("hello@dutyboost.com  ·  www.dutyboost.com", { x: 1, y: 5.7, w: 11.3, h: 0.5, fontSize: 15, bold: true, color: BLUE, align: "center", fontFace: "Calibri" });
    s.addText(`© ${new Date().getFullYear()} DutyBoost B.V. · Travel Partner Program`, { x: 1, y: 6.75, w: 11.3, h: 0.3, fontSize: 9, color: SLATE, align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-TravelPartner-Presentation.pptx" });
}