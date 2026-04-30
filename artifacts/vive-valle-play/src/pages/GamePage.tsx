import { useState, useEffect, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ProgressBar } from "../components/ProgressBar";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { useApp } from "../context/AppContext";
import { games } from "../data/games";
import { GameStep } from "../types";

function TimerDisplay({ seconds, onComplete }: { seconds: number; onComplete: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (remaining <= 0) {
      if (!done) { setDone(true); onComplete(); }
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, done, onComplete]);

  const pct = Math.max(0, ((seconds - remaining) / seconds) * 100);
  const circumference = 2 * Math.PI * 44;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="44" fill="none"
            stroke={done ? "hsl(var(--secondary))" : "hsl(var(--primary))"}
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct / 100)}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-[32px] font-semibold tabular-nums leading-none ${done ? "text-secondary" : "text-foreground"}`}>
            {done ? "✓" : remaining}
          </span>
          {!done && <span className="text-[10px] text-muted-foreground mt-0.5">seg</span>}
        </div>
      </div>
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[15px] font-semibold text-secondary"
        >
          ¡Tiempo!
        </motion.div>
      )}
    </div>
  );
}

function StepContent({
  step,
  onAnswer,
  currentAnswer,
}: {
  step: GameStep;
  onAnswer: (answer: string) => void;
  currentAnswer: string;
}) {
  if (step.type === "intro" || step.type === "result") {
    return (
      <div className="rounded-2xl bg-card border border-card-border p-6 text-center shadow-xs">
        <p className="text-[16px] text-foreground leading-relaxed font-light">{step.description}</p>
        {step.hint && (
          <p className="mt-4 text-[13px] text-muted-foreground italic">{step.hint}</p>
        )}
      </div>
    );
  }

  if (step.type === "vote") {
    return (
      <div className="rounded-2xl bg-card border border-card-border p-5 shadow-xs flex flex-col gap-4">
        <p className="text-[15px] text-foreground leading-relaxed">{step.description}</p>
        <div className="flex items-start gap-3 bg-accent rounded-xl p-4">
          <span className="text-[20px] leading-none shrink-0">💬</span>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            Debatid entre todos. Cuando hayáis decidido, avanzad al siguiente paso.
          </p>
        </div>
      </div>
    );
  }

  if (step.type === "text") {
    return (
      <div className="rounded-2xl bg-card border border-card-border p-5 shadow-xs flex flex-col gap-4">
        <p className="text-[15px] text-foreground leading-relaxed">{step.description}</p>
        <textarea
          className="w-full min-h-[110px] resize-none rounded-xl border border-border bg-background px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 transition-shadow"
          placeholder="Escribid aquí vuestras respuestas..."
          value={currentAnswer}
          onChange={(e) => onAnswer(e.target.value)}
          data-testid="input-text-answer"
        />
      </div>
    );
  }

  if (step.type === "choice" && step.options) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-[15px] text-foreground leading-relaxed mb-1">{step.description}</p>
        {step.options.map((opt) => {
          const isSelected = currentAnswer === opt;
          return (
            <button
              key={opt}
              onClick={() => onAnswer(opt)}
              data-testid={`choice-option-${opt}`}
              className={[
                "w-full text-left rounded-2xl border-2 px-4 py-3.5 text-[14px] font-medium transition-all duration-150 active:scale-[0.98]",
                isSelected
                  ? "border-primary bg-primary/5 text-foreground shadow-xs"
                  : "border-border bg-card text-foreground hover:border-primary/35",
              ].join(" ")}
            >
              <span className={`mr-2 text-[11px] ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                {isSelected ? "●" : "○"}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  if (step.type === "timer" || step.type === "challenge") {
    return (
      <div className="rounded-2xl bg-card border border-card-border p-6 shadow-xs flex flex-col items-center gap-6">
        <p className="text-[15px] text-foreground leading-relaxed text-center">{step.description}</p>
        {step.durationSeconds ? (
          <TimerDisplay
            key={step.id}
            seconds={step.durationSeconds}
            onComplete={() => onAnswer("done")}
          />
        ) : (
          <p className="text-[13px] text-muted-foreground text-center">
            Cuando acabéis, pasad al siguiente paso.
          </p>
        )}
        {step.hint && (
          <p className="text-[12px] text-muted-foreground italic text-center">{step.hint}</p>
        )}
      </div>
    );
  }

  if (step.type === "memory") {
    const isDone = currentAnswer === "photo-done";
    return (
      <div className="rounded-2xl bg-card border border-card-border p-7 shadow-xs flex flex-col items-center gap-5 text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
          <span className="text-[32px] leading-none">{isDone ? "✅" : "📸"}</span>
        </div>
        <p className="text-[15px] text-foreground leading-relaxed">{step.description}</p>
        <SecondaryButton
          onClick={() => onAnswer("photo-done")}
          fullWidth={false}
          data-testid="button-photo-done"
          className={isDone ? "border-primary text-primary bg-primary/5" : ""}
        >
          {isDone ? "Foto hecha" : "Marcar foto como hecha"}
        </SecondaryButton>
      </div>
    );
  }

  return null;
}

export default function GamePage() {
  const [, params] = useRoute("/juego/:id");
  const [, setLocation] = useLocation();
  const { currentStepIndex, nextStep, setStepAnswer, stepAnswers, addPoints, resetGame } = useApp();

  const gameId = params?.id ?? "";
  const game = games.find((g) => g.id === gameId);

  const handleNext = useCallback(() => {
    if (!game) return;
    const step = game.steps[currentStepIndex];
    if (step.points) addPoints(step.points);
    if (currentStepIndex >= game.steps.length - 1) {
      setLocation(`/resultado/${gameId}`);
    } else {
      nextStep();
    }
  }, [game, currentStepIndex, nextStep, addPoints, setLocation, gameId]);

  if (!game) {
    return (
      <div className="min-h-[100dvh] w-full max-w-md mx-auto flex flex-col items-center justify-center px-6 bg-background">
        <p className="text-muted-foreground text-[15px]">Experiencia no encontrada.</p>
        <button onClick={() => setLocation("/juegos")} className="mt-4 text-primary text-[14px] underline">
          Volver a la lista
        </button>
      </div>
    );
  }

  const step = game.steps[currentStepIndex];
  const currentAnswer = stepAnswers[step.id] ?? "";
  const canContinue = step.type === "choice" ? !!currentAnswer : true;
  const isLast = currentStepIndex >= game.steps.length - 1;

  return (
    <div className="min-h-[100dvh] w-full max-w-md mx-auto flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-10 pb-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex-1 min-w-0 pr-3">
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest mb-0.5">
              {game.category}
            </p>
            <h1 className="font-serif text-[18px] font-semibold text-foreground truncate">
              {game.title}
            </h1>
          </div>
          <button
            onClick={() => { resetGame(); setLocation("/juegos"); }}
            data-testid="button-quit-game"
            className="shrink-0 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <ProgressBar current={currentStepIndex + 1} total={game.steps.length} />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-10 flex flex-col gap-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            <div>
              <h2 className="font-serif text-[26px] font-semibold text-foreground leading-tight">
                {step.title}
              </h2>
            </div>

            <StepContent
              step={step}
              onAnswer={(answer) => setStepAnswer(step.id, answer)}
              currentAnswer={currentAnswer}
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto pt-2">
          <PrimaryButton
            onClick={handleNext}
            disabled={!canContinue}
            data-testid="button-next-step"
          >
            {isLast ? "Ver resultado" : "Siguiente"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
