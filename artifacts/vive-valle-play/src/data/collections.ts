import { Collection } from "../config/types";

/**
 * Thematic collections — curated groupings of games by mood or moment.
 *
 * Collections are independent of tenants: every game in the registry can
 * appear in a collection.  Whether a collection is shown in the UI depends
 * on the active tenant's `content.featuredCollectionIds`.
 */
export const collections: Collection[] = [
  {
    id: "llegada",
    title: "Para empezar bien",
    description: "Rompe el hielo en los primeros momentos del viaje.",
    icon: "🚗",
    gameIds: ["juicio-casa", "circo-talentos"],
    recommendedMoments: ["llegada", "tarde"],
    recommendedGroups: ["familia", "amigos", "mixto"],
  },
  {
    id: "cena",
    title: "Antes de la mesa",
    description: "Calientan el ambiente justo antes de sentarse a cenar.",
    icon: "🍷",
    gameIds: ["cena-imposible", "circo-talentos"],
    recommendedMoments: ["cena", "tarde"],
  },
  {
    id: "noche",
    title: "Cuando cae la noche",
    description: "Conversaciones más profundas y retos para la noche.",
    icon: "🌙",
    gameIds: ["noche-verdades"],
    recommendedMoments: ["noche"],
    recommendedGroups: ["amigos", "pareja"],
  },
  {
    id: "despedida",
    title: "Cerrar el viaje",
    description: "Para guardar los recuerdos y despedirse como se merece.",
    icon: "🎈",
    gameIds: ["ultimo-brindis"],
    recommendedMoments: ["despedida", "noche"],
  },
  {
    id: "risas",
    title: "Modo risas",
    description: "Sin filtro. Solo humor, payasadas y absurdos varios.",
    icon: "😂",
    gameIds: ["circo-talentos", "juicio-casa"],
    recommendedGroups: ["amigos", "familia", "mixto"],
  },
  {
    id: "emocion",
    title: "Momentos que quedan",
    description: "Conexión real, gratitud y recuerdos que se guardan.",
    icon: "✨",
    gameIds: ["ultimo-brindis", "noche-verdades"],
  },
];

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getCollectionsByIds(ids: string[]): Collection[] {
  return ids
    .map((id) => getCollectionById(id))
    .filter(Boolean) as Collection[];
}
