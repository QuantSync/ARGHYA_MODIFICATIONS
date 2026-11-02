'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Truck } from 'lucide-react';
import { RazorpayWaterDropAnimation } from './animations/RazorpayWaterDropAnimation';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeIn" }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

const AnimatedText = ({ text, className, style }: { text: string, className?: string, style?: any }) => (
  <span className={className} style={style}>
    {text.split('').map((char, i) => (
      <motion.span 
        key={i} 
        variants={letterVariants} 
        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

const PARTNERS = [
  {
    key: 'razorpay',
    line2: 'Payment Partner',
    line3: 'Razorpay',
    colorStyle: {
      background: 'linear-gradient(90deg, #A855F7, #D8B4FE)', // Purple highlight
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    logoSrc: '/logos/razorpay.png',
    badges: [
      { icon: <ShieldCheck size={16} className="text-purple-500" />, text: '100% Secure Checkout' },
      { icon: <Lock size={16} className="text-purple-400" />, text: 'End-to-End Encrypted' }
    ]
  },
  {
    key: 'ekart',
    line2: 'Shipping Partner',
    line3: 'ekart',
    colorStyle: {
      background: 'linear-gradient(90deg, #EAB308, #FDE047)', // Golden yellow highlight
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    logoSrc: '/logos/ekart.png',
    badges: [
      { icon: <Truck size={16} className="text-yellow-500" />, text: 'Fast & Reliable Delivery' },
      { icon: <ShieldCheck size={16} className="text-yellow-400" />, text: 'Safe Handling Guaranteed' }
    ]
  }
];

export const RazorpayPartnerWidget: React.FC = () => {
  const [partnerIndex, setPartnerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPartnerIndex((prev) => (prev + 1) % PARTNERS.length);
    }, 6000); // 6 seconds gap between switches
    return () => clearInterval(interval);
  }, []);

  const activePartner = PARTNERS[partnerIndex];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.75, y: 80 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.25, damping: 22, stiffness: 70 }}
        className="relative w-full rounded-[2rem] overflow-hidden flex flex-col justify-center min-h-[500px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] transition-colors duration-500"
        style={{
          background: 'linear-gradient(135deg, #09090b 0%, #171717 100%)', // Very dark aesthetic for the canvas base
          willChange: 'transform, opacity, filter',
        }}
      >
        {/* The Animated Wave Layer */}
        <RazorpayWaterDropAnimation />

        {/* Content Overlay */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center px-8 md:px-16 py-12 h-full">
          
          {/* Left Side: Typography & Buttons */}
          <div className="max-w-md w-full text-left flex flex-col space-y-6 h-[250px] justify-center">
            <AnimatePresence mode="wait">
              <motion.h2 
                key={`title-${activePartner.key}`}
                className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.1]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <AnimatedText text="Our Official" /><br />
                <AnimatedText 
                  text={activePartner.line2} 
                  className="font-semibold"
                  style={activePartner.colorStyle}
                /><br />
                <AnimatedText text={activePartner.line3} />
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div 
                key={`badges-${activePartner.key}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm transition-transform hover:scale-105 cursor-default shadow-md">
                  {activePartner.badges[0].icon}
                  <span>{activePartner.badges[0].text}</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-sm backdrop-blur-md border border-white/10 transition-colors hover:bg-white/20 cursor-default shadow-md">
                  {activePartner.badges[1].icon}
                  <span>{activePartner.badges[1].text}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Logos */}
          <div className="flex-1 w-full flex justify-center md:justify-end items-center mt-12 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`logo-${activePartner.key}`}
                initial={{ opacity: 0, scale: 0.8, x: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, x: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                className="bg-white/10 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center w-64 h-32 md:w-80 md:h-48"
              >
                <img 
                  src={activePartner.logoSrc} 
                  alt={`${activePartner.line3} Logo`} 
                  className={`max-w-full max-h-full object-contain drop-shadow-lg transition-all ${
                    activePartner.key === 'ekart' ? 'mix-blend-multiply filter brightness-110 contrast-125' : ''
                  }`}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
};
