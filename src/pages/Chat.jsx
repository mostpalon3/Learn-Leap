import React, { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello, how can I help you today?' }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pdfFile, setPdfFile] = useState(null)
  const fileInputRef = useRef(null)

  const sendMessage = async () => {
    if (!inputText.trim()) return
    
    // Add user message
    const newMessages = [...messages, { 
      sender: 'user', 
      text: inputText,
      hasPdf: !!pdfFile,
      filename: pdfFile?.name
    }]
    setMessages(newMessages)
    
    // Save user input before clearing
    const userQuestion = inputText
    setInputText('')
    
    // Show loading state
    setIsLoading(true)
    
    try {
      let response;
      
      // Handle PDF upload case
      if (pdfFile) {
        const formData = new FormData()
        formData.append('pdfFile', pdfFile)
        formData.append('prompt', userQuestion)
        
        response = await fetch('http://localhost:3000/askpdf', {
          method: 'POST',
          body: formData,
        })
        
        // Reset PDF file after sending
        setPdfFile(null)
      } else {
        // Regular text query
        response = await fetch('http://localhost:3000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: userQuestion }),
        })
      }
      
      if (!response.ok) {
        throw new Error('Failed to get response')
      }
      
      const data = await response.json()
      
      // Add bot response
      setMessages(prev => [...prev, { sender: 'bot', text: data.answer }])
    } catch (error) {
      console.error('Error fetching response:', error)
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Sorry, I encountered an error. Please try again later.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle PDF file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
    } else if (file) {
      alert('Please upload a PDF file')
      e.target.value = null
    }
  }

  // Trigger file input click
  const handlePdfButtonClick = () => {
    fileInputRef.current.click()
  }

  // Remove selected PDF
  const removePdf = () => {
    setPdfFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 text-center text-3xl font-bold shadow-md">
        Learn Leap Chat
      </header>
      
      {/* Message display area */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-4 rounded-lg shadow 
              ${msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
              {msg.sender === 'bot' ? (
                <div className="markdown-content">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    components={{
                      a: ({node, ...props}) => <a {...props} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" />,
                      p: ({node, ...props}) => <p {...props} className="mb-2" />,
                      h1: ({node, ...props}) => <h1 {...props} className="text-xl font-bold my-2" />,
                      h2: ({node, ...props}) => <h2 {...props} className="text-lg font-bold my-2" />,
                      h3: ({node, ...props}) => <h3 {...props} className="text-md font-bold my-2" />,
                      ul: ({node, ...props}) => <ul {...props} className="list-disc ml-6 mb-2" />,
                      ol: ({node, ...props}) => <ol {...props} className="list-decimal ml-6 mb-2" />,
                      li: ({node, ...props}) => <li {...props} className="mb-1" />,
                      code: ({node, inline, ...props}) => 
                        inline 
                          ? <code {...props} className="bg-gray-100 px-1 rounded text-sm" />
                          : <code {...props} className="block bg-gray-100 p-2 rounded text-sm my-2 overflow-x-auto" />,
                      pre: ({node, ...props}) => <pre {...props} className="bg-gray-100 p-2 rounded my-2 overflow-x-auto" />,
                      blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-gray-300 pl-4 italic my-2" />,
                      strong: ({node, ...props}) => <strong {...props} className="font-bold" />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <div>
                  {msg.text}
                  {msg.hasPdf && (
                    <div className="mt-2 pt-2 border-t border-blue-400 text-blue-100 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      PDF: {msg.filename}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-md p-4 rounded-lg shadow bg-gray-200 text-gray-800 rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* PDF file indicator */}
      {pdfFile && (
        <div className="bg-blue-100 text-blue-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{pdfFile.name}</span>
            <span className="ml-2 text-sm text-blue-600">({Math.round(pdfFile.size / 1024)} KB)</span>
          </div>
          <button 
            onClick={removePdf} 
            className="text-blue-700 hover:text-blue-900"
            aria-label="Remove PDF"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Input section */}
      <footer className="bg-white p-4 shadow-inner">
        <div className="flex items-center">
          {/* PDF Upload button */}
          <button
            onClick={handlePdfButtonClick}
            disabled={isLoading}
            className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-l-lg border border-gray-300 border-r-0"
            title="Upload PDF"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
            </svg>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </button>
          
          {/* Message input */}
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder={pdfFile ? "Ask about the PDF..." : "Type your message..."}
            className="flex-1 border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-400"
          />
          
          {/* Send button */}
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputText.trim()}
            className={`${
              isLoading || !inputText.trim() 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-6 py-3 rounded-r-lg transition-colors`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </footer>
    </div>
  )
}