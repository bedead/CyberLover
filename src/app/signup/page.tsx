'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import GlassmorphismLayout from '@/components/GlassmorphismLayout';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        username,
        credits: 10,
        conversations: 0,
        createdAt: serverTimestamp()
      });

      toast.success('Account created! You start with 10 credits.');
      router.push('/');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassmorphismLayout className="flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-3">
            Create Account
          </h1>
          <p className="text-gray-300">
            Join now to start chatting with your AI companion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-300 mb-2 font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="glass-input"
              required
              placeholder="Choose a username"
            />
          </div>

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
              placeholder="Create a password"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="glass-button w-full flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-block animate-pulse">Creating account...</span>
            ) : (
              'Sign Up'
            )}
          </button>

          <div className="text-center text-gray-300 pt-4">
            <p>
              Already have an account?{' '}
              <Link href="/signin" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </GlassmorphismLayout>
  );
} 