import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Copy, Check, QrCode, Zap, Mail, ArrowRight,
  CheckCircle2, AlertCircle, Monitor, Smartphone, Wifi, WifiOff,
  ChevronDown, ChevronUp, Store, Terminal, ShieldCheck, Download
} from "lucide-react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function CodeBlock({ code, label }) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-slate-900 text-sm">
      {label && (
        <div className="flex items-center px-4 py-2 border-b border-white/10 bg-slate-800">
          <span className="text-xs text-slate-400 font-mono">{label}</span>
        </div>
      )}
      <CopyButton text={code} />
      <pre className="p-5 text-slate-100 overflow-x-auto leading-relaxed text-xs">{code}</pre>
    </div>
  );
}

function Collapsible({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="font-semibold text-sm">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">{children}</div>}
    </div>
  );
}

const VALIDATE_CURL = `curl -X POST https://api.dutyboost.com/v1/validate-voucher \\
  -H "Content-Type: application/json" \\
  -H "X-DutyBoost-Key: YOUR_RETAILER_API_KEY" \\
  -d '{
    "voucher_code": "DB-X7K2M4NP",
    "retailer_id": "YOUR_RETAILER_ID"
  }'`;

const VALIDATE_RESPONSE = `{
  "valid": true,
  "voucher_code": "DB-X7K2M4NP",
  "credit_amount_eur": 14.00,
  "max_basket_pct": 0.15,
  "travel_type": "Long-haul",
  "traveler_name": "John Doe",
  "airport": "AMS",
  "expiration_date": "2025-12-01",
  "status": "active",
  "message": "Voucher valid. Apply up to €14.00 (max 15% of basket). No minimum spend."
}`;

const REDEEM_REQUEST = `{
  "voucher_code": "DB-X7K2M4NP",
  "retailer_id": "YOUR_RETAILER_ID",
  "transaction_value": 200.00,
  "num_items": 3
}`;

const REDEEM_RESPONSE = `{
  "success": true,
  "voucher_code": "DB-X7K2M4NP",
  "credit_amount_eur": 14.00,
  "effective_credit": 7.50,
  "amount_charged": 42.50,
  "platform_fee": 2.50,
  "transaction_id": "TXN-20251201-4482",
  "retailer_net_pct": 85,
  "message": "Voucher redeemed. €7.50 credit applied (15% of €50 basket — cap applied)."
}`;

const JS_VALIDATE = `// Step 1: Validate the voucher — call this as soon as the QR is scanned
// (can be before, during, or at the end of shopping)
async function validateVoucher(voucherCode) {
  const res = await fetch('https://api.dutyboost.com/v1/validate-voucher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-DutyBoost-Key': process.env.DUTYBOOST_API_KEY
    },
    body: JSON.stringify({
      voucher_code: voucherCode,
      retailer_id: process.env.DUTYBOOST_RETAILER_ID
    })
  });
  return await res.json();
}

// Step 2: After checkout, confirm the redemption with the final basket total
// Only call this once — at the moment the customer pays
async function redeemVoucher(voucherCode, transactionValue, numItems) {
  const res = await fetch('https://api.dutyboost.com/v1/redeem-voucher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-DutyBoost-Key': process.env.DUTYBOOST_API_KEY
    },
    body: JSON.stringify({
      voucher_code:      voucherCode,
      retailer_id:       process.env.DUTYBOOST_RETAILER_ID,
      transaction_value: transactionValue,   // final basket total in EUR (min €70)
      num_items:         numItems
    })
  });
  return await res.json();
}

// --- Two-phase POS flow ---
// Phase 1: Customer presents QR at any point (start, mid-shop, or at till)
async function onQRScanned(scannedCode) {
  const validation = await validateVoucher(scannedCode);
  if (!validation.valid) {
    displayError('Voucher invalid or expired');
    return;
  }
  // DutyCredit is now confirmed — store the code and show a banner
  // The customer can continue shopping; no credit is applied yet
  showBanner('✓ DutyCredit confirmed — discount will apply at checkout (min. basket €70)');
  return validation; // store this for Phase 2
}

// Phase 2: Customer is ready to pay — enter the final basket total
async function onCheckout(voucherCode, basketTotal, numItems) {
  if (basketTotal < 70) {
    displayError('Minimum basket of €70 required to apply DutyCredit');
    return;
  }
  const redemption = await redeemVoucher(voucherCode, basketTotal, numItems);
  if (redemption.success) {
    applyDiscountToReceipt(redemption.effective_credit);
    printReceipt(redemption);
  }
}`;

const PYTHON_VALIDATE = `import requests, os

HEADERS = {
    'Content-Type': 'application/json',
    'X-DutyBoost-Key': os.environ['DUTYBOOST_API_KEY']
}
RETAILER_ID = os.environ['DUTYBOOST_RETAILER_ID']

def validate_voucher(voucher_code: str) -> dict:
    r = requests.post(
        'https://api.dutyboost.com/v1/validate-voucher',
        headers=HEADERS,
        json={'voucher_code': voucher_code, 'retailer_id': RETAILER_ID}
    )
    return r.json()

def redeem_voucher(voucher_code: str, transaction_value: float, num_items: int) -> dict:
    r = requests.post(
        'https://api.dutyboost.com/v1/redeem-voucher',
        headers=HEADERS,
        json={
            'voucher_code':      voucher_code,
            'retailer_id':       RETAILER_ID,
            'transaction_value': transaction_value,
            'num_items':         num_items
        }
    )
    return r.json()`;

const WEBHOOK_HANDLER = `// DutyBoost sends a confirmation webhook after every successful redemption
// Set your webhook URL in the retailer dashboard → Settings → Webhooks

app.post('/webhooks/dutyboost', (req, res) => {
  const { event, transaction_id, voucher_code, discount_amount, platform_fee } = req.body;

  if (event === 'voucher.redeemed') {
    // Log the transaction in your back-office system
    // platform_fee is what DutyBoost will invoice you for at month end
    saveTransaction({ transaction_id, voucher_code, discount_amount, platform_fee });
  }

  res.status(200).send('OK');
});`;

export default function RetailerIntegrationGuide() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <DutyBoostLogo height={150} />
          <div className="flex items-center gap-2">
            <Link to="/travel-partner-integration-guide">
              <Button size="sm" variant="outline" className="text-sm hidden sm:flex">← Agency Guide</Button>
            </Link>
            <Link to="/">
              <Button size="sm" variant="ghost" className="text-sm">Home</Button>
            </Link>
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => window.print()}>
              <Download className="w-3.5 h-3.5" /> Download PDF
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative overflow-hidden py-12 px-6 border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">Airport Retailer · Implementation Guide</Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
            Retailer POS <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Integration Guide</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Everything your technical team needs to validate and redeem DutyBoost vouchers at your point-of-sale — giving eligible travelers their discount at the till, automatically.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {['~1–2 day integration', 'Two API calls', 'Works with any POS system'].map(t => (
              <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-14">

        {/* How it works */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">How it works in your store</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-semibold mb-1">Flexible timing — scan QR at any point</p>
            <p>The customer can present their QR code <strong>before they start shopping</strong> (DutyCredit is reserved) or <strong>at the till when ready to pay</strong>. Both flows work identically — the discount is only finalised and applied once the basket total is entered.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            {[
              { num: '1', title: 'Customer presents QR', desc: 'Traveler shows their DutyBoost QR code — at any point: when entering the store, while browsing, or at the till' },
              { num: '2', title: 'Cashier scans & validates', desc: 'Your POS scanner reads the QR code and calls the DutyBoost API — the DutyCredit is instantly confirmed and reserved' },
              { num: '3', title: 'Customer continues shopping', desc: 'If scanned early, the voucher is held while the customer browses. If at checkout, proceed directly to step 4' },
              { num: '4', title: 'Basket entered & discount applied', desc: 'Once the final basket total is known, enter it to calculate and apply the tiered credit. DutyBoost records the transaction.' },
            ].map(s => (
              <div key={s.num} className="bg-card border border-border rounded-xl p-4 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{s.num}</div>
                <p className="font-semibold text-sm">{s.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration options */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Choose your integration method</h2>
          <p className="text-sm text-muted-foreground">Select the method that fits your POS infrastructure. Option A is recommended for most retailers.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Terminal,
                label: 'Recommended',
                labelColor: 'bg-green-100 text-green-700',
                title: 'Option A — API Integration',
                desc: 'Your POS software calls the DutyBoost API directly. Full automation, real-time validation, and no manual steps. Requires a developer to add ~50 lines of code to your POS software.',
              },
              {
                icon: Monitor,
                label: 'No dev needed',
                labelColor: 'bg-blue-100 text-blue-700',
                title: 'Option B — DutyBoost Terminal',
                desc: 'We provide a dedicated tablet or screen at your till. Cashier enters or scans the code on the DutyBoost device — no changes to your existing POS needed. Contact us to set up.',
              },
              {
                icon: Smartphone,
                label: 'Simple fallback',
                labelColor: 'bg-amber-100 text-amber-700',
                title: 'Option C — Manual Dashboard',
                desc: 'Log into your DutyBoost retailer dashboard on any device and look up voucher codes manually. No tech integration required — best for low-volume stores.',
              },
            ].map(({ icon: Icon, label, labelColor, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${labelColor}`}>{label}</span>
                </div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Getting started */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Getting started</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-3">
            <p className="font-semibold text-blue-900 text-sm">Account creation and access:</p>
            <p className="text-sm text-blue-800">Your DutyBoost account is created by the DutyBoost team. You'll receive a welcome email with a magic link to set your password and access your retailer dashboard. No manual signup needed — just wait for the email and click the link.</p>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Before you start (Option A)</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
            <p className="font-semibold text-amber-900 text-sm">You will need:</p>
            <ul className="space-y-2">
              {[
                'Your DutyBoost Retailer API Key — from your retailer dashboard under Settings → API',
                'Your DutyBoost Retailer ID — shown in the same settings screen',
                'A QR scanner connected to your POS system (standard USB or Bluetooth scanner works)',
                'A developer who can modify your POS software to make HTTP API calls',
                'Outbound HTTPS access from your POS network to api.dutyboost.com (port 443)',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-amber-800">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700"><strong>Never store API keys in frontend or client-side code.</strong> API calls must be made from your POS backend or middleware — not from browser-based POS interfaces.</p>
          </div>
        </div>

        {/* Step 1 — Validate */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">1</div>
...
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">2</div>
            <h2 className="text-2xl font-heading font-semibold">Confirm the redemption at checkout</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Once the customer's basket is finalised, call the <strong>redeem</strong> endpoint with the final basket total. DutyBoost calculates the effective tiered credit (10%/15%/20%, capped at €25), marks the voucher as used, and records the transaction for your monthly invoice.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 space-y-3">
             <p className="font-semibold">Discount structure & platform fees:</p>
             <div className="overflow-x-auto">
               <table className="w-full text-xs">
                 <thead>
                   <tr className="border-b border-blue-200">
                     <th className="text-left py-2 px-2 font-semibold">Basket spend</th>
                     <th className="text-left py-2 px-2 font-semibold">Traveler discount</th>
                     <th className="text-left py-2 px-2 font-semibold">DutyBoost fee</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-blue-200">
                   <tr><td className="py-2 px-2 font-semibold">€50–€99</td><td className="py-2 px-2">€5</td><td className="py-2 px-2">≤ €25 cap</td></tr>
                   <tr><td className="py-2 px-2 font-semibold">€100–€199</td><td className="py-2 px-2">€10+</td><td className="py-2 px-2">≤ €25 cap</td></tr>
                   <tr><td className="py-2 px-2 font-semibold">€200–€299</td><td className="py-2 px-2">€30+</td><td className="py-2 px-2">≤ €25 cap</td></tr>
                   <tr><td className="py-2 px-2 font-semibold">€300–€1,000</td><td className="py-2 px-2">Up to €60</td><td className="py-2 px-2">≤ €25 cap</td></tr>
                   <tr className="bg-green-100"><td className="py-2 px-2 font-semibold">€1,000+</td><td className="py-2 px-2">Up to €60</td><td className="py-2 px-2">€0 (all above €1,000 is yours)</td></tr>
                 </tbody>
               </table>
             </div>
             <p className="text-xs mt-2"><strong>Key point:</strong> Platform fees are capped at €25 on all baskets up to €1,000. Any basket value above €1,000 is yours entirely — no platform fee applies.</p>
           </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
            <p className="text-sm text-orange-800"><strong>Only call /redeem-voucher once per transaction</strong>, at the moment of final checkout — never during scanning or preview. Calling it twice will fail with an "already redeemed" error.</p>
          </div>

          <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
            <Badge className="bg-green-600 text-white text-xs shrink-0">POST</Badge>
            <code className="text-sm font-mono text-foreground break-all">https://api.dutyboost.com/v1/redeem-voucher</code>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Request body:</p>
              <CodeBlock code={REDEEM_REQUEST} label="redeem-request.json" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold">Response:</p>
              <CodeBlock code={REDEEM_RESPONSE} label="redeem-response.json" />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Response field</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">What to do with it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['credit_amount_eur', 'The traveler\'s DutyCredit value in EUR (e.g. 14.00) — this is the maximum that can be applied'],
                  ['effective_credit', 'Actual EUR credit applied = min(credit_amount_eur, basket × 0.15) — apply this to the receipt'],
                  ['amount_charged', 'The final amount the customer pays (basket − effective_credit) — display on screen and receipt'],
                  ['platform_fee', 'DutyBoost\'s fee for this transaction — included in your monthly invoice'],
                  ['transaction_id', 'Store this in your POS records for reconciliation and dispute resolution'],
                ].map(([field, action]) => (
                  <tr key={field} className="hover:bg-muted/20">
                    <td className="px-4 py-2.5 font-mono text-xs text-primary">{field}</td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Code examples */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Full POS integration code</h2>
          <div className="space-y-3">
            <Collapsible title="JavaScript / Node.js (recommended)">
              <CodeBlock code={JS_VALIDATE} label="dutyboost-pos.js" />
            </Collapsible>
            <Collapsible title="Python">
              <CodeBlock code={PYTHON_VALIDATE} label="dutyboost_pos.py" />
            </Collapsible>
          </div>
        </div>

        {/* Offline / fallback */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Offline & fallback handling</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-muted-foreground" />
                <p className="font-semibold text-sm">If your POS loses internet</p>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span> Do not accept the voucher if you cannot validate it</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span> Ask the customer to show the voucher code — log it manually</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span> Once back online, call /redeem-voucher with the recorded code</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span> Contact us if the voucher has expired before you could reconnect</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-muted-foreground" />
                <p className="font-semibold text-sm">If the QR code won't scan</p>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-1.5"><span className="text-blue-500 mt-0.5">→</span> The traveler can read out their voucher code (e.g. DB-X7K2M4NP)</li>
                <li className="flex items-start gap-1.5"><span className="text-blue-500 mt-0.5">→</span> Enter it manually in your POS or in the DutyBoost retailer dashboard</li>
                <li className="flex items-start gap-1.5"><span className="text-blue-500 mt-0.5">→</span> Validate and redeem using the same API calls</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Billing & reconciliation</h2>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {[
              { icon: Store, title: 'Monthly invoice', desc: 'On the 1st of each month, DutyBoost sends an invoice for all transactions from the prior month. Each line shows the voucher code, transaction value, discount applied, and DutyBoost platform fee.' },
              { icon: ShieldCheck, title: 'Transaction log', desc: 'All redeemed vouchers are visible in your retailer dashboard → Transactions. Each record includes the transaction_id, discount amount, and platform fee.' },
              { icon: Zap, title: 'Webhook notifications', desc: 'Optionally receive a webhook notification after every redemption so your back-office system can log the platform_fee in real time.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Webhooks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Optional: Redemption webhooks</h2>
          <p className="text-sm text-muted-foreground">Configure a webhook URL in your retailer dashboard → Settings → Webhooks to receive real-time transaction confirmations.</p>
          <CodeBlock code={WEBHOOK_HANDLER} label="webhook-handler.js" />
        </div>

        {/* Testing */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Testing your integration</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Use sandbox mode', desc: 'Add "test_mode": true to your API requests. Sandbox vouchers are marked and won\'t affect your invoice or production stats.' },
              { title: 'Get a test voucher', desc: 'Your DutyBoost account manager can generate a sandbox voucher code for you to scan during testing.' },
              { title: 'Simulate the full flow', desc: 'Scan → validate (check discount shown) → complete checkout → redeem (check transaction_id returned).' },
              { title: 'Check your dashboard', desc: 'All test transactions appear in your retailer dashboard → Transactions with a "sandbox" badge.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-4 space-y-1">
                <p className="font-semibold text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> {title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-3">
          <h3 className="font-heading font-semibold text-lg">Need integration support?</h3>
          <p className="text-sm text-muted-foreground">Our technical team can assist with POS integration, provide sandbox credentials, or connect you with your POS vendor's developer. Most retailers are live within 1–2 business days.</p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:rael@dutyboost.com">
              <Button className="gap-2"><Mail className="w-4 h-4" /> integrations@dutyboost.com</Button>
            </a>
            <Link to="/travel-partner-integration-guide">
              <Button variant="outline" className="gap-2"><ArrowRight className="w-4 h-4" /> Agency Guide</Button>
            </Link>
          </div>
        </div>

      </div>

      <footer className="border-t border-border py-8 px-6 print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <DutyBoostLogo height={120} />
            <span>Turning travel into airport earnings.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <a href="mailto:rael@dutyboost.com" className="hover:text-primary transition-colors">integrations@dutyboost.com</a>
            <span>© 2026 DutyBoost</span>
          </div>
        </div>
      </footer>
    </div>
  );
}