import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import saleLogo from "../../assets/sale.png";
import { mockDeliveryProducts } from "../../data/mockProducts";
import { useSalezStore } from "../../store/useSalezStore";
import type { Product } from "../../types/product";

type DeliveryCategory = "all" | "fruit" | "vegetable";

const tabs: { label: string; value: DeliveryCategory }[] = [
  { label: "전체", value: "all" },
  { label: "과일", value: "fruit" },
  { label: "채소", value: "vegetable" },
];

function isCategory(product: Product, selected: DeliveryCategory) {
  if (selected === "all") return true;
  return product.category === selected;
}

export default function DeliverySale() {
  const navigate = useNavigate();
  const addToCart = useSalezStore((state) => state.addToCart);

  const [selectedTab, setSelectedTab] = useState<DeliveryCategory>("all");
  const [query, setQuery] = useState("");

  const deliveryProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return mockDeliveryProducts
      .filter((product) => isCategory(product, selectedTab))
      .filter((product) => {
        if (!keyword) return true;

        return (
          product.name.toLowerCase().includes(keyword) ||
          product.storeName.toLowerCase().includes(keyword) ||
          product.address.toLowerCase().includes(keyword)
        );
      });
  }, [selectedTab, query]);

  return (
    <main className="min-h-screen bg-white pb-28">
      <header className="sticky top-0 z-40 bg-white px-5 pt-5 pb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={saleLogo}
              alt="세일나우"
              className="h-10 w-10 object-contain"
            />

            <div>
              <h1 className="text-[21px] font-black tracking-[-0.03em] text-emerald-700">
                세일나우
              </h1>

              <p className="mt-0.5 text-[12px] font-bold text-gray-400">
                산지 농산물을 배송특가로 만나보세요
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex h-12 items-center gap-3 rounded-full border-2 border-gray-900 bg-white px-4">
            <span className="text-[20px]">🔍</span>

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="산지 농산물 검색"
              className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </header>

      <section className="px-5 pt-4">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-lime-50 p-5 ring-1 ring-emerald-100">
          <p className="text-[13px] font-black text-emerald-700">
            산지에서 바로 출발
          </p>

          <h2 className="mt-2 text-[23px] leading-snug font-black text-gray-900">
            영주 · 안동 · 제주 농산물을
            <br />
            배송특가로 만나보세요
          </h2>

          <p className="mt-2 text-[13px] font-semibold text-gray-500">
            방문 수령 상품과 별도로 배송지 입력 후 주문돼요.
          </p>
        </div>
      </section>

      <section className="mt-5 px-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[21px] font-black text-gray-900">
            {selectedTab === "all"
              ? "전체 농산물"
              : tabs.find((item) => item.value === selectedTab)?.label}
          </h2>
        </div>

        <div className="mb-5 flex gap-2">
          {tabs.map((tab) => {
            const active = selectedTab === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSelectedTab(tab.value)}
                className={[
                  "rounded-full px-4 py-2 text-[14px] font-black transition active:scale-[0.98]",
                  active
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-500",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {deliveryProducts.length === 0 ? (
          <div className="rounded-3xl bg-gray-50 px-5 py-12 text-center">
            <p className="text-[17px] font-black text-gray-900">
              상품이 없어요
            </p>

            <p className="mt-2 text-[13px] font-semibold text-gray-400">
              다른 카테고리를 선택해보세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6">
            {deliveryProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() =>
                  navigate(`/customer/delivery-checkout/${product.id}`)
                }
                className="text-left"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      addToCart(product, 1);
                      navigate("/customer/cart");
                    }}
                    className="absolute right-2 bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
                  >
                    <span className="text-[22px] text-emerald-600">🛒</span>
                  </button>
                </div>

                <div className="pt-3">
                  <span className="rounded-md bg-emerald-600 px-2 py-1 text-[12px] font-black text-white">
                    산지배송
                  </span>

                  <h3 className="mt-3 line-clamp-2 min-h-[44px] text-[17px] leading-snug font-semibold text-gray-800">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-[13px] font-bold text-emerald-700">
                    {product.address}
                  </p>

                  <p className="mt-1 text-[13px] text-gray-400 line-through">
                    {product.originalPrice.toLocaleString("ko-KR")}원
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <span className="rounded-sm bg-red-600 px-1.5 py-0.5 text-[18px] font-black text-white">
                      {product.discountRate}%
                    </span>

                    <span className="text-[26px] leading-none font-black text-red-600">
                      {product.salePrice.toLocaleString("ko-KR")}원
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-1 text-[13px] font-bold text-emerald-700">
                    🚚 {product.pickupTime}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
