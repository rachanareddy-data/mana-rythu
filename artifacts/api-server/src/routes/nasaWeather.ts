import { Router } from "express";
import axios from "axios";
import { NasaWeatherBody } from "@workspace/api-zod";

const router = Router();

const CROP_REQUIREMENTS: Record<string, { minRain: number; maxRain: number; minTemp: number; maxTemp: number }> = {
  rice: { minRain: 150, maxRain: 300, minTemp: 20, maxTemp: 35 },
  wheat: { minRain: 50, maxRain: 100, minTemp: 10, maxTemp: 25 },
  cotton: { minRain: 50, maxRain: 150, minTemp: 21, maxTemp: 35 },
  sugarcane: { minRain: 100, maxRain: 200, minTemp: 20, maxTemp: 38 },
  maize: { minRain: 60, maxRain: 120, minTemp: 18, maxTemp: 32 },
  soybean: { minRain: 60, maxRain: 100, minTemp: 20, maxTemp: 30 },
  groundnut: { minRain: 50, maxRain: 125, minTemp: 20, maxTemp: 33 },
  default: { minRain: 60, maxRain: 180, minTemp: 15, maxTemp: 35 },
};

router.post("/ai/nasa-weather", async (req, res): Promise<void> => {
  const parsed = NasaWeatherBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { lat, lon, month, crop } = parsed.data;
  const cropKey = crop.toLowerCase().replace(/\s+/g, "");
  const reqs = CROP_REQUIREMENTS[cropKey] ?? CROP_REQUIREMENTS.default;

  try {
    const startYear = 2023;
    const endYear = 2023;
    const monthStr = String(month).padStart(2, "0");
    const start = `${startYear}${monthStr}01`;
    const end = `${startYear}${monthStr}28`;

    const response = await axios.get("https://power.larc.nasa.gov/api/temporal/daily/point", {
      params: {
        parameters: "PRECTOTCORR,T2M,ALLSKY_SFC_SW_DWN",
        community: "AG",
        longitude: lon,
        latitude: lat,
        start,
        end,
        format: "JSON",
      },
      timeout: 15000,
    });

    const properties = response.data?.properties?.parameter;
    const precipData = Object.values(properties?.PRECTOTCORR ?? {}) as number[];
    const tempData = Object.values(properties?.T2M ?? {}) as number[];

    const rainfall = precipData.length > 0
      ? Math.round(precipData.reduce((a, b) => a + Math.max(0, b), 0) * 30)
      : 80;
    const temperature = tempData.length > 0
      ? Math.round(tempData.reduce((a, b) => a + b, 0) / tempData.length)
      : 28;

    const rainfallScore =
      rainfall >= reqs.minRain && rainfall <= reqs.maxRain ? 40 :
      rainfall < reqs.minRain ? Math.max(0, 40 - (reqs.minRain - rainfall) / 5) :
      Math.max(0, 40 - (rainfall - reqs.maxRain) / 10);

    const tempScore =
      temperature >= reqs.minTemp && temperature <= reqs.maxTemp ? 40 :
      Math.max(0, 40 - Math.abs(temperature - (reqs.minTemp + reqs.maxTemp) / 2) * 2);

    const totalScore = rainfallScore + tempScore;

    const yieldPrediction = totalScore >= 60 ? "High" : totalScore >= 35 ? "Medium" : "Low";
    const riskLevel = totalScore >= 60 ? "Low" : totalScore >= 35 ? "Moderate" : "High";

    const recommendation =
      yieldPrediction === "High"
        ? `Excellent conditions for ${crop} farming. Rainfall of ${rainfall}mm and temperature of ${temperature}°C are ideal. Proceed with cultivation.`
        : yieldPrediction === "Medium"
        ? `Moderate conditions for ${crop}. Rainfall is ${rainfall}mm and temperature is ${temperature}°C. Consider irrigation support and pest monitoring.`
        : `Challenging conditions for ${crop}. Rainfall (${rainfall}mm) or temperature (${temperature}°C) are outside ideal range. Consider alternative crops or protective measures.`;

    res.json({ yieldPrediction, rainfall, temperature, riskLevel, recommendation });
  } catch (err) {
    req.log.warn({ err }, "NASA API error, using estimated data");
    const rainfall = 80 + Math.round(Math.random() * 100);
    const temperature = 22 + Math.round(Math.random() * 10);
    res.json({
      yieldPrediction: "Medium",
      rainfall,
      temperature,
      riskLevel: "Moderate",
      recommendation: `Estimated conditions for ${crop}: ${rainfall}mm rainfall, ${temperature}°C temperature. NASA data unavailable - consult local agricultural office for precise forecasts.`,
    });
  }
});

export default router;
