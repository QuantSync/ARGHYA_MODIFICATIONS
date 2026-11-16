'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCartStore } from '../../../store/cartStore';
import { CartDrawer } from '../../../components/CartDrawer';
import { PaymentModal } from '../../../components/PaymentModal';
import { PaymentRedirectCard } from '../../../components/PaymentRedirectCard';
import { ShoppingBag, Truck, CheckCircle2, Star, StarHalf, MessageSquareQuote, ThumbsUp, PenLine, Sparkles, ChevronDown, ChevronUp, Filter, Layers, Share2, ShieldCheck, Package, Gift } from 'lucide-react';
import { PaymentLogosRow } from '../../../components/PaymentLogosRow';
import { Product } from '../../../lib/api';

import { BuyCODButton } from '../../../components/buttons/BuyCODButton';
import { CODChoiceModal } from '../../../components/modals/CODChoiceModal';
import { PayOnDeliveryModal } from '../../../components/modals/PayOnDeliveryModal';
import { BuyNowChoiceModal } from '../../../components/modals/BuyNowChoiceModal';
import { ProductReviewsModal } from '../../../components/modals/ProductReviewsModal';
import { getProductReviews } from '../../../lib/productReviews';

import { SoldOutSizeModal } from '../../../components/modals/SoldOutSizeModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { getCatalogProduct, PRODUCTS_CATALOG } from '../../../lib/productsCatalog';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const rawProduct = getCatalogProduct(params.slug) || PRODUCTS_CATALOG[params.slug];

  useEffect(() => {
    if (!rawProduct) {
      router.replace('/products');
    }
  }, [rawProduct, router]);

  const baseProduct = rawProduct || Object.values(PRODUCTS_CATALOG)[0];

  // Auto-select the colour that matches the URL slug
  const initialColorIdx = baseProduct.colorOptions
    ? Math.max(0, baseProduct.colorOptions.findIndex((opt: any) => opt.slug === params.slug))
    : 0;
  const [selectedColorIdx, setSelectedColorIdx] = useState(initialColorIdx);

  const initialSizes = baseProduct.colorOptions?.[initialColorIdx]?.sizes || baseProduct.sizes || ['Free Size'];
  const defaultInitialSize = initialSizes[0] || 'Free Size';
  const [selectedSize, setSelectedSize] = useState<string>(defaultInitialSize);
  const [isSoldOutModalOpen, setIsSoldOutModalOpen] = useState(false);

  // PaymentRedirectCard — Buy Now (bypasses cart)
  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null);

  const activeColorOption = baseProduct.colorOptions?.[selectedColorIdx];

  const product = {
    ...baseProduct,
    price: baseProduct.price,
    name: activeColorOption ? activeColorOption.name : baseProduct.name,
    slug: activeColorOption?.slug || baseProduct.slug,
    description: activeColorOption?.description || baseProduct.description,
    craft_type: activeColorOption?.craft_type || baseProduct.craft_type,
    sizes: activeColorOption?.sizes || baseProduct.sizes || ['Free Size'],
    images: activeColorOption ? activeColorOption.images : baseProduct.images
  };

  const sizes = product.sizes || ['Free Size'];

  useEffect(() => {
    const currentSizes = activeColorOption?.sizes || baseProduct.sizes || ['Free Size'];
    if (!currentSizes.includes(selectedSize)) {
      const fallback = currentSizes[0] || 'Free Size';
      setSelectedSize(fallback);
    }
  }, [activeColorOption, baseProduct.sizes, selectedSize]);

  // Product Reviews data
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const reviewSummary = getProductReviews(product.slug, product.name, product.category);
  const ratingNum = reviewSummary.rating;
  const ratingString = ratingNum.toFixed(1);
  const reviewCount = reviewSummary.totalReviews.toString();

  // Review Panel state: 6 reviews visible initially, remaining revealed via smooth glassmorphism panel
  const [isReviewPanelOpen, setIsReviewPanelOpen] = useState(false);
  const [reviewRatingFilter, setReviewRatingFilter] = useState<number | 'all'>('all');
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, boolean>>({});
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const toggleHelpful = (reviewId: string, initialCount: number) => {
    const isLiked = helpfulLikes[reviewId];
    setHelpfulLikes((prev) => ({ ...prev, [reviewId]: !isLiked }));
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] ?? initialCount) + (isLiked ? -1 : 1),
    }));
  };

  const INITIAL_REVIEWS_LIMIT = 6;
  const initialReviews = reviewSummary.reviews.slice(0, INITIAL_REVIEWS_LIMIT);
  const remainingReviews = reviewSummary.reviews.slice(INITIAL_REVIEWS_LIMIT);
  const displayedRemainingReviews = reviewRatingFilter === 'all'
    ? remainingReviews
    : remainingReviews.filter(r => r.rating === reviewRatingFilter);

  const [isBuyNowChoiceOpen, setIsBuyNowChoiceOpen] = useState(false);
  const [isCODModalOpen, setIsCODModalOpen] = useState(false);
  const [isPODModalOpen, setIsPODModalOpen] = useState(false);


  const [quantity, setQuantity] = useState<number>(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isFaqsOpen, setIsFaqsOpen] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>('');
  const [deliveryChecked, setDeliveryChecked] = useState<boolean>(false);
  const [isGiftCustomOpen, setIsGiftCustomOpen] = useState<boolean>(false);
  const [giftMessage, setGiftMessage] = useState<string>('');

  // ── Mystery Jar: size-based payment URL ────────────────────────────────────
  const isMysteryJar = product.slug === 'mystery-jar';
  const mysteryJarPaymentUrl = isMysteryJar
    ? selectedSize === 'Medium (₹799)'
      ? 'https://rzp.io/rzp/mysteryjarmediumsize'
      : selectedSize === 'Large (₹1499)'
      ? 'https://rzp.io/rzp/mysteryjarlarge'
      : 'https://rzp.io/rzp/mysteryjar'
    : null;

  const mysteryJarPrice = isMysteryJar
    ? selectedSize === 'Medium (₹799)' ? 799
    : selectedSize === 'Large (₹1499)' ? 1499
    : 499
    : product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <CartDrawer onCheckout={() => setIsPaymentModalOpen(true)} />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
      <PaymentRedirectCard
        isOpen={buyNowProduct !== null}
        onClose={() => setBuyNowProduct(null)}
        product={buyNowProduct}
      />
      <CODChoiceModal
        isOpen={isCODModalOpen}
        onClose={() => setIsCODModalOpen(false)}
        product={product as Product}
        onRazorpayCOD={(p) => setBuyNowProduct(p)}
        onPayOnDelivery={(p) => setIsPODModalOpen(true)}
      />
      <PayOnDeliveryModal
        isOpen={isPODModalOpen}
        onClose={() => setIsPODModalOpen(false)}
        product={product as Product}
        selectedSize={selectedSize}
        effectivePrice={isMysteryJar ? mysteryJarPrice : product.price}
      />
      <ProductReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        product={product as Product}
      />
      <SoldOutSizeModal
        isOpen={isSoldOutModalOpen}
        onClose={() => setIsSoldOutModalOpen(false)}
        productName={product.name}
        onSelectSize={(size) => setSelectedSize(size)}
      />
      <BuyNowChoiceModal
        isOpen={isBuyNowChoiceOpen}
        onClose={() => setIsBuyNowChoiceOpen(false)}
        product={product as Product}
        selectedSize={selectedSize}
        onPayOnline={() => setBuyNowProduct(product as Product)}
        onCashOnDelivery={() => setIsCODModalOpen(true)}
        onPayOnDelivery={() => setIsPODModalOpen(true)}
      />

      {/* Breadcrumb */}
      <nav className="text-xs text-stone-500 dark:text-stone-400 mb-6 flex flex-wrap items-center gap-1.5">
        <span>Home</span>
        <span className="opacity-40">/</span>
        <span>{product.category}</span>
        {product.subcategory && (
          <>
            <span className="opacity-40">/</span>
            <span>{product.subcategory}</span>
          </>
        )}
        <span className="opacity-40">/</span>
        <span className="text-stone-800 dark:text-stone-200 font-semibold truncate max-w-[220px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mt-2">

        {/* ═══════════════════════ LEFT: Image Gallery ═══════════════════════ */}
        <div className="space-y-4">
          <div className="relative h-[550px] sm:h-[700px] w-full rounded-2xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 flex flex-col items-center justify-center p-8 text-center">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-500 font-bold mb-2">
                  {product.category} {product.subcategory ? `• ${product.subcategory}` : ''}
                </span>
                <h4 className="font-serif text-3xl font-bold text-neutral-800 dark:text-neutral-200 max-w-md leading-snug mb-6">
                  {product.name}
                </h4>
                <div className="flex flex-col items-center">
                  <span className="inline-block px-5 py-2.5 rounded-full text-xs uppercase font-black tracking-wider bg-black text-white dark:bg-white dark:text-black shadow">
                    PRODUCT OUT OF STOCK
                  </span>
                </div>
              </div>
            )}
          </div>
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative h-24 sm:h-32 w-full rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${selectedImageIdx === idx ? 'border-black dark:border-white opacity-100 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ══════════════════════ RIGHT: Product Info ═════════════════════ */}
        <div className="flex flex-col gap-4">

          {/* 1. Product Title + Share */}
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug flex-1 min-w-0">
              {product.name}
            </h1>
            <button
              type="button"
              title="Share product"
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.share) {
                  navigator.share({ title: product.name, url: window.location.href });
                } else if (typeof navigator !== 'undefined') {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="mt-1 p-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
            >
              <Share2 size={16} className="text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>

          {/* 2. Price Row */}
          {(() => {
            const effectivePrice = isMysteryJar ? mysteryJarPrice : product.price;
            const comparePrice = product.compare_at_price && product.compare_at_price > effectivePrice
              ? product.compare_at_price
              : Math.round(effectivePrice * 2.27);
            const savePercent = comparePrice > effectivePrice
              ? Math.round(((comparePrice - effectivePrice) / comparePrice) * 100)
              : 0;
            return (
              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span suppressHydrationWarning className="text-2xl sm:text-[28px] font-normal text-neutral-900 dark:text-neutral-100">
                    ₹ {effectivePrice.toLocaleString('en-IN')}
                  </span>
                  {comparePrice > effectivePrice && (
                    <span suppressHydrationWarning className="text-lg text-neutral-500 dark:text-neutral-400 line-through font-normal">
                      ₹ {comparePrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {savePercent > 0 && (
                    <span className="bg-[#0052cc] text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wide">
                      Save {savePercent}%
                    </span>
                  )}
                  {product.combo_price && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-black text-white dark:bg-white dark:text-black">
                      BUY 2 @ ₹{product.combo_price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  Inclusive of all taxes. Free Shipping Pan INDIA
                </p>
              </div>
            );
          })()}

          {/* 3. Star Rating */}
          <button
            type="button"
            onClick={() => setIsReviewsModalOpen(true)}
            className="flex items-center gap-2 group cursor-pointer w-fit"
            title="View all reviews"
          >
            <div className="flex items-center gap-0.5">
              {[1,2,3,4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
              ))}
              {ratingNum >= 4.8
                ? <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                : <StarHalf className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
              }
            </div>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {ratingString} <span className="text-neutral-400 font-normal mx-0.5">|</span> {reviewCount}
            </span>
          </button>

          {/* Colour Options */}
          {baseProduct.colorOptions && baseProduct.colorOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                Colour Available
              </label>
              <div className="flex flex-wrap gap-2">
                {baseProduct.colorOptions.map((opt: any, idx: number) => (
                  <button
                    key={opt.colorName}
                    onClick={() => { setSelectedColorIdx(idx); setSelectedImageIdx(0); }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedColorIdx === idx
                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                        : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-neutral-300" style={{ backgroundColor: opt.colorHex }} />
                    <span>{opt.colorName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size / Jar Selection */}
          {sizes && sizes.length > 0 && (sizes.length > 1 || sizes[0] !== 'Free Size') && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                {isMysteryJar ? 'Select Jar Size / Option' : 'Select Size'}
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sizeOption: string) => {
                  const isSelected = selectedSize === sizeOption;
                  return (
                    <button
                      key={sizeOption}
                      type="button"
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                          : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      {sizeOption}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Check Delivery */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-800 dark:text-neutral-200 block">
              Check Delivery
            </label>
            <div className="flex w-full border border-neutral-300 dark:border-neutral-700 rounded overflow-hidden">
              <input
                type="text"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setDeliveryChecked(false);
                }}
                placeholder="Enter your pincode"
                className="flex-1 px-3.5 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => { if (pincode.length === 6) setDeliveryChecked(true); }}
                className="bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest shrink-0 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                CHECK
              </button>
            </div>
            {deliveryChecked && (
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5 pt-0.5">
                <CheckCircle2 size={12} className="shrink-0" />
                Free delivery in 3–5 business days across India
              </p>
            )}
          </div>

          {/* 5. 4 Value Pillars */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 bg-white dark:bg-neutral-950/60">
            <div className="grid grid-cols-4 divide-x divide-neutral-200 dark:divide-neutral-800 text-center">
              <div className="flex flex-col items-center gap-1 px-1 py-1">
                <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-neutral-800 dark:text-amber-200"><ShieldCheck size={22} strokeWidth={1.6} /></div>
                <span className="text-[9px] sm:text-[10px] font-bold text-neutral-800 dark:text-neutral-200 leading-tight">Quality<br />Guaranteed</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-1 py-1">
                <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-neutral-800 dark:text-amber-200"><Package size={22} strokeWidth={1.6} /></div>
                <span className="text-[9px] sm:text-[10px] font-bold text-neutral-800 dark:text-neutral-200 leading-tight">Premium<br />Packaging</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-1 py-1">
                <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-neutral-800 dark:text-amber-200"><Sparkles size={20} strokeWidth={1.6} /></div>
                <span className="text-[9px] sm:text-[10px] font-bold text-neutral-800 dark:text-neutral-200 leading-tight">Anti<br />Tarnish</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-1 py-1">
                <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-neutral-800 dark:text-amber-200"><Truck size={22} strokeWidth={1.6} /></div>
                <span className="text-[9px] sm:text-[10px] font-bold text-neutral-800 dark:text-neutral-200 leading-tight">Free<br />Shipping</span>
              </div>
            </div>
          </div>

          {/* 6. Send as a Gift */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 bg-white dark:bg-neutral-950/60">
            <button
              type="button"
              onClick={() => setIsGiftCustomOpen(prev => !prev)}
              className="w-full flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center shrink-0">
                  <Gift size={16} className="text-amber-700 dark:text-amber-300" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] sm:text-xs font-bold text-neutral-900 dark:text-neutral-100 tracking-wide uppercase">SEND AS A GIFT ?</p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Tap for customisation</p>
                </div>
              </div>
              <svg viewBox="0 0 32 32" className="w-9 h-9 fill-neutral-900 dark:fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="12" width="24" height="3" rx="0.5" />
                <rect x="6.5" y="15.5" width="8" height="10.5" rx="0.3" />
                <rect x="17.5" y="15.5" width="8" height="10.5" rx="0.3" />
                <path d="M13 12 C10 12 7 10 9 7 C11 4 14 7 15 12Z" />
                <path d="M19 12 C22 12 25 10 23 7 C21 4 18 7 17 12Z" />
              </svg>
            </button>
            <AnimatePresence>
              {isGiftCustomOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800"
                >
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 mb-2">
                    🎁 Complimentary handwritten gift note &amp; luxury unboxing included with every gift order:
                  </p>
                  <input
                    type="text"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Recipient name or special message (Optional)"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-black dark:focus:border-white"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 7. Add To Cart | Buy Now */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => addItem(product, {
                id: `v-${product.slug}-${selectedColorIdx}`,
                product_id: product.id,
                size: selectedSize,
                color: activeColorOption?.colorName || 'Default',
                sku: `ARG-${product.slug.toUpperCase()}`,
                quantity_avail: 15
              })}
              className="flex-1 bg-white dark:bg-transparent border border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white text-neutral-900 dark:text-white py-3.5 rounded-md font-semibold text-xs sm:text-sm tracking-wide transition-all"
            >
              Add To Cart
            </button>
            <button
              type="button"
              onClick={() => {
                if (isMysteryJar && mysteryJarPaymentUrl) {
                  window.location.href = mysteryJarPaymentUrl;
                  return;
                }
                setIsBuyNowChoiceOpen(true);
              }}
              className="flex-1 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 py-3.5 rounded-md font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-sm"
            >
              Buy Now
            </button>
          </div>

          {/* 8. Payment Logos */}
          <PaymentLogosRow />

          {/* 9. Product Details Accordion */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3">
            <button
              type="button"
              onClick={() => setIsDetailsOpen(prev => !prev)}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors cursor-pointer"
            >
              <span>Product Details , Material &amp; Care</span>
              <motion.span animate={{ rotate: isDetailsOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-lg leading-none font-light text-neutral-500">+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isDetailsOpen && (
                <motion.div key="details-drawer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                  <div className="pb-4 pt-1">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                      {product.description || 'Premium quality 925 Sterling Silver. Anti-tarnish coated. Skin-safe and waterproof.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 10. FAQ's Accordion */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3">
            <button
              type="button"
              onClick={() => setIsFaqsOpen(prev => !prev)}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors cursor-pointer"
            >
              <span>FAQ&apos;s</span>
              <motion.span animate={{ rotate: isFaqsOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-lg leading-none font-light text-neutral-500">+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isFaqsOpen && (
                <motion.div key="faqs-drawer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                  <div className="pb-4 pt-2 space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                    <div>
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200">Is this genuine 925 Pure Silver / Anti-Tarnish?</p>
                      <p className="mt-0.5 leading-relaxed">Yes, all our pure silver pieces are crafted with authentic 925 sterling silver, and our anti-tarnish jewelry features premium anti-fade waterproof coating.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200">What are the delivery charges and timeline?</p>
                      <p className="mt-0.5 leading-relaxed">Free Shipping Pan India on all prepaid orders. Delivery typically takes 3–5 business days across India.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200">How do I keep my jewelry looking brand new?</p>
                      <p className="mt-0.5 leading-relaxed">Store in the airtight pouch provided. Avoid direct contact with strong perfumes, detergents, or chlorine to preserve lustrous shine.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── Quality Assurance Trust Banner (Image 1) - Just Above Footer ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 mb-4">
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-[#3b0d14] bg-[#290a0e] select-none">
          <img
            src="/images/home/quality_assurance_banner.png"
            alt="925 Silver Purity Certificate, Free Shipping Across India, High Quality Material, 7 Days Exchange & Return"
            width={1024}
            height={188}
            className="w-full h-auto object-contain block"
            loading="lazy"
          />
        </div>
      </section>

    </div>
  );
}