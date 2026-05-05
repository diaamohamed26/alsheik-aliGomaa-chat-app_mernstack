import { useEffect, useRef, useState } from "react";
import { api } from "./api";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const question = input;

    // user message
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat", {
        message: question,
      });

      const botMessage = {
        role: "bot",
        text: res.data.answer,
        sources: res.data.sources || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "❌ حدث خطأ في السيرفر",
          sources: [],
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-[#f6f3eb] font-sans">

      {/* HEADER */}
      <div className="bg-[#0b3d2e] text-white p-4 text-center border-b-4 border-yellow-500 shadow-md">
        <h1 className="text-xl font-bold">
          📿 Chat كتب الشيخ علي جمعة
        </h1>
        <p className="text-sm text-gray-200">
          نظام بحث داخل كتاب الوحي
        </p>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-auto p-4 space-y-3 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]">

        {messages.map((msg, i) => (
          <div key={i} className="space-y-2">

            {/* MESSAGE */}
            <div
              className={`p-3 rounded-lg max-w-[75%] shadow-md text-sm leading-relaxed ${
                msg.role === "user"
                  ? "ml-auto bg-[#0b3d2e] text-white border-r-4 border-yellow-400"
                  : "bg-white text-gray-800 border-l-4 border-[#0b3d2e]"
              }`}
            >
              {msg.text}
            </div>

            {/* SOURCES 📚 */}
            {msg.role === "bot" && msg.sources.length > 0 && (
              <div className="ml-2 text-xs text-gray-600 space-y-1">

                <p className="font-bold text-[#0b3d2e]">
                  📚 المصادر:
                </p>

                {msg.sources.map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-2 rounded border-r-2 border-yellow-400"
                  >
                    <p>📖 {s.book}</p>
                    {s.page && <p>📄 صفحة: {s.page}</p>}
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}

        {/* LOADING */}
        {loading && (
          <div className="bg-white p-3 rounded-lg text-gray-500 w-fit border-l-4 border-yellow-500">
            جاري البحث في كتاب الوحي...
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 bg-white border-t flex gap-2">

        <input
          className="flex-1 border p-2 rounded focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب سؤالك..."
        />

        <button
          onClick={sendMessage}
          className="bg-[#0b3d2e] text-white px-5 rounded hover:bg-[#0f4d3a]"
        >
          إرسال
        </button>

      </div>
    </div>
  );
}