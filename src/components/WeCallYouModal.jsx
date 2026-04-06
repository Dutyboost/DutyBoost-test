import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WeCallYouForm from "./WeCallYouForm";
import { useTranslation } from "react-i18next";

export default function WeCallYouModal({ trigger }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && trigger(setOpen)}
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('wecallyou.modal_title')}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          {t('wecallyou.modal_subtitle')}
        </p>
        <WeCallYouForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}