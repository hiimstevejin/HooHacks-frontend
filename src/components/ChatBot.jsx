// components/ChatBot.jsx
import { useState } from "react";
import Chat from "./Chat";
import styles from "./ChatBot.module.css";

function ChatBot() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.chatBot}>
      {!open && (
        <button className={styles.openButton} onClick={() => setOpen(true)}>
          💬 Chat with AI
        </button>
      )}
      {open && (
        <div className={styles.chatWrapper}>
          <Chat onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default ChatBot;
