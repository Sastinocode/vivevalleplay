import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { GameCard } from "../components/GameCard";
import { useApp } from "../context/AppContext";
import { useTenant } from "../context/TenantContext";
import { games } from "../data/games";
import { getCollectionsByIds } from "../data/collections";
import { getRecommendedGames } from "../utils/recommendation";
import { Game } from "../types";

function CollectionChip({ title, icon, active, onClick }: {
  title: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-150",
        active
          ? "bg-primary text-primary-foreground shadow-xs"
          : "bg-card border border-border text-muted-foreground hover:border-primary/40",
      ].join(" ")}
    >
      <span className="text-[13px]">{icon}</span>
      {title}
    </button>
  );
}

export default function LibraryPage() {
  const [, setLocation] = useLocation();
  const { selectedGroup, selectedMoment, startGame } = useApp();
  const { content } = useTenant();

  const hasContext = !!selectedGroup && !!selectedMoment;

  const tenantGames: Game[] =
    content.gameIds.length > 0
      ? (content.gameIds
          .map((id) => games.find((g) => g.id === id))
          .filter(Boolean) as Game[])
      : games;

  const sortedGames = getRecommendedGames(
    selectedGroup ?? undefined,
    selectedMoment ?? undefined,
    tenantGames
  );

  const featuredCollections = content.featuredCollectionIds?.length
    ? getCollectionsByIds(content.featuredCollectionIds).filter((col) =>
        col.gameIds.some((id) => tenantGames.find((g) => g.id === id))
      )
    : [];

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

        {/* Collections scroll */}
        {featuredCollections.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">
              Colecciones
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {featuredCollections.map((col) => (
                <CollectionChip
                  key={col.id}
                  title={col.title}
                  icon={col.icon}
                  active={false}
                  onClick={() => {
                    const firstGame = col.gameIds.find((id) =>
                      tenantGames.find((g) => g.id === id)
                    );
                    if (firstGame) handlePlay(firstGame);
                  }}
                />
              ))}
            </div>

            {/* Collection cards: featured first */}
            {featuredCollections.map((col) => {
              const colGames = col.gameIds
                .map((id) => tenantGames.find((g) => g.id === id))
                .filter(Boolean) as Game[];
              if (colGames.length === 0) return null;
              return (
                <div key={col.id} className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px]">{col.icon}</span>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground">{col.title}</p>
                      <p className="text-[11px] text-muted-foreground">{col.description}</p>
                    </div>
                  </div>
                  {colGames.map((game) => {
                    const isRecommended =
                      hasContext &&
                      game.recommendedGroups.includes(selectedGroup!) &&
                      game.recommendedMoments.includes(selectedMoment!);
                    return (
                      <GameCard
                        key={game.id}
                        game={game}
                        recommended={isRecommended}
                        onClick={() => handlePlay(game.id)}
                      />
                    );
                  })}
                </div>
              );
            })}

            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-border" />
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">
                Todas las experiencias
              </p>
              <div className="flex-1 h-px bg-border" />
            </div>
          </div>
        )}

        {/* Full game list */}
        <div className="flex flex-col gap-3.5">
          {sortedGames.map((game, index) => {
            const isRecommended =
              index === 0 &&
              hasContext &&
              game.recommendedGroups.includes(selectedGroup!) &&
              game.recommendedMoments.includes(selectedMoment!) &&
              featuredCollections.length === 0;

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
