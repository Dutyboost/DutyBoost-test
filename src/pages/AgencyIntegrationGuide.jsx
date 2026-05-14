import { Link } from "react-router-dom";
import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Copy, Check, Code2, Mail, QrCode, Zap, ArrowRight,
  CheckCircle2, AlertCircle, Globe2, Terminal, BookOpen, ChevronDown, ChevronUp, Download
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

function CodeBlock({ code, lang = "json", label }) {
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

const STEP_PING = `# Replace with your DutyBoost API key from your Travel Partner dashboard
curl -X POST https://api.dutyboost.com/v1/generate-duty-credit \\
  -H "Content-Type: application/json" \\
  -H "X-DutyBoost-Key: YOUR_API_KEY" \\
  -d '{
    "booking_id": "TEST-001",
    "total_ticket_price": 500,
    "number_of_travelers": 1,
    "travel_type": "Short-haul",
    "departure_airport": "AMS",
    "travel_date": "2025-12-01",
    "traveler_email": "test@youragency.com",
    "traveler_name": "Test Traveler",
    "agency_email": "you@youragency.com"
  }'`;

const JS_SNIPPET = `// DutyBoost Integration — call this after every confirmed booking
async function issueDutyCredit(booking) {
  const response = await fetch('https://api.dutyboost.com/v1/generate-duty-credit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-DutyBoost-Key': process.env.DUTYBOOST_API_KEY  // store securely!
    },
    body: JSON.stringify({
      booking_id:          booking.id,
      total_ticket_price:  booking.totalPrice,          // EUR
      number_of_travelers: booking.passengers,
      travel_type:         booking.isLongHaul ? 'Long-haul' : 'Short-haul',
      departure_airport:   booking.departureAirport,    // IATA code or full name
      travel_date:         booking.departureDate,        // 'YYYY-MM-DD'
      traveler_email:      booking.travelerEmail,
      traveler_name:       booking.travelerName,
      travel_partner_email:        'your@travelpartner.com',
      travel_partner_name:         'YOUR TRAVEL PARTNER NAME'
    })
  });

  const duty = await response.json();

  if (duty.success) {
    console.log('DutyCredit issued:', duty.voucher_code);
    // Optionally embed duty.html_snippet in your confirmation email
  }
}`;

const PYTHON_SNIPPET = `import requests
import os

def issue_duty_credit(booking):
    response = requests.post(
        'https://api.dutyboost.com/v1/generate-duty-credit',
        headers={
            'Content-Type': 'application/json',
            'X-DutyBoost-Key': os.environ['DUTYBOOST_API_KEY']
        },
        json={
            'booking_id':          booking['id'],
            'total_ticket_price':  booking['total_price'],   # EUR
            'number_of_travelers': booking['passenger_count'],
            'travel_type':         'Long-haul' if booking['is_long_haul'] else 'Short-haul',
            'departure_airport':   booking['departure_airport'],  # IATA code
            'travel_date':         booking['departure_date'],      # 'YYYY-MM-DD'
            'traveler_email':      booking['traveler_email'],
            'traveler_name':       booking['traveler_name'],
            'travel_partner_email':        'your@travelpartner.com',
            'travel_partner_name':         'YOUR TRAVEL PARTNER NAME'
        }
    )

    duty = response.json()
    if duty.get('success'):
        print(f"DutyCredit issued: {duty['voucher_code']}")
        # duty['html_snippet'] → inject into confirmation email
`;

const PHP_SNIPPET = `<?php
function issueDutyCredit(array $booking): array {
    $payload = json_encode([
        'booking_id'          => $booking['id'],
        'total_ticket_price'  => $booking['total_price'],      // EUR
        'number_of_travelers' => $booking['passenger_count'],
        'travel_type'         => $booking['is_long_haul'] ? 'Long-haul' : 'Short-haul',
        'departure_airport'   => $booking['departure_airport'], // IATA code
        'travel_date'         => $booking['departure_date'],    // 'YYYY-MM-DD'
        'traveler_email'      => $booking['traveler_email'],
        'traveler_name'       => $booking['traveler_name'],
        'travel_partner_email'        => 'your@travelpartner.com',
        'travel_partner_name'         => 'YOUR TRAVEL PARTNER NAME',
    ]);

    $ch = curl_init('https://api.dutyboost.com/v1/generate-duty-credit');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'X-DutyBoost-Key: ' . $_ENV['DUTYBOOST_API_KEY'],
        ],
    ]);

    $result = json_decode(curl_exec($ch), true);
    curl_close($ch);
    return $result;
}`;

const EMAIL_SNIPPET = `// After calling the DutyBoost API, inject html_snippet into your email:
const duty = await issueDutyCredit(booking);

const confirmationEmailHtml = \`
  <h2>Your booking is confirmed! ✈️</h2>

  <p>Booking reference: \${booking.id}</p>
  <p>Departure: \${booking.departureAirport} on \${booking.departureDate}</p>

  <!-- ↓↓↓ Paste DutyBoost block here ↓↓↓ -->
  \${duty.html_snippet}
  <!-- ↑↑↑ End DutyBoost block ↑↑↑ -->

  <p>Have a great trip!</p>
\`;`;

const EXAMPLE_RESPONSE = `{
  "success": true,
  "voucher_code": "DB-X7K2M4NP",
  "discount_percentage": 16,
  "expiration_date": "2025-12-01",
  "duty_credit_url": "https://dutyboost.com/voucher?code=DB-X7K2M4NP",
  "qr_image_url": "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DB-X7K2M4NP",
  "html_snippet": "<div style='...'>...</div>",
  "message": "DutyCredit generated and emailed to traveler"
}`;

const WEBHOOK_EXAMPLE = `// DutyBoost will POST to your webhook URL when a voucher is redeemed
// Configure your webhook URL in your Travel Partner dashboard settings

app.post('/webhooks/dutyboost', (req, res) => {
  const { event, voucher_code, store_name, discount_amount, redeemed_at } = req.body;

  if (event === 'voucher.redeemed') {
    // Log commission earned, update CRM, notify account manager, etc.
    console.log(\`Voucher \${voucher_code} redeemed at \${store_name}\`);
    console.log(\`You earned commission on \${discount_amount} EUR discount applied\`);
  }

  res.status(200).send('OK');
});`;

export default function TravelPartnerIntegrationGuide() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <DutyBoostLogo height={150} />
          <div className="flex items-center gap-2">
            <Link to="/retailer-integration-guide">
              <Button size="sm" variant="outline" className="text-sm hidden sm:flex">Retailer Guide →</Button>
            </Link>
            <Link to="/">
              <Button size="sm" variant="ghost" className="text-sm">← Home</Button>
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
          <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">Travel Partner · Implementation Guide</Badge>
           <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
             Travel Partner <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Integration Guide</span>
           </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Everything your technical team needs to integrate DutyBoost into your booking platform — so every confirmed booking automatically generates a DutyCredit for the traveler.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {['< 1 day integration', 'Single API call', 'Works with any booking system'].map(t => (
              <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-14">

        {/* How it works - overview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">How it works</h2>
          <div className="grid md:grid-cols-4 gap-3">
            {[
              { num: '1', title: 'Booking confirmed', desc: 'Traveler books a flight through your platform' },
              { num: '2', title: 'API call', desc: 'Your system calls the DutyBoost API with booking details' },
              { num: '3', title: 'Voucher generated', desc: 'DutyBoost creates a personalised QR code voucher' },
              { num: '4', title: 'Email sent', desc: 'Traveler receives their DutyCredit — ready to use at the airport' },
            ].map(s => (
              <div key={s.num} className="bg-card border border-border rounded-xl p-4 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{s.num}</div>
                <p className="font-semibold text-sm">{s.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Getting started */}
         <div className="space-y-4">
           <h2 className="text-2xl font-heading font-semibold">Getting started</h2>
           <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-3">
             <p className="font-semibold text-blue-900 text-sm">Account creation and access:</p>
             <p className="text-sm text-blue-800">Your DutyBoost Travel Partner account is created by the DutyBoost team. You'll receive a welcome email with a magic link to set your password and access your Travel Partner dashboard. No manual signup needed — just wait for the email and click the link.</p>
           </div>
         </div>

        {/* Prerequisites */}
         <div className="space-y-4">
           <h2 className="text-2xl font-heading font-semibold">Before you start</h2>
           <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
             <p className="font-semibold text-amber-900 text-sm">You will need:</p>
             <ul className="space-y-2">
               {[
                 'Your DutyBoost API key — available in your Travel Partner dashboard under Settings → API',
                 'A server-side environment to make API calls (Node.js, Python, PHP, or any backend language)',
                 'The ability to trigger code after a booking is confirmed in your booking engine',
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
            <p className="text-sm text-red-700"><strong>Never expose your API key on the frontend.</strong> All calls to the DutyBoost API must be made from your server, not from client-side JavaScript in the browser.</p>
          </div>
        </div>

        {/* Step 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">1</div>
            <h2 className="text-2xl font-heading font-semibold">Get your API key</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Log into your DutyBoost Travel Partner dashboard and navigate to <strong>Settings → API Integration</strong>. Copy your API key. This key identifies your Travel Partner account and attributes commissions correctly.
          </p>
          <div className="bg-card border border-border rounded-xl p-4 space-y-2 text-sm">
            <p className="font-semibold">Test your API key works with a quick curl call:</p>
            <CodeBlock code={STEP_PING} label="Terminal" />
            <p className="text-muted-foreground text-xs">You should receive a JSON response with <code className="bg-muted px-1 rounded">success: true</code> and a <code className="bg-muted px-1 rounded">voucher_code</code>. A test email will be sent to the <code className="bg-muted px-1 rounded">traveler_email</code> you provided.</p>
          </div>
        </div>

        {/* Step 2 — API integration */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">2</div>
            <h2 className="text-2xl font-heading font-semibold">Call the API after booking confirmation</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            After every confirmed flight booking, your system must make a single POST request to the DutyBoost API. The ideal trigger point is your booking confirmation webhook, post-payment callback, or the "booking completed" event in your booking engine.
          </p>

          {/* API endpoint */}
          <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
            <Badge className="bg-green-600 text-white text-xs shrink-0">POST</Badge>
            <code className="text-sm font-mono text-foreground break-all">https://api.dutyboost.com/v1/generate-duty-credit</code>
          </div>

          {/* Fields table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Field</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Type</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Req.</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['booking_id', 'string', '✅', 'Your unique booking reference ID'],
                  ['total_ticket_price', 'number', '✅', 'Total ticket price in EUR (all travelers)'],
                  ['number_of_travelers', 'integer', '✅', 'Number of travelers on the booking'],
                  ['travel_type', 'string', '✅', '"Short-haul" or "Long-haul"'],
                  ['departure_airport', 'string', '✅', 'IATA code (e.g. "AMS") or full airport name'],
                  ['travel_date', 'string', '✅', 'Flight date in YYYY-MM-DD format'],
                  ['traveler_email', 'string', '✅', 'Email to send the DutyCredit voucher to'],
                  ['traveler_name', 'string', '—', 'Used for personalised email greeting'],
                  ['travel_partner_email', 'string', '—', 'Your Travel Partner email for commission tracking'],
                  ['travel_partner_name', 'string', '—', 'Displayed in the traveler-facing email'],
                ].map(([field, type, req, desc]) => (
                  <tr key={field} className="hover:bg-muted/20">
                    <td className="px-4 py-2.5 font-mono text-xs text-primary">{field}</td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">{type}</td>
                    <td className="px-4 py-2.5 text-center text-xs">{req}</td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Code examples */}
          <p className="text-sm font-semibold">Code examples:</p>
          <div className="space-y-3">
            <Collapsible title="JavaScript / Node.js">
              <CodeBlock code={JS_SNIPPET} label="booking-confirmation.js" />
            </Collapsible>
            <Collapsible title="Python">
              <CodeBlock code={PYTHON_SNIPPET} label="booking_confirmation.py" />
            </Collapsible>
            <Collapsible title="PHP">
              <CodeBlock code={PHP_SNIPPET} label="booking_confirmation.php" />
            </Collapsible>
          </div>
        </div>

        {/* API Response */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">API Response</h2>
          <p className="text-sm text-muted-foreground">The API returns a JSON object. On success, use the fields below:</p>
          <CodeBlock code={EXAMPLE_RESPONSE} label="Response JSON" />
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Field</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['voucher_code', 'Unique alphanumeric code for the traveler to quote manually if QR fails'],
                  ['credit_amount_eur', 'The fixed euro DutyCredit value (e.g. 14.00) — display this prominently in your email'],
                  ['max_basket_pct', 'Credit cap as a fraction of basket (0.15 = 15%) — no minimum spend, just proportional to basket'],
                  ['expiration_date', 'The voucher expires at midnight on the departure date'],
                  ['duty_credit_url', 'Direct link to the traveler\'s voucher page — include this in any email'],
                  ['qr_image_url', 'Hosted QR code image URL — usable in custom email templates'],
                  ['html_snippet', 'Ready-made HTML block — paste directly into your confirmation email template'],
                ].map(([field, desc]) => (
                  <tr key={field} className="hover:bg-muted/20">
                    <td className="px-4 py-2.5 font-mono text-xs text-primary">{field}</td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Step 3 — Email */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">3</div>
            <h2 className="text-2xl font-heading font-semibold">Embed the DutyCredit in your confirmation email</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The API response includes a ready-to-use <code className="bg-muted px-1 py-0.5 rounded text-xs">html_snippet</code> — a self-contained HTML block compatible with all major email clients (Gmail, Outlook, Apple Mail). Inject it into your booking confirmation email template, right below the booking summary.
          </p>
          <CodeBlock code={EMAIL_SNIPPET} label="email-builder.js" />
          <div className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium">DutyBoost also sends its own email automatically</p>
              <p className="text-muted-foreground">Even if you don't embed the snippet, DutyBoost sends a standalone co-branded email to the traveler from your Travel Partner name. Embedding the snippet in your own email gives a better, more seamless experience.</p>
            </div>
          </div>
        </div>

        {/* Discount logic */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">How discounts are calculated</h2>
          <p className="text-sm text-muted-foreground">DutyBoost calculates discounts based on basket spend — simple and transparent. Discounts are capped at €60 on €300+ spend.</p>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Basket spend (before discount)</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Traveler discount (DutyCredit)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['€70', '€5 discount'],
                  ['€100', '€10+ discount'],
                  ['€200', '€30+ discount'],
                  ['€300+', 'Up to €60 discount'],
                ].map(([spend, discount]) => (
                  <tr key={spend} className="hover:bg-muted/20">
                    <td className="px-4 py-2.5 text-muted-foreground text-sm">{spend}</td>
                    <td className="px-4 py-2.5 font-semibold text-primary text-sm">{discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            <strong>The more the traveler spends, the higher the discount — up to a maximum of €60 on €300+ spend.</strong><br/>
            Example: A traveler spends €300 at a retailer and receives a €60 discount. The net sales value (€240) is the basis for commission distribution.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 space-y-1">
            <p className="font-semibold">Key redemption rules:</p>
            <p>→ <strong>Minimum basket spend: €70</strong> — travelers need at least €70 to receive a DutyCredit.</p>
            <p>→ <strong>Discount cap: €60</strong> — maximum discount available at €300+ spend.</p>
            <p className="text-xs text-blue-600">This performance-based model rewards both travelers and retailers — higher spending means higher discounts, and travel partners earn commission on the full transaction value.</p>
          </div>
        </div>

        {/* Step 4 — Webhooks */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">4</div>
            <h2 className="text-2xl font-heading font-semibold">Optional: Receive redemption webhooks</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            When a traveler redeems their DutyCredit at an airport store, DutyBoost can notify your system via a webhook. This is useful for CRM updates, commission tracking, or notifying account managers.
          </p>
          <p className="text-sm">Configure your webhook URL in your Travel Partner dashboard under <strong>Settings → Webhooks</strong>.</p>
          <CodeBlock code={WEBHOOK_EXAMPLE} label="webhook-handler.js" />
        </div>

        {/* Step 5 — Testing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">5</div>
            <h2 className="text-2xl font-heading font-semibold">Testing your integration</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Sandbox mode', desc: 'Add "test_mode": true to any API request to use the sandbox. Vouchers generated in sandbox mode are flagged and will not be accepted at stores.' },
              { title: 'Check the email', desc: 'Use a real email address when testing. Verify the DutyCredit email arrives correctly and the QR code resolves to a valid voucher page.' },
              { title: 'Verify the voucher page', desc: 'Open the duty_credit_url from the response. It should show the correct discount %, store list, and expiry date.' },
              { title: 'Dashboard confirmation', desc: 'Log into your Travel Partner dashboard → Vouchers. Every API call should appear here in real time.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-4 space-y-1">
                <p className="font-semibold text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> {title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commission & Revenue Share */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">Commission & revenue share</h2>
          <p className="text-sm text-muted-foreground">DutyBoost operates on a performance-based revenue model. You earn commission on every redeemed DutyCredit based on the net sales value at the retailer.</p>

          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-semibold text-sm">Example transaction:</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Basket spend (before discount)</span><span className="font-mono">€300</span></div>
                  <div className="flex justify-between border-t border-border pt-1 mt-1"><span>Traveler discount (DutyCredit)</span><span className="font-mono text-destructive">−€60</span></div>
                  <div className="flex justify-between font-semibold bg-muted/30 p-2 rounded"><span>Net sales value</span><span className="font-mono">€240</span></div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-sm">Commission distribution on €240:</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>DutyBoost fee (2.5%)</span><span className="font-mono">€6.00</span></div>
                  <div className="flex justify-between"><span>Travel Partner share (0.5%)</span><span className="font-mono text-primary font-semibold">€1.20</span></div>
                  <div className="flex justify-between border-t border-border pt-1 mt-1"><span>DutyBoost net revenue</span><span className="font-mono">€4.80</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 space-y-2">
            <p className="font-semibold">How it works:</p>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> <strong>Net sales value</strong> = basket total minus the DutyCredit discount applied</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> <strong>Commission</strong> = 0.5% of net sales value is paid to the Travel Partner</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> <strong>No hidden costs</strong> — you only earn on real transactions</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> Commission is calculated automatically and appears in your Travel Partner dashboard</li>
            </ul>
          </div>
        </div>

        {/* What the traveler sees */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold">What the traveler experiences</h2>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {[
              { icon: Mail, title: 'Booking confirmation email', desc: 'The DutyCredit block appears inside your confirmation email — branded with your Travel Partner name. No separate email needed from you.' },
              { icon: QrCode, title: 'Personal QR code page', desc: 'Tapping the link opens a mobile-optimised voucher page showing the QR code, participating stores at their departure airport, discount %, and expiry.' },
              { icon: Zap, title: 'Instant scan at the store', desc: 'The retailer scans the QR code at the till. Discount is applied immediately. Traveler gets their discount — you earn your commission.' },
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

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-3">
          <h3 className="font-heading font-semibold text-lg">Need help integrating?</h3>
          <p className="text-sm text-muted-foreground">Our technical team is ready to support your integration. We can jump on a call, review your code, or provide a sandbox API key for testing.</p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:rael@dutyboost.com">
              <Button className="gap-2"><Mail className="w-4 h-4" /> integrations@dutyboost.com</Button>
            </a>
            <Link to="/retailer-integration-guide">
              <Button variant="outline" className="gap-2">Retailer POS Guide <ArrowRight className="w-4 h-4" /></Button>
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