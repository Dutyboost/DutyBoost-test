import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
];

export default function LanguageSwitcher({ className = "", allowedLanguages = null }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const languages = allowedLanguages
    ? LANGUAGES.filter((l) => allowedLanguages.includes(l.code))
    : LANGUAGES;
  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span>{current.flag} {current.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-lg z-50 py-1 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-secondary transition-colors ${
                lang.code === i18n.language ? "font-semibold text-primary" : "text-foreground"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}