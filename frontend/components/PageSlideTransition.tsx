'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArghyaLogoLoader } from './animations/ArghyaLogoLoader';

function PageSlideTransitionContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams ? searchParams.get('category') : '';
  const routeKey = `${pathname}?category=${category || ''}`;

  const [isNavigating, setIsNavigating] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip loader on initial load unless desired
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Trigger full screen ArghyaLogoLoader animation on route transition
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 1120); // Reduced by 20% (1400ms -> 1120ms)

    return () => clearTimeout(timer);
  }, [routeKey]);

  return (
    <>
      <ArghyaLogoLoader isVisible={isNavigating} />

      <AnimatePresence mode="wait">
        <motion.div
          key={routeKey}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full overflow-hidden"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export const PageSlideTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<ArghyaLogoLoader isVisible={true} />}>
      <PageSlideTransitionContent>{children}</PageSlideTransitionContent>
    </Suspense>
  );
};
