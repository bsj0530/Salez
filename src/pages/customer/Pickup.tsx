import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import qrImage from "../../assets/QR.png";
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

      <main className="min-h-screen bg-gray-50 px-5 pt-6 pb-56">
        <section className="rounded-3xl bg-white p-6 text-center shadow-sm">


          <h1 className="mt-4 text-[24px] font-black text-gray-900">
            매장에서 QR코드를 보여주세요
          </h1>

          <p className="mt-2 text-[14px] leading-6 text-gray-500">
            직원이 QR코드를 확인하면
            <br />
            주문한 상품을 수령할 수 있어요.
          </p>

          <div className="mx-auto mt-8 w-full max-w-[260px] rounded-[28px] bg-gray-50 p-5 ring-1 ring-gray-100">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <img
                src={qrImage}
                alt="수령 QR 코드"
                className="mx-auto h-48 w-48 object-contain"
              />
            </div>

            <p className="mt-4 text-[12px] font-bold text-gray-400">
              주문번호
            </p>

            <p className="mt-1 break-all text-[14px] font-black text-gray-900">
              {order.qrCode}
            </p>
          </div>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">수령 정보</h2>

          <div className="mt-4 space-y-4 text-[14px]">
            <div className="flex items-center justify-between gap-4">
              <span className="shrink-0 text-gray-500">상품명</span>

              <span className="line-clamp-1 text-right font-bold text-gray-900">
                {order.productName}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="shrink-0 text-gray-500">매장</span>

              <span className="line-clamp-1 text-right font-bold text-gray-900">
                {order.storeName}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="shrink-0 text-gray-500">수령 시간</span>

              <span className="font-bold text-emerald-700">
                {order.pickupTime}
              </span>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-3xl bg-emerald-800 p-5 text-white">
          <p className="text-[14px] font-bold text-emerald-100">
            수령 전 확인해주세요
          </p>

          <p className="mt-2 text-[13px] leading-6 font-semibold text-white/90">
            매장 직원에게 QR코드를 보여준 뒤 상품을 수령해주세요. 수령 완료
            후에는 리뷰 작성 화면으로 이동합니다.
          </p>
        </section>

        <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 bg-white px-5 pt-3 pb-[92px] shadow-[0_-10px_30px_rgba(0,0,0,0.04)]">
          <GreenButton onClick={handlePickupComplete}>
            수령 완료 처리하기
          </GreenButton>
        </div>
      </main>
    </>
  );
}