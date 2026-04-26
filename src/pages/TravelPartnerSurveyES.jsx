import { useState } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, Lightbulb, MessageSquare, FlaskConical } from "lucide-react";

const TOTAL_QUESTIONS = 7;

const SNIPPET_OPTIONS = [
  "Sí – un simple snippet en nuestra página de confirmación parece muy factible",
  "Posiblemente – depende de lo sencilla que sea la integración",
  "Poco probable – nuestra configuración técnica lo dificulta",
  "No – no controlamos nuestra página de confirmación de reserva",
];

const COMPANY_TYPES = ["Agencia de viajes", "Aerolínea", "Operador turístico", "OTA (Agencia de viajes online)", "Hotel", "Alquiler de coches"];
const BOOKING_VOLUMES = ["Menos de 500", "500 – 2.000", "2.000 – 10.000", "10.000+"];
const LOYALTY_OPTIONS = ["Ninguno", "Puntos / Millas", "Descuentos", "Ventajas de socios", "Otro"];
const INTEREST_OPTIONS = [
  "Muy interesado – me uniría a un programa piloto",
  "Interesado – quiero saber más primero",
  "Curioso – todavía evaluando el modelo",
  "Aún no estoy seguro",
];
const COMMISSION_OPTIONS = [
  "Sí, muy atractivo",
  "Algo atractivo",
  "Necesito más detalles",
  "No es una prioridad",
];

function OptionButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
        selected
          ? "bg-primary text-primary-foreground border-primary shadow-md"
          : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

export default function TravelPartnerSurveyES() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    company_name: "",
    company_type: "",
    annual_bookings: "",
    current_loyalty: "",
    biggest_challenge: "",
    interest_level: "",
    commission_attractive: "",
    snippet_willingness: "",
    wants_demo: false,
    phone: "",
    loyalty_other: "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canNext = () => {
    if (step === 0) return form.company_type !== "";
    if (step === 1) return form.annual_bookings !== "";
    if (step === 2) return form.current_loyalty !== "";
    if (step === 3) return form.interest_level !== "";
    if (step === 4) return form.commission_attractive !== "";
    if (step === 5) return form.snippet_willingness !== "";
    if (step === 6) return form.company_name.trim() !== "";
    return true;
  };

  const handleSubmit = async () => {
    setSaving(true);
    await base44.entities.SurveyResponse.create(form);
    setSubmitted(true);
    setSaving(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h1 className="text-3xl font-heading font-bold">¡Gracias{form.full_name ? `, ${form.full_name.split(" ")[0]}` : ""}!</h1>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Tu opinión honesta es exactamente lo que necesitamos para decidir si DutyBoost vale la pena construirlo.
          {form.wants_demo && " Nos pondremos en contacto pronto para organizar una breve conversación."}
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 max-w-sm text-left">
          <p className="text-sm font-semibold text-amber-800">¿Qué hacemos con tu opinión?</p>
          <ul className="mt-3 space-y-2 text-sm text-amber-700 list-none">
            <li>📋 Agregamos respuestas de toda la industria</li>
            <li>🔍 Analizamos si el modelo tiene interés real en el sector</li>
            <li>{form.wants_demo ? "📞 Te contactaremos para agendar una conversación" : "📬 Te informaremos sobre lo que decidamos hacer"}</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs">Aún no existe ningún producto — si suficientes socios del sector validan este concepto, seguiremos adelante. Serás de los primeros en saberlo.</p>
        <p className="text-xs text-muted-foreground">© 2026 DutyBoost. All Rights Reserved.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <DutyBoostLogo height={160} />
        </div>
      </nav>

      {step === 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 relative">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <FlaskConical className="w-3 h-3" /> Validación del modelo · Solo para socios de viaje
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-tight max-w-3xl">
              Una nueva fuente de ingresos para socios de viaje —{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                queremos saber si es para ti
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              <strong>DutyBoost</strong> permite a los socios de viaje acceder a una nueva fuente de ingresos. Estamos validando si hay interés real en el sector — y tu opinión determina directamente lo que construimos.
            </p>

            <p className="mt-8 text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              5 preguntas rápidas — tus respuestas determinan directamente si lo construimos.
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Pregunta {step + 1} de {TOTAL_QUESTIONS}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }} />
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">¿Qué tipo de empresa de viajes eres?</h2>
              <p className="text-muted-foreground text-sm">Esto nos ayuda a entender qué socios de viaje se beneficiarían más de DutyBoost.</p>
              <div className="space-y-2">{COMPANY_TYPES.map((t) => <OptionButton key={t} label={t} selected={form.company_type === t} onClick={() => set("company_type", t)} />)}</div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">¿Cuántas reservas procesas al mes?</h2>
              <p className="text-muted-foreground text-sm">Esto nos ayuda a estimar la oportunidad de ingresos potencial para ti según tu volumen de reservas.</p>
              <div className="space-y-2">{BOOKING_VOLUMES.map((v) => <OptionButton key={v} label={v} selected={form.annual_bookings === v} onClick={() => set("annual_bookings", v)} />)}</div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">¿Cuál es tu enfoque actual para la fidelización de viajeros?</h2>
              <p className="text-muted-foreground text-sm">Exploramos si una fuente adicional de ingresos a través de DutyBoost es atractiva junto a tu estrategia de fidelización actual.</p>
              <div className="space-y-2">{LOYALTY_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.current_loyalty === o} onClick={() => set("current_loyalty", o)} />)}</div>
              {form.current_loyalty === "Otro" && (
                <div className="space-y-2 pt-1">
                  <label className="text-sm font-medium">Por favor, explica</label>
                  <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={3} placeholder="¿Cómo gestionas actualmente la fidelización de viajeros?" value={form.loyalty_other || ""} onChange={(e) => set("loyalty_other", e.target.value)} />
                </div>
              )}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium">¿Cuál es tu mayor reto con la fidelización de clientes?</label>
                <textarea className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={3} placeholder="ej. bajas tasas de reservas repetidas, alto coste de los programas de recompensas..." value={form.biggest_challenge} onChange={(e) => set("biggest_challenge", e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">¿Qué te parece este modelo?</h2>
              <p className="text-muted-foreground text-sm">DutyBoost da a los socios de viaje acceso a una nueva fuente de ingresos. ¿Cuál es tu reacción inicial?</p>
              <div className="space-y-2">{INTEREST_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.interest_level === o} onClick={() => set("interest_level", o)} />)}</div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">DutyBoost da a tu negocio acceso a una nueva fuente de ingresos. ¿Qué tan atractiva te parece esta idea para tu negocio?</h2>
              <div className="space-y-2">{COMMISSION_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.commission_attractive === o} onClick={() => set("commission_attractive", o)} />)}</div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">DutyBoost se integra con tu flujo de reservas existente mediante un sencillo paso técnico. ¿Qué tan abierto estás a añadir una pequeña integración a tu proceso de confirmación de reserva?</h2>
              <p className="text-muted-foreground text-sm">No se necesitan cambios complejos — solo una adición ligera a tu flujo de confirmación existente.</p>
              <div className="space-y-2">{SNIPPET_OPTIONS.map((o) => <OptionButton key={o} label={o} selected={form.snippet_willingness === o} onClick={() => set("snippet_willingness", o)} />)}</div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">Última pregunta — ¿quién eres?</h2>
              <p className="text-muted-foreground text-sm">Si estás interesado en una nueva fuente de ingresos pasiva pero interesante, deja tus datos de contacto y nos pondremos en contacto cuando lancemos.</p>
              <div className="space-y-3">
                <Input placeholder="Nombre completo" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
                <Input placeholder="Correo electrónico de trabajo" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                <Input placeholder="Nombre de la empresa *" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
                <Input placeholder="Teléfono" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer group pt-2">
                <input type="checkbox" checked={form.wants_demo} onChange={(e) => set("wants_demo", e.target.checked)} className="mt-0.5 accent-primary w-4 h-4 cursor-pointer" />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  <strong>Sí, me gustaría que DutyBoost me contactara</strong> — me encantaría participar en el Piloto cuando se lance.
                </span>
              </label>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && <Button variant="outline" onClick={() => goToStep(step - 1)} className="flex-1">Atrás</Button>}
            {step < TOTAL_QUESTIONS - 1 ? (
              <Button className="flex-1 gap-2" disabled={!canNext()} onClick={() => goToStep(step + 1)}>
                Continuar <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button className="flex-1 gap-2" disabled={!canNext() || saving} onClick={handleSubmit}>
                {saving ? "Enviando..." : "Enviar mi opinión"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Sin spam. Sin discurso de ventas. Solo validación honesta del mercado — tu opinión influye directamente en si construimos esto.
          </p>
        </div>
      </div>

      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <DutyBoostLogo height={130} />
          <p>© {new Date().getFullYear()} DutyBoost B.V. · The Travel Retail Conversion Layer</p>
        </div>
      </footer>
    </div>
  );
}