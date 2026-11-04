import { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GLOBAL_AIRPORTS } from "../data/globalAirports";
import DutyBoostLogo from "../components/DutyBoostLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import {
  Plane, QrCode, Loader2, CheckCircle2, ShieldCheck,
  ShoppingBag, Zap, Clock, AlertCircle, ArrowRight, Sparkles, Wallet
} from "lucide-react";
import AirlineSelector from "../components/claim-duty-credit/AirlineSelector";
import TravelTypeSelector from "../components/claim-duty-credit/TravelTypeSelector";
import LocationPicker from "../components/claim-duty-credit/LocationPicker";
import CarrierPicker from "../components/claim-duty-credit/CarrierPicker";
import { TRAVEL_TYPES } from "../data/travelTypes";
import { CARRIERS_BY_TYPE } from "../data/carriers";
import { getPlacesForCarrier } from "@/data/carrierCoverage";
import { getAirlineFormat } from "../data/airlineFormats";
import { getCurrencyByCountry } from "../data/countryCurrencies";
import { fmtMoney } from "../utils/formatNumber";
import { DUTY_CREDIT_TIERS, MIN_SPEND_EUR } from "../data/dutyCreditTiers";
import ParticipatingStores from "../components/claim-duty-credit/ParticipatingStores";
import PageBackdrop from "../components/PageBackdrop";

export default function ClaimDutyCredit() {
  const { t } = useTranslation();
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref') || '';
  const campaign = urlParams.get('utm_campaign') || '';
  const preselectedAirport = urlParams.get('airport') || '';
  const preselectedDate = urlParams.get('date') || '';

  const [step, setStep] = useState('claim'); // 'claim' | 'details' | 'generating' | 'success' | 'exists'
  const [travelType, setTravelType] = useState('flight');
  const [airport, setAirport] = useState(preselectedAirport || '');
  // The directory location picked, or null for a manually entered stop.
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [returnLocation, setReturnLocation] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [airline, setAirline] = useState('');
  const [departureDate, setDepartureDate] = useState(preselectedDate || '');
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState('');
  const [walletPlatform, setWalletPlatform] = useState('unknown');
  const [walletLoading, setWalletLoading] = useState(false);
  const [airportCode, setAirportCode] = useState('');
  const [airportCountry, setAirportCountry] = useState('');
  const [airportName, setAirportName] = useState('');
  const [airportCity, setAirportCity] = useState('');
  const [participatingStores, setParticipatingStores] = useState([]);
  const [storesLoading, setStoresLoading] = useState(false);
  const [airportLive, setAirportLive] = useState(false);
  const travelConfig = TRAVEL_TYPES.find((t) => t.id === travelType) || TRAVEL_TYPES[0];

  const isPartnerFlow = !!refCode;
  const tr = (key, opts) => t(`claimDutyCredit.${key}`, opts, { returnObjects: false });

  // The carrier is picked first, so its own full directory is offered…
  const carrierOptions = useMemo(() => CARRIERS_BY_TYPE[travelType] || [], [travelType]);
  // Coverage hints order suggestions; the full location directory stays searchable.
  const locationOptions = useMemo(
    () => (travelConfig.options ? getPlacesForCarrier(travelType, airline, travelConfig.options) : null),
    [travelType, airline, travelConfig.options]
  );

  const airlineFormat = useMemo(() => getAirlineFormat(airline), [airline]);
  const flightNumberValid = !!(airlineFormat?.flightPattern && airlineFormat.flightPattern.test(flightNumber));
  const bookingRefValid = !!(airlineFormat?.bookingPattern && airlineFormat.bookingPattern.test(bookingRef));
  const currency = useMemo(() => airportCountry ? getCurrencyByCountry(airportCountry) : "EUR", [airportCountry]);

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

  // Participating stores for the selected airport. Only stores our team has
  // activated for that airport are ever shown to travellers — a store on file
  // that is not activated yet stays hidden.
  const fetchStoresForAirport = async (airportObj) => {
    if (!airportObj) return;
    setStoresLoading(true);
    try {
      const code = airportObj.code.toUpperCase();
      const live = await base44.entities.ParticipatingStore
        .filter({ airport_code: code, activated: true }, 'store_name', 200)
        .catch(() => []);
      setAirportLive(live.length > 0);
      setParticipatingStores(live.map(s => ({
        name: s.store_name,
        category: s.category || '',
        departure_hall: s.departure_hall || '',
      })));
    } catch {
      setAirportLive(false);
      setParticipatingStores([]);
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
        setAirportName(found.name);
        setAirportCity(found.city);
        setSelectedPlace(found);
        fetchStoresForAirport(found);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switching the way of travel clears the details captured for the previous one.
  const handleTravelTypeChange = (id) => {
    if (id === travelType) return;
    setTravelType(id);
    setSelectedPlace(null);
    setAirport('');
    setAirportCode('');
    setAirportCountry('');
    setAirportName('');
    setAirportCity('');
    setParticipatingStores([]);
    setAirportLive(false);
    setAirline('');
    setReturnLocation('');
    setFlightNumber('');
    setBookingRef('');
    setError('');
  };

  // Picking another carrier invalidates the departure point chosen for the
  // previous one, so the location is cleared along with it.
  const handleCarrierChange = (value) => {
    setAirline(value);
    setReturnLocation('');
    setSelectedPlace(null);
    setAirport('');
    setAirportCode('');
    setAirportCountry('');
    setAirportName('');
    setAirportCity('');
    setParticipatingStores([]);
    setAirportLive(false);
    setError('');
  };

  // A hub picked from a list arrives as an object; a typed location
  // (pickup point, city, hotel area) arrives as a plain string.
  const handleLocationSelect = (place) => {
    if (typeof place === 'string') {
      setAirport(place);
      setSelectedPlace(null);
      setAirportCode('');
      setAirportCountry('');
      setAirportName('');
      setAirportCity('');
      setParticipatingStores([]);
      setAirportLive(false);
      return;
    }
    setSelectedPlace(place);
    if (travelType === 'flight') setAirport(`${place.code} — ${place.city}`);
    else if (travelType === 'car_rental' && place.city) setAirport(`${place.name}, ${place.city}`);
    else setAirport(place.name);
    if (travelType === 'flight') {
      setAirportCode(place.code);
      setAirportCountry(place.country);
      setAirportName(place.name);
      setAirportCity(place.city);
      fetchStoresForAirport(place);
    }
  };

  const handleReturnSelect = (place) => {
    if (typeof place === 'string') {
      setReturnLocation(place);
      return;
    }
    setReturnLocation(place.city ? `${place.name}, ${place.city}` : place.name);
  };

  const handleClaim = async () => {
    if (!airport || !airline || !bookingRef || !departureDate) {
      setError(tr('error_missing_fields'));
      return;
    }
    if (travelType === 'car_rental' && !returnLocation) {
      setError(tr('error_missing_fields'));
      return;
    }
    if (travelType === 'flight' && !flightNumber) {
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
        travel_type: travelType,
        airport,
        return_location: travelType === 'car_rental' ? (returnLocation || undefined) : undefined,
        airline: airline || undefined,
        departure_date: departureDate || undefined,
        ref: refCode || undefined,
        traveler_email: travelerEmail || undefined,
        flight_number: travelType === 'flight' ? (flightNumber || undefined) : undefined,
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
    <div className="min-h-screen font-body relative">
      <PageBackdrop />
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <DutyBoostLogo height={45} linkTo={null} />
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
              <p className="text-base sm:text-lg font-medium text-foreground max-w-lg mx-auto">
                {tr('definition')}
              </p>
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

            {/* How are you travelling? */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
              <TravelTypeSelector value={travelType} onChange={handleTravelTypeChange} />

              <div className="space-y-4 pt-2 border-t border-border">
                {travelType === 'flight' ? (
                  <AirlineSelector
                    value={airline}
                    onChange={handleCarrierChange}
                    label={tr('verticals.flight.carrier_label')}
                    placeholder={tr('verticals.flight.carrier_placeholder')}
                    noResultsText={tr('airline_no_results')}
                  />
                ) : (
                  <CarrierPicker
                    options={carrierOptions}
                    value={airline}
                    onChange={handleCarrierChange}
                    label={tr(`verticals.${travelType}.carrier_label`)}
                    placeholder={tr(`verticals.${travelType}.carrier_placeholder`)}
                  />
                )}

                <LocationPicker
                  options={locationOptions}
                  value={airport}
                  onSelect={handleLocationSelect}
                  label={tr(`verticals.${travelType}.location_label`)}
                  placeholder={tr(`verticals.${travelType}.location_placeholder`)}
                  noResultsText={tr(`verticals.${travelType}.location_no_results`)}
                />

                {travelType === 'car_rental' && (
                  <LocationPicker
                    options={locationOptions}
                    value={returnLocation}
                    onSelect={handleReturnSelect}
                    label={tr('verticals.car_rental.return_label')}
                    placeholder={tr('verticals.car_rental.return_placeholder')}
                    noResultsText={tr('verticals.car_rental.location_no_results')}
                  />
                )}
              </div>

              <div className="space-y-4 pt-2 border-t border-border">
                {travelType === 'flight' && (
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">{tr('verticals.flight.ref_label')}</Label>
                    <Input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                      placeholder={airlineFormat?.flightExample || tr('verticals.flight.ref_placeholder')}
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
                )}

                <div>
                  <Label className="text-sm font-medium mb-1.5 block">
                    {travelType === 'flight' ? tr('booking_ref_label') : tr(`verticals.${travelType}.ref_label`)}
                  </Label>
                  <Input
                    type="text"
                    value={bookingRef}
                    onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
                    placeholder={
                      travelType === 'flight'
                        ? (airlineFormat?.bookingExample || tr('booking_ref_placeholder'))
                        : tr(`verticals.${travelType}.ref_placeholder`)
                    }
                    className="font-mono"
                  />
                  {travelType === 'flight' && airlineFormat && (
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
                  <Label className="text-sm font-medium mb-1.5 block">
                    {travelType === 'flight' ? tr('departure_date_label') : tr(`verticals.${travelType}.date_label`)}
                  </Label>
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

              <Button
                onClick={handleClaim}
                disabled={!airport || !airline || !bookingRef || !departureDate || (travelType === 'car_rental' && !returnLocation) || (travelType === 'flight' && (!flightNumber || !flightNumberValid || !bookingRefValid)) || (isPartnerFlow && !travelerEmail)}
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
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {tr(`verticals.${generated.travel_type || travelType}.location_short`)}
                    </p>
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

            {/* Region availability disclaimer */}
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 print:hidden">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">{tr('region_disclaimer')}</p>
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
                    <span className={`font-bold ${tier.color}`}>{tier.max ? `${fmtTier(tier.discountMin)} – ${fmtTier(tier.discount)}` : fmtTier(tier.discount)} {tr('tier_off')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Participating stores at this airport — only stores our team has activated */}
            {travelType === 'flight' && (
              <ParticipatingStores
                stores={participatingStores}
                loading={storesLoading}
                airportName={airportName}
                airportCity={airportCity}
              />
            )}

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
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => { setStep('claim'); setGenerated(null); setError(''); }}
              >
                {tr('btn_check_another')} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <DutyBoostLogo height={40} linkTo={null} />
          <p dangerouslySetInnerHTML={{ __html: tr('footer', { year: new Date().getFullYear() }) }} />
        </div>
      </footer>
    </div>
  );
}