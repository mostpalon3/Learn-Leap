import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello, how can I help you today?' }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!inputText.trim()) return
    
    // Add user message
    const newMessages = [...messages, { sender: 'user', text: inputText }]
    setMessages(newMessages)
    
    // Clear input field
    const userQuestion = inputText
    setInputText('')
    
    // Show loading state
    setIsLoading(true)
    
    try {
      // Call backend API
      const response = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userQuestion }),
      })
      
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

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
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
                msg.text
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
      
      {/* Input section */}
      <footer className="bg-white p-4 shadow-inner">
        <div className="flex">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className={`${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 rounded-r-lg transition-shadow shadow`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </footer>
    </div>
  )
}
