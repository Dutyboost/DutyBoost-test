import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { base44 } from "@/api/base44Client";
import TravellerShell from "@/components/TravellerShell";
import CreditPassCard from "@/components/traveller/CreditPassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Search, Loader2, AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";

export default function TravellerHome() {
  const { t } = useTranslation();
  const tr = (key, opts) => t(`traveller.${key}`, opts);

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pass, setPass] = useState(null);

  const handleOpen = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await base44.functions.invoke('getTravellerCredit', {
        token_id: code.trim().toUpperCase(),
      });
      setPass(response.data);
    } catch {
      setError(tr('find_error'));
      setPass(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TravellerShell>
      {pass ? (
        <div className="space-y-6">
          <CreditPassCard pass={pass} />
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => { setPass(null); setCode(''); setError(''); }}
          >
            <ArrowLeft className="w-4 h-4" /> {tr('back')}
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight">{tr('title')}</h1>
            <p className="text-base sm:text-lg text-muted-foreground">{tr('subtitle')}</p>
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5" /> {tr('no_account')}
            </p>
          </div>

          {/* Claim */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-heading font-bold text-lg">{tr('claim_title')}</h2>
            <p className="text-sm text-muted-foreground">{tr('claim_desc')}</p>
            <Link to="/claim-duty-credit" className="block">
              <Button size="lg" className="w-full py-3 gap-2">
                <QrCode className="w-4 h-4" /> {tr('claim_cta')}
              </Button>
            </Link>
          </div>

          {/* Reopen */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Search className="w-5 h-5 text-foreground" />
            </div>
            <h2 className="font-heading font-bold text-lg">{tr('find_title')}</h2>
            <p className="text-sm text-muted-foreground">{tr('find_desc')}</p>
            <form onSubmit={handleOpen} className="space-y-3">
              <div>
                <Label htmlFor="credit-code" className="text-sm font-medium mb-1.5 block">
                  {tr('find_label')}
                </Label>
                <Input
                  id="credit-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder={tr('find_placeholder')}
                  className="font-mono h-12 text-base"
                  autoComplete="off"
                />
              </div>
              {error && (
                <div className="flex items-start gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              <Button type="submit" disabled={!code.trim() || loading} className="w-full h-12 gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                {loading ? tr('find_loading') : tr('find_cta')}
              </Button>
            </form>
          </div>
        </div>
      )}
    </TravellerShell>
  );
}