import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { useSalezStore } from "../../store/useSalezStore";

export default function OrderComplete() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = useSalezStore((state) =>
    state.orders.find((item) => item.id === orderId),
  );

  if (!order) {
    return (
      <>
        <CustomerHeader title="예약 완료" showBack />

        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center">
          <h1 className="text-[22px] font-black text-gray-900">
            주문 정보를 찾을 수 없어요
          </h1>

          <p className="mt-2 text-[14px] text-gray-400">
            홈으로 돌아가 다시 확인해주세요.
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
      <CustomerHeader title="예약 완료" />

      <main className="min-h-screen bg-gray-50 px-5 py-8">
        <section className="rounded-3xl bg-white p-6 text-center shadow-sm">
          <h1 className="text-[26px] font-black text-gray-900">
            예약이 완료되었어요
          </h1>

          <p className="mt-3 text-[14px] leading-6 text-gray-500">
            매장 방문 시 QR코드 대신
            <br />
            매장별 주문번호를 보여주세요.
          </p>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold text-emerald-600">
            대표 주문번호
          </p>

          <h2 className="mt-2 text-[24px] font-black break-all text-gray-900">
            {order.id}
          </h2>

          <div className="mt-5 space-y-3 text-[14px]">
            <div className="flex justify-between gap-5">
              <span className="shrink-0 text-gray-500">주문 상품</span>
              <span className="text-right font-bold text-gray-900">
                {order.productName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">총 수량</span>
              <span className="font-bold text-gray-900">
                {order.quantity}개
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">결제 금액</span>
              <span className="font-bold text-emerald-600">
                {order.totalPrice.toLocaleString("ko-KR")}원
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">수령 매장</span>
              <span className="font-bold text-gray-900">
                {order.storeOrders?.length ?? 1}군데
              </span>
            </div>
          </div>
        </section>

        {order.storeOrders && order.storeOrders.length > 0 && (
          <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-[18px] font-black text-gray-900">
              매장별 주문번호
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              {order.storeOrders.map((storeOrder) => (
                <div
                  key={storeOrder.orderNumber}
                  className="rounded-2xl bg-gray-50 p-4"
                >
                  <p className="text-[13px] font-black text-gray-900">
                    {storeOrder.storeName}
                  </p>

                  <p className="mt-1 text-[14px] font-black break-all text-emerald-600">
                    {storeOrder.orderNumber}
                  </p>

                  <p className="mt-1 text-[12px] text-gray-400">
                    수량 {storeOrder.totalQuantity}개 ·{" "}
                    {storeOrder.totalPrice.toLocaleString("ko-KR")}원
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <GreenButton onClick={() => navigate("/customer/home")}>
            홈으로 돌아가기
          </GreenButton>

          <GreenButton
            variant="outline"
            onClick={() => navigate(`/customer/orders/${order.id}/stores`)}
          >
            매장별 주문번호 보기
          </GreenButton>
        </div>
      </main>
    </>
  );
}
