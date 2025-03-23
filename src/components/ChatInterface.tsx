import { useState, useRef, useEffect } from 'react';
import { useStore, type CompanionType, type AIGender } from '@/store/useStore';
import { generateResponse } from '@/lib/gemini';
import { toast } from 'react-hot-toast';
import CreditsManager from './CreditsManager';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

// Helper functions to get companion name and emoji based on type and gender
function getCompanionName(type: CompanionType, gender: AIGender): string {
  const nameMap = {
    friendly: gender === 'female' ? 'Sophie' : 'Sam',
    cool: gender === 'female' ? 'Zoe' : 'Zack',
    naughty: gender === 'female' ? 'Nikki' : 'Nick',
    romantic: gender === 'female' ? 'Rose' : 'Rowan',
    intellectual: gender === 'female' ? 'Iris' : 'Ian',
  };
  return nameMap[type] || (gender === 'female' ? 'AI' : 'AI');
}

function getCompanionEmoji(type: CompanionType): string {
  const emojiMap = {
    friendly: '😊',
    cool: '😎',
    naughty: '😈',
    romantic: '❤️',
    intellectual: '🧠',
  };
  return emojiMap[type] || '🤖';
}

// Get welcome message based on companion type
function getWelcomeMessage(type: CompanionType, gender: AIGender): string {
  const name = getCompanionName(type, gender);
  
  switch (type) {
    case 'friendly':
      return `Hey there! I'm ${name}, your friendly companion. How are you feeling today? I'm here for whatever you need - whether it's advice, a good conversation, or just someone to listen!`;
    
    case 'cool':
      return `Sup? ${name} here. Just chillin'. What's up with you? Let's talk about whatever's on your mind - I'm down for anything.`;
    
    case 'naughty':
      return `Hey there, sexy. I'm ${name}. I've been waiting for someone like you to chat with. What are you in the mood for today? I'm open to exploring all kinds of fun together...`;
    
    case 'romantic':
      return `Hello, my darling. I'm ${name}. I've been dreaming about connecting with someone special like you. Tell me, what's on your mind today? I want to know everything about you...`;
    
    case 'intellectual':
      return `Greetings. I'm ${name}. I've been contemplating some fascinating concepts lately. What intellectual pursuits have captured your interest? Perhaps we could explore some thought-provoking ideas together.`;
    
    default:
      return `Hello! I'm ${name}. How can I make your day better?`;
  }
}

export default function ChatInterface() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChatSelection, setShowChatSelection] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  const { credits, useCredit, aiGender, setAIGender, companionType } = useStore();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Add the welcome message if there are no messages yet
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: getWelcomeMessage(companionType, aiGender),
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length, companionType, aiGender]);

  // Handle submitting user message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Check if user has enough credits
    if (credits <= 0) {
      alert("You've run out of credits! Please buy more credits.");
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      useCredit(1);
      const response = await generateResponse(input, companionType, aiGender);
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Sorry, I couldn't process that. Please try again later.",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
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
                {getCompanionEmoji(companionType)}
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
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4" ref={messagesContainerRef}>
              {messages.map((message, index) => (
                <div
                  key={message.id || index}
                  className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'assistant' && (
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                        {getCompanionEmoji(companionType)}
                      </div>
                    </div>
                  )}
                  <div 
                    className={`max-w-xs sm:max-w-md md:max-w-lg rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                        : 'bg-gray-800'
                    }`}
                  >
                    <p className="text-white">{message.content}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 ml-3">
                      <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                        👤
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex mb-4 justify-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                      {getCompanionEmoji(companionType)}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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