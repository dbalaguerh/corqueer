import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, Music, ShieldCheck, TrendingUp, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import RainbowBar from "@/components/RainbowBar";
import { useNavigate } from "react-router-dom";

interface Metrics {
  totalUsers: number;
  totalPosts: number;
  totalSongs: number;
  adminCount: number;
  recentPosts: {
    id: string;
    user_name: string;
    content: string | null;
    created_at: string;
  }[];
  recentUsers: {
    id: string;
    name: string;
    created_at: string;
  }[];
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
  delay: number;
}) => (
  <motion.div
    className="rounded-2xl bg-card border border-border p-4 shadow-card overflow-hidden relative flex flex-col gap-2"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className={`absolute top-0 left-0 w-full h-1 ${color}`} />
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
      <Icon className="h-5 w-5 text-primary-foreground" />
    </div>
    <div>
      <p className="text-2xl font-extrabold font-display text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground font-medium">{label}</p>
    </div>
  </motion.div>
);

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkAdmin = async () => {
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (error || !data) {
        navigate("/");
        return;
      }
      setIsAdmin(true);
      fetchMetrics();
    };

    checkAdmin();
  }, [user, navigate]);

  const fetchMetrics = async () => {
    try {
      const [usersRes, postsRes, songsRes, adminsRes, recentPostsRes, recentUsersRes] =
        await Promise.all([
          supabase.from("profiles").select("id", { count: "exact", head: true }),
          supabase.from("wall_posts").select("id", { count: "exact", head: true }),
          supabase.from("song_lyrics").select("id", { count: "exact", head: true }),
          supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin"),
          supabase
            .from("wall_posts")
            .select("id, user_name, content, created_at")
            .order("created_at", { ascending: false })
            .limit(5),
          supabase
            .from("profiles")
            .select("id, name, created_at")
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

      setMetrics({
        totalUsers: usersRes.count ?? 0,
        totalPosts: postsRes.count ?? 0,
        totalSongs: songsRes.count ?? 0,
        adminCount: adminsRes.count ?? 0,
        recentPosts: recentPostsRes.data ?? [],
        recentUsers: recentUsersRes.data ?? [],
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ca-ES", { day: "2-digit", month: "short", year: "numeric" });
  };

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="pb-28">
      {/* Header */}
      <div className="relative overflow-hidden bg-card">
        <div className="flex flex-col px-5 pt-6 pb-4 gap-1">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-block-violet">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold font-display text-foreground leading-none">
                Dashboard Admin
              </h1>
              <p className="text-xs text-muted-foreground">Cor Queer de Barcelona</p>
            </div>
          </motion.div>
        </div>
        <RainbowBar className="h-[4px]" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center pt-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="px-4 mt-5 space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={Users}
              label="Membres registrats"
              value={metrics?.totalUsers ?? 0}
              color="bg-block-sky"
              delay={0.1}
            />
            <StatCard
              icon={MessageSquare}
              label="Publicacions al Mur"
              value={metrics?.totalPosts ?? 0}
              color="bg-block-coral"
              delay={0.15}
            />
            <StatCard
              icon={Music}
              label="Cançons al repertori"
              value={metrics?.totalSongs ?? 0}
              color="bg-block-violet"
              delay={0.2}
            />
            <StatCard
              icon={ShieldCheck}
              label="Administradores"
              value={metrics?.adminCount ?? 0}
              color="bg-block-lime"
              delay={0.25}
            />
          </div>

          {/* Recent users */}
          <motion.div
            className="rounded-2xl bg-card border border-border shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-border">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-block-sky">
                <TrendingUp className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <h2 className="text-sm font-bold font-display text-foreground">Últimes altes</h2>
            </div>
            <div className="divide-y divide-border">
              {metrics?.recentUsers.length === 0 ? (
                <p className="px-4 py-3 text-sm text-muted-foreground">Sense dades</p>
              ) : (
                metrics?.recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-block-sky/30 text-xs font-bold text-foreground">
                        {u.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <span className="text-sm font-medium text-foreground">{u.name}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{formatDate(u.created_at)}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Recent posts */}
          <motion.div
            className="rounded-2xl bg-card border border-border shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-border">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-block-coral">
                <Clock className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <h2 className="text-sm font-bold font-display text-foreground">Últimes publicacions</h2>
            </div>
            <div className="divide-y divide-border">
              {metrics?.recentPosts.length === 0 ? (
                <p className="px-4 py-3 text-sm text-muted-foreground">Sense publicacions</p>
              ) : (
                metrics?.recentPosts.map((p) => (
                  <div key={p.id} className="px-4 py-2.5">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-foreground">{p.user_name}</span>
                      <span className="text-[11px] text-muted-foreground">{formatDate(p.created_at)}</span>
                    </div>
                    {p.content && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{p.content}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
