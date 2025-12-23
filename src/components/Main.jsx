import { useState } from "react";
import { generateStreaming } from "../API/api";
import { useRef } from "react";
export default function Main() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const input = useRef();
  const checkInput = (e) => {
    setQuestion(e.target.value);
  };

  const handleGenerate = async (prompt) => {
    setAnswer("");
    input.current.value = "";
    try {
      await generateStreaming(prompt, (token) => {
        setAnswer((prev) => prev + token);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex-1 p-4">
      <div className="w-2/3 m-auto h-3/5">
        <pre className="mt-4 whitespace-pre-wrap p-16 text-md">{answer}</pre>
      </div>

      <div className=" w-2/3 m-auto text-center h-2/5">
        <label className="block mb-4 text-2xl text-heading">
          How can I help you?
        </label>
        <div className="flex gap-6">
          <input
            ref={input}
            onChange={(e) => {
              checkInput(e);
            }}
            type="text"
            placeholder="Ask me anything..."
            className="
                  w-full
                  rounded-xl
                  bg-zinc-900
                  border
                  border-zinc-700
                  px-4
                  py-6
                  text-xl
                  text-zinc-100
                  placeholder-zinc-500
                  outline-none
                  transition
                  duration-200
                  focus:border-white
                  focus:ring-1
                  focus:ring-white
                "
          />
          <button onClick={() => handleGenerate(question)}>
            <span className="">
              <i className="fa-solid fa-arrow-up fa-2xl"></i>
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
