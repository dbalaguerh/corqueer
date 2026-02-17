import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ChevronDown, Play, FileText } from "lucide-react";
import RainbowBar from "@/components/RainbowBar";

interface Song {
  id: number;
  title: string;
  composer: string;
  voices: string[];
  lyrics?: string;
  hasAudio: boolean;
}

const songs: Song[] = [
  {
    id: 1,
    title: "Somewhere Over the Rainbow",
    composer: "Harold Arlen",
    voices: ["Soprano", "Alto", "Tenor", "Baix"],
    lyrics: "Somewhere over the rainbow, way up high\nThere's a land that I heard of once in a lullaby\nSomewhere over the rainbow, skies are blue\nAnd the dreams that you dare to dream really do come true…",
    hasAudio: true,
  },
  {
    id: 2,
    title: "True Colors",
    composer: "Cyndi Lauper / Tom Kelly",
    voices: ["Soprano", "Alto"],
    lyrics: "You with the sad eyes\nDon't be discouraged\nOh, I realize\nIt's hard to take courage\nIn a world full of people\nYou can lose sight of it all…",
    hasAudio: true,
  },
  {
    id: 3,
    title: "Born This Way",
    composer: "Lady Gaga",
    voices: ["Alto", "Tenor", "Baix"],
    lyrics: "It doesn't matter if you love him, or capital H-I-M\nJust put your paws up\n'Cause you were born this way, baby…",
    hasAudio: false,
  },
  {
    id: 4,
    title: "I Am What I Am",
    composer: "Jerry Herman",
    voices: ["Soprano", "Tenor"],
    hasAudio: true,
  },
];

const voiceColors: Record<string, string> = {
  Soprano: "bg-rainbow-red/15 text-rainbow-red",
  Alto: "bg-rainbow-orange/15 text-rainbow-orange",
  Tenor: "bg-rainbow-blue/15 text-rainbow-blue",
  Baix: "bg-rainbow-purple/15 text-rainbow-purple",
};

const Repertori = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="pb-safe">
      <header className="bg-card border-b border-border">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold font-display text-foreground">Repertori</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{songs.length} cançons al repertori actual</p>
        </div>
        <RainbowBar />
      </header>

      <div className="px-4 mt-4 space-y-3">
        {songs.map((song, i) => (
          <motion.div
            key={song.id}
            className="rounded-xl bg-card border border-border shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
          >
            <button
              onClick={() => setExpanded(expanded === song.id ? null : song.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">{song.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{song.composer}</p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {song.voices.map((v) => (
                    <span key={v} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${voiceColors[v] || "bg-muted text-muted-foreground"}`}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 ml-2 transition-transform ${expanded === song.id ? "rotate-180" : ""}`} />
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
                  <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
                    {song.lyrics && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs font-semibold text-muted-foreground">Lletra</span>
                        </div>
                        <p className="text-xs text-foreground leading-relaxed whitespace-pre-line bg-muted/50 rounded-lg p-3">
                          {song.lyrics}
                        </p>
                      </div>
                    )}
                    {song.hasAudio && (
                      <button className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                        <Play className="h-4 w-4" />
                        Escoltar àudio d'assaig
                      </button>
                    )}
                    {!song.lyrics && !song.hasAudio && (
                      <p className="text-xs text-muted-foreground italic">Encara no hi ha contingut disponible.</p>
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
