import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Copy, Check, Zap, Mail, QrCode, Code2 } from "lucide-react";

const endpoint = "https://YOUR_APP_DOMAIN/api/generateDutyCredit";

const examplePayload = `{
  "booking_id": "BK-20240415-001",
  "total_ticket_price": 1250,
  "number_of_travelers": 2,
  "travel_type": "Long-haul",
  "departure_airport": "Amsterdam Schiphol (AMS)",
  "travel_date": "2024-06-15",
  "traveler_email": "john.doe@email.com",
  "traveler_name": "John Doe",
  "agency_name": "Sunrise Travel",
  "agency_email": "agency@sunrisetravel.com"
}`;

const exampleResponse = `{
  "success": true,
  "voucher_code": "DB-X7K2M4NP",
  "discount_percentage": 16,
  "expiration_date": "2024-06-16",
  "duty_credit_url": "https://yourapp.com/voucher?code=DB-X7K2M4NP",
  "message": "DutyCredit generated and sent to john.doe@email.com"
}`;

const discountTable = [
  { condition: "Base discount", value: "+5%" },
  { condition: "Each additional traveler (beyond 1)", value: "+1% per traveler" },
  { condition: "Ticket price > €1,000", value: "+5%" },
  { condition: "Ticket price > €2,000", value: "+10%" },
  { condition: "Long-haul flight", value: "+5%" },
  { condition: "Maximum cap", value: "25%" },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function CodeBlock({ code, language = "json" }) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-slate-900 text-sm">
      <CopyButton text={code} />
      <pre className="p-5 text-slate-100 overflow-x-auto leading-relaxed text-xs">{code}</pre>
    </div>
  );
}

export default function AgencyIntegrationGuide() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={130} /></Link>
          <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back to FAQ</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-14">

        {/* Hero */}
        <div className="text-center space-y-3">
          <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">Developer Guide</Badge>
          <h1 className="text-4xl font-heading font-bold">Agency Integration Guide</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Connect your booking system to DutyBoost so that DutyCredits are generated and emailed to travelers automatically — the moment a booking is confirmed.
          </p>
        </div>

        {/* How it works */}
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-semibold">How it works</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {([
              { icon: Code2, title: "1. Call our API", desc: "After confirming a booking in your system, make a single POST request to the DutyBoost API with the booking details." },
              { icon: Zap, title: "2. Instant calculation", desc: "DutyBoost instantly calculates the discount percentage based on ticket price, traveler count, and travel type." },
              { icon: Mail, title: "3. Email sent automatically", desc: "A co-branded email with the traveler's personal QR-code DutyCredit is sent directly to their inbox \u2014 no manual steps needed." },
            ] ).map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Endpoint */}
        <div className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">API Endpoint</h2>
          <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
            <Badge className="bg-primary text-white text-xs">POST</Badge>
            <code className="text-sm font-mono text-foreground break-all">/api/generateDutyCredit</code>
          </div>
          <p className="text-sm text-muted-foreground">All requests must include an <code className="bg-muted px-1 py-0.5 rounded text-xs">Authorization</code> header using your DutyBoost session token, or be made from an authenticated agency account.</p>
        </div>

        {/* Request payload */}
        <div className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">Request Payload</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Field</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Type</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Required</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["booking_id", "string", "✅", "Your internal booking reference"],
                  ["total_ticket_price", "number", "✅", "Total ticket price in EUR"],
                  ["number_of_travelers", "integer", "✅", "Number of travelers on the booking"],
                  ["travel_type", "string", "✅", '"Short-haul" or "Long-haul"'],
                  ["departure_airport", "string", "✅", "Airport name or IATA code"],
                  ["travel_date", "string", "✅", "ISO date format: YYYY-MM-DD"],
                  ["traveler_email", "string", "✅", "Email address to send the DutyCredit to"],
                  ["traveler_name", "string", "—", "Traveler's name for personalised email"],
                  ["agency_name", "string", "—", "Your agency name for co-branding"],
                  ["agency_email", "string", "—", "Agency email (fallback if not authenticated)"],
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
        </div>

        {/* Example */}
        <div className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">Example Request</h2>
          <CodeBlock code={examplePayload} />
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">Example Response</h2>
          <CodeBlock code={exampleResponse} />
        </div>

        {/* Discount logic */}
        <div className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">Discount Calculation Logic</h2>
          <p className="text-sm text-muted-foreground">DutyBoost calculates the discount dynamically based on these cumulative rules:</p>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Condition</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Discount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {discountTable.map(({ condition, value }) => (
                  <tr key={condition} className="hover:bg-muted/20">
                    <td className="px-4 py-2.5 text-muted-foreground text-sm">{condition}</td>
                    <td className="px-4 py-2.5 font-semibold text-primary text-sm">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What the traveler receives */}
        <div className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">What the traveler receives</h2>
          <div className="bg-card border border-border rounded-xl p-5 space-y-2">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">Co-branded email</p>
                <p className="text-sm text-muted-foreground">A beautifully formatted email from your agency name and DutyBoost, containing the discount percentage, travel details, and a prominent CTA button.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <QrCode className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">Personal QR code page</p>
                <p className="text-sm text-muted-foreground">Clicking the email CTA opens a mobile-optimised page showing the unique QR code, valid stores, and expiry — ready to present at the retailer's till.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-2">
          <h3 className="font-heading font-semibold">Need help integrating?</h3>
          <p className="text-sm text-muted-foreground">Our team is happy to assist with your booking system integration. Reach out at <a href="mailto:integrations@dutyboost.com" className="text-primary underline">integrations@dutyboost.com</a>.</p>
        </div>

      </div>

      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">Back to Home</Link>
      </footer>
    </div>
  );
}