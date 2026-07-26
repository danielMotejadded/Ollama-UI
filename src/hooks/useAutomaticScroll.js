import { useEffect } from "react";

export default function useAutomaticScroll(messagesRef, activeChat) {
  useEffect(() => {
    messagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [activeChat.messages, messagesRef]);
}
