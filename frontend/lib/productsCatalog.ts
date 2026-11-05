export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price?: number;
  combo_price?: number;
  category: string;
  subcategory?: string;
  fabric?: string;
  craft_type?: string;
  images: string[];
  sizes?: string[];
  colorOptions?: any[];
  razorpay_url?: string;
}

export const PRODUCTS_CATALOG: Record<string, CatalogProduct> = {
  // ── 925 PURE SILVER -> BRACELETS ──
  '925-sterling-silver-purple-stone-bracelet': {
    id: 'silv-brac-001',
    name: '925 Sterling Silver Purple Stone Bracelet',
    slug: '925-sterling-silver-purple-stone-bracelet',
    description: `*925 Sterling Silver Purple Stone Bracelet*

Elevate your jewellery collection with this elegant 925 Sterling Silver Purple Stone Bracelet. Beautifully crafted in genuine 925 sterling silver, this bracelet features a series of stunning oval-shaped purple stones, delicately secured in an intricate interlinked silver setting.

Its graceful design combines timeless elegance with contemporary styling, making it a perfect choice for everyday luxury, parties and special occasions.

*Product Details*
Material: 925 Sterling Silver
Purity: 92.5% Pure Silver
Stone Type: Purple Coloured Gemstones
Stone Shape: Oval Cut
Colour: Silver & Deep Purple
Design: Interlinked Oval Stone Pattern
Closure Type: Lobster Clasp
Finish: Premium Silver Polish
Style: Elegant & Contemporary
Occasion: Daily Wear, Party Wear & Gifting

*Care Instructions:* Avoid direct contact with perfumes, chemicals and excessive moisture. Store in an airtight jewellery pouch or box to maintain its shine.`,
    price: 1999.00,
    compare_at_price: 3999.00,
    category: '925 Pure Silver',
    subcategory: 'Bracelets',
    fabric: '925 Sterling Silver',
    craft_type: 'Interlinked Oval Stone Setting',
    images: [
      '/images/purple_stone_bracelet/purple_stone_cover.jpg',
      '/images/purple_stone_bracelet/purple_stone_1.png',
      '/images/purple_stone_bracelet/purple_stone_2.png',
      '/images/purple_stone_bracelet/purple_stone_3.png',
      '/images/purple_stone_bracelet/purple_stone_4.png',
    ],
    sizes: ['Free Size (Adjustable)'],
    razorpay_url: 'https://rzp.io/rzp/puresilverpurplestonedbraclet'
  },

  '925-sterling-silver-toggle-bracelet': {
    id: 'silv-brac-002',
    name: '925 Sterling Silver Toggle Bracelet',
    slug: '925-sterling-silver-toggle-bracelet',
    description: `Product Description

925 Sterling Silver Toggle Bracelet

Elegance lies in the details. This beautifully crafted 925 Sterling Silver Bracelet features a delicate chain design, intricately textured silver beads, and a distinctive circular toggle clasp that adds a timeless touch of sophistication.

Designed for effortless everyday elegance, its minimal yet luxurious appeal makes it perfect for both casual styling and special occasions.

Product Details
Material: 925 Sterling Silver
Design: Delicate Link Chain
Closure: Classic Toggle Clasp
Finish: High Polish Silver
Style: Minimal & Contemporary
Occasion: Everyday Wear, Parties & Gifting

*Why You'll Love It*
A perfect blend of simplicity and sophistication, this bracelet adds a subtle statement to your jewellery collection. Wear it solo or pair it with your favourite silver pieces for an effortlessly elegant look.`,
    price: 2199.00,
    compare_at_price: 4999.00,
    category: '925 Pure Silver',
    subcategory: 'Bracelets',
    fabric: '925 Sterling Silver',
    craft_type: 'Delicate Link Chain with Toggle Clasp',
    images: [
      '/images/toggle_bracelet/toggle_bracelet_1.png',
      '/images/toggle_bracelet/toggle_bracelet_2.png',
      '/images/toggle_bracelet/toggle_bracelet_3.png',
    ],
    sizes: ['Free Size (Adjustable)'],
    razorpay_url: 'https://rzp.io/rzp/puresilvertogglebracelet'
  },

  '925-sterling-silver-turquoise-clover-bracelet': {
    id: 'silv-brac-003',
    name: '925 Sterling Silver Turquoise Clover Bracelet',
    slug: '925-sterling-silver-turquoise-clover-bracelet',
    description: `925 Sterling Silver Turquoise Clover Bracelet

A touch of elegance, inspired by timeless beauty. This exquisite 925 Sterling Silver Bracelet features a delicate double-chain design with a stunning geometric centerpiece adorned with four beautiful turquoise stones.

The refreshing turquoise accents beautifully complement the polished silver finish, creating a sophisticated piece that adds effortless charm to every look.

*Product Details*
Material: 925 Sterling Silver
Design: Double Chain Bracelet
Centrepiece: Four Turquoise-Coloured Stones
Motif: Geometric Clover Design
Finish: Polished Silver
Closure: Lobster Clasp
Style: Elegant & Contemporary

*Why You'll Love It*
Designed for women who appreciate understated luxury, this bracelet effortlessly transitions from everyday styling to special occasions. Wear it alone for a delicate statement or pair it with your favourite silver jewellery.`,
    price: 4599.00,
    compare_at_price: 7999.00,
    category: '925 Pure Silver',
    subcategory: 'Bracelets',
    fabric: '925 Sterling Silver',
    craft_type: 'Double Chain Geometric Clover',
    images: [
      '/images/clover_bracelet/clover_bracelet_1.png',
      '/images/clover_bracelet/clover_bracelet_2.png',
      '/images/clover_bracelet/clover_bracelet_3.png',
    ],
    sizes: ['Free Size (Adjustable)'],
    razorpay_url: 'https://rzp.io/rzp/puresilverturquoise'
  },

  '925-sterling-silver-heart-charm-bracelet': {
    id: 'silv-brac-004',
    name: '925 Sterling Silver Heart Charm Bracelet',
    slug: '925-sterling-silver-heart-charm-bracelet',
    description: `925 Sterling Silver Heart Charm Bracelet

A symbol of love, designed to be treasured. This delicate 925 Sterling Silver Bracelet features a beautifully polished heart-shaped charm at its centre, complemented by an elegant fine-link chain. Its minimal design and subtle shine make it a timeless addition to your jewellery collection.

Perfect for everyday elegance or thoughtful gifting, this bracelet adds a romantic touch to every occasion.

*Product Details*
Material: 925 Sterling Silver
Design: Heart Charm Bracelet
Charm: Polished Heart Motif
Chain Style: Fine Link Chain
Finish: High-Polish Silver

*Why You'll Love It*
Designed for women who appreciate understated luxury, this bracelet effortlessly transitions from everyday styling to special occasions. Wear it alone for a delicate statement or pair it with your favourite silver jewellery.`,
    price: 799.00,
    compare_at_price: 1999.00,
    combo_price: 1399.00,
    category: '925 Pure Silver',
    subcategory: 'Bracelets',
    fabric: '925 Sterling Silver',
    craft_type: 'Polished Heart Motif on Fine Link Chain',
    images: [
      '/images/heart_bracelet/heart_bracelet_1.png',
      '/images/heart_bracelet/heart_bracelet_2.png',
      '/images/heart_bracelet/heart_bracelet_3.png',
    ],
    sizes: ['Free Size (Adjustable)'],
    razorpay_url: 'https://rzp.io/rzp/puresilverheartcharmbraclet'
  },

  '925-sterling-silver-star-bracelet': {
    id: 'silv-brac-005',
    name: '925 Sterling Silver Star Bracelet',
    slug: '925-sterling-silver-star-bracelet',
    description: `925 Sterling Silver Star Bracelet

Delicate, graceful, and effortlessly beautiful. This elegant 925 Sterling Silver Bracelet features a finely polished star charm at its centre, paired with a sleek silver link chain. Inspired by the beauty of transformation and freedom, its minimalist design adds a subtle touch of sophistication to your everyday style.

Perfect for those who love timeless jewellery with a delicate statement, this bracelet makes a beautiful addition to any collection and a thoughtful gift for someone special.

*Product Details*
Material: 925 Sterling Silver
Design: Star Charm Bracelet
Chain Style: Delicate Link Chain
Finish: High-Polish Silver
Closure: Lobster Clasp
Style: Minimal & Elegant
Occasion: Everyday Wear, Parties & Gifting`,
    price: 1399.00,
    compare_at_price: 2899.00,
    combo_price: 1999.00,
    category: '925 Pure Silver',
    subcategory: 'Bracelets',
    fabric: '925 Sterling Silver',
    craft_type: 'High-Polish Silver Star Motif with Delicate Link Chain',
    images: [
      '/images/star_bracelet/star_bracelet_cover.jpg',
      '/images/star_bracelet/star_bracelet_1.jpg',
      '/images/star_bracelet/star_bracelet_2.jpg',
      '/images/star_bracelet/star_bracelet_3.jpg',
    ],
    sizes: ['Free Size (Adjustable with Extender)'],
    razorpay_url: 'https://rzp.io/rzp/puresilverstarbracelet'
  },

  '925-sterling-silver-butterfly-bracelet': {
    id: 'silv-brac-006',
    name: '925 Sterling Silver Butterfly Bracelet',
    slug: '925-sterling-silver-butterfly-bracelet',
    description: `925 Sterling Silver Butterfly Bracelet

Delicate, graceful, and effortlessly beautiful. This elegant 925 Sterling Silver Bracelet features a finely polished butterfly charm at its centre, paired with a sleek silver link chain. Inspired by the beauty of transformation and freedom, its minimalist design adds a subtle touch of sophistication to your everyday style.

Perfect for those who love timeless jewellery with a delicate statement, this bracelet makes a beautiful addition to any collection and a thoughtful gift for someone special.

*Product Details*
Material: 925 Sterling Silver
Design: Butterfly Charm Bracelet
Chain Style: Delicate Link Chain
Finish: High-Polish Silver
Closure: Lobster Clasp
Style: Minimal & Elegant
Occasion: Everyday Wear, Parties & Gifting`,
    price: 1399.00,
    compare_at_price: 2899.00,
    combo_price: 1999.00,
    category: '925 Pure Silver',
    subcategory: 'Bracelets',
    fabric: '925 Sterling Silver',
    craft_type: 'High-Polish Silver Butterfly Motif with Delicate Link Chain',
    images: [
      '/images/butterfly_bracelet/butterfly_bracelet_1.png',
      '/images/butterfly_bracelet/butterfly_bracelet_2.png',
      '/images/butterfly_bracelet/butterfly_bracelet_3.png',
    ],
    sizes: ['Free Size (Adjustable with Extender)'],
    razorpay_url: 'https://rzp.io/rzp/puresilverbutterflybracelet'
  },

  // ── 925 PURE SILVER -> PENDANTS ──
  '925-sterling-silver-celestial-solitaire-pendant': {
    id: 'silv-pend-001',
    name: '925 Sterling Silver Celestial Solitaire Pendant',
    slug: '925-sterling-silver-celestial-solitaire-pendant',
    description: 'Arghya Modifications — Handcrafted in 925 Pure Sterling Silver. Featuring a brilliant cut sparkling solitaire crystal suspended from an ultra-delicate diamond-cut box chain.',
    price: 1199.00,
    compare_at_price: 2499.00,
    category: '925 Pure Silver',
    subcategory: 'Pendants',
    fabric: '925 Sterling Silver',
    craft_type: 'Anti-Tarnish Rhodium Polish',
    images: [],
    sizes: ['18 Inch Chain with 2 Inch Extender']
  },

  // ── 925 PURE SILVER -> NECKLACES (Products 7 to 16) ──
  '925-celestial-moon-star-necklace': {
    id: 'silv-neck-007',
    name: '925 Celestial Moon & Star Necklace',
    slug: '925-celestial-moon-star-necklace',
    description: `*925 Celestial Moon & Star Necklace*

Add a touch of celestial elegance to your everyday style with our Moon & Star Necklace. Featuring a beautifully crafted crescent moon and delicate star pendant, this minimalist necklace represents dreams, hope, and endless possibilities.

Made from premium 925 Sterling Silver, its delicate chain and charming celestial details make it perfect for everyday wear or layering with your favourite necklaces.

*Product Highlights:*
Material: 925 Sterling Silver
Design: Crescent Moon & Star Pendant
Style: Minimalist & Contemporary
Finish: Polished Silver
Occasion: Everyday Wear, Casual & Gifting`,
    price: 1399.00,
    compare_at_price: 2799.00,
    category: '925 Pure Silver',
    subcategory: 'Necklaces',
    fabric: '925 Sterling Silver',
    craft_type: 'Crescent Moon & Star Pendant',
    images: [
      '/images/necklaces/925-celestial-moon-star-necklace_3.png',
      '/images/necklaces/925-celestial-moon-star-necklace_1.png',
      '/images/necklaces/925-celestial-moon-star-necklace_2.png',
    ],
    sizes: ['16 - 18 Inch Adjustable Chain'],
    razorpay_url: 'https://rzp.io/rzp/moonstarnecklace',
  },

  '925-celestial-charm-necklace': {
    id: 'silv-neck-008',
    name: '925 Celestial Charm Necklace',
    slug: '925-celestial-charm-necklace',
    description: `*925 Celestial Charm Necklace*

Express your personality with our Celestial Charm Necklace, featuring five beautiful dangling charms – a heart, star, crescent moon, round disc, and sleek bar pendant.

Crafted in 925 Sterling Silver, each charm adds a unique touch of elegance and individuality. Its delicate chain and playful design make it a beautiful statement for everyday styling.

A perfect choice for those who love meaningful jewellery with a modern aesthetic.

*Product Highlights:*
Material: 925 Sterling Silver
Design: Five Different Hanging Charms
Charms: Heart, Star, Moon, Disc & Bar
Style: Modern & Minimalist
Finish: Polished Silver
Occasion: Daily Wear & Gifting`,
    price: 1399.00,
    compare_at_price: 2799.00,
    category: '925 Pure Silver',
    subcategory: 'Necklaces',
    fabric: '925 Sterling Silver',
    craft_type: 'Five Hanging Charms Setting',
    images: [
      '/images/necklaces/925-celestial-charm-necklace_3.png',
      '/images/necklaces/925-celestial-charm-necklace_1.png',
      '/images/necklaces/925-celestial-charm-necklace_2.png',
    ],
    sizes: ['16 - 18 Inch Adjustable Chain'],
    razorpay_url: 'https://rzp.io/rzp/celestialcharmnecklace',
  },

  '925-butterfly-bliss-necklace': {
    id: 'silv-neck-009',
    name: '925 Butterfly Bliss Necklace',
    slug: '925-butterfly-bliss-necklace',
    description: `*925 Butterfly Bliss Necklace*

Delicate, graceful, and effortlessly beautiful – our Butterfly Bliss Necklace is designed to add a feminine touch to your jewellery collection.

Featuring an elegant butterfly pendant suspended from a fine 925 Sterling Silver chain, this necklace symbolises transformation, freedom, and new beginnings.

Its minimal design makes it perfect for everyday elegance and special moments alike.

*Product Highlights:*
Material: 925 Sterling Silver
Design: Butterfly Pendant
Style: Elegant & Minimalist
Finish: Polished Silver
Occasion: Everyday Wear, Parties & Gifting`,
    price: 1399.00,
    compare_at_price: 2799.00,
    category: '925 Pure Silver',
    subcategory: 'Necklaces',
    fabric: '925 Sterling Silver',
    craft_type: 'Butterfly Pendant Setting',
    images: [
      '/images/necklaces/925-butterfly-bliss-necklace_2.png',
      '/images/necklaces/925-butterfly-bliss-necklace_1.png',
    ],
    sizes: ['16 - 18 Inch Adjustable Chain'],
    razorpay_url: 'https://rzp.io/rzp/butterflyblissnecklace',
  },

  '925-tiny-love-heart-necklace': {
    id: 'silv-neck-010',
    name: '925 Tiny Love Heart Necklace',
    slug: '925-tiny-love-heart-necklace',
    description: `*925 Tiny Love Heart Necklace*

Sometimes, the smallest details make the biggest statements. Our Tiny Love Heart Necklace features a delicate heart-shaped pendant that beautifully represents love, affection, and meaningful connections.

Crafted from premium 925 Sterling Silver, this timeless piece adds a subtle sparkle to your everyday look.

Simple yet meaningful, it is a perfect gift for someone special or a beautiful addition to your personal jewellery collection.

*Product Highlights:*
Material: 925 Sterling Silver
Design: Mini Heart Pendant
Style: Minimalist & Timeless
Finish: Polished Silver
Occasion: Everyday Wear, Anniversaries & Gifting`,
    price: 1399.00,
    compare_at_price: 2799.00,
    category: '925 Pure Silver',
    subcategory: 'Necklaces',
    fabric: '925 Sterling Silver',
    craft_type: 'Mini Heart Pendant Setting',
    images: [
      '/images/necklaces/925-tiny-love-heart-necklace_3.png',
      '/images/necklaces/925-tiny-love-heart-necklace_1.png',
      '/images/necklaces/925-tiny-love-heart-necklace_2.png',
    ],
    sizes: ['16 - 18 Inch Adjustable Chain'],
    razorpay_url: 'https://rzp.io/rzp/tinyloveheartnecklace',
  },

  '925-silver-beaded-elegance-necklace': {
    id: 'silv-neck-011',
    name: '925 Silver Beaded Elegance Necklace',
    slug: '925-silver-beaded-elegance-necklace',
    description: `*925 Silver Beaded Elegance Necklace*

Make a subtle statement with our Silver Beaded Elegance Necklace. Designed with beautifully arranged silver beads in graduated sizes, this necklace creates a balanced and sophisticated look.

The larger centre bead adds a distinctive focal point, while the smaller beads on either side create a graceful, symmetrical design.

Made from 925 Sterling Silver, it is an elegant choice for women who appreciate understated luxury.

*Product Highlights:*
Material: 925 Sterling Silver
Design: Graduated Silver Beads
Style: Contemporary & Elegant
Finish: High-Polish Silver
Occasion: Everyday Wear & Special Occasions`,
    price: 1999.00,
    compare_at_price: 3599.00,
    category: '925 Pure Silver',
    subcategory: 'Necklaces',
    fabric: '925 Sterling Silver',
    craft_type: 'Graduated Silver Beads Setting',
    images: [
      '/images/necklaces/925-silver-beaded-elegance-necklace_3.png',
      '/images/necklaces/925-silver-beaded-elegance-necklace_1.png',
      '/images/necklaces/925-silver-beaded-elegance-necklace_2.png',
    ],
    sizes: ['16 - 18 Inch Adjustable Chain'],
    razorpay_url: 'https://rzp.io/rzp/silverbeadednecklace',
  },

  '925-triple-silver-bead-necklace': {
    id: 'silv-neck-012',
    name: '925 Triple Silver Bead Necklace',
    slug: '925-triple-silver-bead-necklace',
    description: `*925 Triple Silver Bead Necklace*

Discover the beauty of simplicity with our Triple Silver Bead Necklace. Featuring three polished silver beads arranged beautifully at the centre, this necklace brings a modern and sophisticated touch to your everyday style.

The delicate chain complements the reflective finish of the beads, creating a clean and effortlessly elegant appearance.

Perfect for minimal jewellery lovers, this piece can be worn alone or layered with other necklaces.

*Product Highlights:*
Material: 925 Sterling Silver
Design: Three Centre Silver Beads
Style: Minimalist & Modern
Finish: High-Polish Silver
Occasion: Daily Wear & Layering`,
    price: 2199.00,
    compare_at_price: 3799.00,
    category: '925 Pure Silver',
    subcategory: 'Necklaces',
    fabric: '925 Sterling Silver',
    craft_type: 'Three Centre Silver Beads',
    images: [
      '/images/necklaces/925-triple-silver-bead-necklace_3.png',
      '/images/necklaces/925-triple-silver-bead-necklace_1.png',
      '/images/necklaces/925-triple-silver-bead-necklace_2.png',
    ],
    sizes: ['16 - 18 Inch Adjustable Chain'],
    razorpay_url: 'https://rzp.io/rzp/trioballnecklace',
  },

  '925-silver-bead-cascade-necklace': {
    id: 'silv-neck-013',
    name: '925 Silver Bead Cascade Necklace',
    slug: '925-silver-bead-cascade-necklace',
    description: `*925 Silver Bead Cascade Necklace*

Add a sophisticated touch to your look with our Silver Bead Cascade Necklace. Featuring five beautifully spaced polished silver beads along a delicate chain, this design creates a graceful balance of simplicity and elegance.

The graduated placement of the beads adds dimension and visual appeal without making the necklace look overly elaborate.

Crafted from 925 Sterling Silver, it is perfect for women who love delicate jewellery with a distinctive design.

*Product Highlights:*
Material: 925 Sterling Silver
Design: Five Spaced Silver Beads
Style: Minimalist & Sophisticated
Finish: High-Polish Silver
Occasion: Daily Wear, Office Wear & Gifting`,
    price: 1599.00,
    compare_at_price: 2999.00,
    category: '925 Pure Silver',
    subcategory: 'Necklaces',
    fabric: '925 Sterling Silver',
    craft_type: 'Five Spaced Silver Beads',
    images: [
      '/images/necklaces/925-silver-bead-cascade-necklace_3.png',
      '/images/necklaces/925-silver-bead-cascade-necklace_1.png',
      '/images/necklaces/925-silver-bead-cascade-necklace_2.png',
    ],
    sizes: ['16 - 18 Inch Adjustable Chain'],
    razorpay_url: 'https://rzp.io/rzp/silverbeadcascadenecklace',
  },

  '925-sterling-silver-triple-heart-love-necklace': {
    id: 'silv-neck-014',
    name: '925 Sterling Silver Triple Heart Love Necklace',
    slug: '925-sterling-silver-triple-heart-love-necklace',
    description: `*925 Sterling Silver Triple Heart Love Necklace*

Celebrate love in its most beautiful form with our Triple Heart Love Necklace. Featuring three delicate heart-shaped charms arranged gracefully along a fine silver chain, this necklace creates a charming and romantic look.

Crafted from premium 925 Sterling Silver, its timeless design makes it a beautiful everyday accessory and a meaningful gift for someone you love.

Whether styled alone or layered with other pieces, this necklace adds a touch of effortless femininity to every outfit.

*Product Highlights:*
Material: 925 Sterling Silver
Design: Three Heart Charms
Style: Romantic & Minimalist
Finish: Polished Silver
Occasion: Everyday Wear, Birthdays & Gifting`,
    price: 1399.00,
    compare_at_price: 2799.00,
    category: '925 Pure Silver',
    subcategory: 'Necklaces',
    fabric: '925 Sterling Silver',
    craft_type: 'Three Heart Charms',
    images: [
      '/images/necklaces/925-sterling-silver-triple-heart-love-necklace_3.png',
      '/images/necklaces/925-sterling-silver-triple-heart-love-necklace_1.png',
      '/images/necklaces/925-sterling-silver-triple-heart-love-necklace_2.png',
    ],
    sizes: ['16 - 18 Inch Adjustable Chain'],
    razorpay_url: 'https://rzp.io/rzp/silvertripleheartnecklace',
  },

  '925-sterling-silver-blue-evil-eye-necklace': {
    id: 'silv-neck-015',
    name: '925 Sterling Silver Blue Evil Eye Necklace',
    slug: '925-sterling-silver-blue-evil-eye-necklace',
    description: `*925 Sterling Silver Blue Evil Eye Necklace*

Add a touch of elegance and meaning to your everyday style with our Blue Evil Eye Necklace. Featuring a beautiful blue evil eye pendant, this delicate necklace blends minimalist aesthetics with timeless symbolism.

Traditionally believed to symbolise protection against negative energy and bad vibes, the evil eye makes this necklace more than just a stylish accessory.

Crafted from premium 925 Sterling Silver, it features a delicate chain and a beautifully detailed blue pendant, making it perfect for everyday wear, layering, or gifting someone special.

*Product Highlights:*
Material: 925 Sterling Silver
Design: Blue Evil Eye Pendant
Colour: Silver & Blue
Finish: Polished Silver
Style: Minimalist & Contemporary
Occasion: Everyday Wear, Casual Styling & Gifting

*Care Instructions:*
Keep away from perfumes, chemicals and excessive moisture. Store in a dry jewellery box when not in use to maintain its shine.`,
    price: 1399.00,
    compare_at_price: 2799.00,
    category: '925 Pure Silver',
    subcategory: 'Necklaces',
    fabric: '925 Sterling Silver',
    craft_type: 'Blue Evil Eye Pendant Setting',
    images: ['/images/necklaces/925-sterling-silver-blue-evil-eye-necklace.jpg'],
    sizes: ['16 - 18 Inch Adjustable Chain'],
    razorpay_url: 'https://rzp.io/rzp/silverevileyenecklace',
  },

  '925-midnight-beads-necklace': {
    id: 'silv-neck-016',
    name: '925 Midnight Beads Necklace',
    slug: '925-midnight-beads-necklace',
    description: `*925 Midnight Beads Necklace*

Elevate your everyday style with the timeless charm of our Midnight Beads Necklace. Beautifully designed with a delicate arrangement of glossy black beads and polished silver spheres, this necklace creates a perfect balance of elegance and modern sophistication.

Crafted from premium 925 Sterling Silver, its intricate detailing and contrasting black-and-silver elements give it a distinctive look that effortlessly complements both casual and formal outfits.

Whether worn alone for an understated statement or paired with other delicate pieces, this necklace adds a touch of contemporary luxury to every look.

*Product Highlights:*
Material: 925 Sterling Silver
Design: Black Beads & Silver Spheres
Colour: Silver & Black
Finish: Polished Silver
Style: Minimalist & Contemporary
Occasion: Everyday Wear, Office Wear & Special Occasions

*Care Instructions:*
Avoid direct contact with perfumes, chemicals and excessive moisture. Store in a dry jewellery box when not in use to maintain its shine and finish.`,
    price: 1399.00, // TODO: confirm sale price with owner
    compare_at_price: 3799.00,
    category: '925 Pure Silver',
    subcategory: 'Necklaces',
    fabric: '925 Sterling Silver',
    craft_type: 'Black Beads & Silver Spheres',
    images: [
      '/images/necklaces/925-midnight-beads-necklace_3.png',
      '/images/necklaces/925-midnight-beads-necklace_1.png',
      '/images/necklaces/925-midnight-beads-necklace_2.png',
    ],
    sizes: ['16 - 18 Inch Adjustable Chain'],
    razorpay_url: 'https://rzp.io/rzp/midnightbeadsnecklace',
  },

  '925-evil-eye-black-beaded-anklet': {
    id: 'silv-ank-001',
    name: '925 Evil Eye Black Beaded Anklet',
    slug: '925-evil-eye-black-beaded-anklet',
    description: `*925 Evil Eye Black Beaded Anklet*

Add a touch of timeless charm to your everyday style with this elegant Evil Eye anklet. Featuring glossy black beads beautifully arranged along a delicate silver chain, highlighted by a striking blue Evil Eye centerpiece. Its contemporary design blends subtle elegance with symbolic detailing, making it a perfect accessory for everyday styling.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Anklet
• Base Colour: Silver, Black & Blue
• Base Metal: 925 Sterling Silver
• Design: Black Beaded Evil Eye
• Style: Minimalist & Contemporary
• Finish: High-Polish 925 Silver`,
    price: 1799.00,
    compare_at_price: 3799.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Black Beaded Evil Eye',
    razorpay_url: 'https://rzp.io/rzp/evileyeblackbeadanklet',
    images: [
      '/images/anklets/925-evil-eye-black-beaded-anklet_1.png',
      '/images/anklets/925-evil-eye-black-beaded-anklet_2.png',
      '/images/anklets/925-evil-eye-black-beaded-anklet_3.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-minimal-blue-evil-eye-anklet': {
    id: 'silv-ank-002',
    name: '925 Minimal Blue Evil Eye Anklet',
    slug: '925-minimal-blue-evil-eye-anklet',
    description: `*925 Minimal Blue Evil Eye Anklet*

Embrace minimal elegance with this beautiful Evil Eye silver anklet. Featuring a delicate silver chain adorned with a stunning blue Evil Eye charm and subtle black detailing. Its lightweight and graceful design makes it an ideal choice for everyday wear and effortless styling.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Anklet
• Base Colour: Silver, Blue & Black
• Base Metal: 925 Sterling Silver
• Design: Minimal Evil Eye
• Style: Modern & Minimalist
• Finish: High-Polish 925 Silver`,
    price: 1699.00,
    compare_at_price: 3699.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Minimal Evil Eye',
    razorpay_url: 'https://rzp.io/rzp/minimalblueeveileyeanklet',
    images: [
      '/images/anklets/925-minimal-blue-evil-eye-anklet_1.png',
      '/images/anklets/925-minimal-blue-evil-eye-anklet_2.png',
      '/images/anklets/925-minimal-blue-evil-eye-anklet_3.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-double-evil-eye-silver-anklet': {
    id: 'silv-ank-003',
    name: '925 Double Evil Eye Silver Anklet',
    slug: '925-double-evil-eye-silver-anklet',
    description: `*925 Double Evil Eye Silver Anklet*

Make a graceful statement with this beautifully designed double Evil Eye anklet. Featuring two elegant blue Evil Eye charms placed along a fine sterling silver chain, complemented by delicate metallic accents. A perfect blend of contemporary styling and meaningful detailing.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Anklet
• Base Colour: Silver & Blue
• Base Metal: 925 Sterling Silver
• Design: Double Evil Eye
• Style: Meaningful & Contemporary
• Finish: High-Polish 925 Silver`,
    price: 1999.00,
    compare_at_price: 4999.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Double Evil Eye',
    razorpay_url: 'https://rzp.io/rzp/doubleeveileyesilveranklet',
    images: [
      '/images/anklets/925-double-evil-eye-silver-anklet_1.png',
      '/images/anklets/925-double-evil-eye-silver-anklet_2.png',
      '/images/anklets/925-double-evil-eye-silver-anklet_3.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-double-layer-black-beaded-anklet': {
    id: 'silv-ank-004',
    name: '925 Double Layer Black Beaded Anklet',
    slug: '925-double-layer-black-beaded-anklet',
    description: `*925 Double Layer Black Beaded Anklet*

Elevate your ankle jewellery collection with this sophisticated double-layer anklet. Designed with two delicate silver chains, featuring a beautiful arrangement of glossy black beads on one layer. The contrasting textures create a stylish layered appearance that adds effortless elegance to any outfit.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Double-Layer Anklet
• Base Colour: Silver & Black
• Base Metal: 925 Sterling Silver
• Design: Double Layer Black Beaded
• Style: Layered & Elegant
• Finish: High-Polish 925 Silver`,
    price: 2999.00,
    compare_at_price: 5999.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Double Layer Black Beaded',
    razorpay_url: 'https://rzp.io/rzp/doublelayerblackbeadedanklet',
    images: [
      '/images/anklets/925-double-layer-black-beaded-anklet_1.png',
      '/images/anklets/925-double-layer-black-beaded-anklet_2.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-double-chain-silver-bead-anklet': {
    id: 'silv-ank-005',
    name: '925 Double Chain Silver Bead Anklet',
    slug: '925-double-chain-silver-bead-anklet',
    description: `*925 Double Chain Silver Bead Anklet*

Discover understated luxury with this elegant double-chain silver anklet. Featuring two fine parallel chains with a beautifully polished silver bead accent, this minimalist design adds a subtle statement to your everyday look. Perfect for women who appreciate delicate and timeless jewellery.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Double-Chain Anklet
• Base Colour: Silver
• Base Metal: 925 Sterling Silver
• Design: Double Chain with Silver Bead
• Style: Minimalist Luxury
• Finish: High-Polish 925 Silver`,
    price: 1399.00,
    compare_at_price: 2799.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Double Chain with Silver Bead',
    razorpay_url: 'https://rzp.io/rzp/doublechainsilverbeadanklet',
    images: [
      '/images/anklets/925-double-chain-silver-bead-anklet_1.png',
      '/images/anklets/925-double-chain-silver-bead-anklet_2.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-traditional-silver-ghungroo-anklet': {
    id: 'silv-ank-006',
    name: '925 Traditional Silver Ghungroo Anklet',
    slug: '925-traditional-silver-ghungroo-anklet',
    description: `*925 Traditional Silver Ghungroo Anklet*

Inspired by traditional craftsmanship, this stunning sterling silver anklet features multiple delicate dangling ghungroo-style charms arranged beautifully along the chain. Its intricate detailing creates graceful movement and a distinctive look, making it an elegant choice for festive occasions and ethnic styling.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Anklet
• Base Colour: Silver
• Base Metal: 925 Sterling Silver
• Design: Dangling Ghungroo Charms
• Style: Ethnic, Festive & Traditional
• Finish: High-Polish 925 Silver`,
    price: 3199.00,
    compare_at_price: 5899.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Dangling Ghungroo Charms',
    razorpay_url: 'https://rzp.io/rzp/traditionalsilverghungroo',
    images: [
      '/images/anklets/925-traditional-silver-ghungroo-anklet_1.png',
      '/images/anklets/925-traditional-silver-ghungroo-anklet_2.png',
      '/images/anklets/925-traditional-silver-ghungroo-anklet_3.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-minimalist-silver-beaded-anklet': {
    id: 'silv-ank-007',
    name: '925 Minimalist Silver Beaded Anklet',
    slug: '925-minimalist-silver-beaded-anklet',
    description: `*925 Minimalist Silver Beaded Anklet*

Simplicity meets sophistication in this delicate sterling silver anklet. Featuring a fine silver chain enhanced with tiny polished bead accents, this minimalist piece offers a refined and graceful appearance. An effortless accessory for everyday elegance and layering.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Anklet
• Base Colour: Silver
• Base Metal: 925 Sterling Silver
• Design: Minimal Silver Bead Detailing
• Style: Everyday Minimalist
• Finish: High-Polish 925 Silver`,
    price: 1399.00,
    compare_at_price: 2999.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Minimal Silver Bead Detailing',
    razorpay_url: 'https://rzp.io/rzp/minimalistsilverbeadedanklet',
    images: [
      '/images/anklets/925-minimalist-silver-beaded-anklet_1.png',
      '/images/anklets/925-minimalist-silver-beaded-anklet_2.png',
      '/images/anklets/925-minimalist-silver-beaded-anklet_3.png',
      '/images/anklets/925-minimalist-silver-beaded-anklet_4.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-three-charm-silver-anklet': {
    id: 'silv-ank-008',
    name: '925 Three Charm Silver Anklet',
    slug: '925-three-charm-silver-anklet',
    description: `*925 Three Charm Silver Anklet*

Add a charming touch to your jewellery collection with this elegant three-charm silver anklet. Featuring three beautifully placed dangling charms along a delicate sterling silver chain, this design creates a graceful look with subtle movement. Perfect for everyday wear and special occasions.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Anklet
• Base Colour: Silver
• Base Metal: 925 Sterling Silver
• Design: Three Dangling Charms
• Style: Graceful & Playful
• Finish: High-Polish 925 Silver`,
    price: 1799.00,
    compare_at_price: 3899.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Three Dangling Charms',
    razorpay_url: 'https://rzp.io/rzp/threecharmsilveranklet',
    images: [
      '/images/anklets/925-three-charm-silver-anklet_1.png',
      '/images/anklets/925-three-charm-silver-anklet_2.png',
      '/images/anklets/925-three-charm-silver-anklet_3.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-crystal-drop-silver-anklet': {
    id: 'silv-ank-009',
    name: '925 Crystal Drop Silver Anklet',
    slug: '925-crystal-drop-silver-anklet',
    description: `*925 Crystal Drop Silver Anklet*

Bring a delicate sparkle to your everyday style with this beautiful sterling silver anklet. Designed with a fine silver chain and three elegant dangling crystal-style accents, this piece reflects light beautifully with every movement. A graceful addition to both casual and occasion wear.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Anklet
• Base Colour: Silver
• Base Metal: 925 Sterling Silver
• Design: Three Crystal Drop Charms
• Style: Sparkling & Graceful
• Finish: High-Polish 925 Silver`,
    price: 1499.00,
    compare_at_price: 2899.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Three Crystal Drop Charms',
    razorpay_url: 'https://rzp.io/rzp/crystaldropsilveranklet',
    images: [
      '/images/anklets/925-crystal-drop-silver-anklet_1.png',
      '/images/anklets/925-crystal-drop-silver-anklet_2.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-black-beaded-sterling-silver-anklet': {
    id: 'silv-ank-010',
    name: '925 Black Beaded Sterling Silver Anklet',
    slug: '925-black-beaded-sterling-silver-anklet',
    description: `*925 Black Beaded Sterling Silver Anklet*

Give your everyday look a stylish edge with this beautiful black beaded anklet. Featuring glossy black beads arranged in delicate clusters along a fine sterling silver chain, this design creates a striking contrast of silver and black. Perfect for adding a modern touch to your jewellery collection.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Anklet
• Base Colour: Silver & Black
• Base Metal: 925 Sterling Silver
• Design: Black Beaded Chain
• Style: Modern & Striking
• Finish: High-Polish 925 Silver`,
    price: 899.00,
    compare_at_price: 2999.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Black Beaded Chain',
    razorpay_url: 'https://rzp.io/rzp/blackbeadedsterlingsilverneckl',
    images: [
      '/images/anklets/925-black-beaded-sterling-silver-anklet_1.png',
      '/images/anklets/925-black-beaded-sterling-silver-anklet_2.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-celestial-star-charm-anklet': {
    id: 'silv-ank-011',
    name: '925 Celestial Star Charm Anklet',
    slug: '925-celestial-star-charm-anklet',
    description: `*925 Celestial Star Charm Anklet*

Inspired by celestial beauty, this delicate sterling silver anklet features a charming star motif beautifully placed along a fine silver chain. Tiny bead accents add subtle detailing, creating a graceful and feminine appearance. A perfect accessory for adding a little sparkle to your everyday outfits.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Anklet
• Base Colour: Silver
• Base Metal: 925 Sterling Silver
• Design: Star Charm with Bead Accents
• Style: Celestial & Feminine
• Finish: High-Polish 925 Silver`,
    price: 999.00,
    compare_at_price: 3599.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Star Charm with Bead Accents',
    razorpay_url: 'https://rzp.io/rzp/celestialstarcharmanklet',
    images: [
      '/images/anklets/925-celestial-star-charm-anklet_1.png',
      '/images/anklets/925-celestial-star-charm-anklet_2.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  '925-triple-layer-silver-beaded-anklet': {
    id: 'silv-ank-012',
    name: '925 Triple Layer Silver Beaded Anklet',
    slug: '925-triple-layer-silver-beaded-anklet',
    description: `*925 Triple Layer Silver Beaded Anklet*

Make a sophisticated style statement with this elegant triple-layer sterling silver anklet. Featuring three beautifully aligned delicate chains with subtle bead detailing, this design creates a luxurious layered appearance. Perfect for women who love refined jewellery with a modern and graceful touch.

*Product Highlights:*
• Product Dimension: Length – 10.5 Inch
• Components: 1 Triple-Layer Anklet
• Base Colour: Silver
• Base Metal: 925 Sterling Silver
• Design: Triple Layer with Bead Detailing
• Style: Luxurious Layered Statement
• Finish: High-Polish 925 Silver`,
    price: 2499.00,
    compare_at_price: 4799.00,
    category: '925 Pure Silver',
    subcategory: 'Anklets',
    fabric: '925 Sterling Silver',
    craft_type: 'Triple Layer with Bead Detailing',
    razorpay_url: 'https://rzp.io/rzp/triplelayersilverbeadedanklet',
    images: [
      '/images/anklets/925-triple-layer-silver-beaded-anklet_1.png',
      '/images/anklets/925-triple-layer-silver-beaded-anklet_2.png',
    ],
    sizes: ['10.5 Inch (Standard)'],
  },

  // ── ANTI TARNISH -> OXIDIZED EARRINGS ──
  'royal-blue-leaf-drop-oxidised-jhumki': {
    id: 'anti-ox-ear-001',
    name: 'Royal Blue Leaf Drop Oxidised Jhumki',
    slug: 'royal-blue-leaf-drop-oxidised-jhumki',
    description: `*Royal Blue Leaf Drop Oxidised Jhumki*

Add a pop of color to your ethnic wardrobe with these stunning oxidised silver jhumkis. Featuring a rectangular top adorned with deep royal blue leaf-shaped stones, these earrings cascade into a beautifully detailed, traditional silver jhumki. Perfect for pairing with kurtis and sarees.

*Product Details:*
• Material: Oxidised Silver Finish, Artificial Stones
• Colour: Silver & Royal Blue
• Style: Traditional Jhumki
• Closure: Push Back`,
    price: 199.00,
    compare_at_price: 599.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Artificial Stones',
    craft_type: 'Traditional Jhumki',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/royalblueleafdropoxidisedjhumk'
  },

  'vintage-floral-peacock-oxidised-dangle-earrings': {
    id: 'anti-ox-ear-002',
    name: 'Vintage Floral Peacock Oxidised Dangle Earrings',
    slug: 'vintage-floral-peacock-oxidised-dangle-earrings',
    description: `*Vintage Floral Peacock Oxidised Dangle Earrings*

These exquisite oxidised earrings feature an intricate, vintage-inspired floral and peacock motif. Crafted with meticulous attention to detail, the antique silver finish and dangling pearl-like beads give them a rich, regal look. A perfect statement piece for festive occasions.

*Product Details:*
• Material: Oxidised Silver Finish, Metal Beads
• Colour: Antique Silver
• Style: Dangle & Drop
• Closure: Push Back`,
    price: 199.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Metal Beads',
    craft_type: 'Dangle & Drop',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/vintagefloralpeacockdangleeari'
  },

  'mirror-center-oxidised-chandbali-jhumki': {
    id: 'anti-ox-ear-003',
    name: 'Mirror Center Oxidised Chandbali Jhumki',
    slug: 'mirror-center-oxidised-chandbali-jhumki',
    description: `*Mirror Center Oxidised Chandbali Jhumki*

A unique blend of modern and traditional, these oxidised silver earrings feature a striking round mirror in the center, surrounded by an ornate, filigree-style circular frame. The attached jhumki with tiny beads adds a classic touch to this contemporary design.

*Product Details:*
• Material: Oxidised Silver Finish, Mirror, Metal Beads
• Colour: Silver
• Style: Chandbali Jhumki
• Closure: Hook`,
    price: 199.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Mirror, Metal Beads',
    craft_type: 'Chandbali Jhumki',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/mirrorcentreoxidisedchandbalij'
  },

  'antique-gold-textured-dome-jhumki': {
    id: 'anti-ox-ear-004',
    name: 'Antique Gold Textured Dome Jhumki',
    slug: 'antique-gold-textured-dome-jhumki',
    description: `*Antique Gold Textured Dome Jhumki*

Elevate your look with these majestic antique gold-tone jhumkis. The large circular top and the dome-shaped bottom are heavily textured with traditional embossed patterns. The look is completed with delicate pearl drops.

*Product Details:*
• Material: Antique Gold Finish, Faux Pearls
• Colour: Antique Gold
• Style: Heavy Jhumki
• Closure: Push Back`,
    price: 199.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Antique Gold Finish, Faux Pearls',
    craft_type: 'Heavy Jhumki',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/antiquegoldtextureddomejhumki'
  },

  'crystal-studded-spiral-oxidised-earrings': {
    id: 'anti-ox-ear-005',
    name: 'Crystal Studded Spiral Oxidised Earrings',
    slug: 'crystal-studded-spiral-oxidised-earrings',
    description: `*Crystal Studded Spiral Oxidised Earrings*

Dazzle your way through every event with these sparkling oxidised earrings. They feature a beautiful floral stud at the top, leading down to a unique spiral ring design encrusted with clear, brilliant crystals and finished with delicate silver beads.

*Product Details:*
• Material: Oxidised Silver Finish, Clear Crystals
• Colour: Silver & Clear
• Style: Dangle & Drop
• Closure: Push Back`,
    price: 219.00,
    compare_at_price: 599.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Clear Crystals',
    craft_type: 'Dangle & Drop',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/crystalstuddedspiraloxidisedea'
  },

  'minimalist-round-mirror-oxidised-drops': {
    id: 'anti-ox-ear-006',
    name: 'Minimalist Round Mirror Oxidised Drops',
    slug: 'minimalist-round-mirror-oxidised-drops',
    description: `*Minimalist Round Mirror Oxidised Drops*

Simple, elegant, and trendy. These oxidised silver earrings feature a clean, large circular mirror at the center, bordered by a textured silver frame and finished with tiny metallic drops at the bottom. Lightweight and perfect for daily wear.

*Product Details:*
• Material: Oxidised Silver Finish, Mirror
• Colour: Silver
• Style: Dangle
• Closure: Hook`,
    price: 189.00,
    compare_at_price: 399.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Mirror',
    craft_type: 'Dangle',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/minimalistroundmirroroxidisedd'
  },

  'pink-petal-teardrop-oxidised-earrings': {
    id: 'anti-ox-ear-007',
    name: 'Pink Petal Teardrop Oxidised Earrings',
    slug: 'pink-petal-teardrop-oxidised-earrings',
    description: `*Pink Petal Teardrop Oxidised Earrings*

These charming oxidised earrings feature a smooth, pink teardrop stone set within a crescent moon-like silver frame. Adorned with traditional silver beads and tiny pearl drops at the bottom, they are perfect for adding a subtle hint of color to your outfit.

*Product Details:*
• Material: Oxidised Silver Finish, Pink Stone, Faux Pearls
• Colour: Silver & Pink
• Style: Drop Earrings
• Closure: Push Back`,
    price: 199.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Pink Stone, Faux Pearls',
    craft_type: 'Drop Earrings',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/pinkpetalteardropoxidisedearri'
  },

  'classic-silver-hoop-with-ghungroo-drops': {
    id: 'anti-ox-ear-008',
    name: 'Classic Silver Hoop with Ghungroo Drops',
    slug: 'classic-silver-hoop-with-ghungroo-drops',
    description: `*Classic Silver Hoop with Ghungroo Drops*

A timeless classic with a traditional twist. These oxidised silver hoop earrings are topped with a delicate leaf motif and feature multiple tiny, metallic ghungroo-style beads dangling from the bottom edge. They move beautifully with you.

*Product Details:*
• Material: Oxidised Silver Finish
• Colour: Silver
• Style: Hoop with Drops
• Closure: Push Back`,
    price: 199.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish',
    craft_type: 'Hoop with Drops',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/classicsilverhoopswithghungroo'
  },

  'midnight-blue-teardrop-oxidised-earrings': {
    id: 'anti-ox-ear-009',
    name: 'Midnight Blue Teardrop Oxidised Earrings',
    slug: 'midnight-blue-teardrop-oxidised-earrings',
    description: `*Midnight Blue Teardrop Oxidised Earrings*

A classic design featuring a deep navy blue teardrop stone. The stone is encased in a thick oxidised silver setting with a distinctive crescent shape and surrounded by prominent silver beads. The delicate pearl drops at the bottom add an elegant finish.

*Product Details:*
• Material: Oxidised Silver Finish, Blue Stone, Faux Pearls
• Colour: Silver & Navy Blue
• Style: Drop Earrings
• Closure: Push Back`,
    price: 199.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Blue Stone, Faux Pearls',
    craft_type: 'Drop Earrings',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/midnightblueteardropoxidisedea'
  },

  'floral-motif-pearl-cluster-oxidised-drops': {
    id: 'anti-ox-ear-010',
    name: 'Floral Motif Pearl Cluster Oxidised Drops',
    slug: 'floral-motif-pearl-cluster-oxidised-drops',
    description: `*Floral Motif Pearl Cluster Oxidised Drops*

These gorgeous oxidised earrings feature a detailed floral stud that transitions into an elongated, intricately patterned teardrop shape. The bottom is heavily adorned with a cluster of faux pearls, giving it a rich, bridal-adjacent appeal.

*Product Details:*
• Material: Oxidised Silver Finish, Faux Pearls
• Colour: Silver & White
• Style: Dangle & Drop
• Closure: Push Back`,
    price: 199.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Faux Pearls',
    craft_type: 'Dangle & Drop',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/floralmotifpearlclusteroxidise'
  },

  'bohemian-silver-chandbali-hoops': {
    id: 'anti-ox-ear-011',
    name: 'Bohemian Silver Chandbali Hoops',
    slug: 'bohemian-silver-chandbali-hoops',
    description: `*Bohemian Silver Chandbali Hoops*

Embrace the bohemian trend with these simple yet striking oxidised silver hoop earrings. The plain wire hoops feature an array of small metallic beads dangling along the bottom curve, adding just the right amount of movement and texture.

*Product Details:*
• Material: Oxidised Silver Finish
• Colour: Silver
• Style: Hoop / Chandbali
• Closure: Hook (Wire)`,
    price: 159.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish',
    craft_type: 'Hoop / Chandbali',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/bohemiansilverchandbalihoops'
  },

  'monochrome-mirror-statement-oxidised-earrings': {
    id: 'anti-ox-ear-012',
    name: 'Monochrome Mirror Statement Oxidised Earrings',
    slug: 'monochrome-mirror-statement-oxidised-earrings',
    description: `*Monochrome Mirror Statement Oxidised Earrings*

Make a bold statement with these oversized oxidised earrings. Featuring a large, uniquely shaped white mirror as the centerpiece, topped with a detailed rectangular bar and studded with clear stones. The pearl drops at the bottom add a luxurious touch to this heavy piece.

*Product Details:*
• Material: Oxidised Silver Finish, Large Mirror, Faux Pearls, Crystals
• Colour: Silver & White
• Style: Statement Dangles
• Closure: Push Back`,
    price: 359.00,
    compare_at_price: 699.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Large Mirror, Faux Pearls, Crystals',
    craft_type: 'Statement Dangles',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/monochromemirroroxidisedearing'
  },

  'majestic-peacock-oxidised-jhumki': {
    id: 'anti-ox-ear-013',
    name: 'Majestic Peacock Oxidised Jhumki',
    slug: 'majestic-peacock-oxidised-jhumki',
    description: `*Majestic Peacock Oxidised Jhumki*

These grand jhumkis are a masterpiece of traditional design. The stud features an intricately carved peacock, while the large dome below is decorated with circular patterns and encrusted with small stones. The cascading chains with metallic beads complete this royal look.

*Product Details:*
• Material: Oxidised Silver Finish, Stones
• Colour: Silver
• Style: Heavy Jhumki
• Closure: Push Back`,
    price: 359.00,
    compare_at_price: 699.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Stones',
    craft_type: 'Heavy Jhumki',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/majesticpeacockoxidisedjhumki'
  },

  'sunburst-mosaic-oxidised-danglers': {
    id: 'anti-ox-ear-014',
    name: 'Sunburst Mosaic Oxidised Danglers',
    slug: 'sunburst-mosaic-oxidised-danglers',
    description: `*Sunburst Mosaic Oxidised Danglers*

A true conversation starter, these oxidised earrings feature a geometric sunburst top and a large circular body. The open circle design is studded with grey stones and features a unique floral bottom with colored petals. Finished with beaded drops.

*Product Details:*
• Material: Oxidised Silver Finish, Assorted Stones
• Colour: Silver, Grey, Black, Brown
• Style: Statement Dangles
• Closure: Push Back`,
    price: 259.00,
    compare_at_price: 699.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Assorted Stones',
    craft_type: 'Statement Dangles',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/sunburstmosiacoxidiseddanglers'
  },

  'black-stone-leaf-hoop-oxidised-earrings': {
    id: 'anti-ox-ear-015',
    name: 'Black Stone Leaf Hoop Oxidised Earrings',
    slug: 'black-stone-leaf-hoop-oxidised-earrings',
    description: `*Black Stone Leaf Hoop Oxidised Earrings*

A perfect balance of elegance and edge. These oxidised earrings feature a cluster of black, leaf-shaped stones at the top, sitting above a textured silver hoop. Small metallic beads dangle from the bottom of the hoop, adding a playful element.

*Product Details:*
• Material: Oxidised Silver Finish, Black Stones
• Colour: Silver & Black
• Style: Hoop / Dangle
• Closure: Push Back`,
    price: 199.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Black Stones',
    craft_type: 'Hoop / Dangle',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/blackstoneleafhooppxidisedearr'
  },

  'intricate-dome-classic-oxidised-jhumki': {
    id: 'anti-ox-ear-016',
    name: 'Intricate Dome Classic Oxidised Jhumki',
    slug: 'intricate-dome-classic-oxidised-jhumki',
    description: `*Intricate Dome Classic Oxidised Jhumki*

These classic oxidised jhumkis feature a large, highly detailed circular stud that leads to a traditional dome-shaped bell. The jhumki is heavily detailed with embossed patterns and surrounded by multiple metallic ghungroo beads, creating a lovely musical movement.

*Product Details:*
• Material: Oxidised Silver Finish
• Colour: Silver
• Style: Classic Jhumki
• Closure: Push Back`,
    price: 199.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish',
    craft_type: 'Classic Jhumki',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/intricatedomeclassicoxidisedjh'
  },

  'turquoise-elephant-motif-oxidised-earrings': {
    id: 'anti-ox-ear-017',
    name: 'Turquoise Elephant Motif Oxidised Earrings',
    slug: 'turquoise-elephant-motif-oxidised-earrings',
    description: `*Turquoise Elephant Motif Oxidised Earrings*

Show off your love for artistic jewelry with these unique oxidised earrings. They feature a large turquoise rectangular stone, crowned with a floral crystal design and flanked by beautifully crafted silver elephants on the sides. Finished with pearl drops.

*Product Details:*
• Material: Oxidised Silver Finish, Turquoise Stone, Crystals, Faux Pearls
• Colour: Silver & Turquoise
• Style: Statement Dangles
• Closure: Push Back`,
    price: 199.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Oxidized Earrings',
    fabric: 'Oxidised Silver Finish, Turquoise Stone, Crystals, Faux Pearls',
    craft_type: 'Statement Dangles',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/turquoiseelephantmotifoxidised'
  },



  // ── ANTI TARNISH -> AMERICAN DIAMONDS ──
  'royal-spiral-ad-necklace-set': {
    id: 'anti-ad-neck-001',
    name: 'Royal Spiral AD Necklace Set',
    slug: 'royal-spiral-ad-necklace-set',
    description: `*Royal Spiral AD Necklace Set*

A stunning traditional necklace set featuring intricate spiral motifs and beautiful American Diamond detailing. Its elegant design adds a royal touch to your ethnic look, making it perfect for weddings, parties and festive occasions.

*Product Details:*
• Type: Necklace Set
• Material: Artificial Jewellery
• Stone: American Diamond
• Finish: Silver Polish
• Feature: Anti-Tarnish
• Includes: Necklace, Matching Earrings & Maang Tikka`,
    price: 1799.00,
    compare_at_price: 3999.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Silver Polish • American Diamond',
    craft_type: 'Necklace Set',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/royalspiraladnecklaceset'
  },

  'elegant-floral-sparkle-necklace-set': {
    id: 'anti-ad-neck-002',
    name: 'Elegant Floral Sparkle Necklace Set',
    slug: 'elegant-floral-sparkle-necklace-set',
    description: `*Elegant Floral Sparkle Necklace Set*

Enhance your everyday style with this beautiful dual-tone necklace set. Designed with sparkling American Diamond floral accents and an elegant adjustable chain, it gives a sophisticated and modern look.

*Product Details:*
• Type: Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: American Diamond
• Finish: Gold & Silver Tone
• Feature: Anti-Tarnish
• Style: Modern & Elegant`,
    price: 1499.00,
    compare_at_price: 2599.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Gold & Silver Tone • American Diamond',
    craft_type: 'Modern & Elegant',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/elegantfloralsparklenecklacese'
  },

  'ruby-emerald-teardrop-necklace-set': {
    id: 'anti-ad-neck-003',
    name: 'Ruby Emerald Teardrop Necklace Set',
    slug: 'ruby-emerald-teardrop-necklace-set',
    description: `*Ruby Emerald Teardrop Necklace Set*

A beautiful combination of red and green teardrop stones with delicate sparkling detailing. This charming necklace set brings a colourful traditional touch to your outfit.

*Product Details:*
• Type: Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: American Diamond, Red & Green Stones
• Finish: Gold Polish
• Feature: Anti-Tarnish
• Occasion: Festive & Traditional Wear`,
    price: 1299.00,
    compare_at_price: 2399.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Gold Polish • American Diamond, Red & Green Stones',
    craft_type: 'Necklace & Earrings Set',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/rubyemeraldteardropnecklaceset'
  },

  'pink-petal-charm-necklace-set': {
    id: 'anti-ad-neck-004',
    name: 'Pink Petal Charm Necklace Set',
    slug: 'pink-petal-charm-necklace-set',
    description: `*Pink Petal Charm Necklace Set*

Add a feminine touch to your jewellery collection with this gorgeous pink floral necklace set. Its delicate pink stone detailing and matching flower earrings make it perfect for casual outings and special occasions.

*Product Details:*
• Type: Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: Pink Coloured Stones & American Diamond
• Finish: Gold Polish
• Feature: Anti-Tarnish
• Style: Floral Design`,
    price: 1299.00,
    compare_at_price: 2399.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Gold Polish • Pink Coloured Stones & American Diamond',
    craft_type: 'Floral Design',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/pinkpetalcharmnecklaceset'
  },

  'silver-arrow-glamour-necklace-set': {
    id: 'anti-ad-neck-005',
    name: 'Silver Arrow Glamour Necklace Set',
    slug: 'silver-arrow-glamour-necklace-set',
    description: `*Silver Arrow Glamour Necklace Set*

Make a statement with this eye-catching silver-tone necklace set. Featuring a beautiful repeated oval pattern with dangling arrow-style detailing, it offers a bold and stylish appearance for parties and celebrations.

*Product Details:*
• Type: Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: American Diamond
• Finish: Silver Polish
• Feature: Anti-Tarnish
• Design: Contemporary Statement Style`,
    price: 1499.00,
    compare_at_price: 4599.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Silver Polish • American Diamond',
    craft_type: 'Contemporary Statement Style',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/silverarrowglamournecklaceset'
  },

  'midnight-black-leaf-necklace-set': {
    id: 'anti-ad-neck-006',
    name: 'Midnight Black Leaf Necklace Set',
    slug: 'midnight-black-leaf-necklace-set',
    description: `*Midnight Black Leaf Necklace Set*

A sophisticated necklace set featuring sparkling American Diamond leaf patterns with elegant black stone accents. Its unique design makes it a perfect choice for parties and evening occasions.

*Product Details:*
• Type: Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: American Diamond with Black Accents
• Finish: Silver Polish
• Feature: Anti-Tarnish
• Style: Designer Party Wear`,
    price: 899.00,
    compare_at_price: 2599.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Silver Polish • American Diamond with Black Accents',
    craft_type: 'Designer Party Wear',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/midnightblackleafnecklaceset'
  },

  'emerald-leaf-cascade-necklace-set': {
    id: 'anti-ad-neck-007',
    name: 'Emerald Leaf Cascade Necklace Set',
    slug: 'emerald-leaf-cascade-necklace-set',
    description: `*Emerald Leaf Cascade Necklace Set*

Give your look a graceful makeover with this beautiful American Diamond necklace set. The delicate leaf-inspired design and sparkling finish create an elegant statement, perfect for ethnic and party wear.

*Product Details:*
• Type: Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: American Diamond
• Finish: Silver Polish
• Feature: Anti-Tarnish
• Design: Leaf Pattern`,
    price: 899.00,
    compare_at_price: 2599.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Silver Polish • American Diamond',
    craft_type: 'Leaf Pattern',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/emeraldleafcascadenecklaceset'
  },

  'emerald-teardrop-radiance-necklace-set': {
    id: 'anti-ad-neck-008',
    name: 'Emerald Teardrop Radiance Necklace Set',
    slug: 'emerald-teardrop-radiance-necklace-set',
    description: `*Emerald Teardrop Radiance Necklace Set*

Featuring rich emerald green teardrop stones arranged beautifully along a sparkling American Diamond chain, this necklace set is perfect for adding a fresh and graceful touch to your outfit.

*Product Details:*
• Type: Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: Green Stones & American Diamond
• Finish: Gold Polish
• Feature: Anti-Tarnish
• Style: Elegant Traditional Wear`,
    price: 1299.00,
    compare_at_price: 2399.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Gold Polish • Green Stones & American Diamond',
    craft_type: 'Elegant Traditional Wear',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/emeraldteardropradiancenecklac'
  },

  'royal-blue-teardrop-necklace-set': {
    id: 'anti-ad-neck-009',
    name: 'Royal Blue Teardrop Necklace Set',
    slug: 'royal-blue-teardrop-necklace-set',
    description: `*Royal Blue Teardrop Necklace Set*

Make your look stand out with this stunning royal blue necklace set. Beautiful blue teardrop stones paired with American Diamond detailing give it a classy and sophisticated appearance.

*Product Details:*
• Type: Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: Blue Stones & American Diamond
• Finish: Gold Polish
• Feature: Anti-Tarnish
• Style: Party & Festive Wear`,
    price: 1299.00,
    compare_at_price: 2399.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Gold Polish • Blue Stones & American Diamond',
    craft_type: 'Party & Festive Wear',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/royalblueteardropnecklaceset'
  },

  'blossom-vine-ad-necklace-set': {
    id: 'anti-ad-neck-010',
    name: 'Blossom Vine AD Necklace Set',
    slug: 'blossom-vine-ad-necklace-set',
    description: `*Blossom Vine AD Necklace Set*

Inspired by delicate floral vines, this beautiful American Diamond necklace set features an elegant V-shaped design with sparkling flower motifs. A perfect accessory for minimal yet stylish looks.

*Product Details:*
• Type: Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: American Diamond
• Finish: Silver Polish
• Feature: Anti-Tarnish
• Design: Floral Vine Pattern`,
    price: 999.00,
    compare_at_price: 2599.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Silver Polish • American Diamond',
    craft_type: 'Floral Vine Pattern',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/blossomvineadnecklaceset'
  },

  'ruby-diamond-royal-choker-set': {
    id: 'anti-ad-neck-011',
    name: 'Ruby Diamond Royal Choker Set',
    slug: 'ruby-diamond-royal-choker-set',
    description: `*Ruby Diamond Royal Choker Set*

A luxurious statement choker featuring intricate American Diamond work combined with beautiful ruby-red stone accents. Its elaborate design gives a rich and royal appearance, making it ideal for weddings, receptions and grand celebrations.

*Product Details:*
• Type: Heavy Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: American Diamond & Ruby Red Stones
• Finish: Silver Polish
• Feature: Anti-Tarnish
• Style: Bridal & Wedding Wear`,
    price: 1799.00,
    compare_at_price: 3999.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Silver Polish • American Diamond & Ruby Red Stones',
    craft_type: 'Bridal & Wedding Wear',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/rubydiamondroyalchokerset'
  },

  'sapphire-elegance-bridal-choker': {
    id: 'anti-ad-neck-012',
    name: 'Sapphire Elegance Bridal Choker',
    slug: 'sapphire-elegance-bridal-choker',
    description: `*Sapphire Elegance Bridal Choker*

Bring elegance to your special occasions with this gorgeous sapphire blue American Diamond choker set. Its intricate stone arrangement and luxurious detailing make it a perfect choice for weddings and festive celebrations.

*Product Details:*
• Type: Heavy Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: American Diamond & Blue Stones
• Finish: Silver Polish
• Feature: Anti-Tarnish
• Style: Bridal & Party Wear`,
    price: 1799.00,
    compare_at_price: 3999.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Silver Polish • American Diamond & Blue Stones',
    craft_type: 'Bridal & Party Wear',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/sapphireelegancebridalchoker'
  },

  'emerald-majesty-diamond-choker': {
    id: 'anti-ad-neck-013',
    name: 'Emerald Majesty Diamond Choker',
    slug: 'emerald-majesty-diamond-choker',
    description: `*Emerald Majesty Diamond Choker*

A breathtaking designer choker featuring vibrant emerald green stones surrounded by sparkling American Diamond detailing. Its rich and graceful appearance makes it a beautiful choice for weddings, receptions and traditional celebrations.

*Product Details:*
• Type: Heavy Necklace & Earrings Set
• Material: Artificial Jewellery
• Stone: American Diamond & Green Stones
• Finish: Silver Polish
• Feature: Anti-Tarnish
• Style: Premium Bridal & Festive Wear`,
    price: 1799.00,
    compare_at_price: 3999.00,
    category: 'Anti Tarnish',
    subcategory: 'American Diamonds',
    fabric: 'Silver Polish • American Diamond & Green Stones',
    craft_type: 'Premium Bridal & Festive Wear',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/emeraldmajestydiamondchoker'
  },

  // ── ANTI TARNISH -> MODERN PENDANTS ──
  'the-minimalist-silver-wave-layered-necklace': {
    id: 'anti-mp-001',
    name: 'The Minimalist Silver Wave Layered Necklace',
    slug: 'the-minimalist-silver-wave-layered-necklace',
    description: `*The Minimalist Silver Wave Layered Necklace*\n\nElevate your everyday look with this elegant three-layered chain. Featuring delicate chains interspersed with tiny textured beads, this dual-tone (silver) piece offers a sophisticated, modern silhouette. Perfect for pairing with both casual tees and formal blouses.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Silver\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Adjustable Lobster Clasp`,
    price: 249.00,
    compare_at_price: 699.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/minimalistsilverwavelayerednec'
  },

  'the-minimalist-golden-wave-layered-necklace': {
    id: 'anti-mp-002',
    name: 'The Minimalist Golden Wave Layered Necklace',
    slug: 'the-minimalist-golden-wave-layered-necklace',
    description: `*The Minimalist Golden Wave Layered Necklace*\n\nElevate your everyday look with this elegant three-layered chain. Featuring delicate chains interspersed with tiny textured beads, this dual-tone (gold) piece offers a sophisticated, modern silhouette. Perfect for pairing with both casual tees and formal blouses.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Adjustable Lobster Clasp`,
    price: 249.00,
    compare_at_price: 699.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/minimalistgoldenwavelayerednec'
  },

  'the-azure-guardian-eye-pendant': {
    id: 'anti-mp-003',
    name: 'The Azure Guardian Eye Pendant',
    slug: 'the-azure-guardian-eye-pendant',
    description: `*The Azure Guardian Eye Pendant*\n\nAdd a touch of mystique and protection to your style with this statement Evil Eye pendant. The intricate design features a striking blue center surrounded by a crystal-encrusted outline, suspended on a fine golden chain. A perfect blend of boho-chic and elegance.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Clasp`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/azureguardianeyependant'
  },

  'the-meadow-dance-butterfly-necklace': {
    id: 'anti-mp-004',
    name: 'The Meadow Dance Butterfly Necklace',
    slug: 'the-meadow-dance-butterfly-necklace',
    description: `*The Meadow Dance Butterfly Necklace*\n\nEmbrace a whimsical, fairy-core aesthetic with this charming necklace. Multiple delicate butterfly charms are evenly spaced along a fine chain, creating a floating effect. Available in both classic silver and warm gold finishes to match your mood.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Silver, Gold\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Lightweight Skin-Friendly Clasp`,
    price: 199.00,
    compare_at_price: 549.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/meadowdancebutterflynecklace'
  },

  'the-orbit-beaded-long-chain': {
    id: 'anti-mp-005',
    name: 'The Orbit Beaded Long Chain',
    slug: 'the-orbit-beaded-long-chain',
    description: `*The Orbit Beaded Long Chain*\n\nA modern take on a classic chain. This long, sweeping necklace features small golden orbs spaced elegantly along a sturdy link chain. It can be worn as a single long layer or doubled up for a textured look.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Link Clasp`,
    price: 249.00,
    compare_at_price: 699.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/orbitbeadedlongchain'
  },

  'the-signature-monogram-bar-necklace': {
    id: 'anti-mp-006',
    name: 'The Signature Monogram Bar Necklace',
    slug: 'the-signature-monogram-bar-necklace',
    description: `*The Signature Monogram Bar Necklace*\n\nKeep your loved one close to your heart with this stylish initial tag necklace. Featuring a sleek, rectangular pendant with the letters "11:11" engraved on a chic curb chain. A sophisticated piece that adds a personalized touch to any outfit.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Clasp`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/signaturemonogrambarnecklace'
  },

  'the-urban-rebel-cross-necklace': {
    id: 'anti-mp-007',
    name: 'The Urban Rebel Cross Necklace',
    slug: 'the-urban-rebel-cross-necklace',
    description: `*The Urban Rebel Cross Necklace*\n\nChannel your inner street-style icon with this bold, chunky silver chain. Featuring a textured twisted link design and a subtle cross pendant with a dark stone accent, this piece is perfect for layering or making a statement on its own.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Silver\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Heavy-Duty Clasp`,
    price: 249.00,
    compare_at_price: 699.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/urbanrebelcrossnecklace'
  },

  'the-eclipse-open-circle-pendant': {
    id: 'anti-mp-008',
    name: 'The Eclipse Open-Circle Pendant',
    slug: 'the-eclipse-open-circle-pendant',
    description: `*The Eclipse Open-Circle Pendant*\n\nA minimalist masterpiece. This long silver chain features two sleek, open black circles that dangle elegantly at the bottom. The geometric design makes it a perfect accessory for modern, contemporary wardrobes.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Silver, Black\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Clasp`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/eclipseopencirclependant'
  },

  'the-sweetheart-minimal-pendant': {
    id: 'anti-mp-009',
    name: 'The Sweetheart Minimal Pendant',
    slug: 'the-sweetheart-minimal-pendant',
    description: `*The Sweetheart Minimal Pendant*\n\nSometimes less is more. This ultra-fine golden chain holds a tiny, polished heart pendant. The perfect dainty piece for everyday wear, adding a subtle touch of romance to your neckline.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Micro-Link Clasp`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/sweetheartminimalpendant'
  },

  'the-elegant-pearl-lariat-necklace': {
    id: 'anti-mp-010',
    name: 'The Elegant Pearl Lariat Necklace',
    slug: 'the-elegant-pearl-lariat-necklace',
    description: `*The Elegant Pearl Lariat Necklace*\n\nA luxurious statement piece. This lariat-style necklace features a string of lustrous faux pearls that converge at a sparkling crystal butterfly centerpiece, finished with long, trailing golden chains. Perfect for weddings or special evenings.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold, Pearl White\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Lariat Style`,
    price: 279.00,
    compare_at_price: 799.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/elegantpearllariatnecklace'
  },

  'the-midnight-romance-y-necklace': {
    id: 'anti-mp-011',
    name: 'The Midnight Romance Y-Necklace',
    slug: 'the-midnight-romance-y-necklace',
    description: `*The Midnight Romance Y-Necklace*\n\nEdgy yet romantic. This black-tone chain features a unique Y-drop design with two hollow heart pendants. The dark aesthetic gives it a versatile, modern vibe that pairs beautifully with both deep necklines and casual wear.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Black\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Clasp`,
    price: 199.00,
    compare_at_price: 549.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/midnightromanceynecklace'
  },

  'the-starlight-ruby-choker': {
    id: 'anti-mp-012',
    name: 'The Starlight Ruby Choker',
    slug: 'the-starlight-ruby-choker',
    description: `*The Starlight Ruby Choker*\n\nCapture the Y2K aesthetic with this bold silver chain. It features a striking centerpiece: a vibrant red rectangular stone flanked by metallic accents, with a tiny silver star dangling below. Fun, trendy, and guaranteed to turn heads.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Silver, Red\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Clasp`,
    price: 229.00,
    compare_at_price: 649.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/starlightrubychoker'
  },

  'the-toggle-heart-drop-chain': {
    id: 'anti-mp-013',
    name: 'The Toggle Heart Drop Chain',
    slug: 'the-toggle-heart-drop-chain',
    description: `*The Toggle Heart Drop Chain*\n\nA beautiful blend of hardware and romance. This necklace features a classic golden chain with a toggle clasp design at the front, from which a solid polished heart gently hangs.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Toggle Front Closure`,
    price: 229.00,
    compare_at_price: 649.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/toggleheartdropchain'
  },

  'the-noir-clover-deluxe-set': {
    id: 'anti-mp-014',
    name: 'The Noir Clover Deluxe Set',
    slug: 'the-noir-clover-deluxe-set',
    description: `*The Noir Clover Deluxe Set*\n\nGet the complete look with this stunning matching set. Featuring black four-leaf clover motifs spaced along a delicate gold chain, this set includes a necklace, a matching bracelet, and a pair of stud earrings. A classic design with a dark, elegant twist.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold, Black\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Clasp`,
    price: 399.00,
    compare_at_price: 999.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/noircloverdeluxeset'
  },

  'the-crystal-tear-drop-pendant': {
    id: 'anti-mp-015',
    name: 'The Crystal Tear Drop Pendant',
    slug: 'the-crystal-tear-drop-pendant',
    description: `*The Crystal Tear Drop Pendant*\n\nEffortless glamour. This delicate gold chain features a brilliant, pear-shaped crystal drop pendant. It catches the light beautifully, making it an ideal accessory for date nights or adding a sparkle to your workwear.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold, Clear\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Link Chain Clasp`,
    price: 179.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/crystalteardroppendant'
  },

  'the-onyx-heart-station-chain': {
    id: 'anti-mp-016',
    name: 'The Onyx Heart Station Chain',
    slug: 'the-onyx-heart-station-chain',
    description: `*The Onyx Heart Station Chain*\n\nA playful yet sophisticated piece. Small, black heart-shaped charms are stationed along a fine golden chain, creating a fun floating effect. The dark hearts add a pop of contrast to the warm gold.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold, Black\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Lightweight Clasp`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/onyxheartstationchain'
  },

  'the-heritage-bloom-pendant': {
    id: 'anti-mp-017',
    name: 'The Heritage Bloom Pendant',
    slug: 'the-heritage-bloom-pendant',
    description: `*The Heritage Bloom Pendant*\n\nChannel vintage charm with this oval locket-style pendant. The textured gold surface features an embossed floral motif, suspended on a smooth snake chain. An elegant, timeless piece that adds a touch of old-world class to your style.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Smooth Snake Chain Clasp`,
    price: 179.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/heritagebloompendant'
  },

  'the-blush-heart-chain': {
    id: 'anti-mp-018',
    name: 'The Blush Heart Chain',
    slug: 'the-blush-heart-chain',
    description: `*The Blush Heart Chain*\n\nSoft, feminine, and sweet. This gold chain features multiple light pink heart-shaped charms spaced evenly around the neckline. The perfect accessory for a soft-girl aesthetic or a cute, casual daytime look.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold, Pastel Pink\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Adjustable Clasp`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/blushheartchain'
  },

  'the-doves-flight-silver-pendant': {
    id: 'anti-mp-019',
    name: "The Dove's Flight Silver Pendant",
    slug: 'the-doves-flight-silver-pendant',
    description: `*The Dove's Flight Silver Pendant*\n\nNature-inspired elegance. This silver-toned necklace features a beautifully detailed flying bird pendant adorned with sparkling crystals. The graceful design makes it a unique and eye-catching addition to your jewellery box.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Silver\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Clasp`,
    price: 199.00,
    compare_at_price: 549.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/doveflightsilverpendant'
  },

  'the-duo-tone-amour-set': {
    id: 'anti-mp-020',
    name: 'The Duo-Tone Amour Set',
    slug: 'the-duo-tone-amour-set',
    description: `*The Duo-Tone Amour Set*\n\nA classic symbol of love. This matching set features an interlocking double-heart pendant (one gold, one silver encrusted with crystals) and a pair of matching heart earrings. A perfect gift for someone special.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold, Silver\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Clasp`,
    price: 299.00,
    compare_at_price: 799.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/duotonearmourset'
  },

  'the-blossoming-heart-ensemble': {
    id: 'anti-mp-021',
    name: 'The Blossoming Heart Ensemble',
    slug: 'the-blossoming-heart-ensemble',
    description: `*The Blossoming Heart Ensemble*\n\nAn ornate and luxurious set. The necklace features a heart-shaped frame detailed with a floral cluster inside and a teardrop crystal dangle. The matching earrings complete this glamorous, highly detailed look.\n\n*Product Details:*\n• Material: Artificial Jewellery\n• Colour: Gold\n• Style: Modern Pendant Necklace\n• Closure/Clasp: Secure Clasp`,
    price: 299.00,
    compare_at_price: 799.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Pendants',
    fabric: 'Anti-Tarnish Artificial Jewellery',
    craft_type: 'Modern Pendant Necklace',
    images: [],
    sizes: ['Free Size'],
    razorpay_url: 'https://rzp.io/rzp/blossomingheartensemble'
  },



  // ── ANTI TARNISH -> MODERN EARRINGS ──
  'celeste-pearl-cascade-earrings': {
    id: 'anti-me-001',
    name: 'Celeste Pearl Cascade Earrings',
    slug: 'celeste-pearl-cascade-earrings',
    description: `*Celeste Pearl Cascade Earrings*\n\nAdd a touch of timeless elegance to your look with these beautiful Celeste Pearl Cascade Earrings. Featuring lustrous pearl accents paired with sparkling crystal embellishments, these statement drop earrings create a graceful and sophisticated appearance. Perfect for parties, festive gatherings and special occasions.\n\n*Product Details:*\n• Type: Drop Earrings\n• Design: Pearl and Crystal Embellished\n• Colour: Silver & Pearl White\n• Style: Elegant & Statement\n• Occasion: Party, Festive & Casual Wear`,
    price: 219.00,
    compare_at_price: 599.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Silver & Pearl White Finish',
    craft_type: 'Pearl and Crystal Embellished',
    images: [],
    sizes: ['Free Size'],
  },

  'crystal-square-radiance-studs': {
    id: 'anti-me-002',
    name: 'Crystal Square Radiance Studs',
    slug: 'crystal-square-radiance-studs',
    description: `*Crystal Square Radiance Studs*\n\nGive your everyday style a glamorous upgrade with these Crystal Square Radiance Studs. Designed with sparkling square-cut stones and beautifully textured stud tops, these earrings offer a perfect balance of simplicity and sophistication. An ideal accessory for both everyday styling and special occasions.\n\n*Product Details:*\n• Type: Stud Earrings\n• Design: Square Crystal Embellishment\n• Colour: Silver & Clear\n• Style: Minimal & Classy\n• Occasion: Daily Wear, Office & Party`,
    price: 199.00,
    compare_at_price: 549.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Silver & Clear Finish',
    craft_type: 'Square Crystal Embellishment',
    images: [],
    sizes: ['Free Size'],
  },

  'starlight-rhinestone-fringe-earrings': {
    id: 'anti-me-003',
    name: 'Starlight Rhinestone Fringe Earrings',
    slug: 'starlight-rhinestone-fringe-earrings',
    description: `*Starlight Rhinestone Fringe Earrings*\n\nMake a stunning statement with these Starlight Rhinestone Fringe Earrings. Featuring multiple cascading strands adorned with brilliant sparkling stones, these earrings create a beautiful chandelier-inspired look. Their glamorous design makes them a perfect choice for parties, celebrations and evening occasions.\n\n*Product Details:*\n• Type: Long Dangle Earrings\n• Design: Multi-Strand Rhinestone Fringe\n• Colour: Silver\n• Style: Glamorous & Statement\n• Occasion: Party, Wedding & Evening Wear`,
    price: 299.00,
    compare_at_price: 799.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Silver Finish',
    craft_type: 'Multi-Strand Rhinestone Fringe',
    images: [],
    sizes: ['Free Size'],
  },

  'heartbeat-crystal-loop-earrings': {
    id: 'anti-me-004',
    name: 'Heartbeat Crystal Loop Earrings',
    slug: 'heartbeat-crystal-loop-earrings',
    description: `*Heartbeat Crystal Loop Earrings*\n\nExpress your style with these charming Heartbeat Crystal Loop Earrings. Featuring a beautiful intertwined heart-inspired design embellished with sparkling stones, these earrings add a romantic and fashionable touch to your appearance. Perfect for creating an elegant look for outings, parties and special moments.\n\n*Product Details:*\n• Type: Statement Earrings\n• Design: Double Heart-Inspired Loop\n• Colour: Silver\n• Style: Chic & Trendy\n• Occasion: Casual, Party & Date Wear`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Silver Finish',
    craft_type: 'Double Heart-Inspired Loop',
    images: [],
    sizes: ['Free Size'],
  },

  'emerald-aura-teardrop-earrings': {
    id: 'anti-me-005',
    name: 'Emerald Aura Teardrop Earrings',
    slug: 'emerald-aura-teardrop-earrings',
    description: `*Emerald Aura Teardrop Earrings*\n\nBring elegance and sophistication to your jewellery collection with these Emerald Aura Teardrop Earrings. Featuring beautiful green teardrop-shaped stones surrounded by delicate sparkling accents and a golden-tone finish, these earrings create a graceful and luxurious appearance. A lovely choice for festive celebrations and elegant gatherings.\n\n*Product Details:*\n• Type: Drop Earrings\n• Design: Teardrop Stone with Crystal Detailing\n• Colour: Gold & Emerald Green\n• Style: Elegant & Traditional\n• Occasion: Festive, Party & Special Occasions`,
    price: 219.00,
    compare_at_price: 599.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Gold & Emerald Green Finish',
    craft_type: 'Teardrop Stone with Crystal Detailing',
    images: [],
    sizes: ['Free Size'],
  },

  'golden-pearl-halo-earrings': {
    id: 'anti-me-006',
    name: 'Golden Pearl Halo Earrings',
    slug: 'golden-pearl-halo-earrings',
    description: `*Golden Pearl Halo Earrings*\n\nDiscover effortless elegance with these Golden Pearl Halo Earrings. Designed with a beautiful pearl centerpiece surrounded by sparkling crystal detailing and a golden-tone frame, these earrings offer a sophisticated and graceful finish. Perfect for enhancing both traditional and western outfits.\n\n*Product Details:*\n• Type: Stud Earrings\n• Design: Pearl Centre with Crystal Halo\n• Colour: Gold & Pearl White\n• Style: Elegant & Sophisticated\n• Occasion: Party, Festive & Casual Wear`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Gold & Pearl White Finish',
    craft_type: 'Pearl Centre with Crystal Halo',
    images: [],
    sizes: ['Free Size'],
  },

  'blush-blossom-crystal-hoop-earrings': {
    id: 'anti-me-007',
    name: 'Blush Blossom Crystal Hoop Earrings',
    slug: 'blush-blossom-crystal-hoop-earrings',
    description: `*Blush Blossom Crystal Hoop Earrings*\n\nAdd a delicate floral charm to your jewellery collection with these Blush Blossom Crystal Hoop Earrings. Featuring beautiful pink flower detailing with a pearl-inspired centre and a sparkling crystal-studded circular design, these earrings bring a feminine and graceful touch to your overall look. Perfect for brunches, celebrations and special occasions.\n\n*Product Details:*\n• Type: Floral Hoop Earrings\n• Design: Flower, Pearl & Crystal Embellishment\n• Colour: Gold, Blush Pink & White\n• Style: Feminine & Elegant\n• Occasion: Party, Festive & Casual Wear`,
    price: 199.00,
    compare_at_price: 549.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Gold, Blush Pink & White Finish',
    craft_type: 'Flower, Pearl & Crystal Embellishment',
    images: [],
    sizes: ['Free Size'],
  },

  'golden-butterfly-dreams-gold-plated-earrings': {
    id: 'anti-me-008',
    name: 'Golden Butterfly Dreams Gold Plated Earrings',
    slug: 'golden-butterfly-dreams-gold-plated-earrings',
    description: `*Golden Butterfly Dreams Gold Plated Earrings*\n\nLet your style shine with these adorable Golden Butterfly Dreams Earrings. Featuring a delicate butterfly design with elegant white enamel detailing and textured golden-tone wings, these earrings add a playful yet sophisticated charm to your appearance. A perfect accessory for those who love unique and graceful jewellery.\n\n*Product Details:*\n• Type: Stud Earrings\n• Design: Butterfly with Enamel Detailing\n• Colour: Golden & Ivory White\n• Style: Cute & Trendy\n• Occasion: Casual, Party & Everyday Wear`,
    price: 199.00,
    compare_at_price: 549.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Golden & Ivory White Finish',
    craft_type: 'Butterfly with Enamel Detailing',
    images: [],
    sizes: ['Free Size'],
  },

  'turquoise-charm-crystal-drops': {
    id: 'anti-me-009',
    name: 'Turquoise Charm Crystal Drops',
    slug: 'turquoise-charm-crystal-drops',
    description: `*Turquoise Charm Crystal Drops*\n\nAdd a pop of colour to your jewellery collection with these Turquoise Charm Crystal Drops. Featuring beautiful turquoise accents, delicate pearl detailing and sparkling crystal embellishments in a golden-tone design, these earrings create a unique and eye-catching appearance. Perfect for adding a stylish touch to your everyday and festive outfits.\n\n*Product Details:*\n• Type: Drop Earrings\n• Design: Turquoise Accent with Pearl & Crystal Detailing\n• Colour: Gold, Turquoise & White\n• Style: Modern & Fashionable\n• Occasion: Casual, Party & Festive Wear`,
    price: 199.00,
    compare_at_price: 549.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Gold, Turquoise & White Finish',
    craft_type: 'Turquoise Accent with Pearl & Crystal Detailing',
    images: [],
    sizes: ['Free Size'],
  },

  'pearl-bow-elegance-hoop-earrings': {
    id: 'anti-me-010',
    name: 'Pearl Bow Elegance Hoop Earrings',
    slug: 'pearl-bow-elegance-hoop-earrings',
    description: `*Pearl Bow Elegance Hoop Earrings*\n\nBring a touch of sophistication to your look with these Pearl Bow Elegance Hoop Earrings. Beautifully designed with delicate bow accents, lustrous pearl details and sparkling crystal embellishments, these earrings offer a charming blend of elegance and contemporary fashion. Perfect for everyday styling, outings and special occasions.\n\n*Product Details:*\n• Type: Hoop Earrings\n• Design: Bow, Pearl & Crystal Embellishment\n• Colour: Gold, Pearl White & Clear\n• Style: Delicate & Classy\n• Occasion: Daily Wear, Party & Casual Outings`,
    price: 149.00,
    compare_at_price: 399.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Gold, Pearl White & Clear Finish',
    craft_type: 'Bow, Pearl & Crystal Embellishment',
    images: [],
    sizes: ['Free Size'],
  },

  'blush-blossom-pearl-earrings': {
    id: 'anti-me-011',
    name: 'Blush Blossom Pearl Earrings',
    slug: 'blush-blossom-pearl-earrings',
    description: `*Blush Blossom Pearl Earrings*\n\nAdd a soft floral charm to your look with these beautiful blush pink flower earrings. Featuring delicate pearl detailing, golden edges and green leaf accents, they bring a fresh and elegant touch to your style.\n\n*Product Details:*\n• Design: Floral\n• Colour: Pink, Green & Gold\n• Style: Elegant & Feminine\n• Occasion: Casual, Party & Festive Wear`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Pink, Green & Gold Finish',
    craft_type: 'Floral',
    images: [],
    sizes: ['Free Size'],
  },

  'golden-pearl-loop-studs': {
    id: 'anti-me-012',
    name: 'Golden Pearl Loop Studs',
    slug: 'golden-pearl-loop-studs',
    description: `*Golden Pearl Loop Studs*\n\nGive your everyday style a classy upgrade with these golden loop earrings. Designed with beautiful pearl accents and a modern double-loop structure, they offer a perfect blend of simplicity and elegance.\n\n*Product Details:*\n• Design: Double Loop with Pearl\n• Colour: Gold & Pearl White\n• Style: Minimal & Modern\n• Occasion: Daily Wear & Casual Outings`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Gold & Pearl White Finish',
    craft_type: 'Double Loop with Pearl',
    images: [],
    sizes: ['Free Size'],
  },

  'crystal-cascade-drop-earrings': {
    id: 'anti-me-013',
    name: 'Crystal Cascade Drop Earrings',
    slug: 'crystal-cascade-drop-earrings',
    description: `*Crystal Cascade Drop Earrings*\n\nMake a stunning impression with these sparkling crystal cascade earrings. Featuring an elegant combination of marquise-cut stones and shimmering crystal details, their graceful drop design adds glamour to every outfit.\n\n*Product Details:*\n• Design: Crystal Cascade\n• Colour: Silver & Clear\n• Style: Glamorous & Statement\n• Occasion: Parties, Weddings & Special Events`,
    price: 249.00,
    compare_at_price: 699.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Silver & Clear Finish',
    craft_type: 'Crystal Cascade',
    images: [],
    sizes: ['Free Size'],
  },

  'ivory-petal-bloom-earrings': {
    id: 'anti-me-014',
    name: 'Ivory Petal Bloom Earrings',
    slug: 'ivory-petal-bloom-earrings',
    description: `*Ivory Petal Bloom Earrings*\n\nInspired by the beauty of blooming flowers, these ivory petal earrings bring effortless elegance to your jewellery collection. Their soft white petals and golden detailing create a timeless and graceful look.\n\n*Product Details:*\n• Design: Four-Petal Flower\n• Colour: Ivory White & Gold\n• Style: Elegant & Sophisticated\n• Occasion: Casual, Brunch & Festive Wear`,
    price: 199.00,
    compare_at_price: 549.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Ivory White & Gold Finish',
    craft_type: 'Four-Petal Flower',
    images: [],
    sizes: ['Free Size'],
  },

  'ruby-maroon-petal-studs': {
    id: 'anti-me-015',
    name: 'Ruby Maroon Petal Studs',
    slug: 'ruby-maroon-petal-studs',
    description: `*Ruby Maroon Petal Studs*\n\nBring a bold and beautiful touch to your look with these ruby maroon floral earrings. Designed with rich maroon petals, golden borders and delicate centre detailing, they make a perfect accessory for adding colour to your outfit.\n\n*Product Details:*\n• Design: Floral Studs\n• Colour: Maroon & Gold\n• Style: Bold & Chic\n• Occasion: Parties, Festive & Ethnic Wear`,
    price: 199.00,
    compare_at_price: 549.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Maroon & Gold Finish',
    craft_type: 'Floral Studs',
    images: [],
    sizes: ['Free Size'],
  },

  'crystal-butterfly-gleam-studs': {
    id: 'anti-me-016',
    name: 'Crystal Butterfly Gleam Studs',
    slug: 'crystal-butterfly-gleam-studs',
    description: `*Crystal Butterfly Gleam Studs*\n\nAdd a little sparkle to your everyday look with these charming butterfly earrings. Featuring a delicate butterfly silhouette embellished with shimmering crystal stones, they create a cute yet sophisticated statement.\n\n*Product Details:*\n• Design: Butterfly\n• Colour: Silver & Clear\n• Style: Cute & Elegant\n• Occasion: Daily Wear & Casual Outings`,
    price: 189.00,
    compare_at_price: 499.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Silver & Clear Finish',
    craft_type: 'Butterfly',
    images: [],
    sizes: ['Free Size'],
  },

  'crimson-arc-statement-earrings': {
    id: 'anti-me-017',
    name: 'Crimson Arc Statement Earrings',
    slug: 'crimson-arc-statement-earrings',
    description: `*Crimson Arc Statement Earrings*\n\nMake your style stand out with these unique crimson arc earrings. Featuring a bold red curved design paired with sparkling golden crystal detailing, they add a modern and fashionable touch to your appearance.\n\n*Product Details:*\n• Design: Curved Arc\n• Colour: Crimson Red & Gold\n• Style: Contemporary & Bold\n• Occasion: Parties & Western Wear`,
    price: 199.00,
    compare_at_price: 549.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Crimson Red & Gold Finish',
    craft_type: 'Curved Arc',
    images: [],
    sizes: ['Free Size'],
  },

  'royal-pearl-crystal-hoops': {
    id: 'anti-me-018',
    name: 'Royal Pearl Crystal Hoops',
    slug: 'royal-pearl-crystal-hoops',
    description: `*Royal Pearl Crystal Hoops*\n\nDiscover timeless elegance with these beautiful pearl and crystal hoops. Designed with lustrous pearl accents and sparkling stone detailing, these earrings add a refined and luxurious touch to your everyday and party looks.\n\n*Product Details:*\n• Design: Pearl & Crystal Hoops\n• Colour: Gold, White & Clear\n• Style: Classic & Luxurious\n• Occasion: Casual, Party & Special Occasions`,
    price: 149.00,
    compare_at_price: 399.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Gold, White & Clear Finish',
    craft_type: 'Pearl & Crystal Hoops',
    images: [],
    sizes: ['Free Size'],
  },

  'pearl-bow-sparkle-studs': {
    id: 'anti-me-019',
    name: 'Pearl Bow Sparkle Studs',
    slug: 'pearl-bow-sparkle-studs',
    description: `*Pearl Bow Sparkle Studs*\n\nAdd a graceful finishing touch to your look with these charming pearl bow earrings. Featuring a beautiful pearl drop paired with sparkling bow-inspired detailing, they bring a delicate and feminine charm to any outfit.\n\n*Product Details:*\n• Design: Bow with Pearl Drop\n• Colour: Gold, White & Clear\n• Style: Delicate & Feminine\n• Occasion: Casual, Party & Festive Wear`,
    price: 169.00,
    compare_at_price: 449.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Gold, White & Clear Finish',
    craft_type: 'Bow with Pearl Drop',
    images: [],
    sizes: ['Free Size'],
  },

  'midnight-triple-heart-drops': {
    id: 'anti-me-020',
    name: 'Midnight Triple Heart Drops',
    slug: 'midnight-triple-heart-drops',
    description: `*Midnight Triple Heart Drops*\n\nExpress your bold side with these eye-catching triple heart earrings. Featuring three glossy black hearts outlined with golden detailing, their playful drop design adds a chic and stylish touch to your jewellery collection.\n\n*Product Details:*\n• Design: Triple Heart Drop\n• Colour: Black & Gold\n• Style: Bold & Trendy\n• Occasion: Parties, Casual & Western Wear`,
    price: 249.00,
    compare_at_price: 699.00,
    category: 'Anti Tarnish',
    subcategory: 'Modern Earrings',
    fabric: 'Black & Gold Finish',
    craft_type: 'Triple Heart Drop',
    images: [],
    sizes: ['Free Size'],
  },

  'mystery-jar': {
    id: 'deal-mystery-jar-001',
    name: 'Mystery Jar',
    slug: 'mystery-jar',
    description: `*Mystery Jar — Gift for Her Edition*

Unveil the magic with our exclusive Mystery Jar! Packed with high-value jewellery surprises, each jar is thoughtfully curated to bring you a handpicked collection of exquisite necklaces, statement earrings, sparkling charms, and delicate accessories.

*What's Inside Your Mystery Jar:*
• Guaranteed 3 to 5 surprise jewellery pieces inside every jar
• Handpicked assortment of Anti-Tarnish, American Diamond, and 925 Pure Silver finish pieces
• Beautifully presented in a reusable luxury vintage glass jar wrapped with charms
• Exceptional retail value worth up to ₹1,499+
• The ultimate romantic, birthday, or festive surprise gift for her

*Pricing Details:*
• Special Hot Deal Price: ₹499 only (Flat 65% OFF)
• Regular Value: ₹1,499.00
• Shipping: Free Express Shipping across India

*Quality & Durability Guarantee:*
• Skin-safe, hypoallergenic materials
• Durable anti-tarnish protective coating
• Safe tamper-evident packaging`,
    price: 499.00,
    compare_at_price: 1499.00,
    category: 'Hot Deals',
    subcategory: 'Gift For Her',
    fabric: 'Curated Anti-Tarnish & Silver-Finish Jewellery',
    craft_type: 'Curated Mystery Gift Jar',
    images: [
      '/images/mystery_jar/mystery_jar_square.jpg',
      '/images/mystery_jar/mystery_jar_main.jpg',
      '/images/mystery_jar/mystery_jar_banner.jpg',
    ],
    sizes: ['Standard Mystery Jar'],
    razorpay_url: 'https://rzp.io/rzp/mysteryjar',
  },

};

export function getCatalogProduct(slug: string): CatalogProduct | undefined {
  return PRODUCTS_CATALOG[slug];
}

export const NECKLACE_PRODUCTS: CatalogProduct[] = [
  PRODUCTS_CATALOG['925-celestial-moon-star-necklace'],
  PRODUCTS_CATALOG['925-celestial-charm-necklace'],
  PRODUCTS_CATALOG['925-butterfly-bliss-necklace'],
  PRODUCTS_CATALOG['925-tiny-love-heart-necklace'],
  PRODUCTS_CATALOG['925-silver-beaded-elegance-necklace'],
  PRODUCTS_CATALOG['925-triple-silver-bead-necklace'],
  PRODUCTS_CATALOG['925-silver-bead-cascade-necklace'],
  PRODUCTS_CATALOG['925-sterling-silver-triple-heart-love-necklace'],
  PRODUCTS_CATALOG['925-sterling-silver-blue-evil-eye-necklace'],
  PRODUCTS_CATALOG['925-midnight-beads-necklace'],
];

export const ANKLET_PRODUCTS: CatalogProduct[] = [
  PRODUCTS_CATALOG['925-evil-eye-black-beaded-anklet'],
  PRODUCTS_CATALOG['925-minimal-blue-evil-eye-anklet'],
  PRODUCTS_CATALOG['925-double-evil-eye-silver-anklet'],
  PRODUCTS_CATALOG['925-double-layer-black-beaded-anklet'],
  PRODUCTS_CATALOG['925-double-chain-silver-bead-anklet'],
  PRODUCTS_CATALOG['925-traditional-silver-ghungroo-anklet'],
  PRODUCTS_CATALOG['925-minimalist-silver-beaded-anklet'],
  PRODUCTS_CATALOG['925-three-charm-silver-anklet'],
  PRODUCTS_CATALOG['925-crystal-drop-silver-anklet'],
  PRODUCTS_CATALOG['925-black-beaded-sterling-silver-anklet'],
  PRODUCTS_CATALOG['925-celestial-star-charm-anklet'],
  PRODUCTS_CATALOG['925-triple-layer-silver-beaded-anklet'],
];

export const BRACELET_PRODUCTS: CatalogProduct[] = [
  PRODUCTS_CATALOG['925-sterling-silver-star-bracelet'],
  PRODUCTS_CATALOG['925-sterling-silver-purple-stone-bracelet'],
  PRODUCTS_CATALOG['925-sterling-silver-butterfly-bracelet'],
  PRODUCTS_CATALOG['925-sterling-silver-toggle-bracelet'],
  PRODUCTS_CATALOG['925-sterling-silver-turquoise-clover-bracelet'],
  PRODUCTS_CATALOG['925-sterling-silver-heart-charm-bracelet'],
];

export const PENDANT_PRODUCTS: CatalogProduct[] = [
  PRODUCTS_CATALOG['925-sterling-silver-celestial-solitaire-pendant'],
];

export const OXIDIZED_EARRINGS_PRODUCTS: CatalogProduct[] = [
  PRODUCTS_CATALOG['royal-blue-leaf-drop-oxidised-jhumki'],
  PRODUCTS_CATALOG['vintage-floral-peacock-oxidised-dangle-earrings'],
  PRODUCTS_CATALOG['mirror-center-oxidised-chandbali-jhumki'],
  PRODUCTS_CATALOG['antique-gold-textured-dome-jhumki'],
  PRODUCTS_CATALOG['crystal-studded-spiral-oxidised-earrings'],
  PRODUCTS_CATALOG['minimalist-round-mirror-oxidised-drops'],
  PRODUCTS_CATALOG['pink-petal-teardrop-oxidised-earrings'],
  PRODUCTS_CATALOG['classic-silver-hoop-with-ghungroo-drops'],
  PRODUCTS_CATALOG['midnight-blue-teardrop-oxidised-earrings'],
  PRODUCTS_CATALOG['floral-motif-pearl-cluster-oxidised-drops'],
  PRODUCTS_CATALOG['bohemian-silver-chandbali-hoops'],
  PRODUCTS_CATALOG['monochrome-mirror-statement-oxidised-earrings'],
  PRODUCTS_CATALOG['majestic-peacock-oxidised-jhumki'],
  PRODUCTS_CATALOG['sunburst-mosaic-oxidised-danglers'],
  PRODUCTS_CATALOG['black-stone-leaf-hoop-oxidised-earrings'],
  PRODUCTS_CATALOG['intricate-dome-classic-oxidised-jhumki'],
  PRODUCTS_CATALOG['turquoise-elephant-motif-oxidised-earrings'],
];

export const AMERICAN_DIAMONDS_PRODUCTS: CatalogProduct[] = [
  PRODUCTS_CATALOG['royal-spiral-ad-necklace-set'],
  PRODUCTS_CATALOG['elegant-floral-sparkle-necklace-set'],
  PRODUCTS_CATALOG['ruby-emerald-teardrop-necklace-set'],
  PRODUCTS_CATALOG['pink-petal-charm-necklace-set'],
  PRODUCTS_CATALOG['silver-arrow-glamour-necklace-set'],
  PRODUCTS_CATALOG['midnight-black-leaf-necklace-set'],
  PRODUCTS_CATALOG['emerald-leaf-cascade-necklace-set'],
  PRODUCTS_CATALOG['emerald-teardrop-radiance-necklace-set'],
  PRODUCTS_CATALOG['royal-blue-teardrop-necklace-set'],
  PRODUCTS_CATALOG['blossom-vine-ad-necklace-set'],
  PRODUCTS_CATALOG['ruby-diamond-royal-choker-set'],
  PRODUCTS_CATALOG['sapphire-elegance-bridal-choker'],
  PRODUCTS_CATALOG['emerald-majesty-diamond-choker'],
];

export const MODERN_PENDANTS_PRODUCTS: CatalogProduct[] = [
  PRODUCTS_CATALOG['the-minimalist-silver-wave-layered-necklace'],
  PRODUCTS_CATALOG['the-minimalist-golden-wave-layered-necklace'],
  PRODUCTS_CATALOG['the-azure-guardian-eye-pendant'],
  PRODUCTS_CATALOG['the-meadow-dance-butterfly-necklace'],
  PRODUCTS_CATALOG['the-orbit-beaded-long-chain'],
  PRODUCTS_CATALOG['the-signature-monogram-bar-necklace'],
  PRODUCTS_CATALOG['the-urban-rebel-cross-necklace'],
  PRODUCTS_CATALOG['the-eclipse-open-circle-pendant'],
  PRODUCTS_CATALOG['the-sweetheart-minimal-pendant'],
  PRODUCTS_CATALOG['the-elegant-pearl-lariat-necklace'],
  PRODUCTS_CATALOG['the-midnight-romance-y-necklace'],
  PRODUCTS_CATALOG['the-starlight-ruby-choker'],
  PRODUCTS_CATALOG['the-toggle-heart-drop-chain'],
  PRODUCTS_CATALOG['the-noir-clover-deluxe-set'],
  PRODUCTS_CATALOG['the-crystal-tear-drop-pendant'],
  PRODUCTS_CATALOG['the-onyx-heart-station-chain'],
  PRODUCTS_CATALOG['the-heritage-bloom-pendant'],
  PRODUCTS_CATALOG['the-blush-heart-chain'],
  PRODUCTS_CATALOG['the-doves-flight-silver-pendant'],
  PRODUCTS_CATALOG['the-duo-tone-amour-set'],
  PRODUCTS_CATALOG['the-blossoming-heart-ensemble'],
];

export const MODERN_EARRINGS_PRODUCTS: CatalogProduct[] = [
  PRODUCTS_CATALOG['celeste-pearl-cascade-earrings'],
  PRODUCTS_CATALOG['crystal-square-radiance-studs'],
  PRODUCTS_CATALOG['starlight-rhinestone-fringe-earrings'],
  PRODUCTS_CATALOG['heartbeat-crystal-loop-earrings'],
  PRODUCTS_CATALOG['emerald-aura-teardrop-earrings'],
  PRODUCTS_CATALOG['golden-pearl-halo-earrings'],
  PRODUCTS_CATALOG['blush-blossom-crystal-hoop-earrings'],
  PRODUCTS_CATALOG['golden-butterfly-dreams-gold-plated-earrings'],
  PRODUCTS_CATALOG['turquoise-charm-crystal-drops'],
  PRODUCTS_CATALOG['pearl-bow-elegance-hoop-earrings'],
  PRODUCTS_CATALOG['blush-blossom-pearl-earrings'],
  PRODUCTS_CATALOG['golden-pearl-loop-studs'],
  PRODUCTS_CATALOG['crystal-cascade-drop-earrings'],
  PRODUCTS_CATALOG['ivory-petal-bloom-earrings'],
  PRODUCTS_CATALOG['ruby-maroon-petal-studs'],
  PRODUCTS_CATALOG['crystal-butterfly-gleam-studs'],
  PRODUCTS_CATALOG['crimson-arc-statement-earrings'],
  PRODUCTS_CATALOG['royal-pearl-crystal-hoops'],
  PRODUCTS_CATALOG['pearl-bow-sparkle-studs'],
  PRODUCTS_CATALOG['midnight-triple-heart-drops'],
];
