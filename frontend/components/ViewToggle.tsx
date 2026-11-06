'use client';

/**
 * ViewToggle — Rectangular with rounded corners slider toggle for switching between
 * Horizontal (grid) and Vertical (card) product views.
 *
 * Theme: premium high-contrast monochrome with backdrop blur.
 * Accessibility: role="tablist", keyboard arrow-key navigation, visible focus ring.
 */

import React from 'react';
import { LucideIcon, LayoutGrid, Rows3 } from 'lucide-react';

export type ViewMode = 'horizontal' | 'vertical';

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const OPTIONS: { mode: ViewMode; label: string; icon: LucideIcon }[] = [
  { mode: 'horizontal', label: 'HORIZONTAL VIEW', icon: LayoutGrid },
  { mode: 'vertical',   label: 'VERTICAL VIEW',   icon: Rows3 },
];

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChange }) => {
  const activeIdx = viewMode === 'horizontal' ? 0 : 1;

  const handleKeyDown = (e: React.KeyboardEvent, mode: ViewMode) => {
    if (e.key === 'ArrowRight' && mode === 'horizontal') {
      e.preventDefault();
      onChange('vertical');
    }
    if (e.key === 'ArrowLeft' && mode === 'vertical') {
      e.preventDefault();
      onChange('horizontal');
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(mode);
    }
  };

  return (
    <div className="flex justify-center my-6">
      {/* Outer container — rectangular in shape with rounded corners */}
      <div
        role="tablist"
        aria-label="Product view mode"
        className="relative inline-flex items-center p-1.5 rounded-2xl select-none border border-neutral-700/50 shadow-xl"
        style={{
          background: 'rgba(28, 28, 28, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.28)',
        }}
      >
        {/* Sliding thumb — rectangular in shape with rounded corners */}
        <div
          aria-hidden="true"
          className="absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-md"
          style={{
            width: 'calc(50% - 6px)',
            left: activeIdx === 0 ? '6px' : 'calc(50%)',
            transition: 'left 280ms cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        />

        {OPTIONS.map(({ mode, label, icon: Icon }) => {
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
                relative z-10 flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl
                text-[11px] sm:text-xs font-bold uppercase tracking-wider
                transition-colors duration-200 cursor-pointer
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                ${isActive ? 'text-black font-extrabold' : 'text-neutral-400 hover:text-white font-medium'}
              `}
            >
              <Icon size={14} className={isActive ? 'text-black' : 'text-neutral-400'} />
              <span className="hidden sm:inline whitespace-nowrap">{label}</span>
              <span className="sm:hidden whitespace-nowrap">{mode === 'horizontal' ? 'Horizontal' : 'Vertical'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
