export type OrderItem = {
  productId: string;
  productName: string;
  storeId: string;
  storeName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  pickupTime: string;
  address: string;
  imageUrl: string;
};

export type StoreOrder = {
  storeId: string;
  storeName: string;
  address: string;
  pickupTime: string;
  orderNumber: string;
  totalPrice: number;
  totalQuantity: number;
  items: OrderItem[];
};

export type Order = {
  id: string;
  productId: string;
  productName: string;
  storeName: string;
  quantity: number;
  totalPrice: number;
  pickupTime: string;
  address: string;
  status: "paid" | "picked_up" | "reviewed";
  qrCode: string;

  items: OrderItem[];
  storeOrders: StoreOrder[];
};
