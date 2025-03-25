'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

export default function FriendlyChatPage() {
  const { setCompanionType, incrementTotalConversations, user } = useStore();
  
  useEffect(() => {
    setCompanionType('friendly');
    
    // Increment conversation count when friendly companion is selected
    if (user) {
      console.log('Incrementing conversation count for friendly companion selection');
      incrementTotalConversations();
    }
  }, [setCompanionType, incrementTotalConversations, user]);

  return <ChatInterface />;
} 