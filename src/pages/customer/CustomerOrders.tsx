import { useNavigate } from "react-router";
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

function getOrderStatusText(order: any) {
  const deliveryOrder = isDeliveryOrder(order);

  if (deliveryOrder) {
    if (order.status === "paid") return "배송 완료";
    if (order.status === "picked_up") return "배송 완료";
    if (order.status === "reviewed") return "리뷰 완료";
    return "배송 주문";
  }

  if (order.status === "paid") return "결제 완료";
  if (order.status === "picked_up") return "수령 완료";
  if (order.status === "reviewed") return "리뷰 완료";

  return "주문 완료";
}

export default function CustomerOrders() {
  const navigate = useNavigate();
  const orders = useSalezStore((state) => state.orders);

  // 리뷰 완료된 주문은 목록에서 제외
  const visibleOrders = orders.filter((order) => order.status !== "reviewed");

  const deliveryOrders = visibleOrders.filter((order) =>
    isDeliveryOrder(order),
  );
  const pickupOrders = visibleOrders.filter((order) => !isDeliveryOrder(order));

  const handleOrderClick = (order: any) => {
    if (isDeliveryOrder(order)) {
      navigate(`/customer/orders/${order.id}/review`);
      return;
    }

    if (order.status === "paid") {
      navigate(`/customer/orders/${order.id}/pickup`);
      return;
    }

    if (order.status === "picked_up") {
      navigate(`/customer/orders/${order.id}/review`);
      return;
    }

    navigate(`/customer/orders/${order.id}/complete`);
  };

  const renderOrderCard = (order: any) => {
    const deliveryOrder = isDeliveryOrder(order);

    return (
      <button
        key={order.id}
        type="button"
        onClick={() => handleOrderClick(order)}
        className="rounded-3xl bg-white p-5 text-left shadow-sm active:scale-[0.99]"
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className={[
              "rounded-full px-3 py-1 text-[12px] font-bold",
              deliveryOrder
                ? "bg-blue-50 text-blue-600"
                : "bg-emerald-50 text-emerald-700",
            ].join(" ")}
          >
            {getOrderStatusText(order)}
          </span>

          <span className="truncate text-[12px] font-semibold text-gray-400">
            {order.id}
          </span>
        </div>

        <h2 className="mt-4 line-clamp-1 text-[18px] font-black text-gray-900">
          {order.productName}
        </h2>

        {deliveryOrder ? (
          <>
            <p className="mt-1 line-clamp-1 text-[14px] text-gray-500">
              {order.storeName} · {order.pickupTime}
            </p>

            <p className="mt-1 line-clamp-1 text-[13px] font-semibold text-gray-400">
              배송지: {order.address}
            </p>
          </>
        ) : (
          <p className="mt-1 line-clamp-1 text-[14px] text-gray-500">
            {order.storeName} · {order.pickupTime} 수령
          </p>
        )}

        <div className="mt-4 flex items-end justify-between gap-3">
          <p
            className={[
              "text-[17px] font-black",
              deliveryOrder ? "text-blue-600" : "text-emerald-600",
            ].join(" ")}
          >
            {order.totalPrice.toLocaleString("ko-KR")}원
          </p>

          <span className="text-[12px] font-bold text-gray-400">
            {deliveryOrder ? "리뷰쓰기" : "수령하기"}
          </span>
        </div>
      </button>
    );
  };

  return (
    <>
      <CustomerHeader title="내 주문" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-28">
        {visibleOrders.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <p className="text-[18px] font-black text-gray-900">
              아직 주문이 없어요
            </p>

            <p className="mt-2 text-[14px] text-gray-500">
              근처 마감 할인 상품을 먼저 둘러보세요.
            </p>

            <div className="mt-6 w-full">
              <GreenButton onClick={() => navigate("/customer/home")}>
                홈으로 가기
              </GreenButton>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {deliveryOrders.length > 0 && (
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-[18px] font-black text-gray-900">
                      배송 주문
                    </h2>

                    <p className="mt-1 text-[12px] font-semibold text-gray-400">
                      입력한 주소로 배송되는 주문이에요.
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[12px] font-black text-blue-600">
                    {deliveryOrders.length}개
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {deliveryOrders.map(renderOrderCard)}
                </div>
              </section>
            )}

            {pickupOrders.length > 0 && (
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-[18px] font-black text-gray-900">
                      매장 수령 주문
                    </h2>

                    <p className="mt-1 text-[12px] font-semibold text-gray-400">
                      매장에서 QR 또는 주문번호로 수령하는 주문이에요.
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-black text-emerald-600">
                    {pickupOrders.length}개
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {pickupOrders.map(renderOrderCard)}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </>
  );
}
