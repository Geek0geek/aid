const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

// Mock NLP function (replace with OpenAI API for real AI)
const analyzeSymptoms = async (query) => {
    // Simulate a simple rule-based response
    if (query.toLowerCase().includes("bleeding")) {
        return "Apply firm pressure to the wound and keep the area elevated.";
    } else if (query.toLowerCase().includes("unconscious")) {
        return "Check for breathing, call emergency services, and start CPR if necessary.";
    }
    return "I'm not sure. Please provide more details.";
};

// Route to analyze symptoms
app.post("/analyze", async (req, res) => {
    const { query } = req.body;
    const response = await analyzeSymptoms(query);
    res.json({ message: response });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
