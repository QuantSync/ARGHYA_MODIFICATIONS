import { Product } from './api';
import { getCatalogProduct } from './productsCatalog';

export const ALL_PRODUCT_PAYMENT_URLS: Record<string, string> = {
  // ── 925 Pure Silver Bracelets ──────────────────────────────────────────
  '925-sterling-silver-purple-stone-bracelet': 'https://rzp.io/rzp/puresilverpurplestonedbraclet',
  '925 pure silver purple stoned bracelet': 'https://rzp.io/rzp/puresilverpurplestonedbraclet',
  '925-sterling-silver-toggle-bracelet': 'https://rzp.io/rzp/puresilvertogglebracelet',
  '925 sterling silver toggle bracelet': 'https://rzp.io/rzp/puresilvertogglebracelet',
  '925-sterling-silver-turquoise-clover-bracelet': 'https://rzp.io/rzp/puresilverturquoise',
  'pure silver turquoise clover bracelet': 'https://rzp.io/rzp/puresilverturquoise',
  '925-sterling-silver-heart-charm-bracelet': 'https://rzp.io/rzp/puresilverheartcharmbraclet',
  'pure silver heart charm bracelet': 'https://rzp.io/rzp/puresilverheartcharmbraclet',
  '925-sterling-silver-star-bracelet': 'https://rzp.io/rzp/puresilverstarbracelet',
  'pure sterling silver star bracelet': 'https://rzp.io/rzp/puresilverstarbracelet',
  '925-sterling-silver-butterfly-bracelet': 'https://rzp.io/rzp/puresilverbutterflybracelet',
  'pure sterling silver butterfly bracelet': 'https://rzp.io/rzp/puresilverbutterflybracelet',

  // ── 925 Pure Silver Anklets ────────────────────────────────────────────
  '925-triple-layer-silver-beaded-anklet': 'https://rzp.io/rzp/triplelayersilverbeadedanklet',
  'triplelayersilverbeadedanklet': 'https://rzp.io/rzp/triplelayersilverbeadedanklet',
  '925-celestial-star-charm-anklet': 'https://rzp.io/rzp/celestialstarcharmanklet',
  'celestialstarcharmanklet': 'https://rzp.io/rzp/celestialstarcharmanklet',
  '925-black-beaded-sterling-silver-anklet': 'https://rzp.io/rzp/blackbeadedsterlingsilverneckl',
  'blackbeadedsterlingsilverneckl': 'https://rzp.io/rzp/blackbeadedsterlingsilverneckl',
  '925-crystal-drop-silver-anklet': 'https://rzp.io/rzp/crystaldropsilveranklet',
  'crystaldropsilveranklet': 'https://rzp.io/rzp/crystaldropsilveranklet',
  '925-three-charm-silver-anklet': 'https://rzp.io/rzp/threecharmsilveranklet',
  'threecharmsilveranklet': 'https://rzp.io/rzp/threecharmsilveranklet',
  '925-minimalist-silver-beaded-anklet': 'https://rzp.io/rzp/minimalistsilverbeadedanklet',
  'minimalistsilverbeadedanklet': 'https://rzp.io/rzp/minimalistsilverbeadedanklet',
  '925-double-chain-silver-bead-anklet': 'https://rzp.io/rzp/doublechainsilverbeadanklet',
  'doublechainsilverbeadanklet': 'https://rzp.io/rzp/doublechainsilverbeadanklet',
  '925-double-layer-black-beaded-anklet': 'https://rzp.io/rzp/doublelayerblackbeadedanklet',
  'doublelayerblackbeadedanklet': 'https://rzp.io/rzp/doublelayerblackbeadedanklet',
  '925-double-evil-eye-silver-anklet': 'https://rzp.io/rzp/doubleeveileyesilveranklet',
  'doubleeveileyesilveranklet': 'https://rzp.io/rzp/doubleeveileyesilveranklet',
  'doubleeveileyesilver': 'https://rzp.io/rzp/doubleeveileyesilveranklet',
  'doubleeveileyesilvei': 'https://rzp.io/rzp/doubleeveileyesilveranklet',
  '925-minimal-blue-evil-eye-anklet': 'https://rzp.io/rzp/minimalblueeveileyeanklet',
  'minimalblueeveileyeanklet': 'https://rzp.io/rzp/minimalblueeveileyeanklet',
  '925-evil-eye-black-beaded-anklet': 'https://rzp.io/rzp/evileyeblackbeadanklet',
  'evileyeblackbeadanklet': 'https://rzp.io/rzp/evileyeblackbeadanklet',
  '925-traditional-silver-ghungroo-anklet': 'https://rzp.io/rzp/traditionalsilverghungroo',

  // ── 925 Pure Silver Necklaces ──────────────────────────────────────────
  '925-midnight-beads-necklace': 'https://rzp.io/rzp/midnightbeadsnecklace',
  'midnightbeadsnecklace': 'https://rzp.io/rzp/midnightbeadsnecklace',
  '925-sterling-silver-blue-evil-eye-necklace': 'https://rzp.io/rzp/silverevileyenecklace',
  'silverevileyenecklace': 'https://rzp.io/rzp/silverevileyenecklace',
  '925sterling silver evil eye necklace': 'https://rzp.io/rzp/silverevileyenecklace',
  '925-sterling-silver-triple-heart-love-necklace': 'https://rzp.io/rzp/silvertripleheartnecklace',
  'silvertripleheartnecklace': 'https://rzp.io/rzp/silvertripleheartnecklace',
  '925sterling silver triple heart necklace': 'https://rzp.io/rzp/silvertripleheartnecklace',
  '925-silver-bead-cascade-necklace': 'https://rzp.io/rzp/silverbeadcascadenecklace',
  'silverbeadcascadenecklace': 'https://rzp.io/rzp/silverbeadcascadenecklace',
  '925-triple-silver-bead-necklace': 'https://rzp.io/rzp/trioballnecklace',
  'trioballnecklace': 'https://rzp.io/rzp/trioballnecklace',
  'triplesilverbeadnecklace': 'https://rzp.io/rzp/triplesilverbeadnecklace',
  '925 minimalist trio ball necklace': 'https://rzp.io/rzp/trioballnecklace',
  '925 triple silver bead necklace': 'https://rzp.io/rzp/triplesilverbeadnecklace',
  '925-silver-beaded-elegance-necklace': 'https://rzp.io/rzp/silverbeadednecklace',
  'silverbeadednecklace': 'https://rzp.io/rzp/silverbeadednecklace',
  '925-tiny-love-heart-necklace': 'https://rzp.io/rzp/tinyloveheartnecklace',
  'tinyloveheartnecklace': 'https://rzp.io/rzp/tinyloveheartnecklace',
  '925-butterfly-bliss-necklace': 'https://rzp.io/rzp/butterflyblissnecklace',
  'butterflyblissnecklace': 'https://rzp.io/rzp/butterflyblissnecklace',
  '925-celestial-charm-necklace': 'https://rzp.io/rzp/celestialcharmnecklace',
  'celestialcharmnecklace': 'https://rzp.io/rzp/celestialcharmnecklace',
  '925 silver celestial charm necklace': 'https://rzp.io/rzp/celestialcharmnecklace',
  '925-celestial-moon-star-necklace': 'https://rzp.io/rzp/moonstarnecklace',
  'moonstarnecklace': 'https://rzp.io/rzp/moonstarnecklace',
  '925 celestial moon & star necklace': 'https://rzp.io/rzp/moonstarnecklace',

  // ── Kurtis & Festive Wear ──────────────────────────────────────────────
  'rangrez-chaniya-set': 'https://rzp.io/rzp/rangrezchaniyaset',
  'the-saffron-aura-fusion-set': 'https://rzp.io/rzp/withoutdiscountsaffronfusion',
  'the-prism-radiance-fusion-set': 'https://rzp.io/rzp/withoutdiscountprismradiancefu',
  'plum-tie-shoulder-kurti': 'https://rzp.io/rzp/plumtieshoulderkurti',
  'royal-embroided-kurti': 'https://rzp.io/rzp/embroidedkurti',
  'navratri-rose-print-garbha-skirt': 'https://rzp.io/rzp/rosegarbhaskirt',
  'navratri-folk-design-garbha-skirt': 'https://rzp.io/rzp/navratrifolkskirt',
  'navratri-garba-blue-skirt': 'https://rzp.io/rzp/garbablueskirt',
  'raasrang-garba-skirt': 'https://rzp.io/rzp/raasrangskirt',
  'blue-blossom-floral-printed-kurti': 'https://rzp.io/rzp/blueblossomfloralkurti',
  'pink-blossom-floral-printed-kurti': 'https://rzp.io/rzp/redblossomfloral',
  'red-blossom-floral-printed-kurti': 'https://rzp.io/rzp/redblossomfloral',
  'lime-green-floral-mirror-work-kurti': 'https://rzp.io/rzp/limegreenfloralkurti',
  'gulnar-floral-kurti': 'https://rzp.io/rzp/limegreenfloralkurti',
  'neelam-floral-kurti': 'https://rzp.io/rzp/neelamfloralkurti',
  'roshni-floral-kurti': 'https://rzp.io/rzp/roshnifloralkurti',
  'vamika-floral-kurti': 'https://rzp.io/rzp/vamikafloralkurti',
  'olive-tie-shoulder-kurti': 'https://rzp.io/rzp/olivetieshoulderkurti',
  'pink-tie-shoulder-kurti': 'https://rzp.io/rzp/pinktieshouklderkurti',
};

/**
 * Returns the exact direct payment page gateway URL for a given product.
 */
export function getProductPaymentUrl(product?: Product | { slug?: string; name?: string; razorpay_url?: string } | null): string | null {
  if (!product) return null;

  // 1. Direct razorpay_url property on product object
  if ((product as any).razorpay_url) {
    return (product as any).razorpay_url;
  }

  const slug = product.slug?.toLowerCase().trim() || '';

  // 2. Direct slug lookup in catalog
  if (slug) {
    const catalogItem = getCatalogProduct(slug);
    if (catalogItem?.razorpay_url) {
      return catalogItem.razorpay_url;
    }
  }

  // 3. Exact slug match in ALL_PRODUCT_PAYMENT_URLS
  if (slug && ALL_PRODUCT_PAYMENT_URLS[slug]) {
    return ALL_PRODUCT_PAYMENT_URLS[slug];
  }

  // 4. Normalized slug match (replace spaces/dashes)
  const normalizedSlug = slug.replace(/[^a-z0-9]/g, '');
  for (const [key, url] of Object.entries(ALL_PRODUCT_PAYMENT_URLS)) {
    if (key.replace(/[^a-z0-9]/g, '') === normalizedSlug) {
      return url;
    }
  }

  // 5. Name match
  const name = product.name?.toLowerCase().trim() || '';
  if (name) {
    const normalizedName = name.replace(/[^a-z0-9]/g, '');
    for (const [key, url] of Object.entries(ALL_PRODUCT_PAYMENT_URLS)) {
      if (key.replace(/[^a-z0-9]/g, '') === normalizedName) {
        return url;
      }
    }
  }

  return null;
}
