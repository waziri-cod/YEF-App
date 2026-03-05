import express from "express";
import fetch from "node-fetch";
import { requireAuth, AuthRequest } from "../middleware/auth";
import ChatSession from "../models/ChatSession";

const router = express.Router();
const OPENAI_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_URL = "https://api.openai.com/v1";

// helper to call the Chat Completions endpoint
async function callOpenAI(messages: any[]) {
  const res = await fetch(`${OPENAI_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.6,
      max_tokens: 1000,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.choices[0]?.message?.content || "";
}

// POST /api/ai/chat
router.post(
  "/chat",
  requireAuth,
  async (req: AuthRequest, res) => {
    const userId = req.user?.id || null;
    const { messages, sessionId } = req.body;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array required" });
    }

    try {
      let session;
      if (sessionId) {
        session = await ChatSession.findById(sessionId);
      }
      if (!session) {
        session = new ChatSession({ userId, messages });
      } else {
        // append only the newest user message(s) - assume last element(s)
        session.messages = session.messages.concat(messages.slice(session.messages.length));
      }
      await session.save();

      const systemPrompt = {
        role: "system",
        content:
          "You are a helpful financial advisor for young entrepreneurs in Tanzania. Provide clear, practical advice about microloans, business management, budgeting and literacy. When appropriate include links to relevant courses or resources and explain reasoning so it can be traced.",
      };
      const replyContent = await callOpenAI([systemPrompt, ...session.messages]);

      // append AI response to record
      session.messages.push({ role: "assistant", content: replyContent });
      await session.save();

      return res.json({ message: replyContent, sessionId: session._id });
    } catch (err) {
      console.error("AI chat error", err);
      return res.status(500).json({ error: "AI service unavailable" });
    }
  }
);

// POST /api/ai/credit-score
router.post("/credit-score", requireAuth, async (req: AuthRequest, res) => {
  const request = req.body;
  // similar prompt building as front-end used before
  try {
    const prompt = `You are a credit scoring AI for a microloan platform in Tanzania. \nAnalyze the following applicant data and provide a credit score (0-1000), risk level, recommendation, max loan amount, interest rate, and reasoning.\n\nApplicant Data:\n${JSON.stringify(request, null, 2)}\n\nRespond in JSON format:\n{\n  "score": number (0-1000),\n  "riskLevel": "low" | "medium" | "high",\n  "recommendation": "string",\n  "maxLoanAmount": number (in TZS),\n  "interestRate": number (percentage),\n  "reasoning": "string"\n}`;

    const response = await callOpenAI([{ role: "user", content: prompt }]);
    // try parse JSON
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return res.json(JSON.parse(jsonMatch[0]));
    }
    return res.status(500).json({ error: "Invalid response from AI" });
  } catch (error) {
    console.error("Credit score error", error);
    return res.status(500).json({ error: "AI error" });
  }
});

// POST /api/ai/loan-analysis
router.post("/loan-analysis", requireAuth, async (req: AuthRequest, res) => {
  const applicationData = req.body;
  try {
    const prompt = `Analyze this loan application for a young entrepreneur in Tanzania:\n${JSON.stringify(
      applicationData,
      null,
      2
    )}\n\nProvide a recommendation (approve/reject/review), confidence level (0-1), reasoning, and suggested loan amount if approved.`;
    const response = await callOpenAI([{ role: "user", content: prompt }]);
    // naive parse; assume JSON-like
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return res.json(JSON.parse(jsonMatch[0]));
    }
    return res.status(500).json({ error: "Invalid AI response" });
  } catch (err) {
    console.error("Loan analysis error", err);
    return res.status(500).json({ error: "AI error" });
  }
});


// GET /api/ai/history - return chat sessions for authenticated user
router.get("/history", requireAuth, async (req: AuthRequest, res) => {
  const userId = req.user?.id || null;
  try {
    const sessions = await ChatSession.find({ userId }).sort({ createdAt: -1 }).limit(20);
    res.json(sessions);
  } catch (err) {
    console.error("Chat history error", err);
    res.status(500).json({ error: "Unable to fetch history" });
  }
});

export default router;
