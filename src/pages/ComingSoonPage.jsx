import { useState } from "react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WeCallYouForm from "../components/WeCallYouForm";
import { CheckCircle2 } from "lucide-react";

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center">
          <DutyBoostLogo height={175} />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden flex-1 flex items-center justify-center px-4 sm:px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold tracking-tight leading-tight">
            Something{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              exciting
            </span>
            {" "}is coming
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're putting the finishing touches on <strong>DutyBoost</strong> — the Travel Retail Conversion Layer that connects travel partners, airport retailers, and leisure travelers like never before. 🎉 <strong>A model where everyone wins!</strong>
          </p>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm max-w-md mx-auto space-y-3">
            <p className="font-heading font-semibold text-lg text-foreground">Want to be the first to know?</p>
            <p className="text-foreground text-sm leading-relaxed font-semibold">
              If you're a travel partner or airport retailer always looking to boost conversions and customer loyalty, we'd love to hear from you.
              <br /><br />
              Reach out via{" "}
              <button onClick={() => { setOpen(true); setSubmitted(false); }} className="text-primary font-bold underline underline-offset-2 hover:text-primary/80 transition-colors">
                our contact form
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-green-500" />
              <h2 className="text-2xl font-heading font-bold">Thank you!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                We've received your details and will be in touch with you soon.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Get in touch</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">Leave your details and we'll reach out to discuss how DutyBoost can work for you.</p>
              <WeCallYouForm onSuccess={handleSuccess} />
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <DutyBoostLogo height={150} />
              <span>The Travel Retail Conversion Layer</span>
            </div>
            <p>© {new Date().getFullYear()} DutyBoost. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}