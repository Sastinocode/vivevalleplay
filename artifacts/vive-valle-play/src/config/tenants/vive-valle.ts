import { TenantConfig } from "../types";

/**
 * Tenant: Vive Valle Play
 * Olive + terracotta palette. Syne 800 headings, DM Sans body.
 */
const vivevalle: TenantConfig = {
  id: "vive-valle",

  brand: {
    name: "Vive Valle Play",
    tagline: "Juegos y momentos para disfrutar juntos",
    monogram: "V",
    footer: "Una experiencia de Vive Valle",
  },

  colors: {
    primary: "81 29% 27%",           /* #4a5730 olive */
    primaryForeground: "40 30% 97%",
    secondary: "21 47% 54%",         /* #c87a4e terra */
    secondaryForeground: "0 0% 100%",
    background: "40 22% 94%",
    foreground: "78 26% 10%",        /* #1e2212 ink */
    card: "40 30% 97%",
    muted: "78 20% 83%",             /* #d6dcc8 olive-pale */
    accent: "35 20% 88%",            /* #ede8df cream-dark */
  },

  content: {
    gameIds: [
      "juicio-casa",
      "cena-imposible",
      "noche-verdades",
      "circo-talentos",
      "ultimo-brindis",
    ],
    featuredCollectionIds: ["llegada", "cena", "despedida"],
  },
};

export default vivevalle;
