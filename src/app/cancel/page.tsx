'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    toast.error('Payment was cancelled.');
    // Redirect back to home after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="text-gray-600">Your payment was cancelled. No credits were charged.</p>
        <p className="text-gray-500 mt-2">Redirecting you back...</p>
      </div>
    </div>
  );
} 