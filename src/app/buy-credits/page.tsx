'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const CREDIT_PACKAGES = [
  { credits: 50, price: 1.00, name: 'Starter' },
  { credits: 100, price: 1.50, name: 'Popular' },
  { credits: 1000, price: 10.00, name: 'Best Value' },
];

export default function BuyCredits() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useStore();

  const handlePurchase = async (packageCredits: number, price: number) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credits: packageCredits,
          price,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">CyberLover</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-300 hover:text-white"
              >
                Back to Chat
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Buy Credits</h1>
        <div className="grid gap-6">
          {CREDIT_PACKAGES.map((pkg) => (
            <button
              key={pkg.name}
              onClick={() => handlePurchase(pkg.credits, pkg.price)}
              disabled={isLoading}
              className="w-full flex justify-between items-center p-6 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 bg-gray-800"
            >
              <div>
                <h3 className="font-semibold text-white text-xl">{pkg.name}</h3>
                <p className="text-gray-300">{pkg.credits} credits</p>
              </div>
              <div className="text-2xl font-bold text-green-400">${pkg.price.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
} 