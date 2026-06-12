import { Router } from "express";

const router = Router();

const CITY_COORDS: Record<string, [number, number]> = {
  hyderabad:     [17.3850, 78.4867],
  warangal:      [17.9784, 79.5941],
  karimnagar:    [18.4386, 79.1288],
  nizamabad:     [18.6726, 78.0941],
  khammam:       [17.2473, 80.1514],
  nalgonda:      [17.0575, 79.2671],
  mahbubnagar:   [16.7376, 77.9831],
  adilabad:      [19.6688, 78.5320],
  visakhapatnam: [17.6868, 83.2185],
  vizag:         [17.6868, 83.2185],
  vijayawada:    [16.5062, 80.6480],
  guntur:        [16.3067, 80.4365],
  tirupati:      [13.6288, 79.4192],
  kurnool:       [15.8281, 78.0373],
  nellore:       [14.4426, 79.9865],
  rajahmundry:   [17.0005, 81.8040],
  kakinada:      [16.9891, 82.2475],
  eluru:         [16.7107, 81.0952],
  ongole:        [15.5057, 80.0499],
  srikakulam:    [18.2983, 83.8979],
  anantapur:     [14.6819, 77.6006],
  kadapa:        [14.4674, 78.8241],
  sangareddy:    [17.6276, 78.0878],
  suryapet:      [17.1417, 79.6223],
  bhadrachalam:  [17.6664, 80.8905],
  mancherial:    [18.8695, 79.4602],
  jagtial:       [18.7933, 79.0000],
  siddipet:      [18.1018, 78.8520],
  miryalaguda:   [16.8727, 79.5616],
};

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findCity(input: string): [number, number] | null {
  const key = input.toLowerCase().trim();
  const exact = CITY_COORDS[key];
  if (exact) return exact;
  const partial = Object.entries(CITY_COORDS).find(
    ([k]) => k.includes(key) || key.includes(k)
  );
  return partial ? partial[1] : null;
}

router.post("/logistics/estimate", (req, res) => {
  const { fromLocation, toLocation, weight } = req.body;

  if (!fromLocation || !toLocation || weight === undefined || weight === null) {
    return res.status(400).json({ error: "fromLocation, toLocation, and weight are required" });
  }

  const weightNum = parseFloat(String(weight));
  if (isNaN(weightNum) || weightNum <= 0) {
    return res.status(400).json({ error: "weight must be a positive number (in kg)" });
  }

  const fromCoords = findCity(fromLocation);
  const toCoords   = findCity(toLocation);

  let distance: number;
  let locationNote = "";
  if (fromCoords && toCoords) {
    distance = Math.max(5, Math.round(haversineKm(...fromCoords, ...toCoords) * 1.25));
  } else {
    distance = 150;
    locationNote = " (estimated — location not in database)";
  }

  // Cost breakdown
  const baseCharge     = 250;
  const distanceCharge = Math.round(distance * 1.8);
  const weightCharge   = Math.round(weightNum * (distance / 100) * 0.6);
  const totalCost      = baseCharge + distanceCharge + weightCharge;

  let deliveryTime: string;
  if (distance < 80)       deliveryTime = "Same day (3–6 hours)";
  else if (distance < 250) deliveryTime = "Next day (12–24 hours)";
  else if (distance < 500) deliveryTime = "1–2 days";
  else                     deliveryTime = "2–3 days";

  return res.json({
    fromLocation,
    toLocation,
    weight: weightNum,
    distance,
    estimatedCost: totalCost,
    deliveryTime,
    costPerKg: Math.round((totalCost / weightNum) * 10) / 10,
    breakdown: [
      { label: "Base charge (loading/unloading)", amount: baseCharge },
      { label: `Distance (${distance} km × ₹1.8/km)`, amount: distanceCharge },
      { label: `Weight surcharge (${weightNum} kg)`, amount: weightCharge },
    ],
    note: `Estimated road transport cost${locationNote}. Final price subject to vehicle type and fuel rates.`,
  });
});

export default router;
