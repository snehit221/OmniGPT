import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import { getGeminiResponse } from '../util/gptUtil';
import { getLlamaResponse } from '../util/getLlamaResponse';

const ChatComponent = () => {
  const [userMessage, setUserMessage] = useState('');
  const [geminiMessages, setGeminiMessages] = useState([]);
  const [llamaMessages, setLlamaMessages] = useState([]);

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      const newGeminiMessages = [...geminiMessages, { text: userMessage, isUser: true }];
      setGeminiMessages(newGeminiMessages);
      const newLlamaMessages = [...llamaMessages, { text: userMessage, isUser: true }];
      setLlamaMessages(newLlamaMessages);
      setUserMessage('');
      setTimeout(async () => {
        const geminiResponse = await getGeminiResponse(userMessage);
        const llamaResponse = await getLlamaResponse(userMessage);
        setLlamaMessages(prevMessages => [...prevMessages, { text: llamaResponse, isUser: false }]);
        setGeminiMessages(prevMessages => [...prevMessages, { text: geminiResponse, isUser: false }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col mt-20 p-10 items-center min-h-screen">
      <div className="flex flex-row w-full max-w-6xl space-x-6 mb-4">
        <ChatWindow title="Gemini" messages={geminiMessages} />
        <ChatWindow title="Llama" messages={llamaMessages} />
      </div>
      <div className="flex w-full max-w-6xl space-x-4 mb-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
