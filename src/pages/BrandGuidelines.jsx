import { useState } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";

// ─── Brand tokens (from index.css / tailwind.config.js) ───────────────────────
const COLORS = [
  { name: "Primary Blue",       hex: "#1A5FFF", usage: "CTAs, links, highlights" },
  { name: "Accent Orange",      hex: "#FF7A00", usage: "Secondary actions, badges" },
  { name: "Background",         hex: "#F4F6FB", usage: "Page background" },
  { name: "Card White",         hex: "#FFFFFF", usage: "Cards, surfaces" },
  { name: "Foreground",         hex: "#0D1524", usage: "Body text, headings" },
  { name: "Muted Foreground",   hex: "#6B7590", usage: "Subtext, placeholders" },
  { name: "Border",             hex: "#D8DDE8", usage: "Dividers, input borders" },
  { name: "Destructive Red",    hex: "#DC2626", usage: "Errors, alerts" },
  { name: "Chart Green",        hex: "#00C478", usage: "Positive metrics, charts" },
  { name: "Chart Purple",       hex: "#8B5CF6", usage: "Charts, highlights" },
];

const TYPOGRAPHY = [
  { role: "Display / Heading", family: "Space Grotesk", weight: "700 Bold", size: "48–72px", usage: "Hero headlines, section titles" },
  { role: "Subheading",        family: "Space Grotesk", weight: "600 SemiBold", size: "24–36px", usage: "Card headings, feature titles" },
  { role: "Body",              family: "Inter",          weight: "400 Regular", size: "16px", usage: "Paragraph text, descriptions" },
  { role: "Body Strong",       family: "Inter",          weight: "500 Medium", size: "16px", usage: "Labels, emphasized body copy" },
  { role: "Small / Caption",   family: "Inter",          weight: "400 Regular", size: "12–14px", usage: "Metadata, footnotes, badges" },
  { role: "Button",            family: "Inter",          weight: "600 SemiBold", size: "14–16px", usage: "All interactive buttons" },
];

const SPACING = [
  { token: "xs",  px: "4px",  use: "Icon gaps, tight padding" },
  { token: "sm",  px: "8px",  use: "Compact UI elements" },
  { token: "md",  px: "16px", use: "Standard padding, card gaps" },
  { token: "lg",  px: "24px", use: "Section inner padding" },
  { token: "xl",  px: "32px", use: "Card padding, section spacing" },
  { token: "2xl", px: "48px", use: "Section vertical spacing" },
  { token: "3xl", px: "64px", use: "Hero spacing, page sections" },
];

const RADIUS = [
  { token: "sm",  px: "10px", use: "Badges, small chips" },
  { token: "md",  px: "10px", use: "Inputs, smaller cards" },
  { token: "lg",  px: "12px", use: "Cards, modals" },
  { token: "xl",  px: "16px", use: "Feature cards" },
  { token: "2xl", px: "24px", use: "Hero blocks, CTA banners" },
  { token: "full","px": "9999px", use: "Pill buttons, avatars" },
];

// ─── PDF generator ─────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function generatePDF() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, H = 297;
  const margin = 18;
  const contentW = W - margin * 2;

  const PRIMARY   = [26, 95, 255];
  const ORANGE    = [255, 122, 0];
  const DARK      = [13, 21, 36];
  const GREY      = [107, 117, 144];
  const LIGHTGREY = [216, 221, 232];
  const WHITE     = [255, 255, 255];
  const BG        = [244, 246, 251];

  let y = 0;

  const addPage = () => { doc.addPage(); y = margin; };

  const drawHeader = (title, subtitle) => {
    // Top bar
    doc.setFillColor(...PRIMARY);
    doc.rect(0, 0, W, 18, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...WHITE);
    doc.text("DutyBoost  —  Brand Guidelines", margin, 11);
    doc.text("© 2026 DutyBoost", W - margin, 11, { align: "right" });

    // Section heading block
    doc.setFillColor(...BG);
    doc.rect(0, 18, W, 38, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...DARK);
    doc.text(title, margin, 40);
    if (subtitle) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...GREY);
      doc.text(subtitle, margin, 50);
    }
    // Accent bar
    doc.setFillColor(...PRIMARY);
    doc.rect(margin, 54, 32, 2, "F");
    doc.setFillColor(...ORANGE);
    doc.rect(margin + 34, 54, 12, 2, "F");

    y = 66;
  };

  const footerLine = (pageNum) => {
    doc.setFillColor(...LIGHTGREY);
    doc.rect(0, H - 12, W, 12, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...GREY);
    doc.text("DutyBoost  |  KvK 42053088  |  hello@dutyboost.com  |  dutyboost.com", W / 2, H - 5, { align: "center" });
    doc.text(`Page ${pageNum}`, W - margin, H - 5, { align: "right" });
  };

  // ── PAGE 1: Cover ──────────────────────────────────────────────────────────
  // Dark hero background
  doc.setFillColor(...DARK);
  doc.rect(0, 0, W, H, "F");

  // Decorative circles
  doc.setFillColor(26, 95, 255, 0.15);
  doc.setDrawColor(26, 95, 255);
  doc.setLineWidth(0);
  doc.circle(W - 20, 40, 60, "F");
  doc.setFillColor(255, 122, 0);
  doc.circle(20, H - 30, 40, "F");

  // Cover content
  doc.setFont("helvetica", "bold");
  doc.setFontSize(42);
  doc.setTextColor(...WHITE);
  doc.text("DutyBoost", margin, 100);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.setTextColor(...ORANGE);
  doc.text("Brand Guidelines", margin, 116);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(180, 190, 210);
  doc.text("Colors · Typography · Spacing · Radius · Design Principles", margin, 132);

  doc.setFillColor(...LIGHTGREY);
  doc.rect(margin, 140, 60, 0.4, "F");

  doc.setFontSize(9);
  doc.setTextColor(130, 140, 160);
  doc.text("Version 1.0  —  June 2026", margin, 150);
  doc.text("DutyBoost  |  The Travel Retail Conversion Layer", margin, 158);

  footerLine(1);

  // ── PAGE 2: Color Palette ──────────────────────────────────────────────────
  addPage();
  drawHeader("Color Palette", "Brand colors with hex values and usage guidelines");

  const colPerRow = 3;
  const swatchW = (contentW - (colPerRow - 1) * 6) / colPerRow;
  const swatchH = 28;

  COLORS.forEach((c, i) => {
    const col = i % colPerRow;
    const row = Math.floor(i / colPerRow);
    const x = margin + col * (swatchW + 6);
    const cy = y + row * (swatchH + 22);

    // Swatch
    const rgb = hexToRgb(c.hex);
    doc.setFillColor(...rgb);
    doc.roundedRect(x, cy, swatchW, swatchH, 3, 3, "F");

    // Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...DARK);
    doc.text(c.name, x, cy + swatchH + 7);

    // Hex
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...GREY);
    doc.text(c.hex, x, cy + swatchH + 13);

    // Usage
    doc.setFontSize(7);
    doc.text(c.usage, x, cy + swatchH + 19, { maxWidth: swatchW });
  });

  footerLine(2);

  // ── PAGE 3: Typography ─────────────────────────────────────────────────────
  addPage();
  drawHeader("Typography", "Type system built on Space Grotesk (headings) and Inter (body)");

  // Font intro boxes
  const fontBoxW = (contentW - 6) / 2;
  const fonts = [
    { name: "Space Grotesk", role: "Heading Font", sample: "AaBbCcDd", weight: "Bold · SemiBold" },
    { name: "Inter",          role: "Body Font",    sample: "AaBbCcDd", weight: "Regular · Medium · SemiBold" },
  ];
  fonts.forEach((f, i) => {
    const fx = margin + i * (fontBoxW + 6);
    doc.setFillColor(...BG);
    doc.roundedRect(fx, y, fontBoxW, 28, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...DARK);
    doc.text(f.sample, fx + 6, y + 13);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(f.name, fx + 6, y + 21);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...GREY);
    doc.text(`${f.role}  ·  ${f.weight}`, fx + 6, y + 26);
  });
  y += 36;

  // Type scale table header
  const tCols = [38, 32, 22, 24, contentW - 38 - 32 - 22 - 24];
  const tHeaders = ["Role", "Family", "Weight", "Size", "Usage"];
  doc.setFillColor(...PRIMARY);
  doc.rect(margin, y, contentW, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...WHITE);
  let tx = margin + 3;
  tHeaders.forEach((h, i) => { doc.text(h, tx, y + 5.5); tx += tCols[i]; });
  y += 8;

  TYPOGRAPHY.forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 248 : 255, idx % 2 === 0 ? 249 : 255, idx % 2 === 0 ? 252 : 255);
    doc.rect(margin, y, contentW, 9, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...DARK);
    tx = margin + 3;
    doc.text(row.role, tx, y + 6); tx += tCols[0];
    doc.setFont("helvetica", "normal");
    doc.text(row.family, tx, y + 6); tx += tCols[1];
    doc.text(row.weight, tx, y + 6); tx += tCols[2];
    doc.text(row.size, tx, y + 6); tx += tCols[3];
    doc.text(row.usage, tx, y + 6, { maxWidth: tCols[4] - 3 });
    y += 9;
  });

  footerLine(3);

  // ── PAGE 4: Spacing & Radius ───────────────────────────────────────────────
  addPage();
  drawHeader("Spacing & Border Radius", "Consistent scale for layout, padding and component rounding");

  // Spacing section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text("Spacing Scale", margin, y);
  y += 8;

  const spCols = [20, 20, contentW - 40];
  const spHeaders = ["Token", "Value", "Usage"];
  doc.setFillColor(...PRIMARY);
  doc.rect(margin, y, contentW, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...WHITE);
  tx = margin + 3;
  spHeaders.forEach((h, i) => { doc.text(h, tx, y + 5.5); tx += spCols[i]; });
  y += 8;

  SPACING.forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 248 : 255, idx % 2 === 0 ? 249 : 255, idx % 2 === 0 ? 252 : 255);
    doc.rect(margin, y, contentW, 8, "F");
    // Visual bar
    const barW = parseInt(row.px) * 0.55;
    doc.setFillColor(...PRIMARY);
    doc.rect(margin + 3, y + 2.5, barW, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...DARK);
    tx = margin + 3;
    doc.text(row.token, tx + Math.max(barW + 2, 14), y + 6); tx += spCols[0];
    doc.setFont("helvetica", "normal");
    doc.text(row.px, tx, y + 6); tx += spCols[1];
    doc.setTextColor(...GREY);
    doc.text(row.use, tx, y + 6);
    doc.setTextColor(...DARK);
    y += 8;
  });

  y += 12;

  // Border Radius section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text("Border Radius Scale", margin, y);
  y += 8;

  const radBoxW = (contentW - RADIUS.length * 4) / RADIUS.length;
  RADIUS.forEach((r, i) => {
    const rx = margin + i * (radBoxW + 4);
    const radius = Math.min(parseFloat(r.px), radBoxW / 2);
    doc.setFillColor(...PRIMARY);
    doc.setDrawColor(...PRIMARY);
    doc.roundedRect(rx, y, radBoxW, 18, radius > 100 ? radBoxW / 2 : radius, radius > 100 ? 9 : radius, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...DARK);
    doc.text(r.token, rx + radBoxW / 2, y + 26, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...GREY);
    doc.text(r.px, rx + radBoxW / 2, y + 32, { align: "center" });
    doc.setFontSize(6.5);
    doc.text(r.use, rx + radBoxW / 2, y + 37, { align: "center", maxWidth: radBoxW + 2 });
  });
  y += 50;

  footerLine(4);

  // ── PAGE 5: Design Principles ──────────────────────────────────────────────
  addPage();
  drawHeader("Design Principles", "Core values that guide every DutyBoost product decision");

  const principles = [
    { title: "Clarity First",         icon: "◈", body: "Every interface should communicate its purpose instantly. Avoid visual noise. Use hierarchy, white space, and consistent type to lead the eye to what matters most." },
    { title: "Trust Through Consistency", icon: "◇", body: "Use the same tokens, components, and patterns everywhere. Consistent design builds trust — partners and travellers should always feel they are in the DutyBoost world." },
    { title: "Performance-Oriented",  icon: "◎", body: "DutyBoost is a commission-only, results-driven product. The UI reflects this: KPIs are prominent, actions are clear, and friction is minimised at every step." },
    { title: "Mobile-Ready Always",   icon: "◉", body: "Retailers scan QR codes on mobile, travellers check credits on mobile. Every component is designed mobile-first and tested at 375px before desktop." },
    { title: "Color with Purpose",    icon: "◆", body: "Primary blue signals trust and action. Accent orange signals energy and opportunity. Never use color decoratively — it should always carry semantic meaning." },
    { title: "Accessible & Inclusive",icon: "◐", body: "All text meets WCAG AA contrast ratios. Interactive elements have visible focus states. The platform serves users across 6 languages and multiple cultures." },
  ];

  principles.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bW = (contentW - 6) / 2;
    const bH = 38;
    const bx = margin + col * (bW + 6);
    const by = y + row * (bH + 6);

    doc.setFillColor(...BG);
    doc.roundedRect(bx, by, bW, bH, 3, 3, "F");
    doc.setFillColor(...PRIMARY);
    doc.roundedRect(bx, by, 3, bH, 1, 1, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...DARK);
    doc.text(`${p.icon}  ${p.title}`, bx + 8, by + 9);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...GREY);
    const lines = doc.splitTextToSize(p.body, bW - 14);
    doc.text(lines, bx + 8, by + 16);
  });

  y += 3 * (38 + 6) + 14;

  // Logo usage note
  doc.setFillColor(13, 21, 36);
  doc.roundedRect(margin, y, contentW, 28, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...WHITE);
  doc.text("Logo Usage", margin + 8, y + 10);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(180, 190, 210);
  doc.text("Always use the official SVG logo on light backgrounds. Use the white/inverted version on dark or colored backgrounds.", margin + 8, y + 18, { maxWidth: contentW - 16 });
  doc.text("Minimum size: 80px wide. Maintain clear space equal to the height of the 'D' on all sides.", margin + 8, y + 24, { maxWidth: contentW - 16 });

  footerLine(5);

  // ── Add page numbers to cover ──────────────────────────────────────────────
  doc.setPage(1);
  footerLine(1);

  const totalPages = doc.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    // footer already added per page above
  }

  doc.save("DutyBoost_Brand_Guidelines.pdf");
}

// ─── Page UI ──────────────────────────────────────────────────────────────────
export default function BrandGuidelines() {
  const [generating, setGenerating] = useState(false);

  const handleDownload = () => {
    setGenerating(true);
    setTimeout(() => {
      generatePDF();
      setGenerating(false);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={50} /></Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-14">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-heading font-bold text-foreground">Brand Guidelines</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">DutyBoost design system — colors, typography, spacing, and principles.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={handleDownload} disabled={generating} size="lg" className="gap-2 px-8">
              {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...</> : <><Download className="w-4 h-4" /> Download PDF</>}
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 px-8">
              <Link to="/business-card-rael">Business Card</Link>
            </Button>
          </div>
        </div>

        {/* Color Palette */}
        <section className="space-y-5">
          <h2 className="text-2xl font-heading font-bold text-foreground border-b border-border pb-3">Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {COLORS.map(c => (
              <div key={c.hex} className="space-y-2">
                <div className="h-16 rounded-xl border border-border shadow-sm" style={{ backgroundColor: c.hex }} />
                <p className="font-semibold text-sm text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{c.hex}</p>
                <p className="text-xs text-muted-foreground">{c.usage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-5">
          <h2 className="text-2xl font-heading font-bold text-foreground border-b border-border pb-3">Typography</h2>
          <div className="grid gap-3">
            {TYPOGRAPHY.map(t => (
              <div key={t.role} className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="sm:w-44 shrink-0">
                  <p className="font-semibold text-sm text-foreground">{t.role}</p>
                  <p className="text-xs text-muted-foreground">{t.family}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{t.weight} · {t.size}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.usage}</p>
                </div>
                <div className="sm:w-56 shrink-0">
                  <p style={{ fontFamily: t.family === "Space Grotesk" ? "'Space Grotesk', sans-serif" : "'Inter', sans-serif", fontWeight: t.weight.startsWith("7") ? 700 : t.weight.startsWith("6") ? 600 : t.weight.startsWith("5") ? 500 : 400 }} className="text-foreground text-lg">
                    The quick brown fox
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-5">
          <h2 className="text-2xl font-heading font-bold text-foreground border-b border-border pb-3">Spacing Scale</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {SPACING.map(s => (
              <div key={s.token} className="text-center space-y-2">
                <div className="bg-primary/10 rounded-lg flex items-end justify-center p-2" style={{ height: "60px" }}>
                  <div className="bg-primary rounded" style={{ width: "100%", height: s.px }} />
                </div>
                <p className="font-semibold text-sm text-foreground">{s.token}</p>
                <p className="text-xs text-muted-foreground font-mono">{s.px}</p>
                <p className="text-xs text-muted-foreground">{s.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section className="space-y-5">
          <h2 className="text-2xl font-heading font-bold text-foreground border-b border-border pb-3">Border Radius</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {RADIUS.map(r => (
              <div key={r.token} className="text-center space-y-2">
                <div className="h-16 bg-primary flex items-center justify-center mx-auto w-full" style={{ borderRadius: r.px }}>
                  <span className="text-white text-xs font-semibold">{r.token}</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">{r.px}</p>
                <p className="text-xs text-muted-foreground">{r.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Design Principles */}
        <section className="space-y-5">
          <h2 className="text-2xl font-heading font-bold text-foreground border-b border-border pb-3">Design Principles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Clarity First", body: "Every interface should communicate its purpose instantly. Use hierarchy, white space, and consistent type to lead the eye to what matters most." },
              { title: "Trust Through Consistency", body: "Use the same tokens, components, and patterns everywhere. Consistent design builds trust with partners and travellers across all touchpoints." },
              { title: "Performance-Oriented", body: "KPIs are prominent, actions are clear, and friction is minimised. DutyBoost is a results-driven product — the UI reflects that." },
              { title: "Mobile-Ready Always", body: "Every component is designed mobile-first and tested at 375px. Retailers scan QR codes on mobile; travellers check credits on mobile." },
              { title: "Color with Purpose", body: "Primary blue signals trust and action. Accent orange signals energy and opportunity. Never use color decoratively — it carries semantic meaning." },
              { title: "Accessible & Inclusive", body: "All text meets WCAG AA contrast ratios. Interactive elements have visible focus states. The platform serves users across 6 languages." },
            ].map(p => (
              <div key={p.title} className="bg-card border border-border rounded-xl p-6 border-l-4 border-l-primary">
                <h3 className="font-heading font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Download CTA */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 text-center text-white space-y-4">
          <h2 className="text-3xl font-heading font-bold">Ready to use the guidelines?</h2>
          <p className="text-white/80">Download the full brand guidelines as a PDF to share with your team or agency.</p>
          <Button onClick={handleDownload} disabled={generating} size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8">
            {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Download className="w-4 h-4" /> Download Brand Guidelines PDF</>}
          </Button>
        </div>
      </div>
    </div>
  );
}