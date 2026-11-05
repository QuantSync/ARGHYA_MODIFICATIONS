'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';

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

interface DrawerMenuItem {
  name: string;
  href: string;
}

const DRAWER_MENU_ITEMS: DrawerMenuItem[] = [
  { name: 'CATEGORIES', href: '/products' },
  { name: 'HOT DEALS', href: '/products?category=HotDeals' },
  { name: 'ANTI - TARNISH', href: '/products?category=AntiTarnish' },
  { name: '925 PURE SILVER', href: '/products?category=Silver' },
  { name: 'ABOUT US', href: '/about' },
  { name: 'POLICIES', href: '/policy' },
  { name: 'CONTACT US', href: '/about#contact' },
];

const drawerVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as [number,number,number,number] },
  },
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
          {/* Backdrop — tap anywhere outside to close */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 z-[1000] bg-black/60"
            style={{ willChange: 'opacity' }}
          />

          {/* Sliding Drawer */}
          <motion.aside
            key="mobile-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ willChange: 'transform' }}
            className="fixed top-0 left-0 bottom-0 z-[1001] w-[300px] max-w-[88vw] flex flex-col bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 shadow-2xl select-none"
          >
            {/* ── Header: Black bar with centred MENU + X close ── */}
            <div className="w-full bg-black text-white px-5 py-5 flex items-center justify-between shrink-0">
              <div className="w-7" />
              <h2 className="font-sans font-bold text-sm tracking-[0.3em] text-white uppercase">
                MENU
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="w-7 h-7 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors active:scale-90"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Nav Items — Rectangular Rounded-Edge Button Cards ── */}
            <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-white dark:bg-neutral-950">
              {DRAWER_MENU_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="
                    flex items-center justify-between
                    w-full px-5 py-4
                    rounded-xl
                    border border-neutral-200 dark:border-neutral-800
                    bg-white dark:bg-neutral-900
                    text-neutral-900 dark:text-neutral-100
                    hover:bg-neutral-900 hover:text-white hover:border-neutral-900
                    dark:hover:bg-white dark:hover:text-black dark:hover:border-white
                    transition-all duration-200
                    active:scale-[0.98]
                    group
                    shadow-sm hover:shadow-md
                  "
                >
                  <span className="font-sans text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                    {item.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </nav>

            {/* ── Footer: Sign In / User Account (NO Admin button) ── */}
            <div className="px-4 pb-6 pt-4 border-t border-neutral-100 dark:border-neutral-900 bg-neutral-50/80 dark:bg-neutral-900/40 shrink-0 space-y-2">
              {userLoggedIn ? (
                <>
                  {/* Profile button */}
                  <button
                    type="button"
                    onClick={() => { onOpenProfile(); onClose(); }}
                    className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:border-black dark:hover:border-white transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <User size={15} className="shrink-0 text-neutral-500" />
                      <span className="truncate">{userName || 'My Account'}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 shrink-0">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>

                  {/* Sign Out */}
                  <button
                    type="button"
                    onClick={() => { onLogout(); onClose(); }}
                    className="w-full px-5 py-2.5 text-center text-[11px] font-semibold uppercase tracking-widest text-red-600 dark:text-red-400 hover:underline transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                /* Sign In button — full-width rounded rectangular */
                <button
                  type="button"
                  onClick={() => { onOpenLogin(); onClose(); }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold tracking-[0.2em] uppercase hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                >
                  <User size={15} />
                  <span>SIGN IN</span>
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
