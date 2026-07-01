import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { GLOBAL_AIRPORTS } from "../data/globalAirports";
import {
  Search, MapPin, Plane, CheckCircle2, ArrowRight, Sparkles,
  TrendingUp, Lightbulb, MousePointerClick, Gift, Wand2
} from "lucide-react";

export default function EligibilityShowcase() {
  const [airportQuery, setAirportQuery] = useState("");
  const [airport, setAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [checked, setChecked] = useState(false);

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

  const handleCheck = () => {
    if (airport && departureDate) setChecked(true);
  };

  const reset = () => {
    setChecked(false);
    setAirport("");
    setAirportQuery("");
    setDepartureDate("");
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium border border-amber-200">
            <Lightbulb className="w-4 h-4" />
            The idea with the greatest viral potential
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            Check if you're{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">eligible</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Instead of asking users to generate a DutyCredit immediately, ask them a simple question:
            are you traveling within the next 30 days?
          </p>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-medium">
            Check if you're eligible for a free DutyCredit.
          </p>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <div className="bg-card rounded-3xl border border-border shadow-sm p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-heading font-bold">Try the experience</h2>
              <p className="text-sm text-muted-foreground">See how a traveler discovers their eligibility.</p>
            </div>

            {!checked ? (
              <div className="space-y-5">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Departure airport</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      value={airportQuery || airport}
                      onChange={(e) => { setAirportQuery(e.target.value); setAirport(""); }}
                      placeholder="Search airport, city, or IATA code…"
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
                  <Label className="text-sm font-semibold mb-2 block">Departure date</Label>
                  <Input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <Button
                  onClick={handleCheck}
                  disabled={!airport || !departureDate}
                  size="lg"
                  className="w-full h-14 text-base gap-2"
                >
                  <Wand2 className="w-5 h-5" />
                  Check my eligibility
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-6 py-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-heading font-bold text-green-700">You're eligible!</p>
                  <p className="text-sm text-muted-foreground">
                    Based on your departure from <strong>{airport}</strong> on{" "}
                    <strong>{new Date(departureDate).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</strong>,
                    you qualify for a free DutyCredit.
                  </p>
                </div>
                <Link to="/claim-duty-credit">
                  <Button size="lg" className="w-full h-14 text-base gap-2">
                    <Gift className="w-5 h-5" />
                    Generate your personalized DutyCredit now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Check another trip
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-12 px-4 sm:px-6 bg-card/30 border-y border-border">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            The psychology behind it
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">
            Discovery beats promotion
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            People are much more willing to check whether they're eligible than they are to claim a reward.
            That subtle change in messaging can significantly improve conversion rates — because users feel
            they are <strong className="text-foreground">discovering a benefit</strong> rather than responding
            to a promotional offer.
          </p>
        </div>
      </section>

      {/* Flow */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-heading font-bold">How the flow works</h2>
            <p className="text-muted-foreground">Three steps from curiosity to conversion.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MousePointerClick, title: "Ask, don't push", desc: "Travelers check if they're eligible by entering their departure airport and date." },
              { icon: CheckCircle2, title: "Reveal the benefit", desc: "The system confirms eligibility — the user discovers they qualify for a free DutyCredit." },
              { icon: Gift, title: "Generate on demand", desc: "A clear CTA invites them to generate their personalized DutyCredit, linking to the claim page." },
            ].map((step, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-6 space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-heading font-bold text-primary/40">Step {i + 1}</p>
                <h4 className="font-heading font-semibold">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-8 sm:p-12 text-center text-primary-foreground space-y-5">
          <Sparkles className="w-10 h-10 mx-auto" />
          <h2 className="text-3xl font-heading font-bold">Ready to let travelers discover their benefit?</h2>
          <p className="text-primary-foreground/90 text-lg">A small shift in messaging. A big shift in conversion.</p>
          <Link to="/claim-duty-credit">
            <Button size="lg" variant="secondary" className="gap-2">
              Go to DutyCredit claim <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/"><DutyBoostLogo height={40} /></Link>
          <p>© {new Date().getFullYear()} DutyBoost B.V. — The Travel Retail Conversion Layer</p>
        </div>
      </footer>
    </div>
  );
}