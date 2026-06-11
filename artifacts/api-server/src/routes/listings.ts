import { Router } from "express";
import { db, listingsTable, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function serializeListing(
  listing: typeof listingsTable.$inferSelect,
  farmer?: { name: string | null; verified: boolean | null; rating: number | null } | null
) {
  return {
    ...listing,
    farmerName: farmer?.name ?? null,
    farmerVerified: farmer?.verified ?? null,
    farmerRating: farmer?.rating ?? null,
    createdAt: listing.createdAt.toISOString(),
    updatedAt: listing.updatedAt.toISOString(),
  };
}

router.get("/listings", async (req, res) => {
  try {
    const { farmerId, cropName, location, minPrice, maxPrice, trend } = req.query;
    const results = await db
      .select({
        listing: listingsTable,
        farmerName: usersTable.name,
        farmerVerified: usersTable.verified,
        farmerRating: usersTable.rating,
      })
      .from(listingsTable)
      .leftJoin(usersTable, eq(listingsTable.farmerId, usersTable.id));

    let filtered = results;
    if (farmerId) filtered = filtered.filter(r => r.listing.farmerId === parseInt(farmerId as string));
    if (cropName) {
      const q = (cropName as string).toLowerCase();
      filtered = filtered.filter(r => r.listing.cropName.toLowerCase().includes(q));
    }
    if (location) {
      const q = (location as string).toLowerCase();
      filtered = filtered.filter(r => r.listing.location.toLowerCase().includes(q));
    }
    if (minPrice) filtered = filtered.filter(r => r.listing.maxPrice >= parseFloat(minPrice as string));
    if (maxPrice) filtered = filtered.filter(r => r.listing.minPrice <= parseFloat(maxPrice as string));
    if (trend) filtered = filtered.filter(r => r.listing.trend === trend);

    return res.json(filtered.map(r => serializeListing(r.listing, {
      name: r.farmerName,
      verified: r.farmerVerified,
      rating: r.farmerRating,
    })));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/listings", async (req, res) => {
  const { farmerId, cropName, minPrice, maxPrice, quantity, unit, location, description, imageUrl, trend } = req.body;
  if (!farmerId || !cropName || minPrice === undefined || maxPrice === undefined || quantity === undefined || !location) {
    return res.status(400).json({ error: "farmerId, cropName, minPrice, maxPrice, quantity, location are required" });
  }
  if (minPrice > maxPrice) {
    return res.status(400).json({ error: "minPrice must be <= maxPrice" });
  }
  try {
    const [listing] = await db.insert(listingsTable).values({
      farmerId,
      cropName,
      minPrice,
      maxPrice,
      quantity,
      unit: unit || "kg",
      location,
      description: description || null,
      imageUrl: imageUrl || null,
      trend: trend || "stable",
      available: true,
    }).returning();
    return res.status(201).json(serializeListing(listing));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/listings/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const [result] = await db
      .select({
        listing: listingsTable,
        farmerName: usersTable.name,
        farmerVerified: usersTable.verified,
        farmerRating: usersTable.rating,
      })
      .from(listingsTable)
      .leftJoin(usersTable, eq(listingsTable.farmerId, usersTable.id))
      .where(eq(listingsTable.id, id))
      .limit(1);
    if (!result) return res.status(404).json({ error: "Listing not found" });
    return res.json(serializeListing(result.listing, {
      name: result.farmerName,
      verified: result.farmerVerified,
      rating: result.farmerRating,
    }));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/listings/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const { cropName, minPrice, maxPrice, quantity, unit, location, description, available, trend } = req.body;
  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (cropName !== undefined) updates.cropName = cropName;
  if (minPrice !== undefined) updates.minPrice = minPrice;
  if (maxPrice !== undefined) updates.maxPrice = maxPrice;
  if (quantity !== undefined) updates.quantity = quantity;
  if (unit !== undefined) updates.unit = unit;
  if (location !== undefined) updates.location = location;
  if (description !== undefined) updates.description = description;
  if (available !== undefined) updates.available = available;
  if (trend !== undefined) updates.trend = trend;
  try {
    const [updated] = await db.update(listingsTable).set(updates).where(eq(listingsTable.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Listing not found" });
    return res.json(serializeListing(updated));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/listings/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const deleted = await db.delete(listingsTable).where(eq(listingsTable.id, id)).returning();
    if (deleted.length === 0) return res.status(404).json({ error: "Listing not found" });
    return res.status(204).send();
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/listings/:id/contact", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const { message, buyerName } = req.body;
  if (!message || !buyerName) return res.status(400).json({ error: "message and buyerName required" });
  try {
    const [result] = await db
      .select({ listing: listingsTable, farmerPhone: usersTable.phone })
      .from(listingsTable)
      .leftJoin(usersTable, eq(listingsTable.farmerId, usersTable.id))
      .where(eq(listingsTable.id, id))
      .limit(1);
    if (!result) return res.status(404).json({ error: "Listing not found" });
    return res.json({
      success: true,
      farmerPhone: result.farmerPhone ?? null,
      message: "Contact request sent successfully. The farmer will be in touch.",
    });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
