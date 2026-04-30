import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { GroupSelector } from "../components/GroupSelector";
import { PrimaryButton } from "../components/PrimaryButton";
import { useApp } from "../context/AppContext";
import { GroupType } from "../types";

export default function GroupPage() {
  const [, setLocation] = useLocation();
  const { selectedGroup, setSelectedGroup } = useApp();

  return (
    <ScreenContainer>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col flex-1 gap-7"
      >
        {/* Back */}
        <button
          onClick={() => setLocation("/app")}
          data-testid="button-back"
          className="self-start -ml-2 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1">
          <p className="text-[11px] text-primary font-semibold uppercase tracking-widest">Paso 1 de 2</p>
          <h2 className="font-serif text-[28px] font-semibold text-foreground leading-tight">
            ¿Con quién estáis?
          </h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            Elige el tipo de grupo para encontrar la mejor experiencia.
          </p>
        </div>

        <GroupSelector selected={selectedGroup} onSelect={(g: GroupType) => setSelectedGroup(g)} />

        <div className="mt-auto pt-2">
          <PrimaryButton
            onClick={() => selectedGroup && setLocation("/momento")}
            disabled={!selectedGroup}
            data-testid="button-continue-group"
          >
            Continuar
          </PrimaryButton>
        </div>
      </motion.div>
    </ScreenContainer>
  );
}
