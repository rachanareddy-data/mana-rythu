import { Router } from "express";
import OpenAI from "openai";
import { ChatBody } from "@workspace/api-zod";

const router = Router();

router.post("/chat", async (req, res): Promise<void> => {
  const parsed = ChatBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "AI service not configured. Please set OPENAI_API_KEY." });
    return;
  }

  const { message } = parsed.data;

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert agricultural AI assistant for Indian farmers. Give simple, practical advice about crops, weather, soil, fertilizers, and market prices. Focus on crops grown in India like rice, wheat, cotton, sugarcane, pulses, vegetables, and fruits. Be concise and helpful.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I could not generate a response.";
    res.json({ reply });
  } catch (err) {
    req.log.error({ err }, "OpenAI API error");
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

export default router;
