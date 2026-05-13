import CustomerHeader from "../../components/customer/CustomerHeader";
import { useSalezStore } from "../../store/useSalezStore";

export default function MyPage() {
  const cartItems = useSalezStore((state) => state.cartItems);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const menuItems = [
    {
      icon: "🛒",
      title: "장바구니",
      desc: `${cartCount}개 상품이 담겨 있어요`,
    },
    {
      icon: "📦",
      title: "주문 내역",
      desc: "구매한 상품을 확인해요",
    },
    {
      icon: "📍",
      title: "내 위치 관리",
      desc: "주변 매장 기준 위치를 변경해요",
    },
    {
      icon: "❤️",
      title: "찜한 상품",
      desc: "관심 있는 상품을 모아봐요",
    },
    {
      icon: "🌱",
      title: "나의 가치소비",
      desc: "음식물 폐기 감소에 함께한 기록",
    },
    {
      icon: "⚙️",
      title: "설정",
      desc: "알림과 계정 정보를 관리해요",
    },
  ];

  return (
    <>
      <CustomerHeader title="마이페이지" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-28">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[38px]">
              👤
            </div>

            <div className="min-w-0">
              <p className="text-[13px] font-bold text-emerald-600">
                SALEZ 회원
              </p>

              <h1 className="mt-1 text-[24px] font-black text-gray-900">
                사용자님
              </h1>

              <p className="mt-1 text-[13px] font-semibold text-gray-500">
                오늘도 가치 있는 소비를 시작해보세요
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-gray-50 px-3 py-4 text-center">
              <p className="text-[20px] font-black text-emerald-700">
                {cartCount}
              </p>
              <p className="mt-1 text-[12px] font-bold text-gray-500">
                장바구니
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 px-3 py-4 text-center">
              <p className="text-[20px] font-black text-emerald-700">0</p>
              <p className="mt-1 text-[12px] font-bold text-gray-500">
                주문
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 px-3 py-4 text-center">
              <p className="text-[20px] font-black text-emerald-700">0kg</p>
              <p className="mt-1 text-[12px] font-bold text-gray-500">
                절감
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-black text-emerald-700">
                나의 등급
              </p>

              <h2 className="mt-1 text-[20px] font-black text-gray-900">
                새싹 소비자 🌱
              </h2>

              <p className="mt-1 text-[13px] font-semibold text-gray-500">
                첫 주문을 완료하면 가치소비 기록이 시작돼요
              </p>
            </div>

            <div className="text-[46px]">🌿</div>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-[18%] rounded-full bg-emerald-500" />
          </div>
        </section>

        <section className="mt-5 flex flex-col gap-3">
          {menuItems.map((item) => (
            <button
              key={item.title}
              type="button"
              className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 text-left shadow-sm active:scale-[0.98]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-[24px]">
                {item.icon}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-black text-gray-900">
                  {item.title}
                </p>

                <p className="mt-1 truncate text-[12px] font-semibold text-gray-500">
                  {item.desc}
                </p>
              </div>

              <span className="text-[20px] font-bold text-gray-300">›</span>
            </button>
          ))}
        </section>

        <section className="mt-5 rounded-3xl bg-emerald-800 p-5 text-white">
          <p className="text-[14px] font-bold text-emerald-100">
            SALEZ와 함께한 가치소비
          </p>

          <h2 className="mt-2 text-[22px] font-black">
            아직 첫 구매 전이에요
          </h2>

          <p className="mt-2 text-[13px] leading-5 font-semibold text-emerald-50">
            마감 할인 상품을 구매하면 음식물 폐기 감소 기록이 이곳에 쌓여요.
          </p>
        </section>
      </main>
    </>
  );
}