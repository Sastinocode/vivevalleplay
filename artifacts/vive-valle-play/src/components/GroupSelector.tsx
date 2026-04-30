import { GroupType } from "../types";
import { cn } from "@/lib/utils";

const groups: { id: GroupType; label: string; symbol: string; description: string }[] = [
  { id: "familia",  label: "Familia",      symbol: "🏡", description: "Para todas las edades" },
  { id: "amigos",   label: "Amigos",       symbol: "🥂", description: "El grupo de siempre"   },
  { id: "pareja",   label: "Pareja",       symbol: "🌿", description: "Momentos a dos"        },
  { id: "mixto",    label: "Grupo mixto",  symbol: "🎉", description: "Mezcla de todo"        },
];

type GroupSelectorProps = {
  selected: GroupType | null;
  onSelect: (group: GroupType) => void;
};

export function GroupSelector({ selected, onSelect }: GroupSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipo de grupo">
      {groups.map((group) => {
        const isSelected = selected === group.id;
        return (
          <button
            key={group.id}
            onClick={() => onSelect(group.id)}
            data-testid={`group-option-${group.id}`}
            role="radio"
            aria-checked={isSelected}
            className={cn(
              "flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 transition-all duration-200",
              "text-center active:scale-[0.97]",
              isSelected
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-card hover:border-primary/35 hover:bg-card"
            )}
          >
            <span className="text-[32px] leading-none">{group.symbol}</span>
            <div>
              <div className={cn("font-semibold text-[14px] leading-tight", isSelected ? "text-primary" : "text-foreground")}>
                {group.label}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{group.description}</div>
            </div>
            {isSelected && (
              <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
