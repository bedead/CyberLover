'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

export default function IntellectualChatPage() {
  const { setCompanionType } = useStore();
  
  useEffect(() => {
    setCompanionType('intellectual');
  }, [setCompanionType]);

  return <ChatInterface />;
} 