import path from "path";
import { fileURLToPath } from "url";

import { loadPDF } from "../utils/pdf.js";
import { splitTextWithPages } from "../utils/chunk.js";
import { getEmbedding } from "../utils/embeddings.js";
import { addChunk } from "../utils/store.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = path.join(__dirname, "../assets/كتاب الوحي.pdf");

const run = async () => {
  const text = await loadPDF(pdfPath);

  const chunks = splitTextWithPages(text);

  for (let c of chunks) {
    const embedding = await getEmbedding(c.text);

    addChunk({
      text: c.text,
      page: c.page,
      book: "كتاب الوحي",
      embedding,
    });
  }

  console.log("✅ Indexed with pages");
};

run();