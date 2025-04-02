import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Clock, 
  CheckCircle, 
  FileText, 
  Loader2, 
  ChevronRight, 
  RotateCcw, 
  Bot, 
  XCircle, 
  ArrowRight, 
  Brain,
  BookOpen,
  Trophy,
  Timer,
  Eye,
  BarChart,
  FileType
} from 'lucide-react';
import { extractTextFromPDF, cleanExtractedText } from '../utils/pdfUtils';
import { generateQuizFromContent, analyzeContentForQuiz } from '../services/geminiService';

const PdfQuizGenerator = () => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [contentAnalysis, setContentAnalysis] = useState(null);
  const [contentComplexity, setContentComplexity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pdfMeta, setPdfMeta] = useState(null);
  const timerRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setIsLoading(true);
      setLoadingMessage('Processing PDF...');
      setError(null);
      
      try {
        // Use the backend service to extract text and analyze complexity
        const result = await extractTextFromPDF(selectedFile);
        const cleanedText = cleanExtractedText(result.text);
        setFileContent(cleanedText);
        
        // Set complexity from backend analysis
        setContentComplexity(result.complexity);
        
        // Store PDF metadata
        setPdfMeta(result.meta);
        
        // Analyze content to get key concepts
        setLoadingMessage('Analyzing content with AI...');
        const analysis = await analyzeContentForQuiz(cleanedText);
        setContentAnalysis(analysis);
      } catch (err) {
        setError(`Error processing PDF: ${err.message}`);
        console.error('PDF processing error:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please upload a PDF file');
    }
  };

  // Generate quiz using Gemini AI
  const generateQuiz = async () => {
    setIsLoading(true);
    setLoadingMessage('Generating questions with AI...');
    setError(null);
    
    try {
      // Generate questions based on content complexity
      const questionCount = contentComplexity?.complexityLevel === 'Basic' ? 5 : 
                           contentComplexity?.complexityLevel === 'Intermediate' ? 7 : 10;
      
      const generatedQuestions = await generateQuizFromContent(fileContent, questionCount);
      setQuestions(generatedQuestions);
    } catch (err) {
      setError(`Failed to generate quiz: ${err.message}`);
      console.error('Quiz generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setScore(0);
    setElapsedTime(0);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed
      clearInterval(timerRef.current);
      setQuizCompleted(true);
      
      // Calculate score
      let correctCount = 0;
      questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      });
      
      setScore(correctCount);
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle file browser button click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Reset the entire process
  const resetProcess = () => {
    setFile(null);
    setFileContent('');
    setContentAnalysis(null);
    setContentComplexity(null);
    setQuestions([]);
    setQuizStarted(false);
    setQuizCompleted(false);
    setError(null);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  
  // Calculate progress percentage
  const progressPercentage = quizStarted && !quizCompleted 
    ? ((currentQuestionIndex + 1) / questions.length) * 100 
    : 0;

  // Create a preview of the content (limit length)
  const contentPreview = fileContent.length > 500 
    ? fileContent.substring(0, 500) + '...' 
    : fileContent;

  return (
    <div className="flex relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen max-h-full items-center py-8 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-[#28595a] p-6 text-white">
            <div className="flex items-center justify-center">
              <Brain size={28} className="text-[#dbf0dd] mr-3" />
              <h1 className="text-2xl font-bold">PDF to Quiz Generator</h1>
            </div>
            <p className="text-center text-[#dbf0dd] mt-2">
              Upload any PDF document and our AI will generate a custom quiz to test your knowledge
            </p>
          </div>
          
          {/* Content */}
          <div className="p-8">
            {!quizStarted ? (
              <div className="space-y-6">
                {!file ? (
                  <div className="border-2 border-dashed border-[#dbf0dd] rounded-xl p-10 text-center flex flex-col items-center justify-center bg-[#f6fbf6]">
                    <FileText className="h-16 w-16 text-[#28595a] mb-4" />
                    <h3 className="text-lg font-semibold text-[#28595a] mb-2">Upload Your Study Material</h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      Drag and drop your PDF or click to browse. Our AI will analyze the content and create customized quiz questions.
                    </p>
                    
                    <button 
                      onClick={handleBrowseClick}
                      className="px-5 py-3 bg-[#ff8400] text-white rounded-lg hover:bg-[#e67700] transition-colors font-medium flex items-center shadow-sm"
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Browse Files
                    </button>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept=".pdf" 
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    
                    <p className="mt-4 text-xs text-gray-500">
                      Supported format: PDF (Max size: 10MB)
                    </p>
                    
                    {error && (
                      <div className="mt-4 text-red-500 bg-red-50 px-4 py-2 rounded-md">
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 mr-2" />
                          {error}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center p-4 bg-[#f6fbf6] rounded-lg border border-[#dbf0dd]">
                      <div className="w-10 h-10 bg-[#dbf0dd] rounded-lg flex items-center justify-center text-[#28595a] mr-4">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                      <button 
                        onClick={resetProcess}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {contentComplexity && (
                      <div className="p-4 bg-white rounded-lg border border-[#dbf0dd]">
                        <h3 className="font-semibold text-[#28595a] mb-2 flex items-center">
                          <BarChart className="h-4 w-4 mr-2" />
                          Content Analysis
                        </h3>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-[#f6fbf6] p-3 rounded-lg">
                            <p className="text-xs text-gray-500">Complexity Level</p>
                            <p className="text-lg font-medium text-[#28595a]">
                              {contentComplexity.complexityLevel}
                            </p>
                          </div>
                          <div className="bg-[#f6fbf6] p-3 rounded-lg">
                            <p className="text-xs text-gray-500">Reading Time</p>
                            <p className="text-lg font-medium text-[#28595a]">
                              {contentComplexity.readingTimeMinutes} min
                            </p>
                          </div>
                          <div className="bg-[#f6fbf6] p-3 rounded-lg">
                            <p className="text-xs text-gray-500">Word Count</p>
                            <p className="text-lg font-medium text-[#28595a]">
                              {contentComplexity.wordCount.toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-[#f6fbf6] p-3 rounded-lg">
                            <p className="text-xs text-gray-500">Average Sentence Length</p>
                            <p className="text-lg font-medium text-[#28595a]">
                              {contentComplexity.avgSentenceLength} words
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {fileContent && (
                      <div className="p-4 bg-white rounded-lg border border-[#dbf0dd]">
                        <h3 className="font-semibold text-[#28595a] mb-2 flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Content Preview
                        </h3>
                        <div className="bg-[#f6fbf6] p-3 rounded text-gray-700 text-sm font-mono whitespace-pre-line max-h-40 overflow-y-auto">
                          {contentPreview}
                        </div>
                      </div>
                    )}
                    
                    {contentAnalysis && (
                      <div className="p-4 bg-white rounded-lg border border-[#dbf0dd]">
                        <h3 className="font-semibold text-[#28595a] mb-2 flex items-center">
                          <Brain className="h-4 w-4 mr-2" />
                          Content Topics
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-[#28595a]">Main Topics:</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {contentAnalysis.mainTopics?.map((topic, index) => (
                                <span key={index} className="bg-[#dbf0dd] text-[#28595a] text-xs px-2 py-1 rounded-full">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-[#28595a]">Key Concepts:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                              {contentAnalysis.keyConcepts?.map((concept, index) => (
                                <li key={index}>{concept}</li>
                              ))}
                            </ul>
                          </div>
                          
                          {contentAnalysis.keyTerms && contentAnalysis.keyTerms.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-[#28595a]">Key Terms:</h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {contentAnalysis.keyTerms.map((term, index) => (
                                  <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                                    {term}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {fileContent && !questions.length && (
                      <div className="flex justify-center">
                        <button 
                          onClick={generateQuiz} 
                          disabled={isLoading}
                          className="px-6 py-3 bg-[#28595a] hover:bg-[#1e4445] text-white font-medium rounded-lg disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center shadow-sm"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Generating Quiz...
                            </>
                          ) : (
                            <>
                              <Bot className="mr-2 h-5 w-5" />
                              Generate Quiz with AI
                            </>
                          )}
                        </button>
                      </div>
                    )}
                    
                    {error && (
                      <div className="text-red-500 bg-red-50 px-4 py-2 rounded-md">
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 mr-2" />
                          {error}
                        </div>
                      </div>
                    )}
                    
                    {questions.length > 0 && (
                      <div className="mt-6 bg-[#dbf0dd] p-6 rounded-lg border border-[#dbf0dd]">
                        <div className="flex items-center mb-3">
                          <CheckCircle className="h-6 w-6 text-[#28595a] mr-3" />
                          <h3 className="text-lg font-semibold text-[#28595a]">Quiz Ready!</h3>
                        </div>
                        
                        <p className="mb-2 text-gray-700">
                          Your AI-generated quiz contains {questions.length} questions based on the "{contentAnalysis?.mainTopics?.[0] || 'uploaded content'}".
                        </p>
                        
                        <div className="mb-4 bg-white rounded-lg p-3 border border-[#28595a] text-sm">
                          <p className="text-[#28595a] font-medium">Difficulty: {contentComplexity?.complexityLevel || 'Intermediate'}</p>
                          <p className="text-gray-600">Estimated completion time: {Math.ceil(questions.length * 1.5)} minutes</p>
                        </div>
                        
                        <button 
                          onClick={startQuiz}
                          className="w-full py-3 px-4 bg-[#ff8400] hover:bg-[#e67700] text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-sm"
                        >
                          Start Quiz Now
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : !quizCompleted ? (
              <div className="space-y-6">
                {/* Progress bar and timer */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-[#28595a] font-medium">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>
                  <div className="flex items-center text-[#28595a] font-medium">
                    <Timer className="h-5 w-5 mr-2" />
                    {formatTime(elapsedTime)}
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
                  <div 
                    className="h-full bg-[#ff8400] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                {/* Question card */}
                <div className="p-6 bg-white rounded-xl border border-[#dbf0dd] shadow-sm">
                  <h3 className="text-lg font-medium mb-6 text-[#28595a]">{currentQuestion.question}</h3>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div 
                        key={index}
                        onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                          selectedAnswers[currentQuestion.id] === option 
                            ? 'bg-[#28595a] text-white shadow-md' 
                            : 'bg-[#f6fbf6] hover:bg-[#dbf0dd] text-gray-700 border border-[#dbf0dd]'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm ${
                            selectedAnswers[currentQuestion.id] === option
                              ? 'bg-white text-[#28595a]'
                              : 'bg-white border border-[#28595a] text-[#28595a]'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="flex-1">{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(prev => prev - 1)}
                    disabled={currentQuestionIndex === 0}
                    className="py-2 px-4 border border-[#28595a] text-[#28595a] rounded-lg hover:bg-[#f6fbf6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswers[currentQuestion.id]}
                    className="py-2 px-4 bg-[#ff8400] hover:bg-[#e67700] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {currentQuestionIndex < questions.length - 1 ? (
                      <>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Finish Quiz
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Results header */}
                <div className="text-center">
                  <div className="mx-auto w-20 h-20 bg-[#dbf0dd] rounded-full flex items-center justify-center mb-4">
                    <Trophy className="h-10 w-10 text-[#28595a]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#28595a]">Quiz Completed!</h3>
                  <p className="text-gray-600">
                    Great job completing the quiz on {contentAnalysis?.mainTopics?.[0] || 'the uploaded content'}
                  </p>
                </div>
                
                {/* Score card */}
                <div className="bg-[#f6fbf6] rounded-xl p-6 border border-[#dbf0dd] text-center shadow-sm">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center">
                      <div className="relative">
                        <svg className="w-32 h-32" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#dbf0dd"
                            strokeWidth="3"
                            strokeDasharray="100, 100"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#28595a"
                            strokeWidth="3"
                            strokeDasharray={`${(score / questions.length) * 100}, 100`}
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <div className="text-3xl font-bold text-[#28595a]">{score}/{questions.length}</div>
                          <div className="text-sm text-gray-500">Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white p-3 rounded-lg border border-[#dbf0dd]">
                      <p className="text-sm text-gray-500">Time Taken</p>
                      <p className="text-xl font-bold text-[#28595a]">{formatTime(elapsedTime)}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-[#dbf0dd]">
                      <p className="text-sm text-gray-500">Accuracy</p>
                      <p className="text-xl font-bold text-[#28595a]">
                        {Math.round((score / questions.length) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Review section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-[#28595a] flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-[#ff8400]" />
                    Review Answers
                  </h4>
                  
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div 
                        key={index} 
                        className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${
                          selectedAnswers[question.id] === question.correctAnswer
                            ? 'border-l-green-500'
                            : 'border-l-red-500'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 text-sm font-medium ${
                            selectedAnswers[question.id] === question.correctAnswer
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 mb-3">{question.question}</p>
                            
                            <div className="space-y-2 mb-4">
                              {question.options.map((option, optIndex) => (
                                <div 
                                  key={optIndex}
                                  className={`p-2 rounded-lg text-sm ${
                                    option === question.correctAnswer
                                      ? 'bg-green-100 text-green-800 border border-green-200'
                                      : option === selectedAnswers[question.id] && option !== question.correctAnswer
                                        ? 'bg-red-100 text-red-800 border border-red-200'
                                        : 'bg-gray-50 text-gray-700 border border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs ${
                                      option === question.correctAnswer
                                        ? 'bg-green-500 text-white'
                                        : option === selectedAnswers[question.id] && option !== question.correctAnswer
                                          ? 'bg-red-500 text-white'
                                          : 'bg-gray-200 text-gray-600'
                                    }`}>
                                      {String.fromCharCode(65 + optIndex)}
                                    </div>
                                    <span>{option}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="bg-[#f6fbf6] p-3 rounded-lg border border-[#dbf0dd] text-sm">
                              <p className="font-medium text-[#28595a] mb-1">Explanation:</p>
                              <p className="text-gray-700">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetProcess}
                    className="py-3 px-6 bg-[#28595a] hover:bg-[#1e4445] text-white font-medium rounded-lg transition-colors flex items-center"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Create New Quiz
                  </button>
                  
                  <button
                    onClick={startQuiz}
                    className="py-3 px-6 bg-[#ff8400] hover:bg-[#e67700] text-white font-medium rounded-lg transition-colors flex items-center"
                  >
                    <Trophy className="mr-2 h-5 w-5" />
                    Retry Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="border-t border-[#dbf0dd] p-4 bg-white">
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#28595a] border-t-transparent"></div>
                <span className="text-[#28595a]">{loadingMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfQuizGenerator;