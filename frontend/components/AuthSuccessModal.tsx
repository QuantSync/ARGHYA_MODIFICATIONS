'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface AuthSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

export const AuthSuccessModal: React.FC<AuthSuccessModalProps> = ({ isOpen, onClose, user }) => {
  // Determine if new user based on timestamps
  const isNewUser = React.useMemo(() => {
    if (!user || !user.created_at || !user.last_sign_in_at) return false;
    const createdTime = new Date(user.created_at).getTime();
    const loginTime = new Date(user.last_sign_in_at).getTime();
    return Math.abs(loginTime - createdTime) < 10000; // Less than 10 seconds difference means new user
  }, [user]);

  const userName = user?.full_name || user?.username || 'User';
  // Auto-close after 4 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-sm bg-cream-50 dark:bg-stone-900 border border-emerald-500/30 dark:border-emerald-500/20 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400 shadow-inner">
              <CheckCircle size={32} />
            </div>

            <h3 className="font-serif text-2xl font-bold text-burgundy-900 dark:text-stone-100 mb-2">
              {isNewUser ? 'Congratulations!' : 'Welcome back!'}
            </h3>
            <p className="text-sm text-burgundy-800/80 dark:text-stone-400 leading-relaxed mb-1">
              {isNewUser 
                ? 'You have successfully created your account using GitHub.' 
                : 'You have successfully logged into your existing account using GitHub.'}
            </p>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full mt-2">
              Welcome aboard, {userName}!
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
