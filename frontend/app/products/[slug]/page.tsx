'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCartStore } from '../../../store/cartStore';
import { CartDrawer } from '../../../components/CartDrawer';
import { PaymentModal } from '../../../components/PaymentModal';
import { PaymentRedirectCard } from '../../../components/PaymentRedirectCard';
import { ShoppingBag, Truck, CheckCircle2, Star, StarHalf, MessageSquareQuote, ThumbsUp, PenLine, Sparkles, ChevronDown, ChevronUp, Filter, Layers, Share2 } from 'lucide-react';
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
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);
  const [pincode, setPincode] = useState<string>('');

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
                <div className="w-28 h-28 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center mb-6 bg-white/60 dark:bg-black/60 shadow-md">
                  <span className="font-serif text-4xl font-light text-neutral-400 dark:text-neutral-500">925</span>
                </div>
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-500 font-bold mb-2">
                  {product.category} {product.subcategory ? `• ${product.subcategory}` : ''}
                </span>
                <h4 className="font-serif text-3xl font-bold text-neutral-800 dark:text-neutral-200 max-w-md leading-snug">
                  {product.name}
                </h4>
                <div className="mt-6 flex flex-col items-center gap-1.5">
                  <span className="inline-block px-4 py-2 rounded-full text-xs uppercase font-black tracking-wider bg-black text-white dark:bg-white dark:text-black shadow">
                    PRODUCT OUT OF STOCK
                  </span>
                  <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
                    COMING SOON
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

        {/* ═══════════════════════ RIGHT: Product Info ═══════════════════════ */}
        <div className="flex flex-col gap-5">

          {/* Name + Share */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className="text-[11px] text-burgundy-700 dark:text-amber-400 font-mono uppercase tracking-widest font-bold">
                {product.category}{product.craft_type ? ` • ${product.craft_type}` : ''}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-900 dark:text-stone-100 mt-1 leading-snug">
                {product.name}
              </h1>
            </div>
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
              className="mt-1 p-2 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
            >
              <Share2 size={16} className="text-stone-600 dark:text-stone-300" />
            </button>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 flex-wrap">
            <span suppressHydrationWarning className="text-2xl font-bold text-burgundy-900 dark:text-amber-400">
              ₹{(isMysteryJar ? mysteryJarPrice : product.price).toLocaleString('en-IN')}
            </span>
            {product.compare_at_price && (
              <span suppressHydrationWarning className="text-sm text-stone-400 line-through">
                ₹{product.compare_at_price.toLocaleString('en-IN')}
              </span>
            )}
            {product.combo_price && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black shadow-sm">
                BUY 2 @ ₹{product.combo_price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <p className="text-xs text-stone-500 font-medium -mt-3">Inclusive of all taxes</p>

          {/* Star rating */}
          <button
            type="button"
            onClick={() => setIsReviewsModalOpen(true)}
            className="flex items-center gap-1.5 group -mt-2"
            title="View all reviews"
          >
            <div className="flex items-center">
              {[1,2,3,4].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
              ))}
              {ratingNum >= 4.8
                ? <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                : <StarHalf className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
              }
            </div>
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{ratingString}</span>
            <span className="text-xs text-stone-500 group-hover:text-amber-500 group-hover:underline">({reviewCount})</span>
          </button>

          {/* Colour Options */}
          {baseProduct.colorOptions && baseProduct.colorOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs text-burgundy-800/70 dark:text-stone-400 font-bold uppercase tracking-wider block">
                Colour Available
              </label>
              <div className="flex flex-wrap gap-2.5">
                {baseProduct.colorOptions.map((opt: any, idx: number) => (
                  <button
                    key={opt.colorName}
                    onClick={() => { setSelectedColorIdx(idx); setSelectedImageIdx(0); }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold uppercase border transition-all ${
                      selectedColorIdx === idx
                        ? 'border-burgundy-800 bg-burgundy-800/10 text-burgundy-900 dark:border-amber-400 dark:bg-amber-500/20 dark:text-amber-300 ring-1 ring-amber-400'
                        : 'border-burgundy-800/15 bg-white dark:border-stone-800 dark:bg-stone-900 text-burgundy-800/70 dark:text-stone-400 hover:border-burgundy-800/30'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-stone-200" style={{ backgroundColor: opt.colorHex }} />
                    <span>{opt.colorName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size / Jar Selection */}
          {sizes && sizes.length > 0 && (sizes.length > 1 || sizes[0] !== 'Free Size') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-burgundy-800/70 dark:text-stone-400 font-bold uppercase tracking-wider block">
                  {isMysteryJar ? 'Select Jar Size / Option' : 'Select Size'}
                </label>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {sizes.map((sizeOption: string) => {
                  const isSelected = selectedSize === sizeOption;
                  return (
                    <button
                      key={sizeOption}
                      type="button"
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`relative px-4 py-2 rounded-xl text-xs font-bold uppercase border transition-all ${
                        isSelected
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-sm ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-stone-900'
                          : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <span>{sizeOption}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── PAYMENT BUTTONS (Add To Cart | Buy Now) ── */}
          <div className="flex flex-col gap-3 pt-1">
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
                className="flex-1 bg-white dark:bg-transparent border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black py-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200"
              >
                <ShoppingBag size={15} />
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
                className="flex-1 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-100 py-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg"
              >
                Buy Now
              </button>
            </div>
          </div>




          {/* ── Trust Badges Image ── */}
          <div className="relative w-full rounded-xl overflow-hidden">
            <Image
              src="/trust-badges.jpg"
              alt="925 Pure Silver Quality Guaranteed, Free Shipping Across India, 6 Month Replacement, Cash On Delivery Available"
              width={900}
              height={340}
              className="w-full h-auto object-contain"
              quality={100}
            />
          </div>


          {/* ── Product Details Collapsible ── */}
          <div className="border-t border-stone-200 dark:border-stone-700 pt-3">
            <button
              type="button"
              onClick={() => setIsDetailsOpen(prev => !prev)}
              className="w-full flex items-center justify-between py-2 text-sm font-bold text-stone-800 dark:text-stone-200 hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
            >
              <span>Product Details, Material & Care</span>
              <motion.span
                animate={{ rotate: isDetailsOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-lg leading-none font-light text-stone-500"
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
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 pt-1">
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                      {product.description || 'Premium quality 925 Sterling Silver. Anti-tarnish coated. Skin-safe and waterproof. Handle with care — avoid harsh chemicals.'}
                    </p>
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