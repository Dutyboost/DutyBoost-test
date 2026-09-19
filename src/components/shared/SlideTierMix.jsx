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
}) {
  const c = currency;

  const rows = [
    { basket: `${c}20`, share: "42%", disc: "5%", saves: `${c}1.00`, fee: `${c}0.50`, cost: `${c}1.50`, keeps: `${c}18.50`, keepsPct: "92.5%", hot: true },
    { basket: `${c}100`, share: "30%", disc: "10%", saves: `${c}10.00`, fee: `${c}2.50`, cost: `${c}12.50`, keeps: `${c}87.50`, keepsPct: "87.5%", hot: true },
    { basket: `${c}200`, share: "15%", disc: "15%", saves: `${c}30.00`, fee: `${c}5.00`, cost: `${c}35.00`, keeps: `${c}165.00`, keepsPct: "82.5%", hot: false },
    { basket: `${c}300`, share: "9%", disc: "20%", saves: `${c}60.00`, fee: `${c}7.50`, cost: `${c}67.50`, keeps: `${c}232.50`, keepsPct: "77.5%", hot: false },
    { basket: `${c}300+`, share: "3%", disc: "20% capped", saves: `${c}60.00`, fee: `${c}10.00`, cost: `${c}70.00`, keeps: `${c}330.00`, keepsPct: "82.5%", hot: false },
    { basket: `${c}1,000`, share: "1%", disc: "20% capped", saves: `${c}60.00`, fee: `${c}25.00`, cost: `${c}85.00`, keeps: `${c}915.00`, keepsPct: "91.5%", hot: false },
  ];

  const stats = [
    { value: "87%", label: `of transactions sit below ${c}300`, sub: "Where the total cost stays between 7.5% and 17.5%" },
    { value: "16.6%", label: "blended cost across all transactions", sub: "The retailer keeps 83.4% of incremental value" },
    { value: "22.5%", label: `maximum possible cost — only at ${c}300+`, sub: `20% discount + 2.5% fee, capped at ${c}60` },
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
              The Biggest Win Sits <span className="text-blue-600">Below {c}300</span>
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
                  <tr key={r.basket} className={`border-b border-slate-100 ${r.hot ? "bg-blue-50" : i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                    <td className={`font-bold text-slate-800 ${cell}`}>{r.basket}</td>
                    <td className={`text-center font-semibold text-blue-700 ${cell}`}>{r.share}</td>
                    <td className={`text-center text-slate-600 ${cell}`}>{r.disc}</td>
                    <td className={`text-center text-slate-600 ${cell}`}>{r.saves}</td>
                    <td className={`text-center text-slate-600 ${cell}`}>{r.fee}</td>
                    <td className={`text-center font-semibold text-red-600 ${cell}`}>{r.cost}</td>
                    <td className={`text-right font-semibold text-green-700 ${cell}`}>
                      {r.keeps} <span className="text-slate-400 font-normal">({r.keepsPct})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`bg-green-50 border border-green-200 rounded-xl flex items-start gap-2 ${dense ? "px-3 py-2 mb-3" : "px-4 py-2.5 mb-4"}`}>
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p className={`text-green-800 ${dense ? "text-[13px]" : "text-sm"}`}>
              <span className="font-semibold">Everything above {c}1,000 stays with the retailer.</span> The DutyCredit is capped at {c}60 and the platform fee at {c}25 per transaction — so as the basket grows, the retailer's share grows with it.
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
                Tier mix calibrated to the published average transaction value of {c}70–{c}140 in travel retail (
                <a href={MARKETUS_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>market.us, Travel Retail Market 2026</a>); average retail spend per passenger of €10.55 in 2025 (
                <a href={ETRC_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>ETRC</a>) and $15.50 in 2024, down from $24.30 in 2020 (
                <a href={KEARNEY_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>Kearney, Travel Retail 2025</a>); ~70% of airport retail purchases are impulse-driven (
                <a href={ACI_RETAIL_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>ACI Asia-Pacific</a>); {purchaseNote} (
                <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>m1nd-set</a>). Tier mix is illustrative of a 2025 basket distribution and can be replaced with your own POS data. {c}300+ shown at an average {c}400 basket; discount capped at {c}60 and platform fee capped at {c}25 per transaction.
              </p>
            </div>
          ) : (
            <div className="border-t border-slate-200 pt-3">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Basis &amp; Sources</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 text-xs text-slate-500">
                <p>
                  <span className="font-semibold text-slate-600">Tier mix calibrated to the published average transaction value of {c}70–{c}140 in travel retail.</span>{" "}
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
                  Tier mix is illustrative of a 2025 basket distribution and can be replaced with your own POS data. {c}300+ shown at an average {c}400 basket; discount capped at {c}60 and platform fee capped at {c}25 per transaction.
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