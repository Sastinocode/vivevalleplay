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
  const {
    selectedGroup,
    selectedMoment,
    totalPoints,
    saveMemory,
    resetGame,
  } = useApp();

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
  }, []);

  if (!game) {
    return (
      <ScreenContainer centered>
        <p className="text-muted-foreground">Resultado no encontrado.</p>
        <button onClick={() => setLocation("/")} className="mt-4 text-primary underline text-sm">
          Volver al inicio
        </button>
      </ScreenContainer>
    );
  }

  function handleGoHome() {
    resetGame();
    setLocation("/");
  }

  function handlePlayAnother() {
    resetGame();
    setLocation("/juegos");
  }

  return (
    <ScreenContainer>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col flex-1 gap-6"
      >
        <div className="flex-1 flex flex-col justify-center gap-6">
          <ResultCard game={game} points={totalPoints} />

          <div className="rounded-2xl bg-accent/50 border border-border p-4 text-center">
            <div className="text-2xl mb-2">📔</div>
            <p className="text-sm text-foreground font-medium">
              Recuerdo guardado automáticamente
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Podréis verlo en vuestros recuerdos.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <PrimaryButton onClick={handlePlayAnother} data-testid="button-play-another">
            Otra experiencia
          </PrimaryButton>
          <SecondaryButton onClick={handleGoHome} data-testid="button-go-home">
            Volver al inicio
          </SecondaryButton>
        </div>
      </motion.div>
    </ScreenContainer>
  );
}
