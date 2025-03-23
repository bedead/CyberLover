import { useState, useRef, useEffect } from 'react';
import { useStore, type CompanionType, type AIGender } from '@/store/useStore';
import { generateResponse } from '@/lib/gemini';
import { toast } from 'react-hot-toast';
import CreditsManager from './CreditsManager';
import { useRouter } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Helper function to get companion name based on type and gender
const getCompanionName = (type: CompanionType, gender: AIGender): string => {
  switch (type) {
    case 'friendly':
      return gender === 'female' ? 'Friendly Companion' : 'Friendly Companion';
    case 'cool':
      return gender === 'female' ? 'Cool Girl' : 'Cool Guy';
    case 'naughty':
      return gender === 'female' ? 'Naughty Girl' : 'Naughty Guy';
    case 'romantic':
      return gender === 'female' ? 'Romantic Partner' : 'Romantic Partner';
    case 'intellectual':
      return gender === 'female' ? 'Intellectual Friend' : 'Intellectual Friend';
    default:
      return 'AI Companion';
  }
};

// Helper function to get emoji based on type and gender
const getCompanionEmoji = (type: CompanionType, gender: AIGender): string => {
  switch (type) {
    case 'friendly':
      return gender === 'female' ? '👩‍⚕️' : '👨‍⚕️';
    case 'cool':
      return gender === 'female' ? '😎' : '😎';
    case 'naughty':
      return gender === 'female' ? '😈' : '😈';
    case 'romantic':
      return gender === 'female' ? '❤️' : '❤️';
    case 'intellectual':
      return gender === 'female' ? '👩‍🏫' : '👨‍🏫';
    default:
      return gender === 'female' ? '👩' : '👨';
  }
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { credits, useCredit, aiGender, setAIGender, companionType } = useStore();
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add a welcome message if there are no messages yet
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessages = {
        friendly: `Hi there! I'm your ${aiGender === 'female' ? 'female' : 'male'} friendly companion. How are you feeling today? I'm here to chat and support you!`,
        cool: `Hey! What's up? I'm your ${aiGender === 'female' ? 'female' : 'male'} cool companion. Let's talk about whatever's trending or on your mind!`,
        naughty: `Well hello there... I'm your ${aiGender === 'female' ? 'female' : 'male'} naughty companion. I can't wait to get to know you better... much better.`,
        romantic: `Hello, my dear. I'm your ${aiGender === 'female' ? 'female' : 'male'} romantic companion. I've been waiting for someone special like you. How has your day been?`,
        intellectual: `Greetings! I'm your ${aiGender === 'female' ? 'female' : 'male'} intellectual companion. I'm looking forward to our stimulating conversations. What shall we discuss today?`
      };

      setMessages([
        {
          role: 'assistant',
          content: welcomeMessages[companionType] || `Hello! I'm your AI companion. How can I help you today?`
        }
      ]);
    }
  }, [aiGender, companionType]);

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
      // Pass both companionType and aiGender to generateResponse
      const response = await generateResponse(userMessage, companionType, aiGender);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleGender = () => {
    setAIGender(aiGender === 'female' ? 'male' : 'female');
  };

  const handleBackToSelection = () => {
    router.push('/chat');
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Chat header with AI info and options */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 py-2 px-3 flex-shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBackToSelection}
              className="p-2 rounded-md hover:bg-black/20 transition-colors"
              title="Back to selection"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                {getCompanionEmoji(companionType, aiGender)}
              </div>
              <h1 className="text-white font-medium ml-2">{getCompanionName(companionType, aiGender)}</h1>
            </div>

            {/* Gender toggle */}
            <div className="flex items-center bg-black/30 rounded-full p-1 ml-2">
              <button
                onClick={toggleGender}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${aiGender === 'female'
                  ? 'bg-pink-500/70 text-white'
                  : 'text-gray-300 hover:bg-black/20'
                  }`}
              >
                Female
              </button>
              <button
                onClick={toggleGender}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${aiGender === 'male'
                  ? 'bg-blue-500/70 text-white'
                  : 'text-gray-300 hover:bg-black/20'
                  }`}
              >
                Male
              </button>
            </div>
          </div>
          <CreditsManager />
        </div>
      </header>

      {/* Main chat area with ChatGPT-like styling */}
      <main className="flex-1 overflow-auto bg-black/10">
        <div className="max-w-3xl mx-auto h-full">
          <div className="flex flex-col space-y-3 p-2.5 h-full overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'assistant' ? 'bg-black/20' : ''} p-2.5 rounded-lg`}
              >
                <div className={`flex-shrink-0 mr-3 ${message.role === 'user' ? 'self-start mt-1' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${message.role === 'assistant'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-blue-600'
                    }`}>
                    {message.role === 'assistant'
                      ? getCompanionEmoji(companionType, aiGender)
                      : '👤'
                    }
                  </div>
                </div>
                <div className="flex-1">
                  <div className="prose prose-invert max-w-none">
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex bg-black/20 p-2.5 rounded-lg">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                    {getCompanionEmoji(companionType, aiGender)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1 py-0" />
          </div>
        </div>
      </main>

      {/* Message input with ChatGPT-like styling */}
      <footer className="border-t border-white/10 bg-black/30 p-3 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex">
            <div className="flex-1 bg-black/40 rounded-lg border border-white/10 overflow-hidden flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={credits < 1 ? "You need credits to send messages..." : "Type your message..."}
                className="flex-1 bg-transparent p-2 text-white focus:outline-none"
                disabled={credits < 1 || isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || credits < 1 || !input.trim()}
                className={`p-2 ${!input.trim() || isLoading || credits < 1
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-white bg-purple-600/70 hover:bg-purple-600'
                  } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
          <div className="mt-1 text-xs text-center text-gray-400">
            {credits < 1 ? (
              <button
                onClick={() => router.push('/buy-credits')}
                className="text-indigo-400 hover:underline"
              >
                You need more credits to continue. Click here to buy credits.
              </button>
            ) : (
              <span>Each message costs 1 credit. You have {credits} credits remaining.</span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
} 