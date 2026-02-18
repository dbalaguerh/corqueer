import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Image, Mic, Send, Plus, X, Square, Trash2 } from "lucide-react";
import RainbowBar from "@/components/RainbowBar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface WallPost {
  id: string;
  user_id: string;
  user_name: string;
  content: string | null;
  media_urls: string[];
  created_at: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Ara mateix";
  if (diffMins < 60) return `Fa ${diffMins} min`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `Fa ${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `Fa ${diffDays}d`;
  return date.toLocaleDateString("ca-ES", { day: "numeric", month: "short" });
};

const AudioRecorder = ({ onRecorded }: { onRecorded: (blob: Blob) => void }) => {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number>();

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        onRecorded(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      setRecording(true);
      setElapsed(0);
      timerRef.current = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    } catch {
      toast.error("No s'ha pogut accedir al micròfon");
    }
  };

  const stop = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    clearInterval(timerRef.current);
  };

  return (
    <div className="flex items-center gap-2">
      {!recording ? (
        <Button variant="outline" size="sm" onClick={start} className="gap-1.5">
          <Mic className="h-4 w-4" /> Gravar
        </Button>
      ) : (
        <Button variant="destructive" size="sm" onClick={stop} className="gap-1.5 animate-pulse">
          <Square className="h-3 w-3" /> {elapsed}s
        </Button>
      )}
    </div>
  );
};

const Mur = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<WallPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [audioBlobs, setAudioBlobs] = useState<Blob[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("wall_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (data) setPosts(data as WallPost[]);
    setLoading(false);
  };

  const checkAdmin = async () => {
    if (!user) return;
    const { data, error } = await supabase.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });
    if (!error) setIsAdmin(!!data);
  };

  useEffect(() => {
    fetchPosts();
    checkAdmin();

    const channel = supabase
      .channel("wall-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "wall_posts" }, (payload) => {
        setPosts((prev) => [payload.new as WallPost, ...prev]);
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "wall_posts" }, (payload) => {
        setPosts((prev) => prev.filter((p) => p.id !== payload.old.id));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const handleDelete = async (postId: string) => {
    setDeletingId(postId);
    const { error } = await supabase.from("wall_posts").delete().eq("id", postId);
    if (error) {
      toast.error("No s'ha pogut esborrar");
    } else {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      toast.success("Missatge esborrat");
    }
    setDeletingId(null);
  };

  const handleSubmit = async () => {
    if (!content.trim() && files.length === 0 && audioBlobs.length === 0) return;
    setSubmitting(true);

    try {
      if (!user) {
        toast.error("Has d'iniciar sessió per publicar");
        setSubmitting(false);
        return;
      }

      const mediaUrls: string[] = [];

      for (const file of files) {
        const ext = file.name.split(".").pop();
        const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("wall-media").upload(path, file);
        if (!error) {
          const { data: urlData } = supabase.storage.from("wall-media").getPublicUrl(path);
          mediaUrls.push(urlData.publicUrl);
        }
      }

      for (const blob of audioBlobs) {
        const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.webm`;
        const { error } = await supabase.storage.from("wall-media").upload(path, blob, { contentType: "audio/webm" });
        if (!error) {
          const { data: urlData } = supabase.storage.from("wall-media").getPublicUrl(path);
          mediaUrls.push(urlData.publicUrl);
        }
      }

      const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Anònim";

      const { error } = await supabase.from("wall_posts").insert({
        user_id: user.id,
        user_name: userName,
        content: content.trim() || null,
        media_urls: mediaUrls,
      });

      if (error) {
        toast.error("Error publicant");
        console.error(error);
      } else {
        toast.success("Publicat! ✨");
        setContent("");
        setFiles([]);
        setAudioBlobs([]);
        setShowForm(false);
      }
    } catch (e) {
      toast.error("Error inesperat");
      console.error(e);
    }
    setSubmitting(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));
  const removeAudio = (index: number) => setAudioBlobs((prev) => prev.filter((_, i) => i !== index));

  const colorForIndex = (i: number) => {
    const colors = ["bg-block-coral", "bg-block-sky", "bg-block-lime", "bg-block-violet", "bg-block-amber", "bg-block-rose"];
    return colors[i % colors.length];
  };

  const canDelete = (post: WallPost) => isAdmin || post.user_id === user?.id;

  return (
    <div className="pb-safe">
      <header className="relative overflow-hidden bg-card border-b border-border">
        <div className="relative px-4 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-block-coral">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
              <div>
              <h1 className="text-xl font-extrabold font-display text-foreground tracking-tight">El Mur</h1>
              {isAdmin ? (
                <p className="text-[10px] font-bold text-block-coral uppercase tracking-wide">Admin</p>
              ) : (
                <p className="text-[10px] text-muted-foreground tracking-wide">idees · records · comunitat</p>
              )}
            </div>
          </div>
        </div>
        <RainbowBar />
      </header>

      {/* FAB to show form */}
      {!showForm && (
        <motion.button
          className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-elevated"
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-6 w-6 text-primary-foreground" />
        </motion.button>
      )}

      {/* Post form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="px-4 mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="rounded-2xl bg-card border border-border p-4 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold font-display text-foreground">Nova publicació</p>
                <button onClick={() => setShowForm(false)}>
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <Textarea
                placeholder="Escriu una idea, comentari, suggeriment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="rounded-xl border-border bg-background resize-none text-sm"
                rows={3}
              />

              {(files.length > 0 || audioBlobs.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {files.map((f, i) => (
                    <div key={i} className="relative group">
                      {f.type.startsWith("image/") ? (
                        <img src={URL.createObjectURL(f)} className="h-16 w-16 rounded-lg object-cover" alt="" />
                      ) : (
                        <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium">
                          {f.name.split(".").pop()?.toUpperCase()}
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(i)}
                        className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive flex items-center justify-center"
                      >
                        <X className="h-3 w-3 text-primary-foreground" />
                      </button>
                    </div>
                  ))}
                  {audioBlobs.map((_, i) => (
                    <div key={`a${i}`} className="relative">
                      <div className="h-16 w-16 rounded-lg bg-block-rose/10 flex items-center justify-center">
                        <Mic className="h-5 w-5 text-block-rose" />
                      </div>
                      <button
                        onClick={() => removeAudio(i)}
                        className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive flex items-center justify-center"
                      >
                        <X className="h-3 w-3 text-primary-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-1.5">
                    <Image className="h-4 w-4" /> Foto
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,audio/*,video/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <AudioRecorder onRecorded={(blob) => setAudioBlobs((prev) => [...prev, blob])} />
                </div>
                <Button size="sm" onClick={handleSubmit} disabled={submitting} className="gap-1.5">
                  <Send className="h-4 w-4" /> {submitting ? "..." : "Publicar"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts feed */}
      <div className="px-4 mt-4 space-y-3">
        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}

        {!loading && posts.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-block-coral/10 mb-4">
              <MessageSquare className="h-8 w-8 text-block-coral" />
            </div>
            <p className="text-lg font-bold font-display text-foreground">El mur està buit!</p>
            <p className="text-sm text-muted-foreground mt-1">Sigues la primera en publicar 🎶</p>
          </motion.div>
        )}

        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            className="rounded-2xl bg-card border border-border p-4 shadow-card overflow-hidden relative"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
          >
            <div className={`absolute top-0 left-0 w-1.5 h-full ${colorForIndex(i)}`} />
            <div className="pl-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorForIndex(i)}`}>
                    <span className="text-xs font-bold text-primary-foreground">
                      {post.user_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm font-bold font-display text-foreground">{post.user_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[11px] font-medium text-muted-foreground/60">{formatDate(post.created_at)}</p>
                  {canDelete(post) && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40"
                      title="Esborrar missatge"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {post.content && (
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
              )}

              {post.media_urls && post.media_urls.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.media_urls.map((url, j) => {
                    if (url.match(/\.(webm|mp3|wav|ogg|m4a)(\?|$)/i)) {
                      return (
                        <audio key={j} controls className="w-full max-w-xs h-10 rounded-lg" preload="none">
                          <source src={url} />
                        </audio>
                      );
                    }
                    if (url.match(/\.(mp4|mov|avi|mkv|webm)(\?|$)/i)) {
                      return (
                        <video key={j} controls className="max-h-64 rounded-xl w-full" preload="metadata">
                          <source src={url} />
                          El teu navegador no suporta aquest format de vídeo.
                        </video>
                      );
                    }
                    return (
                      <img
                        key={j}
                        src={url}
                        className="max-h-48 rounded-xl object-cover cursor-pointer"
                        alt=""
                        onClick={() => window.open(url, "_blank")}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mur;
