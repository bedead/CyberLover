'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore, type CompanionType } from '@/store/useStore';
import ChatInterface from '@/components/ChatInterface';

// Define valid companion types for validation
const validCompanionTypes: CompanionType[] = ['friendly', 'cool', 'naughty', 'romantic', 'intellectual'];

export default function CompanionChatPage({ 
  params 
}: { 
  params: { type: string } 
}) {
  const router = useRouter();
  const { setCompanionType } = useStore();
  const type = params.type as CompanionType;

  // Validate the companion type and redirect if invalid
  useEffect(() => {
    if (!validCompanionTypes.includes(type as CompanionType)) {
      // If invalid type, redirect to the companion selection page
      router.push('/chat');
      return;
    }

    // Set the companion type in the store
    setCompanionType(type as CompanionType);
  }, [type, router, setCompanionType]);

  // If the type is not valid, don't render anything
  if (!validCompanionTypes.includes(type as CompanionType)) {
    return null;
  }

  // Render the chat interface with the specified companion type
  return <ChatInterface />;
} 