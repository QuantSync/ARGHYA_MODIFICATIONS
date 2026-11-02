'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';
import { BulgeWidget } from './BulgeWidget';
import { getProductPaymentUrl } from '../lib/paymentHelper';

interface CartDrawerProps {
  onCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { items, isOpen, setOpen, removeItem, updateQuantity, getSubtotal } = useCartStore();

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    const currentItem = items[0];
    const targetUrl = getProductPaymentUrl(currentItem.product);

    if (targetUrl) {
      setOpen(false);
      window.location.href = targetUrl;
      return;
    }

    setOpen(false);
    if (onCheckout) onCheckout();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Sliding Cart Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col transition-colors duration-300"
            >
              {/* Header */}
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="text-black dark:text-white" size={20} />
                  <h2 className="font-serif text-xl font-bold text-black dark:text-white">Shopping Cart</h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-full text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                    <ShoppingBag size={48} className="stroke-[1.5]" />
                    <p className="text-sm font-medium">Your bag is currently empty.</p>
                  </div>
                ) : (
                  items.map((item) => {
                    const primaryImage = item.product.images?.[0] || '/images/hero_jewelry_model.jpg';

                    return (
                      <div
                        key={`${item.product.id}-${item.variant?.id}`}
                        className="flex space-x-4 p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700/50"
                      >
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                          <Image
                            src={primaryImage}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-xs truncate">{item.product.name}</h4>
                            <p className="font-bold text-sm mt-1 text-black dark:text-white">
                              ₹{item.product.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2 py-0.5">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)}
                                className="text-xs font-bold hover:text-black dark:hover:text-white"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold px-1">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)}
                                className="text-xs font-bold hover:text-black dark:hover:text-white"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id, item.variant?.id)}
                              className="text-neutral-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Checkout CTA */}
              {items.length > 0 && (
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-neutral-500 uppercase tracking-wider font-mono">SUBTOTAL</span>
                    <span className="font-bold text-black dark:text-white text-xl">₹{getSubtotal().toLocaleString('en-IN')}</span>
                  </div>
                  <BulgeWidget scaleHover={1.04} liftY={-2}>
                    <AnimatedButton
                      onClick={handleProceedToCheckout}
                      className="w-full !py-4 !bg-black dark:!bg-white !text-white dark:!text-black font-extrabold tracking-wider"
                    >
                      PROCEED TO CHECKOUT
                    </AnimatedButton>
                  </BulgeWidget>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
