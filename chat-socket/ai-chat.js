const express = require('express')
const dotenv = require('dotenv')
const {GoogleGenerativeAI} = require('@google/generative-ai')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const cors = require('cors');
app.use(cors({
  origin: '*'
}));
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  

app.use(express.json());

app.post("/ask", async (req, res) => {
    const { question } = req.body;
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
      });
    if (!question) {
        return res.status(400).json({ error: "Question is required." });
    }

    try {
        const result = await chatSession.sendMessage(question)

        res.json({ answer: result.response.text()});
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: "Failed to fetch response from Gemini API." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
