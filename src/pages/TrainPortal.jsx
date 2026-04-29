import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Train, QrCode, TrendingUp, MapPin, BarChart3, Zap } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import PageFooter from "../components/PageFooter";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Train, title: "Multi-Operator Support", desc: "Manage DutyCredits across your entire route network from one dashboard." },
  { icon: QrCode, title: "Seamless QR Redemption", desc: "Passengers redeem credits with a simple scan at participating station retailers." },
  { icon: TrendingUp, title: "Commission Earnings", desc: "Earn a revenue share on every redemption — zero infrastructure cost." },
  { icon: MapPin, title: "Station Network Access", desc: "Access DutyBoost's growing network of verified station retail partners across Europe." },
  { icon: BarChart3, title: "Route Analytics", desc: "See which routes and stations drive the most spend, conversion, and revenue." },
  { icon: Zap, title: "OTA Webhook Integration", desc: "Auto-generate DutyCredits from Trainline, NS, SNCF, and DB booking confirmations." },
];

const phases = [];

export default function TrainPortal() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/train-showcase">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t('train.back')}
            </button>
          </Link>
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={150} />
          </button>
          <LanguageSwitcher />
        </div>
      </nav>

      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-heading font-bold">
            {t('train.portal_title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('train.portal_subtitle')}
          </p>
          <Button size="lg" className="gap-2 px-8 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => navigate("/train-signup")}>
            {t('train.apply')} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-card border border-border rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-heading font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-12 text-white text-center space-y-6">
          <h2 className="text-3xl font-heading font-bold">Ready to get started?</h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Apply now and our team will get your rail operator set up within days.
          </p>
          <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 gap-2" onClick={() => navigate("/train-signup")}>
            {t('train.apply')} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
      <PageFooter />
    </div>
  );
}