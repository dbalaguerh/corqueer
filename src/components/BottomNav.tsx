import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, Music, MessageSquare, User, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import RainbowBar from "@/components/RainbowBar";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const BottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => {
      setIsAdmin(!!data);
    });
  }, [user]);

  const navItems = [
    { to: "/", icon: Home, label: t("nav_home") },
    { to: "/calendari", icon: Calendar, label: t("nav_calendar") },
    { to: "/repertori", icon: Music, label: t("nav_repertori") },
    { to: "/mur", icon: MessageSquare, label: t("nav_mur") },
    { to: "/perfil", icon: User, label: t("nav_perfil") },
    ...(isAdmin ? [{ to: "/admin", icon: ShieldCheck, label: "Admin" }] : []),
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/90 backdrop-blur-xl">
      <RainbowBar className="h-[4px]" />
      <div className="flex items-center justify-around px-2 py-2.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center gap-1 px-3 py-1"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-3 h-1 w-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                className={`h-5 w-5 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-semibold tracking-wide transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
