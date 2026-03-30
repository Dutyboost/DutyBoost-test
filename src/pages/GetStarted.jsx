import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Store, Users } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

export default function GetStarted() {
  const [businessType, setBusinessType] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [kvk, setKvk] = useState("");
  const [vat, setVat] = useState("");
  const [bookingSystem, setBookingSystem] = useState("");
  const [airport, setAirport] = useState("");
  const [storeCategory, setStoreCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAgency = businessType === "Travel Agency";
  const isRetailer = businessType === "Airport Retailer";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.functions.invoke('inviteUser', {
      email, fullName, company, businessType, website, kvk, vat, bookingSystem, airport, storeCategory
    });
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="border-b border-border px-6 h-16 flex items-center">
          <Link to="/"><DutyBoostLogo height={36} /></Link>
        </nav>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-heading font-bold">Check your inbox!</h1>
              <p className="text-muted-foreground">
                We've sent a confirmation email to
              </p>
              <p className="font-semibold text-foreground text-lg">{email}</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-4">
              <p className="font-semibold text-sm text-foreground">What happens next?</p>
              <ol className="space-y-3">
                {[
                  { step: '1', text: 'Check your inbox (and spam folder) for our confirmation email.' },
                  { step: '2', text: 'Our team reviews your application within 1 business day.' },
                  { step: '3', text: 'We send you a platform invite to activate your account.' },
                  { step: '4', text: 'Your DutyBoost integration is set up — no technical work needed.' },
                ].map(({ step, text }) => (
                  <li key={step} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</span>
                    <span className="text-sm text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-sm text-muted-foreground">
              Questions? Email us at{' '}
              <a href="mailto:hello@dutyboost.com" className="text-primary underline underline-offset-2">hello@dutyboost.com</a>
            </p>
            <Link to="/">
              <Button variant="outline" className="w-full">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/">
          <DutyBoostLogo height={36} />
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-heading font-bold">Get Started</h1>
            <p className="text-muted-foreground">Join DutyBoost and start growing your airport revenue.</p>
          </div>

          {/* Business type cards */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setBusinessType("Travel Agency")}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                businessType === "Travel Agency"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <Users className={`w-6 h-6 mb-2 ${businessType === "Travel Agency" ? "text-primary" : "text-muted-foreground"}`} />
              <p className="font-semibold text-sm">Travel Agency</p>
              <p className="text-xs text-muted-foreground mt-1">Generate Travel Yields for travelers</p>
            </button>
            <button
              type="button"
              onClick={() => setBusinessType("Airport Retailer")}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                businessType === "Airport Retailer"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <Store className={`w-6 h-6 mb-2 ${businessType === "Airport Retailer" ? "text-primary" : "text-muted-foreground"}`} />
              <p className="font-semibold text-sm">Airport Retailer</p>
              <p className="text-xs text-muted-foreground mt-1">Accept Travel Yields & drive sales</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Business Type</Label>
              <Select value={businessType} onValueChange={setBusinessType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Travel Agency">Travel Agency</SelectItem>
                  <SelectItem value="Airport Retailer">Airport Retailer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input
                placeholder="Jane Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label>Work Email</Label>
              <Input
                type="email"
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label>Company Name</Label>
              <Input
                placeholder="Your company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2 h-11 text-base"
              disabled={!businessType || !fullName || !email || !company || loading}
            >
              {loading ? "Sending invite..." : "Create Account"} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => base44.auth.redirectToLogin('/dashboard')} className="text-primary underline underline-offset-2">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}