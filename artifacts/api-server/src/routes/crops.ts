import { Router } from "express";
import { db, cropsTable, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function serializeCrop(crop: typeof cropsTable.$inferSelect, farmerName?: string | null) {
  return {
    ...crop,
    farmerName: farmerName ?? null,
    createdAt: crop.createdAt.toISOString(),
  };
}

router.get("/crops", async (req, res) => {
  try {
    const { farmerId, status } = req.query;
    const results = await db
      .select({
        crop: cropsTable,
        farmerName: usersTable.name,
      })
      .from(cropsTable)
      .leftJoin(usersTable, eq(cropsTable.farmerId, usersTable.id));

    let filtered = results;
    if (farmerId) filtered = filtered.filter(r => r.crop.farmerId === parseInt(farmerId as string));
    if (status) filtered = filtered.filter(r => r.crop.status === status);

    return res.json(filtered.map(r => serializeCrop(r.crop, r.farmerName)));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/crops", async (req, res) => {
  const { farmerId, cropName, sowDate, harvestDate, status, notes } = req.body;
  if (!farmerId || !cropName) {
    return res.status(400).json({ error: "farmerId and cropName are required" });
  }
  try {
    const [crop] = await db.insert(cropsTable).values({
      farmerId,
      cropName,
      sowDate: sowDate || null,
      harvestDate: harvestDate || null,
      status: status || "growing",
      notes: notes || null,
    }).returning();
    return res.status(201).json(serializeCrop(crop));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/crops/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const [result] = await db
      .select({ crop: cropsTable, farmerName: usersTable.name })
      .from(cropsTable)
      .leftJoin(usersTable, eq(cropsTable.farmerId, usersTable.id))
      .where(eq(cropsTable.id, id))
      .limit(1);
    if (!result) return res.status(404).json({ error: "Crop not found" });
    return res.json(serializeCrop(result.crop, result.farmerName));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/crops/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const { cropName, sowDate, harvestDate, status, notes } = req.body;
  const updates: Record<string, unknown> = {};
  if (cropName !== undefined) updates.cropName = cropName;
  if (sowDate !== undefined) updates.sowDate = sowDate;
  if (harvestDate !== undefined) updates.harvestDate = harvestDate;
  if (status !== undefined) updates.status = status;
  if (notes !== undefined) updates.notes = notes;
  try {
    const [updated] = await db.update(cropsTable).set(updates).where(eq(cropsTable.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Crop not found" });
    return res.json(serializeCrop(updated));
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/crops/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const deleted = await db.delete(cropsTable).where(eq(cropsTable.id, id)).returning();
    if (deleted.length === 0) return res.status(404).json({ error: "Crop not found" });
    return res.status(204).send();
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
