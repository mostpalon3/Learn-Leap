const express = require('express')
const dotenv = require('dotenv')
const {GoogleGenerativeAI} = require('@google/generative-ai')
const fs = require('fs')
const pdf = require('pdf-parse')
const multer = require('multer')
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

app.post("/askpdf", async (req, res) => {
    // save formdata pdf file to server using multer and get prompt fromreq body
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    const uploadPdf = upload.single('pdfFile');
    uploadPdf(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to upload PDF file." });
        }

        const pdfBuffer = req.file.buffer;
        try {
            const data = await pdf(pdfBuffer);
            const chatSession = model.startChat({
                generationConfig,
                history: [
                ],
              });
            const result = await chatSession.sendMessage(data.text + req.body.prompt);
            res.json({ answer: result.response.text()});
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            res.status(500).json({ error: "Failed to fetch response from Gemini API." });
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// this is how to read pdf
// let dataBuffer = fs.readFileSync('./samplepdf/pdf.pdf');
 
// pdf(dataBuffer).then(function(data) {
//     console.log(data.text); 
        
// });