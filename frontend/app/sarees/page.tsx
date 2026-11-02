'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SareesComingSoonPage() {
  const text = "COMING SOON";
  const letters = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream-50 dark:bg-stone-950 px-4">
      <motion.div
        className="flex space-x-2 md:space-x-4 lg:space-x-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-widest luxury-text-gradient uppercase select-none"
            style={{ 
              fontFamily: "'Bodoni Moda', 'Playfair Display', Georgia, serif",
              lineHeight: 1 
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
