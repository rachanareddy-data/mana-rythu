import { Router } from "express";

const router = Router();

// Mock AI price database — market-average estimates with seasonal adjustments
const PRICE_DB: Record<string, { min: number; max: number; unit: string; trend: "up" | "down" | "stable"; variants: string[] }> = {
  tomato:      { min: 18, max: 35, unit: "kg", trend: "up",     variants: ["Tomato", "Cherry Tomato", "Roma Tomato"] },
  potato:      { min: 12, max: 22, unit: "kg", trend: "stable", variants: ["Potato", "Sweet Potato"] },
  onion:       { min: 15, max: 40, unit: "kg", trend: "up",     variants: ["Onion (Red)", "Onion (White)", "Spring Onion"] },
  rice:        { min: 32, max: 55, unit: "kg", trend: "stable", variants: ["Rice (Basmati)", "Rice (Sona Masoori)", "Rice (IR-36)"] },
  wheat:       { min: 22, max: 28, unit: "kg", trend: "stable", variants: ["Wheat", "Wheat (Sharbati)"] },
  cotton:      { min: 62, max: 80, unit: "kg", trend: "stable", variants: ["Cotton (BT)", "Cotton (Non-BT)"] },
  chili:       { min: 90, max: 150, unit: "kg", trend: "up",    variants: ["Chili (Red)", "Chili (Green)", "Chili (Dry)"] },
  groundnut:   { min: 55, max: 75, unit: "kg", trend: "up",     variants: ["Groundnut", "Groundnut (Bold)", "Groundnut (Java)"] },
  maize:       { min: 16, max: 22, unit: "kg", trend: "down",   variants: ["Maize", "Maize (Hybrid)"] },
  soybean:     { min: 38, max: 48, unit: "kg", trend: "stable", variants: ["Soybean", "Soybean (Yellow)"] },
  turmeric:    { min: 70, max: 110, unit: "kg", trend: "up",    variants: ["Turmeric", "Turmeric (Finger)", "Turmeric (Bulb)"] },
  ginger:      { min: 80, max: 140, unit: "kg", trend: "up",    variants: ["Ginger", "Dry Ginger"] },
  brinjal:     { min: 12, max: 28, unit: "kg", trend: "stable", variants: ["Brinjal", "Brinjal (Round)", "Brinjal (Long)"] },
  cabbage:     { min: 8, max: 18, unit: "kg", trend: "down",    variants: ["Cabbage", "Red Cabbage"] },
  cauliflower: { min: 10, max: 25, unit: "kg", trend: "stable", variants: ["Cauliflower"] },
  okra:        { min: 20, max: 40, unit: "kg", trend: "up",     variants: ["Okra", "Lady's Finger"] },
  carrot:      { min: 18, max: 35, unit: "kg", trend: "stable", variants: ["Carrot"] },
  sugarcane:   { min: 3, max: 4, unit: "kg", trend: "stable",   variants: ["Sugarcane"] },
  banana:      { min: 15, max: 28, unit: "kg", trend: "up",     variants: ["Banana (Robusta)", "Banana (Nendran)", "Banana (Red)"] },
  mango:       { min: 30, max: 80, unit: "kg", trend: "up",     variants: ["Mango (Alphonso)", "Mango (Kesar)", "Mango (Banganapalli)"] },
  default:     { min: 20, max: 45, unit: "kg", trend: "stable", variants: [] },
};

router.get("/ai/suggest-price", (req, res) => {
  const cropName = (req.query.cropName as string ?? "").toLowerCase().trim();
  if (!cropName) return res.status(400).json({ error: "cropName is required" });

  // Match by keyword in crop name
  const matched = Object.entries(PRICE_DB).find(([key]) =>
    cropName.includes(key) || key.includes(cropName.split(" ")[0])
  );
  const data = matched ? matched[1] : PRICE_DB.default;
  const displayName = matched
    ? data.variants[0] ?? cropName
    : cropName.charAt(0).toUpperCase() + cropName.slice(1);

  return res.json({
    cropName: displayName,
    suggestedMinPrice: data.min,
    suggestedMaxPrice: data.max,
    unit: data.unit,
    trend: data.trend,
    confidence: matched ? "high" : "medium",
    note: "Source: Market Average (Estimated). This is a suggested range only — you must set your own final price.",
    variants: data.variants,
  });
});

export default router;
