import { MomentType } from "../types";
import { cn } from "@/lib/utils";

const moments: { id: MomentType; label: string; symbol: string; description: string }[] = [
  { id: "llegada",    label: "Acabamos de llegar", symbol: "🚗", description: "Romper el hielo"    },
  { id: "tarde",      label: "Tarde tranquila",    symbol: "☀️", description: "Sin prisa"          },
  { id: "cena",       label: "Antes de cenar",     symbol: "🍷", description: "Con ganas de fiesta"},
  { id: "noche",      label: "Noche",              symbol: "🌙", description: "La noche es joven"  },
  { id: "despedida",  label: "Despedida",          symbol: "🎈", description: "Cerrar el viaje"    },
];

type MomentSelectorProps = {
  selected: MomentType | null;
  onSelect: (moment: MomentType) => void;
};

export function MomentSelector({ selected, onSelect }: MomentSelectorProps) {
  return (
    <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Momento del día">
      {moments.map((moment) => {
        const isSelected = selected === moment.id;
        return (
          <button
            key={moment.id}
            onClick={() => onSelect(moment.id)}
            data-testid={`moment-option-${moment.id}`}
            role="radio"
            aria-checked={isSelected}
            className={cn(
              "flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2 transition-all duration-200",
              "text-left active:scale-[0.98]",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/35"
            )}
          >
            <span className="text-[22px] leading-none shrink-0">{moment.symbol}</span>
            <div className="flex-1 min-w-0">
              <div className={cn("text-[14px] font-medium leading-tight", isSelected ? "text-primary" : "text-foreground")}>
                {moment.label}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{moment.description}</div>
            </div>
            <div className={cn(
              "shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
              isSelected ? "border-primary bg-primary" : "border-border"
            )}>
              {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
