import { CheckCircle } from "lucide-react";

const MARKETUS_LINK = "https://market.us/report/global-travel-retail-market/";
const ETRC_LINK = "https://etrc.org/publications/";
const KEARNEY_LINK = "https://www.kearney.com/about/kearney-in-the-media/press/travel-retails-future-flight-path-turning-heightened-volatility-into-tomorrows-market-edge";
const ACI_RETAIL_LINK = "https://www.aci-asiapac.aero/media-centre/news/airport-travel-retail-witnesses-a-fundamental-shift-as-younger-travelers-emerge-as-the-new-big-spenders";
const M1NDSET_LINK = "https://www.gtrmag.com/blog/gtr-magazine-looks-at-the-state-of-travel-and-tourism-in-the-caribbean";

const linkCls = "text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors";

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

export function SlideTierMix({
  currency = "$",
  purchaseNote = "≈51% global average purchase rate — the conversion headroom the programme targets",
  dense = false,
  rate = 1,
}) {
  const c = currency;

  // Amounts are held in EUR and converted to the display currency at `rate`.
  const fmtInt = (eur) => {
    const v = eur * rate;
    const whole = Number.isInteger(Number(v.toFixed(2)));
    return `${c}${v.toLocaleString("en-US", whole ? { maximumFractionDigits: 0 } : { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  const rateNote = rate !== 1 ? ` Amounts converted from EUR at €1 = ${c}${rate}.` : "";

  // Rows are held in EUR; the displayed basket is a whole amount in the display
  // currency, and every figure in the row is calculated from that basket.
  const money = (v) =>
    `${c}${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const units = (v) => `${c}${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  const round2 = (n) => Math.round(n * 100) / 100;

  const rows = [
    { basket: 20, share: "42%", disc: "5%", discPct: 0.05, hot: true },
    { basket: 100, share: "30%", disc: "10%", discPct: 0.10, hot: true },
    { basket: 200, share: "15%", disc: "15%", discPct: 0.15, hot: false },
    { basket: 300, share: "9%", disc: "20%", discPct: 0.20, hot: false },
    { basket: 400, label: 300, plus: true, share: "3%", disc: "20% capped", discPct: 0.20, capped: true, hot: false },
    { basket: 1000, share: "1%", disc: "20% capped", discPct: 0.20, capped: true, hot: false },
  ].map((r) => {
    const basket = Math.round(r.basket * rate);
    const saves = r.capped ? Math.min(round2(basket * r.discPct), round2(60 * rate)) : round2(basket * r.discPct);
    const fee = r.capped ? Math.min(round2(basket * 0.025), round2(25 * rate)) : round2(basket * 0.025);
    const cost = round2(saves + fee);
    const keeps = round2(basket - cost);
    return {
      ...r,
      basket,
      label: r.label != null ? Math.round(r.label * rate) : null,
      saves,
      fee,
      cost,
      keeps,
      keepsPct: `${((keeps / basket) * 100).toFixed(1)}%`,
    };
  });

  const stats = [
    { value: "87%", label: `of transactions sit below ${fmtInt(300)}`, sub: "Where the total cost stays between 7.5% and 17.5%" },
    { value: "16.6%", label: "blended cost across all transactions", sub: "The retailer keeps 83.4% of incremental value" },
    { value: "22.5%", label: `maximum possible cost — only at ${fmtInt(300)}+`, sub: `20% discount + 2.5% fee, capped at ${fmtInt(60)}` },
  ];

  const cell = dense ? "px-2.5 py-2" : "px-3 py-2.5";

  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#0a0f1e]">
      <div className={`flex-1 flex flex-col justify-center relative ${dense ? "px-5 py-5 md:px-10 md:py-5" : "px-5 py-6 md:px-12 md:py-6"}`}>
        <GridBg />
        <div className="relative z-10">
          <div className={dense ? "mb-3" : "mb-5"}>
            <span className={`text-blue-600 font-semibold uppercase tracking-widest ${dense ? "text-xs" : "text-sm"}`}>Transaction Mix — Why the Tiers Work</span>
            <h2 className={`font-heading font-bold text-[#0a0f1e] ${dense ? "text-xl md:text-2xl mt-1.5" : "text-xl md:text-3xl mt-2"}`}>
              The Biggest Win Sits <span className="text-blue-600">Below {fmtInt(300)}</span>
            </h2>
            <p className={`text-slate-500 mt-1 max-w-4xl ${dense ? "text-[13px]" : "text-sm"}`}>
              Airport retail baskets cluster in the lower tiers — exactly where the DutyCredit discount is smallest. The high-discount baskets are the smallest share of volume, so the blended cost of the whole programme stays well below the headline rate.
            </p>
          </div>

          <div className={`overflow-x-auto ${dense ? "mb-3" : "mb-5"}`}>
            <table className={`w-full min-w-[700px] border-collapse ${dense ? "text-xs" : "text-sm"}`}>
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className={`text-left rounded-tl-xl font-semibold ${cell}`}>Basket</th>
                  <th className={`text-center font-semibold ${cell}`}>Share of transactions</th>
                  <th className={`text-center font-semibold ${cell}`}>Traveller discount</th>
                  <th className={`text-center font-semibold ${cell}`}>Traveller saves</th>
                  <th className={`text-center font-semibold ${cell}`}>DutyBoost fee (2.5%)</th>
                  <th className={`text-center font-semibold ${cell}`}>Total cost to retailer</th>
                  <th className={`text-right rounded-tr-xl font-semibold ${cell}`}>Retailer keeps</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={`${r.basket}${r.plus ? "+" : ""}`} className={`border-b border-slate-100 ${r.hot ? "bg-blue-50" : i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                    <td className={`font-bold text-slate-800 ${cell}`}>{units(r.label ?? r.basket)}{r.plus ? "+" : ""}</td>
                    <td className={`text-center font-semibold text-blue-700 ${cell}`}>{r.share}</td>
                    <td className={`text-center text-slate-600 ${cell}`}>{r.disc}</td>
                    <td className={`text-center text-slate-600 ${cell}`}>{money(r.saves)}</td>
                    <td className={`text-center text-slate-600 ${cell}`}>{money(r.fee)}</td>
                    <td className={`text-center font-semibold text-red-600 ${cell}`}>{money(r.cost)}</td>
                    <td className={`text-right font-semibold text-green-700 ${cell}`}>
                      {money(r.keeps)} <span className="text-slate-400 font-normal">({r.keepsPct})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`bg-green-50 border border-green-200 rounded-xl flex items-start gap-2 ${dense ? "px-3 py-2 mb-3" : "px-4 py-2.5 mb-4"}`}>
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p className={`text-green-800 ${dense ? "text-[13px]" : "text-sm"}`}>
              <span className="font-semibold">Everything above {fmtInt(1000)} stays with the retailer.</span> The DutyCredit is capped at {fmtInt(60)} and the platform fee at {fmtInt(25)} per transaction — so as the basket grows, the retailer's share grows with it.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 ${dense ? "gap-2.5 mb-3" : "gap-4 mb-4"}`}>
            {stats.map((s) => (
              <div key={s.value} className={`bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white text-center ${dense ? "p-3.5" : "p-5"}`}>
                <div className={`font-bold mb-1 ${dense ? "text-2xl" : "text-3xl"}`}>{s.value}</div>
                <div className={`font-semibold text-blue-50 ${dense ? "text-sm" : "text-sm"}`}>{s.label}</div>
                <div className={`text-blue-100/80 mt-1 ${dense ? "text-[11px] leading-snug" : "text-xs"}`}>{s.sub}</div>
              </div>
            ))}
          </div>

          {dense ? (
            <div className="border-t border-slate-200 pt-2">
              <p className="text-slate-500 text-[11px] leading-relaxed">
                <span className="font-semibold uppercase tracking-wide text-slate-600">Basis &amp; Sources: </span>
                Tier mix calibrated to the published average transaction value of {fmtInt(70)}–{fmtInt(140)} in travel retail (
                <a href={MARKETUS_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>market.us, Travel Retail Market 2026</a>); average retail spend per passenger of €10.55 in 2025 (
                <a href={ETRC_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>ETRC</a>) and $15.50 in 2024, down from $24.30 in 2020 (
                <a href={KEARNEY_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>Kearney, Travel Retail 2025</a>); ~70% of airport retail purchases are impulse-driven (
                <a href={ACI_RETAIL_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>ACI Asia-Pacific</a>); {purchaseNote} (
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>m1nd-set</a>). Tier mix is illustrative of a 2025 basket distribution and can be replaced with your own POS data. {fmtInt(300)}+ shown at an average {fmtInt(400)} basket; discount capped at {fmtInt(60)} and platform fee capped at {fmtInt(25)} per transaction.{rateNote}
              </p>
            </div>
          ) : (
            <div className="border-t border-slate-200 pt-3">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Basis &amp; Sources</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 text-xs text-slate-500">
                <p>
                  <span className="font-semibold text-slate-600">Tier mix calibrated to the published average transaction value of {fmtInt(70)}–{fmtInt(140)} in travel retail.</span>{" "}
                  <a href={MARKETUS_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>market.us, Travel Retail Market 2026</a>
                </p>
                <p>
                  Average retail spend per passenger of €10.55 in 2025, against €10.13bn of European travel retail sales — spending per head is small.{" "}
                  <a href={ETRC_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>ETRC</a>
                </p>
                <p>
                  Average spend per passenger of $15.50 in 2024, down from $24.30 in 2020 — transaction values are small and falling.{" "}
                  <a href={KEARNEY_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>Kearney, Travel Retail 2025</a>
                </p>
                <p>
                  ~70% of all airport retail purchases are impulse-driven — small, unplanned baskets dominate transaction count.{" "}
                  <a href={ACI_RETAIL_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>ACI Asia-Pacific Travel Retail Study</a>
                </p>
                <p>
                  {purchaseNote}.{" "}
                  <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>m1nd-set</a>
                </p>
                <p className="text-slate-400">
                  Tier mix is illustrative of a 2025 basket distribution and can be replaced with your own POS data. {fmtInt(300)}+ shown at an average {fmtInt(400)} basket; discount capped at {fmtInt(60)} and platform fee capped at {fmtInt(25)} per transaction.{rateNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SlideTierMix;