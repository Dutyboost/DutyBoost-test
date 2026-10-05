import { createContext, useContext, useMemo, useState } from "react";
import { COPY } from "./copy";

// Deck-scoped language: English and Spanish only, held locally so the deck can
// be presented in either language without touching the rest of the app.
const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const value = useMemo(() => ({ lang, setLang, t: COPY[lang] }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useDeckLang() {
  return useContext(LangContext) || { lang: "en", setLang: () => {}, t: COPY.en };
}