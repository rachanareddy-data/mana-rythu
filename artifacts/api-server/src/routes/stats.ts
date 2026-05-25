import { Router } from "express";
import { db, usersTable, cropsTable, transactionsTable } from "@workspace/db";
import { eq, sql, desc } from "drizzle-orm";

const router = Router();

router.get("/stats/dashboard", async (_req, res): Promise<void> => {
  const [cropStats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      verified: sql<number>`count(*) filter (where verified = true)::int`,
      organic: sql<number>`count(*) filter (where organic = true)::int`,
    })
    .from(cropsTable);

  const [userStats] = await db
    .select({
      farmers: sql<number>`count(*) filter (where role = 'farmer')::int`,
      buyers: sql<number>`count(*) filter (where role = 'buyer')::int`,
    })
    .from(usersTable);

  const [txStats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      revenue: sql<number>`coalesce(sum(amount), 0)::float`,
    })
    .from(transactionsTable);

  res.json({
    totalCrops: cropStats?.total ?? 0,
    totalFarmers: userStats?.farmers ?? 0,
    totalBuyers: userStats?.buyers ?? 0,
    totalTransactions: txStats?.total ?? 0,
    totalRevenue: txStats?.revenue ?? 0,
    verifiedCrops: cropStats?.verified ?? 0,
    organicCrops: cropStats?.organic ?? 0,
  });
});

router.get("/stats/categories", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      category: cropsTable.category,
      count: sql<number>`count(*)::int`,
    })
    .from(cropsTable)
    .groupBy(cropsTable.category)
    .orderBy(desc(sql`count(*)`));

  res.json(rows);
});

router.get("/stats/recent-activity", async (_req, res): Promise<void> => {
  const txs = await db
    .select()
    .from(transactionsTable)
    .orderBy(desc(transactionsTable.createdAt))
    .limit(10);

  const activities = txs.map((t) => ({
    id: t.id,
    type: "transaction",
    description: `Transaction #${t.id} — ₹${t.amount.toFixed(2)}`,
    amount: t.amount,
    createdAt: t.createdAt.toISOString(),
  }));

  res.json(activities);
});

export default router;
