'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import ThemeLayout from '@/components/ThemeLayout';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { user, setUser, setCredits } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
        
        // Get user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', authUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Set the user's credits from Firestore
            setCredits(userData.credits || 0);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Failed to load user data');
        }
      } else {
        // User is signed out
        setUser(null);
        router.push('/signin');
      }
      setIsLoading(false);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [router, setUser, setCredits]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not logged in (will redirect)
  if (!user) {
    return null;
  }

  return (
    <ThemeLayout className="min-h-screen" fixedHeight={true}>
      {children}
    </ThemeLayout>
  );
} 