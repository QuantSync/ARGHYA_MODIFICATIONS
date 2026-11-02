'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Mail, Lock, LogIn, AlertCircle,
  CheckCircle, User, Save, Github, Phone, Home, AtSign, LogOut
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { api } from '../lib/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
  onLoginSuccess: (user: any) => void;
  /** When set, the modal shows the "successfully signed in" view instead of the sign-in form */
  loggedInUser?: any;
  onLogout?: () => void;
  onUserUpdate?: (updatedUser: any) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSignup,
  onLoginSuccess,
  loggedInUser,
  onLogout,
  onUserUpdate,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Account details editing state
  const [username, setUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Track if the success card was just shown (for animation)
  const [showSuccess, setShowSuccess] = useState(false);

  // Populate account details when loggedInUser changes
  useEffect(() => {
    if (loggedInUser) {
      setUsername(loggedInUser.username || '');
      setEditEmail(loggedInUser.email || '');
      setPhone(loggedInUser.phone || '');
      setAddress(loggedInUser.address || '');
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
    }
  }, [loggedInUser]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('arghya_token', res.data.data.token);
        onLoginSuccess(res.data.data.user);
        // Don't close — let the modal transition to the success/account view
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(`Failed to sign in with ${provider}: ${err.message}`);
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage(null);

    try {
      const token = localStorage.getItem('arghya_token');
      const res = await api.put('/auth/me',
        { username, email: editEmail, phone, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        if (onUserUpdate) onUserUpdate(res.data.data);
        setSaveMessage({ type: 'success', text: 'Account settings saved successfully!' });
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (error: any) {
      setSaveMessage({ type: 'error', text: error.response?.data?.error?.message || 'Failed to update settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogoutClick = async () => {
    if (onLogout) onLogout();
    onClose();
  };

  const isGithubUser = loggedInUser?.auth_provider === 'github';

  // ─── Logged-In View: Success Card + Account Details ───
  if (loggedInUser) {
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

            {/* Logged-In Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-md bg-cream-100 dark:bg-stone-900 border border-burgundy-800/20 dark:border-amber-500/30 text-burgundy-900 dark:text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden transition-colors duration-300 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full text-burgundy-800/60 dark:text-stone-400 hover:text-burgundy-900 dark:hover:text-amber-400 transition-colors z-20"
              >
                <X size={20} />
              </button>

              {/* ─── Success Banner ─── */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center text-center mb-6"
                  >
                    {/* Green glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-400/15 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400 shadow-inner">
                      <CheckCircle size={32} />
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-burgundy-900 dark:text-stone-100 mb-1">
                      Successfully Signed In!
                    </h3>
                    <p className="text-sm text-burgundy-800/70 dark:text-stone-400 leading-relaxed">
                      Welcome back, {loggedInUser.full_name || loggedInUser.username || loggedInUser.email?.split('@')[0]}!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─── Account Info Header ─── */}
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-burgundy-700 dark:text-amber-400 font-bold">
                  Account Details
                </span>
                <h2 className="font-serif text-xl font-bold luxury-text-gradient mt-0.5">
                  My Account
                </h2>
              </div>

              {/* ─── User Info Card ─── */}
              <div className="bg-white/60 dark:bg-stone-800/40 rounded-2xl p-4 mb-5 border border-burgundy-800/10 dark:border-stone-700/50">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-burgundy-100 dark:bg-stone-800 flex items-center justify-center text-burgundy-800 dark:text-amber-400 overflow-hidden border-2 border-burgundy-800/20 dark:border-amber-500/30 flex-shrink-0">
                    {loggedInUser.avatar_url ? (
                      <img src={loggedInUser.avatar_url} alt={loggedInUser.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-burgundy-900 dark:text-stone-100 truncate">
                      {loggedInUser.full_name || loggedInUser.username || 'User'}
                    </p>
                    <p className="text-xs text-burgundy-800/60 dark:text-stone-400 truncate">
                      {loggedInUser.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* GitHub Auth Badge */}
              {isGithubUser && (
                <div className="bg-stone-100 dark:bg-stone-800/50 p-3 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Github size={16} className="text-stone-700 dark:text-stone-300" />
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">GitHub Account</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">Connected</span>
                </div>
              )}

              {/* GitHub Name (read-only) */}
              {isGithubUser && loggedInUser.full_name && (
                <div className="space-y-1 mb-4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-burgundy-800/50 dark:text-stone-500">
                    GitHub Name (Uneditable)
                  </label>
                  <div className="w-full bg-stone-100 dark:bg-stone-800/50 border border-transparent rounded-xl px-4 py-2.5 text-sm text-stone-500 dark:text-stone-400 cursor-not-allowed flex items-center gap-2">
                    <User size={14} className="opacity-50" />
                    {loggedInUser.full_name}
                  </div>
                </div>
              )}

              {/* ─── Editable Account Settings ─── */}
              <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 border-t border-burgundy-800/10 dark:border-stone-800">
                {/* Display Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-burgundy-800 dark:text-amber-400">
                    Display Name / Username
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-3.5 top-3 w-4 h-4 text-burgundy-800/40 dark:text-amber-500/50" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. anubhav_s"
                      className="w-full bg-white dark:bg-stone-950 border-2 border-burgundy-800/20 dark:border-amber-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm font-bold text-burgundy-900 dark:text-stone-100 focus:outline-none focus:border-burgundy-800 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-burgundy-800 dark:text-amber-400">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-burgundy-800/40 dark:text-amber-500/50" />
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="care.arghya@gmail.com"
                      className="w-full bg-white dark:bg-stone-950 border border-burgundy-800/15 dark:border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-burgundy-900 dark:text-stone-100 focus:outline-none focus:border-burgundy-800 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-burgundy-800 dark:text-amber-400">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-burgundy-800/40 dark:text-amber-500/50" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full bg-white dark:bg-stone-950 border border-burgundy-800/15 dark:border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-burgundy-900 dark:text-stone-100 focus:outline-none focus:border-burgundy-800 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Residential Address */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-burgundy-800 dark:text-amber-400">
                    Residential Address
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3.5 top-3 w-4 h-4 text-burgundy-800/40 dark:text-amber-500/50" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat No, Street, City, State, ZIP"
                      className="w-full bg-white dark:bg-stone-950 border border-burgundy-800/15 dark:border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-burgundy-900 dark:text-stone-100 focus:outline-none focus:border-burgundy-800 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Save message */}
                {saveMessage && (
                  <div className={`text-xs p-3 rounded-xl flex items-center gap-2 ${saveMessage.type === 'success' ? 'bg-green-100/50 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200'}`}>
                    <span>{saveMessage.text}</span>
                  </div>
                )}

                {/* Save Button */}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full mt-2 bg-burgundy-800 dark:bg-amber-500 hover:bg-burgundy-900 dark:hover:bg-amber-400 text-cream-50 dark:text-stone-950 py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save Account Settings'}</span>
                </button>
              </form>

              {/* Sign Out */}
              {onLogout && (
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full mt-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-600/40 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  // ─── Default: Sign-In Form View ───
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

          {/* Login Card Modal */}
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
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-burgundy-700 dark:text-amber-400 font-bold">Welcome Back</span>
                <h2 className="font-serif text-3xl font-bold luxury-text-gradient mt-0.5">Sign In</h2>
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

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full bg-white dark:bg-stone-800 border border-burgundy-800/15 dark:border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-burgundy-900 dark:text-stone-100 focus:outline-none focus:border-burgundy-800 dark:focus:border-amber-400 transition-colors"
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
                    className="w-full bg-white dark:bg-stone-800 border border-burgundy-800/15 dark:border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-burgundy-900 dark:text-stone-100 focus:outline-none focus:border-burgundy-800 dark:focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-burgundy-800 dark:bg-amber-500 hover:bg-burgundy-900 dark:hover:bg-amber-400 text-cream-50 dark:text-stone-950 py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
              >
                <LogIn size={16} />
                <span>{loading ? 'Signing In...' : 'Sign In to Account'}</span>
              </button>
            </form>

            {/* Social Logins Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-burgundy-800/10 dark:border-stone-800" />
              </div>
              <span className="relative px-3 bg-cream-100 dark:bg-stone-900 text-[10px] font-bold uppercase tracking-wider text-burgundy-800/50 dark:text-stone-500">
                Or continue with
              </span>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center py-2.5 px-3 bg-white dark:bg-stone-800 border border-burgundy-800/15 dark:border-stone-700 rounded-xl hover:bg-cream-50 dark:hover:bg-stone-700 transition-colors"
                title="Sign in with Google"
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
                title="Sign in with GitHub"
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
                title="Sign in with Facebook"
              >
                <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>

            {/* Switch to Signup */}
            <div className="mt-6 text-center text-xs text-burgundy-800/70 dark:text-stone-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="font-bold text-burgundy-900 dark:text-amber-400 hover:underline"
              >
                Create Account
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
