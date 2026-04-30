import { Game, GroupType, MomentType } from "../types";
import { games } from "../data/games";

export function getRecommendedGames(group?: GroupType, moment?: MomentType): Game[] {
  if (!group && !moment) return games;

  return [...games].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    if (group && a.recommendedGroups.includes(group)) scoreA += 2;
    if (moment && a.recommendedMoments.includes(moment)) scoreA += 2;

    if (group && b.recommendedGroups.includes(group)) scoreB += 2;
    if (moment && b.recommendedMoments.includes(moment)) scoreB += 2;

    return scoreB - scoreA; // Descending order
  });
}
