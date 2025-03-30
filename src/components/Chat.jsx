import { useState } from "react";
import { useAiChat } from "../context/AiChatContext";
import styles from "./Chat.module.css";
import { sendChat } from "../services/api"; // Make sure this path is correct

function Chat({ onClose }) {
  const { messages, sendMessage } = useAiChat();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    sendMessage(trimmed, "user"); // Send user message
    setInput("");

    try {
      const response = await sendChat({ message: trimmed });
  
      // Show bot reply from backend
      if (response.ai) {
        sendMessage(response.ai, "bot");
      } else {
        sendMessage("Sorry, I didn't get a response.", "bot");
      }
    } catch (error) {
      console.error("Chat error:", error);
      sendMessage("Something went wrong. Please try again later.", "bot");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <span>🤖 Travelog Ai</span>
        <button onClick={onClose} className={styles.closeBtn}>✖</button>
      </div>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === "user" ? styles.userMsg : styles.botMsg}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
