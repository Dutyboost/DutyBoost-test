import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DemoRetailerDashboardView from "../components/DemoRetailerDashboardView";
import { RETAILERS, AIRPORTS, MONTHLY_DATA, DAILY_DATA, YEARLY_DATA } from "../data/demoData";

export default function DemoRetailerDashboard() {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("nl");
  }, [i18n]);
  return (
    <DemoRetailerDashboardView
      AIRPORTS={AIRPORTS}
      RETAILERS={RETAILERS}
      MONTHLY_DATA={MONTHLY_DATA}
      DAILY_DATA={DAILY_DATA}
      YEARLY_DATA={YEARLY_DATA}
      defaultAirport="AMS"
    />
  );
}