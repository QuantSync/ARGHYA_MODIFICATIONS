import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ColorOption {
  name: string;
  colorName: string;
  colorHex: string;
  images: string[];
  sizes?: string[];
  slug?: string;
  description?: string;
  craft_type?: string;
}

export interface Product {
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
  is_featured?: boolean;
  variants?: Variant[];
  colorOptions?: ColorOption[];
  razorpay_url?: string;
}

export interface Variant {
  id: string;
  product_id: string;
  size: string;
  color: string;
  sku: string;
  quantity_avail: number;
  price_override?: number;
}
