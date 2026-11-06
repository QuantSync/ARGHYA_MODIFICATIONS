'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../lib/api';
import { useCartStore } from '../store/cartStore';
import { BulgeWidget } from './BulgeWidget';
import { CardShiningBorder } from './animations/CardShiningBorder';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, ShoppingBag, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { BuyCODButton } from './buttons/BuyCODButton';
import { CODChoiceModal } from './modals/CODChoiceModal';
import { PayOnDeliveryModal } from './modals/PayOnDeliveryModal';
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
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isCODModalOpen, setIsCODModalOpen] = useState(false);
  const [isPODModalOpen, setIsPODModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveCouponActive = mounted
    ? (propIsCouponActive !== undefined ? propIsCouponActive : storeIsCouponActive)
    : (propIsCouponActive !== undefined ? propIsCouponActive : false);

  const effectiveCouponCode = (propActiveCouponCode !== undefined ? propActiveCouponCode : storeActiveCouponCode)?.trim().toUpperCase() || null;

  const storeDiscountedPrice = (effectiveCouponActive && effectiveCouponCode) ? getDiscountedPrice(product.slug, effectiveCouponCode) : null;
  const currentPrice = storeDiscountedPrice !== null ? storeDiscountedPrice : product.price;

  const baseOriginalPrice = product.compare_at_price ? product.compare_at_price : (product.price * 1.6);
  const extraDiscountPercent = storeDiscountedPrice !== null ? getDiscountPercent(baseOriginalPrice, storeDiscountedPrice) : 0;

  const reviewSummary = getProductReviews(product.slug, product.name, product.category);

  const currentOption = product.colorOptions?.[selectedColorIdx];
  const activeName = currentOption?.name || product.name;
  const rawImage = currentOption?.images?.[0] || product.images?.[0];
  const hasImage = Boolean(rawImage && rawImage.trim().length > 0);
  const activeImage = rawImage || '';

  const activeProduct: Product = {
    ...product,
    name: activeName,
    price: currentPrice,
    images: currentOption ? currentOption.images : product.images,
    sizes: currentOption?.sizes || product.sizes
  };

  const isEven = index % 2 === 0;

  const handleAddToCart = () => {
    addItem(activeProduct);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  const handleBuyNowClick = () => {
    const rzpUrl = (product as any).razorpay_url as string | undefined;
    if (rzpUrl) {
      window.open(rzpUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    onBuyNow?.(activeProduct);
  };

  return (
    <>
      {/* COD Choice Modal */}
      <CODChoiceModal
        isOpen={isCODModalOpen}
        onClose={() => setIsCODModalOpen(false)}
        product={activeProduct}
        onRazorpayCOD={(p) => onBuyNow?.(p)}
        onPayOnDelivery={() => setIsPODModalOpen(true)}
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

      {/* Individual Product Catalogue Showcase Row */}
      <section className="w-full py-10 sm:py-16 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-14 items-start w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          
          {/* ── Left Column: Product Photography Showcase (like individual catalogue) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full lg:w-1/2 shrink-0"
          >
            <BulgeWidget scaleHover={1.015} liftY={-4}>
              <CardShiningBorder roundedClassName="rounded-3xl">
                <Link
                  href={`/products/${product.slug}?variant=${currentOption?.colorName.toLowerCase() || 'default'}`}
                  className="relative h-[440px] sm:h-[540px] md:h-[620px] w-full overflow-hidden block rounded-3xl group bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                >
                  {hasImage ? (
                    <Image
                      key={activeImage}
                      src={activeImage}
                      alt={activeName}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-20 h-20 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center mb-4 bg-white/60 dark:bg-black/60 shadow-sm">
                        <span className="font-serif text-2xl font-light text-neutral-400">925</span>
                      </div>
                      <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 font-bold mb-2">
                        {product.category} {product.subcategory ? `• ${product.subcategory}` : ''}
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-neutral-800 dark:text-neutral-200 max-w-sm">
                        {activeName}
                      </h4>
                    </div>
                  )}

                  {/* Top Quality Badge */}
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                    <span className="bg-black/90 dark:bg-white/90 text-white dark:text-black text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full tracking-widest uppercase shadow-md backdrop-blur-sm">
                      {product.category === 'Anti Tarnish' ? 'Anti-Tarnish' : '925 Silver'}
                    </span>
                    {product.combo_price && (
                      <span className="bg-rose-700 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-md">
                        HOT COMBO
                      </span>
                    )}
                  </div>
                </Link>
              </CardShiningBorder>
            </BulgeWidget>
          </motion.div>

          {/* ── Right Column: Individual Product Info & Order Panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="w-full lg:w-1/2 flex flex-col space-y-5"
          >
            {/* Category Breadcrumb */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-neutral-500 uppercase tracking-widest font-mono font-bold">
                {product.category} {product.subcategory ? `• ${product.subcategory}` : ''} {product.fabric ? `• ${product.fabric}` : ''}
              </span>
            </div>

            {/* Product Title */}
            <Link href={`/products/${product.slug}?variant=${currentOption?.colorName.toLowerCase() || 'default'}`}>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors leading-tight">
                {activeName}
              </h2>
            </Link>

            {/* Reviews Summary Pill (Click opens reviews modal) */}
            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <button
                type="button"
                onClick={() => setIsReviewsModalOpen(true)}
                className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all text-left shadow-sm cursor-pointer"
                title="Click to view verified customer reviews"
              >
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= Math.round(reviewSummary.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-900 dark:text-amber-300">
                  {reviewSummary.rating.toFixed(1)}
                </span>
                <span className="text-[11px] text-neutral-600 dark:text-neutral-300 font-medium group-hover:underline">
                  ({reviewSummary.totalReviews} reviews)
                </span>
              </button>

              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                {reviewSummary.recommendPercent}% Recommend
              </span>
            </div>

            {/* Price Row */}
            <div className="flex flex-wrap items-baseline gap-3 pt-1">
              <span
                suppressHydrationWarning
                className="text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-white"
              >
                ₹{Number(currentPrice).toLocaleString('en-IN')}
              </span>

              {product.compare_at_price && (
                <span suppressHydrationWarning className="text-base sm:text-lg text-neutral-400 line-through">
                  ₹{Number(product.compare_at_price).toLocaleString('en-IN')}
                </span>
              )}

              {product.compare_at_price && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                  {Math.round(((product.compare_at_price - currentPrice) / product.compare_at_price) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Combo Banner If Present */}
            {product.combo_price && (
              <div className="w-full p-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold flex items-center justify-between tracking-wide uppercase shadow-sm">
                <span>Special Deal</span>
                <span>BUY 2 @ ₹{product.combo_price.toLocaleString('en-IN')}</span>
              </div>
            )}

            {/* Color/Variant Selection If Multiple */}
            {product.colorOptions && product.colorOptions.length > 0 && (
              <div className="flex flex-col space-y-2 pt-1">
                <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 tracking-wider uppercase">
                  Available Finishes:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.colorOptions.map((opt, idx) => (
                    <button
                      key={opt.colorName}
                      type="button"
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                        selectedColorIdx === idx
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                          : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-neutral-300" style={{ backgroundColor: opt.colorHex }} />
                      <span>{opt.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── ACTION BUTTONS: Add To Cart & Buy Now (Matching Individual Catalogue Page) ── */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                {/* Add To Cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-white dark:bg-transparent border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black py-3.5 sm:py-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  <ShoppingBag size={16} />
                  <span>{isAddedSuccess ? 'Added to Cart ✓' : 'Add To Cart'}</span>
                </button>

                {/* Buy Now */}
                <button
                  type="button"
                  onClick={handleBuyNowClick}
                  className="flex-1 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-100 py-3.5 sm:py-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg cursor-pointer active:scale-[0.99]"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Cash On Delivery Dedicated Button */}
              <BuyCODButton
                onClick={() => setIsCODModalOpen(true)}
                size="lg"
                fadeDelay={0.1}
                className="w-full"
              />
            </div>

            {/* ── Trust Badges Image (Same as Individual Product Page) ── */}
            <div className="relative w-full rounded-xl overflow-hidden pt-1">
              <Image
                src="/trust-badges.jpg"
                alt="925 Pure Silver Quality Guaranteed, Free Shipping Across India, 6 Month Replacement, Cash On Delivery Available"
                width={900}
                height={340}
                className="w-full h-auto object-contain rounded-xl"
                quality={95}
              />
            </div>

            {/* ── Product Details Collapsible with Plus (+) Icon (Only appears after clicking '+') ── */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 w-full">
              <button
                type="button"
                onClick={() => setIsDetailsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-2.5 text-sm font-bold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer select-none"
              >
                <span>Product Details, Material &amp; Care</span>
                <motion.span
                  animate={{ rotate: isDetailsOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl leading-none font-light text-neutral-500 shrink-0"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isDetailsOpen && (
                  <motion.div
                    key="details-drawer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 pt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line font-sans border-t border-neutral-100 dark:border-neutral-800/60 mt-1">
                      {product.description || (
                        'Premium quality authenticated fine jewellery from ARGHYA. Anti-tarnish coated with skin-friendly hypoallergenic finishes. Avoid direct chemical exposure to retain lifetime shine.'
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Benefits Strip */}
            <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500 uppercase tracking-wider pt-1">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-neutral-800 dark:text-neutral-200" />
                Free Express Delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-neutral-800 dark:text-neutral-200" />
                Anti-Tarnish Certified
              </span>
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
};
