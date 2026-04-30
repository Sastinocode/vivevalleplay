import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ScreenContainer } from "../components/ScreenContainer";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { ResultCard } from "../components/ResultCard";
import { useApp } from "../context/AppContext";
import { games } from "../data/games";
import { Memory } from "../types";

export default function ResultPage() {
  const [, params] = useRoute("/resultado/:id");
  const [, setLocation] = useLocation();
  const { selectedGroup, selectedMoment, totalPoints, saveMemory, resetGame } = useApp();

  const gameId = params?.id ?? "";
  const game = games.find((g) => g.id === gameId);

  useEffect(() => {
    if (!game || !selectedGroup || !selectedMoment) return;
    const memory: Memory = {
      id: `${gameId}-${Date.now()}`,
      groupType: selectedGroup,
      moment: selectedMoment,
      gameId: game.id,
      gameTitle: game.title,
      resultTitle: game.endingTitle,
      resultDescription: game.endingDescription,
      points: totalPoints,
      date: new Date().toISOString(),
    };
    saveMemory(memory);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!game) {
    return (
      <ScreenContainer centered>
        <p className="text-muted-foreground text-[15px]">Resultado no encontrado.</p>
        <button onClick={() => setLocation("/app")} className="mt-4 text-primary underline text-[14px]">
          Volver al inicio
        </button>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col flex-1 gap-5"
      >
        <div className="flex-1 flex flex-col justify-center gap-5 py-4">
          <ResultCard game={game} points={totalPoints} />

          {/* Memory confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="rounded-2xl border border-card-border bg-card px-5 py-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <span className="text-[20px] leading-none">📔</span>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground">Recuerdo guardado</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Podréis verlo en la sección de recuerdos.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3 pb-2">
          <PrimaryButton
            onClick={() => { resetGame(); setLocation("/juegos"); }}
            data-testid="button-play-another"
          >
            Otra experiencia
          </PrimaryButton>
          <SecondaryButton
            onClick={() => { resetGame(); setLocation("/app"); }}
            data-testid="button-go-home"
          >
            Volver al inicio
          </SecondaryButton>
        </div>
      </motion.div>
    </ScreenContainer>
  );
}
