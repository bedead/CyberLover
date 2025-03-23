'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

export default function RomanticChatPage() {
  const { setCompanionType } = useStore();
  
  useEffect(() => {
    setCompanionType('romantic');
  }, [setCompanionType]);

  return <ChatInterface />;
} 