import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { GameCard } from "../components/GameCard";
import { useApp } from "../context/AppContext";
import { games } from "../data/games";
import { getRecommendedGames } from "../utils/recommendation";

export default function LibraryPage() {
  const [, setLocation] = useLocation();
  const { selectedGroup, selectedMoment, startGame } = useApp();

  const sortedGames = getRecommendedGames(
    selectedGroup ?? undefined,
    selectedMoment ?? undefined
  );

  function handlePlay(gameId: string) {
    startGame(gameId);
    setLocation(`/juego/${gameId}`);
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
            onClick={() => setLocation("/momento")}
            data-testid="button-back"
            className="p-2 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-1">
            Experiencias para vosotros
          </h2>
          <p className="text-sm text-muted-foreground">
            {selectedGroup && selectedMoment
              ? "Ordenadas según vuestro grupo y momento."
              : "Todas las experiencias disponibles."}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {sortedGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <GameCard
                game={game}
                recommended={
                  index === 0 &&
                  !!selectedGroup &&
                  !!selectedMoment &&
                  game.recommendedGroups.includes(selectedGroup) &&
                  game.recommendedMoments.includes(selectedMoment)
                }
                onClick={() => handlePlay(game.id)}
              />
            </motion.div>
          ))}
        </div>

        {games.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-16">
            <div className="text-3xl">🎲</div>
            <p className="text-muted-foreground text-sm">
              No hay experiencias disponibles todavía.
            </p>
          </div>
        )}
      </motion.div>
    </ScreenContainer>
  );
}
