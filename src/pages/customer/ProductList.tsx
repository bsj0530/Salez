import CustomerHeader from "../../components/customer/CustomerHeader";
import ProductCard from "../../components/customer/ProductCard";
import { mockProducts } from "../../data/mockProducts";

export default function ProductList() {
  return (
    <>
      <CustomerHeader title="마감 할인 상품" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-10">
        <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
          {["전체", "빵", "샐러드", "도시락", "카페", "디저트"].map(
            (category) => (
              <button
                key={category}
                type="button"
                className="shrink-0 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-gray-700 shadow-sm first:bg-emerald-500 first:text-white"
              >
                {category}
              </button>
            ),
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-[14px] font-bold text-gray-800">
            총 {mockProducts.length}개 상품
          </p>
          <button className="text-[13px] font-semibold text-gray-500">
            가까운 순
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
