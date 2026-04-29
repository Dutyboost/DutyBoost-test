import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Anchor, Gift, QrCode, TrendingUp } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import PageFooter from "../components/PageFooter";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Anchor, title: "Cruise Line Integration", desc: "Connect your cruise line to DutyBoost and enable DutyCredits for passengers." },
  { icon: Gift, title: "Passengers Earn Credits", desc: "Passengers receive DutyCredits upon booking, valid at participating port retailers." },
  { icon: QrCode, title: "Redeem at Port Stores", desc: "Passengers scan their QR code at port-of-call retailers to redeem credits." },
  { icon: TrendingUp, title: "Earn Commission", desc: "Your cruise line earns a commission on every redemption made by your passengers." },
];

export default function CruiseShowcase() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/get-started">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </Link>
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={150} />
          </button>
          <LanguageSwitcher />
        </div>
      </nav>

      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl sm:text-6xl font-heading font-bold">
            Cruise & Port <span className="text-primary">Retail Solution</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Boost passenger spending at port destinations and earn commission on every redemption — at zero upfront cost.
          </p>
        </div>

        <div className="space-y-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-heading font-bold">How It Works</h2>
              <p className="text-muted-foreground">
                DutyBoost connects cruise lines with port retailers, enabling passengers to earn and spend DutyCredits during shore excursions. Cruise lines earn a commission on every redemption while passengers enjoy exclusive port discounts.
              </p>
            </div>
            <div className="grid gap-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="bg-card border border-border rounded-xl p-6 flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 text-white text-center space-y-6">
            <h2 className="text-3xl font-heading font-bold">Ready to enhance your port experience?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join DutyBoost and start turning port calls into a new revenue stream for your cruise line.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 gap-2"
              onClick={() => navigate("/cruise-portal")}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
      <PageFooter />
    </div>
  );
}