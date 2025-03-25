import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingScreen({ 
  message = 'Loading...', 
  fullScreen = false 
}: LoadingScreenProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse absolute inset-0 blur-md opacity-70"></div>
        <Loader2 className="w-14 h-14 animate-spin text-white relative z-10" />
      </div>
      <p className="text-white text-lg font-medium">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px] bg-black/20 backdrop-blur-sm rounded-lg">
      {content}
    </div>
  );
} 