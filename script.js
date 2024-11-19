const medicalConditions = {
    bleeding: {
        solution: "Apply firm pressure to the wound with a clean cloth. Elevate the injury above heart level. If bleeding persists for more than 10 minutes, consult a doctor.",
       
    },
    burn: {
        solution: "Cool the burn with running water for at least 10 minutes. Do not apply ice or butter. Cover with a clean, non-stick dressing. Consult a doctor for severe burns.",
       
    },
    fever: {
        solution: "Drink plenty of fluids and rest. Take over-the-counter medications like paracetamol for high fever. Contact a doctor if the fever persists for more than 3 days.",
       
    },
    headache: {
        solution: "Rest in a quiet, dark room. Stay hydrated. Take over-the-counter pain relief. If headaches persist or worsen, consult a doctor.",
       
    },
    nausea: {
        solution: "Sip on clear fluids. Eat small, bland meals like crackers or bananas. Avoid strong odors. Contact a doctor if vomiting lasts more than 24 hours.",
        
    },
    default: {
        solution: "I'm sorry, I couldn't find information on this. Please provide more details or consult a healthcare professional.",
        
    }
};

let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];


function displayMessage(sender, text, image = null) {
    const messagesDiv = document.getElementById("messages");

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    
    const textDiv = document.createElement("p");
    textDiv.textContent = text;
    messageDiv.appendChild(textDiv);

   


function handleQuery() {
    const userInput = document.getElementById("user-input").value.trim();

    if (!userInput) return;

  
    displayMessage("user", userInput);
    chatHistory.push({ sender: "user", text: userInput });

   
    const keyword = Object.keys(medicalConditions).find(key =>
        userInput.toLowerCase().includes(key)
    );
    const condition = medicalConditions[keyword] || medicalConditions.default;

    
    displayMessage("aid", condition.solution, condition.image);
    chatHistory.push({ sender: "aid", text: condition.solution });

    
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

    document.getElementById("user-input").value = "";
}


function clearChat() {
    chatHistory = [];
    localStorage.removeItem("chatHistory");

    
    document.getElementById("messages").innerHTML = "";
}


window.onload = function () {
    chatHistory.forEach(({ sender, text }) => {
        const condition = medicalConditions[Object.keys(medicalConditions).find(key => text.includes(key))];
        displayMessage(sender, text, condition?.image || null);
    });

   
    const sendButton = document.getElementById("send-button");
    sendButton.addEventListener("click", handleQuery);

   
    document.getElementById("user-input").addEventListener("keypress", function (e) {
        if (e.key === 'Enter') {
            handleQuery();
        }
    });
};
