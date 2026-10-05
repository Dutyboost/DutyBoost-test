import { Globe } from "lucide-react";
import { useDeckLang } from "./LanguageContext";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export default function LanguageToggle() {
  const { lang, setLang, t } = useDeckLang();

  return (
    <div className="flex items-center gap-2" aria-label={t.chrome.language}>
      <Globe size={16} className="text-slate-400" aria-hidden="true" />
      <div className="flex rounded-xl overflow-hidden border border-white/15">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={lang === l.code}
            className={`px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer select-none ${
              lang === l.code ? "bg-white text-[#0a0f1e]" : "bg-white/10 text-slate-300 hover:bg-white/20"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}