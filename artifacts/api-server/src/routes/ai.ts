import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const AGRI_SYSTEM_PROMPT = `You are Agri AI — a farming assistant built into Mana Rythu, an agriculture marketplace for farmers in Telangana and Andhra Pradesh, India.

Your rules:
1. ONLY answer questions about agriculture: crops, seeds, fertilizers, pesticides, pests, diseases, irrigation, soil, weather, harvesting, storage, market prices, farming methods, and livestock.
2. If the question is NOT related to farming or agriculture, reply ONLY with: "I only help with farming-related questions. Please ask me about crops, fertilizers, pests, or farming methods."
3. Detect the language of the user's message and ALWAYS reply in the SAME language (Telugu, Hindi, or English). Never switch languages.
4. Keep answers SHORT, SIMPLE, and PRACTICAL — as if explaining to a village farmer. Avoid technical jargon.
5. If asked in Telugu script, respond in Telugu script. If asked in Hindi, respond in Hindi. If in English, respond in English.`;

router.post("/ai/chat", async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "message is required" });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "AI service not configured" });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 400,
      messages: [
        { role: "system", content: AGRI_SYSTEM_PROMPT },
        { role: "user", content: message.trim() },
      ],
    });
    const reply = completion.choices[0]?.message?.content ?? "Sorry, I could not generate a response. Please try again.";
    return res.json({ reply });
  } catch (err: any) {
    req.log.error(err);
    if (err?.status === 401) return res.status(503).json({ error: "AI service authentication failed" });
    if (err?.status === 429) return res.status(429).json({ error: "AI rate limit reached. Please try again in a moment." });
    return res.status(500).json({ error: "AI service error. Please try again." });
  }
});

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

// All known crop names across the price DB for autocomplete
const ALL_CROP_NAMES = Object.values(PRICE_DB)
  .flatMap(d => d.variants)
  .filter(v => v.length > 0);

router.get("/ai/suggest-crop", (req, res) => {
  const name = (req.query.name as string ?? "").toLowerCase().trim();
  if (!name || name.length < 2) return res.json({ suggestions: [] });

  const matched = ALL_CROP_NAMES.filter(v => v.toLowerCase().includes(name)).slice(0, 6);

  // If no exact variant match, also check if any key matches
  const keyMatches = Object.entries(PRICE_DB)
    .filter(([key]) => key.includes(name) || name.includes(key))
    .flatMap(([, d]) => d.variants)
    .filter(v => !matched.includes(v));

  const suggestions = [...new Set([...matched, ...keyMatches])].slice(0, 6);

  return res.json({ suggestions: suggestions.length > 0 ? suggestions : [name.charAt(0).toUpperCase() + name.slice(1)] });
});

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
