import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, LogOut, Settings, Camera } from "lucide-react";
import RainbowBar from "@/components/RainbowBar";
import { useProfile } from "@/hooks/useProfile";

const Perfil = () => {
  const { profile, saveProfile, clearProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name || "");
  const [pronouns, setPronouns] = useState(profile?.pronouns || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [phone, setPhone] = useState(profile?.phone || "");

  const handleSave = () => {
    if (profile) {
      saveProfile({ ...profile, name, pronouns, email, phone });
      setEditing(false);
    }
  };

  const handleLogout = () => {
    clearProfile();
  };

  if (!profile) {
    return (
      <div className="pb-safe flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground font-medium">No hi ha perfil configurat.</p>
      </div>
    );
  }

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
        {/* Avatar + Info */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="h-24 w-24 rounded-3xl bg-block-violet flex items-center justify-center shadow-elevated overflow-hidden">
            {profile.photoUrl ? (
              <img src={profile.photoUrl} alt="Foto" className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl font-extrabold text-primary-foreground font-display">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </span>
            )}
          </div>

          {!editing ? (
            <>
              <h2 className="mt-4 text-xl font-extrabold font-display text-foreground tracking-tight">{profile.name}</h2>
              {profile.pronouns && (
                <p className="text-sm text-muted-foreground">{profile.pronouns}</p>
              )}
            </>
          ) : (
            <div className="mt-4 w-full max-w-xs space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Nom"
              />
              <input
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Pronoms"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Email"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Telèfon"
              />
            </div>
          )}
        </motion.div>

        {/* Info cards */}
        <div className="mt-8 space-y-3">
          {!editing && (
            <>
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
                  <p className="text-sm font-semibold text-foreground">{profile.email}</p>
                </div>
              </motion.div>

              {profile.phone && (
                <motion.div
                  className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-card relative overflow-hidden"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                >
                  <div className="absolute left-0 top-0 w-1 h-full bg-block-lime" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-block-lime/10">
                    <Phone className="h-5 w-5 text-block-lime" />
                  </div>
                  <div className="pl-1">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Telèfon</p>
                    <p className="text-sm font-semibold text-foreground">{profile.phone}</p>
                  </div>
                </motion.div>
              )}
            </>
          )}

          <motion.button
            onClick={() => {
              if (editing) {
                handleSave();
              } else {
                setName(profile.name);
                setPronouns(profile.pronouns);
                setEmail(profile.email);
                setPhone(profile.phone);
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
              {editing ? "Guardar canvis ✓" : "Editar perfil"}
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
