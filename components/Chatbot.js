'use client'
import React, { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    const userMessage = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    
    // Call ChatGPT API here
    const response = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? 'Close' : 'Chat'}
      </button>
      
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg p-4 w-64 h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 w-full rounded-lg"
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-lg mt-2">
            Send
          </button>
        </div>
      )}
    </div>
  );
}
