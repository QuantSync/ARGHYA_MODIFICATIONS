'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Truck, ShieldCheck } from 'lucide-react';
import { BulgeWidget } from '../BulgeWidget';

interface PaymentSuccessAnimationProps {
  onContinue: () => void;
}

export const PaymentSuccessAnimation: React.FC<PaymentSuccessAnimationProps> = ({ onContinue }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center py-8 px-4"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ type: "spring", duration: 1, bounce: 0.5 }}
        className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-16 h-16 text-emerald-400" />
      </motion.div>
      
      <h3 className="font-serif text-3xl font-bold mb-3 luxury-text-gradient">Order Confirmed!</h3>
      <p className="text-sm text-stone-300 mb-8 max-w-sm mx-auto">
        Thank you for shopping with ARGHYA. Your bespoke outfit is being prepared by our master artisans.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8 text-xs text-stone-400">
        <div className="flex flex-col items-center">
          <Package className="w-6 h-6 mb-2 text-amber-500/70" />
          <span>Processing</span>
        </div>
        <div className="flex flex-col items-center">
          <Truck className="w-6 h-6 mb-2 text-amber-500/70" />
          <span>Shipping</span>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-6 h-6 mb-2 text-amber-500/70" />
          <span>Secured</span>
        </div>
      </div>

      <BulgeWidget scaleHover={1.06} liftY={-4}>
        <button
          onClick={onContinue}
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
        >
          Continue Shopping
        </button>
      </BulgeWidget>
    </motion.div>
  );
};
