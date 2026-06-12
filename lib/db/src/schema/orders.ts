import { pgTable, serial, integer, real, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { listingsTable } from "./listings";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").notNull().references(() => listingsTable.id, { onDelete: "cascade" }),
  buyerId: integer("buyer_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  farmerId: integer("farmer_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  quantity: real("quantity").notNull(),
  offeredPrice: real("offered_price").notNull(),
  totalAmount: real("total_amount").notNull(),
  status: text("status", {
    enum: ["pending", "accepted", "rejected", "processing", "shipped", "delivered", "cancelled"],
  }).notNull().default("pending"),
  note: text("note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
