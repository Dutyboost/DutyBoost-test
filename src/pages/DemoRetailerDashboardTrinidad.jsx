import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import DemoRetailerDashboardView from "../components/DemoRetailerDashboardView";
import { RETAILERS, AIRPORTS, MONTHLY_DATA, DAILY_DATA, YEARLY_DATA, STORE_COUNT } from "../data/demoDataTrinidadDashboard";

export default function DemoRetailerDashboardTrinidad() {
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam) {
      i18n.changeLanguage(langParam);
    } else {
      i18n.changeLanguage("en");
    }
  }, [i18n, searchParams]);

  return (
    <DemoRetailerDashboardView
      AIRPORTS={AIRPORTS}
      RETAILERS={RETAILERS}
      MONTHLY_DATA={MONTHLY_DATA}
      DAILY_DATA={DAILY_DATA}
      YEARLY_DATA={YEARLY_DATA}
      STORE_COUNT={STORE_COUNT}
      defaultAirport="POS"
      region="americas"
      companyKey="trinidad_tobago"
      currency="USD"
    />
  );
}