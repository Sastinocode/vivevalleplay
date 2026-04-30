import { Clock, Users } from "lucide-react";
import { Game, Difficulty } from "../types";
import { cn } from "@/lib/utils";

const difficultyLabels: Record<Difficulty, string> = {
  easy: "Tranquilo",
  medium: "Animado",
  fun: "Divertido",
};

const difficultyStyles: Record<Difficulty, string> = {
  easy:   "bg-[hsl(142,28%,88%)] text-[hsl(142,28%,30%)]",
  medium: "bg-[hsl(40,60%,88%)]  text-[hsl(35,45%,30%)]",
  fun:    "bg-[hsl(14,40%,88%)]  text-[hsl(14,40%,30%)]",
};

const categoryIcons: Record<string, string> = {
  "Creatividad": "✦",
  "Social": "◈",
  "Íntimo": "◇",
  "Improvisación": "◉",
  "Emoción": "◆",
};

type GameCardProps = {
  game: Game;
  recommended?: boolean;
  onClick?: () => void;
};

export function GameCard({ game, recommended, onClick }: GameCardProps) {
  const icon = categoryIcons[game.category] ?? "○";

  return (
    <button
      onClick={onClick}
      data-testid={`game-card-${game.id}`}
      className={cn(
        "w-full text-left rounded-2xl p-5 border transition-all duration-200",
        "bg-card border-card-border",
        "hover:shadow-md hover:-translate-y-px active:scale-[0.99] active:shadow-none active:translate-y-0",
        recommended && "ring-1 ring-primary/25 shadow-sm"
      )}
    >
      {recommended && (
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary mb-3 uppercase tracking-widest">
          <span>★</span>
          <span>Recomendado</span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-2.5">
        <h3 className="font-serif text-[18px] font-semibold text-foreground leading-snug">
          {game.title}
        </h3>
        <span className={cn("shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full mt-0.5", difficultyStyles[game.difficulty])}>
          {difficultyLabels[game.difficulty]}
        </span>
      </div>

      <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">{game.description}</p>

      <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          {game.durationMin} min
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 shrink-0" />
          {game.minPlayers}{game.maxPlayers ? `–${game.maxPlayers}` : "+"} pers.
        </span>
        <span className="ml-auto flex items-center gap-1 text-muted-foreground/70 bg-muted/60 px-2.5 py-1 rounded-full">
          <span className="text-[10px]">{icon}</span>
          <span>{game.category}</span>
        </span>
      </div>
    </button>
  );
}
