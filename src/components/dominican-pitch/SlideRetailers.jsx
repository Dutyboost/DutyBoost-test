import { CheckCircle, Store } from "lucide-react";
import { RETAIL, SlideShell } from "./Shared";
import { MODEL, PER_STORE, discountFor, numShort, usdShort } from "./figures";

export default function SlideRetailers() {
  const activated = PER_STORE.travellers * PER_STORE.activation;
  const baskets = activated * PER_STORE.redemption;
  const gross = baskets * PER_STORE.basket;
  const saving = gross * discountFor(PER_STORE.basket);
  const fee = gross * MODEL.platformFee;
  const retailerNet = gross - saving - fee;

  const KPIS = [
    { value: numShort(baskets), label: "incremental baskets a year, in one store", money: false },
    { value: usdShort(gross), label: "incremental retail value a year", money: true },
    { value: usdShort(retailerNet), label: "net to the retailer, after discount and fee", money: true },
  ];

  const POINTS = [
    "Only travellers who would otherwise have walked past — the 78%, not the 22%",
    "No upfront cost: no hardware, no licence, no subscription, no store-level project",
    "Paid only on validated sales, at 2.5% of a sale that would not otherwise exist",
    "Qualifying spend capped at $1,000, so large baskets are never exposed",
    "One integration at the existing POS — no system is replaced",
    "Works with the concessionaires and brands already trading in the concourse",
  ];

  return (
    <SlideShell
      eyebrow="Value to Airport Retailers"
      eyebrowColor={RETAIL}
      title={
        <>
          Incremental Volume,{" "}
          <span style={{ color: RETAIL }}>Not a Discount on Existing Sales</span>
        </>
      }
      subtitle="A single mid-sized store inside one Dominican gateway, at the standard model assumptions: 250,000 travellers through the door a year, a 2% pre-activation rate, 30% redemption and a $135 blended basket."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className={`text-3xl font-bold ${k.money ? "text-blue-700" : "text-[#0a0f1e]"}`}>{k.value}</div>
            <p className="text-slate-600 text-sm mt-2 leading-snug">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Store className="w-5 h-5" style={{ color: RETAIL }} />
            <h3 className="font-bold text-slate-800">What the retailer is being asked to accept</h3>
          </div>
          <div className="space-y-2">
            {POINTS.map((p) => (
              <div key={p} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm leading-snug">{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl p-5 text-white" style={{ background: RETAIL }}>
            <p className="font-bold leading-snug text-lg">
              {usdShort(retailerNet)} net, from travellers who would have bought nothing.
            </p>
            <p className="text-blue-100 text-sm mt-2 leading-relaxed">
              The comparison is not against the retailer's current sales — those stay exactly as they are. It is
              against the empty space in the departure hall that the model converts.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-800 mb-2">And the multiplier</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              The same store, replicated across the retail groups already trading at Punta Cana, Las Américas and
              La Isabela, is how a per-store illustration becomes a national figure — without a single new
              concession or square metre of new retail space.
            </p>
          </div>
        </div>
      </div>

      <p className="text-slate-400 text-xs mt-3">
        Illustrative per-store model in USD, at standard DutyBoost terms. Actual results depend on the store's
        traffic, its category mix and the carrier coverage of its catchment.
      </p>
    </SlideShell>
  );
}