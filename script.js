// Pre-defined first-aid responses
const firstAidResponses = {
    bleeding: "Apply firm pressure to the wound with a clean cloth and keep it elevated.",
    choking: "Perform the Heimlich maneuver: Stand behind the person and give abdominal thrusts.",
    unconscious: "Check for breathing, call emergency services, and start CPR if necessary.",
    burn: "Cool the burn with running water for at least 10 minutes and cover it with a clean cloth.",
    default: "I'm sorry, I couldn't understand. Please provide more details or consult a professional."
};

// Load previous messages from localStorage
const messagesDiv = document.getElementById("messages");
const storedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];

// Display stored messages
storedMessages.forEach(({ sender, text }) => {
    addMessage(sender, text);
});

function handleQuery() {
    const userInput = document.getElementById("user-input").value.trim();

    if (!userInput) return;

    // Display user message
    addMessage("user", userInput);
    saveMessage("user", userInput);

    // Find matching response
    const keyword = Object.keys(firstAidResponses).find((key) =>
        userInput.toLowerCase().includes(key)
    );
    const response = firstAidResponses[keyword] || firstAidResponses.default;

    // Display SmartAid response
    addMessage("aid", response);
    saveMessage("aid", response);

    // Clear input field
    document.getElementById("user-input").value = "";
}

function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);

    // Scroll to the latest message
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function saveMessage(sender, text) {
    storedMessages.push({ sender, text });
    localStorage.setItem("chatHistory", JSON.stringify(storedMessages));
}
