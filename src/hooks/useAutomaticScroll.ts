import { RefObject, useEffect } from "react";
import { Chat } from "../types/Chat";




export default function useAutomaticScroll(messagesRef: RefObject<HTMLDivElement | null>, activeChat: Chat | undefined) {
  console.log(messagesRef);
  useEffect(() => {
    messagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [activeChat?.messages, messagesRef]);
}
