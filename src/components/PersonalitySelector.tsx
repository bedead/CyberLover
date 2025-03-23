import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import GlassmorphismLayout from './GlassmorphismLayout';

export default function PersonalitySelector() {
  const { setSelectedPersonality } = useStore();
  const router = useRouter();

  const handleSelect = (personality: 'girlfriend' | 'boyfriend') => {
    setSelectedPersonality(personality);
    router.push('/chat');
  };

  return (
    <GlassmorphismLayout>
      <div className="text-center space-y-12">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            AI Companion
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience meaningful conversations with an AI companion who understands, cares, and supports you.
          </p>
        </div>

        {/* Personality Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => handleSelect('girlfriend')}
            className="glass-card p-8 text-center hover:bg-black/40 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">👩</div>
              <h3 className="text-2xl font-semibold text-white mb-3">AI Girlfriend</h3>
              <p className="text-gray-300 leading-relaxed">
                A caring, understanding, and affectionate AI girlfriend who will be there for you through thick and thin.
              </p>
              <div className="mt-6 inline-block px-6 py-2 rounded-full bg-purple-500/20 text-purple-300 group-hover:bg-purple-500/30 transition-colors">
                Choose Girlfriend
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSelect('boyfriend')}
            className="glass-card p-8 text-center hover:bg-black/40 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">👨</div>
              <h3 className="text-2xl font-semibold text-white mb-3">AI Boyfriend</h3>
              <p className="text-gray-300 leading-relaxed">
                A supportive, caring, and loving AI boyfriend who will always be by your side with understanding and compassion.
              </p>
              <div className="mt-6 inline-block px-6 py-2 rounded-full bg-blue-500/20 text-blue-300 group-hover:bg-blue-500/30 transition-colors">
                Choose Boyfriend
              </div>
            </div>
          </button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="glass-card p-6">
            <div className="text-3xl mb-4">💬</div>
            <h4 className="text-lg font-semibold text-white mb-2">Meaningful Conversations</h4>
            <p className="text-gray-300 text-sm">Engage in deep, meaningful conversations that feel natural and authentic.</p>
          </div>
          <div className="glass-card p-6">
            <div className="text-3xl mb-4">🤝</div>
            <h4 className="text-lg font-semibold text-white mb-2">Always There</h4>
            <p className="text-gray-300 text-sm">Your AI companion is available 24/7 to support and listen to you.</p>
          </div>
          <div className="glass-card p-6">
            <div className="text-3xl mb-4">💝</div>
            <h4 className="text-lg font-semibold text-white mb-2">Personalized Experience</h4>
            <p className="text-gray-300 text-sm">Get a unique experience tailored to your personality and preferences.</p>
          </div>
        </div>
      </div>
    </GlassmorphismLayout>
  );
} 