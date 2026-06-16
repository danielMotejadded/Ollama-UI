import { useState } from "react";
import { generateTitle } from "../API/api";

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

  const activeChat = chats.find((c) => c.id === activeChatId);

  const createNewChat = async () => {
    const id = crypto.randomUUID();
    const title = await generateTitle(activeChat.context);
    activeChat.title = title;
    const newChat = {
      id,
      title: "Nowy czat",
      messages: [],
      context: null,
    };

    setChats((prev) => [newChat, ...prev]);
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
