import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, PaperclipIcon, X, Bot, User, Loader2, FileText } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m your Learn Leap assistant. How can I help you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const url = "https://learn-leap-2.onrender.com";

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { 
      sender: 'user', 
      text: inputText,
      hasPdf: !!pdfFile,
      filename: pdfFile?.name
    }];
    setMessages(newMessages);
    
    // Save user input before clearing
    const userQuestion = inputText;
    setInputText('');
    
    // Show loading state
    setIsLoading(true);
    
    try {
      let response;
      
      // Handle PDF upload case
      if (pdfFile) {
        const formData = new FormData();
        formData.append('pdfFile', pdfFile);
        formData.append('prompt', userQuestion);
        
        response = await fetch(`${url}/askpdf`, {
          method: 'POST',
          body: formData,
        });
        
        // Reset PDF file after sending
        setPdfFile(null);
      } else {
        // Regular text query
        response = await fetch(`${url}/ask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: userQuestion }),
        });
      }
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, { sender: 'bot', text: data.answer }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle PDF file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else if (file) {
      alert('Please upload a PDF file');
      e.target.value = null;
    }
  };

  // Trigger file input click
  const handlePdfButtonClick = () => {
    fileInputRef.current.click();
  };

  // Remove selected PDF
  const removePdf = () => {
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative left-[15%] w-full h-screen bg-[#f6fbf6] flex flex-col scroll-smooth">
      {/* Header */}
      <header className="bg-[#28595a] text-white px-8 py-6 shadow-md z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <Bot size={28} className="mr-3 text-[#dbf0dd]" />
            Learn Leap AI Assistant
          </h1>
          <p className="text-[#dbf0dd] mt-1">
            Ask questions about your courses or upload PDFs for assistance
          </p>
        </div>
      </header>
      
      {/* Message display area */}
      <div className="flex-1 overflow-auto px-4 sm:px-8 py-6 max-w-6xl mx-auto w-full">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] md:max-w-[70%]`}>
                {/* Avatar */}
                <div className={`hidden sm:flex h-10 w-10 rounded-full items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user' ? 'bg-[#ff8400] ml-3' : 'bg-[#28595a] mr-3'
                }`}>
                  {msg.sender === 'user' ? (
                    <User size={18} className="text-white" />
                  ) : (
                    <Bot size={18} className="text-white" />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div className={`py-3 px-4 rounded-2xl shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#ff8400] text-white rounded-tr-none'
                    : 'bg-white text-gray-800 rounded-tl-none border border-[#dbf0dd]'
                }`}>
                  {msg.sender === 'bot' ? (
                    <div className="markdown-content">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        components={{
                          a: ({node, ...props}) => <a {...props} className="text-[#28595a] font-medium hover:underline" target="_blank" rel="noopener noreferrer" />,
                          p: ({node, ...props}) => <p {...props} className="mb-3 last:mb-0" />,
                          h1: ({node, ...props}) => <h1 {...props} className="text-xl font-bold my-3 text-[#28595a]" />,
                          h2: ({node, ...props}) => <h2 {...props} className="text-lg font-bold my-2 text-[#28595a]" />,
                          h3: ({node, ...props}) => <h3 {...props} className="text-md font-bold my-2 text-[#28595a]" />,
                          ul: ({node, ...props}) => <ul {...props} className="list-disc ml-6 mb-3" />,
                          ol: ({node, ...props}) => <ol {...props} className="list-decimal ml-6 mb-3" />,
                          li: ({node, ...props}) => <li {...props} className="mb-1" />,
                          code: ({node, inline, ...props}) => 
                            inline 
                              ? <code {...props} className="bg-[#dbf0dd] px-1 rounded text-[#28595a] font-mono text-sm" />
                              : <code {...props} className="block bg-[#dbf0dd] p-3 rounded-lg text-[#28595a] font-mono text-sm my-3 overflow-x-auto" />,
                          pre: ({node, ...props}) => <pre {...props} className="bg-[#dbf0dd] p-3 rounded-lg my-3 overflow-x-auto" />,
                          blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-[#28595a] bg-[#dbf0dd]/20 pl-4 py-2 my-3 rounded-r-md" />,
                          strong: ({node, ...props}) => <strong {...props} className="font-bold text-[#28595a]" />,
                          table: ({node, ...props}) => <div className="overflow-x-auto my-3"><table {...props} className="min-w-full divide-y divide-gray-200 border border-[#dbf0dd] rounded-lg" /></div>,
                          thead: ({node, ...props}) => <thead {...props} className="bg-[#dbf0dd]" />,
                          th: ({node, ...props}) => <th {...props} className="px-4 py-2 text-left text-sm font-medium text-[#28595a]" />,
                          td: ({node, ...props}) => <td {...props} className="px-4 py-2 text-sm border-t border-[#dbf0dd]" />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div>
                      {msg.text}
                      {msg.hasPdf && (
                        <div className="mt-2 pt-2 border-t border-[#ff8400]/30 text-white/90 text-sm flex items-center">
                          <FileText size={14} className="mr-1.5" />
                          PDF: {msg.filename}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] md:max-w-[70%]">
                <div className="hidden sm:flex h-10 w-10 rounded-full items-center justify-center bg-[#28595a] mr-3">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="py-4 px-5 rounded-2xl rounded-tl-none bg-white border border-[#dbf0dd] shadow-sm">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-[#28595a] animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-[#28595a] animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-[#28595a] animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible element for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* PDF file indicator */}
      {pdfFile && (
        <div className="bg-[#dbf0dd] px-4 py-3 flex items-center justify-between max-w-6xl mx-auto w-full border-t border-[#b8e4bd]">
          <div className="flex items-center">
            <FileText size={18} className="text-[#28595a] mr-2" />
            <span className="font-medium text-[#28595a]">{pdfFile.name}</span>
            <span className="ml-2 text-sm text-[#28595a]/70">({Math.round(pdfFile.size / 1024)} KB)</span>
          </div>
          <button 
            onClick={removePdf} 
            className="text-[#28595a] hover:text-[#ff8400] transition-colors"
            aria-label="Remove PDF"
          >
            <X size={18} />
          </button>
        </div>
      )}
      
      {/* Input section */}
      <footer className="bg-white border-t border-[#dbf0dd] py-4 px-4 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center">
            {/* PDF Upload button */}
            <button
              onClick={handlePdfButtonClick}
              disabled={isLoading}
              className="bg-[#dbf0dd] hover:bg-[#c7e6c9] text-[#28595a] p-3 rounded-l-lg transition-colors"
              title="Upload PDF"
            >
              <FileText size={20} />
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
              placeholder={pdfFile ? "Ask about this PDF..." : "Type your message..."}
              className="flex-1 border-y border-[#dbf0dd] p-3 outline-none focus:ring-2 focus:ring-[#28595a] transition-all"
            />
            
            {/* Send button */}
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputText.trim()}
              className={`${
                isLoading || !inputText.trim() 
                  ? 'bg-[#ff8400]/50 cursor-not-allowed' 
                  : 'bg-[#ff8400] hover:bg-[#e67700]'
              } text-white p-3 rounded-r-lg transition-colors`}
              title="Send message"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Ask any questions about your courses or upload a PDF for context-specific help
          </p>
        </div>
      </footer>
    </div>
  );
}