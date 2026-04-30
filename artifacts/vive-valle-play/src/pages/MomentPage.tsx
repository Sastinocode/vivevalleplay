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

  function handleSelect(moment: MomentType) {
    setSelectedMoment(moment);
  }

  function handleContinue() {
    if (selectedMoment) {
      setLocation("/juegos");
    }
  }

  return (
    <ScreenContainer>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col flex-1 gap-6"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation("/grupo")}
            data-testid="button-back"
            className="p-2 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-1">
            ¿En qué momento estáis?
          </h2>
          <p className="text-sm text-muted-foreground">
            La app os sugerirá la experiencia perfecta para este instante.
          </p>
        </div>

        <MomentSelector selected={selectedMoment} onSelect={handleSelect} />

        <div className="mt-auto">
          <PrimaryButton
            onClick={handleContinue}
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
