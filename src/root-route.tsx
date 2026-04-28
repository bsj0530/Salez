import { Navigate, Route, Routes } from "react-router";

import GlobalLayout from "./components/layout/GlobalLayout";

import CustomerOnboarding from "./pages/customer/CustomerOnboarding";
import CustomerHome from "./pages/customer/CustomerHome";
import CustomerMap from "./pages/customer/CustomerMap";
import StoreDetail from "./pages/customer/StoreDetail";
import ProductList from "./pages/customer/ProductList";
import ProductDetail from "./pages/customer/ProductDetail";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderComplete from "./pages/customer/OrderComplete";
import OrderStoreList from "./pages/customer/OrderStoreList";
import CustomerOrders from "./pages/customer/CustomerOrders";
import Pickup from "./pages/customer/Pickup";
import ReviewWrite from "./pages/customer/ReviewWrite";

export default function RootRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/customer/onboarding" replace />}
      />

      <Route path="/customer" element={<GlobalLayout appType="customer" />}>
        <Route index element={<Navigate to="home" replace />} />

        <Route path="onboarding" element={<CustomerOnboarding />} />
        <Route path="home" element={<CustomerHome />} />
        <Route path="map" element={<CustomerMap />} />

        <Route path="stores/:storeId" element={<StoreDetail />} />

        <Route path="products" element={<ProductList />} />
        <Route path="products/:productId" element={<ProductDetail />} />

        <Route path="cart" element={<Cart />} />

        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/:productId" element={<Checkout />} />

        <Route path="orders" element={<CustomerOrders />} />
        <Route path="orders/:orderId/complete" element={<OrderComplete />} />
        <Route path="orders/:orderId/stores" element={<OrderStoreList />} />
        <Route path="orders/:orderId/pickup" element={<Pickup />} />
        <Route path="orders/:orderId/review" element={<ReviewWrite />} />
      </Route>

      <Route path="*" element={<Navigate to="/customer/home" replace />} />
    </Routes>
  );
}
