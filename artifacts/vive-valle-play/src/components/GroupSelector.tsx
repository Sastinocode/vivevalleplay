import { GroupType } from "../types";
import { cn } from "@/lib/utils";

const groups: { id: GroupType; label: string; emoji: string; description: string }[] = [
  { id: "familia", label: "Familia", emoji: "🏡", description: "Para todas las edades" },
  { id: "amigos", label: "Amigos", emoji: "🥂", description: "El grupo de siempre" },
  { id: "pareja", label: "Pareja", emoji: "🌿", description: "Momentos a dos" },
  { id: "mixto", label: "Grupo mixto", emoji: "🎉", description: "Mezcla de todo" },
];

type GroupSelectorProps = {
  selected: GroupType | null;
  onSelect: (group: GroupType) => void;
};

export function GroupSelector({ selected, onSelect }: GroupSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipo de grupo">
      {groups.map((group) => (
        <button
          key={group.id}
          onClick={() => onSelect(group.id)}
          data-testid={`group-option-${group.id}`}
          role="radio"
          aria-checked={selected === group.id}
          className={cn(
            "flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200",
            "text-center active:scale-[0.97]",
            selected === group.id
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border bg-card hover:border-primary/40"
          )}
        >
          <span className="text-3xl">{group.emoji}</span>
          <span className="font-semibold text-foreground text-sm">{group.label}</span>
          <span className="text-xs text-muted-foreground">{group.description}</span>
        </button>
      ))}
    </div>
  );
}
