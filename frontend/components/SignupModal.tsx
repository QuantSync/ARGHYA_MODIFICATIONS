'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, UserPlus, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { api } from '../lib/api';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSignupSuccess: (user: any) => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSignupSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/register', {
        fullName,
        email,
        phone,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('arghya_token', res.data.data.token);
        onSignupSuccess(res.data.data.user);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(`Failed to sign up with ${provider}: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Signup Card Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-cream-100 dark:bg-stone-900 border border-burgundy-800/20 dark:border-amber-500/30 text-burgundy-900 dark:text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-burgundy-700 dark:text-amber-400 font-bold">Join ARGHYA Atelier</span>
                <h2 className="font-serif text-3xl font-bold luxury-text-gradient mt-0.5">Create Account</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-burgundy-800/60 dark:text-stone-400 hover:text-burgundy-900 dark:hover:text-amber-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-600/50 text-rose-800 dark:text-rose-200 text-xs p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-burgundy-800/70 dark:text-stone-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-burgundy-800/40 dark:text-stone-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Anubhab Customer"
                    className="w-full bg-white dark:bg-stone-800 border border-burgundy-800/15 dark:border-stone-700 rounded-xl pl-10 pr-4 py-2 text-xs text-burgundy-900 dark:text-stone-100 focus:outline-none focus:border-burgundy-800 dark:focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-burgundy-800/70 dark:text-stone-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-burgundy-800/40 dark:text-stone-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="care.arghya@gmail.com"
                    className="w-full bg-white dark:bg-stone-800 border border-burgundy-800/15 dark:border-stone-700 rounded-xl pl-10 pr-4 py-2 text-xs text-burgundy-900 dark:text-stone-100 focus:outline-none focus:border-burgundy-800 dark:focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-burgundy-800/70 dark:text-stone-400">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-burgundy-800/40 dark:text-stone-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91-8882827148"
                    className="w-full bg-white dark:bg-stone-800 border border-burgundy-800/15 dark:border-stone-700 rounded-xl pl-10 pr-4 py-2 text-xs text-burgundy-900 dark:text-stone-100 focus:outline-none focus:border-burgundy-800 dark:focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-burgundy-800/70 dark:text-stone-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-burgundy-800/40 dark:text-stone-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white dark:bg-stone-800 border border-burgundy-800/15 dark:border-stone-700 rounded-xl pl-10 pr-4 py-2 text-xs text-burgundy-900 dark:text-stone-100 focus:outline-none focus:border-burgundy-800 dark:focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-burgundy-800 dark:bg-amber-500 hover:bg-burgundy-900 dark:hover:bg-amber-400 text-cream-50 dark:text-stone-950 py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
              >
                <UserPlus size={16} />
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              </button>
            </form>

            {/* Social Logins Divider */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-burgundy-800/10 dark:border-stone-800" />
              </div>
              <span className="relative px-3 bg-cream-100 dark:bg-stone-900 text-[10px] font-bold uppercase tracking-wider text-burgundy-800/50 dark:text-stone-500">
                Or sign up with
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center py-2.5 px-3 bg-white dark:bg-stone-800 border border-burgundy-800/15 dark:border-stone-700 rounded-xl hover:bg-cream-50 dark:hover:bg-stone-700 transition-colors"
                title="Sign up with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => handleSocialLogin('github')}
                className="flex items-center justify-center py-2.5 px-3 bg-white dark:bg-stone-800 border border-burgundy-800/15 dark:border-stone-700 rounded-xl hover:bg-cream-50 dark:hover:bg-stone-700 transition-colors"
                title="Sign up with GitHub"
              >
                <svg className="w-4 h-4 fill-current text-stone-900 dark:text-stone-100" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="flex items-center justify-center py-2.5 px-3 bg-white dark:bg-stone-800 border border-burgundy-800/15 dark:border-stone-700 rounded-xl hover:bg-cream-50 dark:hover:bg-stone-700 transition-colors"
                title="Sign up with Facebook"
              >
                <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>

            {/* Switch to Login */}
            <div className="mt-5 text-center text-xs text-burgundy-800/70 dark:text-stone-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-bold text-burgundy-900 dark:text-amber-400 hover:underline"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
