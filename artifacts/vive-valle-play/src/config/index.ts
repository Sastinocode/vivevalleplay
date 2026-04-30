import { TenantConfig } from "./types";
import vivevalle from "./tenants/vive-valle";

/**
 * Tenant registry
 * ───────────────
 * Add new tenants here after creating their config file in ./tenants/.
 * Key = the value of the VITE_TENANT environment variable.
 */
const tenants: Record<string, TenantConfig> = {
  "vive-valle": vivevalle,
};

/**
 * Active tenant resolution order:
 *  1. VITE_TENANT environment variable  (set at build time or in .env)
 *  2. Falls back to "vive-valle"
 *
 * Usage in Replit: add VITE_TENANT=your-brand to Secrets.
 * Usage in CI/CD: set the env var before running `pnpm build`.
 */
const tenantId: string = import.meta.env.VITE_TENANT ?? "vive-valle";
const resolved = tenants[tenantId];

if (!resolved) {
  console.warn(
    `[config] Unknown tenant "${tenantId}". Falling back to "vive-valle".`
  );
}

export const activeTenant: TenantConfig = resolved ?? vivevalle;

export type { TenantConfig, TenantColors, TenantBrand, TenantContent, Collection } from "./types";
