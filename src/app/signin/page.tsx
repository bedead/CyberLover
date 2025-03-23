'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import GlassmorphismLayout from '@/components/GlassmorphismLayout';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Signed in successfully!');
      router.push('/');
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error(error.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassmorphismLayout className="flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-300">
            Sign in to continue to your AI companion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input"
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="glass-button w-full flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-block animate-pulse">Signing in...</span>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="text-center text-gray-300 pt-4">
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </GlassmorphismLayout>
  );
} 