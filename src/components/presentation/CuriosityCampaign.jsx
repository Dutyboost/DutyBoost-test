import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Search, Video, Camera, Play, MessageCircle, Users } from "lucide-react";

const PHASE1_COUNTRIES = [
  { flag: "🇬🇧", name: "United Kingdom", visitors: "18.4M" },
  { flag: "🇫🇷", name: "France", visitors: "13.0M" },
  { flag: "🇩🇪", name: "Germany", visitors: "11.9M" },
  { flag: "🇮🇹", name: "Italy", visitors: "5.4M" },
  { flag: "🇳🇱", name: "Netherlands", visitors: "4.8M" },
];

const CHANNELS = [
  { icon: Search, name: "Google SEO" },
  { icon: Video, name: "TikTok" },
  { icon: Camera, name: "Instagram Reels" },
  { icon: Play, name: "YouTube Shorts" },
  { icon: MessageCircle, name: "Reddit" },
  { icon: Users, name: "Facebook Groups" },
];

export default function CuriosityCampaign() {
  const { t } = useTranslation();
  const funnelSteps = [
    t('presentation.campaign.funnel_1'),
    t('presentation.campaign.funnel_2'),
    t('presentation.campaign.funnel_3'),
    t('presentation.campaign.funnel_4'),
    t('presentation.campaign.funnel_5'),
    t('presentation.campaign.funnel_6'),
    t('presentation.campaign.funnel_7'),
  ];

  return (
    <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="text-center space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{t('presentation.campaign.label')}</p>
        <h3 className="text-2xl font-heading font-bold">{t('presentation.campaign.title')}</h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">{t('presentation.campaign.subtitle')}</p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
        <p className="text-sm italic text-foreground">{t('presentation.campaign.traveler_thought')}</p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">{t('presentation.campaign.market_label')}</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted/40 border border-border rounded-xl p-4 text-center space-y-1">
            <p className="text-xl font-heading font-bold text-primary">{t('presentation.campaign.stat_passengers_val')}</p>
            <p className="text-xs text-muted-foreground">{t('presentation.campaign.stat_passengers_label')}</p>
          </div>
          <div className="bg-muted/40 border border-border rounded-xl p-4 text-center space-y-1">
            <p className="text-xl font-heading font-bold text-primary">{t('presentation.campaign.stat_departures_val')}</p>
            <p className="text-xs text-muted-foreground">{t('presentation.campaign.stat_departures_label')}</p>
          </div>
          <div className="bg-muted/40 border border-border rounded-xl p-4 text-center space-y-1">
            <p className="text-xl font-heading font-bold text-primary">{t('presentation.campaign.stat_intl_val')}</p>
            <p className="text-xs text-muted-foreground">{t('presentation.campaign.stat_intl_label')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-center text-xs text-muted-foreground">{t('presentation.campaign.phase1_subtitle')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PHASE1_COUNTRIES.map(c => (
            <div key={c.name} className="bg-muted/40 border border-border rounded-lg p-3 text-center space-y-1">
              <p className="text-2xl">{c.flag}</p>
              <p className="text-xs font-semibold">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.visitors}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">{t('presentation.campaign.funnel_label')}</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {funnelSteps.map((step, i) => (
            <Fragment key={i}>
              <div className="px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800">{step}</div>
              {i < funnelSteps.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">{t('presentation.campaign.channels_label')}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {CHANNELS.map(({ icon: Icon, name }) => (
            <div key={name} className="flex items-center gap-2 px-3 py-2 bg-muted/40 border border-border rounded-full text-xs font-medium">
              <Icon className="w-3.5 h-3.5 text-primary" />
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-4 text-center space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/80">{t('presentation.campaign.principle_label')}</p>
        <p className="text-sm font-semibold text-primary-foreground">{t('presentation.campaign.principle')}</p>
      </div>
    </div>
  );
}