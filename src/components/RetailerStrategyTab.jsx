import { MapPin, TrendingUp } from "lucide-react";
import RedemptionHeatmap from "./RedemptionHeatmap";
import TerminalMovementForm from "./TerminalMovementForm";
import MovementPatternInsights from "./MovementPatternInsights";

export default function RetailerStrategyTab({ vouchers = [], user }) {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-heading font-bold">Define Your Airport Retail Strategy</h2>
        <p className="text-muted-foreground">
          Use redemption data to understand which terminal zones are attracting the most travelers and optimize your operations.
        </p>
      </div>

      <RedemptionHeatmap vouchers={vouchers} />

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Retail Strategy Planning Guide
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium text-foreground mb-1">1. Understand Your Zone Performance</p>
            <p className="text-muted-foreground">
              The heatmap shows where DutyCredit redemptions are happening. High-intensity zones indicate strong traveler foot traffic and redemption activity.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">2. Optimize High-Traffic Zones</p>
            <p className="text-muted-foreground">
              Ensure your best inventory, trained staff, and promotional materials are in high-performing terminal zones to maximize sales conversion.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">3. Activate Low-Intensity Zones</p>
            <p className="text-muted-foreground">
              Low-performing zones represent untapped traveler traffic. Consider adding signage, staff presence, or promotional campaigns in these areas.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">4. Coordinate with Travel Agencies</p>
            <p className="text-muted-foreground">
              Share zone performance data with your DutyBoost partner agencies. This helps them understand where their travelers are shopping.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">5. Track Seasonal Trends</p>
            <p className="text-muted-foreground">
              Monitor redemption patterns over time. Peaks and valleys may indicate seasonal travel patterns or successful marketing campaigns.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-heading font-semibold text-lg">Share Your Store Traffic Data</h2>
        <p className="text-sm text-muted-foreground">Record passenger movement patterns at your terminals to help optimize DutyCredit placement.</p>
      </div>

      <TerminalMovementForm user={user} />

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-heading font-semibold text-lg">Market Intelligence Dashboard</h2>
        <p className="text-sm text-muted-foreground">View aggregated traffic patterns across all airports to inform your retail strategy.</p>
      </div>

      <MovementPatternInsights />

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold">Next Steps</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>Analyze the heatmap to identify your strongest and weakest performing zones</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>Develop targeted initiatives to boost sales in low-performing zones</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>Schedule a call with DutyBoost to discuss partnership growth opportunities</span>
          </li>
        </ul>
      </div>
    </div>
  );
}