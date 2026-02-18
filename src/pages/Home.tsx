import { motion } from "framer-motion";
import { Megaphone, CalendarDays, Music, MessageSquare } from "lucide-react";
import logo from "@/assets/logo.png";
import RainbowBar from "@/components/RainbowBar";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";

const announcements = [
  {
    id: 1,
    title: "🎨 ART CARXOFA is coming!",
    body: "Prepareu-vos per l'event ART CARXOFA! Més informació molt aviat...",
    date: "17 feb 2026",
    pinned: true,
    color: "bg-block-coral",
  },
  {
    id: 2,
    title: "Concert de Primavera 🌸",
    body: "El proper 15 de març actuem al Palau de la Música!",
    date: "14 feb 2026",
    color: "bg-block-sky",
  },
  {
    id: 3,
    title: "Benvingudes noves veus! 🎶",
    body: "Donem la benvinguda a les 5 noves persones que s'han incorporat.",
    date: "5 feb 2026",
    color: "bg-block-lime",
  },
];

const Home = () => {
  const { profile } = useProfile();
  const { user } = useAuth();
  const displayName = profile?.name || user?.user_metadata?.name || user?.email?.split("@")[0];

  return (
    <div className="pb-safe">
      {/* Hero — logo molt gran */}
      <div className="relative overflow-hidden bg-card">
        <div className="flex flex-col items-center px-6 pt-3 pb-4">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full flex justify-center"
          >
            <img
              src={logo}
              alt="Logo La Clandestina"
              className="w-72 h-auto object-contain"
            />
          </motion.div>

          {displayName ? (
            <motion.div
              className="mt-4 text-center px-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="font-display leading-tight tracking-tight">
                <span className="text-xl font-normal text-muted-foreground">Hola, </span>
                <span
                  className="text-3xl font-extrabold"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--block-coral)), hsl(var(--block-amber)), hsl(var(--block-lime)), hsl(var(--block-sky)), hsl(var(--block-violet)), hsl(var(--block-rose)))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {displayName}!
                </span>
                <span className="text-2xl ml-1">✨</span>
              </p>
            </motion.div>
          ) : (
            <motion.p
              className="mt-5 text-sm font-medium text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Cor queer de Barcelona 🏳️‍🌈
            </motion.p>
          )}
        </div>
        <RainbowBar className="h-[5px]" />
      </div>

      {/* Quick Actions — grid de blocs de colors */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-3 gap-3">
          <motion.a
            href="/calendari"
            className="group flex flex-col gap-3 rounded-2xl p-4 shadow-card border border-border bg-card overflow-hidden relative"
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-block-sky" />
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-block-sky">
              <CalendarDays className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold font-display text-foreground">Calendari</p>
              <p className="text-[10px] text-muted-foreground">Pròxims events</p>
            </div>
          </motion.a>

          <motion.a
            href="/repertori"
            className="group flex flex-col gap-3 rounded-2xl p-4 shadow-card border border-border bg-card overflow-hidden relative"
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-block-violet" />
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-block-violet">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold font-display text-foreground">Repertori</p>
              <p className="text-[10px] text-muted-foreground">Cançons i àudios</p>
            </div>
          </motion.a>

          <motion.a
            href="/mur"
            className="group flex flex-col gap-3 rounded-2xl p-4 shadow-card border border-border bg-card overflow-hidden relative"
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-block-coral" />
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-block-coral">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold font-display text-foreground">El Mur</p>
              <p className="text-[10px] text-muted-foreground">Idees i àudios</p>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Announcements */}
      <div className="px-4 mt-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-block-coral">
            <Megaphone className="h-4 w-4 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold font-display text-foreground">Anuncis</h2>
        </div>
        <div className="space-y-3">
          {announcements.map((a, i) => (
            <motion.div
              key={a.id}
              className="rounded-2xl bg-card border border-border p-4 shadow-card overflow-hidden relative"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
            >
              <div className={`absolute top-0 left-0 w-1.5 h-full ${a.color}`} />
              <div className="pl-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold font-display text-foreground">{a.title}</h3>
                  {a.pinned && (
                    <span className="shrink-0 rounded-full bg-block-coral px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                      📌 Fixat
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                <p className="mt-2 text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wide">{a.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
