# Mana Rythu

A production-ready direct farm-to-buyer marketplace connecting Indian farmers with buyers, cutting out middlemen for fair prices.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, served at /api)
- `pnpm --filter @workspace/mana-rythu run dev` — run the React frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)
- Optional env: `OPENAI_API_KEY` — for AI agricultural assistant chat
- Optional env: `JWT_SECRET` — override default JWT secret in production

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + TailwindCSS + Wouter + TanStack Query
- API: Express 5 + JWT auth + bcryptjs + helmet + rate limiting
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- AI: OpenAI GPT-4o-mini (agricultural assistant)
- Weather: NASA POWER API (yield predictions)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/` — Drizzle table definitions (users, crops, transactions)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/api-server/src/lib/auth.ts` — JWT middleware + helpers
- `artifacts/mana-rythu/src/` — React frontend
- `artifacts/mana-rythu/src/contexts/AuthContext.tsx` — Auth state context

## Architecture decisions

- JWT stored in localStorage (`mana_rythu_token`) — passed via `setAuthTokenGetter` from `@workspace/api-client-react`
- Admin users cannot self-register (API blocks admin/other roles); admin must be created directly in DB or by another admin
- OpenAI client is lazy-initialized per request to avoid crash on missing API key
- NASA POWER API falls back to estimated data if satellite fetch fails
- Role-based access: farmers create crops, buyers create transactions, admins verify/manage all

## Product

- **Home**: Landing page with marketplace teaser and stats
- **Marketplace** (`/marketplace`): Browse crops with search + category/organic/verified filters
- **Crop Detail** (`/crop/:id`): Full crop info with UPI payment link generation
- **Farmer Dashboard** (`/farmer/dashboard`): Manage listings and income
- **Buyer Dashboard** (`/buyer/dashboard`): Purchase history
- **Admin Panel** (`/admin`): Verify farmers/crops, manage users and transactions
- **AI Assistant** (`/ai-assistant`): Chat with agri AI + NASA weather/yield predictions
- **Maps** (`/maps`): Visual crop location map across India

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always run `pnpm run typecheck:libs` after changing `lib/db/src/schema/` before typechecking the API server
- After OpenAPI spec changes, run `pnpm --filter @workspace/api-spec run codegen` before building
- Admin role cannot be registered through the API — insert directly via SQL or update the role column
- JWT_SECRET defaults to a dev-only value; always set it in production via env var

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Sample credentials: admin@manarythu.com/admin123 (after DB seeding — role set manually), ramu@farmer.com/farmer123, suresh@buyer.com/buyer123
