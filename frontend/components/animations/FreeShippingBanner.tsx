'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck } from 'lucide-react';

const MESSAGES = [
  'Free Shipping',
  'Pan India Delivery',
  'No Minimum Order',
  'Express Dispatch',
  'Free Returns',
  'Doorstep Delivery',
];

// Rainbow palette cycles continuously
const RAINBOW = [
  '#FF6B6B', // coral red
  '#FF9F43', // saffron orange
  '#FECA57', // golden yellow
  '#48DBFB', // sky blue
  '#FF9FF3', // soft pink
  '#54A0FF', // royal blue
  '#5F27CD', // deep violet
  '#1DD1A1', // mint green
  '#FF6B6B', // loop back
];

function useTypingText(fullText: string) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing');

  useEffect(() => {
    setDisplayed('');
    setPhase('typing');
  }, [fullText]);

  useEffect(() => {
    if (phase === 'typing') {
      if (displayed.length < fullText.length) {
        const t = setTimeout(() => setDisplayed(fullText.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pause'), 1800);
        return () => clearTimeout(t);
      }
    }
    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('erasing'), 400);
      return () => clearTimeout(t);
    }
    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      }
      // done erasing — parent will swap message
    }
  }, [displayed, phase, fullText]);

  return { displayed, done: phase === 'erasing' && displayed.length === 0 };
}

export const FreeShippingTag: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const { displayed, done } = useTypingText(MESSAGES[msgIdx]);

  // Advance message when erasing finishes
  useEffect(() => {
    if (done) {
      setMsgIdx((i) => (i + 1) % MESSAGES.length);
    }
  }, [done]);

  // Cycle rainbow colour every 500ms independently
  useEffect(() => {
    const t = setInterval(() => setColorIdx((i) => (i + 1) % (RAINBOW.length - 1)), 500);
    return () => clearInterval(t);
  }, []);

  return (
    /**
     * Layout strategy:
     *  - On md+ (desktop): fixed narrow vertical strip on the right side of its parent
     *    → parent must be `relative`, this is `absolute right-0 top-0`
     *  - On mobile: normal inline block at the bottom of the flow
     *
     * We export a wrapper <FreeShippingTagWrapper> that handles positioning.
     */
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="
        inline-flex items-center gap-2
        px-3 py-2
        rounded-xl
        bg-white/80 dark:bg-stone-900/80
        border border-stone-200/80 dark:border-stone-700/60
        backdrop-blur-sm
        shadow-sm
        whitespace-nowrap
        select-none
      "
    >
      {/* Animated truck icon */}
      <motion.div
        animate={{ x: [-2, 2, -2] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Truck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: RAINBOW[colorIdx] }} />
      </motion.div>

      {/* Typing text with rainbow colour */}
      <span className="text-[11px] font-bold font-mono tracking-wide leading-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={MESSAGES[msgIdx]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ color: RAINBOW[colorIdx] }}
            transition={{ duration: 0.15 }}
          >
            {displayed}
          </motion.span>
        </AnimatePresence>
        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ color: RAINBOW[colorIdx] }}
          className="ml-px"
        >
          |
        </motion.span>
      </span>
    </motion.div>
  );
};
