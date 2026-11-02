'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Save, Github, Mail, Phone, Home, AtSign } from 'lucide-react';
import { api } from '../lib/api';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onUserUpdate: (updatedUser: any) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdate,
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('arghya_token');
      const res = await api.put('/auth/me', 
        { username, email, phone, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data.success) {
        onUserUpdate(res.data.data);
        setMessage({ type: 'success', text: 'Account settings saved successfully!' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.error?.message || 'Failed to update settings' });
    } finally {
      setLoading(false);
    }
  };

  const isGithubUser = user.auth_provider === 'github';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-md bg-cream-50 dark:bg-stone-900 border border-burgundy-800/20 dark:border-amber-500/30 text-burgundy-900 dark:text-stone-100 rounded-3xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-burgundy-700 dark:text-amber-400 font-bold">Profile Details</span>
                <h2 className="font-serif text-2xl font-bold luxury-text-gradient mt-0.5">My Account</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-burgundy-800/60 dark:text-stone-400 hover:text-burgundy-900 dark:hover:text-amber-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* GitHub Auth Badge */}
              {isGithubUser && (
                <div className="bg-stone-100 dark:bg-stone-800/50 p-3 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Github size={16} className="text-stone-700 dark:text-stone-300" />
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">GitHub Account</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">Connected</span>
                </div>
              )}

              {/* Read-Only Info (GitHub Name) */}
              {isGithubUser && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-burgundy-800/50 dark:text-stone-500">
                    GitHub Name (Uneditable)
                  </label>
                  <div className="w-full bg-stone-100 dark:bg-stone-800/50 border border-transparent rounded-xl px-4 py-2.5 text-sm text-stone-500 dark:text-stone-400 cursor-not-allowed flex items-center gap-2">
                    <User size={14} className="opacity-50" />
                    {user.full_name}
                  </div>
                </div>
              )}

              {/* Editable Settings Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-burgundy-800/10 dark:border-stone-800">
                {/* Custom Username */}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

                {message && (
                  <div className={`text-xs p-3 rounded-xl flex items-center gap-2 ${message.type === 'success' ? 'bg-green-100/50 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200'}`}>
                    <span>{message.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-burgundy-800 dark:bg-amber-500 hover:bg-burgundy-900 dark:hover:bg-amber-400 text-cream-50 dark:text-stone-950 py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                >
                  <Save size={16} />
                  <span>{loading ? 'Saving...' : 'Save Username'}</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
