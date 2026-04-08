import DutyBoostLogo from "../components/DutyBoostLogo";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="space-y-8 max-w-lg">
        <DutyBoostLogo height={180} />

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight text-foreground">
            Coming Soon
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're putting the finishing touches on something exciting. DutyBoost is launching soon — connecting travel agencies, airport retailers, and travelers like never before.
          </p>
        </div>

        <div className="border-t border-border pt-6 text-sm text-muted-foreground space-y-1">
          <p>Want to be the first to know?</p>
          <p>
            Reach out at{" "}
            <a href="mailto:hello@dutyboost.com" className="text-primary underline underline-offset-2">
              hello@dutyboost.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}