import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Globe, Plane, MapPin, CheckCircle2, Building2,
} from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PositioningLine from "@/components/shared/PositioningLine";
import { SlideSolution } from "@/components/shared/SlideSolution";
import * as F from "./figures";

const ACCENT = "text-blue-600";
const ACCENT_DARK = "text-blue-400";

function SlideWrapper({ children, dark = false }) {
  return (
    <div className={`w-full flex flex-col overflow-y-auto lg:overflow-hidden ${dark ? "bg-[#0a1f44] text-white" : "bg-white text-[#0a1f44]"}`}>
      {children}
    </div>
  );
}

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.06]" style={{
      backgroundImage: "linear-gradient(rgba(31,107,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(31,107,255,0.6) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }} />
  );
}

/* ---------------------------------------------------------------- COVER */
export function SlideCover() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #1F6BFF 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-6 lg:gap-10">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl">
            <DutyBoostLogo height={50} linkTo={null} />
          </div>
          <div>
            <PositioningLine dark className="mb-3" />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4">
              Air France-KLM<br />
              <span className="text-blue-400">A Travel Partner Presentation</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed">
              Turn {F.GROUP_PASSENGERS} passengers a year into a new, performance-based revenue stream —
              at zero cost to Air France-KLM and zero cost to your travellers.
            </p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-x-8 sm:gap-x-14 lg:gap-x-20 gap-y-4 mt-2 w-full max-w-xl lg:max-w-4xl">
            {[
              { label: "Passengers carried (2025)", value: F.GROUP_PASSENGERS },
              { label: "Destinations", value: F.DESTINATIONS },
              { label: "Cost to Air France-KLM", value: "€0" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="text-xl sm:text-3xl lg:text-5xl font-bold text-blue-400 whitespace-nowrap">{s.value}</div>
                <div className="text-xs sm:text-sm lg:text-base text-slate-400 mt-1 whitespace-nowrap">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500 border border-slate-700 rounded px-4 py-2">
            CONFIDENTIAL — 2026 | Chamber of Commerce: 42053181 | VAT: NL869492068B01
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

/* -------------------------------------------------------------- NETWORK */
export function SlideNetwork() {
  const stats = [
    { val: F.GROUP_PASSENGERS, label: "Passengers carried in 2025", sub: "Up 5.0% year-on-year" },
    { val: F.DESTINATIONS, label: "Destinations worldwide", sub: `Across ${F.COUNTRIES} countries` },
    { val: F.AF_DESTINATIONS, label: "Air France destinations", sub: "85 long-haul · 84 short & medium-haul" },
    { val: F.KLM_DESTINATIONS, label: "KLM destinations", sub: "Of a 300+ destination partner network" },
    { val: F.CDG_PASSENGERS, label: "Paris-Charles de Gaulle 2025", sub: "Primary Air France hub" },
    { val: F.AMS_PASSENGERS, label: "Amsterdam Schiphol 2025", sub: "Primary KLM hub" },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-8">
        <div className="mb-5">
          <span className={`${ACCENT} text-sm font-semibold uppercase tracking-widest`}>The Network</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold mt-2">
            Two Hubs. Three Airlines. <span className={ACCENT}>{F.DESTINATIONS} Destinations.</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Every one of these travellers passes through an airport — before departure, in transit and on arrival.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className={`text-3xl font-bold ${ACCENT} mb-1`}>{s.val}</div>
              <div className="text-[#0a1f44] font-semibold text-sm">{s.label}</div>
              <div className="text-slate-500 text-xs mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <Plane className="w-6 h-6 text-blue-600" />, title: "Air France", desc: "Hubbed at Paris-Charles de Gaulle and Paris-Orly, serving nearly 170 destinations in 73 countries." },
            { icon: <Plane className="w-6 h-6 text-blue-600" />, title: "KLM", desc: "Hubbed at Amsterdam Schiphol, with more than 160 destinations of its own and a 300+ destination partner network." },
            { icon: <Globe className="w-6 h-6 text-blue-600" />, title: "Transavia", desc: `${F.TRANSAVIA_PASSENGERS} leisure passengers a year across France and the Netherlands — all airport-bound.` },
          ].map((c) => (
            <div key={c.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="mb-2">{c.icon}</div>
              <div className="font-bold text-[#0a1f44] mb-1">{c.title}</div>
              <div className="text-slate-600 text-sm leading-relaxed">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}

/* ---------------------------------------------------------- OPPORTUNITY */
export function SlideOpportunity() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-8 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className={`${ACCENT_DARK} text-sm font-semibold uppercase tracking-widest`}>The Opportunity</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              Your Travellers Spend at Airports.<br /><span className={ACCENT_DARK}>That Revenue Never Comes Back to You.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {[
              { val: F.GLOBAL_PAX_MOVEMENTS, label: "Global passenger movements in 2025", sub: "Air France-KLM travellers are among them" },
              { val: F.GLOBAL_DUTY_FREE, label: "Global duty-free & travel retail sales", sub: "Generated by travellers you already carry" },
              { val: F.NON_PURCHASE_SHARE, label: "Of passengers never buy", sub: "A vast, untapped downstream spend pool" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className={`text-3xl md:text-4xl font-bold ${ACCENT_DARK} mb-2`}>{s.val}</div>
                <div className="text-white font-semibold text-sm">{s.label}</div>
                <div className="text-slate-400 text-xs mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/40 border border-blue-500/30 rounded-2xl p-6 mb-4">
            <h3 className="text-white font-bold text-lg mb-3">The Airline Position</h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              An airline carries the traveller to the airport, into the terminal and on to the destination — but the
              spend that happens on the ground has always belonged to the retailer alone. DutyBoost redirects a share
              of that spend back to the airline that brought the traveller, turning every booking into a new, passive,
              performance-based revenue stream at zero cost to the airline or its passengers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "At your hub", desc: "Departing travellers redeem their DutyCredit in the departure terminal at CDG, AMS and every other airport you serve." },
              { title: "Where they land", desc: "Arriving travellers redeem at the destination airport — the same DutyCredit works across the network, not just at home." },
              { title: "On every booking", desc: "Flights, hotels and car rental issued through Air France-KLM can all carry a DutyCredit from one snippet." },
            ].map((c) => (
              <div key={c.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className={`font-bold ${ACCENT_DARK} mb-1.5`}>{c.title}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

/* -------------------------------------------------------------- REGIONS */
export function SlideRegions() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-8">
        <div className="mb-5">
          <span className={`${ACCENT} text-sm font-semibold uppercase tracking-widest`}>Destinations by Region</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold mt-2">
            The Whole Network, <span className={ACCENT}>By Region</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            FY2025 passengers carried by the network airlines ({F.NETWORK_PASSENGERS}), plus {F.TRANSAVIA_PASSENGERS} Transavia
            passengers — {F.GROUP_PASSENGERS} in total.
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Region</th>
                <th className="text-right px-4 py-3 font-semibold">Destinations</th>
                <th className="text-right px-4 py-3 font-semibold">Passengers / year</th>
                <th className="text-right px-4 py-3 font-semibold">Share of network</th>
              </tr>
            </thead>
            <tbody>
              {F.REGIONS.map((r) => (
                <tr key={r.region} className="border-t border-slate-200">
                  <td className="px-4 py-2.5 font-medium text-[#0a1f44]">{r.region}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600">{r.dest}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-blue-700">{r.pax}</td>
                  <td className="px-4 py-2.5 text-right text-slate-500">{r.share}%</td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-300 bg-blue-50">
                <td className="px-4 py-3 font-bold text-[#0a1f44]">Network airlines total</td>
                <td className="px-4 py-3 text-right font-bold text-[#0a1f44]">~{F.DESTINATIONS}</td>
                <td className="px-4 py-3 text-right font-bold text-blue-700">{F.NETWORK_PASSENGERS}</td>
                <td className="px-4 py-3 text-right font-bold text-[#0a1f44]">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="font-bold text-[#0a1f44] mb-2">What this means for DutyBoost</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every region is a market where the airline already delivers the traveller to a participating airport.
              The wider the network, the more redemption points a single DutyCredit has — and the more each booking is worth.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-[#0a1f44] mb-2">Where the value concentrates</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Short- and medium-haul carries the highest passenger volume, while long-haul carries the highest basket
              value. Together they cover both frequency and spend — the two inputs that drive redemption.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

/* -------------------------------------------------- DESTINATION TABLES */
function DestinationTable({ rows, pp, setPp }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-slate-500 text-xs uppercase tracking-wide mr-1">Conversion uplift of non-purchasing travellers</span>
        {[0.5, 1, 2].map((v) => (
          <button
            key={v}
            onClick={() => setPp(v)}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              pp === v ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            +{v} pp
          </button>
        ))}
      </div>
      <div className="overflow-auto rounded-2xl border border-slate-200 max-h-[46vh] lg:max-h-none">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600 sticky top-0">
            <tr>
              <th className="text-left px-3 py-2.5 font-semibold">Destination</th>
              <th className="text-left px-3 py-2.5 font-semibold hidden md:table-cell">Region</th>
              <th className="text-right px-3 py-2.5 font-semibold">Passengers / yr</th>
              <th className="text-right px-3 py-2.5 font-semibold">Non-buying</th>
              <th className="text-right px-3 py-2.5 font-semibold">+{pp} pp txns</th>
              <th className="text-right px-3 py-2.5 font-semibold">Airport retail</th>
              <th className="text-right px-3 py-2.5 font-semibold">AF-KLM share</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => {
              const u = F.uplift(d.pax, pp);
              return (
                <tr key={d.name} className="border-t border-slate-200">
                  <td className="px-3 py-2 font-medium text-[#0a1f44] whitespace-nowrap">{d.name}</td>
                  <td className="px-3 py-2 text-slate-500 hidden md:table-cell whitespace-nowrap">{d.region}</td>
                  <td className="px-3 py-2 text-right text-slate-600">{d.pax.toLocaleString("en-US")}</td>
                  <td className="px-3 py-2 text-right text-slate-500">{F.fmtCount(u.nonPurchasing)}</td>
                  <td className="px-3 py-2 text-right font-semibold text-blue-700">{F.fmtCount(u.txns)}</td>
                  <td className="px-3 py-2 text-right text-slate-600">{F.fmtEur(u.retail)}</td>
                  <td className="px-3 py-2 text-right font-semibold text-orange-600">{F.fmtEur(u.partner)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-slate-400 text-xs mt-2">
        Passenger volumes are estimates derived from published 2025 hub route statistics (CDG / AMS) and Air France-KLM network
        capacity. Conversion is modelled on the €20 Entry-tier minimum basket, 90% of travellers leaving without a purchase, and a
        0.5% partner share of the qualifying basket.
      </p>
    </>
  );
}

export function SlideLongHaul() {
  const [pp, setPp] = useState(1);
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-12 md:py-6">
        <div className="mb-4">
          <span className={`${ACCENT} text-sm font-semibold uppercase tracking-widest`}>Long-Haul Destinations</span>
          <h2 className="text-xl md:text-2xl font-heading font-bold mt-2">
            Where Your Long-Haul Travellers <span className={ACCENT}>Land and Spend</span>
          </h2>
        </div>
        <DestinationTable rows={F.LONG_HAUL} pp={pp} setPp={setPp} />
      </div>
    </SlideWrapper>
  );
}

export function SlideShortHaul() {
  const [pp, setPp] = useState(1);
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-12 md:py-6">
        <div className="mb-4">
          <span className={`${ACCENT} text-sm font-semibold uppercase tracking-widest`}>Europe & Short-Haul Destinations</span>
          <h2 className="text-xl md:text-2xl font-heading font-bold mt-2">
            The Highest-Frequency Network <span className={ACCENT}>in the Programme</span>
          </h2>
        </div>
        <DestinationTable rows={F.SHORT_HAUL} pp={pp} setPp={setPp} />
      </div>
    </SlideWrapper>
  );
}

/* -------------------------------------------------------------- JOURNEY */
export function SlideJourney() {
  const stages = [
    {
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      title: "1. At your hub",
      desc: "Departing travellers pass through the terminal at Paris-Charles de Gaulle or Amsterdam Schiphol with a DutyCredit already on their phone.",
    },
    {
      icon: <Plane className="w-8 h-8 text-blue-600" />,
      title: "2. In flight",
      desc: "The DutyCredit sits in the booking confirmation and boarding pass — a reminder of the saving waiting at the destination, issued at zero cost to the airline.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-orange-600" />,
      title: "3. Where they land",
      desc: "On arrival, the same DutyCredit is redeemed at a participating store — turning every destination you fly to into a potential redemption point.",
    },
    {
      icon: <Plane className="w-8 h-8 text-blue-600 -scale-x-100" />,
      title: "4. And all over again on the way back",
      desc: "A fresh DutyCredit is issued on the return booking and carried in the confirmation and boarding pass — then redeemed in the departure hall at the destination, and again on landing at Paris-Charles de Gaulle or Amsterdam Schiphol.",
    },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-8">
        <div className="mb-6">
          <span className={`${ACCENT} text-sm font-semibold uppercase tracking-widest`}>Across the Journey</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold mt-2">
            One DutyCredit, <span className={ACCENT}>Every Leg of the Journey</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            The outbound leg repeats in reverse on the way home — hub, in flight and landing all over again, at no extra cost to the airline.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-6">
          {stages.map((s) => (
            <div key={s.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="mb-3">{s.icon}</div>
              <div className="font-bold text-[#0a1f44] mb-2">{s.title}</div>
              <div className="text-slate-600 text-sm leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
        <div className="bg-slate-800 text-white rounded-2xl p-5">
          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            The DutyCredit is <span className="text-blue-300 font-semibold">single-use and infinitely renewable</span> — a traveller
            can hold one for the departure hall, another for the destination, and another for the return leg. Both legs of every
            journey, in both directions, become a new opportunity, with no additional cost or liability for Air France-KLM.
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

/* ------------------------------------------------------------ ECONOMICS */
export function SlideEconomics() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-8 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className={`${ACCENT_DARK} text-sm font-semibold uppercase tracking-widest`}>Transaction Economics</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              €20 Entry-Tier Basket — <span className={ACCENT_DARK}>Where Your Commission Comes From</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                {[
                  { label: "Original qualifying retail value", val: "€20.00", style: "text-white font-bold text-lg" },
                  { label: "Traveller DutyCredit saving (5%)", val: "€1.00", style: "text-orange-300" },
                  { label: "Traveller actually pays", val: "€19.00", style: "text-blue-300" },
                  { label: "DutyBoost platform fee (2.5%)", val: "€0.50", style: "text-slate-400" },
                  { label: "→ Air France-KLM share (20% of fee)", val: "€0.10", style: "text-blue-300" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-sm text-slate-300">{row.label}</span>
                    <span className={`text-sm font-semibold ${row.style}`}>{row.val}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-2 mt-2 bg-blue-900/40 rounded-xl px-3">
                  <span className="text-blue-200 font-bold text-sm">Airport retailer net before normal costs</span>
                  <span className="text-blue-200 font-bold text-xl">€18.50</span>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-slate-400 text-xs uppercase tracking-wide mb-2">Platform fee distribution on €0.50</div>
                <div className="flex h-5 rounded-full overflow-hidden gap-px">
                  <div className="bg-blue-500" style={{ width: "20%" }} />
                  <div className="bg-slate-600" style={{ width: "80%" }} />
                </div>
                <div className="flex gap-3 mt-2 flex-wrap text-xs">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-blue-500" /><span className="text-slate-400">Air France-KLM 20% (€0.10)</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-slate-600" /><span className="text-slate-400">DutyBoost 80% (€0.40)</span></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/50 border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-3">The Core Question</h3>
                <p className="text-blue-100 text-base leading-relaxed font-semibold">
                  “Is earning a share of every €20 your passengers spend at airports — with zero cost, zero effort and zero
                  liability — a meaningful new revenue line from bookings you already make?”
                </p>
                <p className="text-blue-300 font-bold text-lg mt-3">Yes — and it scales with your network.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-3">Why the economics work for Air France-KLM</h3>
                {[
                  { item: "You already carry the traveller", val: "€0 marginal cost", sub: "Issuing a DutyCredit is one snippet call" },
                  { item: "Discount is retailer-funded", val: "€0 to your passengers", sub: "No discount liability on your books" },
                  { item: "Capped per transaction", val: "Predictable payout", sub: "Higher baskets still earn, up to the cap" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center p-2 rounded-lg">
                    <div>
                      <div className="text-slate-300 text-sm">{row.item}</div>
                      <div className="text-slate-500 text-xs">{row.sub}</div>
                    </div>
                    <span className="font-bold text-blue-300 whitespace-nowrap ml-3">{row.val}</span>
                  </div>
                ))}
                <p className="text-slate-400 text-xs mt-3">
                  Paid monthly by DutyBoost — out of its own fee. Never a cost to the airline or its passengers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

/* ---------------------------------------------------------------- SCALE */
export function SlideScale() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-8">
        <div className="mb-5">
          <span className={`${ACCENT} text-sm font-semibold uppercase tracking-widest`}>Network-Wide Value</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold mt-2">
            What DutyBoost Could Generate <span className={ACCENT}>Across Your {F.GROUP_PASSENGERS} Passengers</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Modelled on all {F.GROUP_PASSENGERS} group passengers, 90% of whom leave an airport without buying, at the
            €20 Entry-tier minimum basket.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          {F.SCALE_ROWS.map((r) => (
            <div key={r.pp} className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">{r.pp} uplift</div>
              <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">{F.fmtEur(r.partner)}</div>
              <div className="text-blue-600 text-xs font-medium mb-3">annual Air France-KLM share</div>
              <div className="border-t border-blue-200 pt-2 space-y-1 text-xs text-slate-500">
                <div>{F.fmtCount(r.txns)} new transactions</div>
                <div>{F.fmtEur(r.retail)} airport retail</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <h3 className="font-bold mb-3">The numbers scale with the basket</h3>
            <div className="space-y-2 text-sm">
              {[
                { b: "€20 Entry-tier basket (shown above)", m: "1× the figures" },
                { b: "€60 blended airport basket", m: "3× the figures" },
                { b: "€100 premium basket", m: "5× the figures" },
              ].map((row) => (
                <div key={row.b} className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-white/5">
                  <span className="text-slate-300">{row.b}</span>
                  <span className="text-blue-300 font-semibold whitespace-nowrap ml-3">{row.m}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-xs mt-3">
              Partner share is 0.5% of the qualifying basket (20% of DutyBoost's 2.5% fee), capped per transaction.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="font-bold text-[#0a1f44] mb-3">Why this is pure upside</h3>
            <ul className="space-y-2 text-sm">
              {[
                "100% passive — earned from bookings you already make",
                "Zero cost — no setup fee, no subscription, no discount liability",
                "No change to your booking flow, pricing or brand",
                "Attributed and paid monthly, transparently per redemption",
                "One integration across flights, hotels and car rental",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

/* ------------------------------------------------------------ INTEGRATE */
export function SlideIntegrate() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-8 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className={`${ACCENT_DARK} text-sm font-semibold uppercase tracking-widest`}>Integration Simplicity</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              One Lightweight Snippet.<br /><span className={ACCENT_DARK}>Every Booking Activated.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">DutyBoost Sits Beside Your Booking Flow — Not Against It</h3>
              <div className="space-y-3">
                {[
                  "Your booking, loyalty and CRM systems remain the systems of record",
                  "DutyBoost adds a single snippet to issue DutyCredits",
                  "No replacement of booking, payment or loyalty infrastructure",
                  "One snippet works across flights, hotels and car rental",
                  "Reusable across markets — lower marginal onboarding cost",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/50 border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-2">ONE SNIPPET</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-5">
                A single snippet in your booking flow issues a DutyCredit to every traveller — turning every booking type
                into a passive, redemption-linked commission stream.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { icon: <Plane className="w-7 h-7 text-blue-300 mx-auto" />, label: "Flights" },
                  { icon: <Building2 className="w-7 h-7 text-blue-300 mx-auto" />, label: "Hotels" },
                  { icon: <MapPin className="w-7 h-7 text-blue-300 mx-auto" />, label: "Car Rental" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3">
                    <div className="flex justify-center">{s.icon}</div>
                    <div className="text-slate-400 text-xs mt-2">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

/* -------------------------------------------------------------- CLOSING */
export function SlideClosing() {
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-8 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #1F6BFF 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-xl">
              <DutyBoostLogo height={40} linkTo={null} />
            </div>
          </div>
          <span className={`${ACCENT_DARK} text-sm font-semibold uppercase tracking-widest`}>Next Steps</span>
          <h2 className="text-xl md:text-4xl font-heading font-bold text-white mt-2 mb-4 leading-tight">
            {F.GROUP_PASSENGERS} Passengers.<br />
            <span className={ACCENT_DARK}>{F.DESTINATIONS} Redemption Points.</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-6">
            DutyBoost is designed to deliver measurable added value to your booking flow in a very short time — no lengthy
            rollout, no upfront investment, no operational disruption. Once live, every validated redemption at a participating
            airport store earns Air France-KLM a share of the platform fee, paid monthly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto mb-6 text-left">
            {[
              { title: "Weeks, not months", desc: "A single lightweight snippet — no replacement of your booking system, pricing or brand." },
              { title: "Commission from day one", desc: "Every redemption by an Air France-KLM traveller earns your share of the platform fee." },
              { title: "Revenue from the 90% who never buy", desc: "DutyBoost activates non-intending passengers into incremental airport spend." },
              { title: "A stronger loyalty story", desc: "A genuine, retailer-funded discount at every airport you fly to — a tangible perk for every passenger." },
            ].map((c) => (
              <div key={c.title} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-blue-300 font-bold mb-1.5">{c.title}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-blue-300 text-base md:text-lg font-bold">
              No setup fee. No subscription. No risk. Only passive income — connected.
            </p>
            <Link
              to="/travel-partner-request"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Book a Partnership Call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

/* -------------------------------------------------------------- EXPORTS */
export { SlideSolution };