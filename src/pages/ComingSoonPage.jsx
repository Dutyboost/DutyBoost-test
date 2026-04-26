import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WeCallYouForm from "../components/WeCallYouForm";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ComingSoonPage() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSuccess = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <DutyBoostLogo height={160} />
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-24 relative">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3 h-3" /> For Travel Partners &amp; Airport Retailers
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
            Something new is coming{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              to the travel industry.
            </span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We're working on something that changes how the travel industry creates value — for everyone involved. We're not ready to share details yet, but we're looking for the right people to hear about it first.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">2 minutes · No strings attached.</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/travel-partner-survey">
              <Button size="lg" className="gap-2 text-base">
                Share your opinion <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-base"
              onClick={() => { setOpen(true); setSubmitted(false); }}
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={130} />
          <p>© {new Date().getFullYear()} DutyBoost B.V. All rights reserved.</p>
        </div>
      </footer>

      {/* Contact Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-green-500" />
              <h2 className="text-2xl font-heading font-bold">Thank you!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                We've received your details and will be in touch soon.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Get in touch</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">Leave your details and we'll reach out when the time is right.</p>
              <WeCallYouForm onSuccess={handleSuccess} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}