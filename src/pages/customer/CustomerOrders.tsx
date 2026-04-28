import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { useSalezStore } from "../../store/useSalezStore";

export default function CustomerOrders() {
  const navigate = useNavigate();
  const orders = useSalezStore((state) => state.orders);

  return (
    <>
      <CustomerHeader title="내 주문" showBack />

      <main className="min-h-screen bg-gray-50 px-5 py-5">
        {orders.length === 0 ? (
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
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => navigate(`/customer/orders/${order.id}/pickup`)}
                className="rounded-3xl bg-white p-5 text-left shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-bold text-emerald-700">
                    {order.status === "paid" && "결제 완료"}
                    {order.status === "picked_up" && "수령 완료"}
                    {order.status === "reviewed" && "리뷰 완료"}
                  </span>
                  <span className="text-[12px] font-semibold text-gray-400">
                    {order.id}
                  </span>
                </div>

                <h2 className="mt-4 text-[18px] font-black text-gray-900">
                  {order.productName}
                </h2>

                <p className="mt-1 text-[14px] text-gray-500">
                  {order.storeName} · {order.pickupTime} 수령
                </p>

                <p className="mt-3 text-[17px] font-black text-emerald-600">
                  {order.totalPrice.toLocaleString("ko-KR")}원
                </p>
              </button>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
