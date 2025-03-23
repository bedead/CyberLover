import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

export default function CreditsManager() {
  const { credits } = useStore();
  const router = useRouter();

  return (
    <div className="glass-card p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-white font-medium">Credits:</span>
        <span className="text-blue-300 font-bold">{credits}</span>
      </div>
      <button
        onClick={() => router.push('/buy-credits')}
        className="glass-button"
      >
        Buy Credits
      </button>
    </div>
  );
} 