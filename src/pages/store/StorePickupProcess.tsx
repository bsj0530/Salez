import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { useMerchantStore } from "../../store/useMerchantStore";
import { useSalezStore } from "../../store/useSalezStore";

export default function StorePickupProcess() {
  const { orderId, orderNumber } = useParams();
  const navigate = useNavigate();

  const markPickupComplete = useMerchantStore(
    (state) => state.markPickupComplete,
  );
  const isPickupCompleted = useMerchantStore(
    (state) => state.isPickupCompleted,
  );

  const order = useSalezStore((state) =>
    state.orders.find((item) => item.id === orderId),
  );

  const storeOrder = order?.storeOrders.find(
    (item) => item.orderNumber === orderNumber,
  );

  if (!order || !storeOrder || !orderNumber) {
    return (
      <>
        <CustomerHeader title="수령 처리" showBack />

        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center">
          <p className="text-[16px] font-bold text-gray-500">
            주문 정보를 찾을 수 없습니다.
          </p>
        </main>
      </>
    );
  }

  const completed = isPickupCompleted(orderNumber);

  const handleComplete = () => {
    markPickupComplete(orderNumber);
    navigate("/store/orders");
  };

  return (
    <>
      <CustomerHeader title="수령 처리" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-10">
        <section className="rounded-3xl bg-white p-6 text-center shadow-sm">
          <p className="text-[13px] font-bold text-emerald-600">
            고객 주문번호
          </p>

          <h1 className="mt-2 text-[46px] font-black tracking-tight text-emerald-600">
            {storeOrder.orderNumber}
          </h1>

          <span
            className={`mt-4 inline-flex rounded-full px-4 py-2 text-[13px] font-bold ${
              completed
                ? "bg-gray-100 text-gray-500"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {completed ? "수령 완료" : "수령 대기"}
          </span>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">주문 상품</h2>

          <div className="mt-4 flex flex-col divide-y divide-gray-100">
            {storeOrder.items.map((item) => (
              <div key={item.productId} className="flex gap-3 py-4 first:pt-0">
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

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">수령 정보</h2>

          <div className="mt-4 space-y-3 text-[14px]">
            <div className="flex justify-between">
              <span className="text-gray-500">수령 시간</span>
              <span className="font-bold text-gray-900">
                {storeOrder.pickupTime}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">총 수량</span>
              <span className="font-bold text-gray-900">
                {storeOrder.totalQuantity}개
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">금액</span>
              <span className="font-bold text-emerald-600">
                {storeOrder.totalPrice.toLocaleString("ko-KR")}원
              </span>
            </div>
          </div>
        </section>

        <div className="mt-6">
          <GreenButton disabled={completed} onClick={handleComplete}>
            {completed ? "이미 수령 완료됨" : "수령 완료 처리"}
          </GreenButton>
        </div>
      </main>
    </>
  );
}
