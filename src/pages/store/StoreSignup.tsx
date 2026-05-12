import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { mockStores } from "../../data/mockProducts";
import { useMerchantStore } from "../../store/useMerchantStore";

export default function StoreSignup() {
  const navigate = useNavigate();

  const selectedStoreId = useMerchantStore((state) => state.selectedStoreId);
  const setSelectedStoreId = useMerchantStore(
    (state) => state.setSelectedStoreId,
  );

  const handleStart = () => {
    if (!selectedStoreId) return;
    navigate("/store/dashboard");
  };

  return (
    <>
      <CustomerHeader title="매장 시작하기" />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-28">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h1 className="text-[24px] font-black text-gray-900">
            내 매장을 선택해주세요
          </h1>

          <p className="mt-2 text-[14px] leading-6 text-gray-500">
            MVP에서는 등록된 빵집 중 하나를 선택해서 매장 앱을 테스트할 수
            있어요.
          </p>
        </section>

        <section className="mt-5 flex flex-col gap-3">
          {mockStores.map((store) => {
            const isSelected = selectedStoreId === store.id;

            return (
              <button
                key={store.id}
                type="button"
                onClick={() => setSelectedStoreId(store.id)}
                className={`rounded-3xl border p-4 text-left shadow-sm ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-transparent bg-white"
                }`}
              >
                <div className="flex gap-4">
                  <img
                    src={store.imageUrl}
                    alt={store.name}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h2 className="line-clamp-1 text-[17px] font-black text-gray-900">
                      {store.name}
                    </h2>

                    <p className="mt-1 text-[13px] font-bold text-emerald-600">
                      {store.brand}
                    </p>

                    <p className="mt-1 line-clamp-1 text-[12px] text-gray-400">
                      {store.address}
                    </p>

                    <p className="mt-2 text-[12px] font-bold text-gray-500">
                      ⭐ {store.rating} · {store.openUntil}까지
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 border-t border-gray-100 bg-white p-5">
          <GreenButton disabled={!selectedStoreId} onClick={handleStart}>
            매장 앱 시작하기
          </GreenButton>
        </div>
      </main>
    </>
  );
}
