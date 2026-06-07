import { useTranslation } from "react-i18next";
import DutyBoostLogo from "./DutyBoostLogo";
import FooterLinks from "./FooterLinks";

export default function PageFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            <DutyBoostLogo height={55} />
          </div>
          <div className="text-right">
            <p>{t('footer.rights')}</p>
            <p className="text-xs mt-0.5">{t('footer.kvk')}</p>
            <p className="text-xs mt-0.5">{t('footer.vat')}</p>
          </div>
        </div>
        <FooterLinks />
      </div>
    </footer>
  );
}