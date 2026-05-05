import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import fs from "fs";

import Chunk from "../models/Chunk.js";
import { splitText } from "../utils/chunkText.js";
import { createEmbedding } from "../utils/embedding.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const buffer = fs.readFileSync(req.file.path);
    const pdf = await pdfParse(buffer);

    const text = pdf.text;
    const chunks = splitText(text, 500);

    for (let chunk of chunks) {
      const embedding = await createEmbedding(chunk);

      await Chunk.create({
        text: chunk,
        embedding,
        book: req.file.originalname,
      });
    }

    res.json({ message: "PDF processed successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;