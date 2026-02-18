import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ChevronDown, Play, Pause, FileText, Download, Pencil, Check, X } from "lucide-react";
import RainbowBar from "@/components/RainbowBar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

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

const songsStatic: Omit<Song, "lyrics">[] = [
  {
    id: 1,
    title: "CANT DE LLUITA",
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
    audioTracks: [
      { label: "Veus juntes", src: "/songs/perduda-en-tu-veus-juntes.mp3" },
      { label: "Veu 1 (Aguda)", src: "/songs/perduda-en-tu-veu1-aguda.mp3" },
      { label: "Veu 2 (Greu)", src: "/songs/perduda-en-tu-veu2-greu.mp3" },
    ],
  },
  {
    id: 3,
    title: "FOC AL COR",
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
    audioTracks: [
      { label: "Cor", src: "/songs/clandestina-cor.mp3" },
    ],
  },
  {
    id: 6,
    title: "DUETTO DI DUE GATTI",
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
      <audio ref={audioRef} src={track.src} onEnded={() => setPlaying(false)} />
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

const LyricsEditor = ({
  songId,
  lyrics,
  onSaved,
}: {
  songId: number;
  lyrics: string;
  onSaved: (newLyrics: string) => void;
}) => {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(lyrics);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("song_lyrics")
      .upsert({ id: songId, title: "", lyrics: draft, updated_at: new Date().toISOString() }, { onConflict: "id" });

    setSaving(false);
    if (error) {
      toast({ title: t("rep_save_error"), description: error.message, variant: "destructive" });
    } else {
      onSaved(draft);
      setEditing(false);
      toast({ title: t("rep_saved") });
    }
  };

  const handleCancel = () => {
    setDraft(lyrics);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="relative">
        <p className="text-xs text-foreground leading-relaxed whitespace-pre-line bg-muted/50 rounded-xl p-3 pr-10">
          {lyrics}
        </p>
        <button
          onClick={() => { setDraft(lyrics); setEditing(true); }}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-background border border-border active:bg-muted"
          title={t("rep_lyrics")}
        >
          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <textarea
        className="w-full text-xs text-foreground leading-relaxed bg-muted/50 rounded-xl p-3 border border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none min-h-[200px] font-mono"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground disabled:opacity-60"
        >
          <Check className="h-3.5 w-3.5" />
          {saving ? t("rep_saving") : t("rep_save")}
        </button>
        <button
          onClick={handleCancel}
          className="flex items-center gap-1.5 rounded-xl bg-muted px-3 py-2 text-xs font-bold text-foreground border border-border"
        >
          <X className="h-3.5 w-3.5" />
          {t("rep_cancel")}
        </button>
      </div>
    </div>
  );
};

const Repertori = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [lyricsMap, setLyricsMap] = useState<Record<number, string>>({});
  const [loadedIds, setLoadedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (expanded === null || loadedIds.has(expanded)) return;

    supabase
      .from("song_lyrics")
      .select("id, lyrics")
      .eq("id", expanded)
      .single()
      .then(({ data }) => {
        if (data) {
          setLyricsMap((prev) => ({ ...prev, [data.id]: data.lyrics ?? "" }));
          setLoadedIds((prev) => new Set(prev).add(data.id));
        }
      });
  }, [expanded, loadedIds]);

  const handleLyricsSaved = (songId: number, newLyrics: string) => {
    setLyricsMap((prev) => ({ ...prev, [songId]: newLyrics }));
  };

  return (
    <div className="pb-safe">
      <header className="relative overflow-hidden bg-card border-b border-border">
        <div className="relative px-4 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-block-violet">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold font-display text-foreground tracking-tight">{t("rep_title")}</h1>
              <p className="text-xs text-muted-foreground">{t("rep_subtitle", { count: songsStatic.length })}</p>
            </div>
          </div>
        </div>
        <RainbowBar className="h-[4px]" />
      </header>

      <div className="px-4 mt-4 space-y-3">
        {songsStatic.map((song, i) => {
          const lyrics = lyricsMap[song.id];
          const hasContent = lyrics || song.audioTracks?.length || song.files?.length;
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
                      {lyrics !== undefined && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">{t("rep_lyrics")}</span>
                          </div>
                          <LyricsEditor
                            songId={song.id}
                            lyrics={lyrics}
                            onSaved={(nl) => handleLyricsSaved(song.id, nl)}
                          />
                        </div>
                      )}
                      {lyrics === undefined && loadedIds.has(song.id) === false && expanded === song.id && (
                        <p className="text-xs text-muted-foreground italic">{t("rep_loading_lyrics")}</p>
                      )}

                      {song.audioTracks && song.audioTracks.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Music className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">{t("rep_audios")}</span>
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
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">{t("rep_files")}</span>
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

                      {!hasContent && loadedIds.has(song.id) && (
                        <p className="text-xs text-muted-foreground italic">{t("rep_no_content")}</p>
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
