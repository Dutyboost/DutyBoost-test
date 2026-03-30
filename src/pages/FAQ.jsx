import { Link } from "react-router-dom";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    category: "DutyCredits",
    questions: [
      {
        q: "What is a DutyCredit?",
        a: "A DutyCredit is a booking-earned incentive — a unique digital discount code automatically generated when a travel agency submits a booking through the DutyBoost platform. Travelers receive it as a QR code and can use it to get a discount at participating airport retailers.",
      },
      {
        q: "How is my DutyCredit discount calculated?",
        a: "The discount percentage is calculated dynamically by our platform based on the booking parameters: total ticket price, number of travelers, and whether the flight is short-haul or long-haul. The higher the booking value, the greater the potential discount.",
      },
      {
        q: "Can I use my DutyCredit at multiple shops?",
        a: "No. DutyCredits are redeemable in a single transaction at one point of sale and cannot be split across multiple shops. Choose the store where you want to apply the full discount.",
      },
      {
        q: "How do I receive my DutyCredit?",
        a: "Your travel agency will share a link with you after your booking is confirmed. Opening the link shows your personal DutyCredit QR code, which you present at the retailer's point of sale.",
      },
      {
        q: "Do DutyCredits expire?",
        a: "Yes. Every DutyCredit has an expiration date tied to your travel date. Expired DutyCredits cannot be reinstated or reissued. Make sure to use yours before or on your travel day.",
      },
      {
        q: "Can I transfer my DutyCredit to someone else?",
        a: "No. DutyCredits are unique, single-use, and cryptographically secured. They are intended exclusively for the traveler associated with the booking and cannot be transferred, resold, or duplicated.",
      },
    ],
  },
  {
    category: "For Travelers",
    questions: [
      {
        q: "Do I need to sign up to use a DutyCredit?",
        a: "No sign-up or account is required. Simply open the link shared by your travel agency, and your DutyCredit QR code will be ready to scan at any participating retailer.",
      },
      {
        q: "Where can I redeem my DutyCredit?",
        a: "DutyCredits can be redeemed at any airport retailer registered on the DutyBoost platform at your departure airport. Look for the DutyBoost-accepted sign at the point of sale.",
      },
      {
        q: "What happens after I scan my DutyCredit?",
        a: "The retailer scans your QR code, the discount is instantly applied to your purchase, and your DutyCredit is marked as redeemed. It can no longer be used after that point.",
      },
    ],
  },
  {
    category: "For Travel Agencies",
    questions: [
      {
        q: "How does DutyBoost benefit my agency?",
        a: "Every time one of your travelers redeems a DutyCredit at the airport, your agency earns a 20% revenue margin on the platform's commission. It's a zero-effort revenue stream built on top of bookings you're already making.",
      },
      {
        q: "How do I generate a DutyCredit?",
        a: "You don't — it happens automatically. The moment a traveler's booking is confirmed in your system, DutyBoost generates a unique DutyCredit in real time. Here's how the process works: (1) Your booking system sends the booking details to DutyBoost via a simple API call — ticket price, number of travelers, travel type, and departure airport. (2) DutyBoost instantly calculates the personalised discount percentage. (3) A co-branded email is sent directly to the traveler's inbox containing their unique QR code and discount details — no manual effort required on your part. Once you integrate the API, the entire flow is fully automated.",
      },
      {
        q: "Is there a cost to join DutyBoost as an agency?",
        a: "No. There are no setup fees, subscription fees, or usage costs for travel agencies. You only earn — never pay.",
      },
    ],
  },
  {
    category: "For Airport Retailers",
    questions: [
      {
        q: "How does DutyBoost benefit my store?",
        a: "DutyBoost drives pre-qualified, incentivised travelers directly to your store. These are shoppers who already have a discount waiting — meaning higher conversion rates and larger basket sizes.",
      },
      {
        q: "What commission does DutyBoost charge retailers?",
        a: "DutyBoost charges a 5% commission on the gross transaction value of sales made through a redeemed DutyCredit. You pay nothing unless a DutyCredit is actually redeemed at your store.",
      },
      {
        q: "How do I redeem a DutyCredit at my store?",
        a: "Use the DutyBoost retailer dashboard or scan interface to scan the traveler's QR code. The system validates the DutyCredit, displays the discount to apply, and logs the transaction automatically.",
      },
    ],
  },
  {
    category: "Platform & Security",
    questions: [
      {
        q: "Is DutyBoost secure?",
        a: "Yes. Every DutyCredit is cryptographically unique and single-use. Once redeemed, it is permanently invalidated. Our platform uses industry-standard encryption (TLS 1.2+ in transit, AES-256 at rest) and role-based access controls.",
      },
      {
        q: "What happens if a DutyCredit is used fraudulently?",
        a: "DutyBoost monitors for suspicious activity and reserves the right to invalidate any DutyCredit suspected of being generated through fraudulent or manipulated booking data. Violations may result in account suspension.",
      },
      {
        q: "Is my data safe with DutyBoost?",
        a: "Absolutely. DutyBoost is fully GDPR-compliant and processes personal data only to deliver its services. We never sell your data to third parties. For full details, see our Privacy Policy and Data Processing Agreement.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm">{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 bg-muted/20">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={36} /></Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="outline" className="text-xs tracking-widest uppercase px-4 py-1">Help Centre</Badge>
          <h1 className="text-4xl font-heading font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Everything you need to know about DutyBoost and DutyCredits.</p>
        </div>

        {faqs.map((section) => (
          <div key={section.category} className="space-y-3">
            <h2 className="text-lg font-heading font-semibold text-primary">{section.category}</h2>
            <div className="space-y-2">
              {section.questions.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © 2026 DutyBoost. <Link to="/" className="text-primary underline">Back to Home</Link>
      </footer>
    </div>
  );
}