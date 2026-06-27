import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GLOBAL_AIRPORTS } from "../data/globalAirports";
import DutyBoostLogo from "../components/DutyBoostLogo";
import {
  Search, MapPin, Plane, QrCode, Loader2, CheckCircle2, ShieldCheck,
  ShoppingBag, Zap, Clock, AlertCircle, ArrowRight, Sparkles, Store
} from "lucide-react";

export default function ClaimDutyCredit() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref') || '';
  const campaign = urlParams.get('utm_campaign') || '';
  const preselectedAirport = urlParams.get('airport') || '';

  const [step, setStep] = useState('claim'); // 'claim' | 'details' | 'generating' | 'success' | 'exists'
  const [airport, setAirport] = useState(preselectedAirport || '');
  const [airportQuery, setAirportQuery] = useState('');
  const [airportOpen, setAirportOpen] = useState(false);
  const [travelerEmail, setTravelerEmail] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState('');
  const airportRef = useRef(null);

  const isPartnerFlow = !!refCode;

  // Airport search
  const filteredAirports = useMemo(() => {
    const q = airportQuery.trim().toLowerCase();
    if (!q) return GLOBAL_AIRPORTS.slice(0, 8);
    return GLOBAL_AIRPORTS.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [airportQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (airportRef.current && !airportRef.current.contains(e.target)) {
        setAirportOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAirportSelect = (a) => {
    setAirport(`${a.code} — ${a.city}`);
    setAirportQuery('');
    setAirportOpen(false);
  };

  const handleClaim = async () => {
    if (!airport) return;
    setError('');

    // Partner flow requires email + flight number for duplicate check
    if (isPartnerFlow && (!travelerEmail || !flightNumber)) {
      setError('Please provide your flight number and email so we can check for existing credits.');
      return;
    }

    setStep('generating');
    try {
      const response = await base44.functions.invoke('generatePublicDutyCredit', {
        airport,
        ref: refCode || undefined,
        traveler_email: travelerEmail || undefined,
        flight_number: flightNumber || undefined,
        campaign_source: campaign || undefined,
      });

      const data = response.data;

      if (data.already_exists) {
        setGenerated(data);
        setStep('exists');
        return;
      }

      setGenerated(data);
      setStep('success');
    } catch (err) {
      setError('Something went wrong generating your DutyCredit. Please try again.');
      setStep('claim');
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={45} /></Link>
          <Link to="/get-started">
            <Button size="sm" variant="outline" className="text-primary border-primary hover:text-primary/80">
              Partner With Us
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* ── CLAIM STEP ── */}
        {step === 'claim' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4" />
                Zero-friction activation
              </div>
              <h1 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight leading-tight">
                Flying today or soon?
              </h1>
              <p className="text-xl text-muted-foreground">
                Claim your <span className="text-primary font-semibold">DutyCredit</span> in seconds.
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                No account. No registration. No boarding pass upload. Just one click and your live airport shopping credit is ready.
              </p>
            </div>

            {/* Partner banner */}
            {isPartnerFlow && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
                <Plane className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">You arrived via {refCode}</p>
                  <p className="text-xs text-blue-700">Your travel partner will share the commission on your airport purchase.</p>
                </div>
              </div>
            )}

            {/* Airport selector */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
              <div>
                <Label className="text-sm font-semibold mb-2 block">Select your departure airport</Label>
                <div ref={airportRef} className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      value={airportOpen ? airportQuery : airport}
                      onChange={(e) => {
                        setAirportQuery(e.target.value);
                        setAirport('');
                        setAirportOpen(true);
                      }}
                      onFocus={() => { setAirportOpen(true); setAirportQuery(''); }}
                      placeholder="Search airport, city, or IATA code…"
                      className="pl-10 h-12 text-base"
                    />
                    {airport && !airportOpen && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {airportOpen && (
                    <div className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-border rounded-xl shadow-lg">
                      {filteredAirports.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-muted-foreground text-center">No airports found</div>
                      ) : (
                        filteredAirports.map((a) => (
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
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Partner flow: email + flight number for duplicate check */}
              {isPartnerFlow && (
                <div className="space-y-4 pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Your travel partner sent you here. We just need your flight number and email to check if you already have a DutyCredit for this trip.
                  </p>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Flight number</Label>
                    <Input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                      placeholder="e.g. KL1024, IB6012"
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Email address</Label>
                    <Input
                      type="email"
                      value={travelerEmail}
                      onChange={(e) => setTravelerEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button
                onClick={handleClaim}
                disabled={!airport}
                size="lg"
                className="w-full h-14 text-base gap-2"
              >
                <QrCode className="w-5 h-5" />
                Claim My DutyCredit
              </Button>
            </div>

            {/* How it works */}
            <div className="space-y-4">
              <h2 className="text-lg font-heading font-bold text-center">How it works</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl border border-border p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">1. One click</p>
                  <p className="text-xs text-muted-foreground">Select your airport and claim. No sign-up needed.</p>
                </div>
                <div className="bg-card rounded-xl border border-border p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                    <QrCode className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">2. Get your QR</p>
                  <p className="text-xs text-muted-foreground">A live, single-use DutyCredit QR is generated instantly.</p>
                </div>
                <div className="bg-card rounded-xl border border-border p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">3. Shop & save</p>
                  <p className="text-xs text-muted-foreground">Show the QR at any participating airport retailer.</p>
                </div>
              </div>
            </div>

            {/* Why no verification */}
            <div className="bg-muted/50 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h2 className="text-base font-heading font-bold">Why don't we verify your flight?</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Because a DutyCredit has no intrinsic value on its own. It only becomes valuable when you walk into a
                participating airport retailer, make a qualifying purchase, and redeem it. Someone who isn't traveling
                gains nothing by generating a QR — they'd still need to physically go to the airport and spend money.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                So instead of adding friction for you, we put the security where it matters: at the moment of redemption,
                when the retailer scans your QR code.
              </p>
            </div>
          </div>
        )}

        {/* ── GENERATING STEP ── */}
        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-lg font-medium text-muted-foreground">Generating your DutyCredit…</p>
          </div>
        )}

        {/* ── SUCCESS STEP ── */}
        {step === 'success' && generated && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                DutyCredit Active
              </div>
              <h1 className="text-3xl font-heading font-bold">Your DutyCredit is ready!</h1>
              <p className="text-muted-foreground">Show this QR code at any participating retailer at <strong>{generated.airport}</strong>.</p>
            </div>

            {/* QR Card */}
            <div className="bg-white border-2 border-primary rounded-2xl overflow-hidden">
              <div className="bg-primary text-primary-foreground px-6 py-4 text-center">
                <p className="text-xs uppercase tracking-widest opacity-80">DutyBoost DutyCredit</p>
                <p className="text-lg font-bold font-mono mt-1">{generated.token_id}</p>
              </div>
              <div className="p-6 flex flex-col items-center gap-4">
                <img
                  src={generated.qr_image_url}
                  alt="DutyCredit QR Code"
                  className="w-64 h-64 rounded-xl border border-border"
                />
                <div className="w-full grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">Airport</p>
                    <p className="font-semibold truncate">{generated.airport}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">Status</p>
                    <p className="font-semibold text-green-600">Active</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">Valid until</p>
                    <p className="font-semibold">{new Date(generated.expiry).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">Brought to you by</p>
                    <p className="font-semibold truncate">{generated.commission_partner}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Single-use. Valid for 30 days. Minimum spend €70 at a participating retailer.
                </p>
              </div>
            </div>

            {/* Discount tiers */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
              <p className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Your savings at the airport store
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Boarding Credit · €70–€99 spend</span>
                  <span className="font-bold text-primary">€5–€10 off</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Priority Credit · €100–€199 spend</span>
                  <span className="font-bold text-primary">€10–€30 off</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Lounge Credit · €200–€299 spend</span>
                  <span className="font-bold text-primary">€30–€60 off</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>VIP Credit · €300+ spend</span>
                  <span className="font-bold text-green-600">€60 off</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => window.print()} variant="outline" className="flex-1 gap-2">
                <QrCode className="w-4 h-4" /> Print / Screenshot
              </Button>
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  Back to Home <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* ── ALREADY EXISTS STEP ── */}
        {step === 'exists' && generated && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100">
                <AlertCircle className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-3xl font-heading font-bold">You already have a DutyCredit</h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                A DutyCredit was already issued for your flight <strong>{flightNumber}</strong>.
                You can only receive one DutyCredit per flight, so we haven't issued a second one.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-semibold">Your existing DutyCredit</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Token ID</p>
                  <p className="font-mono font-semibold">{generated.existing_token_id}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Airport</p>
                  <p className="font-semibold truncate">{generated.airport}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Check your email or your travel partner's booking confirmation for your original DutyCredit QR code.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  Back to Home <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/"><DutyBoostLogo height={40} /></Link>
          <p>© {new Date().getFullYear()} DutyBoost B.V. — The Travel Retail Conversion Layer</p>
        </div>
      </footer>
    </div>
  );
}