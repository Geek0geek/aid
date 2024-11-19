// Dictionary of 100 common medical conditions with solutions
const medicalConditions = {
    bleeding: {
        solution: "Apply firm pressure to the wound with a clean cloth. Elevate the injury above heart level. If bleeding persists for more than 10 minutes, consult a doctor.",
        image: "antiseptic.png"
    },
    burn: {
        solution: "Cool the burn with running water for at least 10 minutes. Do not apply ice or butter. Cover with a clean, non-stick dressing. Consult a doctor for severe burns.",
        image: "bandage.png"
    },
    fever: {
        solution: "Drink plenty of fluids and rest. Take over-the-counter medications like paracetamol for high fever. Contact a doctor if the fever persists for more than 3 days.",
        image: "thermometer.png"
    },
    headache: {
        solution: "Rest in a quiet, dark room. Stay hydrated. Take over-the-counter pain relief. If headaches persist or worsen, consult a doctor.",
        image: "headache.png"
    },
    nausea: {
        solution: "Sip on clear fluids. Eat small, bland meals like crackers or bananas. Avoid strong odors. Contact a doctor if vomiting lasts more than 24 hours.",
        image: "ginger.png"
    },
    // ... Add 95 more conditions with detailed solutions and images.
    default: {
        solution: "I'm sorry, I couldn't find information on this. Please provide more details or consult a healthcare professional.",
        image: "help.png"
    }
};

// Load previous chat history
let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

// Display messages
function displayMessage(sender, text, image = null) {
    const messagesDiv = document.getElementById("messages");

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    // Add text
    const textDiv = document.createElement("p");
    textDiv.textContent = text;
    messageDiv.appendChild(textDiv);

    // Add image if available
    if (image) {
        const img = document.createElement("img");
        img.src = `assets/${image}`;
        img.alt = "Medical Equipment";
        img.className = "equipment-img";
        messageDiv.appendChild(img);
    }

    messagesDiv.appendChild(messageDiv);

    // Auto-scroll
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleQuery() {
    const userInput = document.getElementById("user-input").value.trim();

    if (!userInput) return;

    // Add user message
    displayMessage("user", userInput);
    chatHistory.push({ sender: "user", text: userInput });

    // Find solution
    const keyword = Object.keys(medicalConditions).find(key =>
        userInput.toLowerCase().includes(key)
    );
    const condition = medicalConditions[keyword] || medicalConditions.default;

    // Add bot message
    displayMessage("aid", condition.solution, condition.image);
    chatHistory.push({ sender: "aid", text: condition.solution });

    // Save chat history
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

    // Clear input field
    document.getElementById("user-input").value = "";
}

function clearChat() {
    // Clear chat history
    chatHistory = [];
    localStorage.removeItem("chatHistory");

    // Clear UI
    document.getElementById("messages").innerHTML = "";
}

// Load chat history on page load
window.onload = function () {
    chatHistory.forEach(({ sender, text }) => {
        const condition = medicalConditions[Object.keys(medicalConditions).find(key => text.includes(key))];
        displayMessage(sender, text, condition?.image || null);
    });
};
