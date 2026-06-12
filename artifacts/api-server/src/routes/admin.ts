import { Router } from "express";
import { db, usersTable, cropsTable, listingsTable, ordersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// GET /api/admin/stats
router.get("/admin/stats", async (req, res) => {
  try {
    const users = await db.select().from(usersTable);
    const listings = await db.select().from(listingsTable);
    const crops = await db.select().from(cropsTable);
    const orders = await db.select().from(ordersTable);

    const farmers = users.filter(u => u.role === "farmer");
    const buyers = users.filter(u => u.role === "buyer");
    const pendingVerifications = farmers.filter(u => !u.verified).length;
    const activeListings = listings.filter(l => l.available).length;
    const verifiedFarmers = farmers.filter(u => u.verified).length;
    const avgFarmerRating = farmers.filter(u => u.rating).length
      ? farmers.reduce((s, u) => s + (u.rating ?? 0), 0) / farmers.filter(u => u.rating).length
      : 0;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newUsersThisWeek = users.filter(u => new Date(u.createdAt) >= oneWeekAgo).length;

    const cropCounts = crops.reduce((acc, c) => {
      acc[c.cropName] = (acc[c.cropName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topCrops = Object.entries(cropCounts)
      .map(([cropName, count]) => ({ cropName, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const totalRevenue = listings.reduce((sum, l) => sum + ((l.minPrice + l.maxPrice) / 2) * l.quantity, 0);

    return res.json({
      totalUsers: users.length,
      totalFarmers: farmers.length,
      totalBuyers: buyers.length,
      totalListings: listings.length,
      totalCrops: crops.length,
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === "pending").length,
      pendingVerifications,
      totalRevenue: Math.round(totalRevenue),
      activeListings,
      newUsersThisWeek,
      verifiedFarmers,
      avgFarmerRating: Math.round(avgFarmerRating * 10) / 10,
      topCrops,
    });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/admin/users
router.get("/admin/users", async (req, res) => {
  try {
    const { role, verified } = req.query;
    let users = await db.select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      role: usersTable.role,
      verified: usersTable.verified,
      rating: usersTable.rating,
      trustScore: usersTable.trustScore,
      location: usersTable.location,
      createdAt: usersTable.createdAt,
    }).from(usersTable);

    if (role) users = users.filter(u => u.role === role);
    if (verified !== undefined) users = users.filter(u => u.verified === (verified === "true"));

    return res.json(users.map(u => ({ ...u, createdAt: u.createdAt.toISOString() })));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/admin/users/:id/verify
router.patch("/admin/users/:id/verify", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { verified } = req.body;
    const [updated] = await db.update(usersTable)
      .set({ verified: verified !== false })
      .where(eq(usersTable.id, id))
      .returning();
    if (!updated) return res.status(404).json({ error: "User not found" });
    return res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/admin/users/:id/suspend
router.patch("/admin/users/:id/suspend", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { suspended } = req.body;
    // We repurpose verified=false as suspension signal for now
    const [updated] = await db.update(usersTable)
      .set({ verified: suspended ? false : undefined })
      .where(eq(usersTable.id, id))
      .returning();
    if (!updated) return res.status(404).json({ error: "User not found" });
    return res.json({ success: true, userId: id, suspended: !!suspended });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/admin/listings/:id
router.delete("/admin/listings/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await db.delete(listingsTable).where(eq(listingsTable.id, id)).returning();
    if (!deleted.length) return res.status(404).json({ error: "Listing not found" });
    return res.json({ success: true, deletedId: id });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
