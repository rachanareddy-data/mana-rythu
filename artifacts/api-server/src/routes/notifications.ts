import { Router } from "express";
import { db, notificationsTable, usersTable } from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";

const router = Router();

// GET /notifications?userId=X
router.get("/notifications", async (req, res) => {
  const userId = Number(req.query.userId);
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "userId query param required" });
  }
  try {
    const rows = await db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.userId, userId))
      .orderBy(desc(notificationsTable.createdAt))
      .limit(50);

    const unreadCount = rows.filter(n => !n.read).length;

    return res.json({
      notifications: rows.map(n => ({
        ...n,
        createdAt: n.createdAt.toISOString(),
      })),
      unreadCount,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch notifications");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /notifications/:id/read — mark single notification as read
router.patch("/notifications/:id/read", async (req, res) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const [updated] = await db
      .update(notificationsTable)
      .set({ read: true })
      .where(eq(notificationsTable.id, id))
      .returning();
    if (!updated) return res.status(404).json({ error: "Notification not found" });
    return res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Failed to mark notification as read");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /notifications/read-all?userId=X — mark all as read
router.patch("/notifications/read-all", async (req, res) => {
  const userId = Number(req.query.userId);
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "userId query param required" });
  }
  try {
    await db
      .update(notificationsTable)
      .set({ read: true })
      .where(and(eq(notificationsTable.userId, userId), eq(notificationsTable.read, false)));
    return res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to mark all notifications as read");
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /notifications — create a notification (internal use / seeding)
router.post("/notifications", async (req, res) => {
  const { userId, type, title, message } = req.body;
  if (!userId || !title || !message) {
    return res.status(400).json({ error: "userId, title, message are required" });
  }
  try {
    // Verify user exists
    const [user] = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    if (!user) return res.status(404).json({ error: "User not found" });

    const [notif] = await db
      .insert(notificationsTable)
      .values({ userId, type: type ?? "info", title, message })
      .returning();
    return res.status(201).json({ ...notif, createdAt: notif.createdAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Failed to create notification");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
