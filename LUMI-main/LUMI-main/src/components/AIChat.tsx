import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError('Gemini is not configured. Add VITE_GEMINI_API_KEY to the app environment and restart Vite.');
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Gemini requires history roles "user" and "model". Keep only complete
      // user/assistant pairs so a previous failed request cannot corrupt history.
      const history: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
      for (let index = 0; index < messages.length - 1; index += 1) {
        const current = messages[index];
        const next = messages[index + 1];
        if (current.role === 'user' && next.role === 'assistant') {
          history.push(
            { role: 'user', parts: [{ text: current.content }] },
            { role: 'model', parts: [{ text: next.content }] },
          );
          index += 1;
        }
      }

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(text);
      const reply = (await result.response).text().trim();
      if (!reply) throw new Error('The model returned an empty response.');

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply, timestamp: new Date().toLocaleTimeString() },
      ]);
    } catch {
      setError('Could not get a response from Gemini. Check the API key, its allowed API/referrer settings, and your connection, then try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setInput('');
    setError(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">AI Chat</h2>
          <button
            type="button"
            onClick={handleClearChat}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mb-4" aria-live="polite">
          {messages.map((message, index) => (
            <div
              key={`${message.timestamp}-${index}`}
              className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block p-4 rounded-lg ${message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <span className="text-xs text-gray-500 block mt-2">{message.timestamp}</span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center" role="status">
              <div className="animate-pulse text-gray-500">AI is typing...</div>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 mt-4" role="alert">
              <p>{error}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            aria-label="Message to the AI assistant"
            maxLength={4000}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
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
