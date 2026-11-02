'use client';

/**
 * ViewToggle — Centered pill/slider toggle for switching between
 * Horizontal (grid) and Vertical (card) product views.
 *
 * Theme: strictly black-and-white with semi-transparent backdrop.
 * Accessibility: role="tablist", keyboard arrow-key navigation, visible focus ring.
 */

import React from 'react';

export type ViewMode = 'horizontal' | 'vertical';

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const OPTIONS: { mode: ViewMode; label: string; icon: string }[] = [
  { mode: 'horizontal', label: 'Horizontal View', icon: '⊞' },
  { mode: 'vertical',   label: 'Vertical View',   icon: '☰' },
];

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChange }) => {
  const activeIdx = viewMode === 'horizontal' ? 0 : 1;

  const handleKeyDown = (e: React.KeyboardEvent, mode: ViewMode) => {
    if (e.key === 'ArrowRight' && mode === 'horizontal') { e.preventDefault(); onChange('vertical'); }
    if (e.key === 'ArrowLeft'  && mode === 'vertical')   { e.preventDefault(); onChange('horizontal'); }
    if (e.key === 'Enter' || e.key === ' ')               { e.preventDefault(); onChange(mode); }
  };

  return (
    <div className="flex justify-center my-6">
      {/* Outer pill — semi-transparent black container */}
      <div
        role="tablist"
        aria-label="Product view mode"
        className="relative flex items-center rounded-full p-1 select-none"
        style={{
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
        }}
      >
        {/* Sliding white thumb — moves based on active index */}
        <div
          aria-hidden="true"
          className="absolute top-1 bottom-1 rounded-full bg-white"
          style={{
            width: 'calc(50% - 4px)',
            left: activeIdx === 0 ? '4px' : 'calc(50%)',
            transition: 'left 250ms ease, width 250ms ease',
            pointerEvents: 'none',
          }}
        />

        {OPTIONS.map(({ mode, label, icon }) => {
          const isActive = viewMode === mode;
          return (
            <button
              key={mode}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(mode)}
              onKeyDown={(e) => handleKeyDown(e, mode)}
              className={`
                relative z-10 flex items-center gap-1.5 px-5 py-2 rounded-full
                text-xs font-bold uppercase tracking-widest
                transition-colors duration-[250ms]
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-white
                ${isActive ? 'text-black' : 'text-white/75 hover:text-white'}
              `}
            >
              <span className="text-sm leading-none">{icon}</span>
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{mode === 'horizontal' ? 'H-View' : 'V-View'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

