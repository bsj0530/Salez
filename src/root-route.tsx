import { Navigate, Route, Routes } from "react-router";

import GlobalLayout from "./components/layout/GlobalLayout";
import CustomerLayout from "./layouts/CustomerLayout";

/**
 * 고객 앱
 */
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
      {/* 기본 진입: 주소창은 / 그대로 두고 온보딩 표시 */}
      <Route path="/" element={<CustomerOnboarding />} />

      {/* =========================
          고객 앱
      ========================= */}
      <Route path="/customer" element={<GlobalLayout appType="customer" />}>
        <Route index element={<Navigate to="home" replace />} />

        {/* 온보딩은 하단바 없이 표시 */}
        <Route path="onboarding" element={<CustomerOnboarding />} />

        {/* 하단 underbar가 필요한 고객 화면 */}
        <Route element={<CustomerLayout />}>
          <Route path="home" element={<CustomerHome />} />
          <Route path="map" element={<CustomerMap />} />

          <Route path="stores/:storeId" element={<StoreDetail />} />

          <Route path="products" element={<ProductList />} />
          <Route path="products/:productId" element={<ProductDetail />} />

          <Route path="cart" element={<Cart />} />

          {/* 마이페이지 */}
          <Route path="my" element={<MyPage />} />

          {/* 장바구니 전체 결제 */}
          <Route path="checkout" element={<Checkout />} />

          {/* 상품 상세에서 바로 결제 */}
          <Route path="checkout/:productId" element={<Checkout />} />

          <Route path="orders" element={<CustomerOrders />} />
          <Route path="orders/:orderId/complete" element={<OrderComplete />} />
          <Route path="orders/:orderId/stores" element={<OrderStoreList />} />
          <Route path="orders/:orderId/pickup" element={<Pickup />} />
          <Route path="orders/:orderId/review" element={<ReviewWrite />} />
        </Route>
      </Route>

      {/* =========================
          매장 앱
      ========================= */}
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

      {/* 예외 경로 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}