import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { activeTenant } from "../config";
import { TenantConfig } from "../config/types";

const TenantContext = createContext<TenantConfig>(activeTenant);

/**
 * TenantProvider
 * ──────────────
 * Reads the active tenant config and applies its brand colors to the
 * document root as CSS custom properties, overriding the baseline values
 * in index.css. No other part of the engine is aware of multi-tenancy.
 */
export function TenantProvider({ children }: { children: ReactNode }) {
  const tenant = useMemo(() => activeTenant, []);

  useEffect(() => {
    const root = document.documentElement;
    const { colors } = tenant;

    const cssVarMap: Record<string, string | undefined> = {
      "--primary":               colors.primary,
      "--primary-foreground":    colors.primaryForeground,
      "--secondary":             colors.secondary,
      "--secondary-foreground":  colors.secondaryForeground,
      "--background":            colors.background,
      "--foreground":            colors.foreground,
      "--card":                  colors.card,
      "--muted":                 colors.muted,
      "--accent":                colors.accent,
    };

    for (const [varName, value] of Object.entries(cssVarMap)) {
      if (value !== undefined) {
        root.style.setProperty(varName, value);
      }
    }

    return () => {
      for (const varName of Object.keys(cssVarMap)) {
        root.style.removeProperty(varName);
      }
    };
  }, [tenant]);

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
}

/**
 * useTenant()
 * ───────────
 * Access the active tenant config from any component.
 * Safe to call outside TenantProvider — returns activeTenant as fallback.
 */
export function useTenant(): TenantConfig {
  return useContext(TenantContext);
}
