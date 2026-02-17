import { motion } from "framer-motion";
import { User, Mail, LogOut, Settings } from "lucide-react";
import RainbowBar from "@/components/RainbowBar";

const mockUser = {
  name: "Alex García",
  email: "alex@example.com",
  pronouns: "ell/ella",
  voice: "Alto",
  avatar: null,
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
      <header className="bg-card border-b border-border">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold font-display text-foreground">Perfil</h1>
          </div>
        </div>
        <RainbowBar />
      </header>

      <div className="px-4 mt-6">
        {/* Avatar + Info */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center shadow-elevated">
            <span className="text-2xl font-bold text-primary-foreground font-display">
              {mockUser.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <h2 className="mt-3 text-lg font-bold font-display text-foreground">{mockUser.name}</h2>
          {mockUser.pronouns && (
            <p className="text-sm text-muted-foreground">{mockUser.pronouns}</p>
          )}
          <span className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${voiceBadge[mockUser.voice]}`}>
            {mockUser.voice}
          </span>
        </motion.div>

        {/* Info cards */}
        <div className="mt-6 space-y-3">
          <motion.div
            className="flex items-center gap-3 rounded-xl bg-card border border-border p-4 shadow-card"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Correu electrònic</p>
              <p className="text-sm font-medium text-foreground">{mockUser.email}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 rounded-xl bg-card border border-border p-4 shadow-card"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Settings className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">Editar perfil</p>
          </motion.div>

          <motion.button
            className="flex w-full items-center gap-3 rounded-xl bg-destructive/10 border border-destructive/20 p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="h-5 w-5 text-destructive" />
            <p className="text-sm font-semibold text-destructive">Tancar sessió</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
