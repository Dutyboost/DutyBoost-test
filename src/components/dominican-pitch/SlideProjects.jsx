import { Store, Wine, Cpu, BadgeCheck } from "lucide-react";
import { ACCENT, GridBg, SlideWrapper } from "./Shared";
import { useDeckLang } from "./LanguageContext";

// Live deployment track record: the two Caribbean markets already redeeming
// DutyCredits, shown to the Dominican Republic as proof of execution.
function StatusPill({ label }) {
  return (
    <span
      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0"
      style={{ background: "rgba(255,255,255,0.12)", color: "#f5d0fe" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
      {label}
    </span>
  );
}

function MarketCard({ code, data, icon: Icon, live }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-4 md:p-5 text-white bg-gradient-to-br from-[#0a0f1e] via-[#140c28] to-[#231136] border border-white/10 flex flex-col">
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest text-white/40">{code}</span>
              <Icon className="w-3.5 h-3.5 text-white/40" />
            </div>
            <h3 className="font-heading font-bold text-lg md:text-xl mt-0.5">{data.country}</h3>
            <p className="text-white/50 text-[11px]">{data.airport}</p>
          </div>
          <StatusPill label={live} />
        </div>

        <p className="text-[11px] font-semibold mt-2" style={{ color: "#f5d0fe" }}>
          {data.status}
        </p>

        <div className="mt-3 flex-1 space-y-2">{data.blocks}</div>

        <p className="text-[11px] text-white/45 mt-3 leading-snug">{data.note}</p>
      </div>
    </div>
  );
}

function PartnerRow({ name, detail }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
      <Store className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#f0abfc" }} />
      <div>
        <div className="text-sm font-semibold leading-tight">{name}</div>
        <div className="text-[11px] text-white/50">{detail}</div>
      </div>
    </div>
  );
}

export default function SlideProjects() {
  const { t } = useDeckLang();
  const c = t.projects;

  const sxm = {
    country: c.sxm.country,
    airport: c.sxm.airport,
    status: c.sxm.status,
    note: c.sxm.note,
    blocks: (
      <>
        <div className="text-[10px] uppercase tracking-widest text-white/40">{c.sxm.partnersTitle}</div>
        {c.sxm.partners.map((p) => (
          <PartnerRow key={p.name} name={p.name} detail={p.detail} />
        ))}
      </>
    ),
  };

  const tnt = {
    country: c.tnt.country,
    airport: c.tnt.airport,
    status: c.tnt.status,
    note: c.tnt.rolloutNote,
    blocks: (
      <>
        <div className="text-[10px] uppercase tracking-widest text-white/40">{c.tnt.posTitle}</div>
        <div className="flex items-start gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
          <Cpu className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#f0abfc" }} />
          <div>
            <div className="text-sm font-semibold leading-tight">{c.tnt.pos}</div>
            <div className="text-[11px] text-white/50">{c.tnt.posNote}</div>
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-white/40 pt-1">{c.tnt.rolloutTitle}</div>
        <div className="flex items-start gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
          <Wine className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#f0abfc" }} />
          <div className="text-sm font-semibold leading-tight">{c.tnt.rollout}</div>
        </div>
      </>
    ),
  };

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col px-5 py-4 md:px-10 md:py-4 relative">
        <GridBg />
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-3 shrink-0">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              {c.eyebrow}
            </span>
            <h2 className="text-lg md:text-2xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MarketCard code="SXM" data={sxm} icon={Store} live={c.live} />
            <MarketCard code="POS" data={tnt} icon={Cpu} live={c.live} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {c.stats.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline gap-1.5 rounded-xl px-3 py-1.5"
                style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}
              >
                <span className="text-base font-bold" style={{ color: ACCENT }}>{s.value}</span>
                <span className="text-[11px] text-slate-600 font-semibold">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-start gap-2">
            <BadgeCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
            <div>
              <p className="text-[11px] font-semibold text-slate-700">{c.footer}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{c.footnote}</p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}