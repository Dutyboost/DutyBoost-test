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

  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#0a0f1e]">
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Transaction Mix — Why the Tiers Work</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The Biggest Win Sits <span className="text-blue-600">Below {c}300</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm max-w-4xl">
              Airport retail baskets cluster in the lower tiers — exactly where the DutyCredit discount is smallest. The high-discount baskets are the smallest share of volume, so the blended cost of the whole programme stays well below the headline rate.
            </p>
          </div>

          <div className="overflow-x-auto mb-5">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left px-3 py-2.5 rounded-tl-xl font-semibold">Basket</th>
                  <th className="text-center px-3 py-2.5 font-semibold">Share of transactions</th>
                  <th className="text-center px-3 py-2.5 font-semibold">Traveller discount</th>
                  <th className="text-center px-3 py-2.5 font-semibold">Traveller saves</th>
                  <th className="text-center px-3 py-2.5 font-semibold">DutyBoost fee (2.5%)</th>
                  <th className="text-center px-3 py-2.5 font-semibold">Total cost to retailer</th>
                  <th className="text-right px-3 py-2.5 rounded-tr-xl font-semibold">Retailer keeps</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.basket} className={`border-b border-slate-100 ${r.hot ? "bg-blue-50" : i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                    <td className="px-3 py-2.5 font-bold text-slate-800">{r.basket}</td>
                    <td className="px-3 py-2.5 text-center font-semibold text-blue-700">{r.share}</td>
                    <td className="px-3 py-2.5 text-center text-slate-600">{r.disc}</td>
                    <td className="px-3 py-2.5 text-center text-slate-600">{r.saves}</td>
                    <td className="px-3 py-2.5 text-center text-slate-600">{r.fee}</td>
                    <td className="px-3 py-2.5 text-center font-semibold text-red-600">{r.cost}</td>
                    <td className="px-3 py-2.5 text-right font-semibold text-green-700">
                      {r.keeps} <span className="text-slate-400 font-normal">({r.keepsPct})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 mb-4 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 text-sm">
              <span className="font-semibold">Everything above {c}1,000 stays with the retailer.</span> The DutyCredit is capped at {c}60 and the platform fee at {c}25 per transaction — so as the basket grows, the retailer's share grows with it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {stats.map((s) => (
              <div key={s.value} className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white text-center">
                <div className="text-3xl font-bold mb-1">{s.value}</div>
                <div className="text-sm font-semibold text-blue-50">{s.label}</div>
                <div className="text-xs text-blue-100/80 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>

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
        </div>
      </div>
    </div>
  );
}

export default SlideTierMix;