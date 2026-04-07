import { MapPin, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RedemptionHeatmap from "./RedemptionHeatmap";
import TerminalMovementForm from "./TerminalMovementForm";
import MovementPatternInsights from "./MovementPatternInsights";

export default function AgencyStrategyTab({ vouchers = [], user }) {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-heading font-bold">Define Your Agency Strategy</h2>
        <p className="text-muted-foreground">
          Use redemption insights from your DutyCredits to optimize partner relationships and identify untapped markets.
        </p>
      </div>

      <RedemptionHeatmap vouchers={vouchers} />

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Strategy Planning Guide
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium text-foreground mb-1">1. Identify High-Performing Zones</p>
            <p className="text-muted-foreground">
              Look at the heatmap above. High-intensity zones represent strong retail partnerships. These are your core success areas.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">2. Capitalize on Top Zones</p>
            <p className="text-muted-foreground">
              Consider increasing DutyCredit discount levels or promotional campaigns in your top-performing airports to drive higher redemption rates.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">3. Target Low-Intensity Zones</p>
            <p className="text-muted-foreground">
              Low-performing zones indicate untapped potential. Reach out to retailers in these areas or adjust your DutyCredit incentive strategy.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">4. Monitor Trends Over Time</p>
            <p className="text-muted-foreground">
              Track changes in redemption patterns. Growing zones indicate successful partnerships; declining zones may need intervention.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-heading font-semibold text-lg">Contribute Movement Intelligence</h2>
        <p className="text-sm text-muted-foreground">Help us understand traveler flow. Share when and where your travelers move through airports.</p>
      </div>

      <TerminalMovementForm user={user} />

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-heading font-semibold text-lg">Market Intelligence Dashboard</h2>
        <p className="text-sm text-muted-foreground">Real-time insights from reported traveler movement patterns across airports.</p>
      </div>

      <MovementPatternInsights />

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold">Next Steps</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>Review the heatmap to understand your current market penetration by airport</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>Contact DutyBoost support to discuss partner recruitment in low-intensity zones</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>Adjust your DutyCredit discount levels based on zone performance</span>
          </li>
        </ul>
      </div>
    </div>
  );
}