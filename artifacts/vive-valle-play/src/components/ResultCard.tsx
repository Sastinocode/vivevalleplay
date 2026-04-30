import { Game } from "../types";

type ResultCardProps = {
  game: Game;
  points: number;
};

export function ResultCard({ game, points }: ResultCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <div className="text-4xl mb-4">🎉</div>
      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">{game.endingTitle}</h2>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{game.endingDescription}</p>
      {points > 0 && (
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold">
          <span>★</span>
          <span>{points} puntos</span>
        </div>
      )}
    </div>
  );
}
