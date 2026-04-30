import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { MemorySummaryCard } from "../components/MemorySummaryCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { useApp } from "../context/AppContext";

export default function MemoryPage() {
  const [, setLocation] = useLocation();
  const { memories, deleteMemory } = useApp();

  return (
    <ScreenContainer className="pb-10">
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
        <div>
          <h2 className="font-serif text-[28px] font-semibold text-foreground leading-tight">Mis recuerdos</h2>
          <p className="text-[13px] text-muted-foreground mt-1">
            Los momentos que habéis vivido juntos.
          </p>
        </div>

        {memories.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-12">
            {/* Empty state illustration */}
            <div className="w-20 h-20 rounded-[24px] bg-accent flex items-center justify-center shadow-sm">
              <span className="text-[36px] leading-none">🌱</span>
            </div>
            <div>
              <h3 className="font-serif text-[20px] font-semibold text-foreground mb-2">
                Todavía no hay recuerdos
              </h3>
              <p className="text-[13px] text-muted-foreground max-w-[240px] mx-auto leading-relaxed">
                Jugad una experiencia y este espacio se irá llenando de momentos especiales.
              </p>
            </div>
            <PrimaryButton
              onClick={() => setLocation("/app")}
              fullWidth={false}
              className="px-8"
              data-testid="button-start-first-game"
            >
              Empezar a jugar
            </PrimaryButton>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {memories.map((memory, i) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <MemorySummaryCard memory={memory} onDelete={deleteMemory} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </ScreenContainer>
  );
}
