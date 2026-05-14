import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function MagicLinkLogin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await base44.functions.invoke("requestMagicLink", { email: trimmed });
      setSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again or contact hello@dutyboost.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <DutyBoostLogo height={90} linkTo="/" />
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-8 space-y-6">
          {!sent ? (
            <>
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-heading font-bold">Sign in to DutyBoost</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your company email address and we'll send you a secure login link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Company email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send login link <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/get-started" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  Apply to join DutyBoost
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-xl font-heading font-bold">Check your email</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                If <strong>{email}</strong> is registered with DutyBoost, you'll receive a login link shortly.
              </p>
              <p className="text-xs text-muted-foreground">
                Didn't receive it?{" "}
                <button
                  onClick={() => { setSent(false); setError(""); }}
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  Try again
                </button>
              </p>
              <p className="text-xs text-muted-foreground">
                Need help?{" "}
                <a href="mailto:hello@dutyboost.com" className="text-primary underline underline-offset-2">
                  hello@dutyboost.com
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}