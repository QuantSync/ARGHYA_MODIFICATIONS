'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  Sparkles, 
  ShieldCheck, 
  MessageSquareQuote,
  PenLine,
  Filter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Product } from '../../lib/api';
import { CustomerReview, getProductReviews } from '../../lib/productReviews';

interface ProductReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const ProductReviewsModal: React.FC<ProductReviewsModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false);
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  
  // Write Review form state
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [authorCity, setAuthorCity] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [fitFeedback, setFitFeedback] = useState('True to size');
  const [submittedReview, setSubmittedReview] = useState(false);
  const [customReviews, setCustomReviews] = useState<Record<string, CustomerReview[]>>({});

  if (!isOpen || !product) return null;

  const summary = getProductReviews(product.slug, product.name, product.category);
  const activeCustom = customReviews[product.slug] || [];
  const allReviews = [...activeCustom, ...summary.reviews];

  const filteredReviews = filterRating === 'all'
    ? allReviews
    : allReviews.filter((r) => r.rating === filterRating);

  const totalReviewsCount = summary.totalReviews + activeCustom.length;

  const toggleHelpful = (reviewId: string, initialCount: number) => {
    const isLiked = helpfulLiked[reviewId];
    setHelpfulLiked((prev) => ({ ...prev, [reviewId]: !isLiked }));
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] ?? initialCount) + (isLiked ? -1 : 1),
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) return;

    const newRev: CustomerReview = {
      id: `user-${Date.now()}`,
      author: authorName.trim(),
      city: authorCity.trim() || 'India',
      rating: newRating,
      date: 'Just now',
      title: reviewTitle.trim() || 'Exceptional craftsmanship & fitting!',
      comment: reviewComment.trim(),
      verifiedPurchase: true,
      helpfulCount: 1,
      fitFeedback: fitFeedback,
      userTag: 'Verified Buyer',
    };

    setCustomReviews((prev) => ({
      ...prev,
      [product.slug]: [newRev, ...(prev[product.slug] || [])],
    }));

    setSubmittedReview(true);
    setTimeout(() => {
      setShowWriteReview(false);
      setSubmittedReview(false);
      setAuthorName('');
      setAuthorCity('');
      setReviewTitle('');
      setReviewComment('');
    }, 1500);
  };

  const imageUrl = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 overflow-hidden">
        {/* Backdrop - Hardware-accelerated lightweight overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-[2px]"
          style={{ willChange: 'opacity' }}
        />

        {/* Centralized Floating Widget Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.82, y: 8 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 380,
            mass: 0.6,
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
          }}
          className="relative z-10 w-full max-w-[460px] max-h-[82vh] bg-stone-900 border border-amber-500/35 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(245,158,11,0.12)] overflow-hidden flex flex-col text-stone-100"
        >
          {/* Compact Header */}
          <div className="relative px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-[#2A080B] via-[#350A0E] to-[#1F0407] border-b border-amber-500/20 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative w-11 h-14 rounded-lg overflow-hidden border border-amber-500/30 shrink-0 shadow-sm bg-stone-950">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] uppercase tracking-wider font-mono text-amber-400 font-bold px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/25">
                    {product.category}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified
                  </span>
                </div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-amber-100 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-1.5">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= Math.round(summary.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-300">
                    {summary.rating.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    ({totalReviewsCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Prominent Cross Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white border border-white/10 hover:border-amber-400/40 transition-all shrink-0 shadow-sm active:scale-95"
              aria-label="Close rating panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Body with smooth native scrolling */}
          <div className="flex-1 overflow-y-auto px-4 py-3.5 sm:px-5 sm:py-4 space-y-4 custom-scrollbar bg-stone-950/70">
            {/* Compact Rating Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-3 sm:p-3.5 rounded-xl bg-stone-900/90 border border-amber-500/20">
              {/* Left: Overall Score */}
              <div className="sm:col-span-2 flex flex-col items-center justify-center text-center pb-2 sm:pb-0 sm:border-r border-stone-800">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif leading-none">
                  {summary.rating.toFixed(1)}
                </span>
                <div className="flex items-center my-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[10px] text-stone-400 font-medium">
                  {totalReviewsCount} ratings
                </p>
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {summary.recommendPercent}% Recommend
                </div>
              </div>

              {/* Right: Progress Bars */}
              <div className="sm:col-span-3 flex flex-col justify-center space-y-1 text-[11px]">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = summary.breakdown[stars as keyof typeof summary.breakdown] || 0;
                  const percent = Math.round((count / summary.totalReviews) * 100);
                  return (
                    <div key={stars} className="flex items-center space-x-2">
                      <span className="w-6 text-stone-300 font-semibold flex items-center gap-0.5 text-[10px]">
                        {stars} <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      </span>
                      <div className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-stone-400 font-mono text-[10px]">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buyer Trust Highlights */}
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium">
                <Sparkles className="w-3 h-3 text-amber-400" /> Handloom Cotton
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Mirror-Work Stitch
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg bg-burgundy-900/40 border border-burgundy-700/40 text-stone-200 font-medium">
                <MessageSquareQuote className="w-3 h-3 text-amber-400" /> 98% Fit Rating
              </span>
            </div>

            {/* Filter & Write Review Actions */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-800/70">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-stone-400 flex items-center gap-0.5 font-semibold">
                  <Filter className="w-2.5 h-2.5 text-amber-400" />
                </span>
                {(['all', 5, 4] as const).map((starVal) => (
                  <button
                    key={starVal}
                    onClick={() => {
                      setFilterRating(starVal);
                      setIsReviewsExpanded(false);
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                      filterRating === starVal
                        ? 'bg-amber-500 text-stone-950 shadow-sm font-black'
                        : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-500/40'
                    }`}
                  >
                    {starVal === 'all' ? 'All' : `${starVal}★`}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowWriteReview((v) => !v)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/35 transition-colors"
              >
                <PenLine className="w-3 h-3" />
                {showWriteReview ? 'Close' : 'Write Review'}
              </button>
            </div>

            {/* Write Review Form Collapsible */}
            <AnimatePresence>
              {showWriteReview && (
                <motion.form
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.16 }}
                  onSubmit={handleSubmitReview}
                  className="p-3.5 rounded-xl bg-stone-900 border border-amber-500/30 space-y-2.5 overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xs font-bold text-amber-300">
                      Rate {product.name}
                    </h4>
                    <span className="text-[9px] text-stone-400">Verified buyers</span>
                  </div>

                  {submittedReview ? (
                    <div className="p-3 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-center space-y-0.5">
                      <div className="flex justify-center text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-emerald-300">
                        Thank you! Review published.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Rating Selector */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-0.5"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= (hoverRating || newRating)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-600'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-[10px] font-bold text-amber-300 ml-1.5">
                          {hoverRating || newRating} / 5 Stars
                        </span>
                      </div>

                      {/* Inputs */}
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-800 focus:border-amber-400 text-[11px] text-stone-100 placeholder:text-stone-600 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="City / State"
                          value={authorCity}
                          onChange={(e) => setAuthorCity(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-800 focus:border-amber-400 text-[11px] text-stone-100 placeholder:text-stone-600 outline-none"
                        />
                      </div>

                      <textarea
                        required
                        rows={2}
                        placeholder="Write your review comments on fabric, fit and mirror work..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-800 focus:border-amber-400 text-[11px] text-stone-100 placeholder:text-stone-600 outline-none resize-none"
                      />

                      <div className="flex justify-end gap-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setShowWriteReview(false)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-stone-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all"
                        >
                          Submit Review
                        </button>
                      </div>
                    </>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            {/* Customer Reviews List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold tracking-wider text-amber-400/90 uppercase font-mono">
                  Customer Reviews ({filteredReviews.length})
                </h4>
                {filteredReviews.length > 6 && (
                  <span className="text-[9px] text-stone-400 font-mono">
                    Showing {isReviewsExpanded ? filteredReviews.length : 6} of {filteredReviews.length}
                  </span>
                )}
              </div>

              {filteredReviews.length === 0 ? (
                <div className="text-center py-5 text-stone-500 text-xs">
                  No reviews for this filter.
                </div>
              ) : (
                <>
                  {(isReviewsExpanded ? filteredReviews : filteredReviews.slice(0, 6)).map((rev) => {
                    const currentLikes = helpfulCounts[rev.id] ?? rev.helpfulCount;
                    const isLiked = !!helpfulLiked[rev.id];

                    return (
                      <div
                        key={rev.id}
                        className="p-3 rounded-xl bg-stone-900/80 border border-stone-800/80 hover:border-amber-500/25 transition-all space-y-2 backdrop-blur-sm shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-burgundy-900 flex items-center justify-center font-bold text-xs text-amber-100 border border-amber-500/30 shrink-0">
                              {rev.author.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="text-xs font-bold text-stone-100">
                                  {rev.author}
                                </span>
                                {rev.verifiedPurchase && (
                                  <span className="text-[9px] text-emerald-400 font-semibold px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                                    ✓ Verified
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-stone-400">
                                {rev.city} • {rev.date}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-2.5 h-2.5 ${
                                  s <= rev.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-stone-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <h5 className="text-[11px] font-bold text-stone-200">
                            {rev.title}
                          </h5>
                          <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                            {rev.comment}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-stone-800/60 text-[10px]">
                          {rev.fitFeedback ? (
                            <span className="text-stone-400">
                              Fit: <strong className="text-amber-400">{rev.fitFeedback}</strong>
                            </span>
                          ) : (
                            <div />
                          )}

                          <button
                            onClick={() => toggleHelpful(rev.id, rev.helpfulCount)}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                              isLiked
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'text-stone-400 hover:text-stone-200'
                            }`}
                          >
                            <ThumbsUp className={`w-2.5 h-2.5 ${isLiked ? 'fill-amber-400 text-amber-400' : ''}`} />
                            Helpful ({currentLikes})
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Dropdown toggle button when more than 6 reviews exist */}
                  {filteredReviews.length > 6 && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setIsReviewsExpanded(!isReviewsExpanded)}
                        className="w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 hover:bg-amber-500/30 text-amber-300 border border-amber-500/35 backdrop-blur-md shadow-sm"
                      >
                        <span>
                          {isReviewsExpanded
                            ? 'Collapse Additional Reviews'
                            : `Open Review Panel (${filteredReviews.length - 6} more reviews)`}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isReviewsExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Compact Footer Bar */}
          <div className="px-4 py-2.5 bg-stone-900 border-t border-amber-500/20 flex items-center justify-between text-[11px]">
            <span className="text-stone-400 truncate pr-2">
              Arghya • Authentic Artisan Guarantee
            </span>
            <button
              onClick={onClose}
              className="px-3.5 py-1 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans transition-colors shrink-0 shadow-sm"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
