import { useMemo } from "react";
import { useSearchParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import ProductCard from "../../components/customer/ProductCard";
import { mockProducts } from "../../data/mockProducts";

type ProductListCategory =
  | "all"
  | "recommend"
  | "bakery"
  | "salad"
  | "meal"
  | "cafe"
  | "dessert"
  | "event";

const categoryTabs: {
  label: string;
  value: ProductListCategory;
}[] = [
  { label: "전체", value: "all" },
  { label: "추천", value: "recommend" },
  { label: "빵", value: "bakery" },
  { label: "샐러드", value: "salad" },
  { label: "도시락", value: "meal" },
  { label: "카페", value: "cafe" },
  { label: "디저트", value: "dessert" },
];

function normalizeCategory(category: string | null): ProductListCategory {
  if (
    category === "recommend" ||
    category === "bakery" ||
    category === "salad" ||
    category === "meal" ||
    category === "cafe" ||
    category === "dessert" ||
    category === "event"
  ) {
    return category;
  }

  return "all";
}

function getHeaderTitle(category: ProductListCategory) {
  if (category === "recommend") return "추천상품";
  if (category === "bakery") return "빵 마감 할인";
  if (category === "salad") return "샐러드 할인";
  if (category === "meal") return "도시락 할인";
  if (category === "cafe") return "카페 할인";
  if (category === "dessert") return "디저트 할인";
  if (category === "event") return "특가 상품";
  return "마감 할인 상품";
}

function isProductInCategory(
  productCategory: string,
  selectedCategory: ProductListCategory,
  discountRate: number,
  isEvent?: boolean,
  isRecommended?: boolean,
) {
  if (selectedCategory === "all") return true;

  if (selectedCategory === "recommend") {
    return isRecommended === true || discountRate >= 50;
  }

  if (selectedCategory === "bakery") {
    return ["bread", "bakery", "sandwich"].includes(productCategory);
  }

  if (selectedCategory === "salad") {
    return ["salad"].includes(productCategory);
  }

  if (selectedCategory === "meal") {
    return ["meal", "lunchBox", "sideDish"].includes(productCategory);
  }

  if (selectedCategory === "cafe") {
    return ["cafe", "coffee", "drink"].includes(productCategory);
  }

  if (selectedCategory === "dessert") {
    return ["dessert", "cake"].includes(productCategory);
  }

  if (selectedCategory === "event") {
    return isEvent === true || discountRate >= 55;
  }

  return true;
}

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = normalizeCategory(searchParams.get("category"));

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      return isProductInCategory(
        product.category,
        selectedCategory,
        product.discountRate,
        product.isEvent,
        product.isRecommended,
      );
    });
  }, [selectedCategory]);

  const handleCategoryClick = (category: ProductListCategory) => {
    if (category === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  return (
    <>
      <CustomerHeader title={getHeaderTitle(selectedCategory)} showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-28">
        <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
          {categoryTabs.map((category) => {
            const isActive = selectedCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategoryClick(category.value)}
                className={[
                  "shrink-0 rounded-full px-4 py-2 text-[13px] font-bold shadow-sm",
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-gray-700",
                ].join(" ")}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-[14px] font-bold text-gray-800">
            총 {filteredProducts.length}개 상품
          </p>

          <button
            type="button"
            className="text-[13px] font-semibold text-gray-500"
          >
            가까운 순
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white px-5 py-12 text-center shadow-sm">
            <p className="text-[17px] font-black text-gray-900">
              해당 카테고리 상품이 없어요
            </p>

            <p className="mt-2 text-[13px] font-semibold text-gray-400">
              다른 카테고리를 선택해보세요.
            </p>

            <button
              type="button"
              onClick={() => handleCategoryClick("all")}
              className="mt-5 rounded-2xl bg-emerald-600 px-5 py-3 text-[14px] font-black text-white"
            >
              전체 상품 보기
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}