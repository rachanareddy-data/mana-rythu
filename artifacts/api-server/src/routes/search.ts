import { Router } from "express";
import { db, listingsTable, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

interface SearchResult {
  type: "listing" | "crop" | "location";
  id: number | null;
  title: string;
  subtitle: string | null;
  trend: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  imageUrl: string | null;
  available: boolean | null;
}

router.get("/search", async (req, res) => {
  const { q, limit = "8" } = req.query;

  if (!q || typeof q !== "string" || q.trim().length === 0) {
    return res.json([]);
  }

  const query = q.trim().toLowerCase();
  const maxResults = Math.min(parseInt(limit as string, 10) || 8, 20);

  try {
    const rows = await db
      .select({
        listing: listingsTable,
        farmerName: usersTable.name,
      })
      .from(listingsTable)
      .leftJoin(usersTable, eq(listingsTable.farmerId, usersTable.id))
      .where(eq(listingsTable.available, true));

    const scored = rows
      .map(r => {
        const cn = r.listing.cropName.toLowerCase();
        const loc = r.listing.location.toLowerCase();
        const desc = (r.listing.description ?? "").toLowerCase();
        let score = 0;
        if (cn === query) score += 100;
        else if (cn.startsWith(query)) score += 70;
        else if (cn.includes(query)) score += 40;
        if (loc === query) score += 30;
        else if (loc.startsWith(query)) score += 20;
        else if (loc.includes(query)) score += 10;
        if (desc.includes(query)) score += 5;
        return { r, score };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score);

    const output: SearchResult[] = [];
    const seenListings = new Set<number>();
    const seenCrops = new Set<string>();
    const seenLocations = new Set<string>();

    for (const { r } of scored) {
      if (output.length >= maxResults) break;

      const cn = r.listing.cropName.toLowerCase();
      const loc = r.listing.location.toLowerCase();

      if (cn.includes(query) && !seenCrops.has(r.listing.cropName)) {
        seenCrops.add(r.listing.cropName);
        seenListings.add(r.listing.id);
        output.push({
          type: "listing",
          id: r.listing.id,
          title: r.listing.cropName,
          subtitle: `${r.listing.location} · ₹${r.listing.minPrice}–${r.listing.maxPrice}/${r.listing.unit ?? "kg"}`,
          trend: r.listing.trend,
          minPrice: r.listing.minPrice,
          maxPrice: r.listing.maxPrice,
          imageUrl: r.listing.imageUrl,
          available: r.listing.available,
        });
      } else if (loc.includes(query) && !seenLocations.has(r.listing.location)) {
        seenLocations.add(r.listing.location);
        const count = rows.filter(x => x.listing.location === r.listing.location).length;
        output.push({
          type: "location",
          id: null,
          title: r.listing.location,
          subtitle: `${count} listing${count !== 1 ? "s" : ""} available`,
          trend: null,
          minPrice: null,
          maxPrice: null,
          imageUrl: null,
          available: null,
        });
      }
    }

    return res.json(output);
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
