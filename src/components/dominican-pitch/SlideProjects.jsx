import { Store, Wine, Cpu } from "lucide-react";
import { ACCENT, GridBg, SlideWrapper } from "./Shared";
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
    <div className="relative overflow-hidden rounded-2xl p-4 md:p-5 text-white bg-gradient-to-br from-[#0a0f1e] via-[#140c28] to-[#231136] border border-white/10 flex flex-col h-full">
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-widest text-white/40">{code}</span>
              <Icon className="w-4 h-4 text-white/40" />
            </div>
            <h3 className="font-heading font-bold text-xl md:text-2xl mt-1">{data.country}</h3>
            <p className="text-white/50 text-xs">{data.airport}</p>
          </div>
          <StatusPill label={live} isLive={isLive} />
        </div>

        <p className="text-base font-semibold mt-3" style={{ color: "#f5d0fe" }}>
          {data.status}
        </p>

        <div className="mt-4 flex-1 flex flex-col gap-3">{data.blocks}</div>

        <p className="text-sm text-white/45 mt-4 leading-snug">{data.note}</p>
      </div>
    </div>
  );
}

function PartnerRow({ name, detail, icon: Icon = Store }) {
  return (
    <div className="flex flex-1 items-start gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3.5">
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#f0abfc" }} />
      <div>
        <div className="text-lg font-semibold leading-tight">{name}</div>
        {detail && <div className="text-sm text-white/50 mt-1">{detail}</div>}
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
          <div className="text-sm uppercase tracking-widest text-white/40">{c.sxm.partnersTitle}</div>
          {c.sxm.partners.map((p) => (
            <PartnerRow key={p.name} name={p.name} detail={p.detail} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-sm uppercase tracking-widest text-white/40">{c.sxm.posTitle}</div>
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
          <div className="text-sm uppercase tracking-widest text-white/40">{c.tnt.posTitle}</div>
          <PartnerRow name={c.tnt.pos} detail={c.tnt.posNote} icon={Cpu} />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-sm uppercase tracking-widest text-white/40">{c.tnt.rolloutTitle}</div>
          <PartnerRow name={c.tnt.rollout} icon={Wine} />
          <div className="flex flex-wrap gap-2">
            {c.tnt.stores.map((s) => (
              <span
                key={s}
                className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-base font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#f0abfc" }} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </>
    ),
  };

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col px-5 py-4 md:px-10 md:py-6 relative">
        <GridBg />
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-3 shrink-0">
            <span className="text-sm md:text-base font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              {c.eyebrow}
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1.5 text-sm leading-snug">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 min-h-0">
            <MarketCard code="SXM" data={sxm} icon={Store} live={c.live} />
            <MarketCard code="POS" data={tnt} icon={Cpu} live={c.live} isLive={false} />
            <SxmRedemptionCard />
          </div>

        </div>
      </div>
    </SlideWrapper>
  );
}