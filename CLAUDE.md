# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

NeuroX is a hackathon platform — a Next.js 16 App Router app with a Supabase backend. It features a dark cyberpunk-themed marketing/registration landing page and a clean Devpost-style project showcase (gallery, submission, voting, comments). The site is deployed on Vercel.

**Event**: NeuroX — a three-phase AI hackathon (online qualifier → remote build → on-site finale) at NSBM Green University, Sri Lanka, July 2026.

## Commands

| Command | Description |
|---------|-------------|
| `bun --bun next dev` | Start dev server on port 3000 |
| `bun --bun next build` | Production build |
| `bun --bun next start` | Start production server |
| `bun run lint` | Run ESLint (Next.js core-web-vitals + TypeScript rules) |
| `bun run export` | Export all registrations from Supabase to a dated `.xlsx` file |

**Important**: Bun is the runtime for both dev and the export script. Do not use `npm run` — use `bun run` or `bun --bun`.

## Environment Variables

Configured in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (`https://wljniiaolxpjnlrfxutn.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase publishable (anon) key used by the app and server actions
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service_role key (only used by the export script for full table access; **never expose client-side**)

The export script (`scripts/export-registrations.ts`) parses `.env.local` manually — it does not rely on Next.js env loading.

## Architecture

### Page Structure (Single Page)

`src/app/page.tsx` composes the full landing page as a vertical stack of sections, each in its own component under `src/app/components/`:

```
Nav → Hero → About → Timeline → Eligibility → DeliverablesCriteria → Outcomes → RegistrationForm → Footer
```

Every section has its own `id` anchor for scroll navigation. The `Nav` component links to these anchors.

### Registration Flow (Server Action)

The registration form uses React 19's form hooks:

1. `RegistrationForm.tsx` (client component) uses `useActionState(registerTeam, initialState)` and `useFormStatus()` for pending state
2. `registerTeam` in `src/app/actions/register.ts` is a Server Action (`"use server"`) — it runs server-side
3. Validation happens on the server, then inserts into the Supabase `registrations` table
4. The `members` field is a JSONB column — `@supabase/supabase-js` auto-serializes the `{name, email}[]` array

**Important**: This uses `useActionState` (React 19), not the older `useFormState` from React 18.

### Supabase Client

`src/lib/supabase.ts` exports `createSupabaseServerClient()` — creates a Supabase client using the **anon key** for server-side use. RLS policies control access. The export script uses the **service role key** instead, bypassing RLS.

### Database

Single table `public.registrations`:

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Auto-generated primary key |
| `team_name` | `text` | |
| `university` | `text` | |
| `members` | `jsonb` | Array of `{name: string, email: string}` objects (max 4) |
| `submitted_at` | `timestamptz` | Defaults to `now()` |

RLS is enabled. The export script uses the service_role key and is the only place that reads all rows.

### Loading Screen

`src/app/loading.tsx` is a full-screen overlay with a terminal boot sequence (staggered log lines + animated progress bar). It's shown automatically by Next.js during route navigation. The `InitialLoadingOverlay` component (`src/app/components/InitialLoadingOverlay.tsx`) provides the first-visit loading state that auto-fades out.

### Export Script

`scripts/export-registrations.ts` is a standalone Bun script (not part of the Next.js build):
- Loads `.env.local` manually
- Connects to Supabase with the **service_role key** (needs full read access)
- Fetches all registrations ordered by `submitted_at`
- Flattens the JSONB `members` array into 4 fixed member name/email columns
- Generates a styled Excel file with `exceljs` named `neurox-registrations-YYYY-MM-DD.xlsx`

## Styling

Tailwind CSS v4 with CSS-first configuration in `src/app/globals.css` — there is no `tailwind.config.ts`.

Design tokens are defined as CSS custom properties in `:root` and bridged into Tailwind via `@theme inline`. All colors use the `--color-*` namespace:

- **Backgrounds**: `bg-primary` (#0a0a0f), `bg-secondary`, `bg-tertiary`, `bg-card`
- **Accents**: `accent-cyan` (primary), `accent-blue`, `accent-purple`, `accent-pink`
- **Text**: `text-primary` (#e8e8ed), `text-secondary`, `text-dim`
- **Semantic**: `success` (green), `error` (red)

Custom effects:
- `.scanlines` — fixed CRT scanline overlay (added to `<body>`)
- `.glow-border` / `.glow-border-active` — animated gradient border pseudo-element
- `.gradient-text` / `.gradient-text-cyan` — gradient text via `background-clip: text`
- `.terminal-cursor` — blinking underscore cursor
- Grid background on `body::before` (64px cyan grid)

Respect `prefers-reduced-motion` — all animations/transitions are disabled when the user prefers reduced motion (see the media query at the end of `globals.css`).

## Key Dependencies

- `next@16.2.9` — App Router with React 19.2.4 (React Compiler enabled via `reactCompiler: true` in next.config.ts)
- `@supabase/supabase-js@^2.108.1` — Supabase client
- `exceljs@^4.4.0` — Excel file generation (export script only)
- `tailwindcss@^4` — CSS-first configuration via `@theme inline` in globals.css
- `babel-plugin-react-compiler@1.0.0` — React Compiler (enabled in next.config.ts)

## Import Alias

`@/*` maps to `./src/*` (configured in tsconfig.json `paths`).

## Next.js Version Notes

This project uses Next.js 16 (specifically 16.2.9). Before writing any code, read the relevant guide in `node_modules/next/dist/docs/` — APIs, conventions, and file structure may differ from earlier versions. The docs index (`node_modules/next/dist/docs/index.md`) includes a hint about `unstable_instant` for fixing slow client-side navigations (Suspense alone is not enough).
