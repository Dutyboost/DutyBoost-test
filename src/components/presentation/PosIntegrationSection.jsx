import { Terminal, ArrowRight, Shield, RefreshCw, QrCode, Zap } from "lucide-react";

const REQUEST_CODE = `POST /pos/v1/vouchers/{voucherId}/redeem

{
  "basketValue": 300,
  "currency": "EUR",
  "posTransactionId": "receipt-001",
  "idempotencyKey": "receipt-001-redeem"
}
x-dutyboost-api-key: db_live_xxxxxxxxx`;

const RESPONSE_CODE = `{
  "approved": true,
  "discountAmount": 60,
  "travelerPays": 240,
  "commissionAmount": 7.5,
  "transactionId": "txn_..."
}`;

export default function PosIntegrationSection() {
  return (
    <div className="bg-slate-950 rounded-3xl p-6 sm:p-10 space-y-8 text-slate-100">

      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">POS Integration</p>
        <h3 className="text-2xl font-heading font-bold text-white">How the redemption request works</h3>
        <p className="text-slate-400 text-sm">A plain-language guide for retailers and POS developers.</p>
      </div>

      {/* One-line summary */}
      <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl px-5 py-4">
        <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
        <p className="text-sm font-semibold text-cyan-300">
          The whole integration boils down to one API call — <span className="font-bold text-white">Scan QR → Send basket value → Receive discount.</span>
        </p>
      </div>

      {/* Request / Response side by side */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">POS → DutyBoost · Request</p>
          <pre className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-xs text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre">{REQUEST_CODE}</pre>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">DutyBoost → POS · Response</p>
          <pre className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-xs text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre">{RESPONSE_CODE}</pre>
          <p className="text-xs text-slate-400">The POS simply applies the <code className="text-cyan-400">discountAmount</code> that comes back.</p>
        </div>
      </div>

      {/* Two key concepts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400 shrink-0" />
            <p className="font-semibold text-white">1 · The Header — who is calling</p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">The API key is the retailer's identity card. From it, DutyBoost verifies the retailer is active and authorised to redeem this voucher.</p>
          <pre className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-yellow-300 overflow-x-auto">x-dutyboost-api-key: db_live_xxxxxxxxx</pre>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="font-semibold text-white">2 · The Body — what to calculate</p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">The body carries the basket value, the POS receipt number, and an idempotency key that prevents duplicate charges if the connection drops and the POS retries.</p>
          <pre className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-emerald-300 overflow-x-auto">{`"idempotentReplay": true`}</pre>
        </div>
      </div>

      {/* QR Code note */}
      <div className="flex items-start gap-4 bg-slate-900 border border-slate-700 rounded-2xl p-5">
        <QrCode className="w-6 h-6 text-slate-300 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-white">The QR Code is only a pointer</p>
          <p className="text-sm text-slate-400 leading-relaxed">It does not calculate anything. The cashier scans it, the POS extracts the <code className="text-cyan-400">voucherId</code>, and calls the redeem endpoint with the basket value.</p>
        </div>
      </div>

      {/* Smallest integration summary table */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Smallest Integration — 1 call</p>
        <div className="overflow-hidden rounded-xl border border-slate-700">
          {[
            { label: "ENDPOINT", value: "POST /pos/v1/vouchers/{voucherId}/redeem", color: "text-cyan-300" },
            { label: "HEADER", value: 'x-dutyboost-api-key: RETAILER_SECRET_KEY', color: "text-yellow-300" },
            { label: "BODY", value: '{ "basketValue", "currency", "posTransactionId", "idempotencyKey" }', color: "text-emerald-300" },
            { label: "RESPONSE", value: '{ "approved", "discountAmount", "travelerPays", "commissionAmount", "transactionId" }', color: "text-blue-300" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-start gap-4 px-5 py-3 border-b border-slate-700 last:border-0 bg-slate-900 hover:bg-slate-800 transition-colors">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-20 shrink-0 pt-0.5">{label}</span>
              <code className={`text-xs ${color} break-all`}>{value}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Flow summary */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {["Scan QR", "Extract voucherId", "Send basket value", "Receive discountAmount", "Apply discount"].map((step, i, arr) => (
          <span key={i} className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs font-semibold text-cyan-300">{step}</span>
            {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
          </span>
        ))}
      </div>
    </div>
  );
}