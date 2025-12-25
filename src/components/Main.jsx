import { useState, useRef } from "react";
import { generateStreaming } from "../API/api";
import ReactMarkdown from "react-markdown";

import CodeBlock from "./CodeBlock";
import Input from "./Input";

export default function Main() {
  const [answer, setAnswer] = useState("");

  return (
    <main className="flex flex-col flex-1 bg-zinc-800 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="w-2/3 mx-auto space-y-6 text-white">
          <ReactMarkdown
            components={{
              code({ inline, className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                const language = match ? match[1] : "text";

                if (inline) {
                  return (
                    <code className="bg-zinc-700 px-1 py-0.5 rounded text-sm">
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    code={String(children).replace(/\n$/, "")}
                    language={language}
                  />
                );
              },
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>
      </div>

      <Input setAnswer={setAnswer} />
    </main>
  );
}
