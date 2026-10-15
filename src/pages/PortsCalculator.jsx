import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Anchor, ArrowRight, TrendingUp, Wallet, CalendarDays, Info } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShowcaseMobileNav from "@/components/ShowcaseMobileNav";
import { getPortsStrings } from "@/lib/i18nPorts";

const CONCESSION_RATE = 0.15;
const fmtEUR = (n) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function PortsCalculator() {
  const { i18n } = useTranslation();
  const c = getPortsStrings(i18n.language).calculator;

  const [passengersStr, setPassengersStr] = useState("500000");
  const [basketStr, setBasketStr] = useState("60");
  const [upliftStr, setUpliftStr] = useState("1");
  const passengers = Number(passengersStr) || 0;
  const basket = Number(basketStr) || 0;
  const uplift = Number(upliftStr) || 0;

  const perTx = useMemo(() => basket * CONCESSION_RATE, [basket]);
  const incrementalTxns = useMemo(() => Math.round(passengers * (uplift / 100)), [passengers, uplift]);
  const annual = useMemo(() => Math.round(incrementalTxns * perTx), [incrementalTxns, perTx]);
  const monthly = Math.round(annual / 12);

  return (
    <div className="min-h-screen bg-background font-body">
      <ShowcaseMobileNav calculatorTo="/ports-showcase" gradient="linear-gradient(to bottom, #2563eb, #4338ca)" />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/ports-showcase">
              <Button variant="outline" size="sm" className="gap-1.5 text-indigo-600 border-indigo-600 hover:text-indigo-700 hover:bg-blue-50">
                <Anchor className="w-4 h-4 shrink-0" /> {c.aboutBtn}
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <section className="pt-10 pb-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
            <Anchor className="w-3.5 h-3.5" /> {c.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">{c.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{c.subtitle}</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-14">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-7">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{c.labelPassengers}</label>
                <Input
                  type="number"
                  min={0}
                  value={passengersStr}
                  onChange={(e) => setPassengersStr(e.target.value)}
                  className="w-32 text-right"
                />
              </div>
              <Slider value={[passengers]} min={10000} max={20000000} step={10000} onValueChange={(v) => setPassengersStr(String(v[0]))} />
              <p className="text-xs text-muted-foreground">{c.descPassengers}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{c.labelBasket}</label>
                <Input
                  type="number"
                  min={0}
                  value={basketStr}
                  onChange={(e) => setBasketStr(e.target.value)}
                  className="w-32 text-right"
                />
              </div>
              <Slider value={[basket]} min={20} max={500} step={5} onValueChange={(v) => setBasketStr(String(v[0]))} />
              <p className="text-xs text-muted-foreground">{c.descBasket}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{c.labelUplift}</label>
                <span className="text-sm font-semibold text-indigo-700">{uplift}%</span>
              </div>
              <Slider value={[uplift]} min={0.5} max={5} step={0.5} onValueChange={(v) => setUpliftStr(String(v[0]))} />
              <p className="text-xs text-muted-foreground">{c.descUplift}</p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-7 text-white shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Wallet className="w-4 h-4" /> {c.resultAnnual}
              </div>
              <div className="text-4xl sm:text-5xl font-heading font-bold">{fmtEUR(annual)}</div>
              <p className="text-white/80 text-sm">{c.resultAnnualDesc}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5 space-y-1">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <div className="text-2xl font-heading font-bold">{fmtEUR(monthly)}</div>
                <p className="text-xs text-muted-foreground">{c.perMonth}</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 space-y-1">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <div className="text-2xl font-heading font-bold">{fmtEUR(perTx)}</div>
                <p className="text-xs text-muted-foreground">{c.perTransaction}</p>
              </div>
            </div>

            <div className="bg-muted/40 border border-border rounded-2xl p-5 space-y-2 text-sm">
              <p className="font-semibold text-foreground">{c.howTitle}</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>• {c.how1}</li>
                <li>• {c.how2}</li>
                <li>• {c.how3}</li>
              </ul>
            </div>

            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 leading-relaxed">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>{c.magNote}</p>
            </div>

            <Link to="/ports-partner-request">
              <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700" size="lg">
                {c.cta} <ArrowRight className="w-4 h-4 shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={42} />
          <p>© {new Date().getFullYear()} DutyBoost B.V. — {c.footer}</p>
        </div>
      </footer>
    </div>
  );
}