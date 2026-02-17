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

const typeConfig: Record<EventType, { label: string; bgClass: string; textClass: string }> = {
  assaig: { label: "Assaig", bgClass: "bg-block-sky/10", textClass: "text-block-sky" },
  concert: { label: "Concert", bgClass: "bg-block-violet/10", textClass: "text-block-violet" },
  social: { label: "Social", bgClass: "bg-block-coral/10", textClass: "text-block-coral" },
};

const barColors: Record<EventType, string> = {
  assaig: "bg-block-sky",
  concert: "bg-block-violet",
  social: "bg-block-coral",
};

const events: CalEvent[] = [
  { id: 1, title: "🎨 ART CARXOFA — Coming Soon!", type: "social", date: "Pròximament", time: "TBA", location: "Per confirmar" },
  { id: 2, title: "Assaig setmanal", type: "assaig", date: "Dimecres 19 feb", time: "19:30 – 21:30", location: "Centre Cívic Cotxeres" },
  { id: 3, title: "Assaig setmanal", type: "assaig", date: "Dimecres 26 feb", time: "19:30 – 21:30", location: "Centre Cívic Cotxeres" },
  { id: 4, title: "Concert de Primavera 🌸", type: "concert", date: "Dissabte 15 mar", time: "19:00", location: "Palau de la Música" },
  { id: 5, title: "Assaig general", type: "assaig", date: "Dimecres 12 mar", time: "19:00 – 22:00", location: "Palau de la Música" },
];

const Calendari = () => {
  return (
    <div className="pb-safe">
      <header className="relative overflow-hidden bg-card border-b border-border">
        <div className="relative px-4 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-block-sky">
              <CalendarDays className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold font-display text-foreground tracking-tight">Calendari</h1>
              <p className="text-xs text-muted-foreground">Pròxims assajos, concerts i trobades</p>
            </div>
          </div>
        </div>
        <RainbowBar className="h-[4px]" />
      </header>

      {/* Filters */}
      <div className="flex gap-2 px-4 mt-5 overflow-x-auto">
        {(["assaig", "concert", "social"] as EventType[]).map((t) => (
          <span
            key={t}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ${typeConfig[t].bgClass} ${typeConfig[t].textClass}`}
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
            className="rounded-2xl bg-card border border-border p-4 shadow-card relative overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
          >
            <div className={`absolute left-0 top-0 w-1.5 h-full ${barColors[e.type]}`} />
            <div className="pl-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold font-display text-foreground">{e.title}</h3>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${typeConfig[e.type].bgClass} ${typeConfig[e.type].textClass}`}>
                  {typeConfig[e.type].label}
                </span>
              </div>
              <div className="mt-2.5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 text-primary/60" />
                  <span className="font-medium">{e.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary/60" />
                  <span>{e.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary/60" />
                  <span>{e.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Calendari;
