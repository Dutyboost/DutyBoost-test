import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import NewPartnerTypeForm from "./NewPartnerTypeForm";
import ParticipatingPartnerList from "./ParticipatingPartnerList";

/**
 * Onboarding for one non-retail partner type (travel or corporate). Same shape
 * as the retail panel: add the partner from a signed Order Form, then switch
 * each unit live. Team-only — it lives inside the admin panel.
 */
export default function PartnerTypePanel({ config }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const list = await base44.entities.ParticipatingPartner.filter(
        { partner_type: config.value },
        "-created_date",
        2000
      );
      setRecords(list || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    load();
  }, [config.value]);

  return (
    <div className="space-y-8">
      <NewPartnerTypeForm config={config} onCreated={load} />
      <ParticipatingPartnerList
        records={records}
        loading={loading}
        config={config}
        onChanged={load}
      />
    </div>
  );
}