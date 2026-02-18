import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, Music, MessageSquare, User } from "lucide-react";
import { motion } from "framer-motion";
import RainbowBar from "@/components/RainbowBar";

const navItems = [
  { to: "/", icon: Home, label: "Inici" },
  { to: "/calendari", icon: Calendar, label: "Calendari" },
  { to: "/repertori", icon: Music, label: "Repertori" },
  { to: "/mur", icon: MessageSquare, label: "Mur" },
  { to: "/perfil", icon: User, label: "Perfil" },
];

const BottomNav = () => {
  const location = useLocation();

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
              className="relative flex flex-col items-center gap-1 px-4 py-1"
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
