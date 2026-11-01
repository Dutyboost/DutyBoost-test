import { useTranslation } from "react-i18next";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const STATUS_STYLES = {
  active: { badge: "bg-green-100 text-green-700", icon: CheckCircle2 },
  redeemed: { badge: "bg-slate-100 text-slate-600", icon: Clock },
  expired: { badge: "bg-amber-100 text-amber-700", icon: AlertCircle },
};

export default function CreditPassCard({ pass }) {
  const { t } = useTranslation();
  const tr = (key) => t(`traveller.${key}`);
  const style = STATUS_STYLES[pass.status] || STATUS_STYLES.expired;
  const StatusIcon = style.icon;

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="bg-primary text-primary-foreground px-6 py-4 text-center">
        <p className="text-xs uppercase tracking-widest opacity-80">{tr('find_label')}</p>
        <p className="text-lg font-bold font-mono mt-1">{pass.token_id}</p>
      </div>
      <div className="p-6 flex flex-col items-center gap-4">
        {pass.status === 'active' ? (
          <img
            src={pass.qr_image_url}
            alt="DutyCredit QR code"
            className="w-44 h-44 rounded-xl border border-border"
          />
        ) : (
          <div className="w-44 h-44 rounded-xl border border-border bg-muted flex items-center justify-center">
            <StatusIcon className="w-10 h-10 text-muted-foreground" />
          </div>
        )}

        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.badge}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {tr(`pass_status_${pass.status}`)}
        </div>

        <div className="w-full grid grid-cols-2 gap-3 text-sm">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-0.5">{tr('pass_airport')}</p>
            <p className="font-semibold truncate">{pass.airport}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-0.5">{tr('pass_expiry')}</p>
            <p className="font-semibold">
              {new Date(pass.expiry).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          {pass.status === 'active' ? tr('pass_hint') : tr('pass_inactive_hint')}
        </p>
      </div>
    </div>
  );
}