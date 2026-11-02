'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ArghyaTruck: React.FC<{ isDark: boolean; facingLeft: boolean }> = ({ isDark, facingLeft }) => {
  const bodyColor   = isDark ? '#92400E' : '#5B21B6';   // amber-800 / violet-800
  const trim        = isDark ? '#F59E0B' : '#A855F7';   // amber-400 / purple-500
  const logoColor   = isDark ? '#FDE68A' : '#EDE9FE';   // amber-200 / violet-100
  const glass       = isDark ? '#FDE68A' : '#C4B5FD';   // amber-200 / violet-300
  const dark        = isDark ? '#1C1917' : '#1E1B4B';
  const roofColor   = isDark ? '#78350F' : '#4C1D95';
  const roadColor   = isDark ? 'rgba(251,191,36,0.2)' : 'rgba(167,139,250,0.2)';

  return (
    // Natural truck aspect ~300×120, flip with scale if facing left
    <g transform={facingLeft ? 'scale(-1,1) translate(-300,0)' : ''}>
      {/* === Road dash under truck === */}
      <rect x="0" y="112" width="300" height="4" rx="2" fill={roadColor} />

      {/* === Cargo container === */}
      <rect x="0" y="20" width="200" height="75" rx="4" fill={bodyColor} />
      {/* Top stripe */}
      <rect x="0" y="20" width="200" height="10" rx="4" fill={roofColor} />
      {/* Bottom trim line */}
      <rect x="0" y="85" width="200" height="5" rx="2" fill={trim} />
      {/* ARGHYA text */}
      <text x="100" y="67" textAnchor="middle" fontFamily="serif" fontSize="22" fontWeight="bold"
        fill={logoColor} letterSpacing="4">ARGHYA</text>
      {/* Decorative horizontal lines */}
      <line x1="8" y1="42" x2="192" y2="42" stroke={trim} strokeWidth="1" opacity="0.35" />
      <line x1="8" y1="82" x2="192" y2="82" stroke={trim} strokeWidth="1" opacity="0.35" />

      {/* === Cab === */}
      <rect x="200" y="35" width="85" height="60" rx="6" fill={bodyColor} />
      {/* Cab roof arc */}
      <ellipse cx="242" cy="35" rx="43" ry="16" fill={roofColor} />
      {/* Windshield */}
      <rect x="212" y="42" width="55" height="32" rx="4" fill={glass} opacity="0.45" />
      {/* Windshield glare */}
      <line x1="215" y1="44" x2="225" y2="72" stroke="white" strokeWidth="1.5" opacity="0.3" />
      {/* Headlight */}
      <circle cx="280" cy="78" r="6" fill={trim} opacity="0.9" />
      <circle cx="280" cy="78" r="3" fill="white" opacity="0.6" />
      {/* Bumper */}
      <rect x="275" y="85" width="15" height="6" rx="2" fill={roofColor} />

      {/* === Chassis === */}
      <rect x="5" y="90" width="285" height="10" rx="3" fill={dark} />

      {/* === Wheels (rotate continuously) === */}
      {/* Rear wheel */}
      <g transform="translate(55,108)">
        <circle r="18" fill={dark} stroke={trim} strokeWidth="3" />
        <circle r="7" fill={trim} />
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}>
          {[0, 60, 120, 180, 240, 300].map(a => (
            <line key={a}
              x1={Math.cos(a * Math.PI / 180) * 8} y1={Math.sin(a * Math.PI / 180) * 8}
              x2={Math.cos(a * Math.PI / 180) * 16} y2={Math.sin(a * Math.PI / 180) * 16}
              stroke={logoColor} strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </motion.g>
      </g>
      {/* Mid wheel */}
      <g transform="translate(145,108)">
        <circle r="18" fill={dark} stroke={trim} strokeWidth="3" />
        <circle r="7" fill={trim} />
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}>
          {[0, 60, 120, 180, 240, 300].map(a => (
            <line key={a}
              x1={Math.cos(a * Math.PI / 180) * 8} y1={Math.sin(a * Math.PI / 180) * 8}
              x2={Math.cos(a * Math.PI / 180) * 16} y2={Math.sin(a * Math.PI / 180) * 16}
              stroke={logoColor} strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </motion.g>
      </g>
      {/* Front wheel */}
      <g transform="translate(248,108)">
        <circle r="18" fill={dark} stroke={trim} strokeWidth="3" />
        <circle r="7" fill={trim} />
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}>
          {[0, 60, 120, 180, 240, 300].map(a => (
            <line key={a}
              x1={Math.cos(a * Math.PI / 180) * 8} y1={Math.sin(a * Math.PI / 180) * 8}
              x2={Math.cos(a * Math.PI / 180) * 16} y2={Math.sin(a * Math.PI / 180) * 16}
              stroke={logoColor} strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </motion.g>
      </g>

      {/* === Wind streaks (behind truck) === */}
      {[30, 50, 65].map((y, i) => (
        <motion.line key={y}
          x1={-10} y1={y} x2={-50 - i * 8} y2={y}
          stroke={trim} strokeWidth={1.5 - i * 0.3} strokeLinecap="round" opacity="0.6"
          animate={{ opacity: [0.6, 0.1, 0.6], x: [0, -8, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </g>
  );
};

export const DeliveryAnimation: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const controls = useAnimation();

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const runLoop = async () => {
      while (!cancelled) {
        const isLtr = direction === 'ltr';
        // start offscreen
        controls.set({ x: isLtr ? -320 : 1200 });
        // slow, peaceful traversal across full width
        await controls.start({
          x: isLtr ? 1200 : -320,
          transition: { duration: 18, ease: 'linear' },
        });
        if (cancelled) break;
        // flip direction for next run
        setDirection(d => d === 'ltr' ? 'rtl' : 'ltr');
        await new Promise(r => setTimeout(r, 300));
      }
    };
    runLoop();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 900 130" preserveAspectRatio="xMidYMax meet"
        className="w-full h-full" aria-hidden="true">
        <motion.g animate={controls}>
          <ArghyaTruck isDark={isDark} facingLeft={direction === 'rtl'} />
        </motion.g>
      </svg>
    </div>
  );
};
