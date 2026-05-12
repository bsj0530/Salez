import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { mockProducts, mockStores } from "../../data/mockProducts";
import { useMerchantStore } from "../../store/useMerchantStore";
import { useSalezStore } from "../../store/useSalezStore";

export default function StoreDashboard() {
  const navigate = useNavigate();

  const selectedStoreId = useMerchantStore((state) => state.selectedStoreId);
  const createdProducts = useMerchantStore((state) => state.createdProducts);
  const completedOrderNumbers = useMerchantStore(
    (state) => state.completedOrderNumbers,
  );

  const orders = useSalezStore((state) => state.orders);

  const store = mockStores.find((item) => item.id === selectedStoreId);

  if (!selectedStoreId || !store) {
    return (
      <>
        <CustomerHeader title="매장 대시보드" />
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center">
          <h1 className="text-[22px] font-black text-gray-900">
            매장 선택이 필요해요
          </h1>
          <p className="mt-2 text-[14px] text-gray-400">
            매장 앱을 시작하려면 먼저 매장을 선택해주세요.
          </p>

          <div className="mt-6 w-full">
            <GreenButton onClick={() => navigate("/store/signup")}>
              매장 선택하기
            </GreenButton>
          </div>
        </main>
      </>
    );
  }

  const baseProducts = mockProducts.filter(
    (product) => product.storeId === selectedStoreId,
  );

  const allProducts = [
    ...createdProducts.filter((product) => product.storeId === selectedStoreId),
    ...baseProducts,
  ];

  const storeOrders = orders.flatMap((order) =>
    order.storeOrders
      .filter((storeOrder) => storeOrder.storeId === selectedStoreId)
      .map((storeOrder) => ({
        orderId: order.id,
        ...storeOrder,
      })),
  );

  const todaySales = storeOrders.reduce(
    (sum, order) => sum + order.totalPrice,
    0,
  );

  const waitingOrders = storeOrders.filter(
    (order) => !completedOrderNumbers.includes(order.orderNumber),
  );

  return (
    <>
      <CustomerHeader title="매장 대시보드" />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-10">
        <section className="rounded-3xl bg-emerald-500 p-5 text-white shadow-lg shadow-emerald-100">
          <p className="text-[13px] font-semibold opacity-90">내 매장</p>

          <h1 className="mt-1 text-[24px] font-black">{store.name}</h1>

          <p className="mt-2 text-[13px] opacity-90">{store.address}</p>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-[12px] font-bold text-gray-400">오늘 매출</p>
            <p className="mt-2 text-[22px] font-black text-gray-900">
              {todaySales.toLocaleString("ko-KR")}원
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-[12px] font-bold text-gray-400">대기 주문</p>
            <p className="mt-2 text-[22px] font-black text-gray-900">
              {waitingOrders.length}건
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-[12px] font-bold text-gray-400">등록 상품</p>
            <p className="mt-2 text-[22px] font-black text-gray-900">
              {allProducts.length}개
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-[12px] font-bold text-gray-400">수령 완료</p>
            <p className="mt-2 text-[22px] font-black text-gray-900">
              {completedOrderNumbers.length}건
            </p>
          </div>
        </section>

        <section className="mt-5 flex flex-col gap-3">
          <GreenButton onClick={() => navigate("/store/products/new")}>
            상품 등록하기
          </GreenButton>

          <GreenButton
            variant="outline"
            onClick={() => navigate("/store/orders")}
          >
            주문 관리
          </GreenButton>

          <GreenButton
            variant="ghost"
            onClick={() => navigate("/store/report")}
          >
            리포트 보기
          </GreenButton>
        </section>
      </main>
    </>
  );
}
