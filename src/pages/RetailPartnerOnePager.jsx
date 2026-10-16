import { useState, useRef, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import OnePagerLogo from "@/components/OnePagerLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const GradientDivider = () => (
  <div style={{ height: "2px", background: "linear-gradient(to right, #1f69ff, #14b8a6, #f59e0b)", width: "100%" }} />
);

const STAT_COLORS = ["#1f69ff", "#14b8a6", "#f59e0b"];

export default function RetailPartnerOnePager() {
  const { t, i18n } = useTranslation();
  const p = (k) => t(`retailpartneronepager.${k}`);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!innerRef.current) return;
    const naturalHeight = innerRef.current.scrollHeight;
    setScale(naturalHeight > 1122 ? 1122 / naturalHeight : 1);
  }, [i18n.language]);

  const handleDownloadPDF = async () => {
    const element = document.querySelector(".print-content");
    const canvas = await html2canvas(element, { scale: 2, allowTaint: true, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF("p", "mm", "a4", { compress: true });
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("retail-partner-one-pager.pdf");
  };

  const why = [1, 2, 3, 4].map((n) => ({
    num: n,
    title: p(`why${n}_title`),
    desc: p(`why${n}_desc`),
  }));

  const steps = [1, 2, 3, 4].map((n) => ({
    num: `0${n}`,
    title: p(`step${n}_title`),
    desc: p(`step${n}_desc`),
  }));

  const stats = [1, 2, 3].map((n) => ({
    num: n,
    value: p(`stat${n}_value`),
    label: p(`stat${n}_label`),
    desc: p(`stat${n}_desc`),
    color: STAT_COLORS[n - 1],
  }));

  const benefits = [1, 2, 3].map((n) => ({
    num: n + 3,
    title: p(`benefit${n}_title`),
    desc: p(`benefit${n}_desc`),
  }));

  const audience = [1, 2, 3].map((n) => p(`audience${n}`));

  return (
    <div
      className="min-h-screen font-body"
      style={{ background: "linear-gradient(135deg, hsl(216 60% 97%) 0%, hsl(217 50% 95%) 50%, hsl(216 55% 96%) 100%)", backgroundAttachment: "fixed" }}
    >
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <LanguageSwitcher />
        <Button onClick={handleDownloadPDF} className="gap-2" style={{ background: "linear-gradient(to right, #1f69ff, #14b8a6)" }}>
          <Printer className="w-4 h-4" /> {t("common.download")}
        </Button>
      </div>

      <div className="print-content max-w-[794px] mx-auto bg-white" style={{ width: "794px", height: "1122px", overflow: "hidden" }}>
        <div
          ref={innerRef}
          className="px-8 py-3 flex flex-col"
          style={{ width: "794px", minHeight: "1122px", transformOrigin: "top center", transform: `scale(${scale})` }}
        >
          <div className="flex items-center justify-between pb-1">
            <OnePagerLogo height={40} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#1f69ff" }}>{p("badge")}</span>
          </div>
          <GradientDivider />

          <div className="flex-1 flex flex-col">
            {/* Headline */}
            <div className="text-center py-1">
              <h1 className="text-base font-heading font-bold leading-tight">{p("headline")}</h1>
              <p className="text-muted-foreground text-xs max-w-xl mx-auto mt-0.5">{p("subtitle")}</p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{p("audience_label")}</span>
                {audience.map((label) => (
                  <span key={label} className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">{label}</span>
                ))}
              </div>
            </div>

            {/* 01 — Why */}
            <div className="flex-1 flex flex-col py-1">
              <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: "#1f69ff" }}>{p("s1_title")}</h2>
              <div className="mb-1"><GradientDivider /></div>
              <div className="grid grid-cols-2 gap-1.5 flex-1">
                {why.map((c) => (
                  <div key={c.title} className="bg-slate-50 rounded p-2 border border-border">
                    <p className="font-semibold text-xs mb-0.5">
                      <span style={{ color: "#1f69ff", marginRight: "4px" }}>{c.num}.</span>{c.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 02 — How it works */}
            <div className="flex-1 flex flex-col py-1">
              <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: "#0f766e" }}>{p("s2_title")}</h2>
              <div className="mb-1"><GradientDivider /></div>
              <div className="grid grid-cols-4 gap-1.5 flex-1">
                {steps.map((s) => (
                  <div key={s.num} className="bg-teal-50 rounded p-2 border border-teal-100">
                    <p className="text-base font-heading font-bold text-teal-300 leading-none">{s.num}</p>
                    <p className="font-semibold text-xs text-teal-800 mt-0.5">{s.title}</p>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 03 — Business case */}
            <div className="flex-1 flex flex-col py-1">
              <h2 className="font-heading font-bold text-xs mb-1 uppercase tracking-wide" style={{ color: "#b45309" }}>{p("s3_title")}</h2>
              <div className="mb-1"><GradientDivider /></div>
              <div className="grid grid-cols-3 gap-1.5 flex-1 mb-1.5">
                {stats.map((s) => (
                  <div key={s.label} className="border border-border rounded p-2 text-center flex flex-col justify-center">
                    <p className="text-xs font-bold text-slate-400 mb-0.5">{s.num}.</p>
                    <p className="text-xl font-heading font-bold leading-tight" style={{ color: s.color }}>{s.value}</p>
                    <p className="font-semibold text-xs mt-0.5">{s.label}</p>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-1.5 flex-1">
                {benefits.map((b) => (
                  <div key={b.title} className="border border-border rounded p-2">
                    <p className="text-xs font-bold text-slate-400 mb-0.5">{b.num}.</p>
                    <h3 className="font-heading font-bold text-xs mb-0.5">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-snug">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div>
              <GradientDivider />
              <div className="text-center py-1.5">
                <p className="font-heading font-bold text-xs">{p("cta")}</p>
                <div className="flex items-center justify-center gap-6 mt-0.5">
                  <a href="https://www.dutyboost.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-700 underline underline-offset-2">dutyboost.com</a>
                  <a href="mailto:hello@dutyboost.com" className="text-xs font-semibold text-blue-700 underline underline-offset-2">hello@dutyboost.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pb-1">
            <p className="text-xs text-muted-foreground">{p("legal")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}