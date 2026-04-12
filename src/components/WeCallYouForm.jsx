import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const FREE_EMAIL_DOMAINS = [
  'gmail.com','googlemail.com','yahoo.com','yahoo.co.uk','yahoo.fr','yahoo.de',
  'hotmail.com','hotmail.co.uk','hotmail.fr','hotmail.de','hotmail.nl',
  'outlook.com','live.com','msn.com','icloud.com','me.com','mac.com',
  'aol.com','protonmail.com','proton.me','mail.com','gmx.com','gmx.net',
  'yandex.com','yandex.ru','inbox.com','zohomail.com','tutanota.com',
];

function isRealName(name) {
  const trimmed = name.trim();
  // Must have at least two words, only letters, spaces, hyphens, apostrophes
  if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ'\-]+(\s+[a-zA-ZÀ-ÖØ-öø-ÿ'\-]+)+$/.test(trimmed)) return false;
  return true;
}

function isWorkEmail(email) {
  const parts = email.toLowerCase().split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  return !FREE_EMAIL_DOMAINS.includes(domain);
}

function isValidPhone(phone) {
  // Allow international format: optional +, digits, spaces, dashes, parentheses. Min 7 digits.
  const digits = phone.replace(/\D/g, '');
  return /^[+]?[\d\s\-().]{7,20}$/.test(phone.trim()) && digits.length >= 7;
}

function extractDomain(url) {
  try {
    let u = url.trim();
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    const hostname = new URL(u).hostname.toLowerCase().replace(/^www\./, '');
    return hostname;
  } catch {
    return null;
  }
}

function isValidWebsite(url) {
  const domain = extractDomain(url);
  if (!domain) return false;
  // Must have a TLD
  return /^[a-z0-9\-]+\.[a-z]{2,}/.test(domain);
}

function domainsMatch(email, website) {
  const emailDomain = email.toLowerCase().split('@')[1];
  const websiteDomain = extractDomain(website);
  if (!emailDomain || !websiteDomain) return false;
  // Email domain must match website domain (ignoring www)
  return emailDomain === websiteDomain;
}

export default function WeCallYouForm({ onSuccess }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    website: "",
    industry: "",
  });

  const validate = () => {
    const errs = {};
    if (!isRealName(form.full_name))
      errs.full_name = 'Please enter your full name (first and last name).';
    if (!form.email)
      errs.email = 'Email is required.';
    else if (!isWorkEmail(form.email))
      errs.email = 'Please use a professional work email address (no Gmail, Hotmail, etc.).';
    if (!isValidPhone(form.phone))
      errs.phone = 'Please enter a valid phone number (e.g. +31 6 1234 5678).';
    if (!form.company_name.trim())
      errs.company_name = 'Company name is required.';
    if (!isValidWebsite(form.website))
      errs.website = 'Please enter a valid website URL (e.g. https://yourcompany.com).';
    else if (form.email && isWorkEmail(form.email) && !domainsMatch(form.email, form.website))
      errs.website = 'Your email domain must match your company website domain.';
    if (!form.industry)
      errs.industry = 'Please select your business type.';
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
      toast.error('Please fix the errors in the form before submitting.');
      return;
    }

    setLoading(true);
    try {
      const lead = await base44.entities.Lead.create({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        company_name: form.company_name,
        website: form.website,
        industry: form.industry,
        position: "",
        decision_level: "",
      });

      // Send confirmation email via Postmark
      await base44.functions.invoke('sendLeadConfirmationEmail', {
        full_name: form.full_name,
        email: form.email,
      });

      toast.success(t('wecallyou.success'));
      setForm({ full_name: "", email: "", phone: "", company_name: "", website: "", industry: "" });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(t('wecallyou.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="full_name" className="text-sm">{t('wecallyou.name')} *</Label>
        <Input
          id="full_name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="John Doe"
        />
        {errors.full_name && <p className="text-xs text-red-500">{errors.full_name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm">{t('wecallyou.email')} *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@yourcompany.com"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm">{t('wecallyou.phone')} *</Label>
        <Input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+31 6 1234 5678"
        />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="company_name" className="text-sm">{t('wecallyou.company')} *</Label>
        <Input
          id="company_name"
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
          placeholder="Your company"
        />
        {errors.company_name && <p className="text-xs text-red-500">{errors.company_name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website" className="text-sm">{t('wecallyou.website')} *</Label>
        <Input
          id="website"
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="https://yourcompany.com"
        />
        {errors.website && <p className="text-xs text-red-500">{errors.website}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry" className="text-sm">{t('wecallyou.type')} *</Label>
        <select
          id="industry"
          name="industry"
          value={form.industry}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="">{t('wecallyou.select_type')}</option>
          <option value="Retail">{t('wecallyou.retailer')}</option>
          <option value="Agency">{t('wecallyou.agency')}</option>
        </select>
        {errors.industry && <p className="text-xs text-red-500">{errors.industry}</p>}
      </div>

      <Button type="submit" className="w-full gap-2" disabled={loading}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {t('wecallyou.request_call')}
      </Button>
    </form>
  );
}