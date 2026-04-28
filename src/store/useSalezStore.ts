import { create } from "zustand";
import type { Order } from "../types/order";
import type { UserLocation } from "../types/location";
import type { Product } from "../types/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

type SalezStore = {
  selectedProductId: string | null;
  quantity: number;
  orders: Order[];
  userLocation: UserLocation | null;
  cartItems: CartItem[];

  setSelectedProductId: (id: string) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  resetQuantity: () => void;
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  setUserLocation: (location: UserLocation) => void;

  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  increaseCartItem: (productId: string) => void;
  decreaseCartItem: (productId: string) => void;
  clearCart: () => void;
};

export const useSalezStore = create<SalezStore>((set) => ({
  selectedProductId: null,
  quantity: 1,
  orders: [],
  userLocation: null,
  cartItems: [],

  setSelectedProductId: (id) => set({ selectedProductId: id }),

  increaseQuantity: () =>
    set((state) => ({
      quantity: state.quantity + 1,
    })),

  decreaseQuantity: () =>
    set((state) => ({
      quantity: Math.max(1, state.quantity - 1),
    })),

  resetQuantity: () => set({ quantity: 1 }),

  createOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
    })),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    })),

  setUserLocation: (location) => set({ userLocation: location }),

  addToCart: (product, quantity = 1) =>
    set((state) => {
      const exists = state.cartItems.find(
        (item) => item.product.id === product.id,
      );

      if (exists) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + quantity, product.stock),
                }
              : item,
          ),
        };
      }

      return {
        cartItems: [
          ...state.cartItems,
          {
            product,
            quantity: Math.min(quantity, product.stock),
          },
        ],
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.product.id !== productId,
      ),
    })),

  increaseCartItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.product.stock),
            }
          : item,
      ),
    })),

  decreaseCartItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () => set({ cartItems: [] }),
}));
