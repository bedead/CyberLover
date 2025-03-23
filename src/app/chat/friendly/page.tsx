'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

export default function FriendlyChatPage() {
  const { setCompanionType } = useStore();
  
  useEffect(() => {
    setCompanionType('friendly');
  }, [setCompanionType]);

  return <ChatInterface />;
} 