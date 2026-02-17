import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import logo from "@/assets/logo.jpg";

interface OnboardingProps {
  onComplete: (data: { name: string; pronouns: string; email: string; phone: string; photoUrl?: string }) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement>(null);

  const pronounOptions = ["ella/ella", "ell/ell", "elle/elle", "sense preferència"];

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoUrl(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const canContinue = step === 0 ? name.trim().length > 0 : email.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-block-violet/10" />
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-block-coral/10" />

      <motion.div
        className="relative z-10 flex flex-col items-center px-8 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="h-28 w-28 rounded-3xl overflow-hidden shadow-elevated ring-2 ring-primary/20">
            <img src={logo} alt="La Clandestina" className="h-full w-full object-cover logo-transparent" />
          </div>
        </motion.div>

        <motion.p
          className="mt-5 text-xl font-extrabold font-display text-foreground text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Benvingud@ al cor! 🏳️‍🌈
        </motion.p>

        {step === 0 && (
          <motion.div
            className="mt-6 w-full space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            key="step0"
          >
            <p className="text-sm text-muted-foreground text-center">Com et dius?</p>
            <input
              type="text"
              placeholder="El teu nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              autoFocus
            />

            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Pronoms (opcional)</p>
              <div className="flex flex-wrap gap-2">
                {pronounOptions.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPronouns(pronouns === p ? "" : p)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      pronouns === p
                        ? "bg-primary text-primary-foreground shadow-card"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!name.trim()}
              onClick={() => setStep(1)}
              className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              Continuar →
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            className="mt-6 w-full space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key="step1"
          >
            <p className="text-sm text-muted-foreground text-center">Dades de contacte</p>

            <input
              type="email"
              placeholder="Correu electrònic"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              autoFocus
            />

            <input
              type="tel"
              placeholder="Telèfon (opcional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            {/* Photo */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Foto de perfil (opcional)</p>
              <button
                onClick={() => fileRef.current?.click()}
                className="relative h-20 w-20 rounded-2xl bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-border hover:border-primary/40 transition-colors"
              >
                {photoUrl ? (
                  <img src={photoUrl} alt="Foto" className="h-full w-full object-cover" />
                ) : (
                  <Camera className="h-6 w-6 text-muted-foreground" />
                )}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(0)}
                className="flex-1 rounded-2xl bg-muted py-3.5 text-sm font-bold text-muted-foreground"
              >
                ← Enrere
              </button>
              <button
                disabled={!email.trim()}
                onClick={() => onComplete({ name: name.trim(), pronouns, email: email.trim(), phone: phone.trim(), photoUrl })}
                className="flex-1 rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                Endavant! ✨
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Onboarding;
