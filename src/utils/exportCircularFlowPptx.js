import pptxgen from "pptxgenjs";

const LOGO_URL = "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/195c01c5f_ChatGPT_Image_May_4__2026__10_58_20_AM-removebg-preview.png";

const BG_DARK = "0F172A";
const BG_MID = "1E3A5F";
const BLUE = "2563EB";
const BLUE_LIGHT = "3B82F6";
const WHITE = "FFFFFF";
const WHITE_DIM = "94A3B8";
const ACCENT = "60A5FA";

const steps = [
  {
    number: 1,
    actor: "Travel Partner",
    subtext: "(Airline, OTA, Accommodation, Car Rental)",
    emoji: "✈️",
    title: "Booking Confirmed",
    description: "A traveller books a flight, hotel, or car rental. The booking confirmation email automatically includes a personalised DutyCredit QR code — no extra steps, no manual work.",
    highlight: "Booking confirmation email includes a personalised DutyCredit QR code.",
    forRetailer: "This is how motivated shoppers are created before they even reach the airport.",
    forPartner: "Every booking you confirm automatically triggers a DutyCredit for your traveller.",
  },
  {
    number: 2,
    actor: "Traveller",
    subtext: "",
    emoji: "📱",
    title: "DutyCredit Received",
    description: "The traveller receives a DutyCredit worth €5–€60 in their booking confirmation email. No app download, no registration. Just a QR code ready to scan at the airport.",
    highlight: "Traveller receives a DutyCredit worth €5–€60 instantly.",
    forRetailer: "These are your incoming customers — pre-qualified, pre-motivated, and credit in hand.",
    forPartner: "Your traveller gets a tangible reward tied to their booking with you.",
  },
  {
    number: 3,
    actor: "Airport Retailer",
    subtext: "",
    emoji: "🛍️",
    title: "Traveller Visits the Store",
    description: "The traveller visits a participating airport retailer and presents their DutyCredit QR code at checkout. The retailer scans it in seconds. The discount is automatically applied on purchases of €70 or more.",
    highlight: "Traveller visits participating retailer → incremental sales generated.",
    forRetailer: "One scan at checkout. You capture sales that would have walked past your door.",
    forPartner: "Your traveller is now actively spending at the airport — thanks to the credit you gave them.",
  },
  {
    number: 4,
    actor: "DutyBoost",
    subtext: "",
    emoji: "⚡",
    title: "Performance-Based Commission",
    description: "DutyBoost receives a small performance-based commission from the retailer — only when a DutyCredit is successfully redeemed. The retailer pays nothing unless DutyBoost delivers an actual sale.",
    highlight: "Retailer only pays upon a successful sale. Zero risk.",
    forRetailer: "You only pay DutyBoost's 2.5% fee (max €25) when we actually deliver a sale.",
    forPartner: "DutyBoost handles all operations — no cost to you, ever.",
  },
  {
    number: 5,
    actor: "Travel Partner",
    subtext: "",
    emoji: "💶",
    title: "Revenue Share Flows Back",
    description: "DutyBoost shares a portion of its commission revenue back to the Travel Partner. This creates a new passive income stream — earned automatically from every DutyCredit redemption linked to their bookings.",
    highlight: "Revenue share flows back to the Travel Partner monthly.",
    forRetailer: "Your purchases directly fund a commission stream for travel partners — strengthening the network that sends you customers.",
    forPartner: "You earn up to €5 per redemption, paid monthly by DutyBoost — out of our own fee.",
  },
  {
    number: 6,
    actor: "Traveller",
    subtext: "",
    emoji: "❤️",
    title: "Better Experience, More Engagement",
    description: "The traveller enjoys a better shopping experience and more value. They associate this positive experience with the travel partner who gave them the DutyCredit — driving more bookings and a stronger ecosystem.",
    highlight: "More engagement → more bookings → stronger ecosystem.",
    forRetailer: "Happy travellers come back — and they remember where they spent their DutyCredit.",
    forPartner: "Travellers who feel rewarded book again. Your brand becomes the reason they loved their airport experience.",
  },
];

const results = [
  "Travellers save money",
  "Retailers increase revenue",
  "Travel partners generate passive income",
  "DutyBoost scales the ecosystem",
  "More travellers engage and spend",
];

export async function exportCircularFlowPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

  // --- SLIDE 1: Cover ---
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };
    s.addImage({ path: LOGO_URL, x: 4.5, y: 0.8, w: 4.3, h: 1.6, sizing: { type: "contain", w: 4.3, h: 1.6 } });
    s.addShape(pptx.ShapeType.roundRect, { x: 3.5, y: 2.8, w: 6.3, h: 0.08, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.05 });
    s.addText("DutyBoost Circular", { x: 1, y: 3.2, w: 11.3, h: 0.9, fontSize: 38, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("Revenue Flow", { x: 1, y: 4.1, w: 11.3, h: 0.9, fontSize: 38, bold: true, color: ACCENT, align: "center", fontFace: "Calibri" });
    s.addText("A self-reinforcing ecosystem that creates value for travellers, retailers, and travel partners.", { x: 1.5, y: 5.2, w: 10.3, h: 0.8, fontSize: 14, color: WHITE_DIM, align: "center", fontFace: "Calibri" });
    s.addText(`© ${new Date().getFullYear()} DutyBoost  |  hello@dutyboost.com`, { x: 1, y: 6.9, w: 11.3, h: 0.4, fontSize: 10, color: "475569", align: "center", fontFace: "Calibri" });
  }

  // --- SLIDES 2-7: Each Step ---
  steps.forEach((step) => {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };

    // Step badge
    s.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 0.3, w: 1.0, h: 0.5, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.1 });
    s.addText(`${step.number} / 6`, { x: 0.5, y: 0.35, w: 1.0, h: 0.4, fontSize: 11, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });

    // Title
    s.addText(step.title, { x: 0.5, y: 1.0, w: 8.0, h: 0.7, fontSize: 30, bold: true, color: WHITE, fontFace: "Calibri" });
    s.addText(`${step.emoji}  ${step.actor}${step.subtext ? "  " + step.subtext : ""}`, { x: 0.5, y: 1.75, w: 8.0, h: 0.4, fontSize: 14, color: ACCENT, fontFace: "Calibri", bold: true });

    // Description
    s.addText(step.description, { x: 0.5, y: 2.4, w: 7.8, h: 1.6, fontSize: 13, color: WHITE_DIM, fontFace: "Calibri", wrap: true });

    // Key Takeaway box
    s.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 4.2, w: 7.8, h: 0.9, fill: { color: BG_MID }, line: { color: BLUE_LIGHT, width: 1 }, rectRadius: 0.12 });
    s.addText("Key Takeaway", { x: 0.7, y: 4.3, w: 3.0, h: 0.3, fontSize: 9, bold: true, color: ACCENT, fontFace: "Calibri", charSpacing: 1 });
    s.addText(step.highlight, { x: 0.7, y: 4.6, w: 7.4, h: 0.4, fontSize: 12, bold: true, color: WHITE, fontFace: "Calibri" });

    // Right panel — For Retailer & Partner
    s.addShape(pptx.ShapeType.roundRect, { x: 8.8, y: 0.3, w: 4.3, h: 3.0, fill: { color: BG_MID }, line: { color: BLUE, width: 1 }, rectRadius: 0.15 });
    s.addText("🛍️  For Retailers", { x: 9.0, y: 0.5, w: 3.9, h: 0.35, fontSize: 10, bold: true, color: ACCENT, fontFace: "Calibri" });
    s.addText(step.forRetailer, { x: 9.0, y: 0.9, w: 3.9, h: 1.1, fontSize: 11, color: WHITE_DIM, fontFace: "Calibri", wrap: true });

    s.addShape(pptx.ShapeType.roundRect, { x: 8.8, y: 3.6, w: 4.3, h: 3.0, fill: { color: BG_MID }, line: { color: "16A34A", width: 1 }, rectRadius: 0.15 });
    s.addText("✈️  For Travel Partners", { x: 9.0, y: 3.8, w: 3.9, h: 0.35, fontSize: 10, bold: true, color: "86EFAC", fontFace: "Calibri" });
    s.addText(step.forPartner, { x: 9.0, y: 4.2, w: 3.9, h: 1.1, fontSize: 11, color: WHITE_DIM, fontFace: "Calibri", wrap: true });

    // Flow dots at bottom
    const dotY = 6.9;
    const totalW = steps.length * 1.5;
    const startX = (13.33 - totalW) / 2;
    steps.forEach((_, i) => {
      const cx = startX + i * 1.5;
      const isActive = i === step.number - 1;
      s.addShape(pptx.ShapeType.ellipse, {
        x: cx, y: dotY, w: isActive ? 0.5 : 0.25, h: isActive ? 0.25 : 0.25,
        fill: { color: isActive ? BLUE_LIGHT : "334155" },
        line: { color: isActive ? BLUE_LIGHT : "334155", width: 0 },
      });
    });
  });

  // --- SLIDE 8: Result ---
  {
    const s = pptx.addSlide();
    s.background = { color: BG_DARK };

    s.addShape(pptx.ShapeType.roundRect, { x: 4.0, y: 0.3, w: 5.3, h: 0.5, fill: { color: "14532D" }, line: { color: "16A34A", width: 1 }, rectRadius: 0.12 });
    s.addText("Result", { x: 4.0, y: 0.35, w: 5.3, h: 0.4, fontSize: 12, bold: true, color: "86EFAC", align: "center", fontFace: "Calibri" });

    s.addText("A Self-Reinforcing", { x: 1, y: 1.1, w: 11.3, h: 0.8, fontSize: 36, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    s.addText("Revenue Ecosystem", { x: 1, y: 1.9, w: 11.3, h: 0.8, fontSize: 36, bold: true, color: "86EFAC", align: "center", fontFace: "Calibri" });
    s.addText("Everyone wins — and the cycle keeps growing.", { x: 1.5, y: 2.9, w: 10.3, h: 0.5, fontSize: 14, color: WHITE_DIM, align: "center", fontFace: "Calibri" });

    results.forEach((label, i) => {
      const x = 0.5 + i * 2.5;
      s.addShape(pptx.ShapeType.roundRect, { x, y: 3.7, w: 2.3, h: 1.8, fill: { color: BG_MID }, line: { color: BLUE, width: 1 }, rectRadius: 0.15 });
      s.addText(label, { x: x + 0.1, y: 3.9, w: 2.1, h: 1.4, fontSize: 11, color: WHITE, align: "center", fontFace: "Calibri", wrap: true });
    });

    s.addShape(pptx.ShapeType.roundRect, { x: 2.0, y: 5.8, w: 9.3, h: 1.3, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.15 });
    s.addText("Ready to join the ecosystem?  |  hello@dutyboost.com  |  dutyboost.com", { x: 2.0, y: 6.05, w: 9.3, h: 0.8, fontSize: 14, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
  }

  await pptx.writeFile({ fileName: "DutyBoost-Circular-Revenue-Flow.pptx" });
}