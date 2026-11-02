'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedShieldSword: React.FC = () => {
  return (
    <div className="w-20 h-20 mx-auto relative flex items-center justify-center">
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

        {/* ── SHIELD ── */}
        {/* Outer shield body */}
        <motion.path
          d="M40 8 L62 17 L62 38 C62 54 50 65 40 70 C30 65 18 54 18 38 L18 17 Z"
          className="fill-burgundy-50 dark:fill-stone-800 stroke-burgundy-800 dark:stroke-amber-400"
          strokeWidth="2"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
        />
        {/* Inner shield emblem ring */}
        <motion.path
          d="M40 18 L55 24 L55 38 C55 48 46 57 40 61 C34 57 25 48 25 38 L25 24 Z"
          className="stroke-burgundy-800/30 dark:stroke-amber-400/30"
          fill="none"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
        {/* Shield center cross emblem */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <line x1="40" y1="28" x2="40" y2="52" className="stroke-burgundy-800/40 dark:stroke-amber-400/40" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="38" x2="50" y2="38" className="stroke-burgundy-800/40 dark:stroke-amber-400/40" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>

        {/* Shield glow pulse on hit */}
        <motion.path
          d="M40 8 L62 17 L62 38 C62 54 50 65 40 70 C30 65 18 54 18 38 L18 17 Z"
          fill="none"
          className="stroke-amber-300 dark:stroke-amber-200"
          strokeWidth="2.5"
          animate={{ opacity: [0, 0.9, 0], scale: [1, 1.07, 1] }}
          transition={{ delay: 1.4, duration: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
          style={{ originX: '40px', originY: '40px' }}
        />

        {/* ── MAIN SWORD (top-right diagonal, striking down) ── */}
        {/* Blade */}
        <motion.line
          x1="67" y1="7"
          x2="34" y2="46"
          className="stroke-burgundy-800 dark:stroke-amber-300"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.45, ease: 'easeIn' }}
        />
        {/* Crossguard */}
        <motion.line
          x1="58" y1="22"
          x2="46" y2="22"
          className="stroke-burgundy-800 dark:stroke-amber-300"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.25 }}
          style={{ originX: '52px', originY: '22px' }}
        />
        {/* Hilt/Pommel */}
        <motion.rect
          x="63" y="4"
          width="7" height="9"
          rx="1.5"
          className="fill-burgundy-800 dark:fill-amber-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        />

        {/* ── SECOND ARROW coming from top-left ── */}
        <motion.g
          animate={{
            x: [-25, 0, 6],
            y: [-20, 0, -8],
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: 1.6,
            duration: 0.55,
            times: [0, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: 'easeIn',
          }}
        >
          {/* Arrow shaft */}
          <line x1="18" y1="22" x2="31" y2="34" className="stroke-burgundy-700 dark:stroke-amber-500" strokeWidth="1.8" strokeLinecap="round" />
          {/* Arrowhead */}
          <polygon points="31,34 27,33 30,30" className="fill-burgundy-700 dark:fill-amber-500" />
          {/* Arrow fletching */}
          <line x1="18" y1="22" x2="14" y2="19" className="stroke-burgundy-700 dark:stroke-amber-500" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="18" y1="22" x2="15" y2="25" className="stroke-burgundy-700 dark:stroke-amber-500" strokeWidth="1.2" strokeLinecap="round" />
        </motion.g>

        {/* ── THIRD ARROW from bottom-right ── */}
        <motion.g
          animate={{
            x: [20, 0, -7],
            y: [18, 0, 8],
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: 2.4,
            duration: 0.55,
            times: [0, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: 'easeIn',
          }}
        >
          <line x1="58" y1="52" x2="46" y2="42" className="stroke-burgundy-600 dark:stroke-amber-400" strokeWidth="1.8" strokeLinecap="round" />
          <polygon points="46,42 50,43 48,46" className="fill-burgundy-600 dark:fill-amber-400" />
          <line x1="58" y1="52" x2="62" y2="55" className="stroke-burgundy-600 dark:stroke-amber-400" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="58" y1="52" x2="61" y2="49" className="stroke-burgundy-600 dark:stroke-amber-400" strokeWidth="1.2" strokeLinecap="round" />
        </motion.g>

        {/* ── IMPACT SPARKS at sword-shield contact point ── */}
        {[
          { x1: 35, y1: 44, x2: 30, y2: 40, angle: -30 },
          { x1: 35, y1: 44, x2: 29, y2: 47, angle: 10 },
          { x1: 35, y1: 44, x2: 37, y2: 38, angle: -60 },
          { x1: 35, y1: 44, x2: 40, y2: 49, angle: 50 },
        ].map((spark, i) => (
          <motion.line
            key={i}
            x1={spark.x1} y1={spark.y1}
            x2={spark.x2} y2={spark.y2}
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0] }}
            transition={{
              delay: 1.35 + i * 0.04,
              duration: 0.35,
              repeat: Infinity,
              repeatDelay: 3.5,
            }}
            style={{ originX: `${spark.x1}px`, originY: `${spark.y1}px` }}
          />
        ))}

      </svg>
    </div>
  );
};
