'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import ThemeLayout from '@/components/ThemeLayout';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { toast } from 'react-hot-toast';

interface PricingPlan {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
}

export default function BuyCredits() {
  const { credits, addCredits } = useStore();
  const router = useRouter();
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  
  const pricingPlans: PricingPlan[] = [
    { id: 'basic', credits: 20, price: 1 },
    { id: 'standard', credits: 50, price: 2, popular: true },
    { id: 'premium', credits: 120, price: 5 },
  ];

  const handlePurchase = async (plan: PricingPlan) => {
    if (!auth.currentUser) {
      toast.error('Please sign in to purchase credits');
      router.push('/signin');
      return;
    }

    setProcessingPlanId(plan.id);

    try {
      // Simulate a payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show "feature under development" toast instead of processing payment
      toast.success('This feature is under development! Credits were not added.', {
        duration: 5000,
        icon: '🚧'
      });
      
      // Don't add any credits or update Firestore
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setProcessingPlanId(null);
    }
  };

  return (
    <ThemeLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text mb-4">
            Get More Credits
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Continue your conversations with your AI companion by purchasing additional credits. 
            Each message costs 1 credit.
          </p>
          
          <div className="mt-4 inline-block bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <span className="text-gray-300 mr-2">Current Credits:</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {credits}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-black/30 backdrop-blur-xl rounded-xl border transition-all ${
                plan.popular 
                  ? 'border-purple-500/50 relative overflow-hidden md:scale-110 md:-mx-4 shadow-lg shadow-purple-500/20 z-10' 
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                    BEST VALUE
                  </div>
                </div>
              )}
              
              <div className={`p-6 ${plan.popular ? 'py-8' : ''}`}>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.id === 'basic' ? 'Basic' : plan.id === 'standard' ? 'Standard' : 'Premium'}
                </h3>
                
                <div className="mb-4">
                  <span className={`${plan.popular ? 'text-4xl' : 'text-3xl'} font-bold ${plan.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'text-white'}`}>${plan.price}</span>
                </div>
                
                <div className="border-t border-white/10 my-4 pt-4">
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-300">
                      <svg className={`h-5 w-5 mr-2 ${plan.popular ? 'text-purple-400' : 'text-green-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><span className="font-bold text-white">{plan.credits} credits</span> for chatting</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg className={`h-5 w-5 mr-2 ${plan.popular ? 'text-purple-400' : 'text-green-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {plan.id === 'basic' 
                        ? 'Basic chat experience' 
                        : plan.id === 'standard' 
                          ? 'Enhanced chat experience' 
                          : 'Premium chat experience'}
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg className={`h-5 w-5 mr-2 ${plan.popular ? 'text-purple-400' : 'text-green-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      No subscription, pay as you go
                    </li>
                  </ul>
                </div>
                
                <button
                  onClick={() => handlePurchase(plan)}
                  disabled={processingPlanId !== null}
                  className={`w-full py-3 mt-2 rounded-lg transition-all ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-lg shadow-purple-500/30' 
                      : 'bg-black/40 border border-white/10 hover:bg-black/60'
                  }`}
                >
                  {processingPlanId === plan.id 
                    ? <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    : plan.popular ? 'Get Best Value' : 'Purchase Now'
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={() => router.push('/chat')} 
            className="text-gray-300 hover:text-white transition-colors"
          >
            ← Back to Chat
          </button>
        </div>
      </div>
    </ThemeLayout>
  );
} 