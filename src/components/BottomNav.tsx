import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, Music, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", icon: Home, label: "Inici" },
  { to: "/calendari", icon: Calendar, label: "Calendari" },
  { to: "/repertori", icon: Music, label: "Repertori" },
  { to: "/perfil", icon: User, label: "Perfil" },
];

const BottomNav = () => {
  const location = useLocation();

  if (["/login", "/registre", "/recuperar-contrasenya"].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/90 backdrop-blur-xl">
      <div className="rainbow-bar" />
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
                  className="absolute -top-3 h-1 w-10 rounded-full gradient-primary"
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
