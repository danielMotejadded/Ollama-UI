import ReactMarkdown from "react-markdown";
import CodeBlockWithCopy from "./CodeBlockWithCopy";
import { Message } from "../types/Chat";
import React from "react";

type ChatMessageProp = {
  message: Message;
}
export default function ChatMessage({ message }: ChatMessageProp) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="
          
          bg-zinc-900 text-white
          px-4 py-2
          rounded-2xl 
          text-sm
          whitespace-pre-wrap
        "
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            return (
              <code
                {...props}
                className={`bg-zinc-700 px-1 rounded ${className ?? ""}`}
              >
                {children}
              </code>
            );
          },

          pre({ children }) {
            const child = Array.isArray(children) ? children[0] : children;

            if (!React.isValidElement(child)) {
              return <pre>{children}</pre>;
            }

            const props = child.props as {
              className?: string;
              children?: React.ReactNode;
            };

            const match = /language-(\w+)/.exec(props.className ?? "");
            const language = match?.[1] ?? "text";
            const code = String(props.children).replace(/\n$/, "");

            return (
              <CodeBlockWithCopy
                code={code}
                language={language}
              />
            );
          },
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}
