import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Send } from "lucide-react";
import { toast } from "sonner";

export default function BatchPayoutApproval({ user }) {
  const [payouts, setPayouts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const loadPayouts = async () => {
      try {
        // Fetch TravelAgencies to display as pending payouts
        const agencies = await base44.entities.TravelAgency.list();
        setPayouts(agencies.map(a => ({ id: a.id, agency_name: a.name, amount: 0 })));
      } catch (e) {
        console.error('Failed to load payouts', e);
      }
      setLoading(false);
    };
    loadPayouts();
  }, []);

  const handleApprove = async () => {
    if (selectedIds.length === 0) {
      toast.error("Select at least one agency");
      return;
    }

    setProcessing(true);
    try {
      const res = await base44.functions.invoke('executeBatchPayouts', {
        approved_agency_ids: selectedIds
      });
      toast.success(`Payouts processed: ${res.data.successful} successful`);
      setSelectedIds([]);
      setPayouts(payouts.filter(p => !selectedIds.includes(p.id)));
    } catch (e) {
      toast.error(e.message);
    }
    setProcessing(false);
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (loading) {
    return <div className="text-center py-8">Loading payouts...</div>;
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        <h3 className="font-heading font-semibold">Batch Payout Approval</h3>
      </div>
      
      {payouts.length === 0 ? (
        <p className="text-muted-foreground text-sm">No pending payouts</p>
      ) : (
        <>
          <div className="space-y-2 max-h-64 overflow-y-auto border border-border rounded-lg p-3">
            {payouts.map(p => (
              <label key={p.id} className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer">
                <Checkbox
                  checked={selectedIds.includes(p.id)}
                  onCheckedChange={(checked) => {
                    setSelectedIds(checked 
                      ? [...selectedIds, p.id]
                      : selectedIds.filter(id => id !== p.id)
                    );
                  }}
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{p.agency_name || p.agency_id}</p>
                  <p className="text-muted-foreground text-xs">€{p.amount?.toFixed(2) || '0.00'}</p>
                </div>
              </label>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleApprove} 
              disabled={selectedIds.length === 0 || processing}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Approve {selectedIds.length} Payout{selectedIds.length !== 1 ? 's' : ''}
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}