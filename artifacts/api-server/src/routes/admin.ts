import { Router } from "express";
import { db, usersTable, cropsTable, listingsTable } from "@workspace/db";

const router = Router();

router.get("/admin/stats", async (req, res) => {
  try {
    const users = await db.select().from(usersTable);
    const listings = await db.select().from(listingsTable);
    const crops = await db.select().from(cropsTable);

    const pendingVerifications = users.filter(u => u.role === "farmer" && !u.verified).length;
    const activeListings = listings.filter(l => l.available).length;

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

    const totalRevenue = listings.reduce((sum, l) => sum + l.price * l.quantity, 0);

    return res.json({
      totalUsers: users.length,
      pendingVerifications,
      totalRevenue: Math.round(totalRevenue),
      activeListings,
      newUsersThisWeek,
      topCrops,
    });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
