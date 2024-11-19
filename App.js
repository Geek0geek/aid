import React, { useState } from "react";
import "./App.css";

function App() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleAskAI = async () => {
        const res = await fetch("http://localhost:5000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: input }),
        });
        const data = await res.json();
        setResponse(data.message);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>SmartAid</h1>
                <p>Describe your emergency, and we'll guide you.</p>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="e.g., I'm bleeding from my arm"
                />
                <button onClick={handleAskAI}>Get Help</button>
                {response && (
                    <div className="response">
                        <h3>Recommendation:</h3>
                        <p>{response}</p>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
