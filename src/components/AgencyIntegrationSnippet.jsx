import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Copy, Check, Code2, Settings, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button size="sm" variant="outline" className="gap-1.5 h-7 text-xs" onClick={handle}>
      {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : label}
    </Button>
  );
}

export default function AgencyIntegrationSnippet() {
  const [agencyEmail, setAgencyEmail] = useState("your@agency.com");
  const [open, setOpen] = useState(false);
  const endpoint = `${window.location.origin}/api/generateDutyCredit`;

  useEffect(() => {
    base44.auth.me().then(u => { if (u?.email) setAgencyEmail(u.email); }).catch(() => {});
  }, []);

  const snippet = `<script>
// DutyBoost Integration — paste this once in your booking confirmation page
// Fires automatically after every confirmed booking.

function issueDutyCredit(booking) {
  fetch("${endpoint}", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      booking_id:          booking.id,
      total_ticket_price:  booking.totalPrice,
      number_of_travelers: booking.passengers,
      travel_type:         booking.isLongHaul ? "Long-haul" : "Short-haul",
      departure_airport:   booking.departureAirport,
      travel_date:         booking.departureDate,   // "YYYY-MM-DD"
      traveler_email:      booking.travelerEmail,
      traveler_name:       booking.travelerName,
      agency_email:        "${agencyEmail}",
      agency_name:         "YOUR AGENCY NAME"
    })
  });
}
<\/script>`;

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Code2 className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-base mb-1">Automatic Booking Integration</h3>
          <p className="text-sm text-muted-foreground">
            Paste the snippet below into your booking confirmation page. Call <code className="bg-muted px-1 py-0.5 rounded text-xs">issueDutyCredit(booking)</code> after every confirmed booking — DutyBoost handles the rest automatically.
          </p>
        </div>
      </div>

      {/* Endpoint */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your API Endpoint</p>
        <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
          <span className="text-xs font-mono text-foreground break-all flex-1">{endpoint}</span>
          <CopyButton text={endpoint} label="Copy URL" />
        </div>
      </div>

      {/* Code snippet */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your Integration Snippet</p>
          <Button size="sm" variant="outline" className="gap-1.5 h-7 text-xs" onClick={() => setOpen(v => !v)}>
            <Code2 className="w-3 h-3" />
            {open ? "Hide" : "Show Snippet"}
          </Button>
        </div>
        {open && (
          <>
            <div className="relative rounded-xl overflow-hidden bg-slate-900">
              <pre className="p-4 text-slate-100 overflow-x-auto text-xs leading-relaxed">{snippet}</pre>
              <div className="absolute top-3 right-3"><CopyButton text={snippet} label="Copy Snippet" /></div>
            </div>
            <p className="text-xs text-muted-foreground">
              Your agency email (<code className="bg-muted px-1 py-0.5 rounded">{agencyEmail}</code>) is pre-filled. Map your booking object's fields to the parameter names shown.
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 pt-1">
        <Link to="/integration-guide">
          <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
            <ExternalLink className="w-3.5 h-3.5" /> Full Integration Guide
          </Button>
        </Link>
      </div>
    </div>
  );
}