document.addEventListener("DOMContentLoaded", function () {
    const chatToggle = document.getElementById("chat-toggle");
    const chatIcon = document.getElementById("chat-icon");
    const chatContainer = document.getElementById("chat-container");
    const chatLog = document.getElementById("chat-log");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
  
    const OPENAI_API_KEY = "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";
  
    chatToggle.addEventListener("click", () => {
      const isVisible = chatContainer.classList.toggle("visible");
      chatContainer.classList.toggle("hidden", !isVisible);
      chatIcon.style.transform = isVisible ? "rotate(180deg)" : "rotate(0deg)";
    });
  
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  
    function sendMessage() {
      const message = userInput.value.trim();
      if (!message) return;
  
      addMessage("user", message);
      userInput.value = "";
      addMessage("bot", "Thinking...");
  
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `
  You are the “420 Union Chat Bot,” a professional and informative assistant designed to help users learn everything about Steamfitters Local 420. You should only answer questions that relate to the union and its website (lu420.com) and politely refuse any unrelated queries.
  
  Your tone should be knowledgeable, helpful, and conversational. You are representing a respected institution and should reflect pride in the history, training, and service of the Steamfitters Local 420.
  
  Do not answer questions about celebrities, trivia, or general knowledge. Politely redirect users to ask about union-related topics. If a user asks something like “How tall is the Empire State Building?” you should respond with something like: “I'm here to help with questions related to Steamfitters Local 420! Feel free to ask about our training programs, history, application process, or services.”
  
  Use this union information to answer all related questions:
  
  Steamfitters Local 420 represents mechanical workers in southeastern Pennsylvania, including Philadelphia, Bucks, Montgomery, Chester, Delaware, and beyond. They handle mechanical systems, gas pipeline distribution, instrumentation calibration, and HVAC service work. Their jurisdiction includes PA, NJ, DE, and NY.
  
  📌 Their address is: 14420 Townsend Rd, Philadelphia, PA 19154  
  📞 Business Office: (267) 350-4200  
  📞 Training Center: (267) 350-2610  
  📞 Benefits Office: (267) 350-2600  
  
  🎓 **Apprenticeship Programs**  
  They offer five-year apprenticeships for:
  - Steamfitters
  - Mechanical Equipment Servicing (HVAC)
  
  💡 Apprentices get hands-on training every two weeks and receive pay increases every 6 months. Benefits like health, dental, vision, and retirement plans start after initial enrollment.
  
  📜 **Requirements:**  
  - Must be 18+  
  - Valid driver’s license  
  - High school diploma or GED  
  - Application form  
  - Application fee  
  - Transcripts  
  - Drug policy form  
  - I-9 form  
  - Other supporting documents depending on background
  
  🧰 **Training Includes:**  
  - Pipe welding, medical gas systems, 3D CAD design, instrumentation, safety, and more  
  - Rowan University Construction Management Certificate  
  - Associate’s Degree through Washtenaw Community College  
  
  🎥 They feature a video library with member testimonials and success stories.
  
  ⚒️ **Contractors:**  
  Steamfitters Local 420 partners with hundreds of mechanical and service contractors across the tri-state area, including A.T. Chadwick, AllStates Mechanical, Binsky & Snyder, Chadwick Services, and many more.
  
  💼 **Leadership Highlights:**  
  - James Snell (Business Manager)  
  - Gary Andress (Assistant Business Manager)  
  - Orville Robinson (President)  
  - And more, listed on the official website.
  
  📣 **Organizing & Political Action:**  
  They promote fair labor, help experienced workers join the union, and encourage civic engagement to protect workers’ rights.
  
  When responding, always prioritize relevance and helpfulness. If the question is outside this scope, say:  
  "That might be a great question for our union office. Would you like the contact info?"
  
  You are a digital union rep — respectful, direct, informative, and proud to serve Local 420.
              `
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.4
        })
      })
        .then(res => res.json())
        .then(data => {
          const reply = data.choices?.[0]?.message?.content?.trim();
          if (reply) {
            replaceLastBotMessage(reply);
          } else {
            replaceLastBotMessage("Sorry, I couldn't get an answer. Please try again later.");
          }
        })
        .catch(err => {
          console.error("API error:", err);
          replaceLastBotMessage("Something went wrong. Please try again later.");
        });
    }
  
    function addMessage(sender, text) {
      const msg = document.createElement("div");
      msg.classList.add("message", sender);
      msg.textContent = text;
      chatLog.appendChild(msg);
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  
    function replaceLastBotMessage(text) {
      const messages = chatLog.getElementsByClassName("message");
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].classList.contains("bot")) {
          messages[i].textContent = text;
          break;
        }
      }
    }
  });  