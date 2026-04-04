import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function GetInTouchForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    website: "",
    industry: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.company_name || !form.website || !form.industry || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await base44.entities.Lead.create({
        company_name: form.company_name,
        website: form.website,
        industry: form.industry,
        email: form.email || null,
        phone: form.phone || null,
      });
      
      toast.success("Thank you! We'll be in touch soon.");
      setForm({ company_name: "", website: "", industry: "", email: "", phone: "" });
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company_name" className="text-sm">Company Name *</Label>
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
        <Label htmlFor="website" className="text-sm">Website *</Label>
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
        <Label htmlFor="industry" className="text-sm">I'm a *</Label>
        <select
          id="industry"
          name="industry"
          value={form.industry}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          required
        >
          <option value="">Airport Retailer</option>
          <option value="Agency">Travel Agency</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm">Email *</Label>
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
        <Label htmlFor="phone" className="text-sm">Phone *</Label>
        <Input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+31 6 1234 5678"
          required
        />
      </div>

      <Button type="submit" className="w-full gap-2" disabled={loading}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Get in Touch
      </Button>
    </form>
  );
}