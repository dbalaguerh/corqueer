import { motion } from "framer-motion";
import { Megaphone, CalendarDays, Music, Sparkles } from "lucide-react";
import logo from "@/assets/logo.jpg";
import RainbowBar from "@/components/RainbowBar";
import { useProfile } from "@/hooks/useProfile";

const announcements = [
  {
    id: 1,
    title: "🎨 ART CARXOFA is coming!",
    body: "Prepareu-vos per l'event ART CARXOFA! Més informació molt aviat...",
    date: "17 feb 2026",
    pinned: true,
  },
  {
    id: 2,
    title: "Concert de Primavera 🌸",
    body: "El proper 15 de març actuem al Palau de la Música! Confirmeu assistència abans del 28 de febrer.",
    date: "14 feb 2026",
  },
  {
    id: 3,
    title: "Benvingudes noves veus! 🎶",
    body: "Donem la benvinguda a les 5 noves persones que s'han incorporat aquest trimestre.",
    date: "5 feb 2026",
  },
];

const Home = () => {
  const { profile } = useProfile();

  return (
    <div className="pb-safe">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-rainbow-red/10 blur-[80px] -translate-y-10 translate-x-10" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-rainbow-blue/15 blur-[60px] translate-y-10 -translate-x-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent/10 blur-[100px]" />
        
        <div className="relative flex flex-col items-center px-6 pt-8 pb-5">
          <motion.div
            className="relative"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="h-40 w-40 rounded-[2rem] overflow-hidden shadow-elevated ring-2 ring-primary/20">
              <img
                src={logo}
                alt="Logo La Clandestina"
                className="h-full w-full object-cover logo-transparent"
              />
            </div>
          </motion.div>
          
          {profile && (
            <motion.p
              className="mt-5 text-lg font-bold font-display text-foreground"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hola, <span className="text-gradient-rainbow">{profile.name}</span>! 
              <Sparkles className="inline h-4 w-4 ml-1 text-accent" />
            </motion.p>
          )}
          {!profile && (
            <motion.p
              className="mt-5 text-sm font-medium text-muted-foreground flex items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Cor queer de Barcelona
              <span className="text-gradient-rainbow font-bold">🏳️‍🌈</span>
            </motion.p>
          )}
        </div>
        <RainbowBar className="h-[5px]" />
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
            <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-rainbow">
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
            <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-genz">
              <Music className="h-5 w-5 text-primary-foreground" />
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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-rainbow">
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
                  ? "gradient-rainbow/10 border-primary/30 ring-1 ring-primary/15"
                  : "bg-card border-border"
              }`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold font-display text-foreground">{a.title}</h3>
                {a.pinned && (
                  <span className="shrink-0 rounded-full gradient-rainbow px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
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
