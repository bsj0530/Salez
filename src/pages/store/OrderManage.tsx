import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { mockStores } from "../../data/mockProducts";
import { useMerchantStore } from "../../store/useMerchantStore";
import { useSalezStore } from "../../store/useSalezStore";

export default function OrderManage() {
  const navigate = useNavigate();

  const selectedStoreId = useMerchantStore((state) => state.selectedStoreId);
  const isPickupCompleted = useMerchantStore(
    (state) => state.isPickupCompleted,
  );

  const orders = useSalezStore((state) => state.orders);
  const store = mockStores.find((item) => item.id === selectedStoreId);

  if (!selectedStoreId || !store) {
    return (
      <>
        <CustomerHeader title="주문 관리" showBack />
        <main className="px-5 py-10 text-center">
          <p className="text-gray-500">매장 선택이 필요합니다.</p>
        </main>
      </>
    );
  }

  const storeOrders = orders.flatMap((order) =>
    order.storeOrders
      .filter((storeOrder) => storeOrder.storeId === selectedStoreId)
      .map((storeOrder) => ({
        parentOrderId: order.id,
        ...storeOrder,
      })),
  );

  return (
    <>
      <CustomerHeader title="주문 관리" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-10">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold text-emerald-600">{store.name}</p>

          <h1 className="mt-1 text-[22px] font-black text-gray-900">
            주문 {storeOrders.length}건
          </h1>
        </section>

        {storeOrders.length === 0 ? (
          <section className="mt-5 rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-[18px] font-black text-gray-900">
              아직 주문이 없어요
            </p>

            <p className="mt-2 text-[14px] text-gray-400">
              고객이 주문하면 이곳에 표시됩니다.
            </p>
          </section>
        ) : (
          <section className="mt-5 flex flex-col gap-4">
            {storeOrders.map((order) => {
              const completed = isPickupCompleted(order.orderNumber);

              return (
                <button
                  key={order.orderNumber}
                  type="button"
                  onClick={() =>
                    navigate(
                      `/store/orders/${order.parentOrderId}/${order.orderNumber}`,
                    )
                  }
                  className="rounded-3xl bg-white p-5 text-left shadow-sm active:scale-[0.99]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[12px] font-bold text-emerald-600">
                        주문번호 {order.orderNumber}
                      </p>

                      <h2 className="mt-1 text-[18px] font-black text-gray-900">
                        {order.storeName}
                      </h2>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-bold ${
                        completed
                          ? "bg-gray-100 text-gray-500"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {completed ? "수령 완료" : "대기"}
                    </span>
                  </div>

                  <p className="mt-3 text-[13px] text-gray-400">
                    상품 {order.items.length}개 · 수량 {order.totalQuantity}개
                  </p>

                  <p className="mt-2 text-[17px] font-black text-emerald-600">
                    {order.totalPrice.toLocaleString("ko-KR")}원
                  </p>
                </button>
              );
            })}
          </section>
        )}

        <div className="mt-6">
          <GreenButton
            variant="outline"
            onClick={() => navigate("/store/dashboard")}
          >
            대시보드로 돌아가기
          </GreenButton>
        </div>
      </main>
    </>
  );
}
