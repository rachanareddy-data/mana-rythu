import { Router } from "express";
import { db, conversationsTable, messagesTable, usersTable, listingsTable } from "@workspace/db";
import { eq, and, or, desc } from "drizzle-orm";

const router = Router();

// POST /api/chat/conversation — find or create
router.post("/chat/conversation", async (req, res) => {
  try {
    const { buyerId, farmerId, listingId } = req.body;
    if (!buyerId || !farmerId) {
      return res.status(400).json({ error: "buyerId and farmerId are required" });
    }

    // Check if conversation already exists for this buyer+farmer+listing combo
    const existing = await db.select().from(conversationsTable)
      .where(
        and(
          eq(conversationsTable.buyerId, buyerId),
          eq(conversationsTable.farmerId, farmerId),
          listingId ? eq(conversationsTable.listingId, listingId) : eq(conversationsTable.listingId, listingId ?? null)
        )
      )
      .limit(1);

    if (existing.length) {
      return res.json(serializeConversation(existing[0]));
    }

    const [conv] = await db.insert(conversationsTable).values({
      buyerId,
      farmerId,
      listingId: listingId ?? null,
    }).returning();

    return res.status(201).json(serializeConversation(conv));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/chat/conversations — list all conversations for a user
router.get("/chat/conversations", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const uid = parseInt(userId as string);
    const convs = await db.select().from(conversationsTable)
      .where(or(eq(conversationsTable.buyerId, uid), eq(conversationsTable.farmerId, uid)));

    const enriched = await Promise.all(convs.map(async (c) => {
      const [buyer] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, c.buyerId)).limit(1);
      const [farmer] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, c.farmerId)).limit(1);
      const [listing] = c.listingId
        ? await db.select({ cropName: listingsTable.cropName }).from(listingsTable).where(eq(listingsTable.id, c.listingId)).limit(1)
        : [null];
      const lastMsgs = await db.select().from(messagesTable)
        .where(eq(messagesTable.conversationId, c.id))
        .limit(1);
      const unread = await db.select().from(messagesTable)
        .where(and(eq(messagesTable.conversationId, c.id), eq(messagesTable.read, false)));
      const unreadForUser = unread.filter(m => m.senderId !== uid).length;

      return {
        ...serializeConversation(c),
        buyerName: buyer?.name ?? null,
        farmerName: farmer?.name ?? null,
        cropName: listing?.cropName ?? null,
        lastMessage: lastMsgs[0]?.message ?? null,
        lastMessageAt: lastMsgs[0]?.createdAt.toISOString() ?? c.createdAt.toISOString(),
        unreadCount: unreadForUser,
      };
    }));

    return res.json(enriched.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/chat/conversation/:id
router.get("/chat/conversation/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [conv] = await db.select().from(conversationsTable).where(eq(conversationsTable.id, id)).limit(1);
    if (!conv) return res.status(404).json({ error: "Conversation not found" });

    const [buyer] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, conv.buyerId)).limit(1);
    const [farmer] = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, conv.farmerId)).limit(1);

    return res.json({ ...serializeConversation(conv), buyerName: buyer?.name ?? null, farmerName: farmer?.name ?? null });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/chat/message
router.post("/chat/message", async (req, res) => {
  try {
    const { conversationId, senderId, message } = req.body;
    if (!conversationId || !senderId || !message?.trim()) {
      return res.status(400).json({ error: "conversationId, senderId, message are required" });
    }

    const [conv] = await db.select().from(conversationsTable).where(eq(conversationsTable.id, conversationId)).limit(1);
    if (!conv) return res.status(404).json({ error: "Conversation not found" });

    const [msg] = await db.insert(messagesTable).values({ conversationId, senderId, message: message.trim() }).returning();
    return res.status(201).json(serializeMessage(msg));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/chat/message/:id — sender only
router.patch("/chat/message/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { senderId, message } = req.body;
    if (!id || !senderId || !message?.trim()) {
      return res.status(400).json({ error: "id, senderId and message are required" });
    }

    const [msg] = await db.select().from(messagesTable).where(eq(messagesTable.id, id)).limit(1);
    if (!msg) return res.status(404).json({ error: "Message not found" });
    if (msg.senderId !== parseInt(senderId)) return res.status(403).json({ error: "Not authorized" });

    const [updated] = await db.update(messagesTable)
      .set({ message: message.trim(), edited: true })
      .where(eq(messagesTable.id, id))
      .returning();

    return res.json(serializeMessage(updated));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/chat/message/:id — sender only
router.delete("/chat/message/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { senderId } = req.body ?? {};
    if (!id) return res.status(400).json({ error: "Invalid message id" });

    const [msg] = await db.select().from(messagesTable).where(eq(messagesTable.id, id)).limit(1);
    if (!msg) return res.status(404).json({ error: "Message not found" });
    if (senderId && msg.senderId !== parseInt(senderId)) return res.status(403).json({ error: "Not authorized" });

    await db.delete(messagesTable).where(eq(messagesTable.id, id));
    return res.status(204).end();
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/chat/messages?conversationId=
router.get("/chat/messages", async (req, res) => {
  try {
    const conversationId = parseInt(req.query.conversationId as string);
    if (!conversationId) return res.status(400).json({ error: "conversationId query param is required" });
    const { markReadFor } = req.query;

    const msgs = await db.select().from(messagesTable)
      .where(eq(messagesTable.conversationId, conversationId));

    // Mark messages as read for the requesting user
    if (markReadFor) {
      const uid = parseInt(markReadFor as string);
      const toMark = msgs.filter(m => m.senderId !== uid && !m.read).map(m => m.id);
      if (toMark.length) {
        await db.update(messagesTable)
          .set({ read: true })
          .where(eq(messagesTable.conversationId, conversationId));
      }
    }

    return res.json(msgs.map(serializeMessage));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

function serializeConversation(c: typeof conversationsTable.$inferSelect) {
  return { ...c, createdAt: c.createdAt.toISOString() };
}

function serializeMessage(m: typeof messagesTable.$inferSelect) {
  return { ...m, createdAt: m.createdAt.toISOString(), edited: m.edited ?? false };
}

export default router;
