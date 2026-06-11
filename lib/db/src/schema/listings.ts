import { pgTable, text, serial, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const listingsTable = pgTable("listings", {
  id: serial("id").primaryKey(),
  farmerId: integer("farmer_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  cropName: text("crop_name").notNull(),
  minPrice: real("min_price").notNull(),
  maxPrice: real("max_price").notNull(),
  quantity: real("quantity").notNull(),
  unit: text("unit").notNull().default("kg"),
  location: text("location").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  trend: text("trend", { enum: ["up", "down", "stable"] }).notNull().default("stable"),
  available: boolean("available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertListingSchema = createInsertSchema(listingsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertListing = z.infer<typeof insertListingSchema>;
export type Listing = typeof listingsTable.$inferSelect;
