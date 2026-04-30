import { useState, useEffect, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { ProgressBar } from "../components/ProgressBar";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { useApp } from "../context/AppContext";
import { games } from "../data/games";
import { GameStep } from "../types";

function TimerDisplay({
  seconds,
  onComplete,
}: {
  seconds: number;
  onComplete: () => void;
}) {
  const [remaining, setRemaining] = useState(seconds);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (remaining <= 0) {
      setDone(true);
      onComplete();
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, onComplete]);

  const pct = ((seconds - remaining) / seconds) * 100;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - pct / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-foreground tabular-nums">{remaining}</span>
        </div>
      </div>
      {done && (
        <div className="text-primary font-semibold text-lg">¡Tiempo!</div>
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
  const [timerDone, setTimerDone] = useState(false);

  if (step.type === "intro" || step.type === "result") {
    return (
      <div className="rounded-2xl bg-card border border-border p-6 text-center">
        <p className="text-base text-foreground leading-relaxed">{step.description}</p>
        {step.hint && (
          <p className="mt-3 text-sm text-muted-foreground italic">{step.hint}</p>
        )}
      </div>
    );
  }

  if (step.type === "vote") {
    return (
      <div className="rounded-2xl bg-card border border-border p-5">
        <p className="text-base text-foreground mb-4">{step.description}</p>
        <p className="text-sm text-muted-foreground bg-muted rounded-xl p-3">
          Debatid entre todos y cuando hayáis decidido, passed al siguiente paso.
        </p>
      </div>
    );
  }

  if (step.type === "text") {
    return (
      <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-3">
        <p className="text-base text-foreground">{step.description}</p>
        <textarea
          className="w-full min-h-[100px] resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
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
        <p className="text-base text-foreground mb-1">{step.description}</p>
        {step.options.map((opt) => (
          <button
            key={opt}
            onClick={() => onAnswer(opt)}
            data-testid={`choice-option-${opt}`}
            className={`w-full text-left rounded-xl border-2 px-4 py-3.5 text-sm font-medium transition-all duration-150 active:scale-[0.98] ${
              currentAnswer === opt
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (step.type === "timer" || step.type === "challenge") {
    return (
      <div className="rounded-2xl bg-card border border-border p-5 flex flex-col items-center gap-5">
        <p className="text-base text-foreground text-center">{step.description}</p>
        {step.durationSeconds ? (
          <TimerDisplay
            key={step.id}
            seconds={step.durationSeconds}
            onComplete={() => {
              setTimerDone(true);
              onAnswer("done");
            }}
          />
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            Cuando acabéis, pasad al siguiente paso.
          </p>
        )}
        {step.hint && (
          <p className="text-xs text-muted-foreground italic text-center">{step.hint}</p>
        )}
      </div>
    );
  }

  if (step.type === "memory") {
    return (
      <div className="rounded-2xl bg-card border border-border p-6 flex flex-col items-center gap-4 text-center">
        <div className="text-5xl">📸</div>
        <p className="text-base text-foreground">{step.description}</p>
        <SecondaryButton
          onClick={() => onAnswer("photo-done")}
          fullWidth={false}
          data-testid="button-photo-done"
          className={currentAnswer === "photo-done" ? "border-primary text-primary" : ""}
        >
          {currentAnswer === "photo-done" ? "Foto hecha" : "Foto hecha"}
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
      <ScreenContainer centered>
        <p className="text-muted-foreground">Experiencia no encontrada.</p>
        <button onClick={() => setLocation("/juegos")} className="mt-4 text-primary underline text-sm">
          Volver a la lista
        </button>
      </ScreenContainer>
    );
  }

  const step = game.steps[currentStepIndex];
  const currentAnswer = stepAnswers[step.id] ?? "";

  const canContinue = (() => {
    if (step.type === "choice") return !!currentAnswer;
    return true;
  })();

  function handleQuit() {
    resetGame();
    setLocation("/juegos");
  }

  return (
    <div className="min-h-screen w-full max-w-md mx-auto flex flex-col bg-background">
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-serif text-lg font-bold text-foreground truncate pr-2">
            {game.title}
          </h1>
          <button
            onClick={handleQuit}
            data-testid="button-quit-game"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <ProgressBar current={currentStepIndex + 1} total={game.steps.length} />
      </div>

      <div className="flex-1 px-5 pb-6 flex flex-col gap-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
                Paso {currentStepIndex + 1}
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground">{step.title}</h2>
            </div>

            <StepContent
              step={step}
              onAnswer={(answer) => setStepAnswer(step.id, answer)}
              currentAnswer={currentAnswer}
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto">
          <PrimaryButton
            onClick={handleNext}
            disabled={!canContinue}
            data-testid="button-next-step"
          >
            {currentStepIndex >= game.steps.length - 1 ? "Ver resultado" : "Siguiente"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
