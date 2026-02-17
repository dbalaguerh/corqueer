import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ChevronDown, Play, Pause, FileText, Download } from "lucide-react";
import RainbowBar from "@/components/RainbowBar";

interface AudioTrack {
  label: string;
  src: string;
}

interface SongFile {
  label: string;
  src: string;
}

interface Song {
  id: number;
  title: string;
  lyrics?: string;
  audioTracks?: AudioTrack[];
  files?: SongFile[];
}

const songs: Song[] = [
  {
    id: 1,
    title: "CANT DE LLUITA",
    lyrics: `Som en acte de protesta
Som mans fredes vora el foc
Som la veu de la revolta
Netes de la por i el dol

Disfressades d'utopia
Emprendrem lluny del dolor
La recerca de la vida
A cavall de la raó

Coincideixen les mirades
Fixades en l'horitzó
Potser avui farem victòria
Potser enterrarem el dol

Doncs ens mantindrem alçades
Ja no ens veuran de genolls
El sol mantindrà la flama
La lluna encendrà passió`,
    audioTracks: [
      { label: "Veus juntes", src: "/songs/cant-de-lluita-veus-juntes.mp3" },
      { label: "Veu 1 (Greu)", src: "/songs/cant-de-lluita-veu1-greu.mp3" },
      { label: "Veu 2 (Aguts)", src: "/songs/cant-de-lluita-veu2-aguts.mp3" },
    ],
    files: [
      { label: "Lletra (PDF)", src: "/songs/cant-de-lluita-lletra.pdf" },
      { label: "Acords (PDF)", src: "/songs/cant-de-lluita-acords.pdf" },
    ],
  },
  {
    id: 2,
    title: "PERDUDA EN TU",
  },
  {
    id: 3,
    title: "FOC AL COR",
    lyrics: `Som foc al Cor
Espurna, Flama i Brasa

Fondrem la por
Com la neu de la carena
Encens les llums
Amb la pell de gallina
Sento l'escalfor,
Estel fugaç que mira

Nena per fi a casa has arribat
Això que sento no és casualitat

No es només perquè sigui Nadal
Ni és l'arbre, les llums ni els regals
És sentir que som comunitat
És mirar-te
I voler-te abraçar

Som llar de foc,
som família escollida,
Tendra revolució
Que ens trobarà unides
Farem que aquest amor
sigui tots els dies`,
    audioTracks: [
      { label: "Àudio d'assaig", src: "/songs/foc-al-cor.mp3" },
    ],
  },
  {
    id: 4,
    title: "SI TE'N VAS",
  },
  {
    id: 5,
    title: "CLANDESTINA",
    lyrics: `Es dimecres a la tarda i començo a caminar
I en cada trepitjada sento el cor bategar
Deixo enrere males cares
I em creuo amb les mirades que veuen de veritat

De Roquetes a Poblenou
Del Raval fins al Camp Nou
Hi ha un cor que crema i em mou
Hi ha un cor que crema i em mou

Clandestina, còctel de vitamines
M'allibera i em treu la por
I em sacseja com mil tambors

Clandestina, peces de la crew felina
Fa que'm puji la serotonina
Així que dona'm més benzina,
dame más gasolina, veïna`,
    audioTracks: [
      { label: "Cor", src: "/songs/clandestina-cor.mp3" },
    ],
  },
  {
    id: 6,
    title: "DUETTO DI DUE GATTI",
    lyrics: "Miau! 🐱🐱",
    files: [
      { label: "Partitura (PDF)", src: "/songs/duetto-gatti-partitura.pdf" },
    ],
  },
];

const blockColorClasses = [
  "bg-block-coral",
  "bg-block-amber",
  "bg-block-lime",
  "bg-block-sky",
  "bg-block-violet",
  "bg-block-rose",
];

const AudioPlayer = ({ track }: { track: AudioTrack }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex items-center gap-2">
      <audio
        ref={audioRef}
        src={track.src}
        onEnded={() => setPlaying(false)}
      />
      <button
        onClick={toggle}
        className="flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-card"
      >
        {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        {track.label}
      </button>
    </div>
  );
};

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
        {songs.map((song, i) => {
          const hasContent = song.lyrics || song.audioTracks?.length || song.files?.length;
          return (
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

                      {song.audioTracks && song.audioTracks.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Music className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Àudios</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {song.audioTracks.map((track, j) => (
                              <AudioPlayer key={j} track={track} />
                            ))}
                          </div>
                        </div>
                      )}

                      {song.files && song.files.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Download className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Fitxers</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {song.files.map((file, j) => (
                              <a
                                key={j}
                                href={file.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-xs font-bold text-foreground border border-border"
                              >
                                <FileText className="h-3.5 w-3.5" />
                                {file.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {!hasContent && (
                        <p className="text-xs text-muted-foreground italic">Puja els fitxers (MP3 i lletres) al xat per afegir contingut aquí.</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Repertori;
