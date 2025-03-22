'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addCredits } = useStore();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // In a real application, you would verify the session with your backend
      // and update the user's credits in your database
      const credits = 100; // This should come from your backend
      addCredits(credits);
      toast.success('Payment successful! Credits added to your account.');
    }
    // Redirect back to home after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [searchParams, router, addCredits]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600">Your credits have been added to your account.</p>
        <p className="text-gray-500 mt-2">Redirecting you back...</p>
      </div>
    </div>
  );
} 