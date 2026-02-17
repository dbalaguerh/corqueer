import { motion } from "framer-motion";
import { Megaphone, CalendarDays, Music, Sparkles } from "lucide-react";
import logo from "@/assets/logo.jpg";
import RainbowBar from "@/components/RainbowBar";

const announcements = [
  {
    id: 1,
    title: "Concert de Primavera 🌸",
    body: "El proper 15 de març actuem al Palau de la Música! Confirmeu assistència abans del 28 de febrer.",
    date: "14 feb 2026",
    pinned: true,
  },
  {
    id: 2,
    title: "Canvi d'horari d'assaig",
    body: "A partir de març els assajos seran els dimecres de 19:30 a 21:30.",
    date: "10 feb 2026",
  },
  {
    id: 3,
    title: "Benvingudes noves veus! 🎶",
    body: "Donem la benvinguda a les 5 noves persones que s'han incorporat aquest trimestre.",
    date: "5 feb 2026",
  },
];

const Home = () => {
  return (
    <div className="pb-safe">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/10 blur-3xl -translate-y-10 translate-x-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent/20 blur-3xl translate-y-10 -translate-x-10" />
        
        <div className="relative flex flex-col items-center px-6 pt-10 pb-6">
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="h-28 w-28 rounded-3xl overflow-hidden shadow-elevated ring-2 ring-primary/20">
              <img
                src={logo}
                alt="Logo La Clandestina"
                className="h-full w-full object-cover logo-transparent"
              />
            </div>
          </motion.div>
          
          <motion.h1
            className="mt-5 text-3xl font-extrabold font-display text-foreground tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            La Clandestina
          </motion.h1>
          <motion.p
            className="mt-1.5 text-sm font-medium text-muted-foreground flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Cor queer de Barcelona
            <span className="text-gradient-rainbow font-bold">🏳️‍🌈</span>
          </motion.p>
        </div>
        <RainbowBar />
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-3">
          <motion.a
            href="/calendari"
            className="group flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-card border border-border hover:shadow-elevated transition-shadow"
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary">
              <CalendarDays className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold font-display text-foreground">Calendari</p>
              <p className="text-xs text-muted-foreground">Pròxims events</p>
            </div>
          </motion.a>
          <motion.a
            href="/repertori"
            className="group flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-card border border-border hover:shadow-elevated transition-shadow"
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
              <Music className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold font-display text-foreground">Repertori</p>
              <p className="text-xs text-muted-foreground">Cançons i àudios</p>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Announcements */}
      <div className="px-4 mt-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Megaphone className="h-4 w-4 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold font-display text-foreground">Anuncis</h2>
        </div>
        <div className="space-y-3">
          {announcements.map((a, i) => (
            <motion.div
              key={a.id}
              className={`rounded-2xl p-4 border shadow-card ${
                a.pinned
                  ? "bg-primary/5 border-primary/20 ring-1 ring-primary/10"
                  : "bg-card border-border"
              }`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold font-display text-foreground">{a.title}</h3>
                {a.pinned && (
                  <span className="shrink-0 rounded-full gradient-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                    📌 Fixat
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{a.body}</p>
              <p className="mt-2 text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wide">{a.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
