'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

export default function RomanticChatPage() {
  const { setCompanionType, incrementTotalConversations, user } = useStore();
  
  useEffect(() => {
    setCompanionType('romantic');
    
    // Increment conversation count when romantic companion is selected
    if (user) {
      console.log('Incrementing conversation count for romantic companion selection');
      incrementTotalConversations();
    }
  }, [setCompanionType, incrementTotalConversations, user]);

  return <ChatInterface />;
} 