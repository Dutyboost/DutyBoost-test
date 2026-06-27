import DemoRetailerDashboardView from "../components/DemoRetailerDashboardView";
import { RETAILERS, AIRPORTS, MONTHLY_DATA, DAILY_DATA, YEARLY_DATA } from "../data/demoDataSpain";

export default function DemoRetailerDashboardSpain() {
  return (
    <DemoRetailerDashboardView
      AIRPORTS={AIRPORTS}
      RETAILERS={RETAILERS}
      MONTHLY_DATA={MONTHLY_DATA}
      DAILY_DATA={DAILY_DATA}
      YEARLY_DATA={YEARLY_DATA}
      defaultAirport="MAD"
      region="es"
    />
  );
}