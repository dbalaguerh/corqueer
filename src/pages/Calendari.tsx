import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import RainbowBar from "@/components/RainbowBar";

type EventType = "assaig" | "concert" | "social";

interface CalEvent {
  id: number;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
}

const typeConfig: Record<EventType, { label: string; color: string }> = {
  assaig: { label: "Assaig", color: "bg-rainbow-blue/15 text-rainbow-blue" },
  concert: { label: "Concert", color: "bg-rainbow-purple/15 text-rainbow-purple" },
  social: { label: "Social", color: "bg-rainbow-orange/15 text-rainbow-orange" },
};

const events: CalEvent[] = [
  { id: 1, title: "Assaig setmanal", type: "assaig", date: "Dimecres 19 feb", time: "19:30 – 21:30", location: "Centre Cívic Cotxeres" },
  { id: 2, title: "Assaig setmanal", type: "assaig", date: "Dimecres 26 feb", time: "19:30 – 21:30", location: "Centre Cívic Cotxeres" },
  { id: 3, title: "Sopar de carnaval 🎭", type: "social", date: "Dissabte 1 mar", time: "20:00", location: "Restaurant El Racó" },
  { id: 4, title: "Concert de Primavera 🌸", type: "concert", date: "Dissabte 15 mar", time: "19:00", location: "Palau de la Música" },
  { id: 5, title: "Assaig general", type: "assaig", date: "Dimecres 12 mar", time: "19:00 – 22:00", location: "Palau de la Música" },
];

const Calendari = () => {
  return (
    <div className="pb-safe">
      <header className="bg-card border-b border-border">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold font-display text-foreground">Calendari</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Pròxims assajos, concerts i trobades</p>
        </div>
        <RainbowBar />
      </header>

      {/* Filters */}
      <div className="flex gap-2 px-4 mt-4 overflow-x-auto">
        {(["assaig", "concert", "social"] as EventType[]).map((t) => (
          <span
            key={t}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${typeConfig[t].color}`}
          >
            {typeConfig[t].label}
          </span>
        ))}
      </div>

      {/* Events list */}
      <div className="px-4 mt-4 space-y-3">
        {events.map((e, i) => (
          <motion.div
            key={e.id}
            className="rounded-xl bg-card border border-border p-4 shadow-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">{e.title}</h3>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeConfig[e.type].color}`}>
                {typeConfig[e.type].label}
              </span>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>{e.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{e.time}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{e.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Calendari;
