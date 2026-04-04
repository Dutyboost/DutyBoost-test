import { Link } from "react-router-dom";
import { Store, Plane, ArrowRight, Eye, LayoutDashboard } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

export default function DemoLanding() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/"><DutyBoostLogo height={130} /></Link>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">Demo Mode</span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-10">
        <div className="space-y-3 max-w-xl">
          <h1 className="text-4xl font-heading font-bold">DutyBoost Platform Demo</h1>
          <p className="text-muted-foreground text-lg">Explore the platform from the perspective of an Airport Retailer or a Travel Agency. All data is illustrative.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Link to="/demo/agency" className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Plane className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-xl">Travel Agency</p>
              <p className="text-muted-foreground text-sm mt-1">See how agencies earn passive commission revenue by issuing DutyCredits to travelers.</p>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Eye className="w-4 h-4" /> View Agency Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/demo/retailer" className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-xl">Airport Retailer</p>
              <p className="text-muted-foreground text-sm mt-1">Discover how retailers attract high-spend travelers and track redemptions via the dashboard.</p>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Eye className="w-4 h-4" /> View Retailer Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/demo/admin" className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-heading font-bold text-xl">Platform Admin</p>
              <p className="text-muted-foreground text-sm mt-1">View platform-wide financials: retailer invoices, agency payouts and net profit calculations.</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
              <Eye className="w-4 h-4" /> View Admin Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">This is a live demo environment. No real transactions are processed.</p>
      </div>
    </div>
  );
}