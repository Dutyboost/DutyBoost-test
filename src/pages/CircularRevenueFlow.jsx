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

const LANGS = [
  { code: "en", flag: "🇬🇧" },
  { code: "nl", flag: "🇳🇱" },
  { code: "fr", flag: "🇫🇷" },
  { code: "de", flag: "🇩🇪" },
  { code: "es", flag: "🇪🇸" },
  { code: "it", flag: "🇮🇹" },
];

function DarkLanguageSwitcher({ currentLang, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useState(null);
  const current = LANGS.find((l) => l.code === (currentLang || "en")) || LANGS[0];

  useEffect(() => {
    const handler = (e) => { if (ref[0] && !ref[0].contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={(el) => { ref[0] = el; }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10"
      >
        <span>{current.flag}</span>
        <span className="uppercase font-medium">{current.code}</span>
        <ChevronRight className={`w-3 h-3 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-28 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-50 py-1 overflow-hidden">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { onSelect(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors hover:bg-white/10 ${l.code === current.code ? "text-blue-400 font-semibold" : "text-white/70"}`}
            >
              <span>{l.flag}</span>
              <span className="uppercase">{l.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const steps = [
  {
    number: 1,
    actor: "Travel Partner",
    subtext: "(Airline, OTA, Accommodation, Car Rental)",
    color: "bg-blue-600",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    emoji: "✈️🏨",
    title: "Booking Confirmed",
    description: "A traveller books a flight, hotel, or car rental through the Travel Partner's platform. The booking confirmation email automatically includes a personalised DutyCredit QR code — no extra steps, no manual work.",
    highlight: "Booking confirmation email includes a personalised DutyCredit QR code.",
    forRetailer: "This is how motivated shoppers are created before they even reach the airport.",
    forPartner: "Every booking you confirm automatically triggers a DutyCredit for your traveller.",
  },
  {
    number: 2,
    actor: "Traveller",
    subtext: "",
    color: "bg-indigo-600",
    lightColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-600",
    emoji: "📱",
    title: "DutyCredit Received",
    description: "The traveller receives a DutyCredit worth €5–€60 in their booking confirmation email. No app download, no registration. Just a QR code they can scan at the airport.",
    highlight: "Traveller receives a DutyCredit worth €5–€60 instantly.",
    forRetailer: "These are your incoming customers — pre-qualified, pre-motivated, and credit in hand.",
    forPartner: "Your traveller gets a tangible reward tied to their booking with you.",
  },
  {
    number: 3,
    actor: "Airport Retailer",
    subtext: "",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    emoji: "🛍️",
    title: "Traveller Visits the Store",
    description: "The traveller visits a participating airport retailer and presents their DutyCredit QR code at checkout. The retailer scans it in seconds. The discount is automatically applied on purchases of €70 or more.",
    highlight: "Traveller visits participating retailer → incremental sales generated.",
    forRetailer: "One scan at checkout. No complex integration needed. You capture sales that would have walked past your door.",
    forPartner: "Your traveller is now actively spending at the airport — thanks to the credit you gave them.",
  },
  {
    number: 4,
    actor: "DutyBoost",
    subtext: "",
    color: "bg-blue-700",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    emoji: "⚡",
    title: "Performance-Based Commission",
    description: "DutyBoost receives a small performance-based commission from the retailer — only when a DutyCredit is successfully redeemed. The retailer pays nothing unless DutyBoost delivers an actual sale.",
    highlight: "Retailer only pays upon a successful sale. Zero risk.",
    forRetailer: "You only pay DutyBoost's 2.5% fee (max €25) when we actually deliver a sale. No sale, no fee.",
    forPartner: "DutyBoost handles all operations — no cost to you, ever.",
  },
  {
    number: 5,
    actor: "Travel Partner",
    subtext: "",
    color: "bg-green-600",
    lightColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
    emoji: "💶",
    title: "Revenue Share Flows Back",
    description: "DutyBoost shares a portion of its commission revenue back to the Travel Partner. This creates a new passive income stream for the travel partner — earned automatically from every DutyCredit redemption linked to their bookings.",
    highlight: "Revenue share flows back to the Travel Partner monthly.",
    forRetailer: "Your purchases directly fund a commission stream for travel partners — strengthening the partnership network that sends you customers.",
    forPartner: "You earn up to €5 per redemption, paid monthly by DutyBoost — out of our own fee, not from your traveller.",
  },
  {
    number: 6,
    actor: "Traveller",
    subtext: "",
    color: "bg-purple-600",
    lightColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    emoji: "🛍️❤️",
    title: "Better Experience, More Engagement",
    description: "The traveller enjoys a better shopping experience and more value. They associate this positive experience with the travel partner who gave them the DutyCredit. This drives more engagement, repeat bookings, and a stronger overall ecosystem.",
    highlight: "More engagement → more bookings → stronger ecosystem.",
    forRetailer: "Happy travellers come back — and they remember where they spent their DutyCredit.",
    forPartner: "Travellers who feel rewarded book again. Your brand becomes the reason they loved their airport experience.",
  },
];

const results = [
  { icon: "💶", label: "Travellers save money" },
  { icon: "📈", label: "Retailers increase revenue" },
  { icon: "💰", label: "Travel partners generate passive income" },
  { icon: "⚡", label: "DutyBoost scales the ecosystem" },
  { icon: "👥", label: "More travellers engage and spend" },
];

const SUPPORTED_LANGS = ["en", "nl", "fr", "de", "es", "it"];

export default function CircularRevenueFlow() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Sync URL lang param → i18n on mount / param change
  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
        localStorage.setItem("i18nextLng", lang);
      }
    } else if (!lang) {
      // No lang in URL — redirect to current language
      const currentLang = SUPPORTED_LANGS.includes(i18n.language) ? i18n.language : "en";
      navigate(`/circular-revenue-flow/${currentLang}`, { replace: true });
    }
  }, [lang]);

  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-6 = steps, 7 = result
  const [audience, setAudience] = useState(null); // "retailer" | "partner"

  const [exportingPptx, setExportingPptx] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  const totalSlides = steps.length + 2; // intro + 6 steps + result
  const slideIndex = currentStep; // 0=intro, 1-6=steps, 7=result

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
        const canvas = await html2canvas(el, { scale: 1.5, useCORS: true, backgroundColor: "#0F172A" });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <DutyBoostLogo height={80} inverted />
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-sm hidden sm:inline">{slideIndex} / {totalSlides - 1}</span>
          <DarkLanguageSwitcher onSelect={handleLangChange} currentLang={lang || i18n.language} />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportPptx}
            disabled={exportingPptx}
            className="text-white/60 hover:text-white gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {exportingPptx ? "Exporting…" : "PPTX"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportPdf}
            disabled={exportingPdf}
            className="text-white/60 hover:text-white gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            {exportingPdf ? "Exporting…" : "PDF"}
          </Button>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
              ← Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Slide Content */}
      <div id="slide-content" className="flex-1 flex flex-col items-center justify-center px-6 py-10">

        {/* INTRO SLIDE */}
        {currentStep === 0 && (
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30 mb-2">
                Interactive Presentation
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-tight">
                DutyBoost Circular<br />
                <span className="text-blue-400">Revenue Flow</span>
              </h1>
              <p className="text-white/60 text-lg max-w-xl mx-auto">
                A self-reinforcing revenue ecosystem that creates value for travellers, retailers, and travel partners.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-white/50 text-sm uppercase tracking-widest">I am viewing this as a</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => { setAudience("retailer"); goNext(); }}
                  className={`px-8 py-5 rounded-2xl border-2 transition-all text-left ${audience === "retailer" ? "border-orange-400 bg-orange-500/20" : "border-white/20 bg-white/5 hover:border-orange-400/50 hover:bg-orange-500/10"}`}
                >
                  <div className="text-2xl mb-1">🛍️</div>
                  <div className="text-white font-semibold text-lg">Airport Retailer</div>
                  <div className="text-white/50 text-sm mt-1">See how DutyBoost drives customers to your store</div>
                </button>
                <button
                  onClick={() => { setAudience("partner"); goNext(); }}
                  className={`px-8 py-5 rounded-2xl border-2 transition-all text-left ${audience === "partner" ? "border-green-400 bg-green-500/20" : "border-white/20 bg-white/5 hover:border-green-400/50 hover:bg-green-500/10"}`}
                >
                  <div className="text-2xl mb-1">✈️</div>
                  <div className="text-white font-semibold text-lg">Travel Partner</div>
                  <div className="text-white/50 text-sm mt-1">See how every booking earns you passive revenue</div>
                </button>
              </div>
              <p className="text-white/30 text-xs">You can also just click Next to proceed without selecting</p>
            </div>

            <Button onClick={goNext} size="lg" className="bg-blue-600 hover:bg-blue-500 text-white gap-2 px-8">
              Start Presentation <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* STEP SLIDES */}
        {step && (
          <div className="max-w-4xl mx-auto w-full">
            {/* Step indicator strip */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i + 1)}
                  className={`transition-all rounded-full ${currentStep === i + 1 ? "w-8 h-3 bg-blue-400" : "w-3 h-3 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left: Main info */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {step.number}
                  </div>
                  <div>
                    <div className="text-white/40 text-sm uppercase tracking-widest">Step {step.number} of 6</div>
                    <h2 className="text-white text-2xl font-heading font-bold">{step.title}</h2>
                  </div>
                </div>

                <div className={`rounded-2xl ${step.lightColor} border ${step.borderColor} p-5`}>
                  <div className="text-5xl mb-3">{step.emoji}</div>
                  <div className={`text-xl font-bold ${step.textColor} mb-1`}>{step.actor}</div>
                  {step.subtext && <div className="text-slate-500 text-sm">{step.subtext}</div>}
                </div>

                <div className={`rounded-xl border ${step.borderColor} bg-white/5 p-4`}>
                  <div className={`text-xs uppercase tracking-widest ${step.textColor} mb-2 font-semibold`}>Key Takeaway</div>
                  <p className="text-white font-medium">{step.highlight}</p>
                </div>
              </div>

              {/* Right: Description + audience callout */}
              <div className="space-y-6">
                <div>
                  <p className="text-white/80 text-lg leading-relaxed">{step.description}</p>
                </div>

                {audience && (
                  <div className={`rounded-2xl ${step.lightColor} border-2 ${step.borderColor} p-5`}>
                    <div className={`text-xs uppercase tracking-widest ${step.textColor} mb-2 font-bold`}>
                      {audience === "retailer" ? "🛍️ What this means for you as a Retailer" : "✈️ What this means for you as a Travel Partner"}
                    </div>
                    <p className="text-slate-800 font-medium">
                      {audience === "retailer" ? step.forRetailer : step.forPartner}
                    </p>
                  </div>
                )}

                {/* Flow position indicator */}
                <div className="flex items-center gap-2 flex-wrap">
                  {steps.map((s, i) => (
                    <div key={i} className={`flex items-center gap-1`}>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${currentStep === i + 1 ? `${s.color} text-white` : "bg-white/10 text-white/30"}`}>
                        {s.number}. {s.actor}
                      </div>
                      {i < steps.length - 1 && <ChevronRight className="w-3 h-3 text-white/20" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULT SLIDE */}
        {currentStep === totalSlides - 1 && (
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <div className="space-y-3">
              <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 text-green-300 text-sm font-medium border border-green-500/30 mb-2">
                Result
              </div>
              <h2 className="text-4xl font-heading font-bold text-white">
                A Self-Reinforcing<br />
                <span className="text-green-400">Revenue Ecosystem</span>
              </h2>
              <p className="text-white/60 text-lg">Everyone wins — and the cycle keeps growing.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              {results.map((r, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">
                    {r.icon}
                  </div>
                  <p className="text-white/80 text-sm text-center font-medium">{r.label}</p>
                  {i < results.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-blue-400 hidden sm:block absolute" style={{ display: 'none' }} />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
              <h3 className="text-white text-xl font-bold">Ready to join the ecosystem?</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/get-started">
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 px-6">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/request-demo">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2 px-6">
                    Request a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between px-6 py-5 border-t border-white/10">
        <Button
          onClick={goPrev}
          disabled={currentStep === 0}
          variant="ghost"
          className="text-white/60 hover:text-white disabled:opacity-30 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>

        {/* Progress dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`rounded-full transition-all ${currentStep === i ? "w-6 h-2 bg-blue-400" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>

        <Button
          onClick={goNext}
          disabled={currentStep === totalSlides - 1}
          className="bg-blue-600 hover:bg-blue-500 text-white gap-2 disabled:opacity-30"
        >
          Next <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}