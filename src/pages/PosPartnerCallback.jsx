import { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import {
  ArrowLeft, Loader2, CheckCircle2, Plug, ShieldCheck, Zap, Clock
} from "lucide-react";
import { toast } from "sonner";

// ── Validation helpers (shared with the travel-partner We Call You form) ──
const FREE_EMAIL_DOMAINS = [
  'gmail.com','googlemail.com','yahoo.com','yahoo.co.uk','yahoo.fr','yahoo.de',
  'hotmail.com','hotmail.co.uk','hotmail.fr','hotmail.de','hotmail.nl',
  'outlook.com','live.com','msn.com','icloud.com','me.com','mac.com',
  'aol.com','protonmail.com','proton.me','mail.com','gmx.com','gmx.net',
  'yandex.com','yandex.ru','inbox.com','zohomail.com','tutanota.com',
];

function isRealName(name) {
  const trimmed = name.trim();
  return /^[a-zA-ZÀ-ÖØ-öø-ÿ'\-]+(\s+[a-zA-ZÀ-ÖØ-öø-ÿ'\-]+)+$/.test(trimmed);
}

function isWorkEmail(email) {
  const parts = email.toLowerCase().split('@');
  if (parts.length !== 2) return false;
  return !FREE_EMAIL_DOMAINS.includes(parts[1]);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return /^[+]?[\d\s\-().]{7,20}$/.test(phone.trim()) && digits.length >= 7;
}

function extractDomain(url) {
  try {
    let u = url.trim();
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    return new URL(u).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return null;
  }
}

function isValidWebsite(url) {
  const domain = extractDomain(url);
  if (!domain) return false;
  return /^[a-z0-9\-]+\.[a-z]{2,}/.test(domain);
}

function domainsMatch(email, website) {
  const emailDomain = email.toLowerCase().split('@')[1];
  const websiteDomain = extractDomain(website);
  if (!emailDomain || !websiteDomain) return false;
  return emailDomain === websiteDomain;
}

const VIOLET = "#6d28d9";

export default function PosPartnerCallback() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    website: "",
    footprint: "",
  });

  const validate = () => {
    const errs = {};
    if (!isRealName(form.full_name)) errs.full_name = "Please enter your full name (first and last name).";
    if (!form.email) errs.email = "Work email is required.";
    else if (!isWorkEmail(form.email)) errs.email = "Please use a professional work email address (no Gmail, Hotmail, etc.).";
    if (!isValidPhone(form.phone)) errs.phone = "Please enter a valid phone number (e.g. +31 6 1234 5678).";
    if (!form.company_name.trim()) errs.company_name = "Company name is required.";
    if (!isValidWebsite(form.website)) errs.website = "Please enter a valid website URL (e.g. https://yourcompany.com).";
    else if (form.email && isWorkEmail(form.email) && !domainsMatch(form.email, form.website))
      errs.website = "Your email domain must match your company website domain.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    setLoading(true);
    try {
      await base44.entities.Lead.create({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        company_name: form.company_name,
        website: form.website,
        industry: "POS Channel Partner",
        position: form.footprint ? `POS footprint: ${form.footprint}` : "",
        decision_level: "",
      });

      await base44.functions.invoke('sendLeadConfirmationEmail', {
        full_name: form.full_name,
        email: form.email,
      });

      setSubmitted(true);
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/pos-channel-partner" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <Link to="/"><DutyBoostLogo height={40} /></Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ── Left: pitch ── */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium" style={{ background: "hsl(255 90% 95%)", color: VIOLET }}>
              <Plug className="w-4 h-4" />
              POS &amp; Technology Channel Partners
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold leading-tight">
              Let's talk channel partnership.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Leave your details and our partnerships team will walk you through the integration, commercial terms, and a tailored revenue projection for your POS footprint.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(255 90% 95%)" }}>
                  <Clock className="w-4 h-4" style={{ color: VIOLET }} />
                </div>
                <div>
                  <p className="font-semibold text-sm">We respond within 1 business day</p>
                  <p className="text-sm text-muted-foreground">A 30-minute call to scope the integration and model your earnings.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(255 90% 95%)" }}>
                  <Zap className="w-4 h-4" style={{ color: VIOLET }} />
                </div>
                <div>
                  <p className="font-semibold text-sm">Live in 2 weeks</p>
                  <p className="text-sm text-muted-foreground">One webhook integration. No hardware, no field service.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(255 90% 95%)" }}>
                  <ShieldCheck className="w-4 h-4" style={{ color: VIOLET }} />
                </div>
                <div>
                  <p className="font-semibold text-sm">No commitment to explore</p>
                  <p className="text-sm text-muted-foreground">The call is exploratory. You decide if the model fits your network.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: form / success ── */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "hsl(255 90% 95%)" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: VIOLET }} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-heading font-bold">Request received!</h2>
                  <p className="text-sm text-muted-foreground">
                    Thanks, {form.full_name.split(' ')[0]}. Our partnerships team will reach out within one business day to schedule a call.
                  </p>
                </div>
                <Link to="/pos-channel-partner">
                  <Button variant="outline" className="gap-2 mt-2">
                    <ArrowLeft className="w-4 h-4" /> Back to overview
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-heading font-bold mb-1">Request a callback</h2>
                <p className="text-sm text-muted-foreground mb-6">Tell us about your POS network and we'll be in touch.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="full_name" className="text-sm">Full name *</Label>
                    <Input id="full_name" name="full_name" value={form.full_name} onChange={handleChange} placeholder="John Doe" />
                    {errors.full_name && <p className="text-xs text-red-500">{errors.full_name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm">Work email *</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@yourcompany.com" />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm">Phone number *</Label>
                    <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+31 6 1234 5678" />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company_name" className="text-sm">Company name *</Label>
                    <Input id="company_name" name="company_name" value={form.company_name} onChange={handleChange} placeholder="Your POS company" />
                    {errors.company_name && <p className="text-xs text-red-500">{errors.company_name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="website" className="text-sm">Company website *</Label>
                    <Input id="website" name="website" value={form.website} onChange={handleChange} placeholder="https://yourcompany.com" />
                    {errors.website && <p className="text-xs text-red-500">{errors.website}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="footprint" className="text-sm">Airport retailers on your POS (optional)</Label>
                    <Textarea
                      id="footprint" name="footprint" value={form.footprint} onChange={handleChange}
                      placeholder="e.g. ~200 retailers across 15 airports in Europe"
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground">Helps us tailor the revenue projection for the call.</p>
                  </div>

                  <Button
                    type="submit" disabled={loading}
                    className="w-full gap-2 h-12 text-base"
                    style={{ background: "linear-gradient(to right, #7c3aed, #6366f1)" }}
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Request callback
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting you agree to be contacted by DutyBoost B.V. about a channel partnership.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/"><DutyBoostLogo height={40} /></Link>
          <p>© {new Date().getFullYear()} DutyBoost B.V. — The Travel Retail Conversion Layer</p>
        </div>
      </footer>
    </div>
  );
}