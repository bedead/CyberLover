'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import ThemeLayout from '@/components/ThemeLayout';
import { useAuth } from '@/hooks/useAuth';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { user } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state with metrics tracking
  useAuth();

  // Don't render anything if user is not logged in (will redirect)
  if (!user) {
    return null;
  }

  return (
    <ThemeLayout className="min-h-screen" fixedHeight={true}>
      {children}
    </ThemeLayout>
  );
} 