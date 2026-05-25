import { pgTable, text, serial, boolean, timestamp, doublePrecision, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const cropsTable = pgTable("crops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: doublePrecision("price").notNull(),
  qty: doublePrecision("qty").notNull(),
  unit: text("unit").notNull().default("kg"),
  category: text("category").notNull(),
  location: text("location").notNull(),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  farmerId: integer("farmer_id").notNull(),
  farmerName: text("farmer_name").notNull(),
  imageUrl: text("image_url"),
  organic: boolean("organic").notNull().default(false),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCropSchema = createInsertSchema(cropsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertCrop = z.infer<typeof insertCropSchema>;
export type Crop = typeof cropsTable.$inferSelect;
