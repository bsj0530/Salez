import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import { getProductsByStoreId, getStoreById } from "../../data/mockProducts";

export default function StoreDetail() {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const store = getStoreById(storeId ?? "");
  const products = getProductsByStoreId(storeId ?? "");

  if (!store) {
    return (
      <>
        <CustomerHeader title="매장 상세" showBack />
        <main className="px-5 py-10 text-center text-gray-500">
          매장을 찾을 수 없습니다.
        </main>
      </>
    );
  }

  return (
    <>
      <CustomerHeader title={store.name} showBack />

      <main className="min-h-screen bg-gray-50 pb-10">
        <section className="bg-white">
          <div className="h-44 w-full bg-gray-100">
            <img
              src={store.imageUrl}
              alt={store.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-5 py-5">
            <h1 className="text-[24px] font-black text-gray-900">
              {store.name}
            </h1>

            <p className="mt-2 text-[14px] font-semibold text-gray-500">
              ⭐ {store.rating} · {store.distanceText} · {store.openUntil}까지
              수령
            </p>

            <p className="mt-2 text-[13px] text-gray-400">{store.address}</p>
          </div>
        </section>

        <section className="mt-3 bg-white px-5 py-5">
          <h2 className="text-[19px] font-black text-gray-900">
            마감 할인 상품
          </h2>

          <p className="mt-1 text-[13px] text-gray-400">
            상품을 선택하면 상세 정보를 볼 수 있어요.
          </p>

          <div className="mt-5 flex flex-col divide-y divide-gray-100">
            {products.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => navigate(`/customer/products/${product.id}`)}
                className="flex gap-4 py-4 text-left"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-black text-emerald-600">
                      {product.discountRate}% 할인
                    </span>

                    <span className="text-[11px] font-bold text-red-500">
                      {product.stock}개 남음
                    </span>
                  </div>

                  <h3 className="mt-2 line-clamp-1 text-[17px] font-black text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-gray-400">
                    {product.description}
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-[12px] text-gray-400 line-through">
                      {product.originalPrice.toLocaleString("ko-KR")}원
                    </span>

                    <span className="text-[17px] font-black text-emerald-600">
                      {product.salePrice.toLocaleString("ko-KR")}원
                    </span>
                  </div>

                  <p className="mt-1 text-[12px] font-bold text-gray-500">
                    ⏰ {product.pickupTime} 수령
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
