import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function WeCallYouForm({ onSuccess }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    website: "",
    industry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.full_name || !form.email || !form.phone || !form.company_name || !form.website || !form.industry) {
      toast.error(t('wecallyou.fill_required'));
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
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm">{t('wecallyou.email')} *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm">{t('wecallyou.phone')} *</Label>
        <Input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+31 6 1234 5678"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company_name" className="text-sm">{t('wecallyou.company')} *</Label>
        <Input
          id="company_name"
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
          placeholder="Your company"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website" className="text-sm">{t('wecallyou.website')} *</Label>
        <Input
          id="website"
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="https://example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry" className="text-sm">{t('wecallyou.type')} *</Label>
        <select
          id="industry"
          name="industry"
          value={form.industry}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          required
        >
          <option value="">{t('wecallyou.select_type')}</option>
          <option value="Retail">{t('wecallyou.retailer')}</option>
          <option value="Agency">{t('wecallyou.agency')}</option>
          <option value="Airline">Airline</option>
        </select>
      </div>

      <Button type="submit" className="w-full gap-2" disabled={loading}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {t('wecallyou.request_call')}
      </Button>
    </form>
  );
}