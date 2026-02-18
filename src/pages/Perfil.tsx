import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, LogOut, Settings } from "lucide-react";
import RainbowBar from "@/components/RainbowBar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Perfil = () => {
  const { user, signOut } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.user_metadata?.name || "");
  const [saving, setSaving] = useState(false);

  const displayName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Usuària";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ data: { name: name.trim() } });
    if (error) {
      toast.error("Error desant el nom");
    } else {
      toast.success("Nom actualitzat ✓");
      setEditing(false);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (!user) return null;

  return (
    <div className="pb-safe">
      <header className="relative overflow-hidden bg-card border-b border-border">
        <div className="relative px-4 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-block-violet">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-extrabold font-display text-foreground tracking-tight">Perfil</h1>
          </div>
        </div>
        <RainbowBar />
      </header>

      <div className="px-4 mt-8">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="h-24 w-24 rounded-3xl bg-block-violet flex items-center justify-center shadow-elevated">
            <span className="text-3xl font-extrabold text-primary-foreground font-display">
              {initials}
            </span>
          </div>

          {!editing ? (
            <>
              <h2 className="mt-4 text-xl font-extrabold font-display text-foreground tracking-tight">{displayName}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
            </>
          ) : (
            <div className="mt-4 w-full max-w-xs space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="El teu nom"
                autoFocus
              />
            </div>
          )}
        </motion.div>

        <div className="mt-8 space-y-3">
          {!editing && (
            <motion.div
              className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-card relative overflow-hidden"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-block-sky" />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-block-sky/10">
                <Mail className="h-5 w-5 text-block-sky" />
              </div>
              <div className="pl-1">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Correu electrònic</p>
                <p className="text-sm font-semibold text-foreground">{user.email}</p>
              </div>
            </motion.div>
          )}

          <motion.button
            onClick={() => {
              if (editing) {
                handleSave();
              } else {
                setName(user?.user_metadata?.name || "");
                setEditing(true);
              }
            }}
            className="flex w-full items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-card cursor-pointer relative overflow-hidden"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute left-0 top-0 w-1 h-full bg-block-amber" />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-block-amber/10">
              <Settings className="h-5 w-5 text-block-amber" />
            </div>
            <p className="text-sm font-semibold text-foreground pl-1">
              {editing ? (saving ? "Desant..." : "Guardar canvis ✓") : "Editar nom"}
            </p>
          </motion.button>

          {editing && (
            <motion.button
              onClick={() => setEditing(false)}
              className="flex w-full items-center justify-center rounded-2xl bg-muted p-3 text-sm font-semibold text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel·lar
            </motion.button>
          )}

          <motion.button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl bg-destructive/8 border border-destructive/15 p-4 relative overflow-hidden"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute left-0 top-0 w-1 h-full bg-destructive" />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
              <LogOut className="h-5 w-5 text-destructive" />
            </div>
            <p className="text-sm font-bold text-destructive pl-1">Tancar sessió</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
