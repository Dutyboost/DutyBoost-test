import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Switch } from "@/components/ui/switch";
import { Bell, BellOff } from "lucide-react";
import { toast } from "sonner";

export default function NotificationPreferences() {
  const [prefs, setPrefs] = useState({ redeemed: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (user.notification_prefs) {
        try { setPrefs(JSON.parse(user.notification_prefs)); } catch {}
      }
      setLoading(false);
    });
  }, []);

  const updatePref = async (key, value) => {
    const newPrefs = { ...prefs, [key]: value };
    setPrefs(newPrefs);
    await base44.auth.updateMe({ notification_prefs: JSON.stringify(newPrefs) });
    toast.success("Notification settings updated");
  };

  if (loading) return null;

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bell className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold">Notification Settings</h3>
          <p className="text-xs text-muted-foreground">Control which email notifications you receive</p>
        </div>
      </div>

      <div className="divide-y divide-border">
        <div className="flex items-center justify-between py-3">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">DutyCredit Redeemed</p>
            <p className="text-xs text-muted-foreground">Get notified when a traveler redeems a DutyCredit from one of your bookings</p>
          </div>
          <Switch
            checked={prefs.redeemed !== false}
            onCheckedChange={(val) => updatePref("redeemed", val)}
          />
        </div>
      </div>
    </div>
  );
}