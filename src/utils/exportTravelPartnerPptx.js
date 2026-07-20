import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";

export async function exportTravelPartnerPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

  // --- SLIDE 1: Cover ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.8, w: 4.0, h: 1.2, sizing: { type: "contain", w: 4.0, h: 1.2 } });
    s.addShape(pptx.ShapeType.line, { x: 4.8, y: 2.3, w: 3.7, h: 0, line: { color: "F97316", width: 3 } });
    s.addText("Add value to your customers.\nEarn commission.", { x: 1.5, y: 2.7, w: 10.3, h: 1.2, fontSize: 36, bold: true, color: "F97316", align: "center", fontFace: "Calibri", breakLine: false });
    s.addText("A white-label loyalty program that delivers exclusive airport\nretail discounts to your travelers and generates recurring commission.", { x: 1.0, y: 4.2, w: 11.3, h: 1.0, fontSize: 14, color: "64748B", align: "center", fontFace: "Calibri" });
  }

  // --- SLIDE 2: The Opportunity ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("THE OPPORTUNITY", { x: 1, y: 0.4, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "1E40AF", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("72% of travelers browse but don't buy at airports", { x: 1, y: 0.95, w: 11.3, h: 0.9, fontSize: 32, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const metrics = [
      { num: "€40B+", label: "Global airport retail\nopportunity" },
      { num: "2.4B", label: "International air\npassengers/year" },
      { num: "72%", label: "Browse but\ndon't buy" },
      { num: "€35–€80", label: "Average airport\nduty-free basket" },
    ];
    metrics.forEach(({ num, label }, i) => {
      const x = 0.5 + i * 3.05;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 2.3, w: 2.9, h: 3.0, fill: { color: "EFF6FF" }, line: { color: "E0E7FF", width: 1 }, rectRadius: 0.12 });
      s.addText(num, { x, y: 2.6, w: 2.9, h: 0.6, fontSize: 20, bold: true, color: "1E40AF", align: "center", fontFace: "Calibri" });
      s.addText(label, { x: x + 0.15, y: 3.4, w: 2.6, h: 1.5, fontSize: 9, color: "64748B", align: "center", fontFace: "Calibri" });
    });

    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 5.5, w: 11.7, h: 0.7, fill: { color: "1E40AF" }, line: { color: "1E40AF", width: 0 }, rectRadius: 0.12 });
    s.addText("DutyBoost helps you convert the 72% who browse — by giving your customers a reason to spend.", { x: 1.1, y: 5.6, w: 11.1, h: 0.5, fontSize: 12, bold: true, color: "FFFFFF", fontFace: "Calibri", valign: "middle" });
  }

  // --- SLIDE 3: Your Value Proposition ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("YOUR VALUE PROPOSITION", { x: 1, y: 0.3, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "10B981", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("DutyCredit: A loyalty tool that drives spending", { x: 1, y: 0.8, w: 11.3, h: 0.6, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
    
    const benefits = [
      { title: "✓ Differentiate Your Platform", desc: "Exclusive benefit your customers won't find elsewhere. Pure competitive advantage." },
      { title: "✓ Improve Customer Loyalty", desc: "Travelers remember the extra value you provided. Higher lifetime value, lower churn." },
      { title: "✓ Increase NPS & Satisfaction", desc: "Give customers what they want: real savings at moments they care about (airports)." },
      { title: "✓ Zero Operational Burden", desc: "We handle retailer relationships, fraud, payouts, customer support. You just send emails." },
      { title: "✓ Generate Recurring Revenue", desc: "Passive commission on every booking. No customer service overhead." },
      { title: "✓ Build Data & Insights", desc: "Understand your traveler behavior at airports. Spending patterns. Channel performance." },
    ];
    let idx = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 2; col++) {
        if (idx < benefits.length) {
          const x = 0.5 + col * 6.15;
          const y = 1.7 + row * 1.75;
          const { title, desc } = benefits[idx];
          const bgColor = idx % 2 === 0 ? "F0F4FF" : "F0FDF4";
          const borderColor = idx % 2 === 0 ? "BFDBFE" : "A7F3D0";
          s.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.9, h: 1.6, fill: { color: bgColor }, line: { color: borderColor, width: 1 }, rectRadius: 0.1 });
          s.addText(title, { x: x + 0.2, y: y + 0.1, w: 5.5, h: 0.4, fontSize: 10, bold: true, color: "0F172A", fontFace: "Calibri" });
          s.addText(desc, { x: x + 0.2, y: y + 0.55, w: 5.5, h: 0.95, fontSize: 9, color: "64748B", fontFace: "Calibri" });
          idx++;
        }
      }
    }
  }

  // --- SLIDE 4: How It Works ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("HOW IT WORKS", { x: 1, y: 0.3, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "1E40AF", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("4-step process for travel partners", { x: 1, y: 0.8, w: 11.3, h: 0.7, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });

    const steps = [
      { num: "1", title: "You issue DutyCredits", desc: "Include QR code in your booking confirmation email. We provide the template." },
      { num: "2", title: "Traveler receives DutyCredit", desc: "Valid from departure day through arrival day. Min. spend €70 to activate." },
      { num: "3", title: "Traveler redeems at airport retail store", desc: "Cashier scans QR. Tiered discount applied automatically. One-time use." },
      { num: "4", title: "You earn commission", desc: "0.5% of gross DutyCredit value. Monthly payouts to your bank account." },
    ];

    let xPos = 0.4;
    steps.forEach(({ num, title, desc }, i) => {
      const w = 2.85;
      s.addShape(pptx.ShapeType.roundRect, { x: xPos, y: 2.0, w, h: 3.8, fill: { color: "EFF6FF" }, line: { color: "BFDBFE", width: 1 }, rectRadius: 0.12 });
      s.addShape(pptx.ShapeType.ellipse, { x: xPos + 1.15, y: 2.2, w: 0.55, h: 0.55, fill: { color: "1E40AF" }, line: { color: "1E40AF", width: 0 } });
      s.addText(num, { x: xPos + 1.15, y: 2.2, w: 0.55, h: 0.55, fontSize: 22, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri", valign: "middle" });
      s.addText(title, { x: xPos + 0.1, y: 2.95, w: w - 0.2, h: 0.6, fontSize: 10, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: xPos + 0.15, y: 3.65, w: w - 0.3, h: 2.05, fontSize: 8.5, color: "64748B", align: "center", fontFace: "Calibri" });
      xPos += w + 0.15;
    });
  }

  // --- SLIDE 5: DutyCredit Discount Tiers ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("DUTYCREDIT DISCOUNT TIERS", { x: 1, y: 0.3, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "10B981", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("What your customers receive — tiered by spend", { x: 1, y: 0.75, w: 11.3, h: 0.6, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });

    s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.6, w: 11.7, h: 4.2, fill: { color: "FFFFFF" }, line: { color: "E0E7FF", width: 1 }, rectRadius: 0.1 });
    
    const tiers = [
      { tier: "Boarding", basket: "€50–€99", saving: "€5–€10", meaning: "Entry-level value. Converts price-conscious travelers." },
      { tier: "Priority", basket: "€100–€199", saving: "€15–€30", meaning: "Most popular tier. Strong conversion incentive for mid-market travelers." },
      { tier: "Lounge", basket: "€200–€299", saving: "€35–€45", meaning: "Premium travelers. Higher basket, bigger savings." },
      { tier: "VIP", basket: "€300+", saving: "€60", meaning: "Top spenders. Flat €60 reward = maximum retailer revenue." },
    ];
    
    // Header
    const cols = [
      { label: "Tier", x: 1.2, w: 2.0 },
      { label: "Min. Basket", x: 3.3, w: 2.0 },
      { label: "Customer Saving", x: 5.4, w: 2.0 },
      { label: "What it means", x: 7.5, w: 4.0 },
    ];
    cols.forEach(({ label, x, w }) => {
      s.addText(label, { x, y: 1.75, w, h: 0.35, fontSize: 10, bold: true, color: "0F172A", fontFace: "Calibri" });
    });

    tiers.forEach(({ tier, basket, saving, meaning }, i) => {
      const y = 2.2 + i * 0.5;
      s.addText(tier, { x: 1.2, y, w: 2.0, h: 0.4, fontSize: 9, color: "0F172A", fontFace: "Calibri" });
      s.addText(basket, { x: 3.3, y, w: 2.0, h: 0.4, fontSize: 9, color: "0F172A", fontFace: "Calibri" });
      s.addText(saving, { x: 5.4, y, w: 2.0, h: 0.4, fontSize: 9, bold: true, color: "1E40AF", fontFace: "Calibri" });
      s.addText(meaning, { x: 7.5, y, w: 4.0, h: 0.4, fontSize: 8.5, color: "64748B", fontFace: "Calibri" });
    });

    s.addShape(pptx.ShapeType.roundRect, { x: 1.0, y: 5.95, w: 11.3, h: 0.5, fill: { color: "FFF7ED" }, line: { color: "FED7AA", width: 1 }, rectRadius: 0.08 });
    s.addText("⚠ Min. €70 basket · Single use · Valid departure through arrival · Auto-applied at checkout", { x: 1.3, y: 6.0, w: 10.7, h: 0.4, fontSize: 9, color: "F97316", bold: true, fontFace: "Calibri", valign: "middle" });
  }

  // --- SLIDE 6: Why Partner with DutyBoost ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("WHY PARTNER WITH DUTYBOOST", { x: 1, y: 0.3, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "1E40AF", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("Your competitive advantage", { x: 1, y: 0.75, w: 11.3, h: 0.6, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });

    const reasons = [
      { icon: "📱", title: "Exclusive Loyalty Tool", desc: "Feature customers won't find in competing platforms. Pure differentiation." },
      { icon: "💰", title: "Recurring Revenue Stream", desc: "0.5% commission per booking — passive income that scales with your volume." },
      { icon: "❤️", title: "Increase Customer Stickiness", desc: "Customers remember and value the extra benefit. Lower churn, higher LTV." },
      { icon: "⚡", title: "Zero Integration Burden", desc: "Email-based delivery. No API required. We handle all the complexity." },
      { icon: "📊", title: "Data & Insights", desc: "Understand traveler behavior. Real-time analytics. Performance dashboards." },
      { icon: "🎨", title: "White-Label Option", desc: "Premium partners can brand DutyCredit as their own. Custom commission models." },
    ];

    let idx = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 2; col++) {
        if (idx < reasons.length) {
          const x = 0.5 + col * 6.15;
          const y = 1.6 + row * 1.7;
          const { icon, title, desc } = reasons[idx];
          s.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.9, h: 1.55, fill: { color: "F0FDF4" }, line: { color: "A7F3D0", width: 1 }, rectRadius: 0.1 });
          s.addText(icon, { x: x + 0.15, y: y + 0.05, w: 0.4, h: 0.35, fontSize: 16, align: "center", fontFace: "Calibri" });
          s.addText(title, { x: x + 0.65, y: y + 0.08, w: 5.1, h: 0.35, fontSize: 9.5, bold: true, color: "0F172A", fontFace: "Calibri" });
          s.addText(desc, { x: x + 0.15, y: y + 0.5, w: 5.6, h: 0.95, fontSize: 8, color: "64748B", fontFace: "Calibri" });
          idx++;
        }
      }
    }
  }

  // --- SLIDE 7: Revenue Model ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("REVENUE MODEL", { x: 1, y: 0.3, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "10B981", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("How you earn commission", { x: 1, y: 0.75, w: 11.3, h: 0.6, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });

    s.addShape(pptx.ShapeType.roundRect, { x: 1.0, y: 1.6, w: 11.3, h: 4.5, fill: { color: "F0FDF4" }, line: { color: "A7F3D0", width: 1 }, rectRadius: 0.12 });
    s.addText("Commission Calculation (Mid-size OTA Example)", { x: 1.4, y: 1.8, w: 10.5, h: 0.3, fontSize: 11, bold: true, color: "059669", fontFace: "Calibri" });

    const metrics = [
      { label: "Annual bookings issued", val: "100,000" },
      { label: "Participation rate", val: "20%" },
      { label: "DutyCredits issued", val: "20,000" },
      { label: "Average DutyCredit value", val: "€35" },
      { label: "Total gross spend", val: "€700,000" },
      { label: "Commission rate", val: "0.5%" },
    ];
    
    let yPos = 2.25;
    metrics.forEach(({ label, val }) => {
      s.addText(label, { x: 1.6, y: yPos, w: 7.0, h: 0.35, fontSize: 10, color: "0F172A", fontFace: "Calibri" });
      s.addText(val, { x: 9.5, y: yPos, w: 2.5, h: 0.35, fontSize: 10, bold: true, color: "059669", align: "right", fontFace: "Calibri" });
      yPos += 0.4;
    });

    s.addShape(pptx.ShapeType.line, { x: 1.6, y: 4.6, w: 10.5, h: 0, line: { color: "10B981", width: 2 } });
    
    s.addText("Annual Commission Earned", { x: 1.6, y: 4.75, w: 7.0, h: 0.4, fontSize: 11, bold: true, color: "0F172A", fontFace: "Calibri" });
    s.addText("€3,500/year", { x: 9.5, y: 4.75, w: 2.5, h: 0.4, fontSize: 12, bold: true, color: "10B981", align: "right", fontFace: "Calibri" });
  }

  // --- SLIDE 8: Scaling Potential ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("SCALING POTENTIAL", { x: 1, y: 0.3, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "1E40AF", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("From one program to multiple channels", { x: 1, y: 0.75, w: 11.3, h: 0.6, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });

    const phases = [
      { title: "Phase 1: Agency Only", desc: "Start with booking confirmation emails. Minimal setup. Validate customer response.", bg: "EFF6FF", border: "BFDBFE" },
      { title: "Phase 2: Multi-Channel Expansion", desc: "Airlines, hotels, car rental partners also distribute your DutyCredit. Volume grows.", bg: "F0FDF4", border: "A7F3D0" },
      { title: "Phase 3: Premium Tier", desc: "White-label option. Corporate partnerships. Specialized programs for corporate travel.", bg: "FAF5FF", border: "E9D5FF" },
    ];

    let xPos = 0.5;
    phases.forEach(({ title, desc, bg, border }) => {
      const w = 3.7;
      s.addShape(pptx.ShapeType.roundRect, { x: xPos, y: 1.7, w, h: 3.7, fill: { color: bg }, line: { color: border, width: 1 }, rectRadius: 0.12 });
      s.addText(title, { x: xPos + 0.2, y: 1.95, w: w - 0.4, h: 0.6, fontSize: 10, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: xPos + 0.2, y: 2.65, w: w - 0.4, h: 2.6, fontSize: 9, color: "64748B", align: "center", fontFace: "Calibri" });
      xPos += w + 0.25;
    });
  }

  // --- SLIDE 9: Launch Plan ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("LAUNCH PLAN", { x: 1, y: 0.3, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "1E40AF", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("From partnership to scale", { x: 1, y: 0.75, w: 11.3, h: 0.6, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });

    const phases = [
      { title: "Phase 1: Setup & Pilot", timeline: "Week 1-2", items: ["Sign partnership agreement", "Receive email template", "Configure commission rate", "Ready to distribute DutyCredits"], bg: "EFF6FF", border: "BFDBFE" },
      { title: "Phase 2: Go Live & Monitor", timeline: "Week 3-6", items: ["Send first batch of DutyCredits", "Track redemption data", "Customer engagement review", "Optimize send strategy"], bg: "F0FDF4", border: "A7F3D0" },
      { title: "Phase 3: Expand & Optimize", timeline: "Month 2+", items: ["Add more distribution channels", "Increase participation rate", "Scale to white-label option", "Recurring revenue grows"], bg: "FAF5FF", border: "E9D5FF" },
    ];

    let xPos = 0.4;
    phases.forEach(({ title, timeline, items, bg, border }) => {
      const w = 3.7;
      s.addShape(pptx.ShapeType.roundRect, { x: xPos, y: 1.6, w, h: 4.5, fill: { color: bg }, line: { color: border, width: 1 }, rectRadius: 0.12 });
      s.addText(title, { x: xPos + 0.15, y: 1.85, w: w - 0.3, h: 0.45, fontSize: 10, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });
      s.addText(timeline, { x: xPos + 0.15, y: 2.3, w: w - 0.3, h: 0.3, fontSize: 8, italic: true, color: "64748B", align: "center", fontFace: "Calibri" });
      let yItem = 2.75;
      items.forEach(item => {
        s.addText(`• ${item}`, { x: xPos + 0.2, y: yItem, w: w - 0.4, h: 0.35, fontSize: 8, color: "64748B", fontFace: "Calibri" });
        yItem += 0.45;
      });
      xPos += w + 0.3;
    });
  }

  // --- SLIDE 10: Our Support ---
  {
    const s = pptx.addSlide();
    s.background = { color: "FFFFFF" };
    s.addText("OUR SUPPORT", { x: 1, y: 0.3, w: 11.3, h: 0.3, fontSize: 10, bold: true, color: "10B981", align: "center", fontFace: "Calibri", charSpacing: 2 });
    s.addText("You're never alone in this partnership", { x: 1, y: 0.75, w: 11.3, h: 0.6, fontSize: 28, bold: true, color: "0F172A", align: "center", fontFace: "Calibri" });

    const support = [
      { icon: "👤", title: "Dedicated Partner Manager", desc: "Your single point of contact. Regular check-ins. Growth strategy together." },
      { icon: "📊", title: "Real-Time Analytics Dashboard", desc: "Track volume, participation rate, redemption data, customer feedback." },
      { icon: "📧", title: "Email Templates & Copy", desc: "Pre-written, tested templates. Customize with your branding." },
      { icon: "🎓", title: "Training & Onboarding", desc: "Staff training. API documentation. Developer support." },
      { icon: "📢", title: "Marketing Support", desc: "Help communicating the benefit to your customers." },
      { icon: "🔒", title: "Compliance & Security", desc: "We handle fraud, chargeback risk, regulatory compliance." },
    ];

    let idx = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 2; col++) {
        if (idx < support.length) {
          const x = 0.5 + col * 6.15;
          const y = 1.6 + row * 1.7;
          const { icon, title, desc } = support[idx];
          s.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.9, h: 1.55, fill: { color: "F0FDF4" }, line: { color: "A7F3D0", width: 1 }, rectRadius: 0.1 });
          s.addText(icon, { x: x + 0.15, y: y + 0.05, w: 0.4, h: 0.35, fontSize: 16, align: "center", fontFace: "Calibri" });
          s.addText(title, { x: x + 0.65, y: y + 0.08, w: 5.1, h: 0.35, fontSize: 9.5, bold: true, color: "0F172A", fontFace: "Calibri" });
          s.addText(desc, { x: x + 0.15, y: y + 0.5, w: 5.6, h: 0.95, fontSize: 8, color: "64748B", fontFace: "Calibri" });
          idx++;
        }
      }
    }
  }

  // --- SLIDE 11: CTA ---
  {
    const s = pptx.addSlide();
    s.background = { color: "1E40AF" };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.4, w: 4.0, h: 1.2, sizing: { type: "contain", w: 4.0, h: 1.2 } });
    s.addText("Ready to unlock new revenue\nfor your business?", { x: 1, y: 2.1, w: 11.3, h: 1.2, fontSize: 36, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri", breakLine: false });
    
    const ctaBenefits = [
      { title: "Zero Setup Cost", desc: "No integration fees" },
      { title: "Recurring Revenue", desc: "0.5% commission" },
      { title: "No Burden", desc: "We handle everything" },
    ];
    let ctaX = 0.8;
    ctaBenefits.forEach(({ title, desc }) => {
      s.addShape(pptx.ShapeType.roundRect, { x: ctaX, y: 3.7, w: 3.4, h: 1.4, fill: { color: "FFFFFF", transparency: 10 }, line: { color: "FFFFFF44", width: 1 }, rectRadius: 0.1 });
      s.addText(title, { x: ctaX + 0.2, y: 3.85, w: 3.0, h: 0.4, fontSize: 11, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: ctaX + 0.2, y: 4.3, w: 3.0, h: 0.7, fontSize: 9, color: "E0E7FF", align: "center", fontFace: "Calibri" });
      ctaX += 3.6;
    });

    s.addText("hello@dutyboost.com · www.dutyboost.com", { x: 1, y: 5.5, w: 11.3, h: 0.4, fontSize: 13, bold: true, color: "FFFFFF", align: "center", fontFace: "Calibri" });
    s.addText(`© 2026 DutyBoost B.V. · Travel Partner Program`, { x: 1, y: 6.7, w: 11.3, h: 0.35, fontSize: 9, color: "E0E7FF", align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-For-Travel-Partners.pptx" });
}