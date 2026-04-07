import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Plane, Users, Store } from "lucide-react";

export default function LoginDialog({ open, onOpenChange }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setLoading(true);
    
    try {
      const users = await base44.entities.User.list();
      const exists = users.some(u => u.email === email);
      
      if (exists) {
        setStep("type");
      } else {
        window.location.href = "/get-started";
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelect = (type) => {
    base44.auth.redirectToLogin();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="w-5 h-5" />
            Sign In
          </DialogTitle>
        </DialogHeader>

        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Checking..." : "Continue"}
            </Button>
          </form>
        )}

        {step === "type" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Select your profile type
            </p>
            
            <button
              onClick={() => handleTypeSelect("traveler")}
              className="w-full p-4 rounded-lg border border-border hover:border-blue-500 hover:bg-blue-50 transition-all text-left space-y-1"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium">I'm a Traveler</span>
              </div>
              <p className="text-xs text-muted-foreground">Access your travel credits</p>
            </button>

            <button
              onClick={() => handleTypeSelect("agency")}
              className="w-full p-4 rounded-lg border border-border hover:border-green-500 hover:bg-green-50 transition-all text-left space-y-1"
            >
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-green-600" />
                <span className="font-medium">I'm a Travel Agency</span>
              </div>
              <p className="text-xs text-muted-foreground">Manage bookings</p>
            </button>

            <button
              onClick={() => handleTypeSelect("retailer")}
              className="w-full p-4 rounded-lg border border-border hover:border-orange-500 hover:bg-orange-50 transition-all text-left space-y-1"
            >
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-orange-600" />
                <span className="font-medium">I'm an Airport Retailer</span>
              </div>
              <p className="text-xs text-muted-foreground">View analytics</p>
            </button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setStep("email");
                setEmail("");
              }}
            >
              Back
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}