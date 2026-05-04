import { useTranslation } from "react-i18next";
import DutyBoostLogo from "./DutyBoostLogo";
import FooterLinks from "./FooterLinks";


export default function PageFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <DutyBoostLogo height={32} />
            <span className="text-xs text-muted-foreground">DutyBoost, a Borderless Solutions B.V. product</span>
          </div>
          <p>{t('footer.rights')}</p>
        </div>
        <FooterLinks />
      </div>
    </footer>
  );
}