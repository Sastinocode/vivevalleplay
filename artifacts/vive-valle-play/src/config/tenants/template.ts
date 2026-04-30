/**
 * TENANT TEMPLATE
 * ─────────────────────────────────────────────────────────────────
 * How to add a new client / accommodation:
 *
 * 1. Duplicate this file, rename it to your-brand.ts
 * 2. Fill in the brand, colors and content sections below
 * 3. Set VITE_TENANT=your-brand in the deployment environment
 * 4. Register the new tenant in src/config/index.ts
 *
 * No changes to the game engine, components, or routing are needed.
 * ─────────────────────────────────────────────────────────────────
 */
import { TenantConfig } from "../types";

const template: TenantConfig = {
  id: "your-brand",

  brand: {
    name: "Your Brand Play",
    tagline: "Your tagline goes here",
    monogram: "Y",
    footer: "An experience by Your Brand",
  },

  colors: {
    primary: "220 60% 50%",
    primaryForeground: "0 0% 100%",
    secondary: "160 30% 45%",
    secondaryForeground: "0 0% 100%",
    background: "220 15% 96%",
    foreground: "220 20% 15%",
    card: "220 12% 99%",
    muted: "220 10% 90%",
    accent: "220 15% 93%",
  },

  content: {
    gameIds: [
      "juicio-casa",
      "cena-imposible",
    ],
    featuredCollectionIds: ["llegada"],
  },
};

export default template;
