import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { useSalezStore } from "../../store/useSalezStore";
import type { StoreOrder } from "../../types/order";

export default function OrderStoreList() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = useSalezStore((state) =>
    state.orders.find((item) => item.id === orderId),
  );

  const [selectedStoreOrder, setSelectedStoreOrder] =
    useState<StoreOrder | null>(null);

  if (!order) {
    return (
      <>
        <CustomerHeader title="주문 상세" showBack />

        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center">
          <p className="text-[16px] font-bold text-gray-500">
            주문 정보를 찾을 수 없습니다.
          </p>

          <div className="mt-6 w-full">
            <GreenButton onClick={() => navigate("/customer/home")}>
              홈으로 돌아가기
            </GreenButton>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <CustomerHeader title="매장별 주문" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-10">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold text-emerald-600">
            진행 중인 주문
          </p>

          <h1 className="mt-1 text-[22px] font-black text-gray-900">
            {order.productName}
          </h1>

          <div className="mt-4 space-y-2 text-[13px]">
            <div className="flex justify-between gap-4">
              <span className="shrink-0 text-gray-400">대표 주문번호</span>
              <span className="truncate font-bold text-gray-900">
                {order.id}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">수령 매장</span>
              <span className="font-bold text-gray-900">
                {order.storeOrders.length}군데
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">총 결제 금액</span>
              <span className="font-bold text-emerald-600">
                {order.totalPrice.toLocaleString("ko-KR")}원
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[20px] font-black text-gray-900">수령 매장</h2>

            <p className="text-[13px] font-bold text-emerald-600">
              {order.storeOrders.length}군데
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {order.storeOrders.map((storeOrder) => (
              <button
                key={storeOrder.orderNumber}
                type="button"
                onClick={() => setSelectedStoreOrder(storeOrder)}
                className="rounded-3xl bg-white p-5 text-left shadow-sm active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-emerald-600">
                      주문번호 {storeOrder.orderNumber}
                    </p>

                    <h3 className="mt-1 line-clamp-1 text-[18px] font-black text-gray-900">
                      {storeOrder.storeName}
                    </h3>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-bold text-emerald-700">
                    예약 완료
                  </span>
                </div>

                <p className="mt-2 line-clamp-1 text-[13px] text-gray-400">
                  {storeOrder.address}
                </p>

                <div className="mt-4 flex items-center justify-between text-[13px]">
                  <span className="font-bold text-gray-500">
                    상품 {storeOrder.items.length}개 · 수량{" "}
                    {storeOrder.totalQuantity}개
                  </span>

                  <span className="font-black text-emerald-600">
                    {storeOrder.totalPrice.toLocaleString("ko-KR")}원
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {selectedStoreOrder && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="w-full max-w-[430px] rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-emerald-600">
                  매장에 보여줄 주문번호
                </p>

                <h2 className="mt-1 text-[46px] font-black tracking-tight text-emerald-600">
                  {selectedStoreOrder.orderNumber}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStoreOrder(null)}
                className="shrink-0 rounded-full bg-gray-100 px-3 py-1.5 text-[13px] font-bold text-gray-500"
              >
                닫기
              </button>
            </div>

            <section className="rounded-3xl bg-gray-50 p-4">
              <h3 className="text-[18px] font-black text-gray-900">
                {selectedStoreOrder.storeName}
              </h3>

              <p className="mt-2 text-[13px] leading-5 text-gray-500">
                {selectedStoreOrder.address}
              </p>

              <p className="mt-3 text-[13px] font-bold text-emerald-600">
                {selectedStoreOrder.pickupTime} 수령
              </p>
            </section>

            <section className="mt-4 rounded-3xl bg-white ring-1 ring-gray-100">
              <div className="flex flex-col divide-y divide-gray-100">
                {selectedStoreOrder.items.map((item) => (
                  <div key={item.productId} className="flex gap-3 p-4">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-[15px] font-black text-gray-900">
                        {item.productName}
                      </p>

                      <p className="mt-1 text-[12px] text-gray-400">
                        수량 {item.quantity}개
                      </p>

                      <p className="mt-1 text-[14px] font-black text-emerald-600">
                        {item.totalPrice.toLocaleString("ko-KR")}원
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
