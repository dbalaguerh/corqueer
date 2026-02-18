import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import i18n from "@/i18n";
import { FlagCA, FlagES, FlagFR, FlagGB } from "@/components/FlagIcons";

const LANGUAGES = [
  { code: "ca", Flag: FlagCA },
  { code: "es", Flag: FlagES },
  { code: "en", Flag: FlagGB },
  { code: "fr", Flag: FlagFR },
];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];
  const CurrentFlag = current.Flag;

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  return (
    <div className="relative z-50">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-card border border-border shadow-card overflow-hidden"
        whileTap={{ scale: 0.9 }}
        aria-label="Canviar idioma"
      >
        <CurrentFlag size={28} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-11 z-50 flex flex-col gap-1 rounded-2xl bg-card border border-border shadow-elevated p-2"
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
                    className={`flex items-center justify-center rounded-xl p-2 transition-all ${
                      isActive
                        ? "ring-2 ring-primary bg-primary/10"
                        : "hover:bg-muted"
                    }`}
                  >
                    <lang.Flag size={32} />
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
