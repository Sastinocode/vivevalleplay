import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { GameCard } from "../components/GameCard";
import { useApp } from "../context/AppContext";
import { getRecommendedGames } from "../utils/recommendation";

export default function LibraryPage() {
  const [, setLocation] = useLocation();
  const { selectedGroup, selectedMoment, startGame } = useApp();

  const sortedGames = getRecommendedGames(
    selectedGroup ?? undefined,
    selectedMoment ?? undefined
  );

  const hasContext = !!selectedGroup && !!selectedMoment;

  function handlePlay(gameId: string) {
    startGame(gameId);
    setLocation(`/juego/${gameId}`);
  }

  return (
    <ScreenContainer className="pb-10">
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col flex-1 gap-7"
      >
        {/* Back */}
        <button
          onClick={() => setLocation("/momento")}
          data-testid="button-back"
          className="self-start -ml-2 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <h2 className="font-serif text-[28px] font-semibold text-foreground leading-tight">
            Experiencias para vosotros
          </h2>
          <p className="text-[13px] text-muted-foreground mt-1">
            {hasContext
              ? "Ordenadas según vuestro grupo y momento."
              : "Todas las experiencias disponibles."}
          </p>
        </div>

        {/* Game list */}
        <div className="flex flex-col gap-3.5">
          {sortedGames.map((game, index) => {
            const isRecommended =
              index === 0 &&
              hasContext &&
              game.recommendedGroups.includes(selectedGroup!) &&
              game.recommendedMoments.includes(selectedMoment!);

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <GameCard
                  game={game}
                  recommended={isRecommended}
                  onClick={() => handlePlay(game.id)}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </ScreenContainer>
  );
}
