import { create } from 'zustand';
import { Product, Variant } from '../lib/api';

export interface CartItem {
  product: Product;
  variant?: Variant;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variant?: Variant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setOpen: (isOpen: boolean) => void;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product, variant, quantity = 1) => {
    // Shopping cart strictly only has capacity to store ONE single product
    set({
      items: [{ product, variant, quantity: Math.max(1, quantity) }],
      isOpen: true,
    });
  },

  removeItem: (productId, variantId) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.product.id === productId && item.variant?.id === variantId)
      ),
    }));
  },

  updateQuantity: (productId, quantity, variantId) => {
    set((state) => ({
      items: state.items
        .map((item) => {
          if (item.product.id === productId && item.variant?.id === variantId) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        })
        .slice(0, 1),
    }));
  },

  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (isOpen) => set({ isOpen }),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      const itemPrice = item.variant?.price_override || item.product.price;
      return total + itemPrice * item.quantity;
    }, 0);
  },
}));
