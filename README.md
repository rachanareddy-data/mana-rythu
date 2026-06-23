<div align="center">

# 🌾 Mana Rythu · మన రైతు

### The operating system for Indian agriculture

**Direct farmer-to-buyer commerce, AI crop intelligence, and transparent pricing — in one mobile-first platform.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-mana--rythu--ai-16a34a?style=for-the-badge&logo=replit&logoColor=white)](https://mana-rythu-ai.replit.app/)
[![GitHub](https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rachanareddy-data/mana-rythu)
[![Pitch Deck](https://img.shields.io/badge/Pitch_Deck-View-0ea5e9?style=for-the-badge&logo=readme&logoColor=white)](https://mana-rythu-ai.replit.app/pitch-deck/)

</div>

---

## Problem

India has over 140 million farmers, yet most capture only a fraction of what their crops are worth.

- **Limited market access** — a small circle of intermediaries leaves crops sold below fair value.
- **Price transparency challenges** — traditional mandis offer little visibility into real-time rates.
- **Lack of digital tools** — expert agronomic guidance rarely reaches rural farmers.
- **Language barriers** — most agri-tech is built English-first, excluding regional-language speakers.

---

## Solution

### 🛒 Marketplace
Direct farmer-to-buyer crop trading without intermediaries.

### 🌱 AI Crop Intelligence
AI-powered crop disease and pest detection using images.

### 📊 Price Intelligence
Fair-price benchmarking and market transparency.

### 🤖 AI Assistant
Multilingual farming guidance in Telugu and English.

### 💬 Real-Time Communication
Real-time chat between farmers and buyers.

---

## 📸 Product Screenshots

### Home
<img src="./screenshots/home.jpg" width="85%" />

### Marketplace
<img src="./screenshots/marketplace.jpg" width="85%" />

### Farmer Dashboard
<img src="./screenshots/farmer-dashboard.jpg" width="85%" />

### AI Assistant
<img src="./screenshots/ai-assistant.jpg" width="85%" />

### Real-Time Chat
<img src="./screenshots/chat.jpg" width="85%" />

---

## Why Now

The conditions for digital agriculture in India have only recently converged.

- **AI maturity** — models can now diagnose a crop from a photo and respond in regional languages.
- **Smartphone adoption** — affordable devices have reached deep into rural communities.
- **Digital payments** — UPI has normalized cashless transactions across small towns and villages.
- **Agriculture digitization** — public and private investment is pulling farming workflows online.

---

## Architecture

```
        Farmer / Buyer
              │
              ▼
       React Frontend
     (Vite · TypeScript)
              │
              ▼
        Express API
   (OpenAPI · Zod validation)
              │
              ▼
        PostgreSQL
       (Drizzle ORM)
              │
              ▼
       OpenAI GPT-4o
```

- **Type-safe APIs** — types flow from schema to frontend without drift.
- **OpenAPI contracts** — one contract drives generated client hooks and server validation.
- **Zod validation** — every request and response is validated at runtime.
- **Mobile-first** — designed for low-bandwidth devices before scaling up.

---

## Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=reactquery&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat&logo=express&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=flat&logo=openapiinitiative&logoColor=white)

**Database**

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat&logo=drizzle&logoColor=black)

**AI · Infrastructure**

![OpenAI](https://img.shields.io/badge/OpenAI_GPT--4o-412991?style=flat&logo=openai&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm_monorepo-F69220?style=flat&logo=pnpm&logoColor=white)
![Replit](https://img.shields.io/badge/Replit-F26207?style=flat&logo=replit&logoColor=white)

---

## Impact

- **Direct access** — removing intermediaries so more of each sale reaches the farmer.
- **AI-assisted decisions** — crop diagnosis previously out of reach in rural areas.
- **Transparency** — visibility into fair market rates before a deal is made.
- **Accessibility** — regional-language, mobile-first design for first-time smartphone users.

---

## Roadmap

| Status | Feature | Description |
|---|---|---|
| 🔴 Near-term | **UPI Payments** | In-app payments via UPI for end-to-end transactions |
| 🔴 Near-term | **Weather Intelligence** | Hyperlocal alerts for planting and harvest decisions |
| 🟡 Mid-term | **Crop Price Forecasting** | Regional price prediction to time sales |
| 🟡 Mid-term | **Logistics Tracking** | End-to-end shipment tracking for crop deliveries |
| 🟡 Mid-term | **AI Disease Detection** | Expanded photo-based crop disease identification |
| 🟢 Planned | **Multi-language Expansion** | Hindi, Kannada, and Marathi support |

---

## Getting Started

```bash
git clone https://github.com/rachanareddy-data/mana-rythu.git
cd mana-rythu

pnpm install

cp .env.example .env
# Fill in DATABASE_URL, SESSION_SECRET, OPENAI_API_KEY

pnpm --filter @workspace/db run push

pnpm --filter @workspace/api-server run dev    # API
pnpm --filter @workspace/mana-rythu run dev    # Frontend
```

---

## Author

**Rachana Baddam** · M.S. Data Science, Saint Peter's University
[GitHub](https://github.com/rachanareddy-data) · [Live Demo](https://mana-rythu-ai.replit.app/)

---

<div align="center">

### 140 Million Farmers. One Fair Market.

**Built with AI. Built for Farmers.**

</div>
