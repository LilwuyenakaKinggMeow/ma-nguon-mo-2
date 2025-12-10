import React, { useState, useRef, useEffect } from "react";

export default function ChatBubble({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || "Lỗi server";

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEnter = (e) => e.key === "Enter" && sendMessage();

  return (
    <div style={styles.chatWrapper}>

      <div style={styles.header}>
        <span>💬 AI Hỗ Trợ</span>

        <button style={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
      </div>


      <div style={styles.messagesBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              ...(m.role === "user" ? styles.user : styles.ai),
            }}
          >
            {m.content}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>


      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Nhập tin nhắn..."
        />
        <button style={styles.button} onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatWrapper: {
    position: "fixed",
    bottom: 25,
    right: 25,
    width: 360,
    height: 500,
    background: "#ffffff",
    borderRadius: 20,
    boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "Arial",
    zIndex: 9999,
    transition: "all 0.25s ease",
  },

  header: {
    background: "#4d83ff",
    padding: "16px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 22,
    cursor: "pointer",
    padding: "2px 8px",
  },

  messagesBox: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    background: "#f7f9fc",
  },

  message: {
    padding: "12px 16px",
    marginBottom: 12,
    borderRadius: 14,
    maxWidth: "80%",
    fontSize: 15,
    lineHeight: "1.4",
  },

  user: {
    marginLeft: "auto",
    background: "#d9e7ff",
    color: "#0b3fa8",
  },

  ai: {
    marginRight: "auto",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
  },

  inputBox: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: 10,
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    marginLeft: 8,
    padding: "10px 16px",
    background: "#4d83ff",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 18,
    fontWeight: "bold",
  },
};
