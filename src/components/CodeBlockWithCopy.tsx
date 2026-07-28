import { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

export default function CodeBlockWithCopy({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-4">
      {/* COPY BUTTON */}
      <button
        onClick={handleCopy}
        className="
          absolute top-2 right-2
          text-xs px-2 py-1 rounded
          bg-zinc-700 hover:bg-zinc-600
          text-white opacity-80 hover:opacity-100
          transition
        "
      >
        {copied ? "Copied" : "Copy"}
      </button>

      <CodeBlock
        text={code}
        language={language}
        theme={dracula}
        showLineNumbers={false}
        wrapLines
      />
    </div>
  );
}
