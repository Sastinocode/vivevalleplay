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

  function handleSelect(group: GroupType) {
    setSelectedGroup(group);
  }

  function handleContinue() {
    if (selectedGroup) {
      setLocation("/momento");
    }
  }

  return (
    <ScreenContainer>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col flex-1 gap-6"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation("/")}
            data-testid="button-back"
            className="p-2 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-1">
            ¿Con quién estáis?
          </h2>
          <p className="text-sm text-muted-foreground">
            Elige el tipo de grupo para encontrar la mejor experiencia.
          </p>
        </div>

        <GroupSelector selected={selectedGroup} onSelect={handleSelect} />

        <div className="mt-auto">
          <PrimaryButton
            onClick={handleContinue}
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
