import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WeCallYouForm from "./WeCallYouForm";

export default function WeCallYouModal({ trigger }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && trigger(setOpen)}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>We'll Call You</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Leave your details and we'll give you a call to discuss your needs.
        </p>
        <div className="mt-4">
          <WeCallYouForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}