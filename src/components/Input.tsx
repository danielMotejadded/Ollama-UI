import {
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from "react";
import { generateStreaming } from "../API/api";
import type { Chat, Message } from "../types/Chat";
import { createGuid } from "../types/Guid";
import type { Guid } from "../types/Guid";

type InputProps = {
  activeChat: Chat | undefined;
  setChats: Dispatch<SetStateAction<Chat[]>>;
};

export default function Input({ setChats, activeChat }: InputProps) {
  const input = useRef<HTMLTextAreaElement>(null);
  const [question, setQuestion] = useState("");

  const checkInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const showLabelCondition = activeChat?.messages.length === 0;

  const appendToken = (
    chatId: Guid,
    messageId: Guid,
    token: string,
  ) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id !== chatId
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

  const handleGenerate = async (prompt: string) => {
    if (!activeChat || prompt.trim() === "") return;

    const chatId = activeChat.id;

    const userMsg: Message = {
      id: createGuid(),
      role: "user",
      content: prompt,
    };

    const assistantMsg: Message = {
      id: createGuid(),
      role: "assistant",
      content: "",
    };

    setQuestion("");

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
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
      (token: string) => {
        appendToken(chatId, assistantMsg.id, token);
      },
      (newContext: number[]) => {
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === chatId
              ? { ...chat, context: newContext }
              : chat,
          ),
        );
      },
    );
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.nativeEvent.isComposing) return;

    if (
      e.key === "Enter" &&
      question.trim() !== "" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      void handleGenerate(question);
    }
  };

  return (
    <div className="shrink-0 py-6">
      <div className="mx-auto w-2/3 text-center">
        {showLabelCondition && (
          <label className="mb-4 block text-2xl text-white">
            How can I help you?
          </label>
        )}

        <div className="flex gap-6">
          <textarea
            ref={input}
            value={question}
            onChange={checkInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="
              h-14
              w-full
              resize-none
              rounded-full
              bg-zinc-600
              px-6
              py-0
              text-base
              leading-[3.5rem]
              text-white
              outline-none
              placeholder:text-zinc-300
            "
          />

          <button
            type="button"
            disabled={!activeChat || question.trim() === ""}
            onClick={() => void handleGenerate(question)}
          >
            <i className="fa-solid fa-arrow-up fa-2xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}