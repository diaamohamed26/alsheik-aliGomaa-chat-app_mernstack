import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: String, // user / assistant
  content: String,
});

const conversationSchema = new mongoose.Schema(
  {
    messages: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
