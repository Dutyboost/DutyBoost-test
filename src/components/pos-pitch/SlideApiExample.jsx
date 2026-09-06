import { ArrowRight } from "lucide-react";

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: "linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

function CodeBlock({ title, children }) {
  return (
    <div className="bg-slate-950/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <span className="text-slate-400 text-xs font-mono ml-1">{title}</span>
      </div>
      <pre className="p-3 text-[10px] md:text-[11px] lg:text-xs leading-relaxed text-slate-200 overflow-x-auto font-mono whitespace-pre">{children}</pre>
    </div>
  );
}

export default function SlideApiExample({ currency = "€" }) {
  const endpoint = "https://duty-boost-deals.base44.app/functions/posWebhook";

  const request = `POST ${endpoint}
Host: duty-boost-deals.base44.app
Content-Type: application/json
X-POS-Secret: <your-shared-secret>

{
  "voucher_code": "DBC-7F3A9K2",
  "transaction_value": 100.00,
  "retailer_id": "ret_avolta_001",
  "store_name": "Avolta Duty Free - Schiphol",
  "airport": "AMS",
  "num_items": 3
}`;

  const response = `HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "transaction_id": "txn_01HABCD9F2K3M5N7",
  "voucher_code": "DBC-7F3A9K2",
  "gross_value": 100.00,
  "effective_discount_pct": 10.0,
  "discount_amount": 10.00,
  "amount_due": 90.00,
  "platform_fee": 2.50,
  "commission_split": {
    "travel_partner": 0.50,
    "pos_partner": 0.25,
    "dutyboost": 1.75
  },
  "message": "DutyCredit applied. Traveler saves ${currency}10.00."
}`;

  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-[#0a0f1e] text-white">
      <div className="flex-1 flex flex-col justify-center px-5 py-4 md:px-10 md:py-5 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-3 lg:mb-4">
            <span className="text-violet-400 text-xs font-semibold uppercase tracking-widest">The Integration, In One Call</span>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-heading font-bold text-white mt-1.5">
              Validate. Discount. Earn. <span className="text-violet-400">One Request. One Response.</span>
            </h2>
            <p className="text-slate-400 mt-1.5 text-xs lg:text-sm max-w-4xl">
              A single HTTPS call at checkout. DutyBoost validates the DutyCredit, returns the discount to apply, and splits the platform fee across every participant — all attributed and logged automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 items-stretch">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold">1</div>
                <span className="text-violet-300 font-semibold text-xs lg:text-sm">Request — POS sends basket & voucher</span>
              </div>
              <CodeBlock title="request">
{request}
              </CodeBlock>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">2</div>
                <span className="text-green-300 font-semibold text-xs lg:text-sm">Response — discount + commission split</span>
              </div>
              <CodeBlock title="response">
{response}
              </CodeBlock>
            </div>
          </div>

          <div className="mt-3 lg:mt-4 grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {[
              { label: "Travel & Corporate Partner", val: `${currency}0.50`, sub: "20% of fee — ancillary revenue", color: "text-blue-300" },
              { label: "Enterprise POS Partner", val: `${currency}0.25`, sub: "10% of fee — your commission", color: "text-violet-300" },
              { label: "DutyBoost", val: `${currency}1.75`, sub: "70% of fee — infrastructure revenue", color: "text-orange-300" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-2.5 lg:p-3">
                <div className={`font-bold text-sm lg:text-base ${s.color}`}>{s.val}</div>
                <div className="text-white text-xs font-semibold mt-0.5">{s.label}</div>
                <div className="text-slate-400 text-[11px] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 lg:mt-4 bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border border-violet-500/30 rounded-2xl p-3 lg:p-4 flex items-center gap-3">
            <ArrowRight className="w-4 h-4 text-violet-300 flex-shrink-0" />
            <p className="text-violet-200 text-xs lg:text-sm leading-relaxed">
              One endpoint, one shared secret, one JSON response your POS already knows how to read — every validated sale splits the fee across travel partners, POS partners and DutyBoost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}