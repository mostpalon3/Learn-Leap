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
    let input = inputText.toLowerCase()
    var output;
    switch (input) {
      case 'explain me gravity':
        output = `hii , i am issac newton, my dear friend! You see, I was sitting under an apple tree, pondering the mysteries of the universe, when—plop!—an apple fell upon my head. And in that very moment of inspiration, I asked myself: Why did the apple fall straight down? Why not sideways or upwards?

This led me to a grand realization: there is a force that pulls objects toward the Earth! But not just apples—this force governs the motion of the moon, the planets, and even the tides! I called it gravity.`
        break
      case 'what is gravity?':
        output = `
        Gravity is a natural force that attracts two objects with mass toward each other. The greater the mass, the stronger the attraction. The closer the objects, the stronger the force.`
        break
    }
    setInputText('')
    // Simulate bot reply after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: output }])
    }, 2000)
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
