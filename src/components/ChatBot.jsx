import styles from "./ChatBot.module.css";
import { useState } from "react";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleChat = () => {
    // If currently open, start the closing animation.
    if (isOpen && !isClosing) {
      setIsClosing(true);
      // After the closing animation duration, fully close the chat.
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300); // match the duration of the closing animation (300ms)
    } else {
      // If closed, open the chat window immediately.
      setIsOpen(true);
    }
  };

  return (
    <div className={styles.chatBotContainer}>
      {isOpen && (
        <div
          className={`${styles.chatWindow} ${
            isClosing ? styles.closing : styles.opening
          }`}
        >
          <div className={styles.chatHeader}>Travlog Ai</div>
          <div className={styles.chatContent}>
            <p>Ask me anything about your traveling!</p>
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            className={styles.chatInput}
          />
        </div>
      )}
      <button className={styles.chatToggle} onClick={toggleChat}>
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>
    </div>
  );
}

export default ChatBot;
