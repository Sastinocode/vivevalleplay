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
          <h2 className="font-serif text-2xl font-bold text-foreground mb-1">Mis recuerdos</h2>
          <p className="text-sm text-muted-foreground">
            Los momentos que habéis vivido juntos.
          </p>
        </div>

        {memories.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-16">
            <div className="text-5xl">🌱</div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-1">
                Todavía no hay recuerdos
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Jugad una experiencia y este espacio se irá llenando de momentos especiales.
              </p>
            </div>
            <PrimaryButton
              onClick={() => setLocation("/")}
              fullWidth={false}
              className="px-8"
              data-testid="button-start-first-game"
            >
              Empezar a jugar
            </PrimaryButton>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {memories.map((memory, i) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
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
