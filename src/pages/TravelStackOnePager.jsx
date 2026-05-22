import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Check } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import HotelIcon from "../components/HotelIcon";
import CarRentalIcon from "../components/CarRentalIcon";

const GradientDivider = () => (
  <div style={{ height: '2px', background: 'linear-gradient(to right, #1A6BFF, #8b5cf6, #FF8000)', width: '100%' }} />
);

const VERTICALS = [
  {
    key: "flight",
    icon: TravelAgencyIcon,
    color: "#1A6BFF",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    label: "✈️ Flight",
    credits: "1 DutyCredit",
    creditDesc: "at booking",
    steps: [
      { title: "At Booking", desc: "Guest receives a DutyCredit QR in their flight confirmation email." },
    ],
  },
  {
    key: "accommodation",
    icon: HotelIcon,
    color: "#8b5cf6",
    bgColor: "#f5f3ff",
    borderColor: "#ddd6fe",
    label: "🏨 Accommodation",
    credits: "2 DutyCredits",
    creditDesc: "at booking & check-out",
    steps: [
      { title: "At Booking", desc: "Guest receives a DutyCredit QR in their accommodation confirmation email." },
      { title: "At Check-Out", desc: "A second DutyCredit is automatically sent in the check-out email." },
    ],
  },
  {
    key: "car",
    icon: CarRentalIcon,
    color: "#FF8000",
    bgColor: "#fff7ed",
    borderColor: "#fed7aa",
    label: "🚗 Car Rental",
    credits: "2 DutyCredits",
    creditDesc: "at booking & car return",
    steps: [
      { title: "At Booking", desc: "Customer receives a DutyCredit QR in their car rental confirmation email." },
      { title: "At Car Return", desc: "A second DutyCredit is automatically sent in the car return email." },
    ],
  },
];

export default function TravelStackOnePager() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState({ flight: true, accommodation: true, car: true });

  const activeVerticals = VERTICALS.filter((v) => selected[v.key]);

  const toggleVertical = (key) => {
    const next = { ...selected, [key]: !selected[key] };
    // ensure at least 2 selected
    if (Object.values(next).filter(Boolean).length >= 2) {
      setSelected(next);
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.querySelector(".print-content");
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF("p", "mm", "a4", { compress: true });
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("travelstack-partner-one-pager.pdf");
  };

  return (
    <div className="min-h-screen font-body" style={{ background: "linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(270 40% 96%) 50%, hsl(30 55% 96%) 100%)", backgroundAttachment: "fixed" }}>
      {/* Toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("common.back")}
          </button>
        </Link>

        {/* Vertical selector — only shows outside print */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium hidden sm:block">Select verticals:</span>
          {VERTICALS.map((v) => {
            const Icon = v.icon;
            const isOn = selected[v.key];
            return (
              <button
                key={v.key}
                onClick={() => toggleVertical(v.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                  isOn ? "text-white border-transparent" : "bg-white text-muted-foreground border-border"
                }`}
                style={isOn ? { background: v.color, borderColor: v.color } : {}}
              >
                {isOn && <Check className="w-3 h-3" />}
                <Icon className="w-3 h-3" />
                {v.label.split(" ")[1]}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button onClick={handleDownloadPDF} className="gap-2 text-white" style={{ background: "linear-gradient(to right, #1A6BFF, #8b5cf6, #FF8000)" }}>
            <Printer className="w-4 h-4" /> {t("common.download")}
          </Button>
        </div>
      </div>

      {/* A4 content */}
      <div
        className="print-content max-w-[794px] mx-auto px-8 py-3 print:py-0 print:px-0 bg-white flex flex-col"
        style={{ minHeight: "1122px", maxHeight: "1122px", overflow: "hidden" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <DutyBoostLogo height={120} />
          <div className="text-right">
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white" style={{ background: "linear-gradient(to right, #1A6BFF, #8b5cf6, #FF8000)" }}>
              TravelStack Partner Programme
            </span>
            <div className="flex items-center gap-1.5 justify-end mt-1">
              {VERTICALS.map((v) => {
                const Icon = v.icon;
                return selected[v.key] ? (
                  <Icon key={v.key} className="w-4 h-4" style={{ color: v.color }} />
                ) : null;
              })}
            </div>
          </div>
        </div>
        <GradientDivider />

        <div className="flex-1 flex flex-col justify-between">
          {/* Headline */}
          <div className="text-center py-2">
            <h1 className="text-base font-heading font-bold leading-tight">
              Reward Your Customers at Every Touchpoint — and Earn a New Revenue Stream
            </h1>
            <p className="text-muted-foreground text-xs max-w-2xl mx-auto mt-0.5">
              DutyBoost's TravelStack Programme lets{" "}
              {activeVerticals.map((v, i) => {
                const Icon = v.icon;
                return (
                  <span key={v.key} className="inline-flex items-center gap-0.5 font-semibold" style={{ color: v.color }}>
                    <Icon className="inline w-3 h-3" style={{ color: v.color }} />
                    {v.label.split(" ").slice(1).join(" ")}
                    {i < activeVerticals.length - 2 ? <span className="text-muted-foreground font-normal">,&nbsp;</span> : i === activeVerticals.length - 2 ? <span className="text-muted-foreground font-normal">&nbsp;and&nbsp;</span> : ""}
                  </span>
                );
              })}{" "}
              partners automatically deliver personalised DutyCredits to their customers — redeemable at airport retailers — and earn commission on every redemption. Zero cost. Zero effort. Pure upside.
            </p>
          </div>

          {/* Section 1 — Why */}
          <div className="py-1">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: "#1A6BFF" }}>
              01 — Why TravelStack Partners Should Join DutyBoost
            </h2>
            <div className="mb-1"><GradientDivider /></div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { title: "One integration. Multiple verticals.", desc: "Connect once via our lightweight API or confirmation-email snippet. Every product you offer — flights, stays, rentals — automatically generates DutyCredits." },
                { title: "New revenue stream on existing bookings", desc: "Every confirmed booking you already process has untapped commission potential. DutyBoost captures it automatically — no extra work from your team." },
                { title: "Stronger customer loyalty across all services", desc: "Customers who receive a real, tangible airport perk with every booking associate that value with your brand — across every vertical you offer." },
                { title: "Performance-based: zero cost if nothing redeems", desc: "DutyBoost is completely free for travel partners. Commission is paid out of DutyBoost's own platform fee — not by you or your customer." },
              ].map((c) => (
                <div key={c.title} className="bg-slate-50 rounded p-2 border border-border">
                  <p className="font-semibold text-xs mb-0.5">{c.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 — How it works per vertical */}
          <div className="py-1">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: "#7c3aed" }}>
              02 — How DutyBoost Works — Per Vertical
            </h2>
            <div className="mb-1"><GradientDivider /></div>
            <div className={`grid gap-1.5`} style={{ gridTemplateColumns: `repeat(${activeVerticals.length}, 1fr)` }}>
              {activeVerticals.map((v) => {
                const Icon = v.icon;
                return (
                <div key={v.key} className="rounded p-2 border" style={{ background: v.bgColor, borderColor: v.borderColor }}>
                  <div className="flex items-center gap-1 mb-1">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: v.color }} />
                    <span className="text-xs font-bold" style={{ color: v.color }}>{v.label.split(" ").slice(1).join(" ")}</span>
                    <span className="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-full text-white" style={{ background: v.color, fontSize: "9px" }}>
                      {v.credits}
                    </span>
                  </div>
                  {v.steps.map((s) => (
                    <div key={s.title} className="mb-1">
                      <p className="font-semibold text-xs" style={{ color: v.color }}>{s.title}</p>
                      <p className="text-xs text-muted-foreground leading-snug">{s.desc}</p>
                    </div>
                  ))}
                  <div className="mt-1 pt-1 border-t" style={{ borderColor: v.borderColor }}>
                    <p className="text-xs text-muted-foreground leading-snug">
                      <span className="font-semibold" style={{ color: v.color }}>Step 3:</span> Customer redeems QR at a participating airport retailer (€70+ spend). <span className="font-semibold" style={{ color: v.color }}>Step 4:</span> You earn commission — automatically.
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Section 3 — Revenue potential */}
          <div className="py-1">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: "#FF8000" }}>
              03 — Revenue Potential for TravelStack Partners
            </h2>
            <div className="mb-1"><GradientDivider /></div>
            <div className="grid grid-cols-3 gap-1.5 mb-1.5">
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold leading-tight" style={{ color: "#1A6BFF" }}>Up to €5</p>
                <p className="font-semibold text-xs mt-0.5">Commission per redemption</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">20% of DutyBoost's 2.5% platform fee per transaction (€5 cap) — earned automatically per vertical</p>
              </div>
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold leading-tight" style={{ color: "#8b5cf6" }}>Free</p>
                <p className="font-semibold text-xs mt-0.5">No cost to you, ever</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">Commission flows from confirmed redemptions — paid monthly with full reporting per vertical</p>
              </div>
              <div className="border border-border rounded p-2 text-center">
                <p className="text-xl font-heading font-bold leading-tight" style={{ color: "#FF8000" }}>&lt; 1 day</p>
                <p className="font-semibold text-xs mt-0.5">To go live — all verticals</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">Single API integration covers all verticals simultaneously. We handle the rest end-to-end.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs mb-0.5">🤝 Stronger loyalty — across all products</h3>
                <p className="text-xs text-muted-foreground leading-snug">A memorable airport perk on every booking — flight, stay, or rental — tied directly to your brand.</p>
              </div>
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs mb-0.5">💰 Multiplied commission potential</h3>
                <p className="text-xs text-muted-foreground leading-snug">Accommodation and car rental partners earn commission on 2 DutyCredits per customer — doubling revenue vs. flight-only partners.</p>
              </div>
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs mb-0.5">⚡ One integration. Permanent value.</h3>
                <p className="text-xs text-muted-foreground leading-snug">DutyCredits are embedded directly into your existing confirmation emails — no new tools, no manual work, no ongoing maintenance.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <GradientDivider />
            <div className="text-center py-2">
              <p className="font-heading font-bold text-xs">Ready to activate DutyBoost across your entire travel stack?</p>
              <div className="flex items-center justify-center gap-6 mt-0.5">
                <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline underline-offset-2" style={{ color: "#1A6BFF" }}>dutyboost.com</a>
                <a href="mailto:hello@dutyboost.com" className="text-xs font-semibold underline underline-offset-2" style={{ color: "#1A6BFF" }}>hello@dutyboost.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-1">
          <p className="text-xs text-muted-foreground">DutyBoost. All rights reserved. 2026. | Chamber of Commerce (KvK): 42053181</p>
        </div>
      </div>
    </div>
  );
}