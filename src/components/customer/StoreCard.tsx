import { useNavigate } from "react-router";
import type { Store } from "../../types/product";
import { mockProducts } from "../../data/mockProducts";

type StoreCardProps = {
  store: Store;
};

export default function StoreCard({ store }: StoreCardProps) {
  const navigate = useNavigate();

  const products = mockProducts.filter(
    (product) => product.storeId === store.id,
  );
  const maxDiscount = Math.max(
    ...products.map((product) => product.discountRate),
  );
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  return (
    <button
      type="button"
      onClick={() => navigate(`/customer/stores/${store.id}`)}
      className="w-full overflow-hidden rounded-3xl bg-white text-left shadow-sm transition active:scale-[0.99]"
    >
      <div className="relative h-36 w-full bg-gray-100">
        <img
          src={store.imageUrl}
          alt={store.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute top-3 left-3 rounded-full bg-emerald-500 px-3 py-1 text-[12px] font-black text-white">
          최대 {maxDiscount}% 할인
        </div>

        <div className="absolute right-3 bottom-3 rounded-full bg-black/70 px-3 py-1 text-[12px] font-bold text-white">
          남은 상품 {totalStock}개
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[19px] font-black text-gray-900">
              {store.name}
            </h3>
            <p className="mt-1 text-[13px] font-semibold text-gray-400">
              {store.brand} · {store.distanceText}
            </p>
          </div>

          <span className="shrink-0 text-[13px] font-bold text-gray-500">
            ⭐ {store.rating}
          </span>
        </div>

        <p className="mt-3 line-clamp-1 text-[13px] text-gray-500">
          {store.address}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-bold text-emerald-700">
            ⏰ {store.openUntil}까지 수령
          </span>

          <span className="text-[13px] font-black text-emerald-600">
            상품 보기
          </span>
        </div>
      </div>
    </button>
  );
}
