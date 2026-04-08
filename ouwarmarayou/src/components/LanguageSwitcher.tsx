import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";

type Lang = "fr" | "en" | "ar";

const langs: { id: Lang; label: string; short: string; flagUrl: string }[] = [
  { id: "fr", label: "Français", short: "FR", flagUrl: "https://flagcdn.com/w40/fr.png" },
  { id: "en", label: "English", short: "EN", flagUrl: "https://flagcdn.com/w40/gb.png" },
  { id: "ar", label: "العربية", short: "AR", flagUrl: "https://flagcdn.com/w40/sa.png" },
];

const LanguageSwitcher = ({ compact = false }: { compact?: boolean }) => {
  const { i18n } = useTranslation();
  const [active, setActive] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("om_lang") as Lang) || "fr";
    }
    return "fr";
  });

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("om_lang", active);
    if (active === "ar") {
      root.setAttribute("dir", "rtl");
      root.setAttribute("lang", "ar");
    } else {
      root.setAttribute("dir", "ltr");
      root.setAttribute("lang", active === "en" ? "en" : "fr");
    }
    i18n.changeLanguage(active);
  }, [active, i18n]);

  return (
    <div className="relative glass-panel !rounded-full !p-1 flex items-center gap-0.5 !shadow-none !border-opacity-20 shrink-0">
      {langs.map((lang) => (
        <button
          key={lang.id}
          onClick={() => setActive(lang.id)}
          className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 z-10 ${
            active === lang.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {active === lang.id && (
            <motion.div
              layoutId="lang-indicator"
              className="absolute inset-0 rounded-full gradient-primary shadow-lg"
              style={{ boxShadow: '0 0 12px hsl(330 65% 55% / 0.3)' }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
            <img src={lang.flagUrl} alt={lang.short} className="w-4 h-4 shrink-0 object-cover rounded-full shadow-sm" />
            {!compact && <span>{lang.short}</span>}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
