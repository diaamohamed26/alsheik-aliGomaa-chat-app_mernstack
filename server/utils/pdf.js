import fs from "fs";
import pdf from "pdf-parse";

export const loadPDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  return data.text;
};