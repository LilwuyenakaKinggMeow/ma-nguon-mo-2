import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Your App",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages,
      }),
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("OpenRouter error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
