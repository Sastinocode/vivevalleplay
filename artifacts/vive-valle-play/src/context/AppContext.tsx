import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { GroupType, MomentType, Memory } from "../types";

const STORAGE_KEYS = {
  group: "vvp_group",
  moment: "vvp_moment",
  lastGame: "vvp_last_game",
  memories: "vvp_memories",
} as const;

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

type AppContextType = {
  selectedGroup: GroupType | null;
  selectedMoment: MomentType | null;
  currentGameId: string | null;
  currentStepIndex: number;
  stepAnswers: Record<string, string>;
  totalPoints: number;
  memories: Memory[];
  setSelectedGroup: (group: GroupType) => void;
  setSelectedMoment: (moment: MomentType) => void;
  startGame: (gameId: string) => void;
  nextStep: () => void;
  setStepAnswer: (stepId: string, answer: string) => void;
  addPoints: (pts: number) => void;
  saveMemory: (memory: Memory) => void;
  deleteMemory: (id: string) => void;
  resetGame: () => void;
  resetAll: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedGroup, setSelectedGroupState] = useState<GroupType | null>(
    () => loadFromStorage<GroupType | null>(STORAGE_KEYS.group, null)
  );
  const [selectedMoment, setSelectedMomentState] = useState<MomentType | null>(
    () => loadFromStorage<MomentType | null>(STORAGE_KEYS.moment, null)
  );
  const [currentGameId, setCurrentGameId] = useState<string | null>(
    () => loadFromStorage<string | null>(STORAGE_KEYS.lastGame, null)
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepAnswers, setStepAnswers] = useState<Record<string, string>>({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [memories, setMemories] = useState<Memory[]>(
    () => loadFromStorage<Memory[]>(STORAGE_KEYS.memories, [])
  );

  const setSelectedGroup = useCallback((group: GroupType) => {
    setSelectedGroupState(group);
    saveToStorage(STORAGE_KEYS.group, group);
  }, []);

  const setSelectedMoment = useCallback((moment: MomentType) => {
    setSelectedMomentState(moment);
    saveToStorage(STORAGE_KEYS.moment, moment);
  }, []);

  const startGame = useCallback((gameId: string) => {
    setCurrentGameId(gameId);
    setCurrentStepIndex(0);
    setStepAnswers({});
    setTotalPoints(0);
    saveToStorage(STORAGE_KEYS.lastGame, gameId);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStepIndex((prev) => prev + 1);
  }, []);

  const setStepAnswer = useCallback((stepId: string, answer: string) => {
    setStepAnswers((prev) => ({ ...prev, [stepId]: answer }));
  }, []);

  const addPoints = useCallback((pts: number) => {
    setTotalPoints((prev) => prev + pts);
  }, []);

  const saveMemory = useCallback((memory: Memory) => {
    setMemories((prev) => {
      const updated = [memory, ...prev];
      saveToStorage(STORAGE_KEYS.memories, updated);
      return updated;
    });
  }, []);

  const deleteMemory = useCallback((id: string) => {
    setMemories((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      saveToStorage(STORAGE_KEYS.memories, updated);
      return updated;
    });
  }, []);

  const resetGame = useCallback(() => {
    setCurrentGameId(null);
    setCurrentStepIndex(0);
    setStepAnswers({});
    setTotalPoints(0);
  }, []);

  const resetAll = useCallback(() => {
    setSelectedGroupState(null);
    setSelectedMomentState(null);
    setCurrentGameId(null);
    setCurrentStepIndex(0);
    setStepAnswers({});
    setTotalPoints(0);
    saveToStorage(STORAGE_KEYS.group, null);
    saveToStorage(STORAGE_KEYS.moment, null);
    saveToStorage(STORAGE_KEYS.lastGame, null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedGroup,
        selectedMoment,
        currentGameId,
        currentStepIndex,
        stepAnswers,
        totalPoints,
        memories,
        setSelectedGroup,
        setSelectedMoment,
        startGame,
        nextStep,
        setStepAnswer,
        addPoints,
        saveMemory,
        deleteMemory,
        resetGame,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
