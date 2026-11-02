'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Product } from '../lib/api';
import { useCartStore } from '../store/cartStore';
import { BulgeWidget } from './BulgeWidget';
import { BorderGlowWidget } from './BorderGlowWidget';
import { AnimatedButton } from './AnimatedButton';
import { BuyCODButton } from './buttons/BuyCODButton';
import { CODChoiceModal } from './modals/CODChoiceModal';
import { PayOnDeliveryModal } from './modals/PayOnDeliveryModal';
import { ProductReviewsModal } from './modals/ProductReviewsModal';
import { LimitedStockSticker } from './LimitedStockSticker';
import { getProductReviews } from '../lib/productReviews';

interface ProductCardProps {
  product: Product;
  onBuyNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow }) => {
  const { addItem } = useCartStore();
  const [isCODModalOpen, setIsCODModalOpen] = useState(false);
  const [isPODModalOpen, setIsPODModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const reviewSummary = getProductReviews(product.slug, product.name, product.category);
  const imageUrl = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

  return (
    <>
      {/* COD Choice Modal */}
      <CODChoiceModal
        isOpen={isCODModalOpen}
        onClose={() => setIsCODModalOpen(false)}
        product={product}
        onRazorpayCOD={(p) => onBuyNow?.(p)}
        onPayOnDelivery={(p) => setIsPODModalOpen(true)}
      />

      {/* Pay On Delivery Modal */}
      <PayOnDeliveryModal
        isOpen={isPODModalOpen}
        onClose={() => setIsPODModalOpen(false)}
        product={product}
        effectivePrice={product.price}
      />

      {/* Product Reviews Modal */}
      <ProductReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        product={product}
      />

      <BulgeWidget scaleHover={1.03} liftY={-6}>
        <BorderGlowWidget roundedClassName="rounded-xl">
          <div className="group relative bg-white dark:bg-stone-900/60 rounded-xl overflow-hidden border border-burgundy-800/15 dark:border-amber-500/20 hover:border-burgundy-800/40 dark:hover:border-amber-400/60 transition-all duration-300 shadow-sm dark:shadow-xl flex flex-col h-full">
            <Link href={`/products/${product.slug}`} className="relative h-80 w-full overflow-hidden block">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {product.compare_at_price && (
                <span className="absolute top-3 left-3 bg-burgundy-800 dark:bg-ruby-800 text-cream-50 dark:text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded tracking-widest uppercase">
                  Best Selling
                </span>
              )}
            </Link>

            <div className="p-5 flex-1 flex flex-col justify-between text-burgundy-900 dark:text-stone-100">
              <div>
                <span className="text-[10px] text-burgundy-700 dark:text-amber-400/80 uppercase tracking-widest font-mono font-bold">
                  {product.category} {product.fabric ? `• ${product.fabric}` : ''}
                </span>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-serif text-lg font-bold text-burgundy-900 dark:text-stone-100 hover:text-burgundy-700 dark:hover:text-amber-300 transition-colors mt-1 line-clamp-1">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating & Reviews row */}
                <button
                  type="button"
                  onClick={() => setIsReviewsModalOpen(true)}
                  className="flex items-center space-x-1.5 mt-2 group text-left"
                >
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
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
                  <span className="text-[10px] text-stone-500 group-hover:underline">
                    ({reviewSummary.totalReviews})
                  </span>
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {/* Price row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-lg font-bold text-burgundy-900 dark:text-amber-400">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                    {product.compare_at_price && (
                      <span className="text-xs text-burgundy-800/50 dark:text-stone-400 line-through ml-2">
                        ₹{Number(product.compare_at_price).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Scarcity sticker with random 1, 2, or 3 pieces and popup animation */}
                  <LimitedStockSticker
                    product={product}
                    onBuyNow={onBuyNow}
                    onAddToCart={addItem}
                  />
                </div>

                {/* Buy · Cash On Delivery */}
                <BuyCODButton
                  onClick={() => setIsCODModalOpen(true)}
                  size="sm"
                  fadeDelay={0}
                  className="w-full"
                />

                {/* Buy Now */}
                <AnimatedButton
                  onClick={() => onBuyNow?.(product)}
                  className="w-full !px-3.5 !py-1.5 !text-xs font-bold !bg-amber-500 hover:!bg-amber-400 !text-stone-950 border-none shadow-md shadow-amber-500/25"
                >
                  Buy Now
                </AnimatedButton>

                {/* Add to Shopping Bag */}
                <AnimatedButton
                  onClick={() => addItem(product)}
                  className="!px-3.5 !py-1.5 !text-xs font-bold w-full"
                >
                  Add to Shopping Bag
                </AnimatedButton>
              </div>
            </div>
          </div>
        </BorderGlowWidget>
      </BulgeWidget>
    </>
  );
};
