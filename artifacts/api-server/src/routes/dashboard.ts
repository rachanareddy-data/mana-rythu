import { Router } from "express";
import { db, usersTable, cropsTable, listingsTable } from "@workspace/db";
import { eq, count, avg } from "drizzle-orm";

const router = Router();

router.get("/dashboard/summary", async (req, res) => {
  try {
    const users = await db.select().from(usersTable);
    const crops = await db.select().from(cropsTable);
    const listings = await db.select().from(listingsTable);

    const farmers = users.filter(u => u.role === "farmer");
    const buyers = users.filter(u => u.role === "buyer");
    const verifiedFarmers = farmers.filter(u => u.verified);
    const activeListings = listings.filter(l => l.available);
    const ratedFarmers = farmers.filter(u => u.rating !== null);
    const avgRating = ratedFarmers.length > 0
      ? ratedFarmers.reduce((sum, u) => sum + (u.rating ?? 0), 0) / ratedFarmers.length
      : 0;

    return res.json({
      totalFarmers: farmers.length,
      totalBuyers: buyers.length,
      totalListings: listings.length,
      totalCrops: crops.length,
      activeListings: activeListings.length,
      verifiedFarmers: verifiedFarmers.length,
      avgFarmerRating: Math.round(avgRating * 10) / 10,
    });
  } catch (err) {
    req.log.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/dashboard/market-prices", async (req, res) => {
  const prices = [
    { cropName: "Rice (Basmati)", price: 4200, unit: "quintal", trend: "up", changePercent: 3.2, location: "Hyderabad" },
    { cropName: "Tomato", price: 1800, unit: "quintal", trend: "down", changePercent: -8.5, location: "Kurnool" },
    { cropName: "Onion", price: 2100, unit: "quintal", trend: "up", changePercent: 5.1, location: "Nizamabad" },
    { cropName: "Cotton", price: 6800, unit: "quintal", trend: "stable", changePercent: 0.3, location: "Warangal" },
    { cropName: "Groundnut", price: 5400, unit: "quintal", trend: "up", changePercent: 2.8, location: "Kurnool" },
    { cropName: "Maize", price: 1950, unit: "quintal", trend: "down", changePercent: -2.1, location: "Adilabad" },
    { cropName: "Turmeric", price: 8200, unit: "quintal", trend: "up", changePercent: 7.4, location: "Nizamabad" },
    { cropName: "Chili (Red)", price: 9500, unit: "quintal", trend: "stable", changePercent: 0.8, location: "Guntur" },
  ];
  return res.json(prices);
});

router.get("/dashboard/recommended-crops", async (req, res) => {
  const crops = [
    { cropName: "Paddy (Short-duration)", season: "Kharif", demandLevel: "high", avgPrice: 2200, unit: "quintal", reason: "High MSP and consistent buyer demand", imageUrl: null },
    { cropName: "Black-eyed Peas", season: "Rabi", demandLevel: "high", avgPrice: 4800, unit: "quintal", reason: "Excellent export demand and premium pricing", imageUrl: null },
    { cropName: "Sunflower", season: "Rabi", demandLevel: "medium", avgPrice: 5600, unit: "quintal", reason: "Rising edible oil demand; drought tolerant", imageUrl: null },
    { cropName: "Green Gram (Moong)", season: "Zaid", demandLevel: "high", avgPrice: 7200, unit: "quintal", reason: "Short duration crop with high protein demand", imageUrl: null },
    { cropName: "Marigold", season: "Year-round", demandLevel: "medium", avgPrice: 3200, unit: "quintal", reason: "Steady demand from garland and pharma sectors", imageUrl: null },
    { cropName: "Ginger", season: "Kharif", demandLevel: "high", avgPrice: 12000, unit: "quintal", reason: "Premium spice crop with export potential", imageUrl: null },
  ];
  return res.json(crops);
});

router.get("/dashboard/weather", async (req, res) => {
  return res.json({
    condition: "Partly Cloudy",
    temperature: 31,
    humidity: 68,
    rainfall: 12,
    location: "Hyderabad, Telangana",
    advisory: "Suitable conditions for sowing Kharif crops. Ensure adequate irrigation for dryland areas. Watch for pest activity in cotton fields due to high humidity.",
  });
});

export default router;
