import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plane, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AirportsPage() {
  const [airports, setAirports] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", code: "", city: "", country: "" });

  const loadAirports = () => base44.entities.Airport.list().then(setAirports);

  useEffect(() => { loadAirports(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await base44.entities.Airport.create(form);
    toast.success("Airport added!");
    setDialogOpen(false);
    setForm({ name: "", code: "", city: "", country: "" });
    loadAirports();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold tracking-tight">Airports</h1>
          <p className="text-muted-foreground mt-1">Manage departure airports for voucher generation.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Airport</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Airport</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Airport Name</Label>
                <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Amsterdam Schiphol" />
              </div>
              <div className="space-y-2">
                <Label>IATA Code</Label>
                <Input value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} required placeholder="AMS" maxLength={3} />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input value={form.city} onChange={e => setForm({...form, city: e.target.value})} required placeholder="Amsterdam" />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input value={form.country} onChange={e => setForm({...form, country: e.target.value})} required placeholder="Netherlands" />
              </div>
              <Button type="submit" className="w-full">Add Airport</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {airports.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center text-muted-foreground">
          <Plane className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No airports added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {airports.map(a => (
            <div key={a.id} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="font-heading font-bold text-primary">{a.code}</span>
                </div>
                <div>
                  <p className="font-medium">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{a.city}, {a.country}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={async () => {
                await base44.entities.Airport.delete(a.id);
                toast.success("Airport removed");
                loadAirports();
              }}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}