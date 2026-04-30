import { Clock, Users } from "lucide-react";
import { Game, Difficulty } from "../types";
import { cn } from "@/lib/utils";

const difficultyLabels: Record<Difficulty, string> = {
  easy: "Tranquilo",
  medium: "Animado",
  fun: "Divertido",
};

const difficultyColors: Record<Difficulty, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-amber-100 text-amber-800",
  fun: "bg-orange-100 text-orange-800",
};

type GameCardProps = {
  game: Game;
  recommended?: boolean;
  onClick?: () => void;
};

export function GameCard({ game, recommended, onClick }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      data-testid={`game-card-${game.id}`}
      className={cn(
        "w-full text-left rounded-2xl p-5 border transition-all duration-200",
        "bg-card border-card-border hover:shadow-md active:scale-[0.99]",
        recommended && "ring-1 ring-primary/30"
      )}
    >
      {recommended && (
        <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
          Recomendado
        </div>
      )}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-foreground text-base leading-snug">{game.title}</h3>
        <span
          className={cn(
            "shrink-0 text-xs font-medium px-2 py-0.5 rounded-full",
            difficultyColors[game.difficulty]
          )}
        >
          {difficultyLabels[game.difficulty]}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{game.description}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {game.durationMin} min
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {game.minPlayers}{game.maxPlayers ? `–${game.maxPlayers}` : "+"} personas
        </span>
        <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">{game.category}</span>
      </div>
    </button>
  );
}
