import { useState, useRef, useLayoutEffect } from "react";
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
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState({ flight: true, accommodation: true, car: true });
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

  const VERTICALS = getVerticals(t);
  const activeVerticals = VERTICALS.filter((v) => selected[v.key]);

  useLayoutEffect(() => {
    if (!innerRef.current) return;
    const naturalHeight = innerRef.current.scrollHeight;
    setScale(naturalHeight > 1122 ? 1122 / naturalHeight : 1);
  }, [i18n.language, selected]);

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
        className="print-content max-w-[794px] mx-auto bg-white"
        style={{ width: "794px", height: "1122px", overflow: "hidden" }}
      >
        <div
          ref={innerRef}
          className="px-8 py-3 flex flex-col"
          style={{ width: "794px", height: "1122px", transformOrigin: "top center", transform: `scale(${scale})` }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-1">
            <OnePagerLogo height={36} />
            <span style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1A6BFF" }}>
              {t("travelstackonepager.programme_name")}
            </span>
          </div>
          <GradientDivider />

          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Headline + Subtitle */}
            <div style={{ textAlign: "center", padding: "6px 0 5px" }}>
              <h1 style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.25, fontFamily: "var(--font-heading)", margin: 0 }}>
                {t("travelstackonepager.headline")}
              </h1>
              <p style={{ fontSize: "10px", color: "#64748b", maxWidth: "560px", margin: "3px auto 0", lineHeight: 1.4 }}>
                {t("travelstackonepager.subtitle")}
              </p>
            </div>

            {/* Section 1 — Why */}
            <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", marginBottom: "6px" }}>
              <h2 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#1A6BFF", margin: "0 0 3px" }}>
                {t("travelstackonepager.s1_title")}
              </h2>
              <div style={{ marginBottom: "4px" }}><GradientDivider /></div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "6px" }}>
                {[
                  { title: t("travelstackonepager.why1_title"), desc: t("travelstackonepager.why1_desc") },
                  { title: t("travelstackonepager.why2_title"), desc: t("travelstackonepager.why2_desc") },
                  { title: t("travelstackonepager.why3_title"), desc: t("travelstackonepager.why3_desc") },
                  { title: t("travelstackonepager.why4_title"), desc: t("travelstackonepager.why4_desc") },
                ].map((c) => (
                  <div key={c.title} style={{ background: "#f8fafc", borderRadius: "6px", padding: "10px 12px", border: "1px solid #e2e8f0" }}>
                    <p style={{ fontWeight: 700, fontSize: "12.5px", margin: "0 0 5px" }}>{c.title}</p>
                    <p style={{ fontSize: "11.5px", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2 — How it works per vertical */}
            <div style={{ flex: "0 0 auto", marginBottom: "6px" }}>
              <h2 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#7c3aed", margin: "0 0 3px" }}>
                {t("travelstackonepager.s2_title")}
              </h2>
              <div style={{ marginBottom: "4px" }}><GradientDivider /></div>
              <div style={{ display: "grid", gap: "6px", gridTemplateColumns: `repeat(${activeVerticals.length}, 1fr)` }}>
                {activeVerticals.map((v) => (
                  <div key={v.key} style={{ borderRadius: "6px", padding: "8px 10px", border: `1px solid ${v.borderColor}`, background: v.bgColor }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: v.color }}>{v.label}</span>
                      <span style={{ marginLeft: "auto", fontSize: "9px", fontWeight: 600, color: v.color }}>{v.credits}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {[
                        ...v.steps.map((s) => ({ label: s.title, desc: s.desc })),
                        { label: v.stepAtAirport, desc: t("travelstackonepager.step_at_airport_desc") },
                        { label: v.stepYouEarn, desc: t("travelstackonepager.step_you_earn_desc") },
                      ].map((item) => (
                        <div key={item.label}>
                          <p style={{ fontWeight: 600, fontSize: "10px", lineHeight: 1.3, color: v.color, margin: 0 }}>
                            {item.label}
                          </p>
                          <p style={{ fontSize: "9.5px", color: "#64748b", lineHeight: 1.4, margin: "1px 0 0", paddingLeft: "10px" }}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 — Revenue potential */}
            <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", marginBottom: "6px" }}>
              <h2 style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#FF8000", margin: "0 0 3px" }}>
                {t("travelstackonepager.s3_title")}
              </h2>
              <div style={{ marginBottom: "4px" }}><GradientDivider /></div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginBottom: "6px" }}>
                {[
                  { val: t("travelstackonepager.stat1_value"), label: t("travelstackonepager.stat1_label"), desc: t("travelstackonepager.stat1_desc"), color: "#1A6BFF" },
                  { val: t("travelstackonepager.stat2_value"), label: t("travelstackonepager.stat2_label"), desc: t("travelstackonepager.stat2_desc"), color: "#8b5cf6" },
                  { val: t("travelstackonepager.stat3_value"), label: t("travelstackonepager.stat3_label"), desc: t("travelstackonepager.stat3_desc"), color: "#FF8000" },
                ].map((s) => (
                  <div key={s.label} style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px 10px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <p style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.1, color: s.color, margin: 0, fontFamily: "var(--font-heading)" }}>{s.val}</p>
                    <p style={{ fontSize: "10px", fontWeight: 600, margin: "4px 0 3px" }}>{s.label}</p>
                    <p style={{ fontSize: "9.5px", color: "#64748b", lineHeight: 1.4, margin: 0 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                {[
                  { title: t("travelstackonepager.benefit1_title"), desc: t("travelstackonepager.benefit1_desc") },
                  { title: t("travelstackonepager.benefit2_title"), desc: t("travelstackonepager.benefit2_desc") },
                  { title: t("travelstackonepager.benefit3_title"), desc: t("travelstackonepager.benefit3_desc") },
                ].map((b) => (
                  <div key={b.title} style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px 10px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, margin: "0 0 3px" }}>{b.title}</p>
                    <p style={{ fontSize: "10px", color: "#64748b", lineHeight: 1.4, margin: 0 }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <GradientDivider />
              <div style={{ textAlign: "center", padding: "6px 0 4px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, margin: "0 0 3px", fontFamily: "var(--font-heading)" }}>{t("travelstackonepager.cta")}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px" }}>
                  <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "10px", fontWeight: 600, color: "#1A6BFF", textDecoration: "underline" }}>dutyboost.com</a>
                  <a href="mailto:hello@dutyboost.com" style={{ fontSize: "10px", fontWeight: 600, color: "#1A6BFF", textDecoration: "underline" }}>hello@dutyboost.com</a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", paddingBottom: "4px" }}>
            <p style={{ fontSize: "8.5px", color: "#94a3b8", margin: 0 }}>{t("travelstackonepager.legal")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}