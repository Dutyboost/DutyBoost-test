import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Check } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import OnePagerLogo from "../components/OnePagerLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";

const GradientDivider = () => (
  <div style={{ height: '2px', background: 'linear-gradient(to right, #1A6BFF, #8b5cf6, #FF8000)', width: '100%' }} />
);

const getVerticals = (t) => [
  {
    key: "flight",
    color: "#1A6BFF",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    label: t("travelstackonepager.flight_label"),
    credits: t("travelstackonepager.flight_credits"),
    steps: [
      { title: t("travelstackonepager.at_booking"), desc: t("travelstackonepager.flight_step1_desc") },
    ],
    stepAtAirport: t("travelstackonepager.step_at_airport"),
    stepYouEarn: t("travelstackonepager.step_you_earn"),
  },
  {
    key: "accommodation",
    color: "#8b5cf6",
    bgColor: "#f5f3ff",
    borderColor: "#ddd6fe",
    label: t("travelstackonepager.accommodation_label"),
    credits: t("travelstackonepager.accommodation_credits"),
    steps: [
      { title: t("travelstackonepager.at_booking"), desc: t("travelstackonepager.accommodation_step1_desc") },
      { title: t("travelstackonepager.at_checkout"), desc: t("travelstackonepager.accommodation_step2_desc") },
    ],
    stepAtAirport: t("travelstackonepager.step_at_airport"),
    stepYouEarn: t("travelstackonepager.step_you_earn"),
  },
  {
    key: "car",
    color: "#FF8000",
    bgColor: "#fff7ed",
    borderColor: "#fed7aa",
    label: t("travelstackonepager.car_label"),
    credits: t("travelstackonepager.car_credits"),
    steps: [
      { title: t("travelstackonepager.at_booking"), desc: t("travelstackonepager.car_step1_desc") },
      { title: t("travelstackonepager.at_car_return"), desc: t("travelstackonepager.car_step2_desc") },
    ],
    stepAtAirport: t("travelstackonepager.step_at_airport"),
    stepYouEarn: t("travelstackonepager.step_you_earn"),
  },
];

export default function TravelStackOnePager() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState({ flight: true, accommodation: true, car: true });

  const VERTICALS = getVerticals(t);
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
          <span className="text-xs text-muted-foreground font-medium hidden sm:block">{t("travelstackonepager.select_verticals")}</span>
          {VERTICALS.map((v) => {
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
                {v.label}
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
          <OnePagerLogo height={40} />
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#1A6BFF" }}>
              {t("travelstackonepager.programme_name")}
            </span>

          </div>
        </div>
        <GradientDivider />

        <div className="flex-1 flex flex-col">
          {/* Headline */}
          <div className="text-center py-1">
            <h1 className="text-base font-heading font-bold leading-tight">
              {t("travelstackonepager.headline")}
            </h1>
            <div className="text-muted-foreground text-xs max-w-2xl mx-auto mt-0.5 flex flex-wrap items-center justify-center gap-x-1">
              <span>{t("travelstackonepager.subtitle_start")}</span>
              {activeVerticals.map((v, i) => (
                <span key={v.key} className="inline-flex items-center gap-0.5 font-semibold" style={{ color: v.color }}>
                  <span>{v.label}</span>
                  {i < activeVerticals.length - 2 ? <span className="text-muted-foreground font-normal">,</span> : i === activeVerticals.length - 2 ? <span className="text-muted-foreground font-normal">&nbsp;{t("travelstackonepager.and")}</span> : ""}
                </span>
              ))}
              <span>{t("travelstackonepager.subtitle_end")}</span>
            </div>
          </div>

          {/* Section 1 — Why */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: "#1A6BFF" }}>
              {t("travelstackonepager.s1_title")}
            </h2>
            <div className="mb-1"><GradientDivider /></div>
            <div className="grid grid-cols-2 gap-1.5 flex-1">
              {[
                { title: t("travelstackonepager.why1_title"), desc: t("travelstackonepager.why1_desc") },
                { title: t("travelstackonepager.why2_title"), desc: t("travelstackonepager.why2_desc") },
                { title: t("travelstackonepager.why3_title"), desc: t("travelstackonepager.why3_desc") },
                { title: t("travelstackonepager.why4_title"), desc: t("travelstackonepager.why4_desc") },
              ].map((c) => (
                <div key={c.title} className="bg-slate-50 rounded p-2 border border-border">
                  <p className="font-semibold text-xs mb-0.5">{c.title}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 — How it works per vertical */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: "#7c3aed" }}>
              {t("travelstackonepager.s2_title")}
            </h2>
            <div className="mb-1"><GradientDivider /></div>
            <div className={`grid gap-1.5 flex-1`} style={{ gridTemplateColumns: `repeat(${activeVerticals.length}, 1fr)` }}>
              {activeVerticals.map((v) => (
                <div key={v.key} className="rounded p-2 border" style={{ background: v.bgColor, borderColor: v.borderColor }}>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-xs font-bold" style={{ color: v.color }}>{v.label}</span>
                    <span className="ml-auto text-xs font-semibold" style={{ color: v.color, fontSize: "9px" }}>
                      {v.credits}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    {[
                      ...v.steps.map((s) => ({ label: s.title, desc: s.desc })),
                      { label: v.stepAtAirport, desc: t("travelstackonepager.step_at_airport_desc") },
                      { label: v.stepYouEarn, desc: t("travelstackonepager.step_you_earn_desc") },
                    ].map((item, idx) => (
                      <div key={item.label} style={{ paddingTop: "3px" }}>
                        <p style={{ fontWeight: 600, fontSize: "10px", lineHeight: "1.4", color: v.color, margin: 0 }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize: "10px", color: "#64748b", lineHeight: "1.3", margin: 0, marginTop: "1px", paddingLeft: "14px" }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 — Revenue potential */}
          <div className="flex-1 flex flex-col py-1">
            <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: "#FF8000" }}>
              {t("travelstackonepager.s3_title")}
            </h2>
            <div className="mb-1"><GradientDivider /></div>
            <div className="grid grid-cols-3 gap-1.5 flex-1 mb-1.5">
              <div className="border border-border rounded p-2 text-center flex flex-col justify-center">
                <p className="text-xl font-heading font-bold leading-tight" style={{ color: "#1A6BFF" }}>{t("travelstackonepager.stat1_value")}</p>
                <p className="font-semibold text-xs mt-0.5">{t("travelstackonepager.stat1_label")}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{t("travelstackonepager.stat1_desc")}</p>
              </div>
              <div className="border border-border rounded p-2 text-center flex flex-col justify-center">
                <p className="text-xl font-heading font-bold leading-tight" style={{ color: "#8b5cf6" }}>{t("travelstackonepager.stat2_value")}</p>
                <p className="font-semibold text-xs mt-0.5">{t("travelstackonepager.stat2_label")}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{t("travelstackonepager.stat2_desc")}</p>
              </div>
              <div className="border border-border rounded p-2 text-center flex flex-col justify-center">
                <p className="text-xl font-heading font-bold leading-tight" style={{ color: "#FF8000" }}>{t("travelstackonepager.stat3_value")}</p>
                <p className="font-semibold text-xs mt-0.5">{t("travelstackonepager.stat3_label")}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{t("travelstackonepager.stat3_desc")}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 flex-1">
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs mb-0.5">{t("travelstackonepager.benefit1_title")}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t("travelstackonepager.benefit1_desc")}</p>
              </div>
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs mb-0.5">{t("travelstackonepager.benefit2_title")}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t("travelstackonepager.benefit2_desc")}</p>
              </div>
              <div className="border border-border rounded p-2">
                <h3 className="font-heading font-bold text-xs mb-0.5">{t("travelstackonepager.benefit3_title")}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{t("travelstackonepager.benefit3_desc")}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <GradientDivider />
            <div className="text-center py-1.5">
              <p className="font-heading font-bold text-xs">{t("travelstackonepager.cta")}</p>
              <div className="flex items-center justify-center gap-6 mt-0.5">
                <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline underline-offset-2" style={{ color: "#1A6BFF" }}>dutyboost.com</a>
                <a href="mailto:hello@dutyboost.com" className="text-xs font-semibold underline underline-offset-2" style={{ color: "#1A6BFF" }}>hello@dutyboost.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-1">
          <p className="text-xs text-muted-foreground">{t("travelstackonepager.legal")}</p>
        </div>
      </div>
    </div>
  );
}