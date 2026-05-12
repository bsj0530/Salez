import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { mockProducts, mockStores } from "../../data/mockProducts";
import { useMerchantStore } from "../../store/useMerchantStore";
import { useSalezStore } from "../../store/useSalezStore";

export default function StoreReport() {
  const navigate = useNavigate();

  const selectedStoreId = useMerchantStore((state) => state.selectedStoreId);
  const completedOrderNumbers = useMerchantStore(
    (state) => state.completedOrderNumbers,
  );
  const orders = useSalezStore((state) => state.orders);

  const store = mockStores.find((item) => item.id === selectedStoreId);

  if (!selectedStoreId || !store) {
    return (
      <>
        <CustomerHeader title="매장 리포트" showBack />
        <main className="px-5 py-10 text-center">
          <p className="text-gray-500">매장 선택이 필요합니다.</p>
        </main>
      </>
    );
  }

  const storeOrders = orders.flatMap((order) =>
    order.storeOrders.filter(
      (storeOrder) => storeOrder.storeId === selectedStoreId,
    ),
  );

  const products = mockProducts.filter(
    (product) => product.storeId === selectedStoreId,
  );

  const sales = storeOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const soldQuantity = storeOrders.reduce(
    (sum, order) => sum + order.totalQuantity,
    0,
  );
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const recoveryRate =
    totalStock + soldQuantity === 0
      ? 0
      : Math.round((soldQuantity / (totalStock + soldQuantity)) * 100);

  return (
    <>
      <CustomerHeader title="매장 리포트" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-10">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold text-emerald-600">{store.name}</p>

          <h1 className="mt-1 text-[22px] font-black text-gray-900">
            오늘의 리포트
          </h1>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3">
          <ReportCard
            label="매출"
            value={`${sales.toLocaleString("ko-KR")}원`}
          />

          <ReportCard label="주문 수" value={`${storeOrders.length}건`} />

          <ReportCard label="판매 수량" value={`${soldQuantity}개`} />

          <ReportCard label="재고 회수율" value={`${recoveryRate}%`} />
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">수령 현황</h2>

          <div className="mt-4 h-4 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{
                width:
                  storeOrders.length === 0
                    ? "0%"
                    : `${Math.round(
                        (completedOrderNumbers.length / storeOrders.length) *
                          100,
                      )}%`,
              }}
            />
          </div>

          <p className="mt-3 text-[13px] font-bold text-gray-500">
            수령 완료 {completedOrderNumbers.length}건 / 전체{" "}
            {storeOrders.length}건
          </p>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">인기 상품</h2>

          <div className="mt-4 flex flex-col gap-3">
            {products.slice(0, 3).map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
              >
                <div>
                  <p className="text-[12px] font-bold text-emerald-600">
                    TOP {index + 1}
                  </p>
                  <p className="mt-1 text-[15px] font-black text-gray-900">
                    {product.name}
                  </p>
                </div>

                <p className="text-[14px] font-black text-emerald-600">
                  {product.salePrice.toLocaleString("ko-KR")}원
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6">
          <GreenButton
            variant="outline"
            onClick={() => navigate("/store/dashboard")}
          >
            대시보드로 돌아가기
          </GreenButton>
        </div>
      </main>
    </>
  );
}

type ReportCardProps = {
  label: string;
  value: string;
};

function ReportCard({ label, value }: ReportCardProps) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-[12px] font-bold text-gray-400">{label}</p>
      <p className="mt-2 text-[22px] font-black text-gray-900">{value}</p>
    </div>
  );
}
