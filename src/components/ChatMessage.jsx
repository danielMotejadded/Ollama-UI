import ReactMarkdown from "react-markdown";
import CodeBlockWithCopy from "./CodeBlockWithCopy";

export default function ChatMessage({ message }) {
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
          p({ children }) {
            return <p className="mb-3">{children}</p>;
          },
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "text";
            const code = String(children).replace(/\n$/, "");

            if (inline) {
              return <code className="bg-zinc-700 px-1 rounded">{code}</code>;
            }

            return <CodeBlockWithCopy code={code} language={language} />;
          },
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}
