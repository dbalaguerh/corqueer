import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, Music, ShieldCheck, TrendingUp, Clock, Mail, Mic } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import RainbowBar from "@/components/RainbowBar";
import { useNavigate } from "react-router-dom";

interface UserRow {
  user_id: string;
  name: string;
  pronouns: string | null;
  voice: string | null;
  photo_url: string | null;
  created_at: string;
  email: string;
  role: string;
}

interface Counts {
  totalUsers: number;
  totalPosts: number;
  totalSongs: number;
  adminCount: number;
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
  const [users, setUsers] = useState<UserRow[]>([]);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkAdmin = async () => {
      const { data } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (!data) {
        navigate("/");
        return;
      }
      setIsAdmin(true);
      fetchData();
    };

    checkAdmin();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [postsRes, songsRes, usersRes] = await Promise.all([
        supabase.from("wall_posts").select("id", { count: "exact", head: true }),
        supabase.from("song_lyrics").select("id", { count: "exact", head: true }),
        supabase.rpc("get_all_users_admin"),
      ]);

      const allUsers: UserRow[] = (usersRes.data ?? []) as UserRow[];

      setCounts({
        totalUsers: allUsers.length,
        totalPosts: postsRes.count ?? 0,
        totalSongs: songsRes.count ?? 0,
        adminCount: allUsers.filter((u) => u.role === "admin").length,
      });
      setUsers(allUsers);
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
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={Users} label="Membres registrats" value={counts?.totalUsers ?? 0} color="bg-block-sky" delay={0.1} />
            <StatCard icon={MessageSquare} label="Publicacions al Mur" value={counts?.totalPosts ?? 0} color="bg-block-coral" delay={0.15} />
            <StatCard icon={Music} label="Cançons al repertori" value={counts?.totalSongs ?? 0} color="bg-block-violet" delay={0.2} />
            <StatCard icon={ShieldCheck} label="Administradores" value={counts?.adminCount ?? 0} color="bg-block-lime" delay={0.25} />
          </div>

          {/* Llista de membres */}
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
              <h2 className="text-sm font-bold font-display text-foreground">
                Totes les membres ({users.length})
              </h2>
            </div>

            <div className="divide-y divide-border">
              {users.length === 0 ? (
                <p className="px-4 py-3 text-sm text-muted-foreground">Sense dades</p>
              ) : (
                users.map((u) => (
                  <div key={u.user_id} className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      {u.photo_url ? (
                        <img
                          src={u.photo_url}
                          alt={u.name}
                          className="h-9 w-9 rounded-full object-cover shrink-0 border border-border"
                        />
                      ) : (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-block-sky/30 text-sm font-bold text-foreground border border-border">
                          {u.name?.[0]?.toUpperCase() ?? "?"}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-foreground">{u.name}</span>
                          {u.role === "admin" && (
                            <span className="rounded-full bg-block-violet px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                              Admin
                            </span>
                          )}
                          {u.pronouns && (
                            <span className="text-[10px] text-muted-foreground">({u.pronouns})</span>
                          )}
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-1 mt-0.5">
                          <Mail className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="text-[11px] text-muted-foreground truncate">{u.email}</span>
                        </div>

                        {/* Veu + data */}
                        <div className="flex items-center gap-3 mt-0.5">
                          {u.voice && (
                            <div className="flex items-center gap-1">
                              <Mic className="h-3 w-3 text-muted-foreground" />
                              <span className="text-[11px] text-muted-foreground">{u.voice}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[11px] text-muted-foreground">{formatDate(u.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
