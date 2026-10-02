import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, FileText, ChevronDown, ChevronUp, Loader2, Download } from "lucide-react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import MutualNdaDocument from "@/components/MutualNdaDocument";
import { downloadMutualNdaPdf } from "@/utils/exportMutualNdaPdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CountrySelect from "@/components/request/CountrySelect";
import { COUNTRIES, usesPostalCode, postalCodeLabel } from "@/data/countryPostalCodes";

const today = () => new Date().toISOString().slice(0, 10);

// No example text in the fields — a placeholder that fits one country is wrong for the rest.
// The postal code field only appears for countries that actually use one, and takes that
// country's own name for it (Postcode, ZIP Code, Eircode, …).
const FIELDS = [
  { key: "party_company_name", label: "Company Name", required: true },
  { key: "party_registration_number", label: "Chamber of Commerce / Registration Number", required: true },
  { key: "party_street", label: "Street + Number", required: true, wide: true },
  { key: "party_city", label: "City", required: true },
  { key: "party_country", label: "Country", required: true, type: "country" },
  { key: "party_postal_code", label: "Postal Code", required: true, type: "postal" },
  { key: "party_representative_name", label: "Representative Full Name", required: true },
  { key: "party_representative_title", label: "Representative Title", required: true },
  { key: "party_email", label: "Representative Email", required: true, type: "email" },
  { key: "party_website", label: "Company Website", required: true },
  { key: "effective_date", label: "Effective Date", required: true, type: "date" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const uploadSignature = async (dataUrl, filename) => {
  if (!dataUrl) return "";
  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], filename, { type: "image/png" });
  const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
  return file_uri;
};

export default function MutualNda() {
  const [form, setForm] = useState({
    party_company_name: "",
    party_registration_number: "",
    party_street: "",
    party_postal_code: "",
    party_city: "",
    party_country: "",
    party_representative_name: "",
    party_representative_title: "",
    party_email: "",
    party_website: "",
    effective_date: today(),
  });
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [ndaOpen, setNdaOpen] = useState(false);
  const [signature, setSignature] = useState("");
  const [dbSignature, setDbSignature] = useState("");
  const [downloading, setDownloading] = useState(false);

  const handleChange = (key, value) => {
    setForm(f => {
      const next = { ...f, [key]: value };
      // A country without postal codes leaves no stale postal code behind
      if (key === "party_country" && !usesPostalCode(value)) next.party_postal_code = "";
      return next;
    });
    if (errors[key]) setErrors(e => ({ ...e, [key]: false }));
  };

  const validate = () => {
    const next = {};
    FIELDS.filter(f => f.required)
      // The postal code is only asked for where the country uses one
      .filter(f => !(f.key === "party_postal_code" && !usesPostalCode(form.party_country)))
      .forEach(f => {
        if (!form[f.key]?.trim()) next[f.key] = true;
      });
    if (form.party_email?.trim() && !EMAIL_RE.test(form.party_email.trim())) {
      next.party_email = true;
    }
    if (!signature) {
      next.signature = true;
      setNdaOpen(true);
    }
    if (!accepted) next.accepted = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const website = form.party_website?.trim();
    const signatureUri = await uploadSignature(signature, `mutual-nda-signature-${Date.now()}.png`);
    const dutyboostSignatureUri = await uploadSignature(dbSignature, `mutual-nda-signature-dutyboost-${Date.now()}.png`);
    await base44.entities.MutualNda.create({
      ...form,
      signature_file_uri: signatureUri,
      dutyboost_signature_file_uri: dutyboostSignatureUri,
      party_website: website && !website.startsWith("http") ? `https://${website}` : website,
      signed: true,
      signed_date: new Date().toISOString(),
      status: "pending",
      language: "en",
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadMutualNdaPdf({ party: form, counterpartySignature: signature, dutyboostSignature: dbSignature });
    } finally {
      setDownloading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-heading font-bold text-foreground">Thank you</h1>
            <p className="text-muted-foreground">
              Thank you, {form.party_representative_name?.split(" ")[0] || "there"}. The signed Mutual Non-Disclosure
              Agreement has been received on behalf of {form.party_company_name}. Download your copy below to keep it
              for your records.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">Your executed copy</p>
            <p className="text-sm text-muted-foreground">
              Download the agreement with both signatures as submitted.
            </p>
            <Button onClick={handleDownload} disabled={downloading} className="w-full h-12 text-base font-semibold">
              {downloading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Preparing PDF…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </span>
              )}
            </Button>
          </div>
          <Link to="/" className="inline-block">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/"><DutyBoostLogo height={55} /></Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-heading font-bold text-foreground">Mutual Non-Disclosure Agreement</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 max-w-2xl mx-auto space-y-3 text-left">
            <p className="text-sm text-blue-800 leading-relaxed">
              Before exchanging commercial, technical or partner information, the parties formalise their mutual
              confidentiality commitments in a single agreement that protects both sides equally.
            </p>
            <p className="text-sm text-blue-800 leading-relaxed">
              Complete the details below, review the live preview of the agreement, and confirm acceptance. A
              countersigned copy is issued for your records.
            </p>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            All information you provide is treated as confidential and used solely for the purpose of preparing this
            agreement.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <h2 className="font-heading font-semibold text-lg text-foreground">Your Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FIELDS.map(field => {
                if (field.type === "postal" && !usesPostalCode(form.party_country)) return null;

                const label = field.type === "postal" ? postalCodeLabel(form.party_country) : field.label;
                const inputType = field.type === "email" || field.type === "date" ? field.type : "text";
                const error = errors[field.key] && (
                  <p className="text-xs text-destructive mt-1">
                    {field.key === "party_email" ? "Please enter a valid email address." : "This field is required."}
                  </p>
                );

                return (
                  <div key={field.key} className={field.wide ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      {label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                    {field.type === "country" ? (
                      <div className={errors[field.key] ? "rounded-md ring-1 ring-destructive" : ""}>
                        <CountrySelect
                          value={form.party_country}
                          onChange={value => handleChange("party_country", value)}
                          options={COUNTRIES}
                          placeholder="Select country"
                          searchPlaceholder="Search country…"
                          emptyText="No country found."
                        />
                      </div>
                    ) : (
                      <Input
                        type={inputType}
                        value={form[field.key]}
                        onChange={e => handleChange(field.key, e.target.value)}
                        autoComplete="off"
                        className={errors[field.key] ? "border-destructive" : ""}
                      />
                    )}
                    {error}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setNdaOpen(!ndaOpen)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Preview the Agreement</span>
                <Badge variant="outline" className="text-xs">Live preview</Badge>
              </div>
              {ndaOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>
            {ndaOpen && (
              <div className="border-t border-border px-6 py-5 max-h-[560px] overflow-y-auto bg-muted/20">
                <MutualNdaDocument
                  party={form}
                  signatures={{ counterparty: signature, dutyboost: dbSignature }}
                  onSignatureChange={(key, value) => (key === "counterparty" ? setSignature(value) : setDbSignature(value))}
                />
              </div>
            )}
          </div>

          <div className={`bg-card border rounded-2xl p-6 space-y-3 ${errors.accepted ? "border-destructive" : "border-border"}`}>
            <h2 className="font-heading font-semibold text-lg text-foreground">Acceptance</h2>
            <p className="text-sm text-muted-foreground">
              Please confirm that you have read and understood the Mutual Non-Disclosure Agreement above.
            </p>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={e => {
                    setAccepted(e.target.checked);
                    if (e.target.checked) setErrors(err => ({ ...err, accepted: false }));
                  }}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${accepted ? "bg-primary border-primary" : errors.accepted ? "border-destructive" : "border-input group-hover:border-primary"}`}>
                  {accepted && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
              <span className="text-sm text-foreground">
                I, {form.party_representative_name || "[representative name]"}, am duly authorised to accept this
                Mutual Non-Disclosure Agreement on behalf of {form.party_company_name || "[company name]"} as of{" "}
                {new Date(form.effective_date || Date.now()).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}.
              </span>
            </label>
            {errors.accepted && <p className="text-xs text-destructive">Acceptance is required.</p>}
            {errors.signature && (
              <p className="text-xs text-destructive">Please sign in the agreement&rsquo;s signature block above.</p>
            )}
          </div>

          <Button type="submit" disabled={submitting} className="w-full h-12 text-base font-semibold">
            {submitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting…
              </div>
            ) : (
              "Accept & Submit Mutual NDA"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Your details are stored securely and used only to prepare and issue this agreement.
          </p>
        </form>
      </div>
    </div>
  );
}