import { Game } from "../types";

type ResultCardProps = {
  game: Game;
  points: number;
};

export function ResultCard({ game, points }: ResultCardProps) {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-7 text-center shadow-sm">
      <div className="text-[48px] mb-4 leading-none">🎉</div>
      <h2 className="font-serif text-[26px] font-bold text-foreground mb-3 leading-snug">
        {game.endingTitle}
      </h2>
      <p className="text-[14px] text-muted-foreground leading-relaxed mb-5">
        {game.endingDescription}
      </p>
      {points > 0 && (
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-5 py-2 text-[13px] font-semibold">
          <span>★</span>
          <span>{points} puntos</span>
        </div>
      )}
    </div>
  );
}
