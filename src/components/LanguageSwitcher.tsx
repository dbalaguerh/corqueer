import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import i18n from "@/i18n";

const LANGUAGES = [
  { code: "ca", flag: "🇨🇦" },
  { code: "es", flag: "🇪🇸" },
  { code: "en", flag: "🇬🇧" },
  { code: "fr", flag: "🇫🇷" },
];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  return (
    <div className="relative z-50">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-card border border-border shadow-card text-lg"
        whileTap={{ scale: 0.9 }}
        aria-label="Canviar idioma"
      >
        {current.flag}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-11 z-50 flex flex-col gap-1 rounded-2xl bg-card border border-border shadow-elevated p-2 min-w-[80px]"
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {LANGUAGES.map((lang) => {
                const isActive = i18n.language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
