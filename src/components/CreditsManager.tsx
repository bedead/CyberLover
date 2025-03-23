import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

export default function CreditsManager() {
  const { credits } = useStore();
  const router = useRouter();

  return (
    <div className="flex items-center">
      <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10 mr-2">
        <span className="text-gray-300 text-sm mr-1">Credits:</span>
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          {credits}
        </span>
      </div>
      <button
        onClick={() => router.push('/buy-credits')}
        className="text-xs px-3 py-1.5 rounded-full bg-purple-600/30 hover:bg-purple-600/50 text-white border border-purple-500/30 transition-all"
      >
        + Buy
      </button>
    </div>
  );
} 