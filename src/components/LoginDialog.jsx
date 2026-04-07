import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Plane, Users, Store } from "lucide-react";
import { toast } from "sonner";

export default function LoginDialog({ open, onOpenChange }) {
  const [step, setStep] = useState("email"); // email, type, or loading
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [profileType, setProfileType] = useState(null);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check if user exists and get their profile type
      const users = await base44.entities.User.list();
      const userExists = users.find(u => u.email === email);
      
      if (userExists) {
        // Get their signup application to find profile type
        const apps = await base44.entities.SignupApplication.list();
        const userApp = apps.find(a => a.email === email);
        
        if (userApp) {
          const type = userApp.business_type === 'Travel Agency' ? 'agency' : userApp.business_type === 'Airport Retailer' ? 'retailer' : 'traveler';
          setProfileType(type);
        } else {
          // Default to traveler if no signup app found
          setProfileType('traveler');
        }
        setUserFound(true);
        setStep("type");
      } else {
        // Redirect to Get Started
        window.location.href = "/get-started";
      }
    } catch (e) {
      console.error('Login error:', e);
      toast.error("Error checking account");
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelect = (type) => {
    setStep("loading");
    // Redirect to login with type parameter
    const typeMap = {
      traveler: "traveler",
      agency: "agency",
      retailer: "retailer"
    };
    base44.auth.redirectToLogin(`/dashboard?type=${typeMap[type]}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="w-5 h-5" />
            Login to Your Account
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
            <p className="text-xs text-muted-foreground">
              Enter the email associated with your profile to continue.
            </p>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Checking..." : "Continue"}
            </Button>
          </form>
        )}

        {step === "type" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Continuing with {email}
            </p>
            
            {profileType === "traveler" && (
              <button
                onClick={() => handleTypeSelect("traveler")}
                className="w-full p-4 rounded-lg border border-blue-500 bg-blue-50 transition-all text-left space-y-1 group"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">I'm a Traveler</span>
                </div>
                <p className="text-xs text-muted-foreground">Access your travel credits and bookings</p>
              </button>
            )}

            {profileType === "agency" && (
              <button
                onClick={() => handleTypeSelect("agency")}
                className="w-full p-4 rounded-lg border border-green-500 bg-green-50 transition-all text-left space-y-1 group"
              >
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">I'm a Travel Agency</span>
                </div>
                <p className="text-xs text-muted-foreground">Manage bookings and commissions</p>
              </button>
            )}

            {profileType === "retailer" && (
              <button
                onClick={() => handleTypeSelect("retailer")}
                className="w-full p-4 rounded-lg border border-orange-500 bg-orange-50 transition-all text-left space-y-1 group"
              >
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">I'm an Airport Retailer</span>
                </div>
                <p className="text-xs text-muted-foreground">View transactions and analytics</p>
              </button>
            )}

            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onClick={() => { setStep("email"); setProfileType(null); }}
            >
              Back
            </Button>
          </div>
        )}

        {step === "loading" && (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}