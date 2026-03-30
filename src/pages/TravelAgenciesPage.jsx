import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Globe, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function TravelAgenciesPage() {
  const [agencies, setAgencies] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", website: "", country: "Netherlands" });

  const loadAgencies = () => base44.entities.TravelAgency.list().then(setAgencies);

  useEffect(() => { loadAgencies(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await base44.entities.TravelAgency.create(form);
    toast.success("Travel agency added!");
    setDialogOpen(false);
    setForm({ name: "", website: "", country: "Netherlands" });
    loadAgencies();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold tracking-tight">Travel Agencies</h1>
          <p className="text-muted-foreground mt-1">Partner travel agencies on the DutyBoost platform.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Agency</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Travel Agency</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Agency Name</Label>
                <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="e.g., Vliegtickets.nl" />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input value={form.website} onChange={e => setForm({...form, website: e.target.value})} required placeholder="https://example.nl" type="url" />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input value={form.country} onChange={e => setForm({...form, country: e.target.value})} required placeholder="Netherlands" />
              </div>
              <Button type="submit" className="w-full">Add Agency</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {agencies.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center text-muted-foreground">
          <Globe className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No travel agencies added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agencies.map(a => (
            <div key={a.id} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{a.name}</p>
                  <a href={a.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate block">{a.website}</a>
                  <p className="text-xs text-muted-foreground mt-1">{a.country}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={async () => {
                await base44.entities.TravelAgency.delete(a.id);
                toast.success("Travel agency removed");
                loadAgencies();
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