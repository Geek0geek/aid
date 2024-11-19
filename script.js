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
    const medicalConditions = {
    cold: {
        solution: "Rest and drink plenty of fluids. Use over-the-counter cold remedies for symptom relief. Consult a doctor if symptoms persist beyond 10 days or worsen significantly.",
        image: "cold-remedy.png"
    },
    cough: {
        solution: "Stay hydrated and use honey or lozenges to soothe the throat. Use a humidifier to keep airways moist. Consult a doctor if the cough lasts more than 3 weeks or produces blood.",
        image: "cough-syrup.png"
    },
    sprain: {
        solution: "Use the R.I.C.E. method: Rest, Ice, Compression, and Elevation. Avoid putting weight on the injured area. If swelling or pain persists, consult a doctor.",
        image: "bandage.png"
    },
    indigestion: {
        solution: "Eat smaller meals, avoid spicy or fatty foods, and drink herbal teas. Use antacids for immediate relief. Consult a doctor if symptoms persist or worsen.",
        image: "antacid.png"
    },
    constipation: {
        solution: "Increase fiber intake, stay hydrated, and engage in regular physical activity. Use over-the-counter laxatives if needed. Consult a doctor if constipation persists for more than a week.",
        image: "fiber-supplement.png"
    },
    diarrhea: {
        solution: "Stay hydrated with oral rehydration solutions or clear fluids. Avoid dairy and greasy foods. Consult a doctor if diarrhea lasts more than 2 days or is accompanied by severe dehydration.",
        image: "oral-rehydration.png"
    },
    sunburn: {
        solution: "Cool the skin with cold compresses or aloe vera gel. Avoid further sun exposure and stay hydrated. Consult a doctor if blisters form or if the burn covers a large area.",
        image: "sunscreen.png"
    },
    sore_throat: {
        solution: "Gargle with warm saltwater, stay hydrated, and use lozenges or throat sprays for relief. Consult a doctor if the sore throat lasts more than a week or is accompanied by high fever.",
        image: "throat-spray.png"
    },
    stomachache: {
        solution: "Rest and avoid heavy meals. Drink herbal teas like peppermint or chamomile. Consult a doctor if the pain is severe, persistent, or accompanied by fever or vomiting.",
        image: "herbal-tea.png"
    },
    fatigue: {
        solution: "Ensure adequate sleep, stay hydrated, and eat a balanced diet. Avoid caffeine and alcohol close to bedtime. Consult a doctor if fatigue persists despite lifestyle changes.",
        image: "sleep-mask.png"
    },
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
