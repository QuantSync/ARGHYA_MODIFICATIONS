'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface ScrollFastTypingProps {
  text: string;
  className?: string;
  /** Delay per character in ms. Default 12 (very fast). */
  charDelay?: number;
  /** Initial delay before animation starts in ms. Default 200 */
  startDelay?: number;
}

/**
 * Fast typewriter text that triggers on scroll.
 * Characters appear rapidly with a blinking cursor at the end.
 */
export const ScrollFastTyping: React.FC<ScrollFastTypingProps> = ({
  text,
  className = '',
  charDelay = 12,
  startDelay = 200,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (!isInView) return;

    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (charIdx >= text.length) {
        setDone(true);
        return;
      }
      charIdx++;
      setDisplayed(text.slice(0, charIdx));
      // Slight randomness for natural feel
      const delay = charDelay + Math.random() * 8;
      timer = setTimeout(typeNext, delay);
    };

    timer = setTimeout(typeNext, startDelay);

    return () => clearTimeout(timer);
  }, [isInView, text, charDelay, startDelay]);

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  // suppress unused lint warning
  void done;

  return (
    <div ref={ref} className={className} aria-label={text}>
      <span>{displayed}</span>
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          verticalAlign: 'text-bottom',
          marginLeft: '1px',
          borderRadius: '1px',
          backgroundColor: '#BF953F',
          opacity: cursorVisible ? 0.8 : 0,
          transition: 'opacity 0.1s ease',
          boxShadow: '0 0 4px rgba(191, 149, 63, 0.5)',
        }}
      />
    </div>
  );
};
