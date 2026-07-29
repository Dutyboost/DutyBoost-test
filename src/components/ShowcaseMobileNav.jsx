import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "./DutyBoostLogo";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * Compact mobile-only showcase header: logo left, language switcher + gradient
 * calculator icon button right. Hidden on tablet/desktop (sm:hidden) where the
 * page's existing full nav remains.
 */
export default function ShowcaseMobileNav({ calculatorTo }) {
  return (
    <nav className="sm:hidden sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
      <div className="max-w-6xl mx-auto px-3 h-14 flex items-center justify-between gap-2">
        <Link to="/" className="hover:opacity-80 transition-opacity shrink-0">
          <DutyBoostLogo height={36} />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {calculatorTo && (
            <Link to={calculatorTo}>
              <Button
                size="icon"
                className="rounded-xl text-white shadow-sm"
                style={{ background: "linear-gradient(to right, #7c3aed, #6366f1)" }}
                aria-label="ROI Calculator"
              >
                <Calculator className="w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}