import { TenantConfig } from "../types";

/**
 * Tenant: Vive Valle Play
 * The flagship Vive Valle experience — rural houses, warm Mediterranean aesthetic.
 *
 * To create a new tenant, duplicate this file and adjust every field.
 * The engine (components, routing, game logic) is not touched.
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
    primary: "14 42% 52%",
    primaryForeground: "38 30% 97%",
    secondary: "78 18% 46%",
    secondaryForeground: "38 30% 97%",
    background: "38 28% 94%",
    foreground: "22 22% 17%",
    card: "38 22% 97%",
    muted: "34 16% 87%",
    accent: "38 28% 91%",
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
