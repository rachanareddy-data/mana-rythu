import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router = Router();

function serializeUser(user: typeof usersTable.$inferSelect) {
  const { passwordHash: _, ...safe } = user;
  return { ...safe, rating: safe.rating ?? null, createdAt: safe.createdAt.toISOString() };
}

router.get("/users", async (req, res) => {
  try {
    const { role, verified } = req.query;
    let users = await db.select().from(usersTable);
    if (role) users = users.filter(u => u.role === role);
    if (verified !== undefined) users = users.filter(u => u.verified === (verified === "true"));
    return res.json(users.map(serializeUser));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(serializeUser(user));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/users/:id/verify", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const { verified } = req.body;
  if (typeof verified !== "boolean") return res.status(400).json({ error: "verified must be boolean" });
  try {
    const [updated] = await db.update(usersTable).set({ verified }).where(eq(usersTable.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "User not found" });
    return res.json(serializeUser(updated));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users/:id/rate", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const { rating } = req.body;
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "rating must be 1–5" });
  }
  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
    if (!user) return res.status(404).json({ error: "User not found" });
    const newCount = user.ratingCount + 1;
    const newRating = ((user.rating ?? 0) * user.ratingCount + rating) / newCount;
    const [updated] = await db.update(usersTable)
      .set({ rating: newRating, ratingCount: newCount })
      .where(eq(usersTable.id, id))
      .returning();
    return res.json(serializeUser(updated));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
