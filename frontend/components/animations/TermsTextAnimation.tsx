'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LetterFadeHeadingProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

/**
 * Letter-by-letter fast fade-in animation for Headings.
 * Each letter smoothly fades in and rises slightly with a blur-to-clear effect.
 */
export const LetterFadeHeading: React.FC<LetterFadeHeadingProps> = ({
  text,
  className = '',
  delayOffset = 0,
}) => {
  const characters = Array.from(text);

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.18,
            delay: delayOffset + index * 0.015, // Fast letter staggered delay
            ease: 'easeOut',
          }}
          className={char === ' ' ? 'whitespace-pre' : 'inline-block'}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

interface SuperFastTypingTextProps {
  text: string;
  className?: string;
  speedMs?: number;
}

/**
 * Super fast typing animation for guidelines and postulates text.
 * Types out characters rapidly while smoothly fading in each chunk,
 * ensuring high performance without layout shifts or text overflow.
 */
export const SuperFastTypingText: React.FC<SuperFastTypingTextProps> = ({
  text,
  className = '',
  speedMs = 8,
}) => {
  const [displayedLength, setDisplayedLength] = useState(0);

  useEffect(() => {
    setDisplayedLength(0);
    const totalLength = text.length;
    if (totalLength === 0) return;

    // Fast character step (reveals 3-5 chars per interval for super crisp typing feel)
    const interval = setInterval(() => {
      setDisplayedLength((prev) => {
        const next = prev + 4;
        if (next >= totalLength) {
          clearInterval(interval);
          return totalLength;
        }
        return next;
      });
    }, speedMs);

    return () => clearInterval(interval);
  }, [text, speedMs]);

  const visibleText = text.slice(0, displayedLength);
  const isTyping = displayedLength < text.length;

  return (
    <span className={`relative leading-relaxed ${className}`}>
      {visibleText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.3 }}
          className="inline-block w-[2px] h-[1.1em] bg-burgundy-700 dark:bg-amber-400 ml-0.5 align-middle"
        />
      )}
    </span>
  );
};
