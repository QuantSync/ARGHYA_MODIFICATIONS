'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Tag, Clock } from 'lucide-react';

export const FestiveSaleBanner = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-8 group shadow-xl">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 dark:from-amber-600 dark:via-burgundy-600 dark:to-amber-600 bg-[length:200%_auto]"
        animate={{
          backgroundPosition: ['0% center', '200% center']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Floating Particles/Glow Effects */}
      <div className="absolute inset-0 opacity-40">
        {[
          { id: 1, x: ['10%', '30%', '10%'], y: ['20%', '80%', '20%'], duration: 7 },
          { id: 2, x: ['80%', '40%', '80%'], y: ['10%', '60%', '10%'], duration: 9 },
          { id: 3, x: ['40%', '90%', '40%'], y: ['70%', '20%', '70%'], duration: 6 },
          { id: 4, x: ['20%', '70%', '20%'], y: ['90%', '30%', '90%'], duration: 8 },
          { id: 5, x: ['90%', '10%', '90%'], y: ['80%', '40%', '80%'], duration: 10 },
          { id: 6, x: ['50%', '80%', '50%'], y: ['30%', '90%', '30%'], duration: 7 }
        ].map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-12 h-12 bg-white rounded-full blur-xl"
            initial={{
              x: p.x[0],
              y: p.y[0],
              scale: 0.5,
              opacity: 0.2
            }}
            animate={{
              x: p.x,
              y: p.y,
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Shimmer overlay effect */}
      <motion.div
        className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
        initial={{ x: '-150%' }}
        animate={{ x: '300%' }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-[2px]">
        
        {/* Left Side: Badge & Title */}
        <div className="flex items-center gap-4">
          <motion.div 
            className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-md border border-white/30 text-white shadow-lg"
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Sparkles size={24} className="text-white drop-shadow-md" />
          </motion.div>
          
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">
              The Grand Arghya
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
              Festive Sale Event
            </h3>
          </div>
        </div>

        {/* Center/Right: Offer Details & Countdown */}
        <div className="flex items-center gap-6">
          <motion.div 
            className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md border border-white/30 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Tag size={18} className="text-white drop-shadow-sm" />
            <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">
              Up to <span className="text-amber-200 text-lg">50%</span> OFF
            </span>
          </motion.div>

          <motion.div 
            className="hidden sm:flex items-center gap-2 bg-stone-900/40 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          >
            <Clock size={16} className="text-amber-300" />
            <span className="text-stone-100 font-mono font-bold text-sm tracking-wider">
              Limited Time Only
            </span>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
};
