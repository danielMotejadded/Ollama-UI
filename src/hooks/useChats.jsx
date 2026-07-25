import { useEffect, useState } from "react";
import { generateTitle } from "../API/api";

export function useChats() {
  const chatObjectsArray = [
    {
      id: "default",
      title: "Current chat",
      messages: [],
      context: null,
    },
  ];

  const stateInitializer = () => {
    const chats = localStorage.getItem("chats");
    if (chats) return JSON.parse(chats);
    return chatObjectsArray;
  };
  const [chats, setChats] = useState(stateInitializer);

  const [activeChatId, setActiveChatId] = useState("default");

  const activeChat = chats.find((c) => c.id === activeChatId);
  
  const createNewChat = async () => {
    if (activeChat.messages.length <= 0) return;
    const id = crypto.randomUUID();
    const title = await generateTitle(activeChat.context);
    activeChat.title = title;
    const newChat = {
      id,
      title: "Current chat",
      messages: [],
      context: null,
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(id);
  };

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  return {
    chats,
    setChats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createNewChat,
  };
}
