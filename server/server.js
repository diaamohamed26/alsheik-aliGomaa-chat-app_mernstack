import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

/* ========================
   MIDDLEWARE
======================== */
app.use(cors());
app.use(express.json());

/* ========================
   DB CONNECTION
======================== */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🗄️ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
};

connectDB();

/* ========================
   ROUTES
======================== */
app.use("/api/chat", chatRoutes);

/* ========================
   HEALTH CHECK
======================== */
app.get("/", (req, res) => {
  res.json({
    status: "🚀 RAG Server Running",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

/* ========================
   START SERVER
======================== */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});