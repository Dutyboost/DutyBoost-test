import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "./DutyBoostLogo";
import {
  Plane,
  TicketPercent,
  Store,
  LayoutDashboard,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ScanLine,
  Code2,
  Building2,
  Car,
  BarChart2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const roleNavItems = {
  admin: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "DutyCredits", path: "/vouchers", icon: TicketPercent },
    { label: "Airport Retailer Dashboard", path: "/retailer-dashboard", icon: Store },
    { label: "Travel Partner Dashboard", path: "/travel-partner-dashboard", icon: Plane },
    { label: "POS Partner Dashboard", path: "/pos-partner-dashboard", icon: Code2 },
    { label: "Scan & Redeem", path: "/scan-redeem", icon: ScanLine },
    { label: "DutyBoost Dashboard", path: "/DutyBoost-Dashboard", icon: BarChart2 },
    { label: "Admin", path: "/admin", icon: ShieldCheck },
  ],
  agency: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "DutyCredits", path: "/vouchers", icon: TicketPercent },
    { label: "Travel Partner Integration", path: "/travel-partner-integration" },
  ],
  retailer: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "My Store", path: "/retailer-dashboard", icon: Store },
    { label: "Scan & Redeem", path: "/scan-redeem", icon: ScanLine },
  ],
  user: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ],
};

export default function Layout() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    // Paths that can be viewed without a login, so the dashboard can be
    // demonstrated to a prospective retailer straight from a shared link.
    const demoPaths = [
      "/retailer-dashboard",
      "/travel-partner-dashboard",
      "/pos-partner-dashboard",
    ];
    const isDemoPath = demoPaths.some(
      (p) => window.location.pathname === p || window.location.pathname.startsWith(`${p}/`)
    );
    base44.auth.me()
      .then(u => {
        if (!u) {
          if (isDemoPath) { setDemoMode(true); setAuthReady(true); return; }
          window.location.replace('/login');
          return;
        }
        if (!u.role) { window.location.replace('/get-started'); return; }
        setUser(u);
        setAuthReady(true);
      })
      .catch(() => {
        if (isDemoPath) { setDemoMode(true); setAuthReady(true); return; }
        window.location.replace('/login');
      });
  }, []);

  if (!authReady) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Demo view: full-screen, without the signed-in navigation shell
  if (demoMode) return <Outlet />;

  const role = user?.role || "agency";
  const navItems = roleNavItems[role] || roleNavItems.agency;

  const getRoleLabel = (roleValue) => {
    const roleMap = {
      agency: "Travel Agency",
      retailer: "Airport Retailer",
      admin: "Admin",
      user: "Partner",
    };
    return roleMap[roleValue] || roleValue;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-border">
           <DutyBoostLogo height={55} linkTo="/dashboard" />
         </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {Icon && <Icon className="w-4.5 h-4.5" />}
                {item.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
              {user?.full_name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.full_name || "User"}</p>
              <p className="text-xs text-muted-foreground">{getRoleLabel(role)}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => base44.auth.logout('/')}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border lg:hidden">
          <div className="flex items-center justify-between px-4 h-14">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <DutyBoostLogo height={55} />
            <div className="w-10" />
          </div>
        </header>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}