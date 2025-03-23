'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

export default function NaughtyChatPage() {
  const { setCompanionType } = useStore();
  
  useEffect(() => {
    setCompanionType('naughty');
  }, [setCompanionType]);

  return <ChatInterface />;
} 