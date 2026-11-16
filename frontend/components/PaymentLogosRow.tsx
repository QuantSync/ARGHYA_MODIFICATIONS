'use client';

import React from 'react';

/**
 * PaymentLogosRow
 * Renders authentic SVG vectors for UPI, Mastercard, Google Pay, and Paytm.
 * Coded as a separate component for modularity and crisp scaling.
 */
export const PaymentLogosRow: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 py-2 select-none ${className}`}>
      {/* ── 1. UPI Logo ── */}
      <div className="flex items-center" title="UPI - Unified Payments Interface">
        <svg
          viewBox="0 0 75 24"
          className="h-5 sm:h-6 w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="UPI"
        >
          {/* UPI slanted arrows icon */}
          <path d="M12.5 3L6 14.5H1.5L8 3H12.5Z" fill="#097939" />
          <path d="M18.5 3L12 14.5H7.5L14 3H18.5Z" fill="#737373" />
          <path d="M17.5 9.5L14.7 14.5H10.2L13 9.5H17.5Z" fill="#097939" />
          <path d="M22 3L15.5 14.5H11L17.5 3H22Z" fill="#ED7524" />
          {/* UPI Text */}
          <text
            x="24"
            y="14"
            fontFamily="Arial, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="12"
            fill="#5A5A5A"
            letterSpacing="0.5"
          >
            UPI
          </text>
        </svg>
      </div>

      {/* ── 2. Mastercard Logo ── */}
      <div className="flex items-center" title="Mastercard">
        <svg
          viewBox="0 0 38 24"
          className="h-5 sm:h-6 w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Mastercard"
        >
          {/* Left Red Circle */}
          <circle cx="12" cy="12" r="10" fill="#EB001B" />
          {/* Right Yellow Circle */}
          <circle cx="26" cy="12" r="10" fill="#F79E1B" fillOpacity="0.95" />
          {/* Overlapping intersection */}
          <path
            d="M19 4.35A9.97 9.97 0 0015.65 12 9.97 9.97 0 0019 19.65 9.97 9.97 0 0022.35 12 9.97 9.97 0 0019 4.35Z"
            fill="#FF5F00"
          />
        </svg>
      </div>

      {/* ── 3. Google Pay (G Pay) Logo ── */}
      <div className="flex items-center" title="Google Pay">
        <svg
          viewBox="0 0 62 24"
          className="h-5 sm:h-6 w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Google Pay"
        >
          {/* Google 4-color 'G' */}
          <g transform="translate(1, 3)">
            <path
              d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
              fill="#4285F4"
            />
            <path
              d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.94v2.33C2.43 15.98 5.48 18 9 18z"
              fill="#34A853"
            />
            <path
              d="M3.97 10.71a5.41 5.41 0 010-3.42V4.96H.94a9.01 9.01 0 000 8.08l3.03-2.33z"
              fill="#FBBC05"
            />
            <path
              d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.92 11.43 0 9 0 5.48 0 2.43 2.02.94 4.96l3.03 2.33c.71-2.13 2.69-3.71 5.03-3.71z"
              fill="#EA4335"
            />
          </g>
          {/* 'Pay' Text */}
          <text
            x="24"
            y="16"
            fontFamily="Roboto, Arial, sans-serif"
            fontWeight="500"
            fontSize="13"
            fill="#5F6368"
          >
            Pay
          </text>
        </svg>
      </div>

      {/* ── 4. Paytm Logo ── */}
      <div className="flex items-center" title="Paytm">
        <svg
          viewBox="0 0 54 22"
          className="h-5 sm:h-6 w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Paytm"
        >
          {/* 'Pay' in Dark Blue */}
          <text
            x="0"
            y="16"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="800"
            fontSize="15"
            fill="#002E6E"
          >
            Pay
          </text>
          {/* 'tm' in Cyan/Light Blue */}
          <text
            x="31"
            y="16"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="800"
            fontSize="15"
            fill="#00BAF2"
          >
            tm
          </text>
        </svg>
      </div>
    </div>
  );
};

export default PaymentLogosRow;

