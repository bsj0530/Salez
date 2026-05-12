import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { mockProducts, mockStores } from "../../data/mockProducts";
import { useMerchantStore } from "../../store/useMerchantStore";

export default function ProductManage() {
  const navigate = useNavigate();

  const selectedStoreId = useMerchantStore((state) => state.selectedStoreId);
  const createdProducts = useMerchantStore((state) => state.createdProducts);
  const deleteCreatedProduct = useMerchantStore(
    (state) => state.deleteCreatedProduct,
  );

  const store = mockStores.find((item) => item.id === selectedStoreId);

  const baseProducts = mockProducts.filter(
    (product) => product.storeId === selectedStoreId,
  );

  const customProducts = createdProducts.filter(
    (product) => product.storeId === selectedStoreId,
  );

  const products = [...customProducts, ...baseProducts];

  if (!selectedStoreId || !store) {
    return (
      <>
        <CustomerHeader title="상품 관리" showBack />
        <main className="px-5 py-10 text-center">
          <p className="text-gray-500">매장 선택이 필요합니다.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <CustomerHeader title="상품 관리" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-28">
        <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold text-emerald-600">{store.name}</p>

          <h1 className="mt-1 text-[22px] font-black text-gray-900">
            등록 상품 {products.length}개
          </h1>
        </section>

        <section className="flex flex-col gap-4">
          {products.map((product) => {
            const isCustom = product.id.startsWith("custom-");

            return (
              <div
                key={product.id}
                className="rounded-3xl bg-white p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[12px] font-bold text-emerald-600">
                          {product.discountRate}% 할인
                        </p>

                        <h2 className="mt-1 line-clamp-1 text-[17px] font-black text-gray-900">
                          {product.name}
                        </h2>
                      </div>

                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => deleteCreatedProduct(product.id)}
                          className="shrink-0 text-[12px] font-bold text-red-400"
                        >
                          삭제
                        </button>
                      )}
                    </div>

                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-[12px] text-gray-400 line-through">
                        {product.originalPrice.toLocaleString("ko-KR")}원
                      </span>

                      <span className="text-[17px] font-black text-emerald-600">
                        {product.salePrice.toLocaleString("ko-KR")}원
                      </span>
                    </div>

                    <p className="mt-2 text-[12px] font-semibold text-gray-400">
                      수량 {product.stock}개 · {product.pickupTime} 수령
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 border-t border-gray-100 bg-white p-5">
          <GreenButton onClick={() => navigate("/store/products/new")}>
            상품 추가 등록
          </GreenButton>
        </div>
      </main>
    </>
  );
}
