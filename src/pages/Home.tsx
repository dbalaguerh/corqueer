import { motion } from "framer-motion";
import { Megaphone, CalendarDays, Music } from "lucide-react";
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
      <div className="relative overflow-hidden bg-card">
        <div className="absolute inset-0 gradient-warm opacity-80" />
        <div className="relative flex flex-col items-center px-6 pt-8 pb-6">
          <motion.img
            src={logo}
            alt="Logo La Clandestina"
            className="h-24 w-24 rounded-2xl shadow-elevated object-cover"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
          <motion.h1
            className="mt-4 text-2xl font-bold font-display text-foreground text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            La Clandestina
          </motion.h1>
          <motion.p
            className="mt-1 text-sm text-muted-foreground text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Cor queer de Barcelona 🏳️‍🌈
          </motion.p>
        </div>
        <RainbowBar />
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-5">
        <div className="grid grid-cols-2 gap-3">
          <motion.a
            href="/calendari"
            className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card border border-border"
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Calendari</p>
              <p className="text-xs text-muted-foreground">Pròxims events</p>
            </div>
          </motion.a>
          <motion.a
            href="/repertori"
            className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card border border-border"
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Repertori</p>
              <p className="text-xs text-muted-foreground">Cançons i àudios</p>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Announcements */}
      <div className="px-4 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Megaphone className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold font-display text-foreground">Anuncis</h2>
        </div>
        <div className="space-y-3">
          {announcements.map((a, i) => (
            <motion.div
              key={a.id}
              className={`rounded-xl p-4 border shadow-card ${
                a.pinned
                  ? "bg-accent/50 border-primary/30"
                  : "bg-card border-border"
              }`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
                {a.pinned && (
                  <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Fixat
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{a.body}</p>
              <p className="mt-2 text-xs text-muted-foreground/70">{a.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
