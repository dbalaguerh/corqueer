import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import logo from "@/assets/logo.jpg";
import RainbowBar from "@/components/RainbowBar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type Mode = "login" | "signup";

const Auth = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup") {
      if (!name.trim()) {
        toast.error(t("auth_name_required"));
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { name: name.trim() } },
      });
      if (error) {
        toast.error(error.message === "User already registered" ? t("auth_email_exists") : error.message);
      } else {
        toast.success(t("auth_created"));
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        toast.error(
          error.message === "Invalid login credentials"
            ? t("auth_wrong_credentials")
            : error.message
        );
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background">
      <RainbowBar />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-block-violet/8" />
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-block-coral/8" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="h-24 w-24 rounded-3xl overflow-hidden shadow-elevated ring-2 ring-primary/20 mb-6"
        >
          <img src={logo} alt="La Clandestina" className="h-full w-full object-cover logo-transparent" />
        </motion.div>

        <motion.h1
          className="text-2xl font-extrabold font-display text-foreground text-center mb-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          La Clandestina 🏳️‍🌈
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {mode === "login" ? t("auth_access") : t("auth_create")}
        </motion.p>

        <motion.div
          className="flex w-full max-w-xs rounded-2xl bg-muted p-1 mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {(["login", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${
                mode === m
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground"
              }`}
            >
              {m === "login" ? t("auth_login") : t("auth_signup")}
            </button>
          ))}
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xs space-y-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          key={mode}
        >
          <AnimatePresence>
            {mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("auth_name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              placeholder={t("auth_email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("auth_password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-2xl border border-border bg-card pl-10 pr-11 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-elevated disabled:opacity-50 disabled:cursor-not-allowed transition-opacity mt-2"
          >
            {loading ? t("auth_loading") : mode === "login" ? t("auth_login_btn") : t("auth_signup_btn")}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Auth;
