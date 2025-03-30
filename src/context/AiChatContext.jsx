import  { createContext, useContext, useState } from "react";

const AiChatContext = createContext();

export function AiChatProvider({ children }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi I'm travlog ai ask me anything!" },
  ]);

  const sendMessage = (text, sender="user") => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  return (
    <AiChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </AiChatContext.Provider>
  );
}

export function useAiChat() {
  return useContext(AiChatContext);
}
