import React, { useState, useEffect, useRef } from 'react';
import { Upload, Clock, CheckCircle } from 'lucide-react';

const PdfQuizGenerator = () => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      // In a real app, we would extract text from PDF here
      simulatePdfExtraction(selectedFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  // Simulate PDF text extraction (in a real app, you'd use a library like pdf.js)
  const simulatePdfExtraction = (pdfFile) => {
    setIsLoading(true);
    // In a real application, this would extract text from the PDF
    // For this demo, we'll simulate with the sample content
    setTimeout(() => {
      setFileContent(`
        OPERATING SYSTEM CONTENT:
        • Process states and life cycle: new, ready, running, waiting, terminated
        • Kernel vs User level threads
        • Process vs Threads comparison
        • Multithreading models
        • CPU scheduling concepts, metrics, methods
      `);
      setIsLoading(false);
    }, 1500);
  };

  // Simulate Gemini Flash 2.0 quiz generation
  const generateQuiz = () => {
    setIsLoading(true);
    
    // Simulate API call to Gemini Flash 2.0
    setTimeout(() => {
      const generatedQuestions = [
        {
          id: 1,
          question: "Which of the following is NOT a process state in the process life cycle model?",
          options: ["New", "Ready", "Running", "Blocked", "Waiting"],
          correctAnswer: "Blocked",
          explanation: "The process states mentioned are: new, ready, running, waiting, and terminated. 'Blocked' was not mentioned as a state."
        },
        {
          id: 2,
          question: "What is a thread in an operating system?",
          options: [
            "The process of switching between multiple programs",
            "The smallest unit of processing that can be performed in an OS",
            "A standalone application running in memory",
            "A part of memory allocated to a process"
          ],
          correctAnswer: "The smallest unit of processing that can be performed in an OS",
          explanation: "A thread is defined as the smallest unit of processing that can be performed in an OS."
        },
        {
          id: 3,
          question: "Which multithreading model maps many user-level threads to one kernel thread?",
          options: [
            "One-to-one model",
            "Many-to-one model",
            "Many-to-many model",
            "One-to-many model"
          ],
          correctAnswer: "Many-to-one model",
          explanation: "The many-to-one model maps many user levels threads to one kernel thread."
        },
        {
          id: 4,
          question: "What is the main difference between a process and a thread?",
          options: [
            "Processes are heavyweight, threads are lightweight",
            "Processes can share data, threads cannot",
            "Processes are faster to create than threads",
            "Processes require less time for context switching"
          ],
          correctAnswer: "Processes are heavyweight, threads are lightweight",
          explanation: "Processes are heavyweight while threads are lightweight."
        },
        {
          id: 5,
          question: "Under which circumstances is CPU scheduling non-preemptive?",
          options: [
            "When a process switches from running to waiting state",
            "When a process terminates",
            "When a process switches from running to ready state",
            "Both A and B",
            "Both A and C"
          ],
          correctAnswer: "Both A and B",
          explanation: "Scheduling is non-preemptive when a process switches from running to waiting or when a process terminates."
        }
      ];
      
      setQuestions(generatedQuestions);
      setIsLoading(false);
    }, 2000);
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

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-[85dvw] flex relative left-[7.5%] items-center h-screen max-w-4xl mx-auto p-4">
      <div className="w-full shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-blue-50 p-6">
          <h1 className="text-2xl text-center text-blue-800 font-bold">PDF to Quiz Generator</h1>
          <p className="text-center text-gray-600 mt-2">
            Upload a PDF to generate an interactive quiz with AI
          </p>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {!quizStarted ? (
            <div className="space-y-6">
              {!file ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Upload a PDF file to generate a quiz</p>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileUpload}
                    className="mt-4 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">PDF successfully uploaded</p>
                    </div>
                  </div>
                  
                  {fileContent && !questions.length && (
                    <div className="mt-4">
                      <button 
                        onClick={generateQuiz} 
                        disabled={isLoading}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Generating Quiz...' : 'Generate Quiz with AI'}
                      </button>
                    </div>
                  )}
                  
                  {questions.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-gray-700">Quiz ready! {questions.length} questions generated.</p>
                      <button 
                        onClick={startQuiz}
                        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
                      >
                        Start Quiz
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : !quizCompleted ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(elapsedTime)}</span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedAnswers[currentQuestion.id] === option 
                          ? 'bg-blue-100 border-blue-300' 
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswers[currentQuestion.id]}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold">Quiz Completed!</h3>
              
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {score} / {questions.length}
                </div>
                <p className="text-gray-600">
                  You answered {score} out of {questions.length} questions correctly
                </p>
                <p className="mt-2 text-gray-600">
                  Time taken: {formatTime(elapsedTime)}
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-left">Review Answers:</h4>
                {questions.map((question, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border text-left">
                    <p className="font-medium">{index + 1}. {question.question}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-gray-600 mr-2">Your answer:</span>
                      <span className={`font-medium ${
                        selectedAnswers[question.id] === question.correctAnswer
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {selectedAnswers[question.id] || 'Not answered'}
                      </span>
                    </div>
                    {selectedAnswers[question.id] !== question.correctAnswer && (
                      <div className="mt-1 text-green-600">
                        <span className="font-medium">Correct answer: </span>
                        {question.correctAnswer}
                      </div>
                    )}
                    <div className="mt-2 text-gray-700 text-sm">
                      <span className="font-medium">Explanation: </span>
                      {question.explanation}
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => {
                  setFile(null);
                  setFileContent('');
                  setQuestions([]);
                  setQuizStarted(false);
                  setQuizCompleted(false);
                }}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              >
                Create New Quiz
              </button>
            </div>
          )}
        </div>
        
        {isLoading && (
          <div className="border-t p-4">
            <div className="w-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">
                {!file ? 'Processing PDF...' : !questions.length ? 'Generating quiz with AI...' : 'Loading...'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfQuizGenerator;