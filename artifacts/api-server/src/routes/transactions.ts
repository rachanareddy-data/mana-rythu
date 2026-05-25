import { Router } from "express";
import { db, transactionsTable, cropsTable, usersTable } from "@workspace/db";
import { eq, or } from "drizzle-orm";
import {
  CreateTransactionBody,
  GetTransactionParams,
} from "@workspace/api-zod";
import { requireAuth, requireRole, type AuthRequest } from "../lib/auth";

const router = Router();

router.get("/transactions", requireAuth, async (req: AuthRequest, res): Promise<void> => {
  const userId = req.userId!;
  const userRole = req.userRole!;

  let rows;
  if (userRole === "admin") {
    rows = await db.select().from(transactionsTable).orderBy(transactionsTable.createdAt);
  } else {
    rows = await db
      .select()
      .from(transactionsTable)
      .where(or(eq(transactionsTable.buyerId, userId), eq(transactionsTable.farmerId, userId)))
      .orderBy(transactionsTable.createdAt);
  }

  const enriched = await Promise.all(
    rows.map(async (t) => {
      const [crop] = await db.select().from(cropsTable).where(eq(cropsTable.id, t.cropId));
      const [buyer] = await db.select().from(usersTable).where(eq(usersTable.id, t.buyerId));
      const [farmer] = await db.select().from(usersTable).where(eq(usersTable.id, t.farmerId));
      return {
        ...t,
        cropName: crop?.name ?? null,
        buyerName: buyer?.name ?? null,
        farmerName: farmer?.name ?? null,
        createdAt: t.createdAt.toISOString(),
      };
    })
  );

  res.json(enriched);
});

router.post("/transactions", requireAuth, requireRole("buyer"), async (req: AuthRequest, res): Promise<void> => {
  const parsed = CreateTransactionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { cropId, amount } = parsed.data;
  const [crop] = await db.select().from(cropsTable).where(eq(cropsTable.id, cropId));
  if (!crop) {
    res.status(404).json({ error: "Crop not found" });
    return;
  }

  const upiUrl = `upi://pay?pa=manaRythu@upi&pn=ManaRythu&am=${amount}&cu=INR`;

  const [transaction] = await db
    .insert(transactionsTable)
    .values({
      buyerId: req.userId!,
      farmerId: crop.farmerId,
      cropId,
      amount,
      status: "pending",
      upiUrl,
    })
    .returning();

  const [buyer] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!));
  const [farmer] = await db.select().from(usersTable).where(eq(usersTable.id, crop.farmerId));

  res.status(201).json({
    ...transaction,
    cropName: crop.name,
    buyerName: buyer?.name ?? null,
    farmerName: farmer?.name ?? null,
    createdAt: transaction.createdAt.toISOString(),
  });
});

router.get("/transactions/:id", requireAuth, async (req: AuthRequest, res): Promise<void> => {
  const params = GetTransactionParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [t] = await db.select().from(transactionsTable).where(eq(transactionsTable.id, params.data.id));
  if (!t) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }

  if (req.userRole !== "admin" && t.buyerId !== req.userId && t.farmerId !== req.userId) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const [crop] = await db.select().from(cropsTable).where(eq(cropsTable.id, t.cropId));
  const [buyer] = await db.select().from(usersTable).where(eq(usersTable.id, t.buyerId));
  const [farmer] = await db.select().from(usersTable).where(eq(usersTable.id, t.farmerId));

  res.json({
    ...t,
    cropName: crop?.name ?? null,
    buyerName: buyer?.name ?? null,
    farmerName: farmer?.name ?? null,
    createdAt: t.createdAt.toISOString(),
  });
});

export default router;
