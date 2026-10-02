import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function StatsCard({ title, value, subtitle, icon: Icon, trend, hint }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm text-muted-foreground font-medium whitespace-nowrap">{title}</p>
            {hint && (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="w-4 h-4 rounded-full bg-muted text-muted-foreground text-[10px] font-bold flex items-center justify-center cursor-help shrink-0">
                      !
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[230px] text-xs">{hint}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className="text-2xl font-heading font-bold tracking-tight whitespace-nowrap">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className={`mt-3 text-xs font-medium`} style={{color: trend >= 0 ? '#00C48C' : '#ef4444'}}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% from last period
        </div>
      )}
    </div>
  );
}