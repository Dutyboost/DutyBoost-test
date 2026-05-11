import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

const PARTNER_TYPES = [
  "Travel Agency / Tour Operator",
  "Hotel / Hospitality",
  "Car Rental",
  "Airport Retailer",
  "Other",
];

const EUROPEAN_COUNTRIES = [
  "Albania", "Andorra", "Austria", "Belgium", "Bosnia and Herzegovina",
  "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia",
  "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland",
  "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg",
  "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia",
  "Norway", "Poland", "Portugal", "Romania", "San Marino", "Serbia", "Slovakia",
  "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine",
  "United Kingdom", "Vatican City",
];

export default function RequestDemoPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [partnerType, setPartnerType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValid = fullName && email && phone && company && website && country && partnerType;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    try {
      await base44.entities.Lead.create({
        full_name: fullName,
        email,
        company_name: company,
        website,
        industry: partnerType.includes("Retailer") ? "Retail" : "Agency",
        position: partnerType,
        phone,
      });
      try {
        await base44.integrations.Core.SendEmail({
          to: "hello@dutyboost.com",
          subject: `New Demo Request — ${company} (${partnerType})`,
          body: `
            <div style="font-family: sans-serif; max-width: 560px;">
              <h2>New Demo Request</h2>
              <table style="width:100%; border-collapse:collapse;">
                <tr><td style="padding:6px 0; color:#666;">Name</td><td><strong>${fullName}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Email</td><td><strong>${email}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Phone</td><td>${phone}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Company</td><td><strong>${company}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Website</td><td>${website}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Country</td><td>${country}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Partner type</td><td>${partnerType}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Message</td><td>${message}</td></tr>
              </table>
            </div>
          `,
        });
      } catch {
        // Email failure is non-blocking
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-body">
        <nav className="border-b border-border px-6 h-16 flex items-center">
          <Link to="/"><DutyBoostLogo height={130} /></Link>
        </nav>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-heading font-bold">Request Received!</h1>
              <p className="text-muted-foreground">
                Thank you for your interest in DutyBoost. Our team will reach out personally within 1–2 business days to schedule your demo.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-3">
              <p className="font-semibold text-sm">What happens next?</p>
              <ol className="space-y-3">
                {[
                  "Our team reviews your request and prepares a tailored demo.",
                  "We reach out personally to schedule a convenient time.",
                  "You get a live walkthrough of the platform — no pitch decks, just a real conversation.",
                  "If it's a fit, we'll guide you through the onboarding process together.",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-sm text-muted-foreground">
              Questions? Email us at{" "}
              <a href="mailto:hello@dutyboost.com" className="text-primary underline underline-offset-2">hello@dutyboost.com</a>
            </p>
            <Link to="/"><Button variant="outline" className="w-full">Back to Home</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/"><DutyBoostLogo height={130} /></Link>
        <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">

          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
              Request a Demo
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold">Let's show you how it works</h1>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Tell us a bit about yourself and your business. Our team will reach out personally to schedule a tailored walkthrough — no pressure, no pitch decks.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Full Name <span className="text-red-500">*</span></Label>
                <Input
                  required
                  placeholder="Jane Smith"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Work Email <span className="text-red-500">*</span></Label>
                <Input
                  required
                  type="email"
                  placeholder="jane@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Phone Number <span className="text-red-500">*</span></Label>
                <Input
                  required
                  type="tel"
                  placeholder="+31 6 12345678"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Country <span className="text-red-500">*</span></Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {EUROPEAN_COUNTRIES.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Company Name <span className="text-red-500">*</span></Label>
              <Input
                required
                placeholder="Your company"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Website <span className="text-red-500">*</span></Label>
              <Input
                required
                placeholder="https://yourcompany.com"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Partner Type <span className="text-red-500">*</span></Label>
              <Select value={partnerType} onValueChange={setPartnerType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {PARTNER_TYPES.map(pt => (
                    <SelectItem key={pt} value={pt}>{pt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Anything you'd like us to know? <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <textarea
                className="w-full min-h-[90px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                placeholder="Tell us about your business, your volume, or any specific questions..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2 text-base"
              disabled={!isValid || loading}
            >
              {loading ? "Sending..." : "Request Demo"} <ArrowRight className="w-4 h-4" />
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By submitting, you agree to our{" "}
              <Link to="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
              No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}