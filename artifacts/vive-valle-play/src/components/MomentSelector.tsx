import { MomentType } from "../types";
import { cn } from "@/lib/utils";

const moments: { id: MomentType; label: string; emoji: string; description: string }[] = [
  { id: "llegada", label: "Acabamos de llegar", emoji: "🚗", description: "Romper el hielo" },
  { id: "tarde", label: "Tarde tranquila", emoji: "☀️", description: "Sin prisa" },
  { id: "cena", label: "Antes de cenar", emoji: "🍷", description: "Con ganas de fiesta" },
  { id: "noche", label: "Noche", emoji: "🌙", description: "La noche es joven" },
  { id: "despedida", label: "Despedida", emoji: "🎈", description: "Cerrar el viaje" },
];

type MomentSelectorProps = {
  selected: MomentType | null;
  onSelect: (moment: MomentType) => void;
};

export function MomentSelector({ selected, onSelect }: MomentSelectorProps) {
  return (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label="Momento del día">
      {moments.map((moment) => (
        <button
          key={moment.id}
          onClick={() => onSelect(moment.id)}
          data-testid={`moment-option-${moment.id}`}
          role="radio"
          aria-checked={selected === moment.id}
          className={cn(
            "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200",
            "text-left active:scale-[0.98]",
            selected === moment.id
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border bg-card hover:border-primary/40"
          )}
        >
          <span className="text-2xl shrink-0">{moment.emoji}</span>
          <div>
            <div className="font-semibold text-foreground text-sm">{moment.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{moment.description}</div>
          </div>
          {selected === moment.id && (
            <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
