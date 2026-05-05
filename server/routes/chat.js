import express from "express";
import { groq } from "../config/groq.js";
import { getEmbedding } from "../utils/embedding.js";
import { getStore } from "../utils/store.js";
import { searchTopChunks } from "../utils/search.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // 1. embedding للسؤال
    const queryEmbedding = await getEmbedding(message);

    // 2. search داخل الكتاب
    const store = getStore();
    const topChunks = searchTopChunks(queryEmbedding, store);

    // 3. تجهيز السياق
    const context = topChunks
      .map((c) => c.text)
      .join("\n---\n");

    // 4. AI response
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
أنت مساعد ديني متخصص في كتاب "الوحي" للشيخ علي جمعة.

قواعد الإجابة:
- استخدم النص المرفق فقط
- إذا لم تجد إجابة قل: "لم أجد في الكتاب نص واضح"
- لا تضيف معلومات خارج النص

النص:
${context}
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    // 5. تنسيق المصادر للـ UI 📚
    const sources = topChunks.map((c) => ({
      text: c.text,
      page: c.page || null,
      book: c.book || "كتاب الوحي",
    }));

    // 6. response النهائي
    res.json({
      answer: response.choices[0].message.content,
      sources,
    });

  } catch (err) {
    console.log("❌ RAG ERROR:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;