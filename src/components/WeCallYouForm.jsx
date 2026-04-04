import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function WeCallYouForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.full_name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await base44.entities.Lead.create({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        company_name: form.company,
        website: "",
        industry: "",
        position: "",
        decision_level: "",
      });
      
      toast.success("Thanks! We'll call you soon.");
      setForm({ full_name: "", email: "", phone: "", company: "" });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name" className="text-sm">Your Name *</Label>
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
        <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
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
        <Label htmlFor="company" className="text-sm">Company Name</Label>
        <Input
          id="company"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Your company"
        />
      </div>

      <Button type="submit" className="w-full gap-2" disabled={loading}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Request a Call
      </Button>
    </form>
  );
}