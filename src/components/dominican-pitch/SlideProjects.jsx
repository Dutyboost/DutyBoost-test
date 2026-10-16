import { Store, Cpu } from "lucide-react";
import { ACCENT, GridBg, SlideWrapper } from "./Shared";
import { useDeckLang } from "./LanguageContext";
import LiveRedemptionCard from "./LiveRedemptionCard";
import StatusPill from "./StatusPill";
import { SXM_BASKETS, SXM_REDEMPTIONS, SXM_SINCE_LAUNCH } from "./sxmRedemptions";
import { POS_BASKETS, POS_REDEMPTIONS, POS_SINCE_LAUNCH } from "./posRedemptions";

// Live deployment track record: the two Caribbean markets already redeeming
// DutyCredits, shown to the Dominican Republic as proof of execution.

function MarketCard({ code, data, icon: Icon, live, isLive = true, compact = false }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-3 md:p-3.5 text-white bg-gradient-to-br from-[#0a0f1e] via-[#140c28] to-[#231136] border border-white/10 flex flex-col">
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
      />
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-widest text-white/40">{code}</span>
            <Icon className="w-4 h-4 text-white/40" />
          </div>
          <StatusPill label={live} isLive={isLive} />
        </div>
        <h3 className="font-heading font-bold text-xl md:text-2xl mt-1">{data.country}</h3>
        <p className="text-white/50 text-sm">{data.airport}</p>

        <p className={`${compact ? "text-base" : "text-lg"} font-semibold mt-1.5 leading-snug`} style={{ color: "#f5d0fe" }}>
          {data.status}
        </p>

        <div className="mt-2 flex flex-col gap-2.5">{data.blocks}</div>

        <p className={`${compact ? "text-sm" : "text-base"} text-white/45 mt-auto pt-2 leading-snug text-center`}>{data.note}</p>
      </div>
    </div>
  );
}

function PartnerRow({ name, detail, desc, icon: Icon = Store, compact = false }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5">
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#f0abfc" }} />
      <div>
        <div className={`${compact ? "text-base" : "text-lg"} font-semibold leading-tight`}>{name}</div>
        {detail && <div className="text-sm text-white/50 mt-0.5 leading-snug">{detail}</div>}
        {desc && <div className="text-sm text-white/45 mt-0.5 leading-snug">{desc}</div>}
      </div>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-xs uppercase tracking-widest text-white/40">{title}</div>
      {children}
    </div>
  );
}

export default function SlideProjects() {
  const { lang, t } = useDeckLang();
  const c = t.projects;
  const compact = lang === "es";

  const sxm = {
    country: c.sxm.country,
    airport: c.sxm.airport,
    status: c.sxm.status,
    note: c.sxm.note,
    blocks: (
      <>
        <Block title={c.sxm.partnersTitle}>
          {c.sxm.partners.map((p) => (
            <PartnerRow key={p.name} name={p.name} detail={p.detail} desc={p.desc} compact={compact} />
          ))}
        </Block>
        <Block title={c.sxm.posTitle}>
          <PartnerRow name={c.sxm.pos} detail={c.sxm.posNote} icon={Cpu} compact={compact} />
        </Block>
      </>
    ),
  };

  const tnt = {
    country: c.tnt.country,
    airport: c.tnt.airport,
    status: c.tnt.status,
    note: c.tnt.note,
    blocks: (
      <>
        <Block title={c.tnt.partnersTitle}>
          {c.tnt.partners.map((p) => (
            <PartnerRow key={p.name} name={p.name} detail={p.detail} desc={p.desc} compact={compact} />
          ))}
        </Block>
        <Block title={c.tnt.posTitle}>
          <PartnerRow name={c.tnt.pos} detail={c.tnt.posNote} icon={Cpu} compact={compact} />
        </Block>
      </>
    ),
  };

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-3 md:px-9 md:py-4 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-2">
            <span className="text-sm md:text-base font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              {c.eyebrow}
            </span>
            <h2 className={`${compact ? "text-lg md:text-2xl" : "text-xl md:text-3xl"} font-heading font-bold text-[#0a0f1e] mt-1`}>
              {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
            </h2>
            <p className="text-slate-500 mt-1 text-xs md:text-sm leading-snug">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <MarketCard code="SXM" data={sxm} icon={Store} live={c.live} compact={compact} />
            <MarketCard code="POS" data={tnt} icon={Cpu} live={c.live} compact={compact} />
            <LiveRedemptionCard
              code="SXM"
              data={SXM_REDEMPTIONS}
              since={SXM_SINCE_LAUNCH}
              baskets={SXM_BASKETS}
              copy={c.sxm}
            />
            <LiveRedemptionCard
              code="POS"
              data={POS_REDEMPTIONS}
              since={POS_SINCE_LAUNCH}
              baskets={POS_BASKETS}
              copy={c.tnt}
            />
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}