import Input from "./Input";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";

export default function Main({ activeChat, setChats }) {

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-400">
        No chat selected
      </div>
    );
  }

  return (
    <main className="flex flex-col flex-1 bg-zinc-800 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div
          className="w-2/3 mx-auto space-y-6 text-white mb-6"
          
        >
          {activeChat.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </div>

      <Input setChats={setChats} activeChat={activeChat} />
    </main>
  );
}
