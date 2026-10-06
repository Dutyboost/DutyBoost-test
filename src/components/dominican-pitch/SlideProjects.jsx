import { Store, Wine, Cpu } from "lucide-react";
import { ACCENT, GridBg } from "./Shared";
import { useDeckLang } from "./LanguageContext";
import SxmRedemptionCard from "./SxmRedemptionCard";

// Live deployment track record: the two Caribbean markets already redeeming
// DutyCredits, shown to the Dominican Republic as proof of execution.
function StatusPill({ label, isLive = true }) {
  return (
    <span
      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex-shrink-0"
      style={{ background: "rgba(255,255,255,0.12)", color: "#f5d0fe" }}
    >
      <span className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400" : "bg-red-400"}`} />
      {label}
    </span>
  );
}

function MarketCard({ code, data, icon: Icon, live, isLive = true }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-3.5 md:p-4 text-white bg-gradient-to-br from-[#0a0f1e] via-[#140c28] to-[#231136] border border-white/10 flex flex-col h-full">
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
      />
      <div className="relative z-10 flex flex-col h-full min-h-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-widest text-white/40">{code}</span>
              <Icon className="w-4 h-4 text-white/40" />
            </div>
            <h3 className="font-heading font-bold text-xl md:text-2xl mt-0.5">{data.country}</h3>
            <p className="text-white/50 text-xs">{data.airport}</p>
          </div>
          <StatusPill label={live} isLive={isLive} />
        </div>

        <p className="text-base font-semibold mt-1.5" style={{ color: "#f5d0fe" }}>
          {data.status}
        </p>

        <div className="mt-2 flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden">{data.blocks}</div>

        <p className="text-sm text-white/45 mt-1.5 leading-snug">{data.note}</p>
      </div>
    </div>
  );
}

function PartnerRow({ name, detail, desc, icon: Icon = Store }) {
  return (
    <div className="flex flex-1 items-start gap-2.5 rounded-xl bg-white/5 border border-white/10 px-3 py-2 min-h-0 overflow-hidden">
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#f0abfc" }} />
      <div>
        <div className="text-base font-semibold leading-tight">{name}</div>
        {detail && <div className="text-sm text-white/50 mt-0.5 leading-snug">{detail}</div>}
        {desc && <div className="text-sm text-white/45 mt-0.5 leading-snug">{desc}</div>}
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
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xs uppercase tracking-widest text-white/40">{c.sxm.partnersTitle}</div>
          {c.sxm.partners.map((p) => (
            <PartnerRow key={p.name} name={p.name} detail={p.detail} desc={p.desc} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xs uppercase tracking-widest text-white/40">{c.sxm.posTitle}</div>
          <PartnerRow name={c.sxm.pos} detail={c.sxm.posNote} icon={Cpu} />
        </div>
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
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xs uppercase tracking-widest text-white/40">{c.tnt.posTitle}</div>
          <PartnerRow name={c.tnt.pos} detail={c.tnt.posNote} icon={Cpu} />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xs uppercase tracking-widest text-white/40">{c.tnt.rolloutTitle}</div>
          <PartnerRow name={c.tnt.rollout} desc={c.tnt.rolloutDesc} icon={Wine} />
        </div>
      </>
    ),
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden bg-white text-[#0a0f1e]">
      <div className="flex-1 flex flex-col px-5 py-3 md:px-10 md:py-4 relative overflow-hidden">
        <GridBg />
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-2 shrink-0">
            <span className="text-sm md:text-base font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              {c.eyebrow}
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm leading-snug">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1 gap-3 flex-1 min-h-0">
            <MarketCard code="SXM" data={sxm} icon={Store} live={c.live} />
            <SxmRedemptionCard />
            <MarketCard code="POS" data={tnt} icon={Cpu} live={c.inProgress} isLive={false} />
          </div>

        </div>
      </div>
    </div>
  );
}