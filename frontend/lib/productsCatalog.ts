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
