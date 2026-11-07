export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  fitFeedback?: string; // 'Secure clasp' | 'Perfect length' | 'Lightweight on lobes' | 'Comfortable wrist fit'
  userTag?: string; // 'Verified Buyer' | 'Repeat Customer' | 'VIP Jewellery Member' | 'Daily Wear Shopper'
}

export interface ProductReviewSummary {
  rating: number; // e.g. 4.8
  totalReviews: number; // 15 to 25
  recommendPercent: number; // e.g. 98
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  featuredReview: CustomerReview;
  reviews: CustomerReview[];
}

export const PRODUCT_REVIEWS_MAP: Record<string, ProductReviewSummary> = {
  // ── 925 SILVER BRACELETS & BANGLES ──
  '925-sterling-silver-turquoise-clover-bracelet': {
    rating: 4.9,
    totalReviews: 24,
    recommendPercent: 99,
    breakdown: { 5: 22, 4: 2, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-tc-1',
      author: 'Aanya Sen',
      city: 'Mumbai',
      rating: 5,
      date: '2 days ago',
      title: 'Iconic clover motif with mirror-like silver polish!',
      comment: 'The turquoise clover stones against pure 925 silver are stunning! I wear this bracelet daily to work and it hasn’t lost an ounce of its luster. Double chain link gives it a very rich, designer feel.',
      verifiedPurchase: true,
      helpfulCount: 38,
      fitFeedback: 'Comfortable wrist fit',
      userTag: 'VIP Jewellery Member'
    },
    reviews: [
      {
        id: 'rev-tc-1',
        author: 'Aanya Sen',
        city: 'Mumbai',
        rating: 5,
        date: '2 days ago',
        title: 'Iconic clover motif with mirror-like silver polish!',
        comment: 'The turquoise clover stones against pure 925 silver are stunning! I wear this bracelet daily to work and it hasn’t lost an ounce of its luster. Double chain link gives it a very rich, designer feel.',
        verifiedPurchase: true,
        helpfulCount: 38,
        fitFeedback: 'Comfortable wrist fit',
        userTag: 'VIP Jewellery Member'
      },
      {
        id: 'rev-tc-2',
        author: 'Meera Nambiar',
        city: 'Bengaluru',
        rating: 5,
        date: '4 days ago',
        title: 'Exquisite 925 purity hallmark & zero skin discoloration',
        comment: 'My skin is usually hyper-sensitive to artificial metals, but this authenticated 925 silver bracelet feels totally weightless and soothing. The lobster clasp is sturdy and secure.',
        verifiedPurchase: true,
        helpfulCount: 29,
        fitFeedback: 'Secure clasp',
        userTag: 'Verified Buyer'
      },
      {
        id: 'rev-tc-3',
        author: 'Pooja Varma',
        city: 'Jaipur',
        rating: 5,
        date: '1 week ago',
        title: 'Luxurious gift packaging & fast 2-day delivery',
        comment: 'Gifted this to my best friend for her birthday. The presentation in the ARGHYA box with velvet pouch was top tier. She was overjoyed!',
        verifiedPurchase: true,
        helpfulCount: 19,
        fitFeedback: 'Comfortable wrist fit',
        userTag: 'Repeat Customer'
      }
    ]
  },

  '925-sterling-silver-toggle-bracelet': {
    rating: 4.8,
    totalReviews: 21,
    recommendPercent: 98,
    breakdown: { 5: 18, 4: 3, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-tb-1',
      author: 'Rhea Sengupta',
      city: 'Kolkata',
      rating: 5,
      date: '3 days ago',
      title: 'Effortless toggle closure and chic chunky silver aesthetic',
      comment: 'Putting on bracelets alone used to be a struggle, but this T-bar toggle lock is effortless and so secure. The silver weight feels substantial and screams quiet luxury.',
      verifiedPurchase: true,
      helpfulCount: 31,
      fitFeedback: 'Secure clasp',
      userTag: 'Verified Buyer'
    },
    reviews: [
      {
        id: 'rev-tb-1',
        author: 'Rhea Sengupta',
        city: 'Kolkata',
        rating: 5,
        date: '3 days ago',
        title: 'Effortless toggle closure and chic chunky silver aesthetic',
        comment: 'Putting on bracelets alone used to be a struggle, but this T-bar toggle lock is effortless and so secure. The silver weight feels substantial and screams quiet luxury.',
        verifiedPurchase: true,
        helpfulCount: 31,
        fitFeedback: 'Secure clasp',
        userTag: 'Verified Buyer'
      },
      {
        id: 'rev-tb-2',
        author: 'Tanvi Agarwal',
        city: 'Delhi NCR',
        rating: 5,
        date: '5 days ago',
        title: 'Pure 925 stamped with immaculate shine',
        comment: 'Matches both Western blazers and Indian ethnic sets effortlessly. Worn it through hand washes without any tarnishing.',
        verifiedPurchase: true,
        helpfulCount: 22,
        fitFeedback: 'Comfortable wrist fit',
        userTag: 'Daily Wear Shopper'
      }
    ]
  },

  '925-sterling-silver-butterfly-bracelet': {
    rating: 4.9,
    totalReviews: 19,
    recommendPercent: 100,
    breakdown: { 5: 17, 4: 2, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-bb-1',
      author: 'Ishita Sharma',
      city: 'Pune',
      rating: 5,
      date: '1 day ago',
      title: 'Delicate butterfly charms that catch the light beautifully',
      comment: 'The butterfly motifs are sculpted with such fine precision. Extremely comfortable for all-day wear and looks gorgeous stacked with my silver watch.',
      verifiedPurchase: true,
      helpfulCount: 27,
      fitFeedback: 'Comfortable wrist fit',
      userTag: 'Verified Buyer'
    },
    reviews: [
      {
        id: 'rev-bb-1',
        author: 'Ishita Sharma',
        city: 'Pune',
        rating: 5,
        date: '1 day ago',
        title: 'Delicate butterfly charms that catch the light beautifully',
        comment: 'The butterfly motifs are sculpted with such fine precision. Extremely comfortable for all-day wear and looks gorgeous stacked with my silver watch.',
        verifiedPurchase: true,
        helpfulCount: 27,
        fitFeedback: 'Comfortable wrist fit',
        userTag: 'Verified Buyer'
      }
    ]
  },

  // ── 925 SILVER ANKLETS ──
  '925-traditional-silver-ghungroo-anklet': {
    rating: 4.9,
    totalReviews: 26,
    recommendPercent: 100,
    breakdown: { 5: 24, 4: 2, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-ga-1',
      author: 'Sunita Joshi',
      city: 'Ahmedabad',
      rating: 5,
      date: '2 days ago',
      title: 'Authentic melodic chime & water-resistant 925 silver!',
      comment: 'The sweet, subtle chime of the silver ghungroos brings back nostalgic memories. I wear this pair 24/7, including during daily showers, and the silver remains brilliantly shiny.',
      verifiedPurchase: true,
      helpfulCount: 45,
      fitFeedback: 'Comfortable ankle fit',
      userTag: 'Verified Buyer'
    },
    reviews: [
      {
        id: 'rev-ga-1',
        author: 'Sunita Joshi',
        city: 'Ahmedabad',
        rating: 5,
        date: '2 days ago',
        title: 'Authentic melodic chime & water-resistant 925 silver!',
        comment: 'The sweet, subtle chime of the silver ghungroos brings back nostalgic memories. I wear this pair 24/7, including during daily showers, and the silver remains brilliantly shiny.',
        verifiedPurchase: true,
        helpfulCount: 45,
        fitFeedback: 'Comfortable ankle fit',
        userTag: 'Verified Buyer'
      },
      {
        id: 'rev-ga-2',
        author: 'Divya Reddy',
        city: 'Hyderabad',
        rating: 5,
        date: '1 week ago',
        title: 'Smooth finish with no sharp edges on skin',
        comment: 'The links are smooth and do not snag on salwar cuffs or bedsheets. 925 purity hallmark gives 100% peace of mind.',
        verifiedPurchase: true,
        helpfulCount: 32,
        fitFeedback: 'Secure clasp',
        userTag: 'Repeat Customer'
      }
    ]
  },

  '925-silver-clover-charm-anklet': {
    rating: 4.8,
    totalReviews: 18,
    recommendPercent: 97,
    breakdown: { 5: 16, 4: 2, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-ca-1',
      author: 'Kavya Pillai',
      city: 'Kochi',
      rating: 5,
      date: '3 days ago',
      title: 'Minimalist clover design that pairs with sneakers & heels',
      comment: 'Very modern and sleek! The clover charms are dainty and do not feel heavy. Adjustable length allowed me to get the exact drape I wanted.',
      verifiedPurchase: true,
      helpfulCount: 26,
      fitFeedback: 'Perfect length',
      userTag: 'Verified Buyer'
    },
    reviews: [
      {
        id: 'rev-ca-1',
        author: 'Kavya Pillai',
        city: 'Kochi',
        rating: 5,
        date: '3 days ago',
        title: 'Minimalist clover design that pairs with sneakers & heels',
        comment: 'Very modern and sleek! The clover charms are dainty and do not feel heavy. Adjustable length allowed me to get the exact drape I wanted.',
        verifiedPurchase: true,
        helpfulCount: 26,
        fitFeedback: 'Perfect length',
        userTag: 'Verified Buyer'
      }
    ]
  },

  // ── 925 SILVER & ANTI-TARNISH NECKLACES ──
  '925-butterfly-bliss-necklace': {
    rating: 4.9,
    totalReviews: 23,
    recommendPercent: 99,
    breakdown: { 5: 21, 4: 2, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-bbn-1',
      author: 'Simran Chadha',
      city: 'Chandigarh',
      rating: 5,
      date: '1 day ago',
      title: 'Mesmerizing crystal shimmer on a silky silver chain',
      comment: 'The butterfly pendant rests perfectly in the collarbone hollow. The silver chain is so soft against the skin and never catches on hair. Absolutely adore it!',
      verifiedPurchase: true,
      helpfulCount: 34,
      fitFeedback: 'Perfect length',
      userTag: 'Verified Buyer'
    },
    reviews: [
      {
        id: 'rev-bbn-1',
        author: 'Simran Chadha',
        city: 'Chandigarh',
        rating: 5,
        date: '1 day ago',
        title: 'Mesmerizing crystal shimmer on a silky silver chain',
        comment: 'The butterfly pendant rests perfectly in the collarbone hollow. The silver chain is so soft against the skin and never catches on hair. Absolutely adore it!',
        verifiedPurchase: true,
        helpfulCount: 34,
        fitFeedback: 'Perfect length',
        userTag: 'Verified Buyer'
      }
    ]
  },

  // ── MODERN PENDANTS & CHAINS ──
  'the-sweetheart-minimal-pendant': {
    rating: 4.8,
    totalReviews: 22,
    recommendPercent: 98,
    breakdown: { 5: 19, 4: 3, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-sw-1',
      author: 'Neha Roy',
      city: 'Lucknow',
      rating: 5,
      date: '2 days ago',
      title: 'Dainty golden heart with a gleaming anti-tarnish finish',
      comment: 'I never take this heart pendant off! Even with daily showers and workouts, the warm golden hue stays untarnished. Perfect for subtle daily elegance.',
      verifiedPurchase: true,
      helpfulCount: 28,
      fitFeedback: 'Perfect length',
      userTag: 'Daily Wear Shopper'
    },
    reviews: [
      {
        id: 'rev-sw-1',
        author: 'Neha Roy',
        city: 'Lucknow',
        rating: 5,
        date: '2 days ago',
        title: 'Dainty golden heart with a gleaming anti-tarnish finish',
        comment: 'I never take this heart pendant off! Even with daily showers and workouts, the warm golden hue stays untarnished. Perfect for subtle daily elegance.',
        verifiedPurchase: true,
        helpfulCount: 28,
        fitFeedback: 'Perfect length',
        userTag: 'Daily Wear Shopper'
      }
    ]
  },

  'the-noir-clover-deluxe-set': {
    rating: 4.9,
    totalReviews: 25,
    recommendPercent: 100,
    breakdown: { 5: 23, 4: 2, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-nc-1',
      author: 'Pallavi Kulkarni',
      city: 'Pune',
      rating: 5,
      date: '1 day ago',
      title: 'Unbelievable value for the complete 3-piece matching combo!',
      comment: 'Getting the matching pendant, clover bracelet, and studs together for this price is unbeatable. The black onyx-style clover contrast against rich gold is breathtaking.',
      verifiedPurchase: true,
      helpfulCount: 52,
      fitFeedback: 'True to size',
      userTag: 'VIP Jewellery Member'
    },
    reviews: [
      {
        id: 'rev-nc-1',
        author: 'Pallavi Kulkarni',
        city: 'Pune',
        rating: 5,
        date: '1 day ago',
        title: 'Unbelievable value for the complete 3-piece matching combo!',
        comment: 'Getting the matching pendant, clover bracelet, and studs together for this price is unbeatable. The black onyx-style clover contrast against rich gold is breathtaking.',
        verifiedPurchase: true,
        helpfulCount: 52,
        fitFeedback: 'True to size',
        userTag: 'VIP Jewellery Member'
      }
    ]
  },

  'the-azure-guardian-eye-pendant': {
    rating: 4.9,
    totalReviews: 20,
    recommendPercent: 99,
    breakdown: { 5: 18, 4: 2, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-ag-1',
      author: 'Geetika Anand',
      city: 'Gurugram',
      rating: 5,
      date: '3 days ago',
      title: 'Vibrant cobalt blue eye with crystal halo protection',
      comment: 'The enamel work is flawless and the protective evil eye design gets noticed everywhere I go. The chain has a secure clasp that doesn’t snag on clothing.',
      verifiedPurchase: true,
      helpfulCount: 31,
      fitFeedback: 'Secure clasp',
      userTag: 'Verified Buyer'
    },
    reviews: [
      {
        id: 'rev-ag-1',
        author: 'Geetika Anand',
        city: 'Gurugram',
        rating: 5,
        date: '3 days ago',
        title: 'Vibrant cobalt blue eye with crystal halo protection',
        comment: 'The enamel work is flawless and the protective evil eye design gets noticed everywhere I go. The chain has a secure clasp that doesn’t snag on clothing.',
        verifiedPurchase: true,
        helpfulCount: 31,
        fitFeedback: 'Secure clasp',
        userTag: 'Verified Buyer'
      }
    ]
  },

  // ── MODERN EARRINGS ──
  'crystal-square-radiance-studs': {
    rating: 4.9,
    totalReviews: 27,
    recommendPercent: 100,
    breakdown: { 5: 25, 4: 2, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-sq-1',
      author: 'Priti Dasgupta',
      city: 'Kolkata',
      rating: 5,
      date: '2 days ago',
      title: 'Brilliant diamond-like fire & zero earlobe fatigue',
      comment: 'These studs look identical to high-carat solitaire diamonds! Incredibly lightweight, secure screw-back fit, and completely hypoallergenic — no itching or redness even after 14 hours.',
      verifiedPurchase: true,
      helpfulCount: 41,
      fitFeedback: 'Lightweight on lobes',
      userTag: 'Verified Buyer'
    },
    reviews: [
      {
        id: 'rev-sq-1',
        author: 'Priti Dasgupta',
        city: 'Kolkata',
        rating: 5,
        date: '2 days ago',
        title: 'Brilliant diamond-like fire & zero earlobe fatigue',
        comment: 'These studs look identical to high-carat solitaire diamonds! Incredibly lightweight, secure screw-back fit, and completely hypoallergenic — no itching or redness even after 14 hours.',
        verifiedPurchase: true,
        helpfulCount: 41,
        fitFeedback: 'Lightweight on lobes',
        userTag: 'Verified Buyer'
      }
    ]
  },

  'celeste-pearl-cascade-earrings': {
    rating: 4.8,
    totalReviews: 21,
    recommendPercent: 98,
    breakdown: { 5: 18, 4: 3, 3: 0, 2: 0, 1: 0 },
    featuredReview: {
      id: 'rev-cp-1',
      author: 'Ananya Singhania',
      city: 'Mumbai',
      rating: 5,
      date: '4 days ago',
      title: 'Graceful pearl cascade that elevates any festive attire',
      comment: 'The lustrous pearls move with such elegance. Paired with an ivory outfit and received endless compliments throughout the wedding evening.',
      verifiedPurchase: true,
      helpfulCount: 35,
      fitFeedback: 'Lightweight on lobes',
      userTag: 'VIP Jewellery Member'
    },
    reviews: [
      {
        id: 'rev-cp-1',
        author: 'Ananya Singhania',
        city: 'Mumbai',
        rating: 5,
        date: '4 days ago',
        title: 'Graceful pearl cascade that elevates any festive attire',
        comment: 'The lustrous pearls move with such elegance. Paired with an ivory outfit and received endless compliments throughout the wedding evening.',
        verifiedPurchase: true,
        helpfulCount: 35,
        fitFeedback: 'Lightweight on lobes',
        userTag: 'VIP Jewellery Member'
      }
    ]
  }
};

/**
 * Dynamically generates high-end review summaries tailored specifically to jewellery categories:
 * - Chains
 * - Necklaces
 * - Anklets
 * - Bangles & Bracelets
 * - Pendants
 * - Earrings
 */
export function getProductReviews(slug?: string, name?: string, category?: string): ProductReviewSummary {
  if (slug && PRODUCT_REVIEWS_MAP[slug]) {
    return PRODUCT_REVIEWS_MAP[slug];
  }

  const s = (slug || name || '').toLowerCase();
  const hash = s.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = Number((4.7 + (hash % 3) * 0.1).toFixed(1));
  const totalReviews = 16 + (hash % 8);
  const recommendPercent = 97 + (hash % 3);

  const fiveStar = Math.floor(totalReviews * 0.88);
  const fourStar = Math.max(1, totalReviews - fiveStar);
  const breakdown = { 5: fiveStar, 4: fourStar, 3: 0, 2: 0, 1: 0 };

  const dates = [
    'Yesterday',
    '2 days ago',
    '3 days ago',
    '5 days ago',
    '1 week ago',
    '10 days ago',
    '2 weeks ago',
    '3 weeks ago',
    '1 month ago',
  ];

  // Detect specific jewellery category
  const isAnklet = s.includes('anklet') || s.includes('payal') || s.includes('ghungroo');
  const isEarring = s.includes('earring') || s.includes('stud') || s.includes('hoop') || s.includes('drop');
  const isBracelet = s.includes('bracelet') || s.includes('bangle') || s.includes('kada') || s.includes('cuff');
  const isChain = s.includes('chain') || s.includes('choker') || s.includes('curb');
  const isPendant = s.includes('pendant') || s.includes('locket') || s.includes('charm');

  let defaultFit = 'Comfortable fit';
  let comments: { title: string; comment: string; fit: string }[] = [];

  if (isAnklet) {
    defaultFit = 'Comfortable ankle fit';
    comments = [
      {
        title: 'Authentic 925 silver finish & gentle melodic chime!',
        comment: 'The ghungroos sound so delicate and sweet! It fits my ankle comfortably without pulling skin or catching on hems.',
        fit: 'Comfortable ankle fit',
      },
      {
        title: 'Waterproof & anti-tarnish throughout daily wear',
        comment: 'Worn it daily through showers and rain. Zero blackening or dullness. Authentic 925 hallmarked purity as promised.',
        fit: 'Secure clasp',
      },
      {
        title: 'Dainty look that pairs with traditional and western outfits',
        comment: 'Looks lovely with sneakers, juttis, and heels alike. The extension links allowed me to customize the drape.',
        fit: 'Perfect length',
      },
      {
        title: 'Sturdy silver links with smooth edges',
        comment: 'I can sleep in this anklet without feeling any poke or pinch. Highly recommended for daily wear.',
        fit: 'Comfortable ankle fit',
      },
    ];
  } else if (isEarring) {
    defaultFit = 'Lightweight on lobes';
    comments = [
      {
        title: 'Featherlight on earlobes with radiant sparkle!',
        comment: 'Wore these for an entire 12-hour reception without any soreness. Completely hypoallergenic and nickel-free.',
        fit: 'Lightweight on lobes',
      },
      {
        title: 'Brilliant craftsmanship and secure push-backs',
        comment: 'The crystal setting is immaculate. The post is sturdy and stays firmly locked in place without slipping.',
        fit: 'Secure backing',
      },
      {
        title: 'Zero greening or redness on sensitive ears',
        comment: 'Normally my earlobes flare up with artificial metals, but ARGHYA earrings caused zero irritation. Pure bliss!',
        fit: 'Lightweight on lobes',
      },
      {
        title: 'Stunning designer aesthetic that turns heads',
        comment: 'Got complimented by three colleagues on the very first day. Packaging and velvet pouch were equally luxurious.',
        fit: 'Comfortable fit',
      },
    ];
  } else if (isBracelet) {
    defaultFit = 'Comfortable wrist fit';
    comments = [
      {
        title: 'High-polish shine with flawless link movement',
        comment: 'The silver gleam is mirror-smooth and feels premium on the wrist. Stacks beautifully next to my wristwatch.',
        fit: 'Comfortable wrist fit',
      },
      {
        title: 'Strong secure lock that doesn’t pop open',
        comment: 'The clasp is engineered very well. I can move freely without worrying about the bracelet slipping off.',
        fit: 'Secure clasp',
      },
      {
        title: 'Anti-tarnish coating actually works through sweat',
        comment: 'Worn it during active humid days and it remains as luminous as day one. Great craftsmanship!',
        fit: 'Comfortable wrist fit',
      },
      {
        title: 'Elegant packaging made it a memorable gift',
        comment: 'Ordered as an anniversary surprise and my partner was thrilled. The 925 authenticity stamp was clearly visible.',
        fit: 'Perfect fit',
      },
    ];
  } else if (isChain) {
    defaultFit = 'Perfect length';
    comments = [
      {
        title: 'Silky smooth link chain that never snags hair',
        comment: 'The finish on this chain is buttery smooth. It rests flat on the neck and looks phenomenal alone or layered.',
        fit: 'Perfect length',
      },
      {
        title: 'Substantial weight and authentic silver luster',
        comment: 'Doesn’t feel flimsy at all. The lobster claw clasp is solid and the anti-tarnish finish keeps it shining bright.',
        fit: 'Secure clasp',
      },
      {
        title: 'Versatile everyday chain for work and parties',
        comment: 'Matches tees, shirts, and kurtas with equal grace. Easy to clean with a quick wipe of a microfiber cloth.',
        fit: 'Comfortable wear',
      },
      {
        title: 'Resistant to sweat and daily perfume exposure',
        comment: 'Zero tarnishing after a full month of continuous daily wear. Truly high-grade artificial and silver jewellery.',
        fit: 'Perfect length',
      },
    ];
  } else {
    // Pendant or general necklace
    defaultFit = 'Perfect length';
    comments = [
      {
        title: 'Mesmerizing crystal clarity on a delicate chain!',
        comment: 'The pendant pendant sits gracefully at the collarbone. It catches ambient light with an incredible shimmer.',
        fit: 'Perfect length',
      },
      {
        title: 'Anti-tarnish barrier keeps the finish pristine',
        comment: 'No discoloration or metal smell even after weeks of wear. The gold/silver tone matches fine jewellery perfectly.',
        fit: 'Secure clasp',
      },
      {
        title: 'Lightweight and skin-safe for sensitive skin',
        comment: 'Zero nickel, completely skin-friendly. The chain extension allows wearing it high as a choker or lower.',
        fit: 'Adjustable length',
      },
      {
        title: 'Looks 10x more expensive in person!',
        comment: 'The photos online were pretty, but holding it in hand is a whole different level of elegance. Super fast delivery too!',
        fit: 'Comfortable wear',
      },
    ];
  }

  const reviewers = [
    { author: 'Sunita Mehra', city: 'Jaipur', tag: 'Verified Buyer' },
    { author: 'Priyanka Sharma', city: 'Mumbai', tag: 'Repeat Customer' },
    { author: 'Ananya Deshmukh', city: 'Pune', tag: 'VIP Jewellery Member' },
    { author: 'Sneha Patel', city: 'Ahmedabad', tag: 'Daily Wear Shopper' },
    { author: 'Rhea Sengupta', city: 'Kolkata', tag: 'Verified Buyer' },
    { author: 'Kavita Rao', city: 'Bengaluru', tag: 'VIP Jewellery Member' },
    { author: 'Disha Trivedi', city: 'Vadodara', tag: 'Verified Buyer' },
    { author: 'Ishita Mathur', city: 'Indore', tag: 'Repeat Customer' },
    { author: 'Tanvi Chadha', city: 'Chandigarh', tag: 'Verified Buyer' },
  ];

  const generatedReviews: CustomerReview[] = [];
  for (let i = 0; i < totalReviews; i++) {
    const rev = reviewers[(i + hash) % reviewers.length];
    const c = comments[(i + hash * 2) % comments.length];
    const isFiveStar = i < fiveStar;

    generatedReviews.push({
      id: `rev-${hash}-${i + 1}`,
      author: rev.author,
      city: rev.city,
      rating: isFiveStar ? 5 : 4,
      date: dates[(i + hash) % dates.length],
      title: isFiveStar ? c.title : 'Very pretty piece & arrived on time in safe packaging',
      comment: c.comment,
      verifiedPurchase: true,
      helpfulCount: 8 + ((hash + i * 5) % 35),
      fitFeedback: c.fit || defaultFit,
      userTag: rev.tag,
    });
  }

  return {
    rating,
    totalReviews,
    recommendPercent,
    breakdown,
    featuredReview: generatedReviews[0],
    reviews: generatedReviews,
  };
}
