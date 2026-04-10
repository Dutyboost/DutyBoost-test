import { useState, useCallback } from "react";
import { CheckCircle2, XCircle, Loader2, AlertTriangle } from "lucide-react";
import { base44 } from "@/api/base44Client";

/**
 * KvkValidator
 * Validates KVK number, VAT number, and company name against the KVK registry and EU VIES.
 * 
 * Props:
 *   kvk, vat, company  — current field values
 *   onValidated(result) — called with { valid, errors, kvkCompanyName } when validation completes
 */
export default function KvkValidator({ kvk, vat, company, onValidated }) {
  const [status, setStatus] = useState(null); // null | 'loading' | 'valid' | 'invalid' | 'warning'
  const [errors, setErrors] = useState([]);
  const [testMode, setTestMode] = useState(false);
  const [kvkName, setKvkName] = useState(null);

  const validate = useCallback(async () => {
    if (!kvk || !vat || !company) return;
    setStatus('loading');
    setErrors([]);
    try {
      const res = await base44.functions.invoke('validateKvk', { kvk, vat, company });
      const data = res.data;
      setTestMode(data.testMode || false);
      setKvkName(data.kvkCompanyName);
      if (data.valid) {
        setStatus(data.testMode ? 'warning' : 'valid');
        setErrors([]);
        onValidated && onValidated({ valid: true, errors: [], kvkCompanyName: data.kvkCompanyName });
      } else {
        setStatus('invalid');
        setErrors(data.errors || []);
        onValidated && onValidated({ valid: false, errors: data.errors || [] });
      }
    } catch (e) {
      setStatus('invalid');
      const errs = [{ field: 'general', message: 'Validation service unavailable. Please try again.' }];
      setErrors(errs);
      onValidated && onValidated({ valid: false, errors: errs });
    }
  }, [kvk, vat, company, onValidated]);

  const getFieldErrors = (field) => errors.filter(e => e.field === field);

  return (
    <div className="space-y-3">
      {/* Validate button */}
      <button
        type="button"
        onClick={validate}
        disabled={!kvk || !vat || !company || status === 'loading'}
        className="w-full flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-primary text-primary font-medium text-sm hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'loading' ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Verifying with KVK & EU VIES...</>
        ) : (
          '🔍 Verify Business Registration'
        )}
      </button>

      {/* Status feedback */}
      {status === 'valid' && (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div className="text-sm text-green-800">
            <p className="font-semibold">Business verified ✓</p>
            {kvkName && <p className="text-xs mt-0.5">Registered as: <strong>{kvkName}</strong></p>}
          </div>
        </div>
      )}

      {status === 'warning' && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold">Test mode — KVK lookup skipped</p>
            <p className="text-xs mt-0.5">VAT format validated. Full KVK verification will activate once the API key is configured.</p>
          </div>
        </div>
      )}

      {status === 'invalid' && errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-2">
          {errors.map((err, i) => (
            <div key={i} className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{err.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Per-field inline hints */}
      {(status === 'valid' || status === 'warning') && getFieldErrors('company').length === 0 && kvkName && (
        <p className="text-xs text-green-700 ml-1">✓ Company name matches KVK: <strong>{kvkName}</strong></p>
      )}
    </div>
  );
}