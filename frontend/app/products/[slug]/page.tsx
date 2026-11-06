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

import { getCatalogProduct, PRODUCTS_CATALOG } from '../../../lib/productsCatalog';


const PRODUCTS_MAP: Record<string, any> = {
  'rangrez-chaniya-set': {
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    name: 'Rangrez Chaniya Set',
    slug: 'rangrez-chaniya-set',
    description: 'ARGHYA \u2014 Rangrez Chaniya Set\nMulticolour Printed Lehenga \u2022 Blouse \u2022 Dupatta',
    price: 2099.00,
    compare_at_price: 4999.00,
    category: 'NAVRATRI SPECIAL',
    fabric: 'Printed Handloom',
    craft_type: 'NAVRATRI COLLECTION BY . Rangrez Chaniya Set',
    images: [
      '/products/rangrez/3.jpg',
      '/products/rangrez/1.jpg',
      '/products/rangrez/2.jpg',
      '/products/rangrez/4.jpg'
    ]
  },
  'the-prism-radiance-fusion-set': {
    id: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    name: 'The Prism Radiance Fusion Set',
    slug: 'the-prism-radiance-fusion-set',
    description: 'ARGHYA \u2014 Fusion Collection\nHandcrafted Fusion Saree & Lehenga Set \u2022 Blouse \u2022 Dupatta',
    price: 799.00,
    compare_at_price: 1799.00,
    category: 'FUSION COLLECTION',
    fabric: 'Silk Blend & Georgette',
    craft_type: 'Prism Radiance & Saffron Fusion',
    images: [
      '/products/fusion/The Prism Radiance Fusion Set.jpg',
      '/products/fusion/The Saffron Aura Fusion Set.jpg'
    ],
    colorOptions: [
      {
        name: 'The Prism Radiance Fusion Set',
        colorName: 'Red',
        colorHex: '#DC2626',
        images: ['/products/fusion/The Prism Radiance Fusion Set.jpg']
      },
      {
        name: 'The Saffron Aura Fusion Set',
        colorName: 'Orange',
        colorHex: '#EA580C',
        images: ['/products/fusion/The Saffron Aura Fusion Set.jpg']
      }
    ]
  },
  'the-saffron-aura-fusion-set': {
    id: 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    name: 'The Saffron Aura Fusion Set',
    slug: 'the-saffron-aura-fusion-set',
    description: 'ARGHYA \u2014 Fusion Collection\nHandcrafted Saffron Fusion Saree & Lehenga Set \u2022 Blouse \u2022 Dupatta',
    price: 799.00,
    compare_at_price: 1799.00,
    category: 'FUSION COLLECTION',
    fabric: 'Silk Blend & Georgette',
    craft_type: 'Saffron Aura Fusion',
    images: ['/products/fusion/The Saffron Aura Fusion Set.jpg'],
    colorOptions: [
      {
        name: 'The Prism Radiance Fusion Set',
        colorName: 'Red',
        colorHex: '#DC2626',
        images: ['/products/fusion/The Prism Radiance Fusion Set.jpg']
      },
      {
        name: 'The Saffron Aura Fusion Set',
        colorName: 'Orange',
        colorHex: '#EA580C',
        images: ['/products/fusion/The Saffron Aura Fusion Set.jpg']
      }
    ]
  },

  'lime-green-floral-mirror-work-kurti': {
    id: 'd4e5f6a7-b89c-0d1e-2f3a-4b5newkurti1',
    name: 'Lime Green Floral Mirror-Work Kurti',
    slug: 'lime-green-floral-mirror-work-kurti',
    description: 'Floral-print lime green kurti with tie-up shoulders and mirror-work trim. Easy, pretty and made for festive days.\n\nSlay Everyday: Elevate your casual ethnic look with this breezy, minimal yet vibrant piece.\n\nFabric: Premium Cotton Blend\nCare: Dry clean recommended',
    price: 379.00,
    compare_at_price: 899.00,
    category: 'Kurti',
    fabric: 'Premium Cotton Blend',
    craft_type: 'Floral Print & Mirror Work',
    sizes: ['Free Size'],
    images: ['/products/kurti/1.jpg', '/products/kurti/2.jpg']
  },
  'neelam-floral-kurti': {
    id: 'e5f6a7b8-c9d0-1e2f-3a4b-5c6neelam1',
    name: 'Neelam Floral Kurti',
    slug: 'neelam-floral-kurti',
    description: 'Navy blue floral kurti with tie-up shoulders and mirror-work trim. Rich colour, easy fit, made for festive evenings.\n\nTwo shades, one floral story.\n\nSlay Everyday: Elevate your casual ethnic look with this breezy, minimal yet vibrant piece.\n\nFabric: Premium Cotton Blend\nCare: Dry clean recommended',
    price: 379.00,
    compare_at_price: 899.00,
    category: 'Kurti',
    fabric: 'Premium Cotton Blend',
    craft_type: 'Floral Print & Mirror Work',
    sizes: ['Free Size'],
    images: ['/products/kurti/3.jpg', '/products/kurti/4.jpg']
  },
  'roshni-floral-kurti': {
    id: 'f7g8h9i0-j1k2-l3m4-n5o6-7p8roshni1',
    name: 'Roshni Floral Kurti',
    slug: 'roshni-floral-kurti',
    description: '\u2022 Turn heads in the Roshni kurti\n\u2022 Vivid fuchsia-pink base with large dusty-blue, blush and mauve florals\n\u2022 Soft tone-on-tone print behind florals\n\u2022 Sleeveless A-line cut with scoop neck\n\u2022 Tie-up shoulder straps with small tassel ends\n\u2022 Mirror-work along neckline and hem\n\u2022 Pair with white palazzos for festive days, mehndi functions and celebrations',
    price: 379.00,
    compare_at_price: 899.00,
    category: 'Kurti',
    fabric: 'Premium Cotton Blend',
    craft_type: 'Floral Print & Mirror Work',
    sizes: ['Free Size'],
    images: ['/products/kurti/5.jpg', '/products/kurti/6.jpg']
  },
  'vamika-floral-kurti': {
    id: 'g8h9i0j1-k2l3-m4n5-o6p7-8q9vamika1',
    name: 'Vamika Floral Kurti',
    slug: 'vamika-floral-kurti',
    description: '\u2022 The Vamika kurti pairs a rich wine-plum base with lush magenta, blush and powder-blue blooms\n\u2022 Sleeveless A-line silhouette with a scoop neck and tie-up shoulder straps\n\u2022 Mirror-work borders on the neckline and hem finish with delicate hanging detail\n\u2022 Style it with white palazzos for an elegant, easy look for evening gatherings, festive occasions and family celebrations',
    price: 379.00,
    compare_at_price: 899.00,
    category: 'Kurti',
    fabric: 'Premium Cotton Blend',
    craft_type: 'Floral Print & Mirror Work',
    sizes: ['Free Size'],
    images: ['/products/kurti/7.jpg', '/products/kurti/8.jpg']
  },
  'olive-tie-shoulder-kurti': {
    id: 'h9i0j1k2-l3m4-n5o6-p7q8-r9solive1',
    name: 'Olive Tie Shoulder Kurti',
    slug: 'olive-tie-shoulder-kurti',
    description: '\u2022 Keep it fresh and festive in this olive-green kurti\n\u2022 A soft tonal floral texture runs through the fabric, dotted with delicate ivory motifs\n\u2022 The sleeveless A-line cut has a scoop neck and tie-up shoulder straps, and the ties end in mirror-detailed tassels\n\u2022 Mirror-work trims the neckline and hem\n\u2022 Pair it with white palazzos, as shown, for a light, elegant look for day functions, haldi ceremonies and get-togethers',
    price: 379.00,
    compare_at_price: 899.00,
    category: 'Kurti',
    fabric: 'Premium Cotton Blend',
    craft_type: 'Floral Print & Mirror Work',
    sizes: ['Free Size'],
    images: ['/products/kurti/9.jpg', '/products/kurti/10.jpg']
  },
  'pink-tie-shoulder-kurti': {
    id: 'i0j1k2l3-m4n5-o6p7-q8r9-s0tpink1',
    name: 'Pink Tie Shoulder Kurti',
    slug: 'pink-tie-shoulder-kurti',
    description: '\u2022 Bright, bold and ready for the celebration\n\u2022 This fuchsia-pink kurti is scattered with ivory-and-gold motifs on a subtly textured base\n\u2022 The sleeveless A-line silhouette has a scoop neck and tie-up shoulder straps\n\u2022 Mirror-work borders the neckline and hem, and small hanging beads along the hem add a playful swing\n\u2022 Style it with white palazzos, as shown, for a vibrant look for mehndi nights, festive days and family functions',
    price: 379.00,
    compare_at_price: 899.00,
    category: 'Kurti',
    fabric: 'Premium Cotton Blend',
    craft_type: 'Floral Print & Mirror Work',
    sizes: ['Free Size'],
    images: ['/products/kurti/11.jpg', '/products/kurti/12.jpg']
  },
  'plum-tie-shoulder-kurti': {
    id: 'k2l3m4n5-o6p7-q8r9-s0t1-u2v3plum1',
    name: 'Plum Tie Shoulder Kurti',
    slug: 'plum-tie-shoulder-kurti',
    description: '\u2022 Rich, moody and full of depth. The plum-purple base has a mottled, dye-inspired texture, with cream-and-gold motifs that stand out against it\n\u2022 The sleeveless A-line cut has a scoop neck and tie-up shoulder straps finished with small tassels\n\u2022 Mirror-work along the neckline and hem adds a soft shimmer\n\u2022 Pair it with white palazzos, as shown, for a graceful look for evening functions, festive gatherings and special occasions',
    price: 398,
    compare_at_price: 899.00,
    category: 'Kurti',
    fabric: 'Premium Cotton Blend',
    craft_type: 'Floral Print & Mirror Work',
    sizes: ['Free Size'],
    images: ['/products/kurti/13.jpg', '/products/kurti/14.jpg']
  },
  'royal-embroided-kurti': {
    id: 'r0y1a2l3-e4m5-b6r7-o8i9-d0e1d2k3u4r5',
    name: 'Royal Embroided Kurti',
    slug: 'royal-embroided-kurti',
    description: 'Embrace timeless elegance with a modern twist. This stunning white tunic is a masterpiece of intricate artistry, featuring delicate white-on-white embroidery that blends traditional paisley motifs with contemporary geometric patterns.\n\nDesigned for the woman who loves effortless grace, this piece features a breezy A-line silhouette and delicate spaghetti straps, making it the perfect companion for sun-drenched afternoons. The ethereal white palette is playfully contrasted with vibrant, multi-colored tassel detailing along the neckline and side slits, adding a pop of joy and a bohemian spirit to the look.\n\nFinished with a sophisticated scalloped lace hem, this top transitions seamlessly from a polished daytime look with wide-leg denim to a refined evening ensemble.',
    price: 576,
    compare_at_price: 899.00,
    category: 'Kurti',
    fabric: 'Premium Cotton Blend',
    craft_type: 'White-on-White Embroidery',
    sizes: ['Free Size'],
    images: ['/products/kurti/royal1.jpg', '/products/kurti/royal2.jpg', '/products/kurti/royal3.jpg', '/products/kurti/royal4.jpg']
  },
  // ── Navratri Garbha Skirt Collection (4 colour variants in one catalogue) ──
  'navratri-rose-print-garbha-skirt': {
    id: 'n4v1r4t7-r0s3-g4r6-h4s1-k1r7s0k1r701',
    name: 'Navratri Design Garbha Skirt',
    slug: 'navratri-rose-print-garbha-skirt',
    description: 'Step into a world of color and culture. This breathtaking maxi skirt is more than just a garment; it is a wearable piece of art. Featuring a delicate all-over floral print on a crisp white canvas, the skirt blooms into a magnificent wide border that tells a story of tradition.\n\nInspired by timeless folk art, the intricate border depicts rhythmic dancers and traditional motifs in vibrant hues of saffron, crimson, and royal blue. The voluminous, high-waist silhouette is designed for movement, creating a stunning flare with every step you take. Accented with a shimmering embellished waistband, this piece perfectly bridges the gap between ethnic heritage and modern luxury.',
    price: 891,
    compare_at_price: 1299.00,
    category: 'Navratri Special',
    fabric: 'Premium Cotton Blend',
    craft_type: 'Folk Art Print & Mirror Embellishments',
    sizes: ['Free Size'],
    images: ['/products/kurti/navratri_skirt1.jpg', '/products/kurti/navratri_skirt2.jpg'],
    colorOptions: [
      {
        name: 'Navratri Rose Print Garbha Skirt',
        colorName: 'Red',
        colorHex: '#DC2626',
        slug: 'navratri-rose-print-garbha-skirt',
        description: 'Step into a world of color and culture. This breathtaking maxi skirt is more than just a garment; it is a wearable piece of art. Featuring a delicate all-over floral print on a crisp white canvas, the skirt blooms into a magnificent wide border that tells a story of tradition.\n\nInspired by timeless folk art, the intricate border depicts rhythmic dancers and traditional motifs in vibrant hues of saffron, crimson, and royal blue. The voluminous, high-waist silhouette is designed for movement, creating a stunning flare with every step you take. Accented with a shimmering embellished waistband, this piece perfectly bridges the gap between ethnic heritage and modern luxury.',
        craft_type: 'Folk Art Print & Mirror Embellishments',
        images: ['/products/kurti/navratri_skirt1.jpg', '/products/kurti/navratri_skirt2.jpg']
      },
      {
        name: 'Navratri Folk Design Garbha Skirt',
        colorName: 'Golden Yellow',
        colorHex: '#DAA520',
        slug: 'navratri-folk-design-garbha-skirt',
        description: 'Step into a celebration of color and culture. The Heritage Harmony skirt is a wearable masterpiece that blends traditional Indian folk art with a contemporary bohemian silhouette.\n\nThe piece begins with a delicate, all-over ditsy floral print on a crisp white canvas, creating a light and airy feel. As the eye moves downward, the skirt blooms into a magnificent, wide-border narrative, depicting rhythmic traditional dancers and ornate motifs in vibrant shades of saffron, crimson, and royal blue.\n\nFinished with an intricately embellished waistband that adds a touch of shimmering luxury, this high-waisted, full-flare skirt is designed for the woman who carries her heritage with grace and modern confidence.',
        craft_type: 'Folk Art Print & Mirror Embellishments',
        images: ['/products/kurti/navratri_folk_skirt1.jpg', '/products/kurti/navratri_folk_skirt2.jpg']
      },
      {
        name: 'Navratri Garba Blue Skirt',
        colorName: 'Blue',
        colorHex: '#1E40AF',
        slug: 'navratri-garba-blue-skirt',
        description: 'Celebrate the spirit of the festivities with a garment that embodies grace and tradition. Our Navratri Garba Blue Skirt is a breathtaking fusion of heritage artistry and modern silhouette, designed specifically for the woman who wants to shine under the festive lights.\n\nThe skirt features a pristine white canvas adorned with intricate blue and gold geometric motifs, creating a sophisticated, airy feel. This elegance is grounded by a magnificent wide border that captures the essence of the dance\u2014featuring beautifully detailed figures in traditional Garba attire, swirling in rhythm.\n\nFinished with a shimmering embellished waistband, this high-volume flare ensures that every step and every twirl is a statement of elegance.',
        craft_type: 'Geometric Blue Motifs & Garba Art Border',
        images: ['/products/kurti/navratri_blue_skirt1.jpg', '/products/kurti/navratri_blue_skirt2.jpg']
      },
      {
        name: 'Raasrang Garba Skirt',
        colorName: 'Green',
        colorHex: '#4D7C0F',
        slug: 'raasrang-garba-skirt',
        description: "Meet the Raasrang Garba Skirt from Arghya, made to be twirled. This ivory skirt has a scattered multicolour floral print, and its hem is lined with illustrated Garba dancers in motion, so the whole skirt looks alive when you dance.\n\nThe wide hem carries folk-art panels in mustard, indigo, coral and green. Each panel shows a village scene of musicians, dancers and festive figures. A shimmering olive-green border finishes the edge.\n\nThe skirt has a generous flare, so it fans out into a full circle with every spin. The smocked, stretchable waist fits comfortably through hours of Garba and Dandiya without needing adjustments or safety pins.\n\nPair it with a crisp white crop top for a modern look, or with a mirror-work choli or kediyu blouse for a traditional one. Add oxidised silver jewellery and jutti, and you're ready for the dance floor.",
        craft_type: 'Folk Art Panels & Olive Green Border',
        images: ['/products/kurti/raasrang_skirt1.jpg', '/products/kurti/raasrang_skirt2.jpg']
      }
    ]
  },

  // ── Blossom Floral Printed Kurti — single catalogue with Blue & Pink colour options ──
  'blue-blossom-floral-printed-kurti': {
    id: 'blossom-floral-printed-kurti-001',
    name: 'Blossom Floral Printed Kurti',
    slug: 'blue-blossom-floral-printed-kurti',
    description: 'Arghya Blossom Floral Printed Kurti\nCream cotton-feel kurti available in soft Blue and dreamy Pink floral prints, with pom-pom trims\n\nProduct Description\n\nThe Blossom Floral Printed Kurti is a light, easy kurti for everyday wear. The cream base blooms with large watercolour-style florals — choose your favourite shade.\n\nThe design details set it apart. The side slit has a tie-up dori detail, and the slit and hem are edged with white pom-pom lace. The back has a criss-cross neckline cutout, which adds interest from behind. The sleeves are full-length and the neckline is clean, so it works for a day at college, a family lunch or a casual outing.\n\nIt is a breathable, comfortable kurti that pairs well with jeans, palazzos, leggings or an ethnic skirt.',
    price: 419.00,
    compare_at_price: 999.00,
    category: 'Kurti',
    fabric: 'Cotton-Feel',
    craft_type: 'Floral Print & Pom-Pom Trim',
    sizes: ['S', 'L', 'XL', 'XXL'],
    images: ['/products/kurti/blue_blossom_kurti_v2.jpg'],
    colorOptions: [
      {
        name: 'Blue Blossom Floral Printed Kurti',
        colorName: 'Blue',
        colorHex: '#3B82F6',
        slug: 'blue-blossom-floral-printed-kurti',
        description: 'Arghya Blue Blossom Floral Printed Kurti\nCream cotton-feel kurti with a soft blue floral print and pom-pom trims\n\nProduct Description\n\nThe Blue Blossom Floral Printed Kurti is a light, easy kurti for everyday wear. The cream base carries large clusters of powder-blue and denim-blue flowers with sage-green leaves, so it looks fresh and calm. The print is soft and watercolour-like, not loud.\n\nThe design details set it apart. The side slit has a tie-up dori detail, and the slit and hem are edged with white pom-pom lace. The back has a criss-cross neckline cutout, which adds interest from behind. The sleeves are full-length and the neckline is clean, so it works for a day at college, a family lunch or a casual outing.\n\nIt is a breathable, comfortable kurti that pairs well with jeans, palazzos, leggings or an ethnic skirt.',
        craft_type: 'Floral Print & Pom-Pom Trim',
        sizes: ['S', 'L', 'XL', 'XXL'],
        images: ['/products/kurti/blue_blossom_kurti_v2.jpg']
      },
      {
        name: 'Pink Blossom Floral Printed Kurti',
        colorName: 'Pink',
        colorHex: '#EC4899',
        slug: 'pink-blossom-floral-printed-kurti',
        description: 'Arghya Pink Blossom Floral Printed Kurti\nCream cotton-feel kurti with a rosy-pink floral print and pom-pom trims\n\nProduct Description\n\nThe Pink Blossom Floral Printed Kurti has big, romantic flowers in rose-pink and dusty blush on a cream base, with sage-green leaves for balance. The look is warm and feminine, and it flatters most skin tones.\n\nThe tie-up dori detail on the side slit and the white pom-pom trim along the hem add a playful touch. The criss-cross back neckline makes it stand out from a plain kurti. It is a soft, easy kurti for daily wear that still looks put-together enough for festive gatherings.\n\nWear it with jeans for a relaxed look or with palazzos or a skirt for something more traditional.',
        craft_type: 'Floral Print & Pom-Pom Trim',
        sizes: ['S', 'L', 'XL', 'XXL'],
        images: ['/products/kurti/red_blossom_kurti_v2.jpg']
      }
    ]
  }
};

// ── Slug aliases: all 4 skirt URLs resolve to the same combined catalogue ──
PRODUCTS_MAP['navratri-folk-design-garbha-skirt'] = PRODUCTS_MAP['navratri-rose-print-garbha-skirt'];
PRODUCTS_MAP['navratri-garba-blue-skirt'] = PRODUCTS_MAP['navratri-rose-print-garbha-skirt'];
PRODUCTS_MAP['raasrang-garba-skirt'] = PRODUCTS_MAP['navratri-rose-print-garbha-skirt'];

// ── Blossom Kurti: pink & legacy red slugs resolve to the same combined catalogue ──
PRODUCTS_MAP['pink-blossom-floral-printed-kurti'] = PRODUCTS_MAP['blue-blossom-floral-printed-kurti'];
PRODUCTS_MAP['red-blossom-floral-printed-kurti'] = PRODUCTS_MAP['blue-blossom-floral-printed-kurti'];

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { addItem } = useCartStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const baseProduct = getCatalogProduct(params.slug) || PRODUCTS_CATALOG[params.slug] || PRODUCTS_MAP[params.slug] || Object.values(PRODUCTS_CATALOG)[0];

  // Auto-select the colour that matches the URL slug
  const initialColorIdx = baseProduct.colorOptions
    ? Math.max(0, baseProduct.colorOptions.findIndex((opt: any) => opt.slug === params.slug))
    : 0;
  const [selectedColorIdx, setSelectedColorIdx] = useState(initialColorIdx);

  const isBlossomKurti =
    params.slug.includes('blossom-floral-printed-kurti') ||
    baseProduct.slug?.includes('blossom-floral-printed-kurti');

  const initialSizes = baseProduct.colorOptions?.[initialColorIdx]?.sizes || baseProduct.sizes || ['Free Size'];
  // Default to first in-stock size (skipping sold-out S for Blossom kurti)
  const defaultInitialSize = (isBlossomKurti ? initialSizes.find((s: string) => s !== 'S') : null) || initialSizes[0] || 'Free Size';
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
    if (!currentSizes.includes(selectedSize) || (selectedSize === 'S' && isBlossomKurti)) {
      const fallback = (isBlossomKurti ? currentSizes.find((s: string) => s !== 'S') : null) || currentSizes[0] || 'Free Size';
      setSelectedSize(fallback);
    }
  }, [activeColorOption, baseProduct.sizes, selectedSize, isBlossomKurti]);

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
                {isBlossomKurti && (
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    Size S Sold Out
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {sizes.map((sizeOption: string) => {
                  const isSoldOut = sizeOption === 'S' && isBlossomKurti;
                  const isSelected = selectedSize === sizeOption;
                  return (
                    <button
                      key={sizeOption}
                      type="button"
                      onClick={() => {
                        if (isSoldOut) {
                          setIsSoldOutModalOpen(true);
                          return;
                        }
                        setSelectedSize(sizeOption);
                      }}
                      className={`relative px-4 py-2 rounded-xl text-xs font-bold uppercase border transition-all ${
                        isSoldOut
                          ? 'border-rose-300 dark:border-rose-900/70 bg-rose-50/70 dark:bg-rose-950/30 text-rose-400 dark:text-rose-400/60 cursor-pointer'
                          : isSelected
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-sm ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-stone-900'
                          : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <span className={isSoldOut ? 'line-through opacity-70' : ''}>{sizeOption}</span>
                      {isSoldOut && (
                        <span className="absolute -top-2 -right-1.5 text-[8px] font-black text-rose-600 bg-rose-100 dark:bg-rose-900 px-1.5 rounded-full border border-rose-300 dark:border-rose-700">
                          Sold
                        </span>
                      )}
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