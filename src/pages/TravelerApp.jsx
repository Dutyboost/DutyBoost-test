import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Plane } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";

export default function TravelerApp() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between">
        <Link to="/"><DutyBoostLogo height={130} /></Link>
        <Link to="/demo" className="text-xs text-muted-foreground hover:text-primary transition-colors">← Back to Demo</Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8">
        <div className="space-y-3 max-w-xl">
          <h1 className="text-4xl font-heading font-bold">Who are you?</h1>
          <p className="text-muted-foreground text-lg">Select your traveler type to get started with DutyBoost.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Corporate Traveler */}
          <Link
            to="/demo/corporate"
            className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-xl">Corporate Traveler</p>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                You're traveling for work. Your company pre-loads your F&B budget — pay at approved airport outlets with your DutyCredit QR, no receipts needed.
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              View my dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Leisure Traveler */}
          <Link
            to="/voucher"
            className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-orange-500 hover:bg-orange-50 transition-all text-left space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Plane className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <p className="font-heading font-bold text-xl">Leisure Traveler</p>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                You're flying for personal travel. Your travel agency includes exclusive airport F&B discounts with your booking — redeem them at participating outlets.
              </p>
            </div>
            <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm">
              View my voucher <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">DutyBoost — Airport F&B benefits for every traveler.</p>
      </div>
    </div>
  );
}