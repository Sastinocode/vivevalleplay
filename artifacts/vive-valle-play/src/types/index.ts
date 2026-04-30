export type GameStepType = "intro" | "vote" | "text" | "choice" | "timer" | "challenge" | "memory" | "result";

export type Difficulty = "easy" | "medium" | "fun";

export type GameStep = {
  id: string;
  title: string;
  description: string;
  type: GameStepType;
  options?: string[];
  durationSeconds?: number;
  points?: number;
  hint?: string;
};

export type GroupType = "familia" | "amigos" | "pareja" | "mixto";
export type MomentType = "llegada" | "tarde" | "cena" | "noche" | "despedida";

export type Game = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  durationMin: number;
  difficulty: Difficulty;
  recommendedGroups: GroupType[];
  recommendedMoments: MomentType[];
  minPlayers: number;
  maxPlayers?: number;
  steps: GameStep[];
  endingTitle: string;
  endingDescription: string;
};

export type Memory = {
  id: string;
  groupType: GroupType;
  moment: MomentType;
  gameId: string;
  gameTitle: string;
  resultTitle: string;
  resultDescription: string;
  points: number;
  date: string;
  phrase?: string;
};
