import { Game, GroupType, MomentType } from "../types";
import { games as allGames } from "../data/games";

/**
 * Returns a sorted list of games prioritised by how well they match
 * the given group and moment.
 *
 * @param group    - The selected group type (optional)
 * @param moment   - The selected moment type (optional)
 * @param gamePool - Subset of games to rank (defaults to the full registry).
 *                   Pass `tenantGames` here when the active tenant restricts
 *                   which games are available.
 */
export function getRecommendedGames(
  group?: GroupType,
  moment?: MomentType,
  gamePool: Game[] = allGames
): Game[] {
  if (!group && !moment) return gamePool;

  return [...gamePool].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    if (group) {
      if (a.recommendedGroups.includes(group)) scoreA += 2;
      if (b.recommendedGroups.includes(group)) scoreB += 2;
    }
    if (moment) {
      if (a.recommendedMoments.includes(moment)) scoreA += 2;
      if (b.recommendedMoments.includes(moment)) scoreB += 2;
    }

    return scoreB - scoreA;
  });
}
