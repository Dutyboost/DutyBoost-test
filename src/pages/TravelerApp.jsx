import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";
import {
  Utensils, QrCode, History, MapPin, LogOut,
  CheckCircle, XCircle, Clock, RefreshCw, ChevronRight,
  Wifi, Coffee
} from "lucide-react";

const TABS = [
  { id: "wallet", label: "Wallet", icon: QrCode },
  { id: "history", label: "History", icon: History },
  { id: "outlets", label: "Outlets", icon: MapPin },
];

const DEMO_OUTLETS = [
  { name: "The Kitchen Bar", airport: "AMS", terminal: "C", category: "F&B", hours: "05:00–22:00" },
  { name: "Sky Lounge Bistro", airport: "CDG", terminal: "2E", category: "F&B", hours: "06:00–21:00" },
  { name: "Gate 7 Café", airport: "FRA", terminal: "1", category: "F&B", hours: "05:30–23:00" },
  { name: "La Piazza", airport: "AMS", terminal: "D", category: "F&B", hours: "05:00–22:30" },
  { name: "Terminal Grill", airport: "LHR", terminal: "5", category: "F&B", hours: "04:30–23:00" },
  { name: "Brasserie CDG", airport: "CDG", terminal: "2F", category: "F&B", hours: "06:00–22:00" },
];

function QRDisplay({ value, size = 200 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;
    // Simple QR-like visual using canvas (decorative for demo)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;

    const cellSize = size / 25;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Seed a pseudo-random pattern from value string
    let seed = value.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };

    ctx.fillStyle = "#0f172a";
    for (let r = 0; r < 25; r++) {
      for (let c = 0; c < 25; c++) {
        // Corner squares (finder patterns)
        const inFinder = (r < 8 && c < 8) || (r < 8 && c > 16) || (r > 16 && c < 8);
        if (inFinder) {
          const lr = r % 8, lc = c % 8;
          const outerRing = lr === 0 || lr === 6 || lc === 0 || lc === 6;
          const innerDot = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
          if (outerRing || innerDot) ctx.fillRect(c * cellSize, r * cellSize, cellSize - 0.5, cellSize - 0.5);
        } else {
          if (rand() > 0.5) ctx.fillRect(c * cellSize, r * cellSize, cellSize - 0.5, cellSize - 0.5);
        }
      }
    }
  }, [value, size]);

  return <canvas ref={canvasRef} style={{ width: size, height: size, borderRadius: 8 }} />;
}

export default function TravelerApp() {
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("wallet");
  const [qrVisible, setQrVisible] = useState(false);
  const [qrToken, setQrToken] = useState("");
  const [qrExpiry, setQrExpiry] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  // QR countdown timer
  useEffect(() => {
    if (!qrExpiry) return;
    const interval = setInterval(() => {
      const left = Math.max(0, Math.round((qrExpiry - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) {
        setQrVisible(false);
        setQrToken("");
        setQrExpiry(null);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [qrExpiry]);

  async function loadData() {
    setLoading(true);
    try {
      const me = await base44.auth.me();
      setUser(me);

      const [credits, txns] = await Promise.all([
        base44.entities.FnbDutyCredit.filter({ traveler_email: me.email, status: "active" }, "-created_date", 1),
        base44.entities.FnbTransaction.filter({ traveler_email: me.email }, "-created_date", 20),
      ]);

      setCredit(credits[0] || null);
      setTransactions(txns);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function generateQR() {
    if (!credit) return;
    const token = `DB-${credit.token_id}-${Date.now()}`;
    setQrToken(token);
    setQrExpiry(Date.now() + 5 * 60 * 1000); // 5 min
    setSecondsLeft(300);
    setQrVisible(true);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const balance = credit?.remaining_balance ?? 0;
  const dailyLimit = 60; // default, could come from policy
  const usedToday = transactions
    .filter(t => t.status === "approved" && t.timestamp?.startsWith(new Date().toISOString().split("T")[0]))
    .reduce((s, t) => s + (t.amount || 0), 0);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="bg-card border-b border-border px-5 pt-8 pb-4 flex items-center justify-between">
        <DutyBoostLogo height={80} />
        <div className="flex items-center gap-2">
          {user && <span className="text-xs text-muted-foreground">{user.full_name?.split(" ")[0]}</span>}
          <button onClick={() => base44.auth.logout("/")} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* ── WALLET TAB ── */}
        {tab === "wallet" && (
          <div className="px-5 py-6 space-y-5">
            {/* Balance card */}
            <div className="relative bg-gradient-to-br from-primary to-primary/70 rounded-3xl p-6 text-primary-foreground overflow-hidden shadow-lg">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 rounded-full pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <Wifi className="w-3.5 h-3.5 opacity-70" />
                  <span className="text-xs opacity-70 uppercase tracking-wider">DutyCredit Balance</span>
                </div>
                <p className="text-5xl font-heading font-bold mt-2">
                  €{balance.toFixed(2)}
                </p>
                {credit ? (
                  <div className="mt-4 flex items-center gap-3 flex-wrap">
                    <Badge className="bg-white/20 text-white border-white/20 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" /> Active
                    </Badge>
                    <span className="text-xs opacity-70">
                      Expires {new Date(credit.expiry).toLocaleDateString("nl-NL")}
                    </span>
                    {credit.airport && (
                      <span className="text-xs opacity-70 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {credit.airport}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-sm opacity-70 mt-3">No active credit assigned yet.</p>
                )}
              </div>
            </div>

            {/* Today's usage */}
            {credit && (
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Today's usage</span>
                  <span className="text-sm font-semibold">€{usedToday.toFixed(2)} / €{dailyLimit}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${Math.min((usedToday / dailyLimit) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  €{Math.max(dailyLimit - usedToday, 0).toFixed(2)} remaining today
                </p>
              </div>
            )}

            {/* QR section */}
            {credit && !qrVisible && (
              <button
                onClick={generateQR}
                className="w-full bg-primary text-primary-foreground rounded-2xl p-5 flex items-center justify-between hover:bg-primary/90 transition-colors shadow"
              >
                <div className="text-left">
                  <p className="font-heading font-bold text-lg">Pay at F&B outlet</p>
                  <p className="text-sm opacity-80">Generate your QR code</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <QrCode className="w-7 h-7" />
                </div>
              </button>
            )}

            {/* QR code display */}
            {qrVisible && (
              <div className="bg-card border border-border rounded-3xl p-6 flex flex-col items-center gap-4 shadow-lg">
                <div className="flex items-center justify-between w-full">
                  <span className="font-heading font-semibold text-sm">Present to cashier</span>
                  <Badge className={`text-xs ${secondsLeft > 60 ? "bg-green-100 text-green-700 border-green-200" : "bg-orange-100 text-orange-700 border-orange-200"}`}>
                    <Clock className="w-3 h-3 mr-1" />
                    {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
                  </Badge>
                </div>

                <div className="p-4 bg-white rounded-2xl shadow-inner border border-border">
                  <QRDisplay value={qrToken} size={220} />
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground font-mono">{qrToken.substring(0, 24)}…</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Valid for F&B only · Single use · €{balance.toFixed(2)} available
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 w-full"
                  onClick={() => { setQrVisible(false); setQrToken(""); setQrExpiry(null); }}
                >
                  Cancel
                </Button>
              </div>
            )}

            {/* No credit state */}
            {!credit && (
              <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-3">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto">
                  <Coffee className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold">No credit assigned yet</h3>
                <p className="text-sm text-muted-foreground">
                  Your travel manager will assign DutyCredit before your trip. Check back closer to your departure.
                </p>
                <Button variant="outline" size="sm" onClick={loadData} className="gap-2">
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ── HISTORY TAB ── */}
        {tab === "history" && (
          <div className="px-5 py-6 space-y-4">
            <h2 className="font-heading font-bold text-lg">Transaction History</h2>
            {transactions.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <History className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No transactions yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.map((tx, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.status === "approved" ? "bg-green-50" : "bg-red-50"}`}>
                        {tx.status === "approved"
                          ? <CheckCircle className="w-4.5 h-4.5 text-green-600" />
                          : <XCircle className="w-4.5 h-4.5 text-red-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tx.merchant_name || "Unknown merchant"}</p>
                        <p className="text-xs text-muted-foreground">
                          {tx.airport && `${tx.airport} · `}
                          {tx.timestamp ? new Date(tx.timestamp).toLocaleDateString("nl-NL") : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${tx.status === "approved" ? "text-foreground" : "text-muted-foreground line-through"}`}>
                        €{tx.amount?.toFixed(2)}
                      </p>
                      <Badge className={`text-xs mt-0.5 ${tx.status === "approved" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}>
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── OUTLETS TAB ── */}
        {tab === "outlets" && (
          <div className="px-5 py-6 space-y-4">
            <div>
              <h2 className="font-heading font-bold text-lg">Participating Outlets</h2>
              <p className="text-sm text-muted-foreground mt-1">F&B outlets where DutyCredit is accepted.</p>
            </div>
            <div className="space-y-2">
              {DEMO_OUTLETS.map((outlet, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                      <Utensils className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{outlet.name}</p>
                      <p className="text-xs text-muted-foreground">{outlet.airport} · Terminal {outlet.terminal} · {outlet.hours}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Active</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border px-4 py-2 flex items-center justify-around">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${tab === id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon className={`w-5 h-5 ${tab === id ? "stroke-[2.5]" : ""}`} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}