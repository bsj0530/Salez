import { useNavigate } from "react-router";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  return (
    <button
      type="button"
      onClick={() => navigate(`/customer/products/${product.id}`)}
      className="w-full overflow-hidden rounded-3xl border border-gray-100 bg-white text-left shadow-sm transition active:scale-[0.99]"
    >
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute top-3 left-3 rounded-full bg-emerald-500 px-3 py-1 text-[12px] font-bold text-white">
          {product.discountRate}% 할인
        </div>

        <div className="absolute right-3 bottom-3 rounded-full bg-black/70 px-3 py-1 text-[12px] font-semibold text-white">
          남은 수량 {product.stock}개
        </div>
      </div>

      <div className="p-4">
        <p className="text-[13px] font-medium text-gray-400">
          {product.storeName} · {product.distance}
        </p>

        <h3 className="mt-1 text-[18px] font-extrabold text-gray-900">
          {product.name}
        </h3>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-[13px] text-gray-400 line-through">
            {formatPrice(product.originalPrice)}원
          </span>
          <span className="text-[20px] font-extrabold text-emerald-600">
            {formatPrice(product.salePrice)}원
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-[13px]">
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
            ⏰ {product.pickupTime} 수령
          </span>
          <span className="text-gray-500">⭐ {product.rating}</span>
        </div>
      </div>
    </button>
  );
}
