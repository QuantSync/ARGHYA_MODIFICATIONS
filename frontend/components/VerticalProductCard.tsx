'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../lib/api';
import { useCartStore } from '../store/cartStore';
import { BulgeWidget } from './BulgeWidget';
import { CardShiningBorder } from './animations/CardShiningBorder';
import { AnimatedButton } from './AnimatedButton';
import { ScrollZoomIn } from './animations/ScrollZoomIn';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, MessageSquareQuote } from 'lucide-react';
import { BuyCODButton } from './buttons/BuyCODButton';
import { CODChoiceModal } from './modals/CODChoiceModal';
import { PayOnDeliveryModal } from './modals/PayOnDeliveryModal';
import { LimitedStockSticker } from './LimitedStockSticker';
import { ProductReviewsModal } from './modals/ProductReviewsModal';
import { getProductReviews } from '../lib/productReviews';
import { useCouponStore, getDiscountedPrice, getDiscountPercent } from '../store/couponStore';

interface VerticalProductCardProps {
  product: Product;
  index: number;
  onBuyNow?: (product: Product) => void;
  /** When true, shows coupon-active badge on eligible products */
  isCouponActive?: boolean;
  activeCouponCode?: string | null;
}

export const VerticalProductCard: React.FC<VerticalProductCardProps> = ({
  product,
  index,
  onBuyNow,
  isCouponActive: propIsCouponActive,
  activeCouponCode: propActiveCouponCode,
}) => {
  const { addItem } = useCartStore();
  const { isCouponActive: storeIsCouponActive, activeCouponCode: storeActiveCouponCode } = useCouponStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Guard with mounted so initial client render matches server-rendered HTML exactly
  const effectiveCouponActive = mounted
    ? (propIsCouponActive !== undefined ? propIsCouponActive : storeIsCouponActive)
    : (propIsCouponActive !== undefined ? propIsCouponActive : false);

  const effectiveCouponCode = (propActiveCouponCode !== undefined ? propActiveCouponCode : storeActiveCouponCode)?.trim().toUpperCase() || null;

  // Calculate dynamic discounted price if coupon is active
  const storeDiscountedPrice = (effectiveCouponActive && effectiveCouponCode) ? getDiscountedPrice(product.slug, effectiveCouponCode) : null;
  const currentPrice = storeDiscountedPrice !== null ? storeDiscountedPrice : product.price;

  // Calculate extra discount percent compared to original base price
  const baseOriginalPrice = product.slug === 'rangrez-chaniya-set' ? 2099 : (product.compare_at_price ? product.price : product.price);
  const extraDiscountPercent = storeDiscountedPrice !== null ? getDiscountPercent(baseOriginalPrice, storeDiscountedPrice) : 0;
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isCODModalOpen, setIsCODModalOpen] = useState(false);
  const [isPODModalOpen, setIsPODModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  const reviewSummary = getProductReviews(product.slug, product.name, product.category);

  const currentOption = product.colorOptions?.[selectedColorIdx];
  const activeName = currentOption?.name || product.name;
  const rawImage = currentOption?.images?.[0] || product.images?.[0];
  const hasImage = Boolean(rawImage && rawImage.trim().length > 0);
  const activeImage = rawImage || '';

  const activeProduct: Product = {
    ...product,
    name: activeName,
    images: currentOption ? currentOption.images : product.images,
    sizes: currentOption?.sizes || product.sizes
  };

  const isEven = index % 2 === 0;

  return (
    <>
    {/* COD Choice Modal */}
    <CODChoiceModal
      isOpen={isCODModalOpen}
      onClose={() => setIsCODModalOpen(false)}
      product={activeProduct}
      onRazorpayCOD={(p) => onBuyNow?.(p)}
      onPayOnDelivery={(p) => setIsPODModalOpen(true)}
    />
    {/* Pay On Delivery Modal */}
    <PayOnDeliveryModal
      isOpen={isPODModalOpen}
      onClose={() => setIsPODModalOpen(false)}
      product={activeProduct}
      effectivePrice={currentPrice}
    />
    {/* Product Reviews Modal */}
    <ProductReviewsModal
      isOpen={isReviewsModalOpen}
      onClose={() => setIsReviewsModalOpen(false)}
      product={activeProduct}
    />
    <div className={`flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-start w-full my-16 relative`}>
      {/* Image Side — on mobile appears FIRST (order-1), on desktop follows alternating layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        className="flex-1 w-full order-1 md:order-none"
      >
        <BulgeWidget scaleHover={1.02} liftY={-8}>
          <CardShiningBorder roundedClassName="rounded-[2.5rem]">
            <Link href={`/products/${product.slug}?variant=${currentOption?.colorName.toLowerCase() || 'default'}`} className="relative h-[500px] md:h-[700px] w-full overflow-hidden block rounded-[2.5rem] group">
              {hasImage ? (
                <Image
                  key={activeImage}
                  src={activeImage}
                  alt={activeName}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 flex flex-col items-center justify-center p-8 text-center border border-neutral-200 dark:border-neutral-800">
                  <div className="w-24 h-24 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center mb-6 bg-white/50 dark:bg-black/50 shadow-sm">
                    <span className="font-serif text-3xl font-light text-neutral-400 dark:text-neutral-500">925</span>
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-500 font-bold mb-2">
                    {product.category} {product.subcategory ? `• ${product.subcategory}` : ''}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-neutral-800 dark:text-neutral-200 max-w-sm leading-snug">
                    {activeName}
                  </h4>
                  <div className="mt-6 flex flex-col items-center gap-1">
                    <span className="inline-block px-4 py-1.5 rounded-full text-[11px] uppercase font-black tracking-widest bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      PRODUCT OUT OF STOCK
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
                      COMING SOON
                    </span>
                  </div>
                </div>
              )}
              {product.combo_price && (
                <span className="absolute bottom-6 left-6 bg-black text-white dark:bg-white dark:text-black text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-lg z-10 border border-neutral-400/30">
                  BUY 2 @ ₹{product.combo_price.toLocaleString('en-IN')}
                </span>
              )}
              {product.compare_at_price && !product.combo_price && (
                <span className="absolute top-6 left-6 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg z-10">
                  925 Silver
                </span>
              )}
            </Link>
          </CardShiningBorder>
        </BulgeWidget>
      </motion.div>

      {/* Text Side — on mobile appears SECOND (order-2), on desktop follows alternating layout */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex-1 space-y-6 w-full order-2 md:order-none"
      >
        <div>
          <span className="text-[10px] md:text-xs text-burgundy-700 dark:text-amber-400 uppercase tracking-widest font-mono font-bold">
            {product.category} {product.fabric ? `• ${product.fabric}` : ''}
          </span>
          <Link href={`/products/${product.slug}?variant=${currentOption?.colorName.toLowerCase() || 'default'}`}>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-burgundy-900 dark:text-stone-100 hover:text-burgundy-700 dark:hover:text-amber-300 transition-colors mt-2 leading-tight">
                {activeName}
              </h3>
          </Link>

          {/* Product Reviews Summary Bar & Live Urgency Sticker */}
          <div className="flex flex-wrap items-center gap-2.5 mt-3">
            <button
              type="button"
              onClick={() => setIsReviewsModalOpen(true)}
              className="group flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 dark:bg-stone-900/90 dark:hover:bg-amber-500/15 border border-amber-500/30 hover:border-amber-400 transition-all text-left shadow-sm"
              title="Click to view verified customer reviews"
            >
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.round(reviewSummary.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-burgundy-950 dark:text-amber-300">
                {reviewSummary.rating.toFixed(1)}
              </span>
              <span className="text-[11px] text-burgundy-700/90 dark:text-stone-300 font-medium group-hover:underline">
                ({reviewSummary.totalReviews} reviews)
              </span>
            </button>

            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              {reviewSummary.recommendPercent}% Recommend
            </span>
          </div>
        </div>

        {product.colorOptions && product.colorOptions.length > 0 && (
          <div className="flex flex-col space-y-2 pt-1">
            <span className="text-xs font-bold text-burgundy-800/70 dark:text-amber-400/90 tracking-wider uppercase">
              Color Option / Variant:
            </span>
            <div className="flex flex-wrap gap-3">
              {product.colorOptions.map((opt, idx) => (
                <button
                  key={opt.colorName}
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all ${
                    selectedColorIdx === idx
                      ? 'border-amber-400 bg-amber-500/20 text-amber-300 scale-105 shadow-md ring-1 ring-amber-400'
                      : 'border-burgundy-800/20 dark:border-stone-700 bg-stone-900/60 text-stone-300 hover:border-amber-500/50'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full border border-stone-200" style={{ backgroundColor: opt.colorHex }} />
                  <span>{opt.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm md:text-base text-burgundy-800/80 dark:text-stone-400 leading-relaxed font-sans max-w-lg">
          {product.description || ''}
        </p>

        {/* Customer Review Spotlight Card */}
        {reviewSummary.featuredReview && (
          <div
            onClick={() => setIsReviewsModalOpen(true)}
            className="cursor-pointer group p-3.5 sm:p-4 rounded-2xl bg-amber-500/[0.05] dark:bg-stone-900/70 border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-sm max-w-lg space-y-2 relative overflow-hidden"
            title="Click to read verified reviews and ratings"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5">
                <MessageSquareQuote className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-bold text-burgundy-900 dark:text-amber-200 text-xs">
                  {reviewSummary.featuredReview.author}
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">
                  • {reviewSummary.featuredReview.city}
                </span>
                <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  Verified
                </span>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-burgundy-800/85 dark:text-stone-300 italic line-clamp-2 leading-relaxed font-sans">
              "{reviewSummary.featuredReview.comment}"
            </p>
            <div className="flex items-center justify-between pt-1 text-[11px]">
              <span className="text-amber-700 dark:text-amber-400 font-semibold group-hover:underline">
                Read all {reviewSummary.totalReviews} verified reviews →
              </span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400">
                {reviewSummary.featuredReview.date}
              </span>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap items-center gap-6 pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span
                suppressHydrationWarning
                className="text-2xl md:text-3xl font-bold transition-all duration-300"
                style={effectiveCouponActive && storeDiscountedPrice !== null ? { color: '#4ade80', textShadow: '0 0 14px rgba(74,222,128,0.45)' } : undefined}
              >
                ₹{Number(currentPrice).toLocaleString('en-IN')}
              </span>

              {/* Shining Green / Golden Extra Discount Badge */}
              {effectiveCouponActive && effectiveCouponCode && extraDiscountPercent > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider overflow-hidden shadow-lg select-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(245,158,11,0.25) 50%, rgba(34,197,94,0.2) 100%)',
                    border: '1.5px solid rgba(245, 158, 11, 0.65)',
                    color: '#fef08a',
                    boxShadow: '0 0 16px rgba(34, 197, 94, 0.4), 0 0 10px rgba(245, 158, 11, 0.35)',
                    textShadow: '0 0 8px rgba(250, 204, 21, 0.8)',
                  }}
                >
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{effectiveCouponCode}</span>
                  <span className="bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded-full text-[10px] font-black border border-emerald-400/40">
                    {extraDiscountPercent}% EXTRA OFF
                  </span>
                  {/* Subtle shimmer sweep */}
                  <motion.span
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                    }}
                  />
                </motion.span>
              )}

              {/* Limited Stocks Available sticker - displayed next to price */}
              <LimitedStockSticker
                product={{ ...activeProduct, price: currentPrice }}
                onBuyNow={onBuyNow}
                onAddToCart={addItem}
              />
            </div>
            {(product.compare_at_price || (storeDiscountedPrice !== null && baseOriginalPrice > currentPrice)) && (
              <span suppressHydrationWarning className="text-sm text-burgundy-800/50 dark:text-stone-500 line-through">
                - Rs {Number(storeDiscountedPrice !== null ? baseOriginalPrice : product.compare_at_price).toLocaleString('en-IN')}
              </span>
            )}
            {product.combo_price && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Combo Offer: BUY 2 @ ₹{product.combo_price.toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>

          <ScrollZoomIn delay={0.6} duration={0.5} className="flex flex-col gap-3 w-full sm:w-auto">
            {/* Buy · Cash On Delivery */}
            <BuyCODButton
              onClick={() => setIsCODModalOpen(true)}
              size="lg"
              fadeDelay={0.65}
              className="w-full"
            />
            <BulgeWidget scaleHover={1.05} liftY={-4}>
              <AnimatedButton
                onClick={() => {
                  // If product has a Razorpay URL, open payment link directly
                  const rzpUrl = (product as any).razorpay_url as string | undefined;
                  if (rzpUrl) {
                    window.open(rzpUrl, '_blank', 'noopener,noreferrer');
                    return;
                  }
                  // Fallback: Buy Now bypasses the cart — open PaymentRedirectCard directly
                  onBuyNow?.(activeProduct);
                }}
                className="w-full !px-8 !py-3 font-bold text-xs tracking-wider uppercase !bg-black hover:!bg-neutral-800 !text-white border-none shadow-lg"
              >
                Buy Now
              </AnimatedButton>
            </BulgeWidget>
            <BulgeWidget scaleHover={1.05} liftY={-4}>
              <AnimatedButton
                onClick={() => addItem(activeProduct)}
                className="w-full !px-8 !py-3 font-bold text-sm tracking-wider uppercase border border-burgundy-800/20 dark:border-amber-500/20 bg-transparent text-stone-900 hover:text-white dark:text-amber-500 hover:bg-burgundy-800 dark:hover:bg-amber-500/10 dark:hover:text-amber-500 transition-colors"
              >
                Add to Shopping Bag
              </AnimatedButton>
            </BulgeWidget>
          </ScrollZoomIn>
        </div>
      </motion.div>
    </div>
    </>
  );
};
