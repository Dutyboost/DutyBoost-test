import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const NAV_ITEMS = [
  { id: "challenge", key: "challenge" },
  { id: "solution", key: "solution" },
  { id: "retailers", key: "retailers" },
  { id: "projection", key: "projection" },
  { id: "summary", key: "summary" },
];

export default function PresentationNav() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("challenge");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-16 sm:top-20 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-2">
          {NAV_ITEMS.map((item, i) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-accent"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{t(`presentation.nav.${item.key}`)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}