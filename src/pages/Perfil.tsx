import { motion } from "framer-motion";
import { User, Mail, LogOut, Settings } from "lucide-react";
import RainbowBar from "@/components/RainbowBar";

const mockUser = {
  name: "Alex García",
  email: "alex@example.com",
  pronouns: "ell/ella",
  voice: "Alto",
};

const voiceBadge: Record<string, string> = {
  Soprano: "bg-rainbow-red/15 text-rainbow-red",
  Alto: "bg-rainbow-orange/15 text-rainbow-orange",
  Tenor: "bg-rainbow-blue/15 text-rainbow-blue",
  Baix: "bg-rainbow-purple/15 text-rainbow-purple",
};

const Perfil = () => {
  return (
    <div className="pb-safe">
      <header className="relative overflow-hidden bg-card border-b border-border">
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative px-4 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-extrabold font-display text-foreground tracking-tight">Perfil</h1>
          </div>
        </div>
        <RainbowBar />
      </header>

      <div className="px-4 mt-8">
        {/* Avatar + Info */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="h-24 w-24 rounded-3xl gradient-primary flex items-center justify-center shadow-elevated">
            <span className="text-3xl font-extrabold text-primary-foreground font-display">
              {mockUser.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <h2 className="mt-4 text-xl font-extrabold font-display text-foreground tracking-tight">{mockUser.name}</h2>
          {mockUser.pronouns && (
            <p className="text-sm text-muted-foreground">{mockUser.pronouns}</p>
          )}
          <span className={`mt-2 rounded-full px-3.5 py-1 text-xs font-bold ${voiceBadge[mockUser.voice]}`}>
            {mockUser.voice}
          </span>
        </motion.div>

        {/* Info cards */}
        <div className="mt-8 space-y-3">
          <motion.div
            className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-card"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Correu electrònic</p>
              <p className="text-sm font-semibold text-foreground">{mockUser.email}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-card cursor-pointer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">Editar perfil</p>
          </motion.div>

          <motion.button
            className="flex w-full items-center gap-3 rounded-2xl bg-destructive/8 border border-destructive/15 p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
              <LogOut className="h-5 w-5 text-destructive" />
            </div>
            <p className="text-sm font-bold text-destructive">Tancar sessió</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
