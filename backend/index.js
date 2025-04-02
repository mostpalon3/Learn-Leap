const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI('AIzaSyCk85yKyOmZAmSZXCrk4bN6sz-vRiFZ6nU');
// const genAI = new GoogleGenerativeAI('AIzaSyDEjGf5mHgDZ2VSsbaVwOisZZ5wcvn6AVA');
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, 'uploads');
      // Create the uploads directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      // Use a unique filename to prevent overwriting
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + '-' + file.originalname);
    }
  }),
  fileFilter: (req, file, cb) => {
    // Accept only PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  }
});

// Endpoint to parse PDF
app.post('/api/parse-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const filePath = req.file.path;
    
    // Read the PDF file
    const dataBuffer = fs.readFileSync(filePath);
    
    // Parse the PDF
    const data = await pdfParse(dataBuffer);
    
    // Extract and clean the text
    const extractedText = cleanExtractedText(data.text);
    
    // Clean up: delete the file after processing
    fs.unlinkSync(filePath);
    
    // Analyze text complexity
    const complexity = analyzeContentComplexity(extractedText);
    
    // Return the extracted text and analysis
    res.json({
      text: extractedText,
      complexity,
      meta: {
        pageCount: data.numpages,
        info: data.info
      }
    });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).json({ error: 'Failed to parse PDF', details: error.message });
  }
});

// Endpoint to analyze content with Gemini AI
app.post('/api/analyze-content', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'No content provided' });
    }
    
    const analysis = await analyzeContentForQuiz(content);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing content:', error);
    res.status(500).json({ error: 'Failed to analyze content', details: error.message });
  }
});

// Endpoint to generate quiz with Gemini AI
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { content, questionCount = 5 } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'No content provided' });
    }
    
    const questions = await generateQuizFromContent(content, questionCount);
    res.json(questions);
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ error: 'Failed to generate quiz', details: error.message });
  }
});


// Function to clean extracted text
function cleanExtractedText(text) {
  return text
    // Remove non-printable characters
    .replace(/[^\x20-\x7E\n\r\t]/g, '')
    // Replace repeated whitespace with single space
    .replace(/\s+/g, ' ')
    // Replace repeated newlines with a single one
    .replace(/\n+/g, '\n')
    // Replace multiple spaces after periods
    .replace(/\.\s+/g, '. ')
    // Remove leading/trailing whitespace
    .trim();
}

// Function to analyze content complexity
function analyzeContentComplexity(text) {
  // Count words
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Estimate reading time
  const readingTimeMinutes = Math.ceil(wordCount / 225);
  
  // Analyze sentences
  const sentences = text.split(/[.!?]+\s+/).filter(s => s.length > 0);
  const avgSentenceLength = sentences.length > 0 ? wordCount / sentences.length : 0;
  
  // Calculate average word length
  const totalCharacters = words.reduce((sum, word) => sum + word.length, 0);
  const avgWordLength = words.length > 0 ? totalCharacters / words.length : 0;
  
  // Simple complexity score
  const complexityScore = (avgWordLength * 0.7) + (avgSentenceLength * 0.3);
  
  let complexityLevel = 'Basic';
  if (complexityScore > 6.5) complexityLevel = 'Advanced';
  else if (complexityScore > 5) complexityLevel = 'Intermediate';
  
  return {
    wordCount,
    sentenceCount: sentences.length,
    readingTimeMinutes,
    complexityScore: parseFloat(complexityScore.toFixed(2)),
    complexityLevel,
    avgSentenceLength: parseFloat(avgSentenceLength.toFixed(2)),
    avgWordLength: parseFloat(avgWordLength.toFixed(2))
  };
}

// Function to analyze content for quiz
async function analyzeContentForQuiz(content) {
  try {
    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Create prompt for content analysis
    const prompt = `
      Analyze the following educational content and extract:
      1. Main topic(s) covered
      2. 5-8 key concepts or important facts
      3. Key terms or vocabulary
      
      Format your response as JSON:
      {
        "mainTopics": ["Topic 1", "Topic 2"],
        "keyConcepts": ["Concept 1", "Concept 2", ...],
        "keyTerms": ["Term 1", "Term 2", ...]
      }
      
      Content to analyze:
      ${content.substring(0, 10000)} // Limit to first 10000 chars
    `;
    
    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Extract JSON content
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Failed to get structured response from AI');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Gemini AI error:', error);
    throw error;
  }
}

// Function to generate quiz from content
async function generateQuizFromContent(content, questionCount = 5) {
  try {
    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Prepare content - limit length and extract key information
    let limitedContent = content;
    if (content.length > 15000) {
      limitedContent = content.substring(0, 15000) + '...';
    }
    
    // Create a prompt for quiz generation
    const prompt = `
      As an AI specializing in educational quiz creation, your task is to generate a quiz based on the provided content.
      
      First, analyze the content to identify key concepts, facts, and important information.
      Then, create exactly ${questionCount} multiple-choice questions that directly test understanding of the material.
      
      Rules for creating questions:
      1. Questions must be DIRECTLY based on the provided content only
      2. Do not introduce facts or information not present in the content
      3. Make questions clear, concise, and focused on testing understanding
      4. Create challenging but fair questions at an appropriate difficulty level
      5. Include a mix of factual recall and conceptual understanding questions
      
      For each question:
      - Make sure all 4 answer options are plausible
      - Ensure only one option is clearly correct
      - Provide a brief explanation that references the specific part of the content 
      
      Format your response as a valid JSON array with this exact structure:
      [
        {
          "id": 1,
          "question": "Question text directly from the content?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "The correct option",
          "explanation": "Brief explanation referencing the content"
        },
        ...more questions
      ]
      
      Here's the content to base the quiz on:
      ${limitedContent}
    `;
    
    // Generate response from Gemini AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Extract JSON content from the response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      throw new Error('Failed to get structured quiz from AI');
    }
    
    const jsonString = jsonMatch[0];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error generating quiz with Gemini AI:', error);
    throw error;
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});