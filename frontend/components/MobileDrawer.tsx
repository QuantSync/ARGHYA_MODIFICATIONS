'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, ShoppingBag, Sparkles, User, Shield, FileText, Info, Scale } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminLogin: () => void;
  onOpenLogin: () => void;
  userLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
  onOpenProfile: () => void;
}

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'NAVRATRI SPECIAL', href: '/products?category=Navratri', icon: Sparkles },
  { name: 'ETHNIC KURTIS', href: '/products?category=Kurti', icon: Sparkles },
  { name: 'SKIRTS', href: '/products?category=Skirt', icon: Sparkles },
  { name: 'SAREES', href: '/sarees', icon: Sparkles },
  { name: 'MODERN', href: '/products?category=Modern', icon: ShoppingBag },
  { name: 'Policy', href: '/policy', icon: FileText },
];

const drawerVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1], // Native-feel buttery smooth cubic-bezier
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const itemVariants = {
  hidden: { x: -12, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.05 + i * 0.025,
      duration: 0.18,
      ease: 'easeOut',
    },
  }),
};

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenAdminLogin,
  onOpenLogin,
  userLoggedIn,
  userName,
  onLogout,
  onOpenProfile,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Smooth GPU-composited backdrop without expensive dynamic Gaussian blur */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 z-[1000] bg-black/65"
            style={{ willChange: 'opacity' }}
          />

          {/* Left Sliding Drawer — Hardware-accelerated with will-change */}
          <motion.aside
            key="mobile-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ willChange: 'transform' }}
            className="fixed top-0 left-0 bottom-0 z-[1001] w-72 max-w-[85vw] flex flex-col bg-[#1A0408] dark:bg-stone-950 border-r border-amber-500/20 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-amber-500/15">
              <div>
                {/* ARGHYA logo in Bodoni Moda – luxury serif */}
                <span
                  className="text-2xl font-bold tracking-widest luxury-text-gradient"
                  style={{ fontFamily: "'Bodoni Moda', 'Playfair Display', Georgia, serif", fontWeight: 700 }}
                >
                  ARGHYA
                </span>
                <p className="text-[9px] uppercase tracking-[0.25em] text-amber-300/70 -mt-0.5">
                  SLAY EVERYDAY
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-amber-200 dark:text-stone-300 hover:bg-amber-500/15 dark:hover:bg-amber-500/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-4 py-5 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-widest text-[#F0E6D8] dark:text-stone-200 hover:bg-amber-500/10 hover:text-amber-200 dark:hover:text-amber-300 transition-all group"
                  >
                    <item.icon
                      size={17}
                      className="text-amber-300 dark:text-amber-400 group-hover:scale-110 transition-transform flex-shrink-0"
                    />
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer actions: Sign In, About Us, Terms & Conditions, Admin */}
            <div className="px-4 pb-6 space-y-2 border-t border-amber-500/15 pt-4">
              {/* 1. User Auth / Sign In */}
              {userLoggedIn ? (
                <motion.div custom={6} variants={itemVariants} initial="hidden" animate="visible">
                  <button
                    onClick={() => { onOpenProfile(); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-amber-500/8 border border-amber-500/20 hover:bg-amber-500/15 transition-colors"
                  >
                    <User size={16} className="text-amber-300 dark:text-amber-400 flex-shrink-0" />
                    <span className="text-xs font-semibold text-[#F0E6D8] dark:text-amber-300 truncate max-w-[140px]">
                      {userName}
                    </span>
                  </button>
                  <button
                    onClick={() => { onLogout(); onClose(); }}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest text-red-400 dark:text-red-400 hover:bg-red-950/30 transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </motion.div>
              ) : (
                <motion.div custom={6} variants={itemVariants} initial="hidden" animate="visible">
                  <button
                    onClick={() => { onOpenLogin(); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-widest text-[#F0E6D8] dark:text-stone-200 hover:bg-amber-500/10 hover:text-amber-200 dark:hover:text-amber-300 transition-all"
                  >
                    <User size={17} className="text-amber-300 dark:text-amber-400 flex-shrink-0" />
                    Sign In
                  </button>
                </motion.div>
              )}

              {/* 2. About Us */}
              <motion.div custom={7} variants={itemVariants} initial="hidden" animate="visible">
                <Link
                  href="/about"
                  onClick={onClose}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-widest text-[#F0E6D8] dark:text-stone-200 hover:bg-amber-500/10 hover:text-amber-200 dark:hover:text-amber-300 transition-all"
                >
                  <Info size={17} className="text-amber-300 dark:text-amber-400 flex-shrink-0" />
                  About Us
                </Link>
              </motion.div>

              {/* 3. Terms & Conditions */}
              <motion.div custom={8} variants={itemVariants} initial="hidden" animate="visible">
                <Link
                  href="/terms"
                  onClick={onClose}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-widest text-[#F0E6D8] dark:text-stone-200 hover:bg-amber-500/10 hover:text-amber-200 dark:hover:text-amber-300 transition-all"
                >
                  <Scale size={17} className="text-amber-300 dark:text-amber-400 flex-shrink-0" />
                  Terms & Conditions
                </Link>
              </motion.div>

              {/* 4. Admin Button */}
              <motion.div custom={9} variants={itemVariants} initial="hidden" animate="visible">
                <button
                  onClick={() => { onOpenAdminLogin(); onClose(); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-widest text-amber-300 dark:text-amber-300 hover:bg-amber-500/10 border border-amber-400/25 dark:border-amber-500/20 transition-all"
                >
                  <Shield size={17} className="text-amber-400 dark:text-amber-400 flex-shrink-0" />
                  Admin
                </button>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
