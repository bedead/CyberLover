import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useStore } from '@/store/useStore';
import { doc, getDoc } from 'firebase/firestore';

export function useAuth() {
  const { setUser, setCredits, loadUserData } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setUser(user);

        try {
          // Load user data including credits and metrics
          await loadUserData(user.uid);
        } catch (error) {
          console.error('Error loading user data:', error);
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
  }, [setUser, setCredits, loadUserData]);
} 