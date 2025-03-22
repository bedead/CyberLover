'use client';

import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useStore();
  const router = useRouter();
  useAuth(); // Initialize auth state

  useEffect(() => {
    if (user) {
      router.push('/chat');
    }
  }, [user, router]);

  if (user) {
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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/signin')}
                className="text-gray-300 hover:text-white"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Your AI Companion for Meaningful Conversations
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the future of companionship with our AI-powered chat platform. 
            Choose between a girlfriend or boyfriend personality and start meaningful conversations today.
          </p>
          <button
            onClick={() => router.push('/signup')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
          >
            Start Chatting Now
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Choose Your Companion</h3>
            <p className="text-gray-300">
              Select between a girlfriend or boyfriend personality that matches your preferences and start chatting.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Affordable Credits</h3>
            <p className="text-gray-300">
              Start with 100 free credits and purchase more as needed. Each message costs just 0.1 credits.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Always Available</h3>
            <p className="text-gray-300">
              Your AI companion is available 24/7, ready to chat and provide meaningful conversations whenever you need.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Start?</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push('/signup')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Account
            </button>
            <button
              onClick={() => router.push('/signin')}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
