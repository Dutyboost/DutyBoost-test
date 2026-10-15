import { createContext, useContext } from "react";

// Accent palette for the store calculator. Every value is a literal Tailwind
// class string so the build never purges it.
export const CALCULATOR_THEMES = {
  teal: {
    selectRing: "focus:ring-teal-500/40",
    fieldRing: "[&_input]:focus-visible:ring-teal-500/40",
    inputRing: "focus:ring-teal-500/40",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    infoBox: "bg-teal-50 border-teal-100",
    accentText: "text-teal-600",
    softBg: "bg-teal-50",
    highlightBox: "bg-teal-50 border-teal-200",
    highlightText: "text-teal-700",
    totalsHighlight: "bg-teal-500/15 border-teal-400/40",
    totalsHighlightText: "text-teal-300",
    ctaGradient: "from-teal-400 to-cyan-600",
    ctaSubtext: "text-cyan-50",
    ctaButton: "text-teal-600 hover:bg-teal-50",
  },
  purple: {
    selectRing: "focus:ring-indigo-500/40",
    fieldRing: "[&_input]:focus-visible:ring-indigo-500/40",
    inputRing: "focus:ring-indigo-500/40",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    infoBox: "bg-indigo-50 border-indigo-100",
    accentText: "text-indigo-600",
    softBg: "bg-indigo-50",
    highlightBox: "bg-indigo-50 border-indigo-200",
    highlightText: "text-indigo-700",
    totalsHighlight: "bg-indigo-500/15 border-indigo-400/40",
    totalsHighlightText: "text-indigo-300",
    ctaGradient: "from-indigo-400 to-blue-600",
    ctaSubtext: "text-indigo-50",
    ctaButton: "text-indigo-600 hover:bg-indigo-50",
  },
};

const CalculatorThemeContext = createContext(CALCULATOR_THEMES.teal);

export const CalculatorThemeProvider = CalculatorThemeContext.Provider;

export const useCalculatorTheme = () => useContext(CalculatorThemeContext);