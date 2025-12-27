import { useState, useRef } from "react";
import { generateStreaming } from "../API/api";
export default function Input({ setAnswer }) {
  const input = useRef();

  const [question, setQuestion] = useState("");
  const [isGenerating, setIsgenerating] = useState(false);

  const checkInput = (e) => {
    setQuestion(e.target.value);
  };

  const handleGenerate = async (prompt) => {
    input.current.value = "";

    try {
      await generateStreaming(prompt, (token) => {
        setAnswer((prev) => prev + token);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.isComposing) return;

    if (e.key === "Enter" && !e.shiftKey) {
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
                leading-6
                w-full
                rounded-4xl
                bg-zinc-600
                border border-zinc-700
                px-4 py-3
                text-2xl text-zinc-100
                placeholder-white
                placeholder:translate-y-2 
                outline-none
                transition
                duration-200
                focus:border-white
                focus:ring-1
                focus:ring-white
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
