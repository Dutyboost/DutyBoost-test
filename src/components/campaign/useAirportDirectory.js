import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { regionForAirportCountry } from "@/data/countryRegions";

/**
 * Loads the researched airport directory and the stores mapped at each
 * airport, so the campaign list reflects the live data rather than the
 * curated company dataset.
 */
export default function useAirportDirectory() {
  const [loading, setLoading] = useState(true);
  const [airports, setAirports] = useState([]);
  const [storesByCode, setStoresByCode] = useState({});
  const [storeCount, setStoreCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      base44.entities.Airport.list("code", 5000),
      base44.entities.AirportStore.list("store_name", 5000),
    ])
      .then(([airportList, storeList]) => {
        if (cancelled) return;

        const grouped = {};
        (storeList || []).forEach((s) => {
          const key = (s.airport_code || "").toUpperCase();
          if (!key) return;
          (grouped[key] = grouped[key] || []).push(s);
        });

        const mapped = (airportList || []).map((a) => {
          const code = (a.code || "").toUpperCase();
          return {
            ...a,
            code,
            region: regionForAirportCountry(a.country),
            storeCount: (grouped[code] || []).length,
          };
        });

        setStoresByCode(grouped);
        setAirports(mapped);
        setStoreCount((storeList || []).length);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { loading, airports, storesByCode, storeCount };
}