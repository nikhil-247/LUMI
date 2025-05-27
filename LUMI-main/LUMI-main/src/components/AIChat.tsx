import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIChat = () => {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string; timestamp: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    const userMessage = { role: 'user' as const, content: input, timestamp };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI('');
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const chat = model.startChat({
        history: messages.map((msg) => ({
          role: msg.role,
          parts: msg.content,
        })),
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: text, timestamp: new Date().toLocaleTimeString() },
      ]);
    } catch (error) {
      setError('Failed to get response from AI');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">AI Chat</h2>
          <button
            onClick={handleClearChat}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear Chat
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs text-gray-500 block mt-2">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center">
              <div className="animate-pulse text-gray-500">AI is typing...</div>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 mt-4">
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;