import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GetInTouchForm from "./GetInTouchForm";

export default function GetInTouchModal({ trigger }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && trigger(setOpen)}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <GetInTouchForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}