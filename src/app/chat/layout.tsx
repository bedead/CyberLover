'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';
import ThemeLayout from '@/components/ThemeLayout';
import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname(); // Use Next.js usePathname hook
  const { user, setUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state with metrics tracking
  useAuth();

  // Check if we're in the companion chat interface
  // This will be true for any route like /chat/friendly, /chat/cool, etc.
  // But false for exactly /chat
  const isInChatInterface = pathname !== '/chat' && pathname.startsWith('/chat');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  };

  // Don't render anything if user is not logged in (will redirect)
  if (!user) {
    return null;
  }

  return (
    <ThemeLayout>
      <div className="h-screen relative">
        {/* Header buttons - only show in chat selection page, not in chat interfaces */}
        {!isInChatInterface && (
          <div className="absolute top-3 right-4 z-10 flex items-center gap-2">
            {/* Buy Credits button */}
            <button
              onClick={() => router.push('/buy-credits')}
              className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/60 transition-all text-white shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 group"
            >
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-medium">Buy</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white group-hover:text-green-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Feedback button */}
            <button
              onClick={() => router.push('/feedback')}
              className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/60 transition-all text-white shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 group"
            >
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text font-medium">Feedback</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/60 transition-all text-white shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 group"
            >
              <span className="hidden sm:inline bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text font-medium">Logout</span>
              <LogOut className="w-5 h-5 text-white group-hover:text-pink-400 transition-colors" />
            </button>
          </div>
        )}

        {children}
      </div>
    </ThemeLayout>
  );
} 