import { Router } from "express";
import { db, usersTable, sessionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { notify } from "../lib/notify";

const router = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "mana_rythu_salt").digest("hex");
}

function generateToken(userId: number): string {
  return crypto.createHash("sha256").update(`${userId}_${Date.now()}_mana_rythu`).digest("hex");
}

router.post("/auth/register", async (req, res) => {
  const { name, email, password, role, phone, location } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "name, email, password, role are required" });
  }
  if (!["farmer", "buyer"].includes(role)) {
    return res.status(400).json({ error: "role must be farmer or buyer" });
  }
  try {
    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const [user] = await db.insert(usersTable).values({
      name,
      email,
      passwordHash: hashPassword(password),
      role,
      phone: phone || null,
      location: location || null,
      verified: false,
    }).returning();
    const token = generateToken(user.id);
    await db.insert(sessionsTable).values({ token, userId: user.id });

    await notify(
      user.id,
      "info",
      "Welcome to Mana Rythu! 🌾",
      `Hi ${user.name}! Your account is ready. ${user.role === "farmer" ? "Start by posting your first crop listing." : "Browse fresh produce directly from local farmers."}`,
    );

    const { passwordHash: _, ...safeUser } = user;
    return res.status(201).json({
      user: { ...safeUser, rating: safeUser.rating ?? null, createdAt: safeUser.createdAt.toISOString() },
      token,
    });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user || user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user.id);
    await db.insert(sessionsTable).values({ token, userId: user.id });
    const { passwordHash: _, ...safeUser } = user;
    return res.json({
      user: { ...safeUser, rating: safeUser.rating ?? null, createdAt: safeUser.createdAt.toISOString() },
      token,
    });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/auth/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const [session] = await db.select().from(sessionsTable).where(eq(sessionsTable.token, token)).limit(1);
    if (!session) return res.status(401).json({ error: "Invalid token" });
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, session.userId)).limit(1);
    if (!user) return res.status(401).json({ error: "User not found" });
    const { passwordHash: _, ...safeUser } = user;
    return res.json({ ...safeUser, rating: safeUser.rating ?? null, createdAt: safeUser.createdAt.toISOString() });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/auth/logout", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (token) {
    try {
      await db.delete(sessionsTable).where(eq(sessionsTable.token, token));
    } catch {
      // ignore — token already gone
    }
  }
  return res.json({ success: true });
});

export default router;
