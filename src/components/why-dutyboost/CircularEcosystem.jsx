import { Plane, ShoppingBag, Store, Cpu, Layers, ArrowRight } from "lucide-react";

const ICONS = {
  plane: Plane,
  traveller: ShoppingBag,
  store: Store,
  cpu: Cpu,
};

const ACCENTS = {
  plane: { bg: 'hsl(217 90% 96%)', fg: '#1d4ed8', border: 'hsl(217 90% 88%)' },
  traveller: { bg: 'hsl(29 90% 96%)', fg: '#ea580c', border: 'hsl(29 90% 88%)' },
  store: { bg: 'hsl(161 70% 96%)', fg: '#0d9488', border: 'hsl(161 70% 88%)' },
  cpu: { bg: 'hsl(255 90% 96%)', fg: '#6d28d9', border: 'hsl(255 90% 90%)' },
};

const W = 730;
const H = 740;

// Card layout: 4 corners, clockwise flow (TP → TR → AR → PV → TP)
// Cards pulled inward so connector arcs stay within the card footprint.
const CARDS = [
  { left: 35, top: 0, cx: 185, cy: 108 },       // Travel Partners (top-left)
  { left: 395, top: 0, cx: 545, cy: 108 },      // Travellers (top-right)
  { left: 395, top: 524, cx: 545, cy: 632 },    // Airport Retailers (bottom-right)
  { left: 35, top: 524, cx: 185, cy: 632 },     // POS Vendors (bottom-left)
];

const HUB = { cx: 365, cy: 378, r: 95 };

export default function CircularEcosystem({ stakeholders, labels, hubSub }) {
  return (
    <div className="relative mx-auto" style={{ width: W, height: H }}>
      {/* SVG connector layer */}
      <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          <marker id="ecoArrow" markerWidth="11" markerHeight="11" refX="7" refY="3.5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#7c3aed" />
          </marker>
        </defs>

        {/* Dashed radial lines: hub ↔ each stakeholder */}
        {CARDS.map((c, i) => (
          <line key={`r${i}`} x1={HUB.cx} y1={HUB.cy} x2={c.cx} y2={c.cy}
            stroke="#c4b5fd" strokeWidth={1.5} strokeDasharray="5 4" />
        ))}

        {/* Circular flow arcs (clockwise) */}
        <path d="M 335 108 Q 365 40 395 108" fill="none" stroke="#8b5cf6" strokeWidth={2.5} markerEnd="url(#ecoArrow)" />
        <path d="M 545 216 Q 660 378 545 524" fill="none" stroke="#8b5cf6" strokeWidth={2.5} markerEnd="url(#ecoArrow)" />
        <path d="M 395 632 Q 365 700 335 632" fill="none" stroke="#8b5cf6" strokeWidth={2.5} markerEnd="url(#ecoArrow)" />
        <path d="M 185 524 Q 70 378 185 216" fill="none" stroke="#8b5cf6" strokeWidth={2.5} markerEnd="url(#ecoArrow)" />
      </svg>

      {/* Stakeholder cards */}
      {stakeholders.map((st, idx) => {
        const Icon = ICONS[st.icon] || Store;
        const accent = ACCENTS[st.icon] || ACCENTS.cpu;
        const pos = CARDS[idx];
        return (
          <div key={st.title} className="absolute rounded-xl border p-3 flex flex-col shadow-sm"
            style={{ left: pos.left, top: pos.top, width: 300, height: 216, background: accent.bg, borderColor: accent.border, zIndex: 10 }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.8)' }}>
                <Icon className="w-5 h-5" style={{ color: accent.fg }} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 leading-none">{idx + 1}.</p>
                <h3 className="font-heading font-bold text-sm leading-tight truncate">{st.title}</h3>
              </div>
            </div>
            <p className="text-[11px] italic mb-1.5 leading-snug" style={{ color: accent.fg }}>{st.tagline}</p>
            <div className="space-y-1">
              {['why', 'how', 'what'].map((k) => (
                <div key={k} className="bg-white/85 rounded px-1.5 py-1">
                  <span className="font-heading font-bold text-[10px] uppercase tracking-wide mr-1" style={{ color: accent.fg }}>{labels[k]}:</span>
                  <span className="text-[10px] text-muted-foreground leading-snug">{st[k]}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Central DutyBoost hub */}
      <div className="absolute rounded-full flex flex-col items-center justify-center text-center shadow-md border-4 border-white"
        style={{ left: HUB.cx - HUB.r, top: HUB.cy - HUB.r, width: HUB.r * 2, height: HUB.r * 2, background: 'linear-gradient(135deg, #7c3aed, #6366f1)', zIndex: 20 }}>
        <Layers className="w-7 h-7 text-white/90 mb-1" />
        <p className="font-heading font-bold text-white text-lg leading-none">DutyBoost</p>
        <p className="text-[11px] text-white/85 mt-1 px-4 leading-tight">{hubSub}</p>
        <div className="flex items-center gap-1 mt-1.5 text-white/70">
          <ArrowRight className="w-3 h-3" />
          <span className="text-[9px] uppercase tracking-wider">Circular flow</span>
        </div>
      </div>
    </div>
  );
}