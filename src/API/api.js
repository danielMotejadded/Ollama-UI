export const generateStreaming = async (prompt, context, onToken, onDone) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen3-coder:30b",
      prompt: prompt,
      context: context ?? undefined,
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");

    buffer = lines.pop();

    for (const line of lines) {
      if (!line.trim()) continue;

      const json = JSON.parse(line);

      if (json.response) {
        onToken(json.response);
      }

      if (json.done && json.context) {
        onDone?.(json.context);
        return;
      }
    }
  }
};
export const generateTitle = async (context) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen3-coder:30b",
      stream: false,
      prompt: `
Create a short title for this chat.

Rules:
- Maximum 5 words
- Return only the title
- No quotes
- No period at the end
- Use the same language as the user's message`,
      context: context ?? undefined,
    }),
  });
console.log('funny')
  if (!response.ok) {
    throw new Error("Failed to generate chat title");
  }

  const data = await response.json();

  return data.response.trim();
};
