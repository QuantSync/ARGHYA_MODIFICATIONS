'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, AlertTriangle, RefreshCcw } from 'lucide-react';
import { BulgeWidget } from '../BulgeWidget';

interface PaymentFailureAnimationProps {
  onRetry: () => void;
  error?: string;
}

export const PaymentFailureAnimation: React.FC<PaymentFailureAnimationProps> = ({ onRetry, error }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      className="text-center py-8 px-4"
    >
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
        className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <XCircle className="w-16 h-16 text-rose-500" />
      </motion.div>
      
      <h3 className="font-serif text-3xl font-bold mb-3 text-rose-400">Transaction Failed</h3>
      <p className="text-sm text-stone-300 mb-6 max-w-sm mx-auto">
        We couldn't process your payment. Your account has not been charged.
      </p>

      {error && (
        <div className="bg-rose-950/40 border border-rose-500/20 rounded-lg p-4 mb-8 flex items-start text-left max-w-sm mx-auto">
          <AlertTriangle className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-rose-200">{error}</p>
        </div>
      )}

      <BulgeWidget scaleHover={1.06} liftY={-4}>
        <button
          onClick={onRetry}
          className="flex items-center justify-center mx-auto gap-2 bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-600 px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </button>
      </BulgeWidget>
    </motion.div>
  );
};
