import { create } from 'zustand';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc, setDoc, Timestamp, increment, serverTimestamp } from 'firebase/firestore';

export type AIGender = 'male' | 'female';
export type CompanionType = 'friendly' | 'cool' | 'naughty' | 'romantic' | 'intellectual';

// Define the user metrics interface
export interface UserMetrics {
    totalConversations: number;
    lastOnline: Timestamp | null;
    companionInteractions: {
        friendly: number;
        cool: number;
        naughty: number;
        romantic: number;
        intellectual: number;
    };
    messagesExchanged: number;
    creditsUsed: number;
    createdAt: Timestamp | null;
}

interface Store {
    user: User | null;
    credits: number;
    aiGender: AIGender;
    companionType: CompanionType;
    userMetrics: UserMetrics | null;
    setUser: (user: User | null) => void;
    setCredits: (credits: number) => void;
    useCredit: (amount: number) => Promise<void>;
    addCredits: (amount: number) => Promise<void>;
    setAIGender: (gender: AIGender) => void;
    setCompanionType: (type: CompanionType) => void;
    incrementMessageCount: () => Promise<void>;
    updateLastOnline: () => Promise<void>;
    loadUserData: (userId: string) => Promise<void>;
    incrementTotalConversations: () => Promise<void>;
}

const defaultMetrics: UserMetrics = {
    totalConversations: 0,
    lastOnline: null,
    companionInteractions: {
        friendly: 0,
        cool: 0,
        naughty: 0,
        romantic: 0,
        intellectual: 0,
    },
    messagesExchanged: 0,
    creditsUsed: 0,
    createdAt: null,
};

export const useStore = create<Store>((set, get) => ({
    user: null,
    credits: 0,
    aiGender: 'female',
    companionType: 'friendly',
    userMetrics: null,

    setUser: (user) => {
        // When user logs out, clear the session flag in localStorage
        if (!user) {
            // Get the previous user ID if available
            const prevUser = get().user;
            if (prevUser) {
                localStorage.removeItem(`chat_session_${prevUser.uid}`);
                console.log("Cleared session flag for user:", prevUser.uid);
            }
        }
        set({ user });
    },

    setCredits: (credits) => set({ credits }),

    useCredit: async (amount) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const newCredits = get().credits - amount;
        set({ credits: newCredits });

        try {
            // Update credits and credit usage metric in Firestore
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                credits: newCredits,
                'metrics.creditsUsed': increment(amount),
                'metrics.lastOnline': serverTimestamp(),
            });
        } catch (error) {
            console.error('Error updating credits in Firebase:', error);
        }
    },

    addCredits: async (amount) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const newCredits = get().credits + amount;
        set({ credits: newCredits });

        try {
            // Update credits in Firestore
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                credits: newCredits,
                'metrics.lastOnline': serverTimestamp(),
            });
        } catch (error) {
            console.error('Error adding credits in Firebase:', error);
        }
    },

    setAIGender: (aiGender) => set({ aiGender }),

    setCompanionType: async (companionType) => {
        const prevType = get().companionType;
        // Just update the state without incrementing conversation count
        set({ companionType });

        if (prevType !== companionType) {
            console.log(`Changing companion type from ${prevType} to ${companionType}`);

            // Update lastOnline timestamp but don't increment totalConversations
            const currentUser = get().user;
            if (currentUser) {
                try {
                    console.log("Updating lastOnline for companion type change");
                    const userRef = doc(db, 'users', currentUser.uid);
                    
                    // Just update lastOnline without incrementing conversations
                    await updateDoc(userRef, {
                        'metrics.lastOnline': serverTimestamp(),
                    });
                    
                    // Update local state timestamp without incrementing
                    if (get().userMetrics) {
                        const updatedMetrics = { ...get().userMetrics } as UserMetrics;
                        updatedMetrics.lastOnline = Timestamp.now();
                        set({ userMetrics: updatedMetrics });
                    }
                } catch (error) {
                    console.error('Error updating lastOnline in Firebase:', error);
                }
            }
        }
    },

    incrementMessageCount: async () => {
        const currentUser = get().user;
        const companionType = get().companionType;
        if (!currentUser) return;

        try {
            // Update message count and companion interaction in Firestore
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                'metrics.messagesExchanged': increment(1),
                [`metrics.companionInteractions.${companionType}`]: increment(1),
                'metrics.lastOnline': serverTimestamp(),
            });

            // Also update local metrics
            if (get().userMetrics) {
                const updatedMetrics = { ...get().userMetrics } as UserMetrics;
                updatedMetrics.messagesExchanged = (updatedMetrics.messagesExchanged || 0) + 1;
                if (!updatedMetrics.companionInteractions) {
                    updatedMetrics.companionInteractions = {
                        friendly: 0,
                        cool: 0,
                        naughty: 0,
                        romantic: 0,
                        intellectual: 0,
                    };
                }
                updatedMetrics.companionInteractions[companionType] += 1;
                updatedMetrics.lastOnline = Timestamp.now();
                set({ userMetrics: updatedMetrics });
            }
        } catch (error) {
            console.error('Error updating message metrics in Firebase:', error);
        }
    },

    updateLastOnline: async () => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                'metrics.lastOnline': serverTimestamp(),
            });

            // Update local metrics
            if (get().userMetrics) {
                const updatedMetrics = { ...get().userMetrics } as UserMetrics;
                updatedMetrics.lastOnline = Timestamp.now();
                set({ userMetrics: updatedMetrics });
            }
        } catch (error) {
            console.error('Error updating last online time in Firebase:', error);
        }
    },

    loadUserData: async (userId: string) => {
        try {
            console.log("Loading user data for:", userId);
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                set({ credits: userData.credits || 0 });

                // Initialize metrics if they don't exist
                if (!userData.metrics) {
                    console.log("Creating initial metrics for user");
                    const initialMetrics = {
                        ...defaultMetrics,
                        totalConversations: 0, // Start with 0 conversations
                        createdAt: serverTimestamp(),
                        lastOnline: serverTimestamp(),
                    };
                    await updateDoc(userRef, { metrics: initialMetrics });
                    set({
                        userMetrics: {
                            ...defaultMetrics,
                            totalConversations: 0,
                            createdAt: Timestamp.now(),
                            lastOnline: Timestamp.now()
                        }
                    });
                    console.log("Initial metrics created with totalConversations = 0");
                } else {
                    // Set user metrics from Firestore
                    set({ userMetrics: userData.metrics });
                    console.log("Loaded existing metrics:", userData.metrics);
                    
                    // No incrementing of totalConversations on load anymore
                    // This should only happen when "New Chat" is clicked
                    console.log("Skipping conversation increment on load");
                }
            } else {
                // Create new user document with initial metrics
                console.log("Creating new user document");
                const initialMetrics = {
                    ...defaultMetrics,
                    totalConversations: 0, // Start with 0 for new users
                    createdAt: serverTimestamp(),
                    lastOnline: serverTimestamp(),
                };
                await setDoc(userRef, {
                    credits: 100, // Give new users starter credits
                    metrics: initialMetrics,
                });
                set({
                    credits: 100,
                    userMetrics: {
                        ...defaultMetrics,
                        totalConversations: 0,
                        createdAt: Timestamp.now(),
                        lastOnline: Timestamp.now()
                    }
                });
                console.log("New user created with totalConversations = 0");
            }
        } catch (error) {
            console.error('Error loading user data from Firebase:', error);
        }
    },

    incrementTotalConversations: async () => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
            console.log("Store: Incrementing total conversations");
            const userRef = doc(db, 'users', currentUser.uid);

            // Get current metrics
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const currentMetrics = userData.metrics || defaultMetrics;

                // Calculate new total
                const newTotal = (currentMetrics.totalConversations || 0) + 1;

                // Update in Firestore
                await updateDoc(userRef, {
                    'metrics.totalConversations': newTotal,
                    'metrics.lastOnline': serverTimestamp(),
                });

                // Update local state
                if (get().userMetrics) {
                    const updatedMetrics = { ...get().userMetrics } as UserMetrics;
                    updatedMetrics.totalConversations = newTotal;
                    updatedMetrics.lastOnline = Timestamp.now();
                    set({ userMetrics: updatedMetrics });

                    console.log("Store: Local totalConversations updated to:", newTotal);
                }
            } else {
                console.error("Store: User document does not exist");
            }
        } catch (error) {
            console.error('Store: Error incrementing total conversations:', error);
        }
    },
})); 