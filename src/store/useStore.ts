import { create } from 'zustand';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export type AIGender = 'male' | 'female';
export type CompanionType = 'friendly' | 'cool' | 'naughty' | 'romantic' | 'intellectual';

interface Store {
    user: User | null;
    credits: number;
    aiGender: AIGender;
    companionType: CompanionType;
    setUser: (user: User | null) => void;
    setCredits: (credits: number) => void;
    useCredit: (amount: number) => void;
    addCredits: (amount: number) => Promise<void>;
    setAIGender: (gender: AIGender) => void;
    setCompanionType: (type: CompanionType) => void;
}

export const useStore = create<Store>((set, get) => ({
    user: null,
    credits: 0,
    aiGender: 'female',
    companionType: 'friendly',
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
    setAIGender: (aiGender) => set({ aiGender }),
    setCompanionType: (companionType) => set({ companionType }),
})); 