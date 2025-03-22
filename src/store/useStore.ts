import { create } from 'zustand';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface Store {
    user: User | null;
    credits: number;
    setUser: (user: User | null) => void;
    setCredits: (credits: number) => void;
    useCredit: (amount: number) => Promise<void>;
    addCredits: (amount: number) => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
    user: null,
    credits: 0,
    setUser: (user) => set({ user }),
    setCredits: (credits) => set({ credits }),
    useCredit: async (amount) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const newCredits = Math.max(0, get().credits - amount);
        set({ credits: newCredits });

        // Update credits in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
            credits: newCredits
        });
    },
    addCredits: async (amount) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const newCredits = get().credits + amount;
        set({ credits: newCredits });

        // Update credits in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
            credits: newCredits
        });
    },
})); 