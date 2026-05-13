import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import logo from "../../assets/logo.png";
import breadIcon from "../../assets/bread.png";
import bentoIcon from "../../assets/bento.png";
import dessertIcon from "../../assets/strawberry-cake.png";
import gridIcon from "../../assets/grid.png";
import shoppingBagIcon from "../../assets/shopping-bag.png";
import mapRedIcon from "../../assets/mapred.png";
import balancedDietIcon from "../../assets/balanced-diet.png";
import vegetableIcon from "../../assets/vegetable.png";

import { mockProducts, mockStores } from "../../data/mockProducts";
import { useSalezStore } from "../../store/useSalezStore";

type TopTab =
  | "all"
  | "bakery"
  | "lunchBox"
  | "sideDish"
  | "farm"
  | "dessert";

type CategoryKey = Exclude<TopTab, "all">;

function getDistanceKm(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
) {
  const earthRadiusKm = 6371;

  const dLat = ((toLat - fromLat) * Math.PI) / 180;
  const dLng = ((toLng - fromLng) * Math.PI) / 180;

  const lat1 = (fromLat * Math.PI) / 180;
  const lat2 = (toLat * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

function formatDistance(distanceKm: number) {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }

  return `${distanceKm.toFixed(1)}km`;
}

function getShortAddress(address?: string) {
  if (!address) return "위치";

  const parts = address.split(" ").filter(Boolean);

  if (parts.length === 0) return "위치";

  return parts[parts.length - 1];
}

function isBakeryCategory(category: string) {
  return ["bread", "bakery", "sandwich"].includes(category);
}

function isLunchBoxCategory(category: string) {
  return ["lunchBox", "meal"].includes(category);
}

function isSideDishCategory(category: string) {
  return ["sideDish"].includes(category);
}

function isFarmCategory(category: string) {
  return ["fruit", "vegetable", "farm"].includes(category);
}

function isDessertCategory(category: string) {
  return ["dessert", "cake", "snack"].includes(category);
}

export default function CustomerHome() {
  const navigate = useNavigate();

  const userLocation = useSalezStore((state) => state.userLocation);
  const setUserLocation = useSalezStore((state) => state.setUserLocation);
  const cartItems = useSalezStore((state) => state.cartItems);

  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<TopTab>("all");
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressKeyword, setAddressKeyword] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isAddressSearching, setIsAddressSearching] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const goAllProducts = () => {
    navigate("/customer/products");
  };

  const goCategory = (category: CategoryKey) => {
    navigate(`/customer/products?category=${category}`);
  };

  const goRecommendProducts = () => {
    navigate("/customer/products?category=recommend");
  };

  const getAddressByCoords = (lat: number, lng: number) => {
    if (!window.kakao) {
      setUserLocation({
        lat,
        lng,
        address: "서울 성북구 성북동",
      });
      return;
    }

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(lng, lat, (result: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address =
            result[0]?.road_address?.address_name ||
            result[0]?.address?.address_name ||
            "서울 성북구 성북동";

          setUserLocation({
            lat,
            lng,
            address,
          });
        } else {
          setUserLocation({
            lat,
            lng,
            address: "서울 성북구 성북동",
          });
        }
      });
    });
  };

  const requestCurrentLocation = () => {
    setIsLocationLoading(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("기본 위치로 표시 중");
      setUserLocation({
        lat: 37.588227,
        lng: 126.993606,
        address: "서울 성북구 성북동",
      });
      setIsLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        getAddressByCoords(lat, lng);
        setIsLocationLoading(false);
      },
      () => {
        setLocationError("기본 위치로 표시 중");
        setUserLocation({
          lat: 37.588227,
          lng: 126.993606,
          address: "서울 성북구 성북동",
        });
        setIsLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000 * 60 * 3,
      },
    );
  };

  const handleOpenAddressModal = () => {
    setAddressKeyword(userLocation?.address ?? "");
    setAddressError("");
    setIsAddressModalOpen(true);
  };

  const handleSearchAddress = () => {
    const keyword = addressKeyword.trim();

    if (!keyword) {
      setAddressError("도로명 주소나 지번 주소를 입력해주세요.");
      return;
    }

    if (!window.kakao) {
      setAddressError("카카오 지도 API를 불러오지 못했습니다.");
      return;
    }

    setIsAddressSearching(true);
    setAddressError("");

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(keyword, (result: any[], status: string) => {
        setIsAddressSearching(false);

        if (status !== window.kakao.maps.services.Status.OK || !result[0]) {
          setAddressError("주소를 찾을 수 없습니다. 더 정확히 입력해주세요.");
          return;
        }

        const lat = Number(result[0].y);
        const lng = Number(result[0].x);

        const roadAddress =
          result[0]?.road_address?.address_name ||
          result[0]?.address_name ||
          keyword;

        setUserLocation({
          lat,
          lng,
          address: roadAddress,
        });

        setIsAddressModalOpen(false);
        setAddressKeyword("");
      });
    });
  };

  useEffect(() => {
    if (!userLocation) {
      requestCurrentLocation();
    }
  }, []);

  const storesWithDistance = useMemo(() => {
    if (!userLocation) return mockStores;

    return mockStores
      .map((store) => {
        const distance = getDistanceKm(
          userLocation.lat,
          userLocation.lng,
          store.lat,
          store.lng,
        );

        return {
          ...store,
          distance,
          distanceText: formatDistance(distance),
        };
      })
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation]);

  const productsWithStore = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return mockProducts
      .map((product) => {
        const store = storesWithDistance.find(
          (item) => item.id === product.storeId,
        );

        return {
          ...product,
          store,
        };
      })
      .filter((product) => {
        const item = product as any;
        const store = product.store;
        const name = product.name.toLowerCase();
        const storeName = store?.name.toLowerCase() ?? "";
        const category = String(item.category ?? "");

        if (
          keyword &&
          !name.includes(keyword) &&
          !storeName.includes(keyword)
        ) {
          return false;
        }

        if (selectedTab === "bakery") {
          return isBakeryCategory(category);
        }

        if (selectedTab === "lunchBox") {
          return isLunchBoxCategory(category);
        }

        if (selectedTab === "sideDish") {
          return isSideDishCategory(category);
        }

        if (selectedTab === "farm") {
          return isFarmCategory(category);
        }

        if (selectedTab === "dessert") {
          return isDessertCategory(category);
        }

        return true;
      });
  }, [query, selectedTab, storesWithDistance]);

  const recommendedProducts = useMemo(() => {
    return productsWithStore.filter((product) => {
      const item = product as any;
      return item.isRecommended === true || product.discountRate >= 50;
    });
  }, [productsWithStore]);

  const homeProducts =
    selectedTab === "all" && recommendedProducts.length > 0
      ? recommendedProducts
      : productsWithStore;

  const topTabs: { label: string; value: TopTab }[] = [
    { label: "전체", value: "all" },
    { label: "베이커리", value: "bakery" },
    { label: "도시락", value: "lunchBox" },
    { label: "반찬", value: "sideDish" },
    { label: "농산물", value: "farm" },
    { label: "디저트", value: "dessert" },
  ];

const quickMenus = [
  {
    icon: breadIcon,
    title: "베이커리",
    onClick: () => goCategory("bakery"),
  },
  {
    icon: bentoIcon,
    title: "도시락",
    onClick: () => goCategory("lunchBox"),
  },
  {
    icon: balancedDietIcon,
    title: "반찬",
    onClick: () => goCategory("sideDish"),
  },
  {
    icon: vegetableIcon,
    title: "농산물",
    onClick: () => goCategory("farm"),
  },
  {
    icon: dessertIcon,
    title: "디저트",
    onClick: () => goCategory("dessert"),
  },
  {
    icon: gridIcon,
    title: "전체",
    onClick: goAllProducts,
  },
];

  return (
    <>
      <main className="min-h-screen bg-[#f7f8f5] pb-[calc(96px+env(safe-area-inset-bottom))]">
        <header className="sticky top-0 z-40 bg-white/95 px-5 pt-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedTab("all");
                navigate("/customer/home");
              }}
              className="flex shrink-0 items-center"
            >
              <img
                src={logo}
                alt="SALEZ"
                className="h-10 w-auto object-contain"
              />
            </button>

            <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-4">
              <span className="text-[16px]">🔍</span>

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="상품 검색..."
                className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              type="button"
              onClick={handleOpenAddressModal}
              className="flex h-11 max-w-[112px] shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 text-emerald-800 ring-1 ring-emerald-100 active:scale-[0.98]"
            >
              <img
                src={mapRedIcon}
                alt="위치"
                className="h-4 w-4 shrink-0 object-contain"
              />

              <span className="min-w-0 flex-1 truncate text-[12px] font-black">
                {isLocationLoading
                  ? "확인 중"
                  : getShortAddress(userLocation?.address)}
              </span>
            </button>
          </div>

          <nav className="mt-5 grid grid-cols-6">
            {topTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSelectedTab(tab.value)}
                className={[
                  "relative flex justify-center pb-3 text-[13px] font-black",
                  selectedTab === tab.value
                    ? "text-emerald-700"
                    : "text-gray-900",
                ].join(" ")}
              >
                {tab.label}

                {selectedTab === tab.value && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-emerald-700" />
                )}
              </button>
            ))}
          </nav>
        </header>

        {locationError && (
          <p className="mx-5 mt-3 rounded-2xl bg-white px-4 py-2 text-[12px] font-bold text-gray-400">
            {locationError}
          </p>
        )}

        <section className="mx-5 mt-4 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#f1fbf4] via-white to-[#eef8e8] p-5 shadow-sm ring-1 ring-emerald-100">
          <div className="relative">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-200/40 blur-2xl" />
            <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-lime-200/40 blur-2xl" />

            <div className="relative flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-black text-white">
                  오늘의 마감특가
                </span>

                <h2 className="mt-4 text-[25px] leading-[1.22] font-black tracking-[-0.04em] text-emerald-800">
                  버려질 상품을
                  <br />
                  가치 있는 소비로
                </h2>

                <p className="mt-3 text-[13px] leading-5 font-bold text-emerald-700/80">
                  가까운 매장의 마감 할인 상품을
                  <br />
                  오늘 바로 만나보세요
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                    당일 수령
                  </span>

                  <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                    위치 기반
                  </span>
                </div>
              </div>

              <div className="relative shrink-0">
                <div className="flex h-[118px] w-[112px] flex-col items-center justify-center rounded-[26px] bg-emerald-700 text-white shadow-lg shadow-emerald-900/10">
                  <p className="text-[12px] font-black text-emerald-100">
                    최대
                  </p>

                  <p className="mt-1 text-[42px] leading-none font-black tracking-[-0.06em]">
                    70
                    <span className="text-[22px]">%</span>
                  </p>

                  <p className="mt-1 text-[13px] font-black text-emerald-100">
                    할인
                  </p>
                </div>

                <div className="absolute -bottom-5 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100">
                  <img
                    src={shoppingBagIcon}
                    alt="쇼핑백"
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="relative mt-6 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-1.5 w-4 rounded-full bg-emerald-700" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
              </div>

              <button
                type="button"
                onClick={goAllProducts}
                className="rounded-full bg-emerald-800 px-4 py-2 text-[12px] font-black text-white shadow-sm active:scale-[0.98]"
              >
                전체보기
              </button>
            </div>
          </div>
        </section>

        <section className="mx-5 mt-4 grid grid-cols-3 gap-3">
          {quickMenus.map((menu) => (
            <button
              key={menu.title}
              type="button"
              onClick={menu.onClick}
              className="flex min-h-[86px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-3 py-3 text-center shadow-sm active:scale-[0.98]"
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <img
                  src={menu.icon}
                  alt={menu.title}
                  className="h-9 w-9 object-contain"
                />
              </div>

              <span className="mt-2 text-[14px] font-black text-gray-900">
                {menu.title}
              </span>
            </button>
          ))}
        </section>

        <section className="mx-5 mt-4 overflow-hidden rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-emerald-50">
                <span className="text-[36px]">🌱</span>
                <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-lime-300" />
              </div>

              <div className="min-w-0">
                <p className="text-[13px] font-black text-emerald-700">
                  SALEZ와 함께하는 가치소비
                </p>

                <h3 className="mt-1 text-[20px] leading-snug font-black tracking-[-0.03em] text-gray-950">
                  음식물 폐기 감소에
                  <br />
                  동참해요 🌎
                </h3>

                <p className="mt-2 text-[13px] leading-5 font-semibold text-gray-500">
                  지금까지{" "}
                  <span className="font-black text-emerald-700">
                    12,345kg
                  </span>
                  의 음식을 폐기로부터 막았어요!
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="shrink-0 cursor-default rounded-full bg-emerald-800 px-4 py-2.5 text-[13px] font-black text-white shadow-sm"
            >
              더보기 〉
            </button>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-[68%] rounded-full bg-emerald-500" />
          </div>
        </section>

        <section className="mx-5 mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[19px] font-black text-gray-900">
              {selectedTab === "all" ? "⭐ 금주의 추천상품" : "마감 할인 상품"}
            </h2>

            <button
              type="button"
              onClick={
                selectedTab === "all"
                  ? goRecommendProducts
                  : () => goCategory(selectedTab)
              }
              className="text-[13px] font-black text-emerald-700"
            >
              전체보기
            </button>
          </div>

          {homeProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <p className="text-[16px] font-black text-gray-900">
                검색 결과가 없어요
              </p>

              <p className="mt-2 text-[13px] font-semibold text-gray-400">
                다른 검색어를 입력해보세요.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {homeProducts.slice(0, 4).map((product) => {
                const item = product as any;
                const store = product.store;

                const image =
                  item.imageUrl ||
                  item.image ||
                  item.thumbnail ||
                  "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop";

                const originalPrice =
                  item.originalPrice || product.originalPrice;
                const salePrice = product.salePrice;

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => navigate(`/customer/products/${product.id}`)}
                    className="overflow-hidden rounded-2xl bg-white text-left shadow-sm active:scale-[0.98]"
                  >
                    <div className="relative h-28 overflow-hidden bg-gray-100">
                      <img
                        src={image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute top-2 left-2 rounded-md bg-emerald-700 px-2 py-1 text-[12px] font-black text-white">
                        추천
                      </span>

                      <span className="absolute bottom-0 left-0 rounded-tr-lg bg-red-500 px-2 py-1 text-[15px] font-black text-white">
                        {product.discountRate}%
                      </span>

                      <span className="absolute top-2 right-2 text-[24px] text-white drop-shadow">
                        ♡
                      </span>
                    </div>

                    <div className="p-3">
                      <h3 className="line-clamp-1 text-[14px] font-black text-gray-900">
                        {product.name}
                      </h3>

                      <div className="mt-1 flex items-end gap-2">
                        <p className="text-[17px] font-black text-gray-950">
                          {salePrice.toLocaleString("ko-KR")}원
                        </p>

                        <p className="text-[13px] font-bold text-gray-400 line-through">
                          {originalPrice.toLocaleString("ko-KR")}원
                        </p>
                      </div>

                      <p className="mt-2 line-clamp-1 text-[12px] font-semibold text-gray-500">
                        ⏱ 오늘 {item.pickupTime || "20:00"}까지 수령
                      </p>

                      <p className="mt-1 line-clamp-1 text-[12px] font-bold text-emerald-700">
                        {store?.name || "SALEZ 매장"} ·{" "}
                        {store?.distanceText || "0.3km"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>


      </main>

      {isAddressModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40">
          <div className="w-full max-w-[430px] rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[20px] font-black text-gray-900">
                위치 변경
              </h2>

              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-[13px] font-bold text-gray-500"
              >
                닫기
              </button>
            </div>

            <p className="mb-3 text-[13px] leading-5 text-gray-500">
              도로명 주소나 지번 주소를 입력하면 해당 위치 기준으로 주변 매장을
              다시 보여드려요.
            </p>

            <div className="rounded-2xl bg-gray-50 px-4 py-3 ring-1 ring-gray-100">
              <input
                value={addressKeyword}
                onChange={(event) => setAddressKeyword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearchAddress();
                  }
                }}
                placeholder="예: 서울 성북구 성북로 84"
                className="w-full bg-transparent text-[15px] font-bold outline-none placeholder:font-normal placeholder:text-gray-400"
              />
            </div>

            {addressError && (
              <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-500">
                {addressError}
              </p>
            )}

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleSearchAddress}
                disabled={isAddressSearching}
                className="h-[52px] rounded-2xl bg-emerald-700 text-[15px] font-black text-white disabled:opacity-50"
              >
                {isAddressSearching ? "주소 찾는 중..." : "이 위치로 변경하기"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsAddressModalOpen(false);
                  requestCurrentLocation();
                }}
                className="h-[52px] rounded-2xl border border-emerald-200 bg-white text-[15px] font-black text-emerald-700"
              >
                현재 위치 사용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}