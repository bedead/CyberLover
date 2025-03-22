import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

export default function CreditsManager() {
  const { credits } = useStore();
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <div className="text-white">
        <span className="text-gray-300">Credits:</span> {credits.toFixed(1)}
      </div>
      <button
        onClick={() => router.push('/buy-credits')}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Buy Credits
      </button>
    </div>
  );
} 