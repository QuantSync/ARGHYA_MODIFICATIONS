'use client';

import React, { useEffect, useState, useRef } from 'react';

interface HeroTypingTextProps {
  text: string;
  /** Delay (ms) before animation starts. Default 1200ms to let hero image load first. */
  startDelay?: number;
  className?: string;
  /**
   * Speed multiplier for typing. 1.0 = default speed, 0.2 = 5× faster.
   * Values < 1 make typing faster; > 1 make it slower.
   */
  speedMultiplier?: number;
}

// Each character in a word gets a slightly randomised per-char delay
// to simulate realistic human typing (faster in the middle, slower at
// word boundaries and punctuation).
function getCharDelay(char: string, wordIdx: number): number {
  // Base typing speed: 38-72ms per character
  const base = 38 + Math.random() * 34;
  // Punctuation and spaces have longer natural pauses
  if (char === ',' || char === '.') return base + 90 + Math.random() * 60;
  if (char === ' ') return base + 20 + Math.random() * 30;
  // Slight variation per word index (some words typed faster/slower)
  const wordFactor = wordIdx % 3 === 0 ? 1.25 : wordIdx % 3 === 1 ? 0.85 : 1.0;
  return base * wordFactor;
}

// Cursor cycles through these colours
const CURSOR_COLOURS = [
  '#FCF6BA', // ivory-gold
  '#BF953F', // antique gold
  '#8B0000', // deep crimson
  '#FBBF24', // amber
  '#F5EEE6', // off-white
];

export const HeroTypingText: React.FC<HeroTypingTextProps> = ({
  text,
  startDelay = 1200,
  className = '',
  speedMultiplier = 1.0,
}) => {
  const [displayed, setDisplayed] = useState('');
  const [cursorColorIdx, setCursorColorIdx] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typing effect
  useEffect(() => {
    let charIdx = 0;
    let wordIdx = 0;

    const scheduleNext = (delay: number) => {
      animRef.current = setTimeout(() => {
        if (charIdx >= text.length) {
          setDone(true);
          return;
        }
        const char = text[charIdx];
        if (char === ' ') wordIdx++;
        setDisplayed(text.slice(0, charIdx + 1));
        charIdx++;
        scheduleNext(getCharDelay(char, wordIdx) * speedMultiplier);
      }, delay);
    };

    const startTimer = setTimeout(() => {
      scheduleNext(0);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (animRef.current) clearTimeout(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, startDelay]);

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  // Cursor colour cycle (every ~800ms)
  useEffect(() => {
    const colourInterval = setInterval(() => {
      setCursorColorIdx((idx) => (idx + 1) % CURSOR_COLOURS.length);
    }, 800);
    return () => clearInterval(colourInterval);
  }, []);

  // suppress unused warning
  void done;

  const cursorColor = CURSOR_COLOURS[cursorColorIdx];

  return (
    <span
      className={`inline ${className}`}
      aria-label={text}
      role="text"
    >
      <span>{displayed}</span>

      {/* Slim multi-colour blinking cursor */}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.1em',
          verticalAlign: 'text-bottom',
          marginLeft: '2px',
          borderRadius: '1px',
          backgroundColor: cursorColor,
          opacity: cursorVisible ? 1 : 0,
          transition: 'opacity 0.1s ease, background-color 0.6s ease',
          boxShadow: `0 0 6px ${cursorColor}88`,
        }}
      />
    </span>
  );
};
