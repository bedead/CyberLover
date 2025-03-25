'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeLayout from '@/components/ThemeLayout';
import { toast } from 'react-hot-toast';
import { useStore } from '@/store/useStore';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function FeedbackPage() {
  const router = useRouter();
  const { user } = useStore();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Save feedback to Firestore
      const feedbackRef = collection(db, 'feedbacks');
      await addDoc(feedbackRef, {
        name: name.trim() || 'Anonymous',
        message: message.trim(),
        userId: user?.uid || null,
        userEmail: user?.email || null,
        createdAt: serverTimestamp(),
      });
      
      // Show success message
      toast.success('Thank you for your feedback!', {
        duration: 5000,
      });
      
      // Clear form
      setName('');
      setMessage('');
      
      // Redirect to chat after a short delay
      setTimeout(() => {
        router.push('/chat');
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
            <div className="p-1">
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-t-xl"></div>
            </div>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 text-transparent bg-clip-text mb-3">
                  Share Your Feedback
                </h1>
                <p className="text-gray-300">
                  We'd love to hear your thoughts on how we can improve your experience.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-white/10 bg-black/30 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Feedback
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-white/10 bg-black/30 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us what you think, suggest features or report issues..."
                  />
                </div>
                
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium transition-all shadow-lg shadow-blue-500/20"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Feedback'
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-8 text-center">
                <button 
                  onClick={() => router.push('/chat')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  ← Back to Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeLayout>
  );
} 