import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, ArrowRight, Store, Users } from "lucide-react";

export default function GetStarted() {
  const [businessType, setBusinessType] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.users.inviteUser(email, "user");
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Plane className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-heading font-bold mb-3">You're on the list!</h1>
        <p className="text-muted-foreground max-w-sm mb-6">
          We've sent an invite to <strong>{email}</strong>. Check your inbox to set up your account and access the DutyBoost platform.
        </p>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border px-6 h-16 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Plane className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-lg">DutyBoost</span>
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
              <p className="text-xs text-muted-foreground mt-1">Generate vouchers for travelers</p>
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
              <p className="text-xs text-muted-foreground mt-1">Accept vouchers & drive sales</p>
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