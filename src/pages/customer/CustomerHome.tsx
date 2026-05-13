import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { mockProducts, mockStores } from "../../data/mockProducts";
import { useSalezStore } from "../../store/useSalezStore";

type TopTab = "home" | "bakery" | "salad" | "meal" | "cafe" | "dessert";
type CategoryKey = Exclude<TopTab, "home">;

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

function isSaladCategory(category: string) {
  return ["salad"].includes(category);
}

function isMealCategory(category: string) {
  return ["meal", "lunchBox", "sideDish"].includes(category);
}

function isCafeCategory(category: string) {
  return ["cafe", "coffee", "drink"].includes(category);
}

function isDessertCategory(category: string) {
  return ["dessert", "cake"].includes(category);
}

export default function CustomerHome() {
  const navigate = useNavigate();

  const userLocation = useSalezStore((state) => state.userLocation);
  const setUserLocation = useSalezStore((state) => state.setUserLocation);
  const cartItems = useSalezStore((state) => state.cartItems);

  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<TopTab>("home");
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

        if (selectedTab === "salad") {
          return isSaladCategory(category);
        }

        if (selectedTab === "meal") {
          return isMealCategory(category);
        }

        if (selectedTab === "cafe") {
          return isCafeCategory(category);
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
    recommendedProducts.length > 0 ? recommendedProducts : productsWithStore;

  const topTabs: { label: string; value: TopTab }[] = [
    { label: "홈", value: "home" },
    { label: "빵", value: "bakery" },
    { label: "샐러드", value: "salad" },
    { label: "도시락", value: "meal" },
    { label: "카페", value: "cafe" },
    { label: "디저트", value: "dessert" },
  ];

  const quickMenus = [
    {
      icon: "🥖",
      title: "빵",
      onClick: () => goCategory("bakery"),
    },
    {
      icon: "🥗",
      title: "샐러드",
      onClick: () => goCategory("salad"),
    },
    {
      icon: "🍱",
      title: "도시락",
      onClick: () => goCategory("meal"),
    },
    {
      icon: "☕",
      title: "카페",
      onClick: () => goCategory("cafe"),
    },
    {
      icon: "🍰",
      title: "디저트",
      onClick: () => goCategory("dessert"),
    },
    {
      icon: "🛍️",
      title: "전체",
      onClick: goAllProducts,
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-[#f7f8f5] pb-24">
        <header className="sticky top-0 z-40 bg-white/95 px-5 pt-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/customer/home")}
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
              <span className="text-[15px] leading-none">📍</span>

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
                onClick={() => {
                  if (tab.value === "home") {
                    setSelectedTab("home");
                    return;
                  }

                  goCategory(tab.value);
                }}
                className="relative flex justify-center pb-3 text-[14px] font-black text-gray-900"
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

        <section className="mx-5 mt-4 overflow-hidden rounded-3xl bg-gradient-to-r from-[#f6fbf2] to-[#eef8e8] p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="rounded-full bg-emerald-800 px-3 py-1 text-[12px] font-black text-white">
                지금이 기회!
              </span>

              <p className="mt-4 text-[17px] font-black text-gray-900">
                버려질 수도 있는 상품,
              </p>

              <h2 className="mt-1 text-[30px] leading-tight font-black text-gray-950">
                오늘의{" "}
                <span className="tracking-wider text-emerald-800">SALEZ</span>로
                <br />
                가치 있게 소비하세요
              </h2>

              <p className="mt-4 text-[14px] leading-6 font-semibold text-gray-700">
                유통기한 임박 상품부터
                <br />
                마감 할인 상품까지 한 곳에서!
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-center">
              <p className="text-[13px] font-black text-emerald-800">최대</p>
              <p className="text-[52px] leading-none font-black text-emerald-800">
                70%
              </p>
              <p className="text-[18px] font-black text-emerald-800">할인!</p>

              <div className="mt-6 text-[72px] leading-none">🛍️</div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              disabled
              className="cursor-default rounded-full bg-black/70 px-4 py-2 text-[13px] font-black text-white"
            >
              1 / 3 전체보기 〉
            </button>
          </div>
        </section>

        <section className="mx-5 mt-4 grid grid-cols-3 gap-3">
          {quickMenus.map((menu) => (
            <button
              key={menu.title}
              type="button"
              onClick={menu.onClick}
              className="flex min-h-[82px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-3 py-3 text-center shadow-sm active:scale-[0.98]"
            >
              <span className="text-[34px] leading-none">{menu.icon}</span>

              <span className="mt-2 text-[14px] font-black text-gray-900">
                {menu.title}
              </span>
            </button>
          ))}
        </section>

        <section className="mx-5 mt-4 flex items-center justify-between rounded-3xl bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-[50px]">🌱</div>

            <div>
              <p className="text-[14px] font-black text-emerald-700">
                SALEZ와 함께하는 가치 있는 소비
              </p>

              <h3 className="mt-1 text-[20px] font-black text-gray-900">
                음식물 폐기 감소에 동참해요 🌎
              </h3>

              <p className="mt-1 text-[13px] font-semibold text-gray-500">
                지금까지 12,345kg의 음식을 폐기로부터 막았어요!
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="shrink-0 cursor-default rounded-full bg-emerald-800 px-4 py-2 text-[13px] font-black text-white"
          >
            더보기 〉
          </button>
        </section>

        <section className="mx-5 mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[19px] font-black text-gray-900">
              ⭐ 금주의 추천상품
            </h2>

            <button
              type="button"
              onClick={goRecommendProducts}
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
                    onClick={goRecommendProducts}
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

        <section className="mx-5 mt-4 flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-[48px]">📦</div>

            <div>
              <h3 className="text-[18px] font-black text-emerald-800">
                오후 3시까지 주문 시 당일 발송!
              </h3>

              <p className="mt-1 text-[13px] font-semibold text-gray-600">
                판매처에서 택배로 안전하게 보내드려요
              </p>
            </div>
          </div>
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