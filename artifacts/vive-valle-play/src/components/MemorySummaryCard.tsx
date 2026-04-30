import { Trash2 } from "lucide-react";
import { Memory, GroupType, MomentType } from "../types";

const groupLabels: Record<GroupType, string> = {
  familia: "Familia",
  amigos:  "Amigos",
  pareja:  "Pareja",
  mixto:   "Grupo mixto",
};

const momentLabels: Record<MomentType, string> = {
  llegada:   "Llegada",
  tarde:     "Tarde tranquila",
  cena:      "Antes de cenar",
  noche:     "Noche",
  despedida: "Despedida",
};

type MemorySummaryCardProps = {
  memory: Memory;
  onDelete: (id: string) => void;
};

export function MemorySummaryCard({ memory, onDelete }: MemorySummaryCardProps) {
  const date = new Date(memory.date);
  const formatted = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="rounded-2xl border border-card-border bg-card p-5 shadow-xs"
      data-testid={`memory-card-${memory.id}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="font-serif text-[17px] font-semibold text-foreground leading-snug">{memory.gameTitle}</div>
          <div className="text-[11px] text-muted-foreground mt-1">{formatted}</div>
        </div>
        <button
          onClick={() => onDelete(memory.id)}
          data-testid={`delete-memory-${memory.id}`}
          className="shrink-0 p-1.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-colors"
          aria-label="Eliminar recuerdo"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-[11px] bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
          {groupLabels[memory.groupType]}
        </span>
        <span className="text-[11px] bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
          {momentLabels[memory.moment]}
        </span>
        {memory.points > 0 && (
          <span className="text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
            {memory.points} pts
          </span>
        )}
      </div>

      <div className="border-t border-border pt-3 mt-1">
        <div className="text-[14px] text-foreground font-medium leading-snug">{memory.resultTitle}</div>
        {memory.resultDescription && (
          <div className="text-[13px] text-muted-foreground mt-1 leading-relaxed">{memory.resultDescription}</div>
        )}
      </div>
    </div>
  );
}
