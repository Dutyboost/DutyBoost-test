import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight } from "lucide-react";

const TOTAL_QUESTIONS = 7;

const STORE_TYPES = [
  "Perfumes & cosméticos",
  "Electrónica & gadgets",
  "Chocolate, confitería & quesos",
  "Regalos & souvenirs",
  "Licores & vinos",
  "Relojes & joyería",
  "Lujo",
  "Moda & accesorios",
  "Artículos de viaje",
  "Libros & revistas",
  "Niños & juguetes",
  "Farmacia",
  "Comida & bebida",
];
const MONTHLY_VISITORS = ["Menos de 1.000", "1.000 – 5.000", "5.000 – 20.000", "20.000+"];
const CURRENT_PROMOS = ["Ninguna", "Tarjeta de fidelidad / sello", "Descuentos en app", "Promociones del aeropuerto", "Otro"];
const INTEREST_OPTIONS = [
  "Muy interesado – cuenten conmigo",
  "Interesado – quiero saber más primero",
  "Curioso – todavía evaluando",
  "No estoy seguro aún",
];
const VOUCHER_OPTIONS = [
  "Sí, muy atractivo – más tráfico siempre es bienvenido",
  "Algo atractivo – depende de las condiciones",
  "Necesito más detalles antes de decidir",
  "No es una prioridad ahora mismo",
];
const INTEGRATION_OPTIONS = [
  "Sí – las integraciones sencillas no son problema para nosotros",
  "Posiblemente – depende de lo que se necesite técnicamente",
  "Poco probable – nuestra configuración lo dificulta",
  "No – no gestionamos nuestra propia tecnología",
];

function OptionButton({ label, selected, onClick, onSelect }) {
  return (
    <button type="button" onClick={() => { onClick(); onSelect?.(); }}
      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${selected ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"}`}>
      {label}
    </button>
  );
}

export default function AirportRetailerSurveyES() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [websiteError, setWebsiteError] = useState("");
  const [websiteValid, setWebsiteValid] = useState(false);
  const [verifyingWebsite, setVerifyingWebsite] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [anonymous, setAnonymous] = useState(null);

  const [form, setForm] = useState({
    full_name: "", email: "", company_name: "", company_website: "", company_type: "",
    annual_bookings: "", current_loyalty: [], biggest_challenge: "",
    interest_level: "", commission_attractive: "", snippet_willingness: "",
    wants_demo: false, phone: "", loyalty_other: "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handlePromoToggle = (option) => {
    const exclusiveOptions = ["Ninguna", "Otro"];
    const isExclusive = exclusiveOptions.includes(option);
    const hasExclusive = form.current_loyalty.some(o => exclusiveOptions.includes(o));
    const hasRegular = form.current_loyalty.some(o => !exclusiveOptions.includes(o));
    if (form.current_loyalty.includes(option)) {
      setForm((f) => ({ ...f, current_loyalty: f.current_loyalty.filter(o => o !== option) }));
    } else {
      if (isExclusive && hasRegular) return;
      if (!isExclusive && hasExclusive) return;
      setForm((f) => ({ ...f, current_loyalty: [...f.current_loyalty, option] }));
    }
  };

  const PERSONAL_DOMAINS = [
    'gmail.com', 'hotmail.com', 'hotmail.nl', 'hotmail.de', 'hotmail.fr', 'hotmail.es', 'hotmail.it',
    'outlook.com', 'outlook.nl', 'outlook.de', 'outlook.fr', 'outlook.es', 'outlook.it',
    'yahoo.com', 'yahoo.nl', 'yahoo.de', 'yahoo.fr', 'yahoo.es', 'yahoo.it', 'yahoo.co.uk',
    'aol.com', 'me.com', 'icloud.com', 'mac.com',
    'mail.com', 'protonmail.com', 'proton.me',
    'yandex.com', 'yandex.ru', 'mail.ru',
    'gmx.de', 'gmx.com', 'gmx.net', 'gmx.at', 'gmx.ch',
    'web.de', 'free.fr', 'sfr.fr', 'orange.fr', 'laposte.net',
    'live.com', 'live.nl', 'live.de', 'live.fr', 'live.es', 'live.it',
    'msn.com', 'qq.com', '163.com', '126.com',
    'libero.it', 'virgilio.it', 'tin.it', 'alice.it',
    'wanadoo.fr', 'bbox.fr', 'tiscali.it', 'tiscali.fr',
    't-online.de', 'freenet.de', 'arcor.de',
    'ziggo.nl', 'kpnmail.nl', 'planet.nl', 'home.nl', 'xs4all.nl', 'hetnet.nl',
    'telefonica.es',
  ];

  const isPersonalEmail = (email) => {
    const domain = email.split('@')[1]?.toLowerCase();
    return PERSONAL_DOMAINS.includes(domain);
  };

  const getWebsiteDomain = (website) => {
    try {
      const url = website.trim().startsWith('http') ? website.trim() : 'https://' + website.trim();
      return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
    } catch { return ''; }
  };

  const doDomainsMatch = (email, website) => {
    const emailDomain = email.split('@')[1]?.toLowerCase() || '';
    const websiteDomain = getWebsiteDomain(website);
    if (!emailDomain || !websiteDomain) return true;
    return emailDomain === websiteDomain || emailDomain.endsWith('.' + websiteDomain) || websiteDomain.endsWith('.' + emailDomain);
  };

  const checkDomainExists = async (val) => {
    const trimmed = val.trim();
    if (!trimmed) return false;
    try {
      const url = trimmed.startsWith("http") ? trimmed : "https://" + trimmed;
      const hostname = new URL(url).hostname;
      if (!hostname.includes(".")) return false;
      const res = await fetch(`https://dns.google/resolve?name=${hostname}&type=A`);
      const data = await res.json();
      if (data.Status !== 0 || !Array.isArray(data.Answer)) return false;
      return data.Answer.some(r => r.type === 1);
    } catch { return false; }
  };

  const handleWebsiteBlur = async () => {
    const val = form.company_website;
    if (!val) return;
    setVerifyingWebsite(true);
    setWebsiteError("");
    const exists = await checkDomainExists(val);
    setVerifyingWebsite(false);
    if (!exists) {
      setWebsiteValid(false);
      setWebsiteError("No pudimos verificar este sitio web. Ingresa un sitio web real (p. ej. www.sutienda.es).");
    } else {
      setWebsiteValid(true);
      setWebsiteError("");
      if (form.email && !isPersonalEmail(form.email) && !doDomainsMatch(form.email, val)) {
        setEmailError("El dominio de tu correo no coincide con el sitio web de tu empresa. Por favor usa tu correo corporativo.");
      } else if (form.email && !isPersonalEmail(form.email)) {
        setEmailError("");
      }
    }
  };

  const goToStep = (n) => { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const canNext = () => {
    if (step === 0) return form.company_type !== "";
    if (step === 1) return form.annual_bookings !== "";
    if (step === 2) return form.current_loyalty.length > 0;
    if (step === 3) return form.interest_level !== "";
    if (step === 4) return form.commission_attractive !== "";
    if (step === 5) return form.snippet_willingness !== "";
    if (step === 6) {
      if (anonymous === null) return false;
      if (anonymous) return form.company_name && websiteValid && !verifyingWebsite;
      return form.full_name && form.email && form.company_name && websiteValid && !verifyingWebsite && !emailError;
    }
    return true;
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const { loyalty_other, ...rest } = form;
      await base44.entities.SurveyResponse.create({
        ...rest,
        company_type: "Airport Retailer – " + rest.company_type,
        current_loyalty: rest.current_loyalty.join(", "),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h1 className="text-3xl font-heading font-bold">¡Gracias{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""}!</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          {form.wants_demo ? "Su opinión es muy valiosa. Nos pondremos en contacto pronto." : "Su opinión es muy valiosa. Esté atento para nuestro lanzamiento."}
        </p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DutyBoost. All Rights Reserved.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center"><DutyBoostLogo height={55} /></div>
      </nav>

      {step === 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              Estamos validando una nueva forma para que los comercios aeroportuarios impulsen sus ventas.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Su opinión nos importa.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Aún no estamos listos para compartir todos los detalles — pero queremos saber si hay interés genuino antes de seguir adelante.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">2 minutos · 7 preguntas · Sin compromiso.</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground"><span>Pregunta {step + 1} de {TOTAL_QUESTIONS}</span></div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }} />
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">¿Qué tipo de tienda opera usted en el aeropuerto?</h2>
              <div className="space-y-2">{STORE_TYPES.map((t) => <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} onSelect={() => goToStep(1)} />)}</div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">¿Cuántos clientes visitan su tienda al mes (aproximadamente)?</h2>
              <div className="space-y-2">{MONTHLY_VISITORS.map((v) => <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} onSelect={() => goToStep(2)} />)}</div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">¿Realiza usted actualmente promociones o programas de fidelización para atraer clientes en el aeropuerto?</h2>
              <p className="text-sm text-muted-foreground">Selecciona todo lo que aplique</p>
              <div className="space-y-2">
                {CURRENT_PROMOS.map((o) => {
                  const isSelected = form.current_loyalty.includes(o);
                  const isExclusive = o === "Ninguna" || o === "Otro";
                  const hasExclusive = form.current_loyalty.some(opt => ["Ninguna", "Otro"].includes(opt));
                  const hasRegular = form.current_loyalty.some(opt => !["Ninguna", "Otro"].includes(opt));
                  const disabled = isExclusive ? hasRegular : hasExclusive;
                  return (
                    <button key={o} onClick={() => handlePromoToggle(o)} disabled={disabled && !isSelected}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${disabled && !isSelected ? "opacity-40 cursor-not-allowed bg-muted" : isSelected ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground cursor-pointer"}`}>
                      <input type="checkbox" checked={isSelected} onChange={() => {}} className="w-4 h-4" disabled={disabled && !isSelected} />
                      {o}
                    </button>
                  );
                })}
              </div>
              {form.current_loyalty.includes("Otro") && (
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={2} placeholder="Describe brevemente..." value={form.loyalty_other || ""} onChange={(e) => set("loyalty_other", e.target.value)} />
              )}
              <div className="space-y-2 pt-1">
                <label className="text-sm text-muted-foreground">¿Cuál es su mayor reto para atraer clientes en el aeropuerto? (opcional)</label>
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={2} placeholder="Opcional..." value={form.biggest_challenge} onChange={(e) => set("biggest_challenge", e.target.value)} />
              </div>
              <Button className="w-full gap-2 mt-4" onClick={() => goToStep(3)}>Continuar <ArrowRight className="w-4 h-4" /></Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Si una plataforma pudiera enviar viajeros pre-calificados con cupones directamente a su tienda sin coste inicial, ¿cuánto le interesaría?</h2>
              <div className="space-y-2">{INTEREST_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} onSelect={() => goToStep(4)} />)}</div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">¿Qué tan atractivo le resulta un modelo donde solo se paga una pequeña comisión cuando un cupón es realmente canjeado en su tienda?</h2>
              <div className="space-y-2">{VOUCHER_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} onSelect={() => goToStep(5)} />)}</div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">¿Qué tan abierto está usted a un sencillo proceso de canje basado en QR en su punto de venta?</h2>
              <div className="space-y-2">{INTEGRATION_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} onSelect={() => goToStep(6)} />)}</div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-heading font-bold">Último paso — ¿Cómo desea responder?</h2>
              <p className="text-muted-foreground text-sm">Puede compartir sus datos de contacto para que podamos hacer seguimiento, o responder de forma anónima. En cualquier caso, su opinión es valiosa.</p>

              <div className="grid grid-cols-1 gap-3">
                <button type="button" onClick={() => setAnonymous(false)}
                  className={`w-full text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all ${anonymous === false ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"}`}>
                  <div className="font-semibold">Compartir mis datos de contacto</div>
                  <div className={`text-xs mt-0.5 ${anonymous === false ? "text-primary-foreground/80" : "text-muted-foreground"}`}>Me gustaría mantenerme informado y ser contactado cuando DutyBoost lance.</div>
                </button>
                <button type="button" onClick={() => setAnonymous(true)}
                  className={`w-full text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all ${anonymous === true ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"}`}>
                  <div className="font-semibold">Responder anónimamente</div>
                  <div className={`text-xs mt-0.5 ${anonymous === true ? "text-primary-foreground/80" : "text-muted-foreground"}`}>Solo quiero compartir el nombre de mi empresa y el sitio web. Sin datos personales.</div>
                </button>
              </div>

              {anonymous !== null && (
                <div className="space-y-3 pt-1">
                  <Input placeholder="Nombre de la tienda / empresa *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                  <div>
                    <Input placeholder="Sitio web de la empresa * (p. ej. www.sutienda.es)" value={form.company_website}
                      onChange={(e) => { set("company_website", e.target.value); setWebsiteValid(false); setWebsiteError(""); }}
                      onBlur={handleWebsiteBlur}
                      className={websiteError ? "border-destructive" : websiteValid ? "border-green-500" : ""} />
                    {verifyingWebsite && <p className="text-xs text-muted-foreground mt-1">Verificando sitio web...</p>}
                    {websiteError && <p className="text-xs text-destructive mt-1">{websiteError}</p>}
                    {websiteValid && !verifyingWebsite && <p className="text-xs text-green-600 mt-1">✓ Sitio web verificado</p>}
                  </div>

                  {anonymous === false && (
                    <>
                      <Input placeholder="Nombre completo *" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                      <div>
                        <Input placeholder="Correo de trabajo *" type="email" value={form.email}
                          onChange={(e) => {
                            set("email", e.target.value);
                            if (e.target.value && isPersonalEmail(e.target.value)) {
                              setEmailError("Por favor utilice un correo electrónico profesional de empresa");
                            } else if (e.target.value && form.company_website && websiteValid && !doDomainsMatch(e.target.value, form.company_website)) {
                              setEmailError("El dominio de tu correo no coincide con el sitio web de tu empresa. Por favor usa tu correo corporativo.");
                            } else { setEmailError(""); }
                          }}
                          className={emailError ? "border-destructive" : ""} />
                        {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
                      </div>
                      <Input placeholder="Teléfono (opcional)" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                      <label className="flex items-start gap-3 cursor-pointer group pt-1">
                        <input type="checkbox" checked={form.wants_demo} onChange={(e) => set("wants_demo", e.target.checked)} className="mt-0.5 accent-primary w-4 h-4 cursor-pointer" />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          <strong>Sí, me gustaría ser contactado</strong> cuando DutyBoost esté listo para compartir más detalles.
                        </span>
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">Atrás</Button>}
            {step === TOTAL_QUESTIONS - 1 && (
              <Button className="flex-1 gap-2" disabled={!canNext() || saving} onClick={handleSubmit}>
                {saving ? "Enviando..." : "Enviar"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
          <p className="text-center text-xs text-muted-foreground">Sin spam. Sin discurso de ventas.</p>
        </div>
      </div>

      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={55} />
          <p>© {new Date().getFullYear()} DutyBoost</p>
        </div>
      </footer>
    </div>
  );
}