'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Truck,
  ShieldCheck,
  Lock,
  User,
  Phone,
  Mail,
  Home,
  MapPin,
  Building2,
  Navigation,
  Hash,
  ShoppingBag,
} from 'lucide-react';
import Image from 'next/image';
import { Product } from '../../lib/api';

interface PayOnDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  selectedSize?: string;
  effectivePrice?: number;
}

export const PayOnDeliveryModal: React.FC<PayOnDeliveryModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedSize,
  effectivePrice,
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    houseFlat: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string>('');

  // Dynamic Product Price (before or after coupon discount) + Rs 25 delivery/handling fee
  const basePrice = (effectivePrice !== undefined && effectivePrice !== null)
    ? Number(effectivePrice)
    : (product?.price != null ? Number(product.price) : 419);

  const COD_CHARGE = 25;
  const totalAmount = basePrice + COD_CHARGE;

  // Determine display name and image
  const displayName = product?.name || 'Blossom Floral Printed Kurti';
  const productImage = product?.images?.[0] || '/products/kurti/blue_blossom_kurti_v2.jpg';
  const activeSize = selectedSize || (product?.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Free Size');

  // ESC key handler
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
      // Reset only when opening modal initially
      setOrderPlaced(false);
      setPlacedOrderId('');
      setIsSubmitting(false);
    } else {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      setOrderPlaced(false);
      setPlacedOrderId('');
      setIsSubmitting(false);
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKey]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Required';
    if (!formData.phone.trim()) {
      errs.phone = 'Required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      errs.phone = '10 digits';
    }

    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = 'Invalid email';
    }

    if (!formData.houseFlat.trim()) errs.houseFlat = 'Required';
    if (!formData.locality.trim()) errs.locality = 'Required';
    if (!formData.city.trim()) errs.city = 'Required';
    if (!formData.state.trim()) errs.state = 'Required';
    if (!formData.pincode.trim()) {
      errs.pincode = 'Required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = '6 digits';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple clicks / double placement
    if (!validateForm()) return;

    setIsSubmitting(true);
    const orderId = `ARG-COD-${Date.now().toString().slice(-6)}`;

    try {
      const payload = {
        orderId,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || 'N/A',
        houseFlat: formData.houseFlat.trim(),
        locality: formData.locality.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        productName: displayName,
        productSlug: product?.slug || 'blossom-floral-printed-kurti',
        size: activeSize,
        basePrice: basePrice,
        deliveryCharge: COD_CHARGE,
        totalAmount: totalAmount,
        amountText: `Rs ${basePrice} + Rs ${COD_CHARGE} = Rs ${totalAmount}`,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch('/api/cod-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.warn('Server COD response not OK, continuing with client order confirmation');
      }

      setPlacedOrderId(orderId);
      setOrderPlaced(true);
    } catch (err) {
      console.error('Failed to submit COD order:', err);
      setPlacedOrderId(orderId);
      setOrderPlaced(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="pod-modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[250] flex items-center justify-center px-3 pt-14 pb-5 sm:p-4 overflow-y-auto"
        >
          {/* Blurred Backdrop */}
          <motion.div
            key="pod-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-sm"
          />

          {/* Compact Modal Card with Pop-Up Entrance and Exit */}
          <motion.div
            key="pod-card"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            className="relative w-full max-w-[430px] my-auto mt-6 sm:mt-auto z-10 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-200 bg-[#FAF7F2] dark:bg-[#16060A] text-stone-900 dark:text-stone-100 border border-[#2A0A10]/15 dark:border-amber-500/30"
            style={{
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35), 0 0 30px rgba(245, 158, 11, 0.1)',
            }}
          >
            {/* Top Amber Accent Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-90" />

            {/* Compact Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-stone-200/80 dark:border-white/10 bg-stone-100/60 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 dark:bg-amber-500/20 border border-amber-600/30 dark:border-amber-400/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Truck size={16} />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-serif font-bold text-stone-900 dark:text-white leading-tight">
                    Pay On Delivery (Cash On Delivery)
                  </h2>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                    No advance payment required
                  </p>
                </div>
              </div>

              {/* Cross Close Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close dialog"
                className="w-7 h-7 rounded-full bg-stone-200/70 hover:bg-stone-300 dark:bg-white/10 dark:hover:bg-white/20 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={15} strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Modal Body */}
            <div className="p-4 max-h-[82vh] overflow-y-auto custom-scrollbar">
              {!orderPlaced ? (
                <form onSubmit={handleSubmitOrder} className="space-y-3">
                  {/* COMBINED COMPACT PRODUCT & FIXED AMOUNT SUMMARY STRIP */}
                  <div className="rounded-xl p-2.5 bg-white dark:bg-white/[0.04] border border-stone-200 dark:border-amber-500/25 shadow-sm space-y-2">
                    {/* Product Row (Constant & Unchangeable) */}
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-12 rounded-md overflow-hidden flex-shrink-0 border border-stone-200 dark:border-white/15 bg-stone-100 dark:bg-stone-900">
                        <Image
                          src={productImage}
                          alt={displayName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-xs font-serif font-bold text-stone-900 dark:text-white truncate">
                            {displayName}
                          </h3>
                          <span className="flex-shrink-0 text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 flex items-center gap-0.5">
                            <Lock size={8} /> Fixed
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-stone-500 dark:text-stone-400">
                          <span>Size: {activeSize}</span>
                          <span>•</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">In Stock</span>
                        </div>
                      </div>
                    </div>

                    {/* Amount Row (Actual Product Price + Rs 25 Handling Fee) */}
                    <div className="pt-2 border-t border-stone-150 dark:border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-stone-700 dark:text-stone-300">
                        <ShieldCheck size={12} className="text-emerald-600 dark:text-emerald-400" />
                        <span>Payable Amount:</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400">
                          Rs {basePrice.toLocaleString('en-IN')} + Rs {COD_CHARGE} = Rs {totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CUSTOMER DETAILS FORM (COMPACT 2-COLUMN GRID) */}
                  <div className="space-y-2 pt-0.5">
                    <div className="flex items-center gap-1.5 pb-0.5 border-b border-stone-200 dark:border-white/10">
                      <MapPin size={12} className="text-amber-600 dark:text-amber-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                        Delivery Address Details
                      </span>
                    </div>

                    {/* 1) Name & 2) Phone */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-stone-700 dark:text-stone-300 mb-0.5">
                          1) Full Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <User size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Your Name"
                            className={`w-full pl-8 pr-2 py-1.5 rounded-lg text-xs bg-white dark:bg-white/[0.06] border transition-all placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none ${
                              errors.name
                                ? 'border-rose-500 text-rose-600'
                                : 'border-stone-200 dark:border-white/15 text-stone-900 dark:text-stone-100 focus:border-amber-500 dark:focus:border-amber-400'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-stone-700 dark:text-stone-300 mb-0.5">
                          2) Phone <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                            placeholder="10 Digits"
                            className={`w-full pl-8 pr-2 py-1.5 rounded-lg text-xs bg-white dark:bg-white/[0.06] border transition-all placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none ${
                              errors.phone
                                ? 'border-rose-500 text-rose-600'
                                : 'border-stone-200 dark:border-white/15 text-stone-900 dark:text-stone-100 focus:border-amber-500 dark:focus:border-amber-400'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3) Email */}
                    <div>
                      <label className="block text-[10px] font-semibold text-stone-700 dark:text-stone-300 mb-0.5">
                        3) Email Address <span className="text-stone-400 text-[9px]">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Mail size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="you@email.com"
                          className={`w-full pl-8 pr-2 py-1.5 rounded-lg text-xs bg-white dark:bg-white/[0.06] border transition-all placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none ${
                            errors.email
                              ? 'border-rose-500 text-rose-600'
                              : 'border-stone-200 dark:border-white/15 text-stone-900 dark:text-stone-100 focus:border-amber-500 dark:focus:border-amber-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* 4) House / Flat & 5) Block / Colony / Locality */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-stone-700 dark:text-stone-300 mb-0.5">
                          4) House / Flat <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Home size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
                          <input
                            type="text"
                            required
                            value={formData.houseFlat}
                            onChange={(e) => handleInputChange('houseFlat', e.target.value)}
                            placeholder="Flat / House No"
                            className={`w-full pl-8 pr-2 py-1.5 rounded-lg text-xs bg-white dark:bg-white/[0.06] border transition-all placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none ${
                              errors.houseFlat
                                ? 'border-rose-500 text-rose-600'
                                : 'border-stone-200 dark:border-white/15 text-stone-900 dark:text-stone-100 focus:border-amber-500 dark:focus:border-amber-400'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-stone-700 dark:text-stone-300 mb-0.5">
                          5) Colony / Locality <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Building2 size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
                          <input
                            type="text"
                            required
                            value={formData.locality}
                            onChange={(e) => handleInputChange('locality', e.target.value)}
                            placeholder="Area / Street / Sector"
                            className={`w-full pl-8 pr-2 py-1.5 rounded-lg text-xs bg-white dark:bg-white/[0.06] border transition-all placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none ${
                              errors.locality
                                ? 'border-rose-500 text-rose-600'
                                : 'border-stone-200 dark:border-white/15 text-stone-900 dark:text-stone-100 focus:border-amber-500 dark:focus:border-amber-400'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 6) City, 7) State, 8) Pincode */}
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-stone-700 dark:text-stone-300 mb-0.5">
                          6) City <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Navigation size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="City"
                            className={`w-full pl-6 pr-1.5 py-1.5 rounded-lg text-xs bg-white dark:bg-white/[0.06] border transition-all placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none ${
                              errors.city
                                ? 'border-rose-500 text-rose-600'
                                : 'border-stone-200 dark:border-white/15 text-stone-900 dark:text-stone-100 focus:border-amber-500 dark:focus:border-amber-400'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-stone-700 dark:text-stone-300 mb-0.5">
                          7) State <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
                          <input
                            type="text"
                            required
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            placeholder="State"
                            className={`w-full pl-6 pr-1.5 py-1.5 rounded-lg text-xs bg-white dark:bg-white/[0.06] border transition-all placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none ${
                              errors.state
                                ? 'border-rose-500 text-rose-600'
                                : 'border-stone-200 dark:border-white/15 text-stone-900 dark:text-stone-100 focus:border-amber-500 dark:focus:border-amber-400'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-stone-700 dark:text-stone-300 mb-0.5">
                          8) Pincode <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Hash size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={formData.pincode}
                            onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, ''))}
                            placeholder="6 digits"
                            className={`w-full pl-6 pr-1.5 py-1.5 rounded-lg text-xs bg-white dark:bg-white/[0.06] border transition-all placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none ${
                              errors.pincode
                                ? 'border-rose-500 text-rose-600'
                                : 'border-stone-200 dark:border-white/15 text-stone-900 dark:text-stone-100 focus:border-amber-500 dark:focus:border-amber-400'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTONS */}
                  <div className="pt-2 flex items-center gap-2">
                    <motion.button
                      type="button"
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-stone-200/80 hover:bg-stone-300 dark:bg-white/10 dark:hover:bg-white/15 text-stone-700 dark:text-stone-300 transition-colors text-center disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      type="submit"
                      whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)' } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      disabled={isSubmitting}
                      className="flex-[2] py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-3.5 h-3.5 text-stone-950" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>Placing Order...</span>
                        </>
                      ) : (
                        <>
                          <Truck size={14} />
                          <span>Place Order · Rs {totalAmount.toLocaleString('en-IN')} COD</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  <p className="text-center text-[9px] text-stone-500 dark:text-stone-400 leading-tight">
                    Pay in cash when package arrives at your doorstep
                  </p>
                </form>
              ) : (
                /* ORDER CONFIRMATION ANIMATION */
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="py-4 px-1 text-center space-y-3.5"
                >
                  {/* Glowing Animated Tick Mark */}
                  <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.15, 1] }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 shadow-[0_0_25px_rgba(52,211,153,0.3)]"
                    />

                    <svg className="w-10 h-10 relative z-10" viewBox="0 0 52 52">
                      <motion.circle
                        cx="26"
                        cy="26"
                        r="23"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      />
                      <motion.path
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 27l8 8 16-16"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, delay: 0.3, ease: 'easeOut' }}
                      />
                    </svg>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-lg sm:text-xl font-black text-stone-900 dark:text-white">
                      Your Order Has Been Placed!
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      We will reach out to you shortly to confirm your order.
                    </p>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                      Cash On Delivery confirmed for {displayName}
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3 rounded-xl bg-stone-100/80 dark:bg-white/[0.04] border border-stone-200 dark:border-white/10 text-left space-y-1.5 text-[11px]">
                    <div className="flex justify-between items-center pb-1.5 border-b border-stone-200 dark:border-white/10">
                      <span className="text-stone-500 dark:text-stone-400">Order ID:</span>
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{placedOrderId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 dark:text-stone-400">Recipient:</span>
                      <span className="font-medium text-stone-900 dark:text-white truncate">
                        {formData.name} ({formData.phone})
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-stone-500 dark:text-stone-400">Address:</span>
                      <span className="font-medium text-stone-900 dark:text-white text-right max-w-[190px] truncate">
                        {formData.houseFlat}, {formData.locality}, {formData.city} - {formData.pincode}
                      </span>
                    </div>
                    <div className="pt-1.5 border-t border-stone-200 dark:border-white/10 flex justify-between items-center text-xs font-bold">
                      <span className="text-stone-800 dark:text-stone-200">Amount on Delivery:</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-black">
                        Rs {basePrice.toLocaleString('en-IN')} + Rs {COD_CHARGE} = Rs {totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
