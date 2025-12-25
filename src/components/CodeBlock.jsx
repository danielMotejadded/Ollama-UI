import { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

export default function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-6">
      {/* COPY BUTTON */}
      <button
        onClick={copy}
        className="
          absolute right-3 top-3
          text-xs font-medium
          px-2 py-1
          rounded
          bg-zinc-700
          text-zinc-200
          opacity-70
          hover:opacity-100
          transition
        "
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <CopyBlock
        text={code}
        language={language}
        theme={dracula}
        wrapLines
        showLineNumbers={true}
      />
    </div>
  );
}

