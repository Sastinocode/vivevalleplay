import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { MomentSelector } from "../components/MomentSelector";
import { PrimaryButton } from "../components/PrimaryButton";
import { useApp } from "../context/AppContext";
import { MomentType } from "../types";

export default function MomentPage() {
  const [, setLocation] = useLocation();
  const { selectedMoment, setSelectedMoment } = useApp();

  return (
    <ScreenContainer>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col flex-1 gap-7"
      >
        {/* Back */}
        <button
          onClick={() => setLocation("/grupo")}
          data-testid="button-back"
          className="self-start -ml-2 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1">
          <p className="text-[11px] text-primary font-semibold uppercase tracking-widest">Paso 2 de 2</p>
          <h2 className="font-serif text-[28px] font-semibold text-foreground leading-tight">
            ¿En qué momento estáis?
          </h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            La app os recomendará la experiencia perfecta para este instante.
          </p>
        </div>

        <MomentSelector selected={selectedMoment} onSelect={(m: MomentType) => setSelectedMoment(m)} />

        <div className="mt-auto pt-2">
          <PrimaryButton
            onClick={() => selectedMoment && setLocation("/juegos")}
            disabled={!selectedMoment}
            data-testid="button-continue-moment"
          >
            Ver experiencias
          </PrimaryButton>
        </div>
      </motion.div>
    </ScreenContainer>
  );
}
