import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { useSalezStore } from "../../store/useSalezStore";

type RatingKey = "taste" | "amount" | "value" | "condition";

export default function ReviewWrite() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = useSalezStore((state) =>
    state.orders.find((item) => item.id === orderId),
  );
  const updateOrderStatus = useSalezStore((state) => state.updateOrderStatus);

  const [ratings, setRatings] = useState<Record<RatingKey, number>>({
    taste: 5,
    amount: 4,
    value: 5,
    condition: 5,
  });

  if (!order) {
    return (
      <>
        <CustomerHeader title="리뷰 작성" showBack />
        <main className="px-5 py-10 text-center">
          <p className="text-gray-500">주문 정보를 찾을 수 없습니다.</p>
        </main>
      </>
    );
  }

  const ratingLabels: { key: RatingKey; label: string }[] = [
    { key: "taste", label: "맛" },
    { key: "amount", label: "양" },
    { key: "value", label: "가성비" },
    { key: "condition", label: "상태" },
  ];

  const handleChangeRating = (key: RatingKey, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    updateOrderStatus(order.id, "reviewed");
    navigate("/customer/orders");
  };

  return (
    <>
      <CustomerHeader title="리뷰 작성" showBack />

      <main className="min-h-screen bg-gray-50 px-5 py-6">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-[13px] font-bold text-emerald-600">
            {order.storeName}
          </p>
          <h1 className="mt-1 text-[22px] font-black text-gray-900">
            {order.productName}
          </h1>
          <p className="mt-2 text-[14px] text-gray-500">
            상품은 만족스러우셨나요?
          </p>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">평가하기</h2>

          <div className="mt-5 flex flex-col gap-5">
            {ratingLabels.map((item) => (
              <div key={item.key}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[15px] font-bold text-gray-800">
                    {item.label}
                  </span>
                  <span className="text-[13px] font-bold text-emerald-600">
                    {ratings[item.key]}점
                  </span>
                </div>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleChangeRating(item.key, value)}
                      className={`h-10 flex-1 rounded-xl text-[18px] ${
                        value <= ratings[item.key]
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">사진 업로드</h2>

          <button className="mt-4 flex h-32 w-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-[14px] font-bold text-gray-400">
            + 사진 추가
          </button>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">한줄 리뷰</h2>

          <textarea
            placeholder="상품에 대한 후기를 남겨주세요."
            className="mt-4 h-32 w-full resize-none rounded-2xl bg-gray-50 p-4 text-[14px] outline-none placeholder:text-gray-400"
          />
        </section>

        <div className="mt-6">
          <GreenButton onClick={handleSubmit}>작성 완료</GreenButton>
        </div>
      </main>
    </>
  );
}
