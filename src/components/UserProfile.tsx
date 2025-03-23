import { useState, useEffect } from 'react';
import { useStore, type UserMetrics } from '@/store/useStore';
import { format } from 'date-fns';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { RefreshCw } from 'lucide-react';

// Use default metrics from store to ensure consistency
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

export default function UserProfile() {
  const { user, credits, userMetrics } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  if (!user || !userMetrics) {
    return null;
  }

  // Calculate total interactions across all companion types
  const totalInteractions = Object.values(userMetrics.companionInteractions || {}).reduce(
    (sum, count) => sum + count,
    0
  );

  // Format the date for display
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Never';
    try {
      // Convert Firestore Timestamp to JavaScript Date
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return format(date, 'MMM d, yyyy h:mm a');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  // Function to manually sync data from Firebase
  const syncDataFromFirebase = async () => {
    if (!user || isSyncing) return;

    setIsSyncing(true);

    try {
      console.log("Manually syncing user data from Firebase");
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Retrieved Firebase data:", userData);

        // Extract metrics with fallbacks
        const firebaseMetrics = userData.metrics || defaultMetrics;

        // Update local state with the latest Firebase data
        useStore.setState({
          credits: userData.credits || 0,
          userMetrics: firebaseMetrics
        });

        // Log the conversation count to verify sync
        console.log("Synced totalConversations:", firebaseMetrics.totalConversations);

        // Set last synced time
        setLastSynced(new Date());
        console.log("Manual sync complete");
      } else {
        console.error("User document does not exist");
      }
    } catch (error) {
      console.error('Error syncing data from Firebase:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleProfile}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-full transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          {user.email?.charAt(0).toUpperCase() || '?'}
        </div>
        <span className="text-white text-sm font-medium hidden sm:inline">Profile</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex justify-between items-center">
            <div>
              <h3 className="text-white font-medium">User Profile</h3>
              <p className="text-white/80 text-sm truncate">{user.email}</p>
            </div>
            <button
              onClick={syncDataFromFirebase}
              disabled={isSyncing}
              className="flex items-center gap-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Sync data from server"
            >
              <p>Sync</p>
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {lastSynced && (
              <div className="text-xs text-gray-400 text-center">
                Last synced: {format(lastSynced, 'h:mm:ss a')}
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Credits</span>
              <span className="text-white font-medium">{credits}</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-gray-300 text-sm font-medium">Activity</h4>
              <div className="bg-gray-900 rounded-lg p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Total Conversations</span>
                  <span className="text-white text-xs">{userMetrics.totalConversations || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Messages Exchanged</span>
                  <span className="text-white text-xs">{userMetrics.messagesExchanged || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Credits Used</span>
                  <span className="text-white text-xs">{userMetrics.creditsUsed || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Last Online</span>
                  <span className="text-white text-xs">{formatDate(userMetrics.lastOnline)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Account Created</span>
                  <span className="text-white text-xs">{formatDate(userMetrics.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-gray-300 text-sm font-medium">Companion Interactions</h4>
              <div className="space-y-2">
                {Object.entries(userMetrics.companionInteractions || {}).map(([type, count]) => (
                  <div key={type} className="flex items-center">
                    <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getCompanionColor(type)}`}
                        style={{
                          width: totalInteractions > 0
                            ? `${(count / totalInteractions) * 100}%`
                            : '0%'
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center ml-2 min-w-[80px]">
                      <span className="text-gray-400 text-xs capitalize">{type}</span>
                      <span className="text-white text-xs">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 p-3 flex justify-center">
            <button
              onClick={() => {
                // Handle sign out here if needed
                setIsOpen(false);
              }}
              className="text-gray-300 text-sm hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get color for companion type
function getCompanionColor(type: string): string {
  switch (type) {
    case 'friendly':
      return 'bg-green-500';
    case 'cool':
      return 'bg-blue-500';
    case 'naughty':
      return 'bg-pink-500';
    case 'romantic':
      return 'bg-red-500';
    case 'intellectual':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
} 