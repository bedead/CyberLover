import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useStore } from '@/store/useStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export function useAuth() {
  const { setUser, setCredits } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setUser(user);

        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCredits(userData.credits || 0);
          } else {
            // If user document doesn't exist, create it with initial credits
            await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              credits: 100,
              conversations: 0,
              createdAt: new Date().toISOString(),
            });
            setCredits(100);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCredits(0);
        }
      } else {
        // User is signed out
        setUser(null);
        setCredits(0);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setUser, setCredits]);
} 