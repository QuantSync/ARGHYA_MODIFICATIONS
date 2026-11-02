'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useInView } from 'framer-motion';

interface ScrollTypingHeadingProps {
  text: string;
  className?: string;
  /** Delay per character in ms. Default 45 */
  charDelay?: number;
  /** Initial delay before animation starts in ms. Default 0 */
  startDelay?: number;
  /** Tag to render: h1, h2, h3, etc. Default 'h3' */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

/**
 * Each letter of the heading fades in one-by-one with a subtle upward drift
 * when the component scrolls into the viewport.
 */
export const ScrollTypingHeading: React.FC<ScrollTypingHeadingProps> = ({
  text,
  className = '',
  charDelay = 45,
  startDelay = 0,
  as: Tag = 'h3',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  const [visibleCount, setVisibleCount] = useState(0);

  // Split text into individual characters (preserve spaces)
  const chars = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    if (!isInView) return;

    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const animateNext = () => {
      if (charIdx >= chars.length) return;
      charIdx++;
      setVisibleCount(charIdx);
      timer = setTimeout(animateNext, charDelay);
    };

    // Initial start delay
    timer = setTimeout(animateNext, startDelay);

    return () => clearTimeout(timer);
  }, [isInView, chars, charDelay, startDelay]);

  return (
    <div ref={ref}>
      <Tag className={className} aria-label={text}>
        {chars.map((char, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: i < visibleCount ? 1 : 0,
              transform: i < visibleCount ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              minWidth: char === ' ' ? '0.3em' : undefined,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </Tag>
    </div>
  );
};
