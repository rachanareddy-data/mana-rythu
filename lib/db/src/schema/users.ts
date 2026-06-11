import { pgTable, text, serial, boolean, real, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["farmer", "buyer", "admin"] }).notNull().default("buyer"),
  verified: boolean("verified").notNull().default(false),
  rating: real("rating"),
  ratingCount: integer("rating_count").notNull().default(0),
  phone: text("phone"),
  location: text("location"),
  bio: text("bio"),
  trustedBuyerScore: real("trusted_buyer_score"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true, rating: true, ratingCount: true, trustedBuyerScore: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
