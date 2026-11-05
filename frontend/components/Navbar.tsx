'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, Menu, User, LogOut, Shield } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { SlidingNavTabs } from './SlidingNavTabs';
import { CircularThemeToggle } from './CircularThemeToggle';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';
import { AdminLoginModal } from './AdminLoginModal';
import { MobileDrawer } from './MobileDrawer';
import { UserProfileModal } from './UserProfileModal';
import { ComingSoonModal } from './modals/ComingSoonModal';
import { supabase } from '../lib/supabaseClient';
import { api } from '../lib/api';

export const Navbar: React.FC = () => {
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async (session: any) => {
      if (session?.user) {
        try {
          const fallbackEmail = session.user.email || `${session.user.id}@oauth.local`;
          const syncRes = await api.post('/auth/oauth-sync', {
            email: fallbackEmail,
            fullName: session.user.user_metadata?.full_name || fallbackEmail.split('@')[0],
            provider: session.user.app_metadata?.provider || 'oauth',
            supabaseUid: session.user.id,
            avatarUrl: session.user.user_metadata?.avatar_url || ''
          });
          if (syncRes.data.success) {
            setUser(syncRes.data.data.user);
            localStorage.setItem('arghya_token', syncRes.data.data.token);
            setIsSignupOpen(false);
            return;
          }
        } catch (e: any) {
          console.warn('OAuth sync warning:', e);
        }
      }

      const token = localStorage.getItem('arghya_token');
      if (token) {
        try {
          const profileRes = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (profileRes.data.success) {
            setUser(profileRes.data.data);
            setIsSignupOpen(false);
          }
        } catch (e) {
          localStorage.removeItem('arghya_token');
        }
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAuth(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        checkAuth(session);
        if (event === 'SIGNED_IN') {
          setIsLoginOpen(true);
          if (window.location.hash.includes('access_token')) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('arghya_token');
    setUser(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 bg-white/95 dark:bg-black/95 border-b border-neutral-200 dark:border-neutral-800 text-black dark:text-white shadow-sm">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 w-full relative">

            {/* Mobile Hamburger (3-line menu) */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="p-2 rounded-xl text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Left: Brand Logo */}
            <div className="flex items-center justify-center md:justify-start">
              <Link href="/" className="flex items-center" aria-label="Arghya — Home">
                <Image
                  src="/images/arghya_logo_nav.png"
                  alt="Arghya"
                  width={160}
                  height={69}
                  className="object-contain"
                  priority
                  quality={100}
                />
              </Link>
            </div>

            {/* Center: Navigation Buttons Directly Integrated (No Outward Box) */}
            <div className="hidden md:flex flex-1 items-center justify-center px-4">
              <SlidingNavTabs onAdminClick={() => setIsAdminOpen(true)} />
            </div>

            {/* Right: Actions (Theme Toggle, Admin, User, Search, Cart) */}
            <div className="flex items-center space-x-2.5 sm:space-x-4">
              {/* Circular Theme Toggle */}
              <CircularThemeToggle />

              {/* Desktop Admin shortcut icon */}
              <button
                onClick={() => setIsAdminOpen(true)}
                title="Admin Portal"
                className="hidden md:flex p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Shield size={18} />
              </button>

              {/* User Account / Sign In */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsProfileOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200 overflow-hidden">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={14} />
                      )}
                    </div>
                    <span className="hidden sm:inline font-bold text-xs text-neutral-900 dark:text-neutral-100 truncate max-w-[100px]">
                      {user.username || user.full_name || user.email?.split('@')[0]}
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/60 transition-colors"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsComingSoonOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-bold text-xs uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <User size={15} />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              <Link href="/products" className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors" aria-label="Search Products">
                <Search size={19} />
              </Link>

              <button onClick={toggleCart} className="relative p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors" aria-label="Shopping Cart">
                <ShoppingBag size={21} />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
            
          </div>
        </div>
      </header>

      {/* ── Modals & Overlays ── */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
        onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
        loggedInUser={user}
        onLogout={handleLogout}
        onUserUpdate={setUser}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
        onSignupSuccess={(registeredUser) => setUser(registeredUser)}
      />

      <AdminLoginModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUserUpdate={setUser}
      />

      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />

      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onOpenAdminLogin={() => { setIsMobileDrawerOpen(false); setIsAdminOpen(true); }}
        onOpenLogin={() => { setIsMobileDrawerOpen(false); setIsComingSoonOpen(true); }}
        userLoggedIn={!!user}
        userName={user?.username || user?.full_name || user?.email?.split('@')[0]}
        onLogout={handleLogout}
        onOpenProfile={() => setIsProfileOpen(true)}
      />
    </>
  );
};
