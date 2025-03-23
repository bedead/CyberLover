'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();
  const { user } = useStore();

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-fast"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-fast animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-fast animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-fast animation-delay-6000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl px-4 py-8 md:py-12">
        <div className="text-center space-y-16 max-w-4xl mx-auto backdrop-blur-lg">
          {/* Hero Section */}
          <div className="space-y-6 pt-6">
            <div className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-purple-500/20 text-purple-300 mb-2">
              Powered by AI
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                Your Perfect AI Companion
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Experience meaningful conversations with an AI that truly understands you.
              Whether you need support, companionship, or just someone to talk to.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              {user ? (
                <button
                  onClick={() => router.push('/chat')}
                  className="rainbow-border px-8 py-4 text-lg text-white font-medium bg-black/30 backdrop-blur-md rounded-lg"
                >
                  Start Chatting
                </button>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="rainbow-border px-8 py-4 text-lg text-white font-medium bg-black/30 backdrop-blur-md rounded-lg"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/signin"
                    className="shimmer-border px-8 py-4 text-lg text-white font-medium bg-black/20 backdrop-blur-md rounded-lg border border-white/10 transition-all"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 py-8">
            <div className="feature-card">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-xl"></div>
              <div className="text-4xl mb-4 bg-purple-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">💬</div>
              <h3 className="text-xl font-semibold text-white mb-3">Always Available</h3>
              <p className="text-gray-300">
                Your AI companion is here for you 24/7, ready to chat whenever you need connection.
              </p>
            </div>

            <div className="feature-card">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl"></div>
              <div className="text-4xl mb-4 bg-blue-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">💖</div>
              <h3 className="text-xl font-semibold text-white mb-3">Emotional Support</h3>
              <p className="text-gray-300">
                Share your thoughts and feelings with an AI that responds with empathy and understanding.
              </p>
            </div>

            <div className="feature-card">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-xl"></div>
              <div className="text-4xl mb-4 bg-pink-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">🎭</div>
              <h3 className="text-xl font-semibold text-white mb-3">Choose Your Companion</h3>
              <p className="text-gray-300">
                Select between an AI girlfriend or boyfriend that matches your preference.
              </p>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="py-4">
            <div className="neuro-card">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">What Our Users Say</h2>
                <p className="text-gray-300">
                  See how our AI companion has positively impacted lives
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-gray-300 mb-4">
                    "This AI companion has been amazing for me during difficult times. The conversations feel surprisingly natural and supportive."
                  </p>
                  <p className="text-white font-medium">- Alex K.</p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-gray-300 mb-4">
                    "I was skeptical at first, but I'm impressed by how well the AI understands emotions and responds appropriately. It's become a daily part of my routine."
                  </p>
                  <p className="text-white font-medium">- Jamie T.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 pb-2 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              © 2024 AI Companion. Powered by advanced AI technology.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes blob-fast {
          0% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(40px, -60px) scale(1.15); }
          50% { transform: translate(-30px, 30px) scale(0.85); }
          75% { transform: translate(20px, -20px) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes rainbow-border {
          0% { border-color: #ff1493; }
          20% { border-color: #ff8c00; }
          40% { border-color: #ffd700; }
          60% { border-color: #00fa9a; }
          80% { border-color: #00bfff; }
          100% { border-color: #ff1493; }
        }

        .animate-blob {
          animation: blob 15s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-blob-fast {
          animation: blob-fast 8s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        
        .feature-card {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .rainbow-border {
          position: relative;
          border: none;
          z-index: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .rainbow-border:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 2px;
          border-radius: 12px;
          background: linear-gradient(
            90deg, 
            #ff1493, #ff8c00, #ffd700, #00fa9a, #00bfff, #ff1493
          );
          background-size: 400% 400%;
          animation: rainbow-move 3s linear infinite;
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: -1;
        }
        
        @keyframes rainbow-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .rainbow-border:hover:before {
          animation: rainbow-move 1.5s linear infinite;
        }
        
        .shimmer-border {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer-border:before {
          content: '';
          position: absolute;
          top: -100%;
          left: -100%;
          right: -100%;
          bottom: -100%;
          background: linear-gradient(
            315deg,
            transparent 0%,
            transparent 35%,
            rgba(255, 255, 255, 0.2) 35%,
            rgba(255, 255, 255, 0.2) 60%,
            transparent 60%,
            transparent 100%
          );
          background-size: 400% 400%;
          animation: shimmer-move 3s linear infinite;
          z-index: -1;
        }
        
        @keyframes shimmer-move {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .shimmer-border:hover {
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
        }
        
        .shimmer-border:hover:before {
          animation: shimmer-move 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
