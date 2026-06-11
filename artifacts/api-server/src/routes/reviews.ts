import { Router } from "express";
import { db, reviewsTable, usersTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router = Router();

async function serializeReview(review: typeof reviewsTable.$inferSelect) {
  const [fromUser] = await db.select({ name: usersTable.name, role: usersTable.role })
    .from(usersTable).where(eq(usersTable.id, review.fromUserId)).limit(1);
  const [toUser] = await db.select({ name: usersTable.name })
    .from(usersTable).where(eq(usersTable.id, review.toUserId)).limit(1);
  return {
    ...review,
    fromUserName: fromUser?.name ?? "Unknown",
    toUserName: toUser?.name ?? "Unknown",
    fromUserRole: fromUser?.role ?? "buyer",
    listingId: review.listingId ?? null,
    comment: review.comment ?? null,
    createdAt: review.createdAt.toISOString(),
  };
}

// Recalculate and update trusted buyer score
async function refreshTrustScore(userId: number) {
  const reviews = await db.select().from(reviewsTable).where(eq(reviewsTable.toUserId, userId));
  if (reviews.length === 0) {
    await db.update(usersTable).set({ trustedBuyerScore: null }).where(eq(usersTable.id, userId));
    return;
  }
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  // Score = avg (1-5) scaled to 0-100, capped if too few reviews
  const count = reviews.length;
  const score = Math.min(100, Math.round((avg / 5) * 100 * Math.min(1, count / 3)));
  await db.update(usersTable).set({ trustedBuyerScore: score }).where(eq(usersTable.id, userId));
}

router.get("/reviews", async (req, res) => {
  const { toUserId, fromUserId } = req.query;
  try {
    let reviews = await db.select().from(reviewsTable);
    if (toUserId) reviews = reviews.filter(r => r.toUserId === parseInt(toUserId as string));
    if (fromUserId) reviews = reviews.filter(r => r.fromUserId === parseInt(fromUserId as string));
    reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const serialized = await Promise.all(reviews.map(serializeReview));
    return res.json(serialized);
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/reviews", async (req, res) => {
  const { fromUserId, toUserId, listingId, rating, comment } = req.body;
  if (!fromUserId || !toUserId || !rating) {
    return res.status(400).json({ error: "fromUserId, toUserId, rating required" });
  }
  if (fromUserId === toUserId) {
    return res.status(400).json({ error: "Cannot review yourself" });
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "rating must be 1–5" });
  }
  try {
    const [review] = await db.insert(reviewsTable).values({
      fromUserId,
      toUserId,
      listingId: listingId ?? null,
      rating,
      comment: comment ?? null,
    }).returning();
    await refreshTrustScore(toUserId);
    return res.status(201).json(await serializeReview(review));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/reviews/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const [review] = await db.select().from(reviewsTable).where(eq(reviewsTable.id, id)).limit(1);
    if (!review) return res.status(404).json({ error: "Review not found" });
    await db.delete(reviewsTable).where(eq(reviewsTable.id, id));
    await refreshTrustScore(review.toUserId);
    return res.status(204).send();
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
