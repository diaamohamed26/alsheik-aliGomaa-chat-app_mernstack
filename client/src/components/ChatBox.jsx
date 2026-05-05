import { useState } from "react";
import axios from "axios";
import Message from "./Message";

function ChatBox({ setSources }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await axios.post("http://localhost:5001/api/chat", {
      message: input,
    });

    setMessages([
      ...newMessages,
      { role: "assistant", content: res.data.reply },
    ]);

    setSources(res.data.sources); // 👈 أهم جزء

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="p-4 border-b border-slate-700 text-center">
        <h1 className="font-bold text-xl">💬 AI Chat</h1>
        <p className="text-xs text-gray-400">
          مدعوم بالذكاء الاصطناعي + PDF مصادر
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} content={m.content} />
        ))}

        {loading && (
          <div className="text-gray-400 animate-pulse">
            يكتب...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 rounded-xl bg-slate-800 outline-none"
          placeholder="اكتب سؤالك..."
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600"
        >
          إرسال
        </button>
      </div>

    </div>
  );
}

export default ChatBox;