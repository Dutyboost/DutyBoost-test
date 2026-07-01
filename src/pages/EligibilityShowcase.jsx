import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { GLOBAL_AIRPORTS } from "../data/globalAirports";
import {
  Search, MapPin, Plane, CheckCircle2, ArrowRight, Sparkles,
  MousePointerClick, Gift, Wand2, AlertCircle
} from "lucide-react";

export default function EligibilityShowcase() {
  const { t } = useTranslation();
  const tr = (key, opts) => t(`eligibility.${key}`, opts, { returnObjects: false });
  const [airportQuery, setAirportQuery] = useState("");
  const [airport, setAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [checked, setChecked] = useState(false);
  const [dateError, setDateError] = useState("");

  const isPastDate = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr) < today;
  };

  const filteredAirports = (() => {
    const q = airportQuery.trim().toLowerCase();
    if (!q) return GLOBAL_AIRPORTS.slice(0, 6);
    return GLOBAL_AIRPORTS.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
    ).slice(0, 6);
  })();

  const handleAirportSelect = (a) => {
    setAirport(`${a.code} — ${a.city}`);
    setAirportQuery("");
  };

  const handleDateChange = (e) => {
    setDepartureDate(e.target.value);
    setDateError("");
  };

  const handleCheck = () => {
    if (!airport || !departureDate) return;
    if (isPastDate(departureDate)) {
      setDateError(tr('date_past_error'));
      return;
    }
    setChecked(true);
  };

  const reset = () => {
    setChecked(false);
    setAirport("");
    setAirportQuery("");
    setDepartureDate("");
    setDateError("");
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={45} /></Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-10 px-4 sm:px-6">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium border border-blue-200">
            <Plane className="w-4 h-4" />
            {tr('hero_badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            {tr('hero_title_pre')}{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{tr('hero_title_highlight')}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {tr('hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <div className="bg-card rounded-3xl border border-border shadow-sm p-6 sm:p-8 space-y-6">
            {!checked ? (
              <div className="space-y-5">
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-heading font-bold">{tr('check_title')}</h2>
                  <p className="text-sm text-muted-foreground">{tr('check_subtitle')}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">{tr('airport_label')}</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      value={airportQuery || airport}
                      onChange={(e) => { setAirportQuery(e.target.value); setAirport(""); }}
                      placeholder={tr('airport_placeholder')}
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                  {airportQuery && (
                    <div className="mt-1 max-h-48 overflow-y-auto bg-white border border-border rounded-xl shadow-lg">
                      {filteredAirports.map((a) => (
                        <button
                          key={a.code}
                          onClick={() => handleAirportSelect(a)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0"
                        >
                          <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{a.city} — {a.name}</p>
                            <p className="text-xs text-muted-foreground">{a.country}</p>
                          </div>
                          <span className="text-sm font-bold text-primary shrink-0">{a.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">{tr('date_label')}</Label>
                  <Input
                    type="date"
                    value={departureDate}
                    onChange={handleDateChange}
                    className="h-12 text-base"
                  />
                  {dateError && (
                    <div className="mt-2 flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{dateError}</span>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleCheck}
                  disabled={!airport || !departureDate}
                  size="lg"
                  className="w-full h-14 text-base gap-2"
                >
                  <Wand2 className="w-5 h-5" />
                  {tr('btn_check')}
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-6 py-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-heading font-bold text-green-700">{tr('eligible_title')}</p>
                  <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: tr('eligible_desc', { airport, date: new Date(departureDate).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) }) }} />
                </div>
                <Link to="/claim-duty-credit">
                  <Button size="lg" className="w-full h-14 text-base gap-2">
                    <Gift className="w-5 h-5" />
                    {tr('btn_generate')}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {tr('check_another')}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why it's free */}
      <section className="py-12 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Gift className="w-4 h-4" />
            {tr('free_badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">
            {tr('free_title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {tr('free_desc')}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-8 sm:p-12 text-center text-primary-foreground space-y-5">
          <Sparkles className="w-10 h-10 mx-auto" />
          <h2 className="text-3xl font-heading font-bold">{tr('cta_title')}</h2>
          <p className="text-primary-foreground/90 text-lg">{tr('cta_desc')}</p>
          <Link to="/claim-duty-credit">
            <Button size="lg" variant="secondary" className="gap-2">
              {tr('cta_btn')} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/"><DutyBoostLogo height={40} /></Link>
          <p>{tr('footer', { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}