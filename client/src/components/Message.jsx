function Message({ role, content }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-3 rounded-2xl max-w-lg leading-relaxed ${
          role === "user"
            ? "bg-blue-500"
            : "bg-green-600"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default Message;