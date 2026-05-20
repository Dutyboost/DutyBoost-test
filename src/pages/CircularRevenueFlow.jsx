import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, ChevronRight, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { exportCircularFlowPptx } from "../utils/exportCircularFlowPptx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import AirportRetailerIcon from "../components/AirportRetailerIcon";
import TravelerIcon from "../components/TravelerIcon";
import HotelIcon from "../components/HotelIcon";
import CarRentalIcon from "../components/CarRentalIcon";
import FooterLinks from "../components/FooterLinks";

const STEP_STYLES = [
  { color: "bg-blue-600", lightBg: "bg-blue-50", border: "border-blue-200", textColor: "text-blue-600", iconColor: "text-blue-600", dotColor: "bg-blue-600" },
  { color: "bg-indigo-600", lightBg: "bg-indigo-50", border: "border-indigo-200", textColor: "text-indigo-600", iconColor: "text-indigo-600", dotColor: "bg-indigo-600" },
  { color: "bg-orange-500", lightBg: "bg-orange-50", border: "border-orange-200", textColor: "text-orange-600", iconColor: "text-orange-600", dotColor: "bg-orange-500" },
  { color: "bg-primary", lightBg: "bg-blue-50", border: "border-blue-200", textColor: "text-primary", iconColor: "text-primary", dotColor: "bg-primary" },
  { color: "bg-green-600", lightBg: "bg-green-50", border: "border-green-200", textColor: "text-green-600", iconColor: "text-green-600", dotColor: "bg-green-600" },
  { color: "bg-purple-600", lightBg: "bg-purple-50", border: "border-purple-200", textColor: "text-purple-600", iconColor: "text-purple-600", dotColor: "bg-purple-600" },
];

// Icon component per step
const STEP_ICONS = [
  // Step 1: Travel Partner — show agency + hotel + car icons
  ({ className }) => (
    <div className="flex items-center gap-2">
      <TravelAgencyIcon className={className} />
      <HotelIcon className={className} />
      <CarRentalIcon className={className} />
    </div>
  ),
  // Step 2: Traveler receives DutyCredit
  ({ className }) => <TravelerIcon className={className} />,
  // Step 3: Airport Retailer
  ({ className }) => <AirportRetailerIcon className={className} />,
  // Step 4: Platform processes
  ({ className }) => <AirportRetailerIcon className={className} />,
  // Step 5: Revenue flows back
  ({ className }) => <TravelAgencyIcon className={className} />,
  // Step 6: Loyalty loop
  ({ className }) => <TravelerIcon className={className} />,
];

const RESULT_ICONS = ["💶", "📈", "💰", "⚡", "👥"];
const SUPPORTED_LANGS = ["en", "nl", "fr", "de", "es", "it"];

export default function CircularRevenueFlow() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
        localStorage.setItem("i18nextLng", lang);
      }
    } else if (!lang) {
      const currentLang = SUPPORTED_LANGS.includes(i18n.language) ? i18n.language : "en";
      navigate(`/circular-revenue-flow/${currentLang}`, { replace: true });
    }
  }, [lang]);

  const [currentStep, setCurrentStep] = useState(0); // 0=intro, 1-6=steps, 7=result
  const [audience, setAudience] = useState(null); // "retailer" | "partner"
  const [exportingPptx, setExportingPptx] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  const steps = STEP_STYLES.map((style, i) => ({
    number: i + 1,
    ...style,
    title: t(`circularFlow.step${i + 1}_title`),
    description: t(`circularFlow.step${i + 1}_desc`),
    subtext: i === 0 ? t("circularFlow.step1_subtext") : "",
  }));

  const results = RESULT_ICONS.map((icon, i) => ({
    icon,
    label: t(`circularFlow.r${i + 1}`),
  }));

  const totalSlides = steps.length + 2;

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, totalSlides - 1));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleLangChange = (code) => {
    navigate(`/circular-revenue-flow/${code}`, { replace: true });
  };

  const handleExportPptx = async () => {
    setExportingPptx(true);
    await exportCircularFlowPptx();
    setExportingPptx(false);
  };

  const handleExportPdf = async () => {
    setExportingPdf(true);
    const savedStep = currentStep;
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [1280, 720] });
    for (let i = 0; i < totalSlides; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 300));
      const el = document.getElementById("slide-content");
      if (el) {
        const canvas = await html2canvas(el, { scale: 1.5, useCORS: true, backgroundColor: "#f8fafc" });
        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, 1280, 720);
      }
    }
    pdf.save("DutyBoost-Circular-Revenue-Flow.pdf");
    setCurrentStep(savedStep);
    setExportingPdf(false);
  };

  const step = currentStep >= 1 && currentStep <= 6 ? steps[currentStep - 1] : null;

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Nav — matches landing page */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <DutyBoostLogo height={100} />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm hidden sm:inline">{currentStep} / {totalSlides - 1}</span>
            <LanguageSwitcher onSelect={handleLangChange} />
            <Button variant="ghost" size="sm" onClick={handleExportPptx} disabled={exportingPptx} className="gap-1.5 text-muted-foreground hover:text-foreground">
              <Download className="w-3.5 h-3.5" />
              {exportingPptx ? t("circularFlow.exporting") : "PPTX"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleExportPdf} disabled={exportingPdf} className="gap-1.5 text-muted-foreground hover:text-foreground">
              <FileText className="w-3.5 h-3.5" />
              {exportingPdf ? t("circularFlow.exporting") : "PDF"}
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                ← {t("common.back")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Slide Content */}
      <div id="slide-content" className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12">

        {/* INTRO SLIDE */}
        {currentStep === 0 && (
          <div className="max-w-3xl mx-auto w-full space-y-12">
            {/* Hero */}
            <div className="relative overflow-hidden text-center space-y-6 py-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none rounded-3xl" />
              <div className="absolute top-0 right-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                  {t("circularFlow.badge")}
                </span>
                <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight">
                  {t("circularFlow.title")}
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                  {t("circularFlow.subtitle")}
                </p>
              </div>
            </div>

            {/* Audience selector */}
            <div className="space-y-5">
              <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t("circularFlow.viewing_as")}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => { setAudience("retailer"); goNext(); }}
                  className={`rounded-2xl border-2 p-6 text-left transition-all hover:shadow-lg ${audience === "retailer" ? "border-accent bg-accent/5" : "border-border bg-card hover:border-accent/50"}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-3">
                    <AirportRetailerIcon className="w-7 h-7 text-orange-600" />
                  </div>
                  <p className="font-heading font-bold text-lg">{t("stakeholders.retailers.title")}</p>
                  <p className="text-muted-foreground text-sm mt-1">{t("stakeholders.retailers.b1")}</p>
                </button>
                <button
                  onClick={() => { setAudience("partner"); goNext(); }}
                  className={`rounded-2xl border-2 p-6 text-left transition-all hover:shadow-lg ${audience === "partner" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                      <TravelAgencyIcon className="w-7 h-7 text-green-600" />
                    </div>
                  </div>
                  <p className="font-heading font-bold text-lg">{t("stakeholders.agencies.title")}</p>
                  <p className="text-muted-foreground text-sm mt-1">{t("stakeholders.agencies.b3")}</p>
                </button>
              </div>
              <p className="text-center text-xs text-muted-foreground">{t("circularFlow.skip_hint")}</p>
            </div>

            <div className="flex justify-center">
              <Button onClick={goNext} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8">
                {t("common.continue")} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP SLIDES */}
        {step && (
          <div className="max-w-4xl mx-auto w-full space-y-8">
            {/* Step dot nav */}
            <div className="flex items-center justify-center gap-2">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i + 1)}
                  className={`transition-all rounded-full ${currentStep === i + 1 ? `w-8 h-3 ${s.dotColor}` : "w-3 h-3 bg-border hover:bg-muted-foreground/40"}`}
                />
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-white text-xl font-bold shadow-md`}>
                    {step.number}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("circularFlow.step_of", { n: step.number, total: 6 })}</p>
                    <h2 className="text-2xl font-heading font-bold text-foreground">{step.title}</h2>
                  </div>
                </div>

                {/* Icon card */}
                <div className={`rounded-2xl ${step.lightBg} border ${step.border} p-5`}>
                  {(() => {
                    const IconComp = STEP_ICONS[step.number - 1];
                    return <IconComp className={`w-10 h-10 ${step.iconColor}`} />;
                  })()}
                  <p className={`text-lg font-bold ${step.textColor} mt-3`}>{step.title}</p>
                  {step.subtext && <p className="text-muted-foreground text-sm mt-1">{step.subtext}</p>}
                </div>

                {/* Key takeaway */}
                <div className={`rounded-xl border ${step.border} bg-card p-4`}>
                  <p className={`text-xs uppercase tracking-widest ${step.textColor} mb-1.5 font-semibold`}>{t("circularFlow.key_takeaway")}</p>
                  <p className="text-foreground font-medium text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-5">
                <p className="text-foreground/80 text-lg leading-relaxed">{step.description}</p>

                {audience && (
                  <div className={`rounded-2xl ${step.lightBg} border-2 ${step.border} p-5`}>
                    <p className={`text-xs uppercase tracking-widest ${step.textColor} mb-2 font-bold`}>
                      {audience === "retailer"
                        ? <span className="flex items-center gap-1.5"><AirportRetailerIcon className={`w-4 h-4 ${step.textColor}`} /> {t("stakeholders.retailers.title")}</span>
                        : <span className="flex items-center gap-1.5"><TravelAgencyIcon className={`w-4 h-4 ${step.textColor}`} /> {t("stakeholders.agencies.title")}</span>
                      }
                    </p>
                    <p className="text-foreground font-medium text-sm leading-relaxed">{step.description}</p>
                  </div>
                )}

                {/* Flow breadcrumb */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <button
                        onClick={() => setCurrentStep(i + 1)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          currentStep === i + 1 ? `${s.color} text-white` : "bg-muted text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {s.number}. {s.title}
                      </button>
                      {i < steps.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground/40" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULT SLIDE */}
        {currentStep === totalSlides - 1 && (
          <div className="max-w-3xl mx-auto w-full space-y-10 text-center">
            {/* Hero block */}
            <div className="relative overflow-hidden space-y-4 py-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none rounded-3xl" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative space-y-3">
                <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold border border-green-200">
                  {t("circularFlow.result_label")}
                </span>
                <h2 className="text-4xl font-heading font-bold">{t("circularFlow.title")}</h2>
                <p className="text-muted-foreground text-lg">{t("circularFlow.subtitle")}</p>
              </div>
            </div>

            {/* Result icons */}
            <div className="grid grid-cols-5 gap-3 items-center">
              {results.map((r, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-2xl shadow-sm">
                    {r.icon}
                  </div>
                  <p className="text-xs text-muted-foreground text-center font-medium leading-tight">{r.label}</p>
                </div>
              ))}
            </div>

            {/* CTA box — matches landing page CTA */}
            <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl p-10 text-primary-foreground shadow-2xl relative overflow-hidden space-y-5">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              <div className="relative space-y-4">
                <h3 className="text-2xl font-heading font-bold">{t("cta.title")}</h3>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/get-started">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-6">
                      {t("cta.button")} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/request-demo">
                    <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2 px-6">
                      {t("requestdemo.badge")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-border px-4 sm:px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            onClick={goPrev}
            disabled={currentStep === 0}
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" /> {t("common.back")}
          </Button>

          {/* Progress dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`rounded-full transition-all ${currentStep === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-muted-foreground/40"}`}
              />
            ))}
          </div>

          <Button
            onClick={goNext}
            disabled={currentStep === totalSlides - 1}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-30"
          >
            {t("common.continue")} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <DutyBoostLogo height={80} />
            <p>© 2026 DutyBoost. All rights reserved.</p>
          </div>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
}