import DemoRetailerDashboardView from "../components/DemoRetailerDashboardView";
import { RETAILERS, AIRPORTS, MONTHLY_DATA, DAILY_DATA, YEARLY_DATA } from "../data/demoData";

export default function DemoRetailerDashboard() {
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