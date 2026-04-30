import { Trash2 } from "lucide-react";
import { Memory, GroupType, MomentType } from "../types";

const groupLabels: Record<GroupType, string> = {
  familia: "Familia",
  amigos: "Amigos",
  pareja: "Pareja",
  mixto: "Grupo mixto",
};

const momentLabels: Record<MomentType, string> = {
  llegada: "Llegada",
  tarde: "Tarde tranquila",
  cena: "Antes de cenar",
  noche: "Noche",
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
      className="rounded-2xl border border-border bg-card p-5"
      data-testid={`memory-card-${memory.id}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="font-semibold text-foreground text-base">{memory.gameTitle}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{formatted}</div>
        </div>
        <button
          onClick={() => onDelete(memory.id)}
          data-testid={`delete-memory-${memory.id}`}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          aria-label="Eliminar recuerdo"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
          {groupLabels[memory.groupType]}
        </span>
        <span className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
          {momentLabels[memory.moment]}
        </span>
        {memory.points > 0 && (
          <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {memory.points} pts
          </span>
        )}
      </div>
      <div className="text-sm text-foreground font-medium">{memory.resultTitle}</div>
      {memory.resultDescription && (
        <div className="text-sm text-muted-foreground mt-1">{memory.resultDescription}</div>
      )}
    </div>
  );
}
