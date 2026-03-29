import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import {
  Plane,
  TicketPercent,
  Store,
  LayoutDashboard,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const roleNavItems = {
  admin: [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Vouchers", path: "/vouchers", icon: TicketPercent },
    { label: "Retailers", path: "/retailers", icon: Store },
    { label: "Airports", path: "/airports", icon: Plane },
    { label: "Admin", path: "/admin", icon: ShieldCheck },
  ],
  agency: [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Vouchers", path: "/vouchers", icon: TicketPercent },
  ],
  retailer: [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "My Store", path: "/retailer-dashboard", icon: Store },
  ],
};

export default function Layout() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const role = user?.role || "agency";
  const navItems = roleNavItems[role] || roleNavItems.agency;

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
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">
              DutyBoost
            </span>
          </Link>
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
                <Icon className="w-4.5 h-4.5" />
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
              <p className="text-xs text-muted-foreground capitalize">{role}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => base44.auth.logout()}
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
            <span className="font-heading font-bold text-lg">DutyBoost</span>
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