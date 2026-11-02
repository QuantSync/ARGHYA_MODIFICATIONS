'use client';

import React, { useState, useEffect, useRef } from 'react';    // used to import the rect library
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';   // used to import the lucid template
import { useRouter } from 'next/navigation';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_CREDENTIALS: Record<string, string> = {
  anubhavsinghrajput: 'Admin321',   // admin details    : Anubhav Singh Rajput
  mohnishgaur: 'Admin321',      // admin details : Mohnish Gaur
  kanishkverma: 'Admin321',      // admin details : Kanishk Verma
};

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.15, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.2,
    y: 30,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null); // adminsitravive access

  // Focus username on open
  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setError('');
      setSuccess(false);
      setTimeout(() => usernameRef.current?.focus(), 350);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmedUser = username.trim().toLowerCase();

    if (!ADMIN_CREDENTIALS[trimmedUser]) {
      setError('Admin username not recognised. Access denied.');
      return;
    }
    if (ADMIN_CREDENTIALS[trimmedUser] !== password) {
      setError('Incorrect password. Access denied.');
      return;
    }

    setLoading(true);
    // Simulate auth delay for realism
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);

    // Store admin session
    localStorage.setItem('arghya_admin_user', trimmedUser);
    localStorage.setItem('arghya_admin_session', 'true');

    // Navigate with cinematic delay
    await new Promise((r) => setTimeout(r, 800));
    onClose();
    router.push('/admin');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred backdrop */}
          <motion.div
            key="admin-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md"
          />

          {/* Bubble pop modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="admin-modal"
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto w-full max-w-md"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 dark:border-amber-400/40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-xl">

                {/* Animated gold ring top accent */}
                <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-burgundy-700/20 blur-3xl pointer-events-none" />

                {/* Header */}
                <div className="relative bg-gradient-to-r from-stone-950 via-burgundy-950 to-stone-950 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 p-6 border-b border-amber-500/20">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-amber-300 hover:bg-white/10 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <div className= " flex flex-col items-center gap-3 ">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                      className= " flex items-center justify-center w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/40"
                    >
                      <ShieldCheck size={28} className="text-amber-400" />
                    </motion.div>
                    <div className="text-center">
                      <h2 className="font-serif text-xl font-bold tracking-widest text-amber-300">
                        ADMIN ACCESS
                      </h2>
                      <p className="text-xs text-stone-400 tracking-wider mt-1">
                        Arghya Collections · Secure Portal
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                  {/* Success overlay */}
                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-950/90 rounded-3xl"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          className="text-amber-400 mb-4"
                        > //   cd frontend

                          <ShieldCheck size={52} />
                        </motion.div>
                        <p className="text-amber-300 font-bold text-lg tracking-widest">ACCESS GRANTED</p>
                        <p className="text-stone-400 text-xs mt-2">Redirecting to Admin Panel…</p>  // bold text accumulation font
                        {/* Cinematic scan line */}
                        <motion.div
                          animate={{ y: [-80, 80] }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                          className="absolute left-0 right-0 h-[2px] bg-amber-400/40 blur-[1px]" // position gradient np
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Username */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                      Admin Username
                    </label>
                    <input
                      ref={usernameRef}
                      type="text"
                      value={username}
                      onChange={(e) => { setUsername(e.target.value); setError(''); }}
                      autoComplete="off"
                      placeholder="Enter admin username"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPwd ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }} // be con set password upgration network
                        autoComplete="current-password"
                        placeholder="Enter password"     // save current state of password auth cd frontend
                        className="w-full px-4 py-3 pr-11 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg -stone-900 text-stone-900 dark:text-stone-100 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-500 transition-colors"
                      >
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40"
                      >
                        <AlertCircle size={14} className="text-red-500 shrink-0" />
                        <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading || success || !username || !password}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-stone-900 via-burgundy-900 to-stone-900 dark:from-amber-500 dark:to-amber-400 text-amber-300 dark:text-stone-950 border border-amber-500/30 dark:border-transparent shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full"
                        />
                        Authenticating…
                      </span>
                    ) : 'Enter Admin Panel'}
                  </motion.button>

                  <p className="text-center text-[10px] text-stone-400 tracking-wider">
                    Authorised personnel only · Access is monitored
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
