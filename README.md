# 🌾 Mana Rythu

AI-powered farm-to-buyer marketplace connecting farmers and buyers with crop listings, logistics estimation, real-time chat, smart search, and agriculture tools.

---

# 🚀 Run & Operate

```bash
pnpm --filter @workspace/api-server run dev
pnpm run typecheck
pnpm run build
pnpm --filter @workspace/api-spec run codegen
pnpm --filter @workspace/db run push
```

---

# ⚙️ Required Environment Variables

DATABASE_URL=PostgreSQL connection string  
JWT_SECRET=auth secret key  
OPENAI_API_KEY=optional AI features  

---

# 🧱 Stack

pnpm workspaces  
Node.js 24  
TypeScript 5.9  
Express 5  
PostgreSQL + Drizzle ORM  
Zod validation  
Orval OpenAPI codegen  
esbuild  

---

# 📁 Project Structure

artifacts/api-server → Backend API  
artifacts/mana-rythu → Frontend UI  
artifacts/db → Database schema  
artifacts/api-spec → OpenAPI contracts  
shared → Shared utilities  

---

# 🧠 Architecture

OpenAPI-first backend  
Type-safe API using Zod  
Monorepo structure  
Relative /api calls (deployment safe)  
Mobile-first UI design  

---

# 🌾 Features

Farmer ↔ Buyer marketplace  
Crop listings & pricing  
Logistics cost estimator  
Real-time chat system  
Smart search (Google-style)  
Order placement system  
Authentication (JWT)  
Mobile responsive UI  

---

# 👤 User Rules

Mobile-first design required  
No hidden features on small screens  
All API calls use /api  
Simple UX for farmers  
Telugu-friendly workflow  

---

# ⚠️ Gotchas

Always set DATABASE_URL  
No localhost URLs in frontend  
Run pnpm install before build  
Fix mobile padding issues  
Vite requires correct PORT in Replit  

---

# 📌 Key Paths

Backend → artifacts/api-server  
Frontend → artifacts/mana-rythu  
DB → artifacts/db  
API Spec → artifacts/api-spec  
