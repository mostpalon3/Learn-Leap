import React, { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello, how can I help you today?' }
  ])
  const [inputText, setInputText] = useState('')

  const sendMessage = () => {
    if (!inputText.trim()) return
    // Add user message
    const newMessages = [...messages, { sender: 'user', text: inputText }]
    setMessages(newMessages)
    setInputText('')
    // Simulate bot reply after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: 'This is a simulated response.' }])
    }, 1000)
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
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* Input section */}
      <footer className="bg-white p-4 shadow-inner">
        <div className="flex">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 transition-shadow shadow"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  )
}
