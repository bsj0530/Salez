export type ProductCategory =
  | "bread"
  | "bakery"
  | "sandwich"
  | "lunchBox"
  | "meal"
  | "sideDish"
  | "fruit"
  | "vegetable"
  | "farm"
  | "meat"
  | "dessert"
  | "cake"
  | "snack"
  | "event";

export type DeliveryType = "pickup" | "delivery";

export type Store = {
  id: string;
  name: string;
  brand: string;
  address: string;
  distance: number;
  distanceText: string;
  rating: number;
  lat: number;
  lng: number;
  imageUrl: string;
  openUntil: string;
};

export type Product = {
  id: string;
  storeId: string;
  storeName: string;
  name: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  pickupTime: string;
  distance: string;
  stock: number;
  storageMethod: string;
  qualityNotice: string;
  rating: number;
  address: string;
  lat: number;
  lng: number;
  category: ProductCategory;
  expiryDate: string;
  isEvent?: boolean;
  isRecommended?: boolean;
  deliveryType?: DeliveryType;
};
