import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { generateResponse } from '@/lib/gemini';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  personality: 'girlfriend' | 'boyfriend';
}

export default function ChatInterface({ personality }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { credits, useCredit, user } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (credits < 0.1) {
      toast.error('You need at least 0.1 credits to send a message. Please buy more credits.');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await generateResponse(userMessage, personality);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      useCredit(0.1);

      // Update conversation count in Firebase
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          conversations: increment(1)
        });
      }
    } catch (error) {
      toast.error('Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${message.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-100'
                }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 rounded-lg p-4 text-gray-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-gray-600 bg-gray-800 text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading || credits < 0.1}
        />
        <button
          type="submit"
          disabled={isLoading || credits < 0.1}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
} 