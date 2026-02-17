import { useState } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.jpg";

interface OnboardingProps {
  onComplete: (data: { name: string; pronouns: string }) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");

  const pronounOptions = ["ella/ella", "ell/ell", "elle/elle", "sense preferència"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="absolute inset-0 gradient-warm" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-accent/15 blur-[80px]" />
      
      <motion.div
        className="relative z-10 flex flex-col items-center px-8 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="h-32 w-32 rounded-[2rem] overflow-hidden shadow-elevated ring-2 ring-primary/20">
            <img src={logo} alt="La Clandestina" className="h-full w-full object-cover logo-transparent" />
          </div>
        </motion.div>

        <motion.p
          className="mt-6 text-lg font-bold font-display text-foreground text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Benvingud@ al cor! 🏳️‍🌈
        </motion.p>
        <p className="mt-1 text-sm text-muted-foreground text-center">Com et dius?</p>

        <motion.div
          className="mt-6 w-full space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="El teu nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            autoFocus
          />

          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Pronoms (opcional)</p>
            <div className="flex flex-wrap gap-2">
              {pronounOptions.map((p) => (
                <button
                  key={p}
                  onClick={() => setPronouns(pronouns === p ? "" : p)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                    pronouns === p
                      ? "gradient-rainbow text-primary-foreground shadow-card"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!name.trim()}
            onClick={() => onComplete({ name: name.trim(), pronouns })}
            className="w-full rounded-2xl gradient-rainbow py-3.5 text-sm font-bold text-primary-foreground shadow-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            Endavant! ✨
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
