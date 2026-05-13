import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { mockStores } from "../../data/mockProducts";
import type { Store } from "../../types/product";
import { useSalezStore } from "../../store/useSalezStore";

export default function CustomerMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const userLocation = useSalezStore((state) => state.userLocation);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.kakao) return;

    window.kakao.maps.load(() => {
      const centerLat = userLocation?.lat ?? 36.32337;
      const centerLng = userLocation?.lng ?? 127.4577;

      const mapCenter = new window.kakao.maps.LatLng(centerLat, centerLng);

      const map = new window.kakao.maps.Map(mapRef.current, {
        center: mapCenter,
        level: 4,
      });

      new window.kakao.maps.Marker({
        map,
        position: mapCenter,
        title: "내 위치",
      });

      const markerSvg = `
        <svg width="42" height="48" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 0C9.4 0 0 9.1 0 20.3C0 34.8 21 48 21 48C21 48 42 34.8 42 20.3C42 9.1 32.6 0 21 0Z" fill="#10B981"/>
          <circle cx="21" cy="20" r="13" fill="white"/>
          <path d="M14 18.5H28L26.8 29H15.2L14 18.5Z" fill="#10B981"/>
          <path d="M17 18.5C17 15.7 18.8 14 21 14C23.2 14 25 15.7 25 18.5" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;

      const markerImageSrc = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        markerSvg,
      )}`;

      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageSrc,
        new window.kakao.maps.Size(42, 48),
        {
          offset: new window.kakao.maps.Point(21, 48),
        },
      );

      mockStores.forEach((store) => {
        const markerPosition = new window.kakao.maps.LatLng(
          store.lat,
          store.lng,
        );

        const marker = new window.kakao.maps.Marker({
          map,
          position: markerPosition,
          image: markerImage,
          title: store.name,
        });

        window.kakao.maps.event.addListener(marker, "click", () => {
          setSelectedStore(store);
          map.panTo(markerPosition);
        });
      });

      window.kakao.maps.event.addListener(map, "click", () => {
        setSelectedStore(null);
      });
    });
  }, [userLocation]);

  return (
    <>
      <CustomerHeader title="지도에서 상품 보기" showBack />

      <main className="relative min-h-screen bg-gray-50">
        <div ref={mapRef} className="h-[calc(100vh-65px)] w-full" />

        <div className="absolute top-4 left-1/2 z-10 w-full max-w-[430px] -translate-x-1/2 px-5">
          <div className="inline-flex max-w-full rounded-full bg-white/95 px-4 py-2 shadow-md backdrop-blur">
            <p className="truncate text-[12px] font-bold text-gray-700">
              📍 내 위치 {userLocation?.address ?? "대전 동구 용운동"}
            </p>
          </div>
        </div>

        {!selectedStore && (
          <div className="fixed bottom-[96px] left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-5">
            <div className="rounded-3xl bg-white px-5 py-4 shadow-xl ring-1 ring-gray-100">
              <p className="text-center text-[16px] font-black text-gray-900">
                총 {mockStores.length}군데가 있습니다
              </p>
            </div>
          </div>
        )}

        {selectedStore && (
          <div className="fixed bottom-[96px] left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-5">
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100">
              <div className="flex gap-4 p-4">
                <img
                  src={selectedStore.imageUrl}
                  alt={selectedStore.name}
                  className="h-24 w-24 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[13px] font-bold text-emerald-600">
                      {selectedStore.brand}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedStore(null)}
                      className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-[12px] font-bold text-gray-500"
                    >
                      닫기
                    </button>
                  </div>

                  <h2 className="mt-1 line-clamp-1 text-[18px] font-black text-gray-900">
                    {selectedStore.name}
                  </h2>

                  <p className="mt-1 text-[12px] text-gray-500">
                    {selectedStore.distanceText} · ⭐ {selectedStore.rating}
                  </p>

                  <p className="mt-1 line-clamp-1 text-[12px] text-gray-400">
                    {selectedStore.address}
                  </p>

                  <p className="mt-2 text-[12px] font-bold text-emerald-600">
                    {selectedStore.openUntil}까지 수령 가능
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 p-4 pt-3">
                <GreenButton
                  onClick={() =>
                    navigate(`/customer/stores/${selectedStore.id}`)
                  }
                >
                  매장 상세보기
                </GreenButton>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}