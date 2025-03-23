'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CompanionType } from '@/store/useStore';

// Define companion themes
const companionThemes: Record<CompanionType, string> = {
  'friendly': 'from-blue-500 to-green-500',
  'cool': 'from-indigo-500 to-blue-500',
  'naughty': 'from-red-500 to-pink-500',
  'romantic': 'from-pink-500 to-purple-500',
  'intellectual': 'from-yellow-500 to-amber-500',
};

export default function CompanionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams();
  const type = params.type as CompanionType;
  const [bgGradient, setBgGradient] = useState('from-purple-900 to-indigo-900');

  useEffect(() => {
    // Set the background gradient based on companion type
    if (type && companionThemes[type as CompanionType]) {
      setBgGradient(companionThemes[type as CompanionType]);
    }
  }, [type]);

  return (
    <div className="min-h-screen max-h-screen overflow-hidden">
      {/* Add subtle companion-specific styling */}
      <div className={`fixed inset-0 -z-10 bg-black opacity-90`}></div>
      <div className={`fixed top-0 right-0 -z-10 h-72 w-72 rounded-full blur-3xl bg-gradient-to-br ${bgGradient} opacity-20`}></div>
      <div className={`fixed bottom-0 left-0 -z-10 h-72 w-72 rounded-full blur-3xl bg-gradient-to-br ${bgGradient} opacity-20`}></div>
      
      {children}
    </div>
  );
} 