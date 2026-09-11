import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle, Plug, Wallet, Gift, ShieldCheck, Globe, BarChart3 } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { SlideSolution } from "@/components/shared/SlideSolution";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SLIDES = [
  { id: "cover", type: "cover" },
  { id: "opportunity", type: "opportunity" },
  { id: "problem", type: "problem" },
  { id: "solution", type: "solution" },
  { id: "howItWorks", type: "howItWorks" },
  { id: "economics", type: "economics" },
  { id: "tiers", type: "tiers" },
  { id: "scale", type: "scale" },
  { id: "benefits", type: "benefits" },
  { id: "integrate", type: "integrate" },
  { id: "getStarted", type: "getStarted" },
];

function SlideWrapper({ children, dark = false }) {
  return (
    <div className={`w-full flex flex-col overflow-y-auto lg:overflow-hidden ${dark ? "bg-[#0a0f1e] text-white" : "bg-white text-[#0a0f1e]"}`}>
      {children}
    </div>
  );
}

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

function SlideCover({ t }) {
  const s = t("corporate.pitch.cover", { returnObjects: true });
  const c = t("corporate.common", { returnObjects: true });
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 text-center relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-16">
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl">
            <DutyBoostLogo height={50} linkTo="/get-started" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4">
              {s.title1}<br />
              <span className="text-indigo-400">{s.title2}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed">{s.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-x-6 sm:gap-x-12 lg:gap-x-16 gap-y-4 mt-4 w-full max-w-xl lg:max-w-4xl">
            {[
              { label: s.stat1_label, value: s.stat1_value },
              { label: s.stat2_label, value: s.stat2_value },
              { label: s.stat3_label, value: s.stat3_value },
            ].map((st) => (
              <div key={st.label} className="flex flex-col items-center text-center">
                <div className="text-xl sm:text-3xl lg:text-5xl font-bold text-indigo-400 whitespace-nowrap">{st.value}</div>
                <div className="text-xs sm:text-sm lg:text-lg text-slate-400 mt-1 whitespace-nowrap">{st.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500 border border-slate-700 rounded px-4 py-2">{c.confidential}</div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideOpportunity({ t }) {
  const s = t("corporate.pitch.opportunity", { returnObjects: true });
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">{s.eyebrow}</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              {s.title1}<br /><span className="text-indigo-400">{s.title2}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 mb-5 lg:mb-8">
            {[
              { val: s.stat1_val, label: s.stat1_label, sub: s.stat1_sub },
              { val: s.stat2_val, label: s.stat2_label, sub: s.stat2_sub },
              { val: s.stat3_val, label: s.stat3_label, sub: s.stat3_sub },
            ].map((st) => (
              <div key={st.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-7">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-400 mb-2">{st.val}</div>
                <div className="text-white font-semibold text-sm lg:text-base">{st.label}</div>
                <div className="text-slate-400 text-xs lg:text-sm mt-1">{st.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/30 rounded-2xl p-5 lg:p-7">
            <h3 className="text-white font-bold text-lg mb-3">{s.bodyTitle}</h3>
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">{s.body}</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideProblem({ t }) {
  const s = t("corporate.pitch.problem", { returnObjects: true });
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">{s.eyebrow}</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            {s.title1} <span className="text-indigo-600">{s.title2}</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">{s.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {[
            { val: s.conv1_val, label: s.conv1_label, sub: s.conv1_sub, cls: "bg-red-50 border-red-200", valCls: "text-red-600", labelCls: "text-red-900", subCls: "text-red-700" },
            { val: s.conv2_val, label: s.conv2_label, sub: s.conv2_sub, cls: "bg-amber-50 border-amber-200", valCls: "text-amber-700", labelCls: "text-amber-900", subCls: "text-amber-700" },
            { val: s.conv3_val, label: s.conv3_label, sub: s.conv3_sub, cls: "bg-indigo-50 border-indigo-200", valCls: "text-indigo-600", labelCls: "text-indigo-900", subCls: "text-indigo-700" },
          ].map((st, i) => (
            <div key={i} className={`${st.cls} border rounded-2xl p-4`}>
              <div className={`text-2xl font-bold ${st.valCls}`}>{st.val}</div>
              <div className={`text-sm font-semibold ${st.labelCls} mt-1`}>{st.label}</div>
              <div className={`text-xs ${st.subCls} mt-1`}>{st.sub}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h3 className="font-bold text-red-900 mb-3">{s.col1Title}</h3>
            <ul className="space-y-2.5 text-sm">
              {[s.col1_item1, s.col1_item2, s.col1_item3, s.col1_item4, s.col1_item5].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-red-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-900 mb-3">{s.col2Title}</h3>
            <ul className="space-y-3 text-sm">
              {[
                { t: s.col2_item1_t, d: s.col2_item1_d },
                { t: s.col2_item2_t, d: s.col2_item2_d },
                { t: s.col2_item3_t, d: s.col2_item3_d },
                { t: s.col2_item4_t, d: s.col2_item4_d },
              ].map((row, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                  <div>
                    <div className="font-semibold text-slate-900">{row.t}</div>
                    <div className="text-slate-600 text-xs">{row.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-slate-800 text-white rounded-2xl p-5">
          <p className="text-slate-200 text-sm leading-relaxed">{s.footer}</p>
        </div>
      </div>
    </SlideWrapper>
  );
}

// SlideSolution — imported from @/components/shared/SlideSolution

function SlideHowItWorks({ t }) {
  const s = t("corporate.pitch.howItWorks", { returnObjects: true });
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">{s.eyebrow}</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            {s.title1} <span className="text-indigo-600">{s.title2}</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">{s.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            { icon: <Plug className="w-8 h-8 text-indigo-600" />, title: s.card1_title, desc: s.card1_desc, cardCls: "bg-indigo-50 border-indigo-200", titleCls: "text-indigo-900", bodyCls: "text-indigo-800" },
            { icon: <Gift className="w-8 h-8 text-orange-600" />, title: s.card2_title, desc: s.card2_desc, cardCls: "bg-orange-50 border-orange-200", titleCls: "text-orange-900", bodyCls: "text-orange-800" },
            { icon: <Wallet className="w-8 h-8 text-green-600" />, title: s.card3_title, desc: s.card3_desc, cardCls: "bg-green-50 border-green-200", titleCls: "text-green-900", bodyCls: "text-green-800" },
          ].map((card, i) => (
            <div key={i} className={`${card.cardCls} border rounded-2xl p-5`}>
              <div className="mb-3">{card.icon}</div>
              <div className={`font-bold ${card.titleCls} mb-2`}>{card.title}</div>
              <div className={`${card.bodyCls} text-sm leading-relaxed`}>{card.desc}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <h3 className="font-bold mb-3">{s.notTitle}</h3>
            <div className="space-y-2 text-sm">
              {[s.not1, s.not2, s.not3, s.not4, s.not5].map((text, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span>❌</span>
                  <span className="text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="font-bold text-green-900 mb-3">{s.isTitle}</h3>
            <div className="space-y-2 text-sm">
              {[s.is1, s.is2, s.is3, s.is4, s.is5].map((text, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span>✅</span>
                  <span className="text-green-800">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideEconomics({ t }) {
  const s = t("corporate.pitch.economics", { returnObjects: true });
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">{s.eyebrow}</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mt-2">
              {s.title1} <span className="text-indigo-400">{s.title2}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
                <div className="space-y-2">
                  {[
                    { label: s.row1_label, val: s.row1_val, style: "text-white font-bold text-lg" },
                    { label: s.row2_label, val: s.row2_val, style: "text-orange-300" },
                    { label: s.row3_label, val: s.row3_val, style: "text-blue-300" },
                    { label: s.row4_label, val: s.row4_val, style: "text-slate-400" },
                    { label: s.row5_label, val: s.row5_val, style: "text-indigo-300", indent: true },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center py-1 border-b border-white/5 ${i === 0 ? "pb-2 mb-1" : ""}`}>
                      <span className={`text-sm ${row.indent ? "pl-4 text-slate-500" : "text-slate-300"}`}>{row.label.trim()}</span>
                      <span className={`text-sm font-semibold ${row.style}`}>{row.val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 mt-1 bg-green-900/40 rounded-xl px-3">
                    <span className="text-green-300 font-bold text-sm">{s.netLabel}</span>
                    <span className="text-green-300 font-bold text-xl">{s.netVal}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="text-slate-400 text-xs uppercase tracking-wide mb-2">{s.distTitle}</div>
                <div className="flex h-5 rounded-full overflow-hidden gap-px">
                  <div className="bg-indigo-500" style={{ width: "20%" }} title="Corporate 20%" />
                  <div className="bg-blue-500" style={{ width: "80%" }} title="DutyBoost 80%" />
                </div>
                <div className="flex gap-3 mt-2 flex-wrap text-xs">
                  {[
                    { color: "bg-indigo-500", label: s.dist1_label },
                    { color: "bg-blue-500", label: s.dist2_label },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                      <span className="text-slate-400">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-indigo-900/50 to-violet-900/50 border border-indigo-500/30 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-3">{s.coreTitle}</h3>
                <p className="text-indigo-200 text-base leading-relaxed font-semibold">{s.coreBody}</p>
                <p className="text-indigo-400 font-bold text-lg mt-3">{s.coreAnswer}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-3">{s.whyTitle}</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { item: s.why1_item, val: s.why1_val, sub: s.why1_sub },
                    { item: s.why2_item, val: s.why2_val, sub: s.why2_sub },
                    { item: s.why3_item, val: s.why3_val, sub: s.why3_sub },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-lg">
                      <div>
                        <div className="text-slate-300">{row.item}</div>
                        <div className="text-slate-500 text-xs">{row.sub}</div>
                      </div>
                      <span className="font-bold text-indigo-300">{row.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-3">{s.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideTiers({ t }) {
  const s = t("corporate.pitch.tiers", { returnObjects: true });
  const rows = [
    { tier: "Entry", range: "€20–€49", disc: "5%–7.5%", save: "€1.00–€3.19", highlight: false },
    { tier: "Boarding", range: "€50–€99", disc: "7.5%–10%", save: "€3.75–€9.41", highlight: false },
    { tier: "Standard", range: "€100–€149", disc: "10%–12.5%", save: "€10.00–€18.25", highlight: true },
    { tier: "Plus", range: "€150–€199", disc: "12.5%–15%", save: "€18.75–€29.04", highlight: false },
    { tier: "Lounge", range: "€200–€249", disc: "15%–17.5%", save: "€30.00–€42.75", highlight: false },
    { tier: "Premium", range: "€250–€299", disc: "17.5%–20%", save: "€43.75–€57.00", highlight: false },
    { tier: "VIP", range: "€300+", disc: "20% capped", save: "Up to €60", highlight: false },
  ];
  const cards = [
    { title: s.card1_title, desc: s.card1_desc, cardCls: "bg-indigo-50 border-indigo-200", titleCls: "text-indigo-800", bodyCls: "text-indigo-700" },
    { title: s.card2_title, desc: s.card2_desc, cardCls: "bg-orange-50 border-orange-200", titleCls: "text-orange-800", bodyCls: "text-orange-700" },
    { title: s.card3_title, desc: s.card3_desc, cardCls: "bg-violet-50 border-violet-200", titleCls: "text-violet-800", bodyCls: "text-violet-700" },
  ];
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">{s.eyebrow}</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            {s.title1} <span className="text-indigo-600">{s.title2}</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">{s.subtitle}</p>
        </div>
        <div className="bg-slate-800 text-white rounded-2xl p-4 sm:p-6 mb-5">
          <div className="grid grid-cols-4 gap-2 text-xs text-slate-400 mb-2 px-2">
            <span>{s.colTier}</span><span>{s.colRange}</span><span>{s.colDiscount}</span><span className="text-right">{s.colSave}</span>
          </div>
          <div className="space-y-1.5">
            {rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 gap-2 py-2 px-2 rounded-lg text-sm ${row.highlight ? "bg-indigo-800/60" : "hover:bg-white/5"}`}>
                <span className={`font-semibold ${row.highlight ? "text-indigo-200" : "text-indigo-400"}`}>{row.tier}</span>
                <span className="text-slate-300">{row.range}</span>
                <span className="text-yellow-300">{row.disc}</span>
                <span className="text-green-300 font-semibold text-right">{row.save}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div key={i} className={`${card.cardCls} border rounded-xl p-4`}>
              <div className={`font-bold ${card.titleCls} mb-2`}>{card.title}</div>
              <div className={`${card.bodyCls} text-sm leading-relaxed`}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideScale({ t }) {
  const s = t("corporate.pitch.scale", { returnObjects: true });
  const c = t("corporate.common", { returnObjects: true });
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6">
        <div className="mb-5">
          <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">{s.eyebrow}</span>
          <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
            {s.title1} <span className="text-indigo-600">{s.title2}</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm">{s.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {[
            { size: s.card1_size, stores: s.card1_stores, conv: s.card1_conv, net: s.card1_net, cardCls: "bg-indigo-50 border-indigo-200", titleCls: "text-indigo-600", valueCls: "text-indigo-700", subCls: "text-indigo-600" },
            { size: s.card2_size, stores: s.card2_stores, conv: s.card2_conv, net: s.card2_net, cardCls: "bg-violet-50 border-violet-200", titleCls: "text-violet-600", valueCls: "text-violet-700", subCls: "text-violet-600" },
            { size: s.card3_size, stores: s.card3_stores, conv: s.card3_conv, net: s.card3_net, cardCls: "bg-blue-50 border-blue-200", titleCls: "text-blue-600", valueCls: "text-blue-700", subCls: "text-blue-600" },
          ].map((st) => (
            <div key={st.size} className={`${st.cardCls} border rounded-2xl p-5 text-center`}>
              <div className={`text-xs font-semibold ${st.titleCls} uppercase tracking-wide mb-1`}>{st.size}</div>
              <div className="text-slate-500 text-sm mb-3">{st.stores}</div>
              <div className={`text-2xl md:text-3xl font-bold ${st.valueCls} mb-1`}>{st.net}</div>
              <div className={`${st.subCls} text-sm font-medium mb-2`}>{c.cardSub}</div>
              <div className="text-slate-500 text-xs border-t border-slate-200 pt-2">{st.conv} @ €60</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <h3 className="font-bold mb-3">{s.scaleTitle}</h3>
            <div className="space-y-2 text-sm">
              {[
                { pp: s.scale1_pp, mult: s.scale1_mult },
                { pp: s.scale2_pp, mult: s.scale2_mult },
                { pp: s.scale3_pp, mult: s.scale3_mult },
                { pp: s.scale4_pp, mult: s.scale4_mult },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between items-center py-1.5 px-3 rounded-lg ${i === 0 ? "bg-indigo-800/50 font-semibold" : ""}`}>
                  <span className="text-indigo-300">{row.pp}</span>
                  <span className="text-slate-300">{row.mult}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-5">
            <h3 className="font-bold text-indigo-900 mb-3">{s.upsideTitle}</h3>
            <ul className="space-y-2 text-sm">
              {[s.up1, s.up2, s.up3, s.up4].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-indigo-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideBenefits({ t }) {
  const s = t("corporate.pitch.benefits", { returnObjects: true });
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-8">
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">{s.eyebrow}</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              {s.title1}<br /><span className="text-indigo-400">{s.title2}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[
              { icon: <Wallet className="w-7 h-7 text-indigo-400" />, title: s.card1_title, desc: s.card1_desc },
              { icon: <Gift className="w-7 h-7 text-orange-400" />, title: s.card2_title, desc: s.card2_desc },
              { icon: <ShieldCheck className="w-7 h-7 text-green-400" />, title: s.card3_title, desc: s.card3_desc },
              { icon: <Globe className="w-7 h-7 text-blue-400" />, title: s.card4_title, desc: s.card4_desc },
              { icon: <Plug className="w-7 h-7 text-indigo-400" />, title: s.card5_title, desc: s.card5_desc },
              { icon: <BarChart3 className="w-7 h-7 text-green-400" />, title: s.card6_title, desc: s.card6_desc },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="mb-3">{card.icon}</div>
                <div className="text-white font-bold mb-2">{card.title}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SlideIntegrate({ t }) {
  const s = t("corporate.pitch.integrate", { returnObjects: true });
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5 lg:mb-10">
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">{s.eyebrow}</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              {s.title1}<br /><span className="text-indigo-400">{s.title2}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold lg:text-lg mb-4">{s.leftTitle}</h3>
              <div className="space-y-3">
                {[s.left1, s.left2, s.left3, s.left4, s.left5].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5"><CheckCircle className="w-4 h-4 text-green-400" /></div>
                    <span className="text-slate-300 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-900/60 to-violet-900/60 border border-indigo-500/30 rounded-2xl p-5 lg:p-7">
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">{s.rightTitle}</h3>
              <p className="text-indigo-200 text-sm lg:text-base leading-relaxed mb-3 lg:mb-5">{s.rightBody}</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: s.rs1_val, label: s.rs1_label },
                  { val: s.rs2_val, label: s.rs2_label },
                  { val: s.rs3_val, label: s.rs3_label },
                ].map((st) => (
                  <div key={st.label} className="bg-white/5 rounded-xl p-3">
                    <div className="text-indigo-300 font-bold">{st.val}</div>
                    <div className="text-slate-400 text-xs mt-1">{st.label}</div>
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

function SlideGetStarted({ t }) {
  const s = t("corporate.pitch.getStarted", { returnObjects: true });
  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4 lg:mb-6">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-xl">
              <DutyBoostLogo height={40} linkTo="/get-started" />
            </div>
          </div>
          <div className="mb-4 lg:mb-6">
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">{s.eyebrow}</span>
            <h2 className="text-xl md:text-4xl lg:text-4xl font-heading font-bold text-white mt-2 leading-tight">
              {s.title1}<br />
              <span className="text-indigo-400">{s.title2}</span>
            </h2>
          </div>
          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed mb-4 lg:mb-6">{s.lead}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 max-w-3xl lg:max-w-4xl mx-auto mb-4 lg:mb-6">
            {[
              { title: s.card1_title, desc: s.card1_desc },
              { title: s.card2_title, desc: s.card2_desc },
              { title: s.card3_title, desc: s.card3_desc },
              { title: s.card4_title, desc: s.card4_desc },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-5 text-left">
                <div className="text-indigo-300 font-bold lg:text-base mb-1.5">{card.title}</div>
                <div className="text-slate-400 text-xs lg:text-sm leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-indigo-400 text-base lg:text-xl font-bold">{s.cta1}</p>
            <p className="text-slate-300 text-sm lg:text-base font-semibold">{s.cta2}</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

const SLIDE_COMPONENTS = {
  cover: SlideCover,
  opportunity: SlideOpportunity,
  problem: SlideProblem,
  solution: SlideSolution,
  howItWorks: SlideHowItWorks,
  economics: SlideEconomics,
  tiers: SlideTiers,
  scale: SlideScale,
  benefits: SlideBenefits,
  integrate: SlideIntegrate,
  getStarted: SlideGetStarted,
};

export default function CorporatePartnerPitchDeck() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const slideAreaRef = useRef(null);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(SLIDES.length - 1, c + 1));

  useEffect(() => {
    if (slideAreaRef.current) {
      slideAreaRef.current.scrollIntoView({ block: "start", behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [current]);

  const slide = SLIDES[current];
  const SlideComp = SLIDE_COMPONENTS[slide.type];
  const labels = t("corporate.pitch.labels", { returnObjects: true });
  const common = t("corporate.common", { returnObjects: true });

  return (
    <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-start lg:justify-center p-3 py-2 overflow-x-hidden">
      <div className="w-full max-w-[1400px] flex items-center justify-between mb-2 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <LanguageSwitcher />
          <div className="text-white text-sm font-semibold opacity-60 truncate">
            {common.headerLabel} <span className="text-xs opacity-50 ml-2 hidden sm:inline">CONFIDENTIAL</span>
          </div>
        </div>
        <div className="text-slate-400 text-sm">{current + 1} / {SLIDES.length}</div>
      </div>

      <div ref={slideAreaRef} className="w-full max-w-[1400px] flex rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[58vh] lg:h-[calc(100vh-150px)]">
        <SlideComp t={t} />
      </div>

      <div className="w-full max-w-[1400px] flex flex-wrap items-center justify-between gap-3 mt-3">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none"
        >
          <ChevronLeft size={18} /> {common.prev}
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center max-w-lg">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              title={labels[s.type]}
              className={`text-xs px-3 py-1 rounded-lg transition-all font-medium ${
                i === current ? "bg-indigo-600 text-white" : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold cursor-pointer select-none"
        >
          {common.next} <ChevronRight size={18} />
        </button>
      </div>
      <div className="mt-1.5 text-slate-500 text-sm">{labels[slide.type]}</div>
    </div>
  );
}