import { create } from "zustand";
import type { Product } from "../types/product";

const SALEZ_STORE_ID_KEY = "salez_store_id";

type MerchantStore = {
  selectedStoreId: string | null;
  createdProducts: Product[];
  completedOrderNumbers: string[];

  setSelectedStoreId: (storeId: string) => void;
  createProduct: (product: Product) => void;
  deleteCreatedProduct: (productId: string) => void;
  markPickupComplete: (orderNumber: string) => void;
  isPickupCompleted: (orderNumber: string) => boolean;
};

export const useMerchantStore = create<MerchantStore>((set, get) => ({
  selectedStoreId: localStorage.getItem(SALEZ_STORE_ID_KEY),
  createdProducts: [],
  completedOrderNumbers: [],

  setSelectedStoreId: (storeId) => {
    localStorage.setItem(SALEZ_STORE_ID_KEY, storeId);
    set({ selectedStoreId: storeId });
  },

  createProduct: (product) =>
    set((state) => ({
      createdProducts: [product, ...state.createdProducts],
    })),

  deleteCreatedProduct: (productId) =>
    set((state) => ({
      createdProducts: state.createdProducts.filter(
        (product) => product.id !== productId,
      ),
    })),

  markPickupComplete: (orderNumber) =>
    set((state) => ({
      completedOrderNumbers: state.completedOrderNumbers.includes(orderNumber)
        ? state.completedOrderNumbers
        : [...state.completedOrderNumbers, orderNumber],
    })),

  isPickupCompleted: (orderNumber) =>
    get().completedOrderNumbers.includes(orderNumber),
}));
