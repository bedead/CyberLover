import { ReactNode } from 'react';

interface GlassmorphismLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function GlassmorphismLayout({ children, className = '' }: GlassmorphismLayoutProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-6000"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 w-full max-w-6xl px-4 py-8 md:py-12 ${className}`}>
        <div className="backdrop-blur-xl bg-black/30 p-6 md:p-10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10">
          {children}
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-blob {
          animation: blob 15s infinite cubic-bezier(0.4, 0, 0.2, 1);
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

        /* Global glassmorphism styles */
        .glass-input {
          @apply w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .glass-button {
          @apply py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
        }

        .glass-card {
          @apply backdrop-blur-lg bg-white/5 rounded-2xl shadow-lg border border-white/10 transition-all hover:shadow-xl;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .neuro-card {
          background: rgba(15, 14, 20, 0.5);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
        }
      `}</style>
    </div>
  );
} 