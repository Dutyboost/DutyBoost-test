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
    full_name: "",
    position: "",
    decision_level: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.company_name || !form.website || !form.industry || !form.email || !form.phone || !form.full_name || !form.position || !form.decision_level) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await base44.entities.Lead.create({
        company_name: form.company_name,
        website: form.website,
        industry: form.industry,
        email: form.email,
        phone: form.phone,
        full_name: form.full_name,
        position: form.position,
        decision_level: form.decision_level,
      });
      
      toast.success("Thank you! We'll be in touch soon.");
      setForm({ company_name: "", website: "", industry: "", email: "", phone: "", full_name: "", position: "", decision_level: "" });
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

      <div className="space-y-2">
        <Label htmlFor="full_name" className="text-sm">Full Name *</Label>
        <Input
          id="full_name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="position" className="text-sm">Position within the Company *</Label>
        <Input
          id="position"
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="e.g., Manager, Director"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="decision_level" className="text-sm">Decision Making Level *</Label>
        <select
          id="decision_level"
          name="decision_level"
          value={form.decision_level}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          required
        >
          <option value="">Select level</option>
          <option value="Executive">Executive</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
        </select>
      </div>

      <Button type="submit" className="w-full gap-2" disabled={loading}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Get in Touch
      </Button>
    </form>
  );
}