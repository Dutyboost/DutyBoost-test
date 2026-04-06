import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Check, Loader2, AlertCircle } from "lucide-react";

export default function TravelerSignup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Update current user with full name if they're logged in
      const isAuth = await base44.auth.isAuthenticated();
      if (isAuth) {
        await base44.auth.updateMe({ full_name: fullName });
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/traveler-portal");
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-bold">Welcome!</h2>
            <p className="text-muted-foreground">Your account is ready. Redirecting...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-6 flex items-center justify-center">
        <DutyBoostLogo height={90} />
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-heading font-bold">Create Your Account</h1>
            <p className="text-muted-foreground">
              Set up your DutyBoost profile to start earning rewards from your bookings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <p className="text-xs text-muted-foreground">
                This is the email from your travel booking confirmation.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex gap-3 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading || !fullName || !email}
              className="w-full h-11 gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            We'll use this email to match your DutyCredits from your travel bookings.
          </p>
        </div>
      </div>
    </div>
  );
}