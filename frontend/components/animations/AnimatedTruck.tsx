'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedTruck: React.FC = () => {
  return (
    <div className="w-24 h-20 mx-auto relative flex items-center justify-center overflow-visible">
      <svg viewBox="0 0 96 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">

        {/* ── ROAD ── */}
        {/* Road surface */}
        <rect x="0" y="45" width="96" height="11" rx="0"
          className="fill-stone-200 dark:fill-stone-700"
        />
        {/* Road center dashed line — animates scrolling */}
        <motion.g animate={{ x: [-20, 0] }} transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}>
          {[0, 20, 40, 60, 80, 100].map((x) => (
            <rect key={x} x={x} y="49.5" width="12" height="2" rx="1"
              className="fill-amber-300/60 dark:fill-amber-400/50"
            />
          ))}
        </motion.g>
        {/* Road edge lines */}
        <line x1="0" y1="45" x2="96" y2="45" className="stroke-stone-300 dark:stroke-stone-600" strokeWidth="1" />
        <line x1="0" y1="56" x2="96" y2="56" className="stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.5" />

        {/* ── SPEED LINES (behind truck) ── */}
        {[15, 20, 25, 30].map((y, i) => (
          <motion.line
            key={i}
            x1={i % 2 === 0 ? 3 : 0}
            y1={y}
            x2={18}
            y2={y}
            className="stroke-burgundy-800/30 dark:stroke-amber-400/30"
            strokeWidth={i === 1 || i === 2 ? 1.5 : 0.8}
            strokeLinecap="round"
            animate={{ x: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.35, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
          />
        ))}

        {/* ── TRUCK BODY (bounces on road) ── */}
        <motion.g
          animate={{ y: [0, -1.2, 0, -0.6, 0] }}
          transition={{ duration: 0.32, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Cargo box */}
          <rect x="20" y="14" width="44" height="28" rx="2"
            className="fill-cream-50 dark:fill-stone-800 stroke-burgundy-800 dark:stroke-amber-400"
            strokeWidth="2"
          />
          {/* Cargo box vertical panels */}
          <line x1="38" y1="14" x2="38" y2="42" className="stroke-burgundy-800/20 dark:stroke-amber-400/20" strokeWidth="1" />
          <line x1="52" y1="14" x2="52" y2="42" className="stroke-burgundy-800/20 dark:stroke-amber-400/20" strokeWidth="1" />
          {/* Cargo box top highlight stripe */}
          <rect x="20" y="14" width="44" height="5" rx="2"
            className="fill-burgundy-800 dark:fill-amber-500"
          />
          {/* ARGHYA text on cargo */}
          <text x="27" y="32" fontSize="6" fontWeight="bold" fontFamily="serif" letterSpacing="1"
            className="fill-black dark:fill-white font-bold">ARGHYA</text>
          {/* Cargo door handle */}
          <rect x="59" y="26" width="1.5" height="8" rx="0.75"
            className="fill-burgundy-800/40 dark:fill-amber-400/40"
          />

          {/* Cab */}
          <path d="M64 20 L64 42 L82 42 L82 30 L74 20 Z"
            className="fill-burgundy-50 dark:fill-stone-700 stroke-burgundy-800 dark:stroke-amber-400"
            strokeWidth="2" strokeLinejoin="round"
          />
          {/* Cab window */}
          <path d="M66 22 L66 32 L80 32 L80 30 L73 22 Z"
            className="fill-sky-200/70 dark:fill-sky-700/40 stroke-burgundy-800/50 dark:stroke-amber-400/40"
            strokeWidth="1"
          />
          {/* Window glare */}
          <line x1="68" y1="23" x2="71" y2="31"
            className="stroke-white/50 dark:stroke-white/20" strokeWidth="1" strokeLinecap="round"
          />
          {/* Front grille / bumper */}
          <rect x="80" y="36" width="4" height="6" rx="1"
            className="fill-burgundy-800 dark:fill-amber-500"
          />
          {[37, 39, 41].map((y) => (
            <line key={y} x1="80" y1={y} x2="84" y2={y}
              className="stroke-burgundy-200 dark:stroke-stone-600" strokeWidth="0.6"
            />
          ))}
          {/* Headlight glow */}
          <motion.circle cx="83" cy="35" r="2.5"
            className="fill-amber-200 dark:fill-amber-300"
            animate={{ opacity: [0.6, 1, 0.6], r: [2.5, 3, 2.5] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Headlight beam */}
          <motion.path d="M84 34 L96 30 L96 40 Z"
            fill="rgba(253,230,138,0.15)"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Exhaust pipe */}
          <line x1="22" y1="42" x2="20" y2="42" className="stroke-burgundy-800 dark:stroke-amber-400" strokeWidth="2" strokeLinecap="round" />
          {/* Exhaust puffs */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={18 - i * 5}
              cy={40}
              r={1.5 + i * 0.8}
              className="fill-stone-300/60 dark:fill-stone-500/40"
              animate={{ x: [-4, -12], opacity: [0.8, 0], r: [1.5 + i * 0.8, 3 + i] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2, ease: 'easeOut' }}
            />
          ))}

          {/* ── REAR WHEEL ── */}
          <circle cx="34" cy="44" r="7"
            className="fill-stone-800 dark:fill-stone-900 stroke-burgundy-800 dark:stroke-amber-400"
            strokeWidth="1.5"
          />
          <circle cx="34" cy="44" r="4"
            className="fill-stone-600 dark:fill-stone-700 stroke-burgundy-800/60 dark:stroke-amber-400/60"
            strokeWidth="1"
          />
          <motion.g style={{ originX: '34px', originY: '44px' }} animate={{ rotate: -360 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}>
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const r = Math.PI * deg / 180;
              return <line key={deg} x1={34 + 2 * Math.sin(r)} y1={44 - 2 * Math.cos(r)} x2={34 + 4.5 * Math.sin(r)} y2={44 - 4.5 * Math.cos(r)} className="stroke-burgundy-800/70 dark:stroke-amber-400/70" strokeWidth="1.2" strokeLinecap="round" />;
            })}
          </motion.g>

          {/* ── FRONT WHEEL ── */}
          <circle cx="70" cy="44" r="7"
            className="fill-stone-800 dark:fill-stone-900 stroke-burgundy-800 dark:stroke-amber-400"
            strokeWidth="1.5"
          />
          <circle cx="70" cy="44" r="4"
            className="fill-stone-600 dark:fill-stone-700 stroke-burgundy-800/60 dark:stroke-amber-400/60"
            strokeWidth="1"
          />
          <motion.g style={{ originX: '70px', originY: '44px' }} animate={{ rotate: -360 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}>
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const r = Math.PI * deg / 180;
              return <line key={deg} x1={70 + 2 * Math.sin(r)} y1={44 - 2 * Math.cos(r)} x2={70 + 4.5 * Math.sin(r)} y2={44 - 4.5 * Math.cos(r)} className="stroke-burgundy-800/70 dark:stroke-amber-400/70" strokeWidth="1.2" strokeLinecap="round" />;
            })}
          </motion.g>
        </motion.g>

      </svg>
    </div>
  );
};
