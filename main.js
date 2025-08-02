const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  input.value = "";

  const response = await askGemini(userMessage);
  addMessage("bot", response);
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function askGemini(prompt) {
  const apiKey = "AIzaSyBTc-fPPMhpguGJirTe6CG7HYjGLe6YgfI"; // Change la après test
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
        role: "user"
      }
    ]
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Aucune réponse de Gemini.";
  } catch (err) {
    console.error(err);
    return "❌ Erreur lors de la requête API.";
  }
}
