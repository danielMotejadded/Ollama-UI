import { useState, useRef } from "react";
import { generateStreaming } from "../API/api";

export default function Input({ setChats, activeChat }) {
  const input = useRef();

  const [question, setQuestion] = useState("");

  const checkInput = (e) => {
    setQuestion(e.target.value);
  };

  const handleGenerate = async (prompt) => {
    input.current.value = "";
    const userId = crypto.randomUUID();
    const assistantId = crypto.randomUUID();

    const userMsg = {
      id: userId,
      role: "user",
      content: prompt,
    };
    const assistantMsg = {
      id: assistantId,
      role: "assistant",
      content: "",
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat.id
          ? {
              ...chat,
              messages: [...chat.messages, userMsg, assistantMsg],
            }
          : chat,
      ),
    );

  await generateStreaming(
  prompt,
  activeChat.context,
  token => {
    appendToken(assistantId, token);
  },
  newContext => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === activeChat.id
          ? { ...chat, context: newContext }
          : chat
      )
    );
  }
);

  };

  const appendToken = (messageId, token) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id !== activeChat.id
          ? chat
          : {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId
                  ? { ...msg, content: msg.content + token }
                  : msg,
              ),
            },
      ),
    );
  };
  const handleKeyDown = (e) => {
    if (e.isComposing) return;

    if (e.key === "Enter" && question.trim() !== "" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate(question);
      setQuestion("");
    }
  };

  return (
    <div className="shrink-0 py-6">
      <div className="w-2/3 mx-auto text-center">
        <label className="block mb-4 text-2xl text-white">
          How can I help you?
        </label>

        <div className="flex gap-6">
          <textarea
            ref={input}
            value={question}
            onChange={checkInput}
            onKeyDown={(e) => handleKeyDown(e)}
            type="text"
            placeholder="Ask me anything..."
            className="
           w-full
    h-14
    px-6
    py-0
    rounded-full
    bg-zinc-600
    text-white
    text-base
    leading-[3.5rem]
    placeholder:text-zinc-300
    resize-none
    outline-none
              "
          />

          <button onClick={() => handleGenerate(question)}>
            <i className="fa-solid fa-arrow-up fa-2xl text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
