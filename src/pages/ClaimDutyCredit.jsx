import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GLOBAL_AIRPORTS } from "../data/globalAirports";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import {
  Search, MapPin, Plane, QrCode, Loader2, CheckCircle2, ShieldCheck,
  ShoppingBag, Zap, Clock, AlertCircle, ArrowRight, Sparkles, Wallet, Store
} from "lucide-react";
import AirlineSelector from "../components/claim-duty-credit/AirlineSelector";
import { getAirlineFormat } from "../data/airlineFormats";
import { getCurrencyByCountry } from "../data/countryCurrencies";
import { fmtMoney } from "../utils/formatNumber";
import { DUTY_CREDIT_TIERS, MIN_SPEND_EUR } from "../data/dutyCreditTiers";
import { buildParticipatingStores } from "../data/participatingStores";

export default function ClaimDutyCredit() {
  const { t } = useTranslation();
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
  const [bookingRef, setBookingRef] = useState('');
  const [airline, setAirline] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState('');
  const [walletPlatform, setWalletPlatform] = useState('unknown');
  const [walletLoading, setWalletLoading] = useState(false);
  const [airportCode, setAirportCode] = useState('');
  const [airportCountry, setAirportCountry] = useState('');
  const [participatingStores, setParticipatingStores] = useState([]);
  const [storesLoading, setStoresLoading] = useState(false);
  const [airportLive, setAirportLive] = useState(false);
  const airportRef = useRef(null);

  const isPartnerFlow = !!refCode;
  const tr = (key, opts) => t(`claimDutyCredit.${key}`, opts, { returnObjects: false });

  const airlineFormat = useMemo(() => getAirlineFormat(airline), [airline]);
  const flightNumberValid = !!(airlineFormat?.flightPattern && airlineFormat.flightPattern.test(flightNumber));
  const bookingRefValid = !!(airlineFormat?.bookingPattern && airlineFormat.bookingPattern.test(bookingRef));
  const currency = useMemo(() => airportCountry ? getCurrencyByCountry(airportCountry) : "EUR", [airportCountry]);

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

  useEffect(() => {
    const ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/i.test(ua)) setWalletPlatform('ios');
    else if (/Android/i.test(ua)) setWalletPlatform('android');
  }, []);

  // Resolve currency-aware tier formatting (e.g. €2,50 / Afl. 5)
  const fmtTier = (eur) => {
    const decimals = currency === "AWG" ? 0 : (eur % 1 !== 0 ? 2 : 0);
    return fmtMoney(eur, currency, decimals);
  };

  // Fetch participating stores for the selected airport from the database,
  // supplemented by a curated brand pool so every airport shows 5–20 stores.
  const fetchStoresForAirport = async (airportObj) => {
    if (!airportObj) return;
    setStoresLoading(true);
    try {
      const all = await base44.entities.Retailer.list(200);
      const code = airportObj.code.toUpperCase();
      const dbMatches = all.filter(r => {
        const ap = (r.airport || '').toUpperCase();
        return ap === code || ap.startsWith(code + ' ') || ap.startsWith(code + '-') || ap.includes(code + ' —') || ap.includes(code + ' -');
      });
      setAirportLive(dbMatches.length > 0);
      setParticipatingStores(buildParticipatingStores(code, airportObj.city, dbMatches));
    } catch {
      setAirportLive(false);
      setParticipatingStores(buildParticipatingStores(airportObj.code, airportObj.city, []));
    } finally {
      setStoresLoading(false);
    }
  };

  // Pre-selected airport via ?airport= query param
  useEffect(() => {
    if (preselectedAirport) {
      const found = GLOBAL_AIRPORTS.find(a => a.code.toLowerCase() === preselectedAirport.toLowerCase());
      if (found) {
        setAirport(`${found.code} — ${found.city}`);
        setAirportCode(found.code);
        setAirportCountry(found.country);
        fetchStoresForAirport(found);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAirportSelect = (a) => {
    setAirport(`${a.code} — ${a.city}`);
    setAirportCode(a.code);
    setAirportCountry(a.country);
    setAirportQuery('');
    setAirportOpen(false);
    fetchStoresForAirport(a);
  };

  const handleClaim = async () => {
    if (!airport || !airline || !bookingRef || !departureDate || !flightNumber) {
      setError(tr('error_missing_fields'));
      return;
    }
    setError('');

    // Partner flow requires email for duplicate check
    if (isPartnerFlow && !travelerEmail) {
      setError(tr('error_missing_fields'));
      return;
    }

    setStep('generating');
    try {
      const response = await base44.functions.invoke('generatePublicDutyCredit', {
        airport,
        airline: airline || undefined,
        departure_date: departureDate || undefined,
        ref: refCode || undefined,
        traveler_email: travelerEmail || undefined,
        flight_number: flightNumber || undefined,
        partner_booking_ref: bookingRef || undefined,
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
      setError(tr('error_generic'));
      setStep('claim');
    }
  };

  const handleAddToWallet = async (platform) => {
    if (!generated?.token_id) return;
    setWalletLoading(platform);
    try {
      const response = await base44.functions.invoke('generateWalletPass', {
        token_id: generated.token_id,
        platform,
      });
      const data = response.data;
      if (data.save_url) {
        window.location.href = data.save_url;
      } else if (data.pkpass_url) {
        window.location.href = data.pkpass_url;
      }
    } catch (err) {
      setError(tr('error_generic'));
    } finally {
      setWalletLoading(null);
    }
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

      {/* Main */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 print:py-4 print:px-4">
        {/* ── CLAIM STEP ── */}
        {step === 'claim' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4" />
                {tr('badge')}
              </div>
              <h1 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight leading-tight">
                {tr('title')}
              </h1>
              <p className="text-xl text-muted-foreground" dangerouslySetInnerHTML={{ __html: tr('subtitle') }} />
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {tr('description')}
              </p>
            </div>

            {/* Partner banner */}
            {isPartnerFlow && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
                <Plane className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">{tr('partner_banner_title', { ref: refCode })}</p>
                  <p className="text-xs text-blue-700">{tr('partner_banner_desc')}</p>
                </div>
              </div>
            )}

            {/* Airport selector */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
              <div>
                <Label className="text-sm font-semibold mb-2 block">{tr('airport_label')}</Label>
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
                      placeholder={tr('airport_placeholder')}
                      className="pl-10 h-12 text-base"
                    />
                    {airport && !airportOpen && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {airportOpen && (
                    <div className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-border rounded-xl shadow-lg">
                      {filteredAirports.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-muted-foreground text-center">{tr('airport_no_results')}</div>
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

              {/* Always visible: airline, flight number, booking ref, departure date */}
              <div className="space-y-4 pt-2 border-t border-border">
                <AirlineSelector
                  value={airline}
                  onChange={setAirline}
                  label={tr('airline_label')}
                  placeholder={tr('airline_placeholder')}
                  noResultsText={tr('airline_no_results')}
                />
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">{tr('flight_number_label')}</Label>
                  <Input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                    placeholder={airlineFormat?.flightExample || tr('flight_number_placeholder')}
                    className="font-mono"
                  />
                  {airlineFormat && (
                    <div className="flex items-center gap-1.5 mt-1 text-xs">
                      {flightNumberValid ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      )}
                      <span className={flightNumberValid ? "text-green-600" : "text-muted-foreground"}>
                        {airlineFormat.flightHint} · e.g. {airlineFormat.flightExample}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">{tr('booking_ref_label')}</Label>
                  <Input
                    type="text"
                    value={bookingRef}
                    onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
                    placeholder={airlineFormat?.bookingExample || tr('booking_ref_placeholder')}
                    className="font-mono"
                  />
                  {airlineFormat && (
                    <div className="flex items-center gap-1.5 mt-1 text-xs">
                      {bookingRefValid ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      )}
                      <span className={bookingRefValid ? "text-green-600" : "text-muted-foreground"}>
                        e.g. {airlineFormat.bookingExample} · {airlineFormat.bookingHint}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">{tr('departure_date_label')}</Label>
                  <Input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Partner flow: email for duplicate check */}
              {isPartnerFlow && (
                <div className="space-y-4 pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {tr('partner_flow_text')}
                  </p>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">{tr('email_label')}</Label>
                    <Input
                      type="email"
                      value={travelerEmail}
                      onChange={(e) => setTravelerEmail(e.target.value)}
                      placeholder={tr('email_placeholder')}
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

              {airport && !storesLoading && !airportLive && (
                <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{tr('airport_not_live_note')}</span>
                </div>
              )}

              <Button
                onClick={handleClaim}
                disabled={!airport || !airline || !bookingRef || !departureDate || !flightNumber || !flightNumberValid || !bookingRefValid || (isPartnerFlow && !travelerEmail)}
                size="lg"
                className="w-full h-14 text-base gap-2"
              >
                <QrCode className="w-5 h-5" />
                {tr('btn_claim')}
              </Button>
            </div>

            {/* How it works */}
            <div className="space-y-4">
              <h2 className="text-lg font-heading font-bold text-center">{tr('how_it_works')}</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl border border-border p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{tr('step1_title')}</p>
                  <p className="text-xs text-muted-foreground">{tr('step1_desc')}</p>
                </div>
                <div className="bg-card rounded-xl border border-border p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                    <QrCode className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{tr('step2_title')}</p>
                  <p className="text-xs text-muted-foreground">{tr('step2_desc')}</p>
                </div>
                <div className="bg-card rounded-xl border border-border p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{tr('step3_title')}</p>
                  <p className="text-xs text-muted-foreground">{tr('step3_desc')}</p>
                </div>
              </div>
            </div>

            {/* Why no verification */}
            <div className="bg-muted/50 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h2 className="text-base font-heading font-bold">{tr('why_no_verify_title')}</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tr('why_no_verify_p1')}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tr('why_no_verify_p2')}
              </p>
            </div>
          </div>
        )}

        {/* ── GENERATING STEP ── */}
        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-lg font-medium text-muted-foreground">{tr('generating')}</p>
          </div>
        )}

        {/* ── SUCCESS STEP ── */}
        {step === 'success' && generated && (
          <div className="space-y-6 print:space-y-3">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                {tr('success_badge')}
              </div>
              <h1 className="text-3xl font-heading font-bold">{tr('success_title')}</h1>
              <p className="text-muted-foreground">{tr('success_desc')} <strong>{generated.airport}</strong>.</p>
            </div>

            {/* QR Card */}
            <div className="bg-white border-2 border-primary rounded-2xl overflow-hidden">
              <div className="bg-primary text-primary-foreground px-6 py-4 text-center">
                <p className="text-xs uppercase tracking-widest opacity-80">{tr('qr_card_label')}</p>
                <p className="text-lg font-bold font-mono mt-1">{generated.token_id}</p>
              </div>
              <div className="p-6 flex flex-col items-center gap-4 print:p-3 print:gap-2">
                <img
                  src={generated.qr_image_url}
                  alt="DutyCredit QR Code"
                  className="w-44 h-44 rounded-xl border border-border print:w-36 print:h-36"
                />
                <div className="w-full grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">{tr('qr_airport')}</p>
                    <p className="font-semibold truncate">{generated.airport}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">{tr('qr_status')}</p>
                    <p className="font-semibold text-green-600">{tr('qr_status_active')}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">{tr('qr_valid_until')}</p>
                    <p className="font-semibold">{new Date(generated.expiry).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">{tr('qr_brought_by')}</p>
                    <p className="font-semibold truncate">{generated.commission_partner}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {tr('qr_disclaimer', { minSpend: fmtMoney(MIN_SPEND_EUR, currency) })}
                </p>
              </div>
            </div>

            {/* Discount tiers */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-3 print:p-3 print:space-y-1">
              <p className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {tr('savings_title')}
              </p>
              <div className="space-y-2 text-sm">
                {DUTY_CREDIT_TIERS.map((tier, idx) => (
                  <div key={tier.name} className={`flex justify-between items-center py-2 ${idx < DUTY_CREDIT_TIERS.length - 1 ? 'border-b border-border' : ''}`}>
                    <span>{tier.name} · {tier.max ? `${fmtTier(tier.min)}–${fmtTier(tier.max)}` : `${fmtTier(tier.min)}+`} {tr('tier_spend')}</span>
                    <span className={`font-bold ${tier.color}`}>{fmtTier(tier.discount)} {tr('tier_off')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Participating stores at this airport */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-3 print:p-3 print:space-y-1">
              <p className="text-sm font-semibold flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-primary" />
                {tr('stores_title')}
              </p>
              {storesLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> {tr('generating')}
                </div>
              ) : participatingStores.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {participatingStores.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm py-1.5 px-2.5 rounded-lg bg-muted/40">
                      <Store className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="font-medium truncate">{s.name}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 print:hidden">
              <Button onClick={() => window.print()} variant="outline" className="flex-1 gap-2">
                <QrCode className="w-4 h-4" /> {tr('btn_print')}
              </Button>
              <Button onClick={() => handleAddToWallet('ios')} disabled={!!walletLoading} className="flex-1 gap-2">
                {walletLoading === 'ios' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
                Add to Apple Wallet
              </Button>
              <Button onClick={() => handleAddToWallet('android')} disabled={!!walletLoading} className="flex-1 gap-2">
                {walletLoading === 'android' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
                Add to Google Wallet
              </Button>
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
              <h1 className="text-3xl font-heading font-bold">{tr('exists_title')}</h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto" dangerouslySetInnerHTML={{ __html: tr('exists_desc', { flight: flightNumber }) }} />
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-semibold">{tr('existing_credit_title')}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">{tr('token_id')}</p>
                  <p className="font-mono font-semibold">{generated.existing_token_id}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">{tr('qr_airport')}</p>
                  <p className="font-semibold truncate">{generated.airport}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {tr('existing_hint')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  {tr('btn_home')} <ArrowRight className="w-4 h-4" />
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
          <p dangerouslySetInnerHTML={{ __html: tr('footer', { year: new Date().getFullYear() }) }} />
        </div>
      </footer>
    </div>
  );
}