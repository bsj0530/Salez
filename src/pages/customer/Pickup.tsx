import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { useSalezStore } from "../../store/useSalezStore";

export default function Pickup() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = useSalezStore((state) =>
    state.orders.find((item) => item.id === orderId),
  );

  const updateOrderStatus = useSalezStore((state) => state.updateOrderStatus);

  if (!order) {
    return (
      <>
        <CustomerHeader title="수령" showBack />
        <main className="px-5 py-10 text-center">
          <p className="text-gray-500">주문 정보를 찾을 수 없습니다.</p>
        </main>
      </>
    );
  }

  const handlePickupComplete = () => {
    updateOrderStatus(order.id, "picked_up");
    navigate(`/customer/orders/${order.id}/review`);
  };

  return (
    <>
      <CustomerHeader title="수령하기" showBack />

      <main className="min-h-screen bg-gray-50 px-5 py-6">
        <section className="rounded-3xl bg-white p-6 text-center shadow-sm">
          <h1 className="text-[24px] font-black text-gray-900">
            매장에서 QR코드를 보여주세요
          </h1>

          <p className="mt-2 text-[14px] leading-6 text-gray-500">
            직원이 QR코드를 확인하면 상품을 수령할 수 있어요.
          </p>

          <div className="mx-auto mt-8 flex h-56 w-56 items-center justify-center rounded-3xl border-4 border-gray-900 bg-white text-center text-[16px] font-black">
            QR
            <br />
            {order.qrCode}
          </div>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">수령 정보</h2>

          <div className="mt-4 space-y-3 text-[14px]">
            <div className="flex justify-between">
              <span className="text-gray-500">상품명</span>
              <span className="font-bold">{order.productName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">매장</span>
              <span className="font-bold">{order.storeName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">수령 시간</span>
              <span className="font-bold">{order.pickupTime}</span>
            </div>
          </div>
        </section>

        <div className="mt-6">
          <GreenButton onClick={handlePickupComplete}>
            수령 완료 처리하기
          </GreenButton>
        </div>
      </main>
    </>
  );
}
