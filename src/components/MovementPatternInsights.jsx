import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, AlertCircle, Loader2 } from "lucide-react";

export default function MovementPatternInsights() {
  const [loading, setLoading] = useState(true);
  const [patterns, setPatterns] = useState([]);
  const [airportNames, setAirportNames] = useState({});
  const [selectedAirport, setSelectedAirport] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("All");

  const seasons = ["All", "Spring", "Summer", "Fall", "Winter", "Holiday Peak", "Low Season"];

  useEffect(() => {
    const loadPatterns = async () => {
      try {
        const [data, airports] = await Promise.all([
          base44.entities.TerminalMovementPattern.list('-created_date', 500),
          base44.entities.Airport.list('code', 5000),
        ]);
        setPatterns(data || []);
        setAirportNames(Object.fromEntries((airports || []).map(a => [a.code, a.name])));
        setSelectedAirport(prev => prev || data?.[0]?.airport || "");
      } finally {
        setLoading(false);
      }
    };
    loadPatterns();
  }, []);

  // Only airports that actually carry recorded data, named from the airport directory
  const recordedAirports = [...new Set(patterns.map(p => p.airport).filter(Boolean))].sort();

  const airportLabel = (code) => airportNames[code] ? `${code} — ${airportNames[code]}` : code;

  const filteredPatterns = patterns.filter(p =>
    p.airport === selectedAirport &&
    (selectedSeason === "All" || p.season === selectedSeason)
  );

  // Terminal traffic analysis
  const terminalMap = {};
  filteredPatterns.forEach(p => {
    if (!terminalMap[p.terminal]) {
      terminalMap[p.terminal] = { terminal: p.terminal, avgTraffic: 0, count: 0, totalTravelers: 0 };
    }
    terminalMap[p.terminal].avgTraffic += p.traffic_level;
    terminalMap[p.terminal].count += 1;
    if (p.estimated_travelers) terminalMap[p.terminal].totalTravelers += p.estimated_travelers;
  });

  const terminalData = Object.values(terminalMap)
    .map(t => ({
      ...t,
      avgTraffic: Math.round(t.avgTraffic / t.count),
      avgTravelers: t.totalTravelers ? Math.round(t.totalTravelers / t.count) : 0,
    }))
    .sort((a, b) => b.avgTraffic - a.avgTraffic);

  // Time window analysis
  const timeMap = {};
  filteredPatterns.forEach(p => {
    if (!timeMap[p.time_window]) {
      timeMap[p.time_window] = { time: p.time_window, traffic: 0, count: 0 };
    }
    timeMap[p.time_window].traffic += p.traffic_level;
    timeMap[p.time_window].count += 1;
  });

  const timeData = Object.values(timeMap)
    .map(t => ({
      ...t,
      avgTraffic: Math.round(t.traffic / t.count),
    }))
    .sort((a, b) => {
      const order = ["6:00-9:00", "9:00-12:00", "12:00-15:00", "15:00-18:00", "18:00-21:00", "21:00-24:00"];
      const aTime = order.findIndex(o => a.time.startsWith(o));
      const bTime = order.findIndex(o => b.time.startsWith(o));
      return aTime - bTime;
    });

  // Peak zones
  const topZones = terminalData.slice(0, 3);
  const peakTime = timeData.length > 0 ? timeData.reduce((a, b) => a.avgTraffic > b.avgTraffic ? a : b) : null;

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-96">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Select value={selectedAirport} onValueChange={setSelectedAirport}>
          <SelectTrigger className="w-72">
            <SelectValue placeholder="Select airport" />
          </SelectTrigger>
          <SelectContent>
            {recordedAirports.map(code => (
              <SelectItem key={code} value={code}>{airportLabel(code)}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSeason} onValueChange={setSelectedSeason}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {seasons.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredPatterns.length === 0 && (
        <Card className="p-6">
          <div className="text-center space-y-2 py-8">
            <AlertCircle className="w-10 h-10 mx-auto text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              No movement data yet for {selectedAirport ? airportLabel(selectedAirport) : "any airport"} in {selectedSeason === "All" ? "all seasons" : selectedSeason}.
            </p>
          </div>
        </Card>
      )}

      {filteredPatterns.length > 0 && (<>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topZones.map((zone, i) => {
          const medals = ["🥇", "🥈", "🥉"];
          return (
            <Card key={zone.terminal} className="p-4">
              <div className="text-center space-y-2">
                <p className="text-2xl">{medals[i]}</p>
                <p className="font-semibold">{zone.terminal}</p>
                <p className="text-lg font-heading font-bold text-primary">{zone.avgTraffic}/10</p>
                <p className="text-xs text-muted-foreground">Avg. traffic level</p>
                {zone.avgTravelers > 0 && (
                  <p className="text-xs text-muted-foreground">~{zone.avgTravelers} travelers/hr</p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Peak Time */}
      {peakTime && (
        <Card className="p-4 bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Peak Traffic Window</p>
              <p className="text-sm text-muted-foreground">{peakTime.time} with average traffic level {peakTime.avgTraffic}/10</p>
            </div>
          </div>
        </Card>
      )}

      {/* Charts */}
      {terminalData.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Traffic Level by Terminal/Zone</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={terminalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="terminal" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 10]} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="avgTraffic" fill="#1F6FFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Time Window Analysis */}
      {timeData.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Traffic by Time Window</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 10]} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="avgTraffic" fill="#FF7A00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Data Summary */}
      <Card className="p-4 text-xs text-muted-foreground space-y-1">
        <p><strong>{filteredPatterns.length}</strong> data points recorded</p>
        <p><strong>{new Set(filteredPatterns.map(p => p.submitted_by_email)).size}</strong> contributors (agencies & retailers)</p>
        <p className="pt-2 text-foreground text-sm font-semibold">This data helps optimize where and when DutyCredits should be promoted.</p>
      </Card>
      </>)}
    </div>
  );
}