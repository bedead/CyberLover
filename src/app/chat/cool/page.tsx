'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

export default function CoolChatPage() {
  const { setCompanionType } = useStore();
  
  useEffect(() => {
    setCompanionType('cool');
  }, [setCompanionType]);

  return <ChatInterface />;
} 