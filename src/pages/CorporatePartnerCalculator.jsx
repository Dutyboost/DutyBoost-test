import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Building2, ArrowRight, TrendingUp, Wallet, CalendarDays } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShowcaseMobileNav from "@/components/ShowcaseMobileNav";

const fmtEUR = (n) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function CorporatePartnerCalculator() {
  const { t } = useTranslation();
  const [tripsStr, setTripsStr] = useState("10000");
  const [basketStr, setBasketStr] = useState("60");
  const [rateStr, setRateStr] = useState("100");
  const trips = Number(tripsStr) || 0;
  const basket = Number(basketStr) || 0;
  const rate = Number(rateStr) || 0;

  const perTx = useMemo(() => Math.min(basket * 0.005, 5), [basket]);
  const annual = useMemo(() => Math.round(trips * (rate / 100) * perTx), [trips, rate, perTx]);
  const monthly = Math.round(annual / 12);

  return (
    <div className="min-h-screen bg-background font-body">
      <ShowcaseMobileNav calculatorTo="/corporate-partner-showcase" gradient="linear-gradient(to bottom, #64748b, #334155)" />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/corporate-partner-showcase">
              <Button variant="outline" size="sm" className="gap-1.5 text-slate-600 border-slate-600 hover:text-slate-700 hover:bg-slate-50">
                <Building2 className="w-4 h-4 shrink-0" /> {t("corporate.calculator.aboutBtn")}
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <section className="pt-10 pb-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-slate-500/10 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" /> {t("corporate.calculator.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">{t("corporate.calculator.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("corporate.calculator.subtitle")}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-14">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-7">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{t("corporate.calculator.labelTrips")}</label>
                <Input
                  type="number"
                  min={0}
                  value={tripsStr}
                  onChange={(e) => setTripsStr(e.target.value)}
                  className="w-32 text-right"
                />
              </div>
              <Slider value={[trips]} min={0} max={200000} step={500} onValueChange={(v) => setTripsStr(String(v[0]))} />
              <p className="text-xs text-muted-foreground">{t("corporate.calculator.descTrips")}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{t("corporate.calculator.labelBasket")}</label>
                <Input
                  type="number"
                  min={0}
                  value={basketStr}
                  onChange={(e) => setBasketStr(e.target.value)}
                  className="w-32 text-right"
                />
              </div>
              <Slider value={[basket]} min={20} max={500} step={5} onValueChange={(v) => setBasketStr(String(v[0]))} />
              <p className="text-xs text-muted-foreground">{t("corporate.calculator.descBasket")}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{t("corporate.calculator.labelRate")}</label>
                <span className="text-sm font-semibold text-slate-700">{rate}%</span>
              </div>
              <Slider value={[rate]} min={25} max={100} step={5} onValueChange={(v) => setRateStr(String(v[0]))} />
              <p className="text-xs text-muted-foreground">{t("corporate.calculator.descRate")}</p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl p-7 text-white shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Wallet className="w-4 h-4" /> {t("corporate.calculator.resultAnnual")}
              </div>
              <div className="text-4xl sm:text-5xl font-heading font-bold">{fmtEUR(annual)}</div>
              <p className="text-white/80 text-sm">{t("corporate.calculator.resultAnnualDesc")}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5 space-y-1">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <div className="text-2xl font-heading font-bold">{fmtEUR(monthly)}</div>
                <p className="text-xs text-muted-foreground">{t("corporate.calculator.perMonth")}</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 space-y-1">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <div className="text-2xl font-heading font-bold">{fmtEUR(perTx)}</div>
                <p className="text-xs text-muted-foreground">{t("corporate.calculator.perRedemption")}</p>
              </div>
            </div>

            <div className="bg-muted/40 border border-border rounded-2xl p-5 space-y-2 text-sm">
              <p className="font-semibold text-foreground">{t("corporate.calculator.howTitle")}</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>• {t("corporate.calculator.how1")}</li>
                <li>• {t("corporate.calculator.how2")}</li>
                <li>• {t("corporate.calculator.how3")}</li>
              </ul>
            </div>

            <Link to="/corporate-partner-showcase">
              <Button className="w-full gap-2" size="lg">
                {t("corporate.calculator.cta")} <ArrowRight className="w-4 h-4 shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={42} />
          <p>© {new Date().getFullYear()} DutyBoost B.V. — {t("corporate.calculator.footer")}</p>
        </div>
      </footer>
    </div>
  );
}