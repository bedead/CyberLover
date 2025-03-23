import { create } from 'zustand';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface Store {
    user: User | null;
    credits: number;
    selectedPersonality: 'girlfriend' | 'boyfriend';
    setUser: (user: User | null) => void;
    setCredits: (credits: number) => void;
    useCredit: (amount: number) => void;
    addCredits: (amount: number) => Promise<void>;
    setSelectedPersonality: (personality: 'girlfriend' | 'boyfriend') => void;
}

export const useStore = create<Store>((set, get) => ({
    user: null,
    credits: 0,
    selectedPersonality: 'girlfriend',
    setUser: (user) => set({ user }),
    setCredits: (credits) => set({ credits }),
    useCredit: (amount) => set((state) => ({ credits: state.credits - amount })),
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
    setSelectedPersonality: (personality) => set({ selectedPersonality: personality }),
})); 