import { useState } from "react";

export function useChats() {
  const [chats, setChats] = useState([
    {
      id: "default",
      title: "Chat",
      messages: [],
      context: null,
    },
  ]);

  const [activeChatId, setActiveChatId] = useState("default");

  const activeChat = chats.find(c => c.id === activeChatId);

  const createNewChat = () => {
    const id = crypto.randomUUID();

    const newChat = {
      id,
      title: "New chat",
      messages: [],
      context: null,
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChatId(id);
  };

  return {
    chats,
    setChats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createNewChat,
  };
}
