import AgencyIntegrationSnippet from "../components/AgencyIntegrationSnippet";

export default function AgencyIntegrationPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight">Booking Integration</h1>
        <p className="text-muted-foreground mt-1">Connect your booking confirmation page to automatically issue DutyCredits.</p>
      </div>
      <AgencyIntegrationSnippet />
    </div>
  );
}