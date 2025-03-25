'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

export default function CoolChatPage() {
  const { setCompanionType, incrementTotalConversations, user } = useStore();
  
  useEffect(() => {
    setCompanionType('cool');
    
    // Increment conversation count when cool companion is selected
    if (user) {
      console.log('Incrementing conversation count for cool companion selection');
      incrementTotalConversations();
    }
  }, [setCompanionType, incrementTotalConversations, user]);

  return <ChatInterface />;
} 