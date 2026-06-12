import { Router } from "express";
import { db, ordersTable, listingsTable, usersTable } from "@workspace/db";
import { eq, or, and } from "drizzle-orm";
import { notify } from "../lib/notify";

const router = Router();

function serializeOrder(
  order: typeof ordersTable.$inferSelect,
  extras?: {
    buyerName?: string | null;
    farmerName?: string | null;
    cropName?: string | null;
  }
) {
  return {
    ...order,
    buyerName: extras?.buyerName ?? null,
    farmerName: extras?.farmerName ?? null,
    cropName: extras?.cropName ?? null,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  };
}

// POST /api/orders
router.post("/orders", async (req, res) => {
  try {
    const { listingId, buyerId, quantity, offeredPrice, note } = req.body;
    if (!listingId || !buyerId || quantity === undefined || offeredPrice === undefined) {
      return res.status(400).json({ error: "listingId, buyerId, quantity, offeredPrice are required" });
    }

    const listing = await db.select().from(listingsTable).where(eq(listingsTable.id, listingId)).limit(1);
    if (!listing.length) return res.status(404).json({ error: "Listing not found" });
    const l = listing[0];

    const totalAmount = quantity * offeredPrice;
    const [order] = await db.insert(ordersTable).values({
      listingId,
      buyerId,
      farmerId: l.farmerId,
      quantity,
      offeredPrice,
      totalAmount,
      status: "pending",
      note: note ?? null,
    }).returning();

    const buyer = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, buyerId)).limit(1);
    const buyerName = buyer[0]?.name ?? "A buyer";

    await notify(l.farmerId, "order",
      "New Order Received",
      `${buyerName} placed an order for ${quantity} ${l.unit} of ${l.cropName} at ₹${offeredPrice}/${l.unit}.`
    );

    return res.status(201).json(serializeOrder(order, { cropName: l.cropName }));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/orders
router.get("/orders", async (req, res) => {
  try {
    const { buyerId, farmerId, status } = req.query;
    if (!buyerId && !farmerId) {
      return res.status(400).json({ error: "buyerId or farmerId query param is required" });
    }

    const buyer = usersTable;
    const farmer = usersTable;

    let rows = await db
      .select({
        order: ordersTable,
        cropName: listingsTable.cropName,
        buyerName: buyer.name,
        farmerId2: ordersTable.farmerId,
      })
      .from(ordersTable)
      .leftJoin(listingsTable, eq(ordersTable.listingId, listingsTable.id))
      .leftJoin(buyer, eq(ordersTable.buyerId, buyer.id));

    if (buyerId) rows = rows.filter(r => r.order.buyerId === parseInt(buyerId as string));
    if (farmerId) rows = rows.filter(r => r.order.farmerId === parseInt(farmerId as string));
    if (status) rows = rows.filter(r => r.order.status === status);

    const allFarmerIds = [...new Set(rows.map(r => r.order.farmerId))];
    const farmerMap: Record<number, string> = {};
    if (allFarmerIds.length) {
      const farmers = await db.select({ id: usersTable.id, name: usersTable.name })
        .from(usersTable)
        .where(or(...allFarmerIds.map(id => eq(usersTable.id, id))));
      farmers.forEach(f => { farmerMap[f.id] = f.name; });
    }

    return res.json(rows.map(r => serializeOrder(r.order, {
      cropName: r.cropName,
      buyerName: r.buyerName,
      farmerName: farmerMap[r.order.farmerId] ?? null,
    })));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/orders/:id
router.get("/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await db
      .select({ order: ordersTable, cropName: listingsTable.cropName, buyerName: usersTable.name })
      .from(ordersTable)
      .leftJoin(listingsTable, eq(ordersTable.listingId, listingsTable.id))
      .leftJoin(usersTable, eq(ordersTable.buyerId, usersTable.id))
      .where(eq(ordersTable.id, id))
      .limit(1);

    if (!rows.length) return res.status(404).json({ error: "Order not found" });
    const { order, cropName, buyerName } = rows[0];

    const farmerResult = await db.select({ name: usersTable.name }).from(usersTable).where(eq(usersTable.id, order.farmerId)).limit(1);
    return res.json(serializeOrder(order, { cropName, buyerName, farmerName: farmerResult[0]?.name ?? null }));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/orders/:id/status
router.patch("/orders/:id/status", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const VALID = ["pending", "accepted", "rejected", "processing", "shipped", "delivered", "cancelled"];
    if (!status || !VALID.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${VALID.join(", ")}` });
    }

    const existing = await db.select().from(ordersTable).where(eq(ordersTable.id, id)).limit(1);
    if (!existing.length) return res.status(404).json({ error: "Order not found" });
    const order = existing[0];

    const [updated] = await db.update(ordersTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(ordersTable.id, id))
      .returning();

    const listing = await db.select({ cropName: listingsTable.cropName, unit: listingsTable.unit }).from(listingsTable).where(eq(listingsTable.id, order.listingId)).limit(1);
    const cropName = listing[0]?.cropName ?? "crop";

    const statusLabels: Record<string, string> = {
      accepted: "accepted",
      rejected: "rejected",
      processing: "is being processed",
      shipped: "has been shipped",
      delivered: "has been delivered",
      cancelled: "was cancelled",
    };
    const label = statusLabels[status];
    if (label) {
      await notify(order.buyerId, "order",
        `Order ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        `Your order for ${cropName} ${label}.`
      );
    }

    return res.json(serializeOrder(updated, { cropName }));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
