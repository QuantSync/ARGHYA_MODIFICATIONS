'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavItem {
  name: string;
  href?: string;
  category?: string;
  isAdminTrigger?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT US', href: '/about' },
  { name: '925 PURE SILVER', href: '/products?category=Silver', category: 'Silver' },
  { name: 'ANTI TARNISH', href: '/products?category=AntiTarnish', category: 'AntiTarnish' },
  { name: 'BEST SELLERS', href: '/products?category=BestSellers', category: 'BestSellers' },
  { name: 'HOT DEALS', href: '/products?category=HotDeals', category: 'HotDeals' },
  { name: 'MODERN', href: '/products?category=Modern', category: 'Modern' },
  { name: 'POLICY', href: '/policy' },
  { name: 'T & C', href: '/terms' },
];

interface SlidingNavTabsContentProps {
  onAdminClick?: () => void;
}

function SlidingNavTabsContent({ onAdminClick }: SlidingNavTabsContentProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams ? searchParams.get('category') : null;

  const getIsActive = (item: NavItem) => {
    if (item.isAdminTrigger) return pathname.startsWith('/admin');
    if (item.category) {
      return pathname.startsWith('/products') && currentCategory?.toLowerCase() === item.category.toLowerCase();
    }
    if (item.href === '/') return pathname === '/';
    return pathname === item.href || (item.href ? pathname.startsWith(item.href) : false);
  };

  return (
    <nav
      className="relative hidden md:flex items-center gap-1 lg:gap-2.5 bg-transparent"
      style={{ overflowX: 'auto', scrollbarWidth: 'none' }}
    >
      {NAV_ITEMS.map((item) => {
        const active = getIsActive(item);
        const baseClass = `relative px-3.5 py-1.5 text-[11px] lg:text-[11.5px] font-bold uppercase tracking-wider transition-colors duration-200 z-10 select-none whitespace-nowrap rounded-full ${
          active
            ? 'text-white dark:text-black font-extrabold'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
        }`;

        return item.isAdminTrigger ? (
          <button
            key={item.name}
            onClick={onAdminClick}
            className={`${baseClass} cursor-pointer`}
          >
            {active && (
              <motion.div
                layoutId="activeNavPill"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                className="absolute inset-0 rounded-full bg-black dark:bg-white shadow-sm z-[-1]"
              />
            )}
            <span>{item.name}</span>
          </button>
        ) : (
          <Link
            key={item.name}
            href={item.href!}
            className={baseClass}
          >
            {active && (
              <motion.div
                layoutId="activeNavPill"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                className="absolute inset-0 rounded-full bg-black dark:bg-white shadow-sm z-[-1]"
              />
            )}
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

interface SlidingNavTabsProps {
  onAdminClick?: () => void;
}

export const SlidingNavTabs: React.FC<SlidingNavTabsProps> = ({ onAdminClick }) => {
  return (
    <Suspense fallback={
      <nav className="relative hidden md:flex items-center space-x-2 px-3 py-1.5 text-[11px] font-bold uppercase text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
        <span>HOME</span>
        <span>ABOUT US</span>
        <span>925 PURE SILVER</span>
        <span>ANTI TARNISH</span>
        <span>BEST SELLERS</span>
        <span>HOT DEALS</span>
        <span>MODERN</span>
        <span>POLICY</span>
        <span>TERMS & CONDITIONS</span>
      </nav>
    }>
      <SlidingNavTabsContent onAdminClick={onAdminClick} />
    </Suspense>
  );
};
