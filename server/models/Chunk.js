import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  text: String,
  embedding: [Number],
  source: String,
  page: Number
});

export default mongoose.model("Chunk", chunkSchema);