import { GroupType, MomentType } from "../types";

/**
 * Brand colors expressed as HSL values WITHOUT the `hsl()` wrapper.
 * Example: "14 42% 52%"  →  used as  hsl(14 42% 52%)  in CSS.
 *
 * Only `primary` and `secondary` are mandatory; everything else falls back
 * to the baseline defined in index.css.  Provide only the values you want
 * to override per tenant.
 */
export type TenantColors = {
  primary: string;
  primaryForeground?: string;
  secondary: string;
  secondaryForeground?: string;
  background?: string;
  foreground?: string;
  card?: string;
  muted?: string;
  accent?: string;
};

export type TenantBrand = {
  name: string;
  tagline: string;
  monogram: string;
  footer: string;
};

/**
 * Content configuration for a tenant.
 * `gameIds` is an ordered allow-list — only these games appear in the library,
 * in exactly this order (before recommendation sorting is applied).
 * Leave empty to show ALL games from the registry.
 */
export type TenantContent = {
  gameIds: string[];
  featuredCollectionIds?: string[];
};

export type TenantConfig = {
  id: string;
  brand: TenantBrand;
  colors: TenantColors;
  content: TenantContent;
};

/**
 * A curated thematic grouping of games.
 * Collections are displayed in the Library above the full game list.
 */
export type Collection = {
  id: string;
  title: string;
  description: string;
  icon: string;
  gameIds: string[];
  recommendedMoments?: MomentType[];
  recommendedGroups?: GroupType[];
};
