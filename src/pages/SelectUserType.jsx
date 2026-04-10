import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import AirportRetailerIcon from "../components/AirportRetailerIcon";
import TravelerIcon from "../components/TravelerIcon";
import { ArrowRight } from "lucide-react";
import PageFooter from "../components/PageFooter";

export default function SelectUserType() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const options = [
    {
      title: 'For Travel Partners',
      descKey: 'getstarted.agencies_description',
      icon: TravelAgencyIcon,
      color: "from-green-400 to-emerald-600",
      bg: "bg-green-50",
      iconColor: "text-green-600",
      path: "/agency-showcase",
    },
    {
      titleKey: 'nav.for_retailers',
      descKey: 'getstarted.retailers_description',
      icon: AirportRetailerIcon,
      color: "from-orange-400 to-orange-600",
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
      path: "/retailer-showcase",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center">
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={150} />
          </button>
        </div>
      </nav>

      {/* Main content */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold">{t('getstarted.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('getstarted.subtitle_default')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {options.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.path}
                  onClick={() => navigate(option.path)}
                  className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg hover:border-primary/30 transition-all flex flex-col cursor-pointer"
                >
                  <div className={`w-20 h-20 rounded-2xl ${option.bg} flex items-center justify-center mb-6`}>
                    <Icon className={`w-20 h-20 ${option.iconColor}`} />
                  </div>
                  <h2 className="font-heading font-bold text-2xl mb-3">{option.title || t(option.titleKey)}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    {t(option.descKey)}
                  </p>
                  <Button
                    size="lg"
                    className={`w-full bg-gradient-to-r ${option.color} text-white hover:opacity-90 gap-2`}
                  >
                    {t('nav.get_started')} <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <PageFooter />
    </div>
  );
}