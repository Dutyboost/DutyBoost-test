import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import NewPartnerForm from "./NewPartnerForm";
import ParticipatingStoreList from "./ParticipatingStoreList";

/**
 * Internal partner onboarding: add the airport, the retailer and the stores
 * from a signed Order Form, then activate stores one by one. Team-only — it
 * lives inside the admin panel.
 */
export default function PartnerOnboardingPanel() {
  const [airports, setAirports] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [aps, ps] = await Promise.all([
        base44.entities.Airport.list("code", 5000),
        base44.entities.ParticipatingStore.list("-created_date", 2000),
      ]);
      setAirports(aps || []);
      setStores(ps || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-8">
      <NewPartnerForm airports={airports} onCreated={load} />
      <ParticipatingStoreList stores={stores} loading={loading} onChanged={load} />
    </div>
  );
}