---
name: Chat messages endpoint design
description: Why GET /chat/messages uses query params instead of path params
---

## Rule
The messages endpoint is `GET /api/chat/messages?conversationId=N` (query param), NOT `GET /api/chat/messages/{conversationId}` (path param).

**Why:** A path param `{conversationId}` combined with a query param `markReadFor` causes Orval to generate a `GetMessagesParams` type in BOTH `api.ts` AND `types/`, creating a duplicate export conflict. Using only query params avoids this.

**How to apply:** The backend route handler reads `req.query.conversationId` (not `req.params`). Frontend uses `useGetMessages({ conversationId, markReadFor })`.
