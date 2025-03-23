import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { generateResponse } from '@/lib/gemini';
import toast from 'react-hot-toast';
import GlassmorphismLayout from './GlassmorphismLayout';
import CreditsManager from './CreditsManager';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { credits, useCredit } = useStore();
  const { selectedPersonality } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (credits < 1) {
      toast.error('You need at least 1 credit to send a message. Please buy more credits.');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      useCredit(1);
      const response = await generateResponse(userMessage, selectedPersonality);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassmorphismLayout className="h-screen">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <CreditsManager />
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-purple-500 text-white'
                    : 'bg-black/20 text-white backdrop-blur-sm'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-black/20 text-white backdrop-blur-sm p-4 rounded-2xl">
                Thinking...
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
            className="glass-input flex-1"
            disabled={credits < 1}
          />
          <button
            type="submit"
            disabled={isLoading || credits < 1}
            className="glass-button"
          >
            Send
          </button>
        </form>
      </div>
    </GlassmorphismLayout>
  );
} 