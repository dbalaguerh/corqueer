import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ChevronDown, Play, FileText } from "lucide-react";
import RainbowBar from "@/components/RainbowBar";

interface Song {
  id: number;
  title: string;
  hasAudio: boolean;
  lyrics?: string;
}

const songs: Song[] = [
  { id: 1, title: "CANT DE LLUITA", hasAudio: false },
  { id: 2, title: "PERDUDA EN TU", hasAudio: false },
  { id: 3, title: "FOC AL COR", hasAudio: false },
  { id: 4, title: "SI TE'N VAS", hasAudio: false },
  { id: 5, title: "CLANDESTINA", hasAudio: false },
  { id: 6, title: "DUETTO DI DUE GATTI", hasAudio: false },
];

const blockColorClasses = [
  "bg-block-coral",
  "bg-block-amber",
  "bg-block-lime",
  "bg-block-sky",
  "bg-block-violet",
  "bg-block-rose",
];

const Repertori = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="pb-safe">
      <header className="relative overflow-hidden bg-card border-b border-border">
        <div className="relative px-4 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-block-violet">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold font-display text-foreground tracking-tight">Repertori</h1>
              <p className="text-xs text-muted-foreground">{songs.length} cançons al repertori actual</p>
            </div>
          </div>
        </div>
        <RainbowBar className="h-[4px]" />
      </header>

      <div className="px-4 mt-4 space-y-3">
        {songs.map((song, i) => (
          <motion.div
            key={song.id}
            className="rounded-2xl bg-card border border-border shadow-card overflow-hidden relative"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
          >
            <div className={`absolute left-0 top-0 w-1.5 h-full ${blockColorClasses[i % blockColorClasses.length]}`} />
            <button
              onClick={() => setExpanded(expanded === song.id ? null : song.id)}
              className="w-full flex items-center justify-between p-4 pl-5 text-left"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`h-10 w-10 rounded-xl ${blockColorClasses[i % blockColorClasses.length]} flex items-center justify-center shrink-0`}>
                  <span className="text-primary-foreground font-extrabold font-display text-sm">{i + 1}</span>
                </div>
                <h3 className="text-sm font-bold font-display text-foreground truncate">{song.title}</h3>
              </div>
              <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 ml-2 transition-transform duration-200 ${expanded === song.id ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {expanded === song.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-border pt-3 space-y-3 pl-5">
                    {song.lyrics && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Lletra</span>
                        </div>
                        <p className="text-xs text-foreground leading-relaxed whitespace-pre-line bg-muted/50 rounded-xl p-3">
                          {song.lyrics}
                        </p>
                      </div>
                    )}
                    {song.hasAudio && (
                      <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-card">
                        <Play className="h-4 w-4" />
                        Escoltar àudio d'assaig
                      </button>
                    )}
                    {!song.lyrics && !song.hasAudio && (
                      <p className="text-xs text-muted-foreground italic">Puja els fitxers (MP3 i lletres) al xat per afegir contingut aquí.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Repertori;
