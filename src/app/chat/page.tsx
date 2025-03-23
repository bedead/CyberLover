'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import type { CompanionType } from '@/store/useStore';

// Define companion information with descriptions and icons
const companions = [
  { 
    id: 'friendly' as CompanionType, 
    name: 'Friendly',
    description: 'A supportive and kind companion who\'s always there to listen and offer encouragement.',
    emoji: '😊',
    bgColor: 'from-blue-500 to-green-500',
  },
  { 
    id: 'cool' as CompanionType, 
    name: 'Cool Guy',
    description: 'Laid-back, confident, and always knows what\'s trending. Will make you feel part of the in-crowd.',
    emoji: '😎',
    bgColor: 'from-indigo-500 to-blue-500',
  },
  { 
    id: 'naughty' as CompanionType, 
    name: 'Naughty',
    description: 'Flirtatious, suggestive, and playfully mischievous. Perfect for those who want spicier conversations.',
    emoji: '😈',
    bgColor: 'from-red-500 to-pink-500',
  },
  { 
    id: 'romantic' as CompanionType, 
    name: 'Romantic',
    description: 'Deeply affectionate, sentimental, and emotionally attuned. Will make you feel cherished and loved.',
    emoji: '❤️',
    bgColor: 'from-pink-500 to-purple-500',
  },
  { 
    id: 'intellectual' as CompanionType, 
    name: 'Intellectual',
    description: 'Thoughtful, analytical, and knowledgeable. Engage in deep conversations about any topic.',
    emoji: '🧠',
    bgColor: 'from-yellow-500 to-amber-500',
  },
];

export default function ChatPage() {
  const router = useRouter();
  const { setCompanionType } = useStore();

  const handleSelectCompanion = (type: CompanionType) => {
    setCompanionType(type);
    router.push(`/chat/${type}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text mb-3">
          Choose Your AI Companion
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Select the type of companion you want to chat with today.
          Each companion has a unique personality and conversation style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companions.map((companion) => (
          <button
            key={companion.id}
            onClick={() => handleSelectCompanion(companion.id)}
            className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-left transition-all hover:bg-black/40 hover:border-white/20 hover:transform hover:-translate-y-1"
          >
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${companion.bgColor} flex items-center justify-center text-2xl mb-4`}>
              {companion.emoji}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{companion.name}</h3>
            <p className="text-gray-300 text-sm">{companion.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
} 