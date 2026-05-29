import { Router } from "express";
import OpenAI from "openai";
import { ChatBody } from "@workspace/api-zod";

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//
// 🔥 Language detection (simple but reliable)
//
function detectLanguage(text: string) {
  if (/[\u0C00-\u0C7F]/.test(text)) return "telugu";
  if (/[\u0900-\u097F]/.test(text)) return "hindi";
  return "english";
}

router.post("/chat", async (req, res): Promise<void> => {
  try {
    const parsed = ChatBody.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid request body",
      });
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      res.status(503).json({
        error: "Missing API key",
      });
      return;
    }

    const { message } = parsed.data;

    const lang = detectLanguage(message);

    //
    // 🔥 SYSTEM PROMPT (dynamic language control)
    //
    const systemPrompt = `
You are Mana Rythu AI, an agricultural assistant for farmers.

CRITICAL RULE:
You MUST respond ONLY in ${lang.toUpperCase()}.

STRICT RULES:
- If language is TELUGU → respond only in Telugu
- If language is HINDI → respond only in Hindi
- If language is ENGLISH → respond only in English
- Never mix languages
- Never translate unless user asks

Keep answers:
- Simple
- Short
- Practical

Topics:
- Crops
- Soil
- Weather
- Fertilizers
- Irrigation
- Pest control
- Market prices
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    let reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I could not generate a response.";

    //
    // 🔥 FINAL SAFETY CHECK (prevents wrong language output)
    //
    if (
      lang === "english" &&
      (/[\u0C00-\u0C7F]/.test(reply) || /[\u0900-\u097F]/.test(reply))
    ) {
      reply = "Sorry, response generation failed. Please try again in English.";
    }

    if (
      lang === "telugu" &&
      /[\u0900-\u097F]/.test(reply)
    ) {
      reply = "క్షమించండి, సమాధానం ఇవ్వలేకపోయాము. మళ్ళీ ప్రయత్నించండి.";
    }

    if (
      lang === "hindi" &&
      /[\u0C00-\u0C7F]/.test(reply)
    ) {
      reply = "क्षमा करें, उत्तर उपलब्ध नहीं है। कृपया पुनः प्रयास करें।";
    }

    res.status(200).json({
      success: true,
      language: lang,
      reply,
    });
  } catch (err) {
    req.log.error({ err }, "OpenAI API Error");

    res.status(500).json({
      success: false,
      error: "Failed to generate AI response",
    });
  }
});

export default router;