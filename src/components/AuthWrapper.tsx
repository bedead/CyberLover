'use client';

import { useAuth } from '@/hooks/useAuth';

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuth();
  return <>{children}</>;
} 