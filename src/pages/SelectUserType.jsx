import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Button } from "@/components/ui/button";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import AirportRetailerIcon from "../components/AirportRetailerIcon";
import HotelIcon from "../components/HotelIcon";
import CarRentalIcon from "../components/CarRentalIcon";
import { ArrowRight, PlaneTakeoff, Anchor } from "lucide-react";
import CruiseShipIcon from "../components/CruiseShipIcon";
import TrainIcon from "../components/TrainIcon";
import CoachOnRoadIcon from "../components/CoachOnRoadIcon";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ShowcaseMobileNav from "../components/ShowcaseMobileNav";
import { getTravelPartnerCardStrings } from "@/lib/i18nTravelPartnerCards";

export default function SelectUserType({ travelPartnerOnly = false }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const tp = getTravelPartnerCardStrings(i18n.language);
  const urlParams = new URLSearchParams(window.location.search);
  const fromAgency = travelPartnerOnly || urlParams.get('from') === 'agency';

  const options = [
    {
      id: "airports",
      title: t('getstarted.airports'),
      descKey: 'getstarted.airports_description',
      icon: PlaneTakeoff,
      color: "from-cyan-400 to-sky-600",
      bg: "bg-cyan-50",
      iconColor: "text-cyan-600",
      path: "/airport-showcase",
    },
    {
      id: "retailer",
      title: t('getstarted.retailers'),
      descKey: 'getstarted.retailers_description',
      icon: AirportRetailerIcon,
      color: "from-orange-400 to-orange-600",
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
      path: "/travel-retailers",
    },
    {
      id: "ports",
      title: t('getstarted.ports'),
      descKey: 'getstarted.ports_description',
      icon: Anchor,
      color: "from-blue-500 to-indigo-700",
      bg: "bg-blue-50",
      iconColor: "text-indigo-600",
      path: "/ports-showcase",
    },
    {
      id: "cruise",
      title: t('getstarted.cruise'),
      descKey: 'getstarted.cruise_description',
      icon: CruiseShipIcon,
      color: "from-teal-400 to-cyan-600",
      bg: "bg-teal-50",
      iconColor: "text-teal-600",
      path: "/cruise-showcase",
    },
    {
      id: "agency",
      title: t('getstarted.agencies'),
      descKey: 'getstarted.agencies_description',
      icon: TravelAgencyIcon,
      color: "from-green-400 to-emerald-600",
      bg: "bg-green-50",
      iconColor: "text-green-600",
      path: "/flight-showcase",
    },
    {
      id: "hotel",
      title: t('getstarted.accommodations'),
      descKey: 'getstarted.accommodations_description',
      icon: HotelIcon,
      color: "from-blue-400 to-blue-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
      path: "/accommodation-showcase",
    },
    {
      id: "carrental",
      title: t('getstarted.car_rentals'),
      descKey: 'getstarted.car_rentals_description',
      icon: CarRentalIcon,
      color: "from-red-400 to-red-600",
      bg: "bg-red-50",
      iconColor: "text-red-600",
      path: "/car-rental-showcase",
    },
    {
      id: "train",
      title: t('getstarted.train'),
      descKey: 'getstarted.train_description',
      icon: TrainIcon,
      color: "from-indigo-400 to-violet-600",
      bg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      path: "/train-showcase",
    },
    {
      id: "coach",
      title: tp.coach_title,
      description: tp.coach_card_description,
      icon: CoachOnRoadIcon,
      color: "from-amber-400 to-orange-600",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
      path: "/coach-showcase",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Nav */}
      <ShowcaseMobileNav gradient="linear-gradient(to bottom, #2563eb, #3b82f6)" />
      <nav className="hidden sm:block sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <DutyBoostLogo height={55} />
          </button>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Main content */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold">{fromAgency ? t('getstarted.title_partner') : t('getstarted.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {fromAgency ? t('getstarted.subtitle_partner') : t('getstarted.subtitle_default')}
            </p>
          </div>

          <div className={`grid gap-4 mx-auto sm:grid-cols-2 ${fromAgency ? 'lg:grid-cols-3 max-w-5xl' : 'lg:grid-cols-4 max-w-7xl'}`}>
            {options.filter(o => !(fromAgency && (o.id === 'retailer' || o.id === 'pos' || o.id === 'airports' || o.id === 'ports'))).map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  onClick={() => navigate(fromAgency ? `${option.path}?from=agency` : option.path)}
                  className="bg-card rounded-2xl border border-border p-4 sm:p-5 hover:shadow-lg hover:border-primary/30 transition-all flex flex-col cursor-pointer"
                >
                  <div className={`w-20 h-20 rounded-2xl ${option.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-20 h-20 ${option.iconColor}`} />
                  </div>
                  <h2 className="font-heading font-bold text-sm tracking-tight whitespace-nowrap mb-3">{option.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    {option.description || t(option.descKey)}
                  </p>
                  <Button
                    size="lg"
                    className={`w-full bg-gradient-to-r ${option.color} text-white hover:opacity-90 gap-2`}
                  >
                    {t('getstarted.get_started')} <ArrowRight className="w-4 h-4" />
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