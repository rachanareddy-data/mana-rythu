import { Router } from "express";
import { db, cropsTable, usersTable } from "@workspace/db";
import { eq, ilike, and, type SQL } from "drizzle-orm";
import {
  ListCropsQueryParams,
  CreateCropBody,
  GetCropParams,
  UpdateCropParams,
  UpdateCropBody,
  DeleteCropParams,
  VerifyCropParams,
} from "@workspace/api-zod";
import { requireAuth, requireRole, type AuthRequest } from "../lib/auth";

const router = Router();

router.get("/crops", async (req, res): Promise<void> => {
  const params = ListCropsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { search, category, organic, verified, farmerId } = params.data;
  const conditions: SQL[] = [];

  if (search) conditions.push(ilike(cropsTable.name, `%${search}%`));
  if (category) conditions.push(eq(cropsTable.category, category));
  if (organic === "true") conditions.push(eq(cropsTable.organic, true));
  if (organic === "false") conditions.push(eq(cropsTable.organic, false));
  if (verified === "true") conditions.push(eq(cropsTable.verified, true));
  if (verified === "false") conditions.push(eq(cropsTable.verified, false));
  if (farmerId) conditions.push(eq(cropsTable.farmerId, farmerId));

  const crops = await db
    .select()
    .from(cropsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(cropsTable.createdAt);

  res.json(
    crops.map((c) => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
    }))
  );
});

router.post("/crops", requireAuth, requireRole("farmer"), async (req: AuthRequest, res): Promise<void> => {
  const parsed = CreateCropBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [farmer] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!));
  if (!farmer) {
    res.status(401).json({ error: "Farmer not found" });
    return;
  }

  const [crop] = await db
    .insert(cropsTable)
    .values({
      ...parsed.data,
      farmerId: req.userId!,
      farmerName: farmer.name,
    })
    .returning();

  res.status(201).json({ ...crop, createdAt: crop.createdAt.toISOString() });
});

router.get("/crops/:id", async (req, res): Promise<void> => {
  const params = GetCropParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [crop] = await db.select().from(cropsTable).where(eq(cropsTable.id, params.data.id));
  if (!crop) {
    res.status(404).json({ error: "Crop not found" });
    return;
  }

  res.json({ ...crop, createdAt: crop.createdAt.toISOString() });
});

router.patch("/crops/:id", requireAuth, async (req: AuthRequest, res): Promise<void> => {
  const params = UpdateCropParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateCropBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db.select().from(cropsTable).where(eq(cropsTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Crop not found" });
    return;
  }

  if (req.userRole !== "admin" && existing.farmerId !== req.userId) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const [crop] = await db
    .update(cropsTable)
    .set(parsed.data)
    .where(eq(cropsTable.id, params.data.id))
    .returning();

  res.json({ ...crop, createdAt: crop.createdAt.toISOString() });
});

router.delete("/crops/:id", requireAuth, async (req: AuthRequest, res): Promise<void> => {
  const params = DeleteCropParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [existing] = await db.select().from(cropsTable).where(eq(cropsTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Crop not found" });
    return;
  }

  if (req.userRole !== "admin" && existing.farmerId !== req.userId) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  await db.delete(cropsTable).where(eq(cropsTable.id, params.data.id));
  res.sendStatus(204);
});

router.patch("/crops/:id/verify", requireAuth, requireRole("admin"), async (req, res): Promise<void> => {
  const params = VerifyCropParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [crop] = await db
    .update(cropsTable)
    .set({ verified: true })
    .where(eq(cropsTable.id, params.data.id))
    .returning();

  if (!crop) {
    res.status(404).json({ error: "Crop not found" });
    return;
  }

  res.json({ ...crop, createdAt: crop.createdAt.toISOString() });
});

export default router;
