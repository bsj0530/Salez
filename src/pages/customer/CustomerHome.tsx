import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import StoreCard from "../../components/customer/StoreCard";
import { mockProducts, mockStores } from "../../data/mockProducts";
import { useSalezStore } from "../../store/useSalezStore";
import type { Store } from "../../types/product";

type FilterType = "all" | "discount50" | "distance500" | "now" | "rating";

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

export default function CustomerHome() {
  const navigate = useNavigate();

  const userLocation = useSalezStore((state) => state.userLocation);
  const setUserLocation = useSalezStore((state) => state.setUserLocation);
  const cartItems = useSalezStore((state) => state.cartItems);
  const latestOrder = useSalezStore((state) => state.orders[0]);

  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressKeyword, setAddressKeyword] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isAddressSearching, setIsAddressSearching] = useState(false);

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
      setLocationError("위치 기능을 사용할 수 없어요.");
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

  const storesWithDistance = useMemo<Store[]>(() => {
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

  const filteredStores = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    let result = storesWithDistance.filter((store) => {
      const products = mockProducts.filter(
        (product) => product.storeId === store.id,
      );

      const matchesKeyword =
        keyword === "" ||
        store.name.toLowerCase().includes(keyword) ||
        store.brand.toLowerCase().includes(keyword) ||
        store.address.toLowerCase().includes(keyword) ||
        products.some((product) =>
          product.name.toLowerCase().includes(keyword),
        );

      if (!matchesKeyword) return false;

      if (selectedFilter === "discount50") {
        return products.some((product) => product.discountRate >= 50);
      }

      if (selectedFilter === "distance500") {
        return store.distance <= 0.5;
      }

      if (selectedFilter === "now") {
        return products.some((product) => product.stock > 0);
      }

      if (selectedFilter === "rating") {
        return store.rating >= 4.6;
      }

      return true;
    });

    if (selectedFilter === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    if (selectedFilter === "distance500") {
      result = [...result].sort((a, b) => a.distance - b.distance);
    }

    return result;
  }, [query, selectedFilter, storesWithDistance]);

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: "전체", value: "all" },
    { label: "50%↑", value: "discount50" },
    { label: "500m 이내", value: "distance500" },
    { label: "지금 수령", value: "now" },
    { label: "리뷰 높은 순", value: "rating" },
  ];

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <CustomerHeader title="SALEZ" />

      <main className="min-h-screen bg-gray-50 px-5 pt-4 pb-28">
        <div className="mb-3 flex max-w-full items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-sm">
          <span className="text-[12px]">📍</span>

          <span className="max-w-[235px] truncate text-[12px] font-bold text-gray-600">
            {isLocationLoading
              ? "위치 확인 중..."
              : userLocation?.address || "서울 성북구 성북동"}
          </span>

          <button
            type="button"
            onClick={handleOpenAddressModal}
            className="text-[11px] font-bold text-emerald-600"
          >
            변경
          </button>
        </div>

        {locationError && (
          <p className="mb-3 px-1 text-[11px] font-semibold text-gray-400">
            {locationError}
          </p>
        )}

        {latestOrder && (
          <section className="mb-5 rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-emerald-600">
                  진행 중인 주문
                </p>

                <h2 className="mt-1 line-clamp-1 text-[18px] font-black text-gray-900">
                  {latestOrder.productName}
                </h2>
              </div>

              <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-bold text-emerald-700">
                예약 완료
              </span>
            </div>

            <div className="mt-4 space-y-2 text-[13px]">
              <div className="flex justify-between gap-4">
                <span className="shrink-0 text-gray-400">주문번호</span>
                <span className="truncate font-bold text-gray-900">
                  {latestOrder.id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">수령 시간</span>
                <span className="font-bold text-gray-900">
                  {latestOrder.pickupTime}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">결제 금액</span>
                <span className="font-bold text-emerald-600">
                  {latestOrder.totalPrice.toLocaleString("ko-KR")}원
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(`/customer/orders/${latestOrder.id}/stores`)
              }
              className="mt-4 w-full rounded-2xl bg-emerald-500 py-3 text-[14px] font-black text-white active:scale-[0.98]"
            >
              매장별 주문번호 보기
            </button>
          </section>
        )}

        <section>
          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <span className="text-gray-400">🔍</span>

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="매장명이나 상품명을 검색해보세요"
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-gray-400"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="shrink-0 text-[13px] font-bold text-gray-400"
              >
                지우기
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
            {filterButtons.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setSelectedFilter(filter.value)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-bold ${
                  selectedFilter === filter.value
                    ? "bg-emerald-500 text-white"
                    : "border border-emerald-100 bg-white text-emerald-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[20px] font-black text-gray-900">주변 빵집</h2>

            <p className="text-[13px] font-bold text-emerald-600">
              {filteredStores.length}군데
            </p>
          </div>

          {filteredStores.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <p className="text-[16px] font-black text-gray-900">
                검색 결과가 없어요
              </p>
              <p className="mt-2 text-[13px] text-gray-400">
                다른 검색어나 필터를 선택해보세요.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          )}
        </section>

        <div className="fixed bottom-5 left-1/2 flex w-full max-w-[430px] -translate-x-1/2 gap-3 px-5">
          <button
            type="button"
            onClick={() => navigate("/customer/cart")}
            className="relative h-[56px] w-[72px] shrink-0 rounded-2xl bg-white text-[22px] shadow-lg active:scale-[0.98]"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[12px] font-black text-white">
                {cartCount}
              </span>
            )}
          </button>

          <GreenButton onClick={() => navigate("/customer/map")}>
            📍 지도에서 상품 보기
          </GreenButton>
        </div>
      </main>

      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
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
              <GreenButton
                onClick={handleSearchAddress}
                disabled={isAddressSearching}
              >
                {isAddressSearching ? "주소 찾는 중..." : "이 위치로 변경하기"}
              </GreenButton>

              <GreenButton
                variant="outline"
                onClick={() => {
                  setIsAddressModalOpen(false);
                  requestCurrentLocation();
                }}
              >
                현재 위치 사용하기
              </GreenButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
