'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

export default function IntellectualChatPage() {
  const { setCompanionType, incrementTotalConversations, user } = useStore();
  
  useEffect(() => {
    setCompanionType('intellectual');
    
    // Increment conversation count when intellectual companion is selected
    if (user) {
      console.log('Incrementing conversation count for intellectual companion selection');
      incrementTotalConversations();
    }
  }, [setCompanionType, incrementTotalConversations, user]);

  return <ChatInterface />;
} 