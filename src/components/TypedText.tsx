'use client';

import { useState, useEffect, useRef } from 'react';

interface TypedTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export default function TypedText({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1000
}: TypedTextProps) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  
  const currentWord = words[wordIndex];
  const typingSpeedRef = useRef(typingSpeed);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Clear the waiting state
      if (isWaiting) {
        setIsWaiting(false);
        setIsDeleting(true);
        typingSpeedRef.current = deletingSpeed;
        return;
      }
      
      // Handle deleting
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 1) {
          setIsDeleting(false);
          // Move to next word
          setWordIndex((prev) => (prev + 1) % words.length);
          typingSpeedRef.current = typingSpeed;
        }
        return;
      }
      
      // Handle typing
      setText(currentWord.substring(0, text.length + 1));
      
      // If we've completed the word, wait before deleting
      if (text.length === currentWord.length - 1) {
        setIsWaiting(true);
        typingSpeedRef.current = delayBetweenWords;
      }
    }, typingSpeedRef.current);
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, isWaiting, currentWord, deletingSpeed, typingSpeed, delayBetweenWords, words]);
  
  return (
    <span 
      className="inline-flex items-center py-1"
      style={{ lineHeight: '1.4', minHeight: '1.4em' }}
    >
      <span className="mx-1">&lt;</span>
      <span style={{ display: 'inline-block', minHeight: '1.4em' }}>
        {text}
      </span>
      <span
        className="inline-block w-[2px] h-[1em] bg-pink-500 animate-blink"
        style={{
          boxShadow: '0 0 5px #d946ef, 0 0 10px rgba(217, 70, 239, 0.5)',
          transform: 'translateY(0.05em)',
          marginLeft: '1px',
          marginRight: '1px'
        }}
      ></span>
      <span className="mx-1">&gt;</span>
    </span>
  );
} 