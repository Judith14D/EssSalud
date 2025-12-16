import { createContext, useContext, useEffect, useState } from "react";

export interface ChatMessage {
  from: "user" | "bot" | "bot-block";
  text?: string;
  block?: any;
  time: string;
  date: Date;
}

interface ChatContextType {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: any) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("chatbot_session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.messages)) {
          const restored = parsed.messages.map((m: any) => ({
            ...m,
            date: new Date(m.date),
          }));
          setMessages(restored);
        }
        setOpenChat(parsed.openChat ?? false);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "chatbot_session",
      JSON.stringify({
        messages,
        openChat,
      })
    );
  }, [messages, openChat]);

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, openChat, setOpenChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be inside ChatProvider");
  return ctx;
};
