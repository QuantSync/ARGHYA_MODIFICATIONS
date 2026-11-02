'use client';

/**
 * Model3DHeroWidget — Interactive 3D Model with Cursor-Tracking Tilt & Zoom-In Pop-Out Effect.
 *
 * When the user moves the cursor over the model's body:
 * - 3D Perspective Tilt smoothly tracks mouse position
 * - Zooms in (scale: 1.12, translateZ: 80px) as if emerging out of the screen
 * - Dynamic depth drop-shadow illuminates the subject against the dark hero background
 */

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Model3DHeroWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coords (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for responsive, physical feel
  const springConfig = { damping: 20, stiffness: 260, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation transforms
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-end justify-end cursor-pointer overflow-visible select-none ml-auto"
      style={{ perspective: 1200 }}
    >
      {/* Background ambient lighting/depth glow that reacts on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.5 : 0.22,
          scale: isHovered ? 1.15 : 0.95,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-amber-500/25 via-white/10 to-amber-200/10 blur-3xl pointer-events-none"
      />

      {/* 3D Popping Model Body Container - Anchored Flush to Rightmost Edge */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
          transformOrigin: 'right bottom',
        }}
        animate={{
          scale: isHovered ? 1.08 : 1,
          z: isHovered ? 70 : 0,
        }}
        transition={{
          scale: { type: 'spring', damping: 22, stiffness: 240 },
          z: { type: 'spring', damping: 22, stiffness: 240 },
        }}
        className="relative w-full h-full flex items-end justify-end"
      >
        <div
          className="relative w-full h-full transition-[filter] duration-300"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 35px rgba(255, 255, 255, 0.22))'
              : 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.75))',
          }}
        >
          <Image
            src="/images/hero_model_cutout.png"
            alt="ARGHYA Luxury Jewelry Model"
            fill
            priority
            className="object-cover object-right-bottom transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>

        {/* Floating Sparkle on Butterfly Pendant */}
        <motion.div
          animate={{
            opacity: isHovered ? [0.6, 1, 0.6] : 0.4,
            scale: isHovered ? [1, 1.3, 1] : 1,
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: 'easeInOut',
          }}
          className="absolute right-[44%] top-[20%] pointer-events-none hidden md:block"
          style={{ transform: 'translateZ(90px)' }}
        >
          <span className="text-white text-xs drop-shadow-[0_0_10px_rgba(255,255,255,0.95)]">✦</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Model3DHeroWidget;

