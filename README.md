# 🌾 Mana Rythu

**Mana Rythu** ("Our Farmer" in Telugu) is a premium agriculture marketplace platform built for farmers and buyers across Telangana and Andhra Pradesh. It enables direct farmer-to-buyer connections, real-time chat, AI-powered farming guidance, and transparent crop pricing — all from a mobile-first web app.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://mana-rythu.replit.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Express%20%7C%20PostgreSQL-blue)]()
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

---

## 📸 Screenshots

| Home Page | Marketplace | Farmer Dashboard |
|---|---|---|
| ![Home Page](docs/screenshots/home.png) | ![Marketplace](docs/screenshots/marketplace.png) | ![Farmer Dashboard](docs/screenshots/farmer-dashboard.png) |

| AI Assistant | Real-Time Chat |
|---|---|
| ![AI Assistant](docs/screenshots/ai-assistant.png) | ![Chat](docs/screenshots/chat.png) |

> Screenshots will be updated after final deployment.

---

## 🌍 Why Mana Rythu Matters

Agriculture is the backbone of Telangana and Andhra Pradesh — yet most farmers earn far below what their crops are worth. **Mana Rythu** was built to change that.

**The Problem:**
- Farmers depend heavily on middlemen who take a significant cut of their earnings
- Limited access to buyers means crops are sold at unfair prices
- Price transparency is nearly non-existent in traditional mandis
- Farmers lack access to expert agronomic guidance in their local language
- Geographic isolation limits market reach for rural farmers

**Our Solution:**
- **Direct marketplace** — farmers list their crops, buyers find them without intermediaries
- **Transparent fair pricing** — a built-in calculator shows market-rate comparisons
- **Real-time chat** — farmers and buyers negotiate directly, building trust
- **AI-powered assistant** — multilingual farming guidance available 24/7
- **Smart search** — buyers can discover crops by name, location, or variety instantly
- **Mobile-first design** — works on basic smartphones with low-bandwidth connections

Every rupee saved from middlemen goes directly back to the farmer's family. Mana Rythu is not just a platform — it is economic infrastructure for rural India.

---

## 🏗️ System Architecture

```
Farmer / Buyer (Mobile Browser)
         ↓
   React + Vite Frontend
   (Tailwind CSS, Framer Motion, React Query)
         ↓
   Express 5 REST API
   (OpenAPI Contract-First, Zod Validation)
         ↓
   PostgreSQL Database
   (Drizzle ORM, Type-safe Schemas)
         ↓
   OpenAI Services
   (AI Farming Assistant, Smart Recommendations)
```

**Key architectural decisions:**
- **Contract-first API** — OpenAPI spec drives Orval codegen for type-safe hooks and Zod schemas
- **Optimistic UI updates** — chat edits/deletes reflect instantly without waiting for server
- **pnpm monorepo** — shared `lib/db` and `lib/api-client-react` packages keep types consistent across frontend and backend
- **Mobile-first layout** — bottom navigation, safe-area insets, and full viewport chat windows

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛒 **Crop Marketplace** | Browse and search live crop listings with price, location, and availability |
| 💬 **Real-Time Chat** | WhatsApp-style messaging between farmers and buyers with edit/delete support |
| 🤖 **AI Assistant** | OpenAI-powered farming guidance in English and Telugu |
| 📊 **Fair Price Calculator** | Compare your crop price against regional market rates |
| 🔍 **Smart Search** | Live suggestions with relevance scoring across crops and locations |
| 👨‍🌾 **Farmer Dashboard** | Manage listings, track orders, and view analytics |
| 🛍️ **Buyer Dashboard** | Track purchases and manage conversations |
| 🔐 **Authentication** | Secure role-based login (Farmer / Buyer / Admin) |
| 📱 **Mobile-First** | Responsive design with bottom navigation and safe-area support |
| 🌐 **Multi-language** | Telugu/English language toggle |

---

## 🚀 Roadmap

The following features are planned for upcoming releases:

| Priority | Feature | Description |
|---|---|---|
| 🔴 High | **UPI Payments** | In-app payment processing via UPI for seamless transactions |
| 🔴 High | **Weather Alerts** | Hyperlocal weather notifications for planting and harvest decisions |
| 🟡 Medium | **Crop Price Prediction** | ML model to forecast regional crop prices 7–30 days ahead |
| 🟡 Medium | **Delivery Tracking** | End-to-end logistics tracking for crop shipments |
| 🟡 Medium | **AI Crop Disease Detection** | Photo-based disease identification using computer vision |
| 🟢 Planned | **Multi-language Support** | Expand to Hindi, Kannada, and Marathi |
| 🟢 Planned | **Farmer Credit Score** | Transaction-history-based credit rating for rural banking access |
| 🟢 Planned | **Cooperative Groups** | Allow farmer groups to pool inventory for bulk buyer contracts |

---

## 🎥 Demo Video

> **Coming Soon**

A complete walkthrough demonstrating the farmer listing flow, buyer discovery, real-time chat, and AI assistant will be published after final deployment. The video will cover both mobile and desktop experiences.

---

## 🎯 Design Principles

Mana Rythu is built around the reality that many users are first-time smartphone users in rural areas.

- **Mobile-first experience** — every screen is designed for a 375px viewport before scaling up to desktop
- **Simple farmer-friendly workflows** — core actions (list a crop, message a buyer) require 3 taps or fewer
- **No hidden functionality on small screens** — all features available on mobile, never hidden behind "desktop only" gates
- **Consistent UI across devices** — the same component library and design tokens render identically on Android WebView and desktop Chrome
- **Accessible and responsive design** — sufficient color contrast, large tap targets, and semantic HTML throughout
- **Progressive disclosure** — advanced features (analytics, bulk management) revealed only after the primary journey is complete

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 7, TypeScript 5.9, Tailwind CSS v4 |
| UI Components | shadcn/ui, Radix UI, Framer Motion |
| State & Data | TanStack Query v5 (React Query), Orval codegen |
| Backend | Node.js 24, Express 5, TypeScript |
| Database | PostgreSQL, Drizzle ORM, drizzle-zod |
| API Contract | OpenAPI 3.0, Zod validation |
| AI | OpenAI GPT-4o |
| Monorepo | pnpm workspaces |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/rachanareddy-data/mana-rythu.git
cd mana-rythu

# Install dependencies
pnpm install

# Set environment variables
cp .env.example .env
# Fill in DATABASE_URL, SESSION_SECRET, OPENAI_API_KEY

# Push database schema
pnpm --filter @workspace/db run push

# Start development servers
pnpm --filter @workspace/api-server run dev   # API on :8080
pnpm --filter @workspace/mana-rythu run dev   # Frontend on :24396
```

### Key Commands

```bash
pnpm run typecheck                          # Full TypeScript check
pnpm run build                              # Build all packages
pnpm --filter @workspace/api-spec run codegen  # Regenerate API hooks from OpenAPI spec
pnpm --filter @workspace/db run push        # Push DB schema changes

```

---