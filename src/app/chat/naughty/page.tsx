'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

export default function NaughtyChatPage() {
  const { setCompanionType, incrementTotalConversations, user } = useStore();
  
  useEffect(() => {
    setCompanionType('naughty');
    
    // Increment conversation count when naughty companion is selected
    if (user) {
      console.log('Incrementing conversation count for naughty companion selection');
      incrementTotalConversations();
    }
  }, [setCompanionType, incrementTotalConversations, user]);

  return <ChatInterface />;
} 