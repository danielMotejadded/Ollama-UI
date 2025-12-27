let currentCntext = null;

export const generateStreaming = async (prompt, onToken) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen3-coder",
      prompt,
      context: currentCntext ?? undefined,
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

      if (json.done) {
        if (json.context) {
          currentCntext = json.context;
        }
        return;
      }
    }
  }
};
