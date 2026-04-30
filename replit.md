# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Vive Valle Play — `artifacts/vive-valle-play/`
Mobile-first React + Vite + TypeScript + Tailwind CSS v4 web app for guided social games in Spanish.

**Routes:**
- `/` — Mobile app home screen (splash + start)
- `/landing` — Full marketing landing page
- `/grupo` — Group setup (player count)
- `/momento` — Moment selector (occasion cards)
- `/juegos` — Game library browser
- `/juego/:id` — Active game screen
- `/resultado/:id` — Post-game result / reward
- `/recuerdos` — Memory collection (localStorage)

**Branding (Vive Valle):**
- Font: Syne 800 for all headings, DM Sans 300/400/500 for body
- Primary: olive `#4a5730` (HSL 81 29% 27%)
- Accent/CTA: terra `#c87a4e` (HSL 21 47% 54%)
- Background: cream `#f5f1ea`
- Foreground: ink `#1e2212`
- Logo: `public/logo-vive-valle.png` (transparent background)

**Architecture:**
- Multi-tenant config system: `src/config/tenants/`, `src/config/index.ts`
- CSS variables applied dynamically via `TenantProvider` in `src/context/TenantContext.tsx`
- Games defined in `src/data/games.ts`, collections in `src/data/collections.ts`
- Recommendation engine in `src/utils/recommendation.ts`
- localStorage persistence for session and memories
