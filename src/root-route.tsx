import { Navigate, Route, Routes } from "react-router";

import GlobalLayout from "./components/layout/GlobalLayout";
import CustomerLayout from "./layouts/CustomerLayout";

/**
 * 고객 앱
 */
import CustomerOnboarding from "./pages/customer/CustomerOnboarding";
import CustomerHome from "./pages/customer/CustomerHome";
import DeliverySale from "./pages/customer/DeliverySale";
import DeliveryCheckout from "./pages/customer/DeliveryCheckout";
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
import MyPage from "./pages/customer/MyPage";

/**
 * 매장 앱
 */
import StoreSignup from "./pages/store/StoreSignup";
import StoreDashboard from "./pages/store/StoreDashboard";
import ProductCreate from "./pages/store/ProductCreate";
import ProductManage from "./pages/store/ProductManage";
import OrderManage from "./pages/store/OrderManage";
import StorePickupProcess from "./pages/store/StorePickupProcess";
import StoreReport from "./pages/store/StoreReport";

export default function RootRoute() {
  return (
    <Routes>
      <Route path="/" element={<CustomerOnboarding />} />

      <Route path="/customer" element={<GlobalLayout appType="customer" />}>
        <Route index element={<Navigate to="home" replace />} />

        <Route path="onboarding" element={<CustomerOnboarding />} />

        <Route element={<CustomerLayout />}>
          <Route path="home" element={<CustomerHome />} />

          <Route path="sale" element={<DeliverySale />} />
          <Route
            path="delivery-checkout/:productId"
            element={<DeliveryCheckout />}
          />

          <Route path="map" element={<CustomerMap />} />

          <Route path="stores/:storeId" element={<StoreDetail />} />

          <Route path="products" element={<ProductList />} />
          <Route path="products/:productId" element={<ProductDetail />} />

          <Route path="cart" element={<Cart />} />

          <Route path="my" element={<MyPage />} />

          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/:productId" element={<Checkout />} />

          <Route path="orders" element={<CustomerOrders />} />
          <Route path="orders/:orderId/complete" element={<OrderComplete />} />
          <Route path="orders/:orderId/stores" element={<OrderStoreList />} />
          <Route path="orders/:orderId/pickup" element={<Pickup />} />
          <Route path="orders/:orderId/review" element={<ReviewWrite />} />
        </Route>
      </Route>

      <Route path="/store" element={<GlobalLayout appType="store" />}>
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="signup" element={<StoreSignup />} />
        <Route path="dashboard" element={<StoreDashboard />} />

        <Route path="products" element={<ProductManage />} />
        <Route path="products/new" element={<ProductCreate />} />

        <Route path="orders" element={<OrderManage />} />
        <Route
          path="orders/:orderId/:orderNumber"
          element={<StorePickupProcess />}
        />

        <Route path="report" element={<StoreReport />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
