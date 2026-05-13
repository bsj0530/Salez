import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { useSalezStore } from "../../store/useSalezStore";

function isDeliveryOrder(order: any) {
  return (
    String(order.id).startsWith("DEL-") ||
    String(order.pickupTime ?? "").includes("도착") ||
    order.items?.some((item: any) => item.pickupTime === "배송")
  );
}

export default function OrderComplete() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = useSalezStore((state) =>
    state.orders.find((item) => item.id === orderId),
  );

  if (!order) {
    return (
      <>
        <CustomerHeader title="주문 완료" showBack />

        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 pb-40 text-center">
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

  const deliveryOrder = isDeliveryOrder(order);

  return (
    <>
      <CustomerHeader title={deliveryOrder ? "배송 주문 완료" : "예약 완료"} />

      <main className="min-h-screen bg-gray-50 px-5 pt-8 pb-56">
        <section className="rounded-3xl bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[34px]">
            {deliveryOrder ? "🚚" : "✅"}
          </div>

          <h1 className="mt-4 text-[26px] font-black text-gray-900">
            {deliveryOrder ? "배송 주문이 완료되었어요" : "예약이 완료되었어요"}
          </h1>

          {deliveryOrder ? (
            <p className="mt-3 text-[14px] leading-6 text-gray-500">
              입력한 배송지로 상품이 발송돼요.
              <br />
              배송 현황은 주문내역에서 확인할 수 있어요.
            </p>
          ) : (
            <p className="mt-3 text-[14px] leading-6 text-gray-500">
              매장 방문 시 QR코드 대신
              <br />
              매장별 주문번호를 보여주세요.
            </p>
          )}
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold text-emerald-600">
            {deliveryOrder ? "배송 주문번호" : "대표 주문번호"}
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

            {deliveryOrder ? (
              <>
                <div className="flex justify-between gap-5">
                  <span className="shrink-0 text-gray-500">배송지</span>

                  <span className="text-right font-bold text-gray-900">
                    {order.address}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">도착 예정</span>

                  <span className="font-bold text-emerald-600">
                    {order.pickupTime}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <span className="text-gray-500">수령 매장</span>

                <span className="font-bold text-gray-900">
                  {order.storeOrders?.length ?? 1}군데
                </span>
              </div>
            )}
          </div>
        </section>

        {deliveryOrder && (
          <section className="mt-5 rounded-3xl bg-emerald-800 p-5 text-white">
            <p className="text-[14px] font-bold text-emerald-100">배송 안내</p>

            <h2 className="mt-2 text-[21px] font-black">
              산지에서 바로 출발해요
            </h2>

            <p className="mt-2 text-[13px] leading-6 font-semibold text-white/90">
              배송 상품은 매장 수령 없이 입력한 주소로 발송됩니다. 신선식품은
              수령 후 빠르게 확인해주세요.
            </p>
          </section>
        )}

        {!deliveryOrder &&
          order.storeOrders &&
          order.storeOrders.length > 0 && (
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

        <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 bg-white px-5 pt-3 pb-[92px] shadow-[0_-10px_30px_rgba(0,0,0,0.04)]">
          <GreenButton onClick={() => navigate("/customer/home")}>
            홈으로 돌아가기
          </GreenButton>

          <button
            type="button"
            onClick={() => navigate("/customer/orders")}
            className="mt-3 h-[52px] w-full rounded-2xl border border-emerald-200 bg-white text-[15px] font-black text-emerald-700"
          >
            주문내역 보기
          </button>
        </div>
      </main>
    </>
  );
}
