const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  input.value = "";

  const response = await askAI(userMessage);
  addMessage("bot", response);
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function askAI(prompt) {
  const apiKey = "AIzaSyBTc-fPPMhpguGJirTe6CG7HYjGLe6YgfI"; // Regénère la après !
  const url = "https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=" + apiKey;

  const body = {
    prompt: {
      messages: [
        {
          content: prompt
        }
      ]
    }
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
    return data.candidates?.[0]?.content || "Pas de réponse de l'IA.";
  } catch (err) {
    return "Erreur lors de la communication avec l'API.";
  }
}
