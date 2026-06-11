import { Router } from "express";
import { db, usersTable, listingsTable, reviewsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function serializeUser(user: typeof usersTable.$inferSelect) {
  const { passwordHash: _, ...safe } = user;
  return {
    ...safe,
    rating: safe.rating ?? null,
    bio: safe.bio ?? null,
    trustedBuyerScore: safe.trustedBuyerScore ?? null,
    createdAt: safe.createdAt.toISOString(),
  };
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

router.get("/users/:id/profile", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Get listings
    const listings = await db
      .select({ listing: listingsTable, farmerName: usersTable.name, farmerVerified: usersTable.verified, farmerRating: usersTable.rating })
      .from(listingsTable)
      .leftJoin(usersTable, eq(listingsTable.farmerId, usersTable.id))
      .where(eq(listingsTable.farmerId, id));

    const serializedListings = listings.map(r => ({
      ...r.listing,
      farmerName: r.farmerName ?? null,
      farmerVerified: r.farmerVerified ?? null,
      farmerRating: r.farmerRating ?? null,
      qualityGrade: r.listing.qualityGrade ?? null,
      qualityScore: r.listing.qualityScore ?? null,
      createdAt: r.listing.createdAt.toISOString(),
      updatedAt: r.listing.updatedAt.toISOString(),
    }));

    // Get reviews received
    const reviewsRaw = await db.select().from(reviewsTable).where(eq(reviewsTable.toUserId, id));
    const reviewUsers = reviewsRaw.length > 0
      ? await db.select({ id: usersTable.id, name: usersTable.name, role: usersTable.role }).from(usersTable)
      : [];

    const reviewsReceived = reviewsRaw
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10)
      .map(r => {
        const fromUser = reviewUsers.find(u => u.id === r.fromUserId);
        const toUser = reviewUsers.find(u => u.id === r.toUserId) ?? { name: user.name, role: user.role };
        return {
          ...r,
          fromUserName: fromUser?.name ?? "Unknown",
          toUserName: toUser?.name ?? "Unknown",
          fromUserRole: fromUser?.role ?? "buyer",
          listingId: r.listingId ?? null,
          comment: r.comment ?? null,
          createdAt: r.createdAt.toISOString(),
        };
      });

    return res.json({
      ...serializeUser(user),
      totalListings: listings.length,
      activeListings: listings.filter(r => r.listing.available).length,
      totalReviews: reviewsRaw.length,
      recentListings: serializedListings.slice(0, 5),
      recentReviews: reviewsReceived,
    });
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
