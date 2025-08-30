import React, { useState, useRef, useEffect } from "react";
import "./ChatBox.css";

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào 👋! Mình có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Hàm phản hồi cơ bản (rule-based)
  const getBotReply = (message) => {
    const lower = message.toLowerCase();

    if (lower.includes("chào") || lower.includes("hello")) {
      return "Chào bạn 👋! Rất vui được gặp bạn.";
    }
    if (lower.includes("giá")) {
      return "Hiện tại sản phẩm bên mình có nhiều mức giá khác nhau 💰. Bạn muốn xem loại nào?";
    }
    if (lower.includes("mua")) {
      return "Bạn có thể đặt hàng trực tiếp trên website 🛒 hoặc liên hệ hotline 1900-1234.";
    }
    if (lower.includes("cảm ơn")) {
      return "Không có gì đâu ✨. Rất vui được giúp bạn!";
    }
    if (lower.includes("tạm biệt") || lower.includes("bye")) {
      return "Tạm biệt 👋. Chúc bạn một ngày tốt lành!";
    }

    return "Mình chưa hiểu ý bạn 🤔. Bạn có thể nói rõ hơn không?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = getBotReply(userMessage.text);
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
      setLoading(false);
    }, 800);
  };

  // ✅ Tự cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <div className="chatbox-container">
      {/* Nút bong bóng mở chat */}
      <div className="chat-toggle" onClick={toggleChat}>
        💬
      </div>

      {/* Cửa sổ chat */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Hỗ trợ trực tuyến</span>
            <button onClick={toggleChat}>×</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-message bot">...</div>}
            <div ref={chatEndRef}></div>
          </div>

          <div className="chat-footer">
            <input
              type="text"
              value={input}
              placeholder="Nhập tin nhắn..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
