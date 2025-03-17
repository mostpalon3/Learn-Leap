import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { quizQuestions } from '../constants/quiz-questions'
import { useState, useEffect, useRef } from 'react'


// Quiz interface: stores the questions, time taken for each question, options selected for each question
// and the total time taken to complete the quiz
// submit method not implemented yet


export default function Quiz() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  }

  const [questions, setQuestions] = useState([])
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  const [totalTime, setTotalTime] = useState(0)
  const [questionTime, setQuestionTime] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  // Array to store selected options for each question
  const [selectedOptions, setSelectedOptions] = useState([])
  // Array to store time for each question
  const [questionTimes, setQuestionTimes] = useState([])

  
  // Timer references
  const timerRef = useRef(null)
  const totalTimerRef = useRef(null)

  useEffect(() => {
    // Fetch questions from the API
    // hardcoding for now
    setQuestions(quizQuestions)
    setCurrentQuestion(quizQuestions[currentQuestionNumber])
    // Initialize selectedOptions array with empty values
    setSelectedOptions(new Array(quizQuestions.length).fill(''))
    // Initialize questionTimes array with empty values
    setQuestionTimes(new Array(quizQuestions.length).fill(0))

    // Start total timer
    totalTimerRef.current = setInterval(() => {
      setTotalTime(prev => prev + 1)
    }, 1000)
    
    return () => {
      clearInterval(totalTimerRef.current)
    }
  }, [])
  
  // Start/reset question timer when current question changes
  useEffect(() => {
    // Clear previous timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    // Reset question timer
    setQuestionTime(questionTimes[currentQuestionNumber] || 0)
    
    // Start new timer
    timerRef.current = setInterval(() => {
      setQuestionTime(prev => prev + 1)
    }, 1000)
    
    return () => {
      clearInterval(timerRef.current)
    }
  }, [currentQuestionNumber])

  // Handle option selection
  const handleOptionSelect = (option) => {
    // Create new array with the selected option for the current question
    const newSelectedOptions = [...selectedOptions]
    newSelectedOptions[currentQuestionNumber] = option
    setSelectedOptions(newSelectedOptions)
  }

  // function to submit quiz
  const submitQuiz = () => {
    // to be implemented
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' + secs : secs}`
  }
  
  const navigateToQuestion = (index) => {
    setCurrentQuestionNumber(index)
    setCurrentQuestion(questions[index])
  }

  if (!currentQuestion) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 flex items-center shadow-md">
        <button 
          onClick={handleBack}
          className="mr-4 p-2 rounded hover:bg-blue-600 transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-3xl font-bold flex-1 text-center">Learn Leap Quiz</div>
      </header>

      <div className="flex h-screen">
        {/* Question navigation sidebar */}
        <div className="w-1/5 bg-gray-100 p-4 border-r border-gray-300 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Questions</h2>
          <div className="grid grid-cols-3 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToQuestion(index)}
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  index === currentQuestionNumber
                    ? 'bg-blue-500 text-white'
                    : selectedOptions[index]
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <div className="mt-6">
            <div className="flex items-center mt-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-lg">Current</span>
            </div>
            <div className="flex items-center mt-2">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span className="text-lg">Answered</span>
            </div>
            <div className="flex items-center mt-2">
              <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
              <span className="text-lg">Unanswered</span>
            </div>
          </div>
        </div>

        {/* Main quiz content */}
        <div className="flex-1 overflow-auto">
          <div className='px-6 py-4'>
            {/* Timer section */}
            <div className="flex justify-between mb-6 bg-gray-100 p-3 rounded-lg shadow">
              <div className="text-lg">
                <span className="font-semibold">Question time:</span> {formatTime(questionTime)}
              </div>
              <div className="text-lg">
                <span className="font-semibold">Total time:</span> {formatTime(totalTime)}
              </div>
            </div>

            <h1 className='text-center font-bold text-3xl mb-6'>Quiz</h1>

            <div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
              <p className='text-xl font-semibold mb-4'>
                {currentQuestionNumber + 1}. {currentQuestion.question}
              </p>

              <div className='flex flex-col ml-5 mt-4'>
                {/* Display all available options */}
                {currentQuestion.options && Object.keys(currentQuestion.options).map((option) => (
                  <div key={option} className="mb-4">
                    <label className="flex items-center text-lg cursor-pointer p-3 rounded hover:bg-gray-100">
                      <input 
                        type='radio' 
                        id={option}
                        value={option} 
                        name="quizOption"
                        className="mr-3 h-5 w-5"
                        checked={selectedOptions[currentQuestionNumber] === option}
                        onChange={() => handleOptionSelect(option)}
                      />
                      <span className='ml-2'>{currentQuestion.options[option]}</span>
                    </label>
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button 
                  className="bg-gray-300 px-6 py-3 rounded text-lg font-medium hover:bg-gray-400 transition-colors"
                  disabled={currentQuestionNumber === 0}
                  onClick={() => {
                    if (currentQuestionNumber > 0) {
                      let newQuestionTimes = [...questionTimes];
                      newQuestionTimes[currentQuestionNumber] = questionTime;
                      setQuestionTimes(newQuestionTimes);
                      const newQuestionNumber = currentQuestionNumber - 1;
                      setCurrentQuestionNumber(newQuestionNumber);
                      setCurrentQuestion(questions[newQuestionNumber]);
                    }
                  }}
                >
                  Previous
                </button>
                
                <button 
                  className="bg-blue-500 text-white px-6 py-3 rounded text-lg font-medium hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    if (currentQuestionNumber < questions.length - 1) {
                      let newQuestionTimes = [...questionTimes];
                      newQuestionTimes[currentQuestionNumber] = questionTime;
                      setQuestionTimes(newQuestionTimes);
                      const newQuestionNumber = currentQuestionNumber + 1;
                      setCurrentQuestionNumber(newQuestionNumber);
                      setCurrentQuestion(questions[newQuestionNumber]);
                    } else {
                      // Show score or submit quiz
                      submitQuiz();
                      // Stop timers when quiz is finished
                      clearInterval(timerRef.current);
                      clearInterval(totalTimerRef.current);
                    }
                  }}
                >
                  {currentQuestionNumber === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}