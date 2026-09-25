import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import SearchCombobox from "./onboarding/SearchCombobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { MapPin, Clock, BarChart3, Loader2 } from "lucide-react";

const TERMINAL_LAYOUTS = {
  AMS: {
    name: "Amsterdam Schiphol",
    terminals: ["T1-D", "T1-E", "T1-F", "T1-C", "PLAZA", "T1-B", "ARR-1", "ARR-2"]
  },
  RTM: {
    name: "Rotterdam The Hague",
    terminals: ["DEP-A", "DEP-B", "DEP-C", "MAIN-SHOPS", "GATE-LOUNGE"]
  },
  EIN: {
    name: "Eindhoven Airport",
    terminals: ["T1", "T2", "DUTY", "FOOD", "RETAIL"]
  },
  BRU: {
    name: "Brussels Airport",
    terminals: ["PIER-A", "PIER-B", "PIER-C", "PIER-D", "DEP-SHOPS", "LOUNGE", "ARR"]
  },
};

const TIME_WINDOWS = [
  "6:00-9:00 (Early Morning)",
  "9:00-12:00 (Morning)",
  "12:00-15:00 (Midday)",
  "15:00-18:00 (Afternoon)",
  "18:00-21:00 (Evening)",
  "21:00-24:00 (Night)"
];

const SEASONS = [
  "Spring", "Summer", "Fall", "Winter", "Holiday Peak", "Low Season"
];

export default function TerminalMovementForm({ user }) {
  const [airports, setAirports] = useState([]);
  const [airportQuery, setAirportQuery] = useState("");
  const [airportCode, setAirportCode] = useState("");
  const [terminal, setTerminal] = useState("");
  const [timeWindow, setTimeWindow] = useState("");
  const [season, setSeason] = useState("");
  const [trafficLevel, setTrafficLevel] = useState("");
  const [estimatedTravelers, setEstimatedTravelers] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Every stored airport (4,000+) is selectable
  useEffect(() => {
    base44.entities.Airport.list("code", 5000).then(list => setAirports(list || []));
  }, []);

  const airportOptions = useMemo(() => airports.map(a => ({
    key: a.code,
    label: `${a.code} — ${a.name}`,
    sub: [a.city, a.country].filter(Boolean).join(", "),
  })), [airports]);

  const knownTerminals = TERMINAL_LAYOUTS[airportCode]?.terminals;

  // Known layouts prefill the zone; any other airport takes a free-text zone
  useEffect(() => {
    setTerminal(TERMINAL_LAYOUTS[airportCode]?.terminals[0] || "");
  }, [airportCode]);

  const resolveAirportCode = () => {
    if (airportCode) return airportCode;
    const q = airportQuery.trim().toLowerCase();
    if (!q) return "";
    const match = airports.find(a => a.code.toLowerCase() === q)
      || airports.find(a => `${a.code} — ${a.name}`.toLowerCase() === q)
      || airports.find(a => a.name.toLowerCase() === q);
    return match ? match.code : airportQuery.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!airportQuery.trim() || !terminal || !timeWindow || !season || !trafficLevel) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await base44.entities.TerminalMovementPattern.create({
        airport: resolveAirportCode(),
        terminal,
        time_window: timeWindow,
        season,
        traffic_level: parseInt(trafficLevel),
        estimated_travelers: estimatedTravelers ? parseInt(estimatedTravelers) : null,
        notes,
        submitted_by_email: user.email,
        is_agency: user.role === "agency",
      });
      toast.success("Movement pattern recorded!");
      setSubmitted(true);
      setTimeout(() => {
        setAirportQuery("");
        setAirportCode("");
        setTerminal("");
        setTimeWindow("");
        setSeason("");
        setTrafficLevel("");
        setEstimatedTravelers("");
        setNotes("");
        setSubmitted(false);
      }, 1500);
    } catch (err) {
      toast.error("Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg mb-1">Record Terminal Movement Data</h3>
        <p className="text-sm text-muted-foreground">
          Help us understand traveler flow patterns at airports. Your data improves DutyCredit targeting.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Airport Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Airport <span className="text-red-500">*</span>
          </Label>
          <SearchCombobox
            value={airportQuery}
            onChange={(v) => { setAirportQuery(v); setAirportCode(""); }}
            onPick={(o) => { setAirportQuery(o.label); setAirportCode(o.key); }}
            options={airportOptions}
            placeholder="Search any airport by code, name, city or country"
            emptyText="No airport matches — check the spelling or pick the closest airport"
          />
        </div>

        {/* Terminal Selection */}
        <div className="space-y-2">
          <Label>Terminal/Zone <span className="text-red-500">*</span></Label>
          {knownTerminals ? (
            <Select value={terminal} onValueChange={setTerminal}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {knownTerminals.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              value={terminal}
              onChange={e => setTerminal(e.target.value)}
              placeholder="e.g. Terminal 2, Pier B, Departures, Gate Lounge"
            />
          )}
        </div>

        {/* Time Window */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="w-4 h-4" /> Time Window <span className="text-red-500">*</span>
          </Label>
          <Select value={timeWindow} onValueChange={setTimeWindow}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_WINDOWS.map(tw => (
                <SelectItem key={tw} value={tw}>{tw}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Season */}
        <div className="space-y-2">
          <Label>Season/Period <span className="text-red-500">*</span></Label>
          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SEASONS.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Traffic Level */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> Traffic Level (1-10) <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min="1"
              max="10"
              value={trafficLevel}
              onChange={e => setTrafficLevel(e.target.value)}
              placeholder="e.g. 7"
              className="w-24"
            />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded text-xs flex items-center justify-center cursor-pointer transition-all ${
                    parseInt(trafficLevel) >= i
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  onClick={() => setTrafficLevel(String(i))}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">1 = Very light traffic, 10 = Extremely heavy</p>
        </div>

        {/* Estimated Travelers */}
        <div className="space-y-2">
          <Label>Estimated Travelers per Hour (optional)</Label>
          <Input
            type="number"
            min="0"
            value={estimatedTravelers}
            onChange={e => setEstimatedTravelers(e.target.value)}
            placeholder="e.g. 450"
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label>Observations & Notes (optional)</Label>
          <Textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="E.g., Peak hours shift in summer, weekend traffic patterns, special events, holiday surges..."
            rows={4}
          />
        </div>

        <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
            </>
          ) : (
            "Submit Movement Data"
          )}
        </Button>

        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-700">
            ✓ Your data has been recorded and will help improve DutyCredit placement strategies.
          </div>
        )}
      </form>
    </Card>
  );
}