import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const cropsTable = pgTable("crops", {
  id: serial("id").primaryKey(),
  farmerId: integer("farmer_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  cropName: text("crop_name").notNull(),
  sowDate: text("sow_date"),
  harvestDate: text("harvest_date"),
  status: text("status", { enum: ["growing", "ready", "harvested"] }).notNull().default("growing"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCropSchema = createInsertSchema(cropsTable).omit({ id: true, createdAt: true });
export type InsertCrop = z.infer<typeof insertCropSchema>;
export type Crop = typeof cropsTable.$inferSelect;
