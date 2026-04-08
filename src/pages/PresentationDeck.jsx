import { useState } from "react";
import { ChevronLeft, ChevronRight, Plane, Store, Building2, Users, TrendingUp, Gift, BarChart3, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

const SLIDES = [
  {
    id: "intro",
    type: "cover",
  },
  {
    id: "problem",
    type: "problem",
  },
  {
    id: "solution",
    type: "solution",
  },
  {
    id: "agencies",
    type: "stakeholder",
    icon: Building2,
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    accent: "text-blue-600",
    label: "Stakeholder 1",
    title: "Travel Agencies",
    subtitle: "Turn every booking into a revenue-generating loyalty touchpoint",
    pain: "You spend thousands attracting clients — but once the ticket is sold, your relationship ends at the airport gate.",
    gains: [
      { icon: TrendingUp, text: "Earn commission on every DutyCredit redemption your travelers make" },
      { icon: Gift, text: "Give travelers a compelling reason to book with you again" },
      { icon: BarChart3, text: "Access a real-time dashboard with agency-level analytics" },
      { icon: Zap, text: "One-click API integration — no development effort needed" },
    ],
    quote: "Your agency earns money while your traveler shops at the airport. Zero extra work.",
  },
  {
    id: "airlines",
    type: "stakeholder",
    icon: Plane,
    color: "from-sky-500 to-indigo-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
    accent: "text-sky-600",
    label: "Stakeholder 2",
    title: "Airlines",
    subtitle: "Deepen passenger loyalty and drive ancillary revenue beyond the flight",
    pain: "Passengers choose airlines on price. Once they land, your brand influence ends — and loyalty programs rarely convert to airport spend.",
    gains: [
      { icon: TrendingUp, text: "Reward frequent flyers with DutyBoost credits tied to flight bookings" },
      { icon: Gift, text: "Differentiate your offering with a tangible, airport-spend perk" },
      { icon: BarChart3, text: "Gain insight into passenger behavior across departure experiences" },
      { icon: Zap, text: "White-label ready — integrate seamlessly into your existing loyalty programme" },
    ],
    quote: "Turn your boarding pass into a shopping passport. Passengers love it. Retailers benefit. You win loyalty.",
  },
  {
    id: "retailers",
    type: "stakeholder",
    icon: Store,
    color: "from-orange-500 to-rose-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    accent: "text-orange-600",
    label: "Stakeholder 3",
    title: "Airport Retailers",
    subtitle: "Convert more browsers into buyers — with zero upfront cost",
    pain: "Travelers walk past your store daily. Most don't stop. You compete with hundreds of other stores for the same fleeting attention.",
    gains: [
      { icon: TrendingUp, text: "Receive pre-qualified, high-intent buyers with vouchers in hand" },
      { icon: Gift, text: "No cost unless a voucher is redeemed — pure performance model" },
      { icon: BarChart3, text: "Track footfall, redemption rates, and revenue attribution in real time" },
      { icon: Zap, text: "Simple QR scan at checkout — no POS system overhaul needed" },
    ],
    quote: "You only pay when a traveler spends. DutyBoost sends them to you already motivated to buy.",
  },
  {
    id: "travelers",
    type: "traveler",
  },
  {
    id: "model",
    type: "model",
  },
  {
    id: "cta",
    type: "cta",
  },
];

function SlideWrapper({ children, dark = false }) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center px-8 sm:px-16 py-12 ${dark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}>
      {children}
    </div>
  );
}

function CoverSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 text-slate-900 px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="relative text-center space-y-6 max-w-3xl">
        <div className="flex justify-center">
          <DutyBoostLogo height={100} />
        </div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-orange-400 mx-auto" />
        <h1 className="text-3xl sm:text-5xl font-heading font-bold leading-tight">
          The Travel Retail<br />
          <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">Conversion Layer</span>
        </h1>
        <p className="text-slate-600 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
          A platform where travel agencies, airlines, airport retailers, and travelers all win.
        </p>
        <div className="flex items-center justify-center gap-6 pt-4 flex-wrap">
          {[{ icon: Building2, label: "Travel Agencies" }, { icon: Plane, label: "Airlines" }, { icon: Store, label: "Retailers" }, { icon: Users, label: "Travelers" }].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-slate-700" />
              </div>
              <span className="text-xs text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProblemSlide() {
  return (
    <SlideWrapper dark>
      <div className="max-w-3xl w-full space-y-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">The Problem</p>
        <h2 className="text-3xl sm:text-5xl font-heading font-bold leading-tight">
          €14B in airport retail revenue.<br />
          <span className="text-slate-400">Almost none of it is coordinated.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-8">
          {[
            { icon: Building2, title: "Agencies", text: "Send travelers to airports but earn nothing from what happens there." },
            { icon: Store, title: "Retailers", text: "Have thousands of travelers walk by but struggle to convert them." },
            { icon: Users, title: "Travelers", text: "Get generic ads instead of personalized, relevant incentives." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <Icon className="w-6 h-6 text-slate-400" />
              <p className="font-semibold">{title}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}

function SolutionSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-8 sm:px-16 py-12">
      <div className="max-w-3xl w-full space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">The Solution</p>
        <h2 className="text-3xl sm:text-5xl font-heading font-bold leading-tight">
          DutyBoost connects the dots.
        </h2>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          A closed-loop incentive engine that turns booking data into targeted, redeemable vouchers — creating value for every player in the ecosystem.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 flex-wrap">
          {[
            { label: "Agency books trip", color: "bg-white/20" },
            { arrow: true },
            { label: "Traveler gets DutyCredit", color: "bg-white/20" },
            { arrow: true },
            { label: "Redeemed at retailer", color: "bg-white/20" },
            { arrow: true },
            { label: "Everyone earns", color: "bg-orange-400/80" },
          ].map((item, i) =>
            item.arrow ? (
              <ArrowRight key={i} className="w-5 h-5 text-blue-200 hidden sm:block" />
            ) : (
              <div key={i} className={`${item.color} rounded-xl px-4 py-2.5 text-sm font-semibold text-white`}>
                {item.label}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function StakeholderSlide({ slide }) {
  const Icon = slide.icon;
  return (
    <SlideWrapper>
      <div className="max-w-4xl w-full space-y-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${slide.color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className={`text-xs font-bold uppercase tracking-widest ${slide.accent}`}>{slide.label}</span>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">{slide.title}</h2>
          <p className="text-slate-500 mt-1 text-lg">{slide.subtitle}</p>
        </div>
        <div className={`${slide.bg} ${slide.border} border rounded-2xl p-4`}>
          <p className="text-sm text-slate-600 italic">😟 Today: {slide.pain}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {slide.gains.map(({ icon: GIcon, text }, i) => (
            <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${slide.accent}`} />
              <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <div className={`bg-gradient-to-r ${slide.color} rounded-2xl px-6 py-4`}>
          <p className="text-white font-semibold text-sm sm:text-base">💡 {slide.quote}</p>
        </div>
      </div>
    </SlideWrapper>
  );
}

function TravelerSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-8 sm:px-16 py-12">
      <div className="max-w-3xl w-full space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">The Traveler</p>
        <h2 className="text-3xl sm:text-5xl font-heading font-bold">The silent beneficiary</h2>
        <p className="text-emerald-100 text-lg max-w-xl mx-auto leading-relaxed">
          Travelers don't need to do anything differently. They simply receive a personalised DutyCredit voucher before departure — and spend it at participating stores.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-4">
          {[
            { title: "Personalised", text: "Vouchers matched to their travel profile, departure airport, and timing." },
            { title: "Effortless", text: "One QR code at checkout. No app required. No loyalty card to carry." },
            { title: "Real value", text: "Genuine discounts at stores they were already walking past." },
          ].map(({ title, text }) => (
            <div key={title} className="bg-white/10 border border-white/20 rounded-2xl p-4 space-y-2">
              <p className="font-semibold">{title}</p>
              <p className="text-emerald-100 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModelSlide() {
  return (
    <SlideWrapper>
      <div className="max-w-3xl w-full space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Business Model</p>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold">A model where everybody wins</h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          DutyBoost operates on a pure performance model. No redemption, no fee. The platform earns a small take rate only when value is created.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { icon: Building2, label: "Travel Agency", earn: "Commission per redemption", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
            { icon: Plane, label: "Airline", earn: "Loyalty uplift + ancillary share", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-200" },
            { icon: Store, label: "Retailer", earn: "Incremental footfall & sales", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
            { icon: Users, label: "Traveler", earn: "Real discounts at departure", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
          ].map(({ icon: Icon, label, earn, color, bg, border }) => (
            <div key={label} className={`${bg} ${border} border rounded-2xl p-4 space-y-2 text-left`}>
              <Icon className={`w-5 h-5 ${color}`} />
              <p className={`font-semibold text-sm ${color}`}>{label}</p>
              <p className="text-slate-600 text-xs leading-relaxed">{earn}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 mt-2">
          <p className="font-semibold text-sm">🔁 DutyBoost takes a small platform fee per transaction — only paid when value is exchanged.</p>
        </div>
      </div>
    </SlideWrapper>
  );
}

function CtaSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 text-slate-900 px-8 sm:px-16 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative text-center space-y-6 max-w-2xl">
        <div className="flex justify-center">
          <DutyBoostLogo height={90} />
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900">Ready to boost?</h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          Whether you're a travel agency, airline, or airport retailer — DutyBoost is built for you. Let's talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a href="/" className="bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm">
            Visit DutyBoost.com
          </a>
        </div>
        <p className="text-slate-400 text-xs pt-4">© {new Date().getFullYear()} DutyBoost · The Travel Retail Conversion Layer</p>
      </div>
    </div>
  );
}

function renderSlide(slide) {
  switch (slide.type) {
    case "cover": return <CoverSlide />;
    case "problem": return <ProblemSlide />;
    case "solution": return <SolutionSlide />;
    case "stakeholder": return <StakeholderSlide slide={slide} />;
    case "traveler": return <TravelerSlide />;
    case "model": return <ModelSlide />;
    case "cta": return <CtaSlide />;
    default: return null;
  }
}

export default function PresentationDeck() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => Math.max(0, i - 1));
  const next = () => setCurrent(i => Math.min(SLIDES.length - 1, i + 1));

  const handleKey = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4" onKeyDown={handleKey} tabIndex={0} style={{ outline: "none" }}>
      {/* Slide container */}
      <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
        {renderSlide(SLIDES[current])}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-slate-600 text-xs mt-3">{current + 1} / {SLIDES.length} · Use arrow keys to navigate</p>
    </div>
  );
}