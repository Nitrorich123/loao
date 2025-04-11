const API_KEY = "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";

document.getElementById("generateCodeBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("codePrompt").value.trim();
  const language = document.getElementById("languageSelect").value;
  const output = document.getElementById("codeOutput");

  if (!prompt) return alert("Please enter a code prompt.");

  output.textContent = "Generating code...";

  const systemPrompt = `You are a helpful coding assistant. Respond ONLY with code in ${language}. Do not include explanations.`;
  const userPrompt = `Write the following in ${language}:\n${prompt}`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768", // Or use "llama3-70b-8192", "gemma-7b-it", etc.
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2
    })
  });

  const data = await res.json();
  const code = data.choices?.[0]?.message?.content || "No code could be generated.";

  output.textContent = code;
});
