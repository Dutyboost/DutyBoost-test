import { useTranslation } from "react-i18next";
import DutyBoostLogo from "./DutyBoostLogo";
import FooterLinks from "./FooterLinks";


export default function PageFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <DutyBoostLogo height={150} />
            <span>{t('footer.tagline')}</span>
          </div>
          <p>{t('footer.rights')}</p>
        </div>
        <FooterLinks />
      </div>
    </footer>
  );
}