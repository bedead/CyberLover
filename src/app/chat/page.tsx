'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import PersonalitySelector from '@/components/PersonalitySelector';
import ChatInterface from '@/components/ChatInterface';
import CreditsManager from '@/components/CreditsManager';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function ChatPage() {
  const [selectedPersonality, setSelectedPersonality] = useState<'girlfriend' | 'boyfriend' | null>(null);
  const { user } = useStore();
  const router = useRouter();
  useAuth(); // Initialize auth state

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null; // Return null while redirecting
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">CyberLover</h1>
            </div>
            <div className="flex items-center">
              <CreditsManager />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedPersonality ? (
          <PersonalitySelector onSelect={setSelectedPersonality} />
        ) : (
          <ChatInterface personality={selectedPersonality} />
        )}
      </div>
    </main>
  );
} 