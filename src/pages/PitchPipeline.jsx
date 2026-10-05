import React, { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import PipelineSummary from "@/components/pipeline/PipelineSummary";
import PipelineTable from "@/components/pipeline/PipelineTable";
import EnablerGroups from "@/components/pipeline/EnablerGroups";
import {
  PITCHES,
  ENABLER_GROUPS,
  SCENARIOS,
  CATEGORIES,
  basketsFor,
  platformRevenue,
} from "@/data/pitchPipeline";

const STORE_KEY = "dutyboost:pitch-pipeline";

export default function PitchPipeline() {
  const [overrides, setOverrides] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(overrides));
  }, [overrides]);

  const rows = useMemo(
    () =>
      PITCHES.map((pitch) => {
        const override = overrides[pitch.id] || {};
        const movements = override.movements ?? pitch.movements;
        return {
          ...pitch,
          movements,
          status: override.status ?? pitch.status,
          basketsMin: basketsFor(movements, SCENARIOS.minimum),
          min: platformRevenue(movements, pitch.basket, SCENARIOS.minimum),
          modelled: platformRevenue(movements, pitch.basket, SCENARIOS.modelled),
        };
      }),
    [overrides]
  );

  const sorted = useMemo(() => [...rows].sort((a, b) => b.modelled - a.modelled), [rows]);

  const totals = useMemo(
    () => rows.reduce((acc, r) => ({ min: acc.min + r.min, modelled: acc.modelled + r.modelled }), { min: 0, modelled: 0 }),
    [rows]
  );

  const byCategory = useMemo(() => {
    const out = {};
    CATEGORIES.forEach((cat) => {
      out[cat] = rows
        .filter((r) => r.category === cat)
        .reduce((acc, r) => ({ min: acc.min + r.min, modelled: acc.modelled + r.modelled }), { min: 0, modelled: 0 });
    });
    return out;
  }, [rows]);

  const update = (id, patch) =>
    setOverrides((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch } }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <DutyBoostLogo height={40} linkTo={null} />
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mt-4">
              Pitch Pipeline
            </h1>
            <p className="text-muted-foreground mt-1 max-w-3xl text-sm md:text-base">
              Every pitch DutyBoost has built, the traffic it addresses, and the platform revenue it
              carries at the standard 2.5% fee on validated transactions.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setOverrides({})}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset figures
          </Button>
        </header>

        <div className="mt-6">
          <PipelineSummary byCategory={byCategory} totals={totals} pitchCount={rows.length} />
        </div>

        <div className="mt-6">
          <PipelineTable rows={sorted} totals={totals} onUpdate={update} />
        </div>

        <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-4xl">
          <strong className="text-foreground">Minimum</strong> assumes 1% pre-activation and 25%
          redemption; <strong className="text-foreground">Modelled</strong> uses the decks' own 2% and
          30%. Both apply the 2.5% platform fee to the qualifying basket, capped at $1,000 spend and $25
          per transaction. Movements are editable — a market-level and a group-level pitch addressing the
          same traffic are counted independently, so the total is a sum of pitches, not of unique
          passengers.
        </p>

        <h2 className="font-heading font-bold text-xl text-foreground mt-10">
          Enablers, templates & collateral
        </h2>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Pitches that carry no revenue line of their own — they open capacity, act as templates, or
          serve an internal purpose.
        </p>
        <EnablerGroups groups={ENABLER_GROUPS} />
      </div>
    </div>
  );
}