import { useState } from "react";
import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { mockStores } from "../../data/mockProducts";
import { useMerchantStore } from "../../store/useMerchantStore";
import type { Product } from "../../types/product";

export default function ProductCreate() {
  const navigate = useNavigate();

  const selectedStoreId = useMerchantStore((state) => state.selectedStoreId);
  const createProduct = useMerchantStore((state) => state.createProduct);

  const store = mockStores.find((item) => item.id === selectedStoreId);

  const [name, setName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");
  const [pickupTime, setPickupTime] = useState("20:00");
  const [expiryDate, setExpiryDate] = useState("2026년 5월 1일");
  const [description, setDescription] = useState("");

  if (!selectedStoreId || !store) {
    return (
      <>
        <CustomerHeader title="상품 등록" showBack />
        <main className="px-5 py-10 text-center">
          <p className="text-gray-500">매장 선택이 필요합니다.</p>
        </main>
      </>
    );
  }

  const isValid =
    name.trim() !== "" &&
    originalPrice.trim() !== "" &&
    salePrice.trim() !== "" &&
    stock.trim() !== "";

  const handleSubmit = () => {
    if (!isValid) return;

    const original = Number(originalPrice);
    const sale = Number(salePrice);

    const discountRate = Math.round(((original - sale) / original) * 100);

    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      storeId: store.id,
      storeName: store.name,
      name,
      description: description || "매장에서 직접 등록한 마감 할인 상품입니다.",
      imageUrl:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800",
      originalPrice: original,
      salePrice: sale,
      discountRate,
      pickupTime,
      distance: store.distanceText,
      stock: Number(stock),
      storageMethod: "상온 보관",
      qualityNotice: "당일 판매 상품입니다.",
      rating: store.rating,
      address: store.address,
      lat: store.lat,
      lng: store.lng,
      category: "bread",
      expiryDate,
    };

    createProduct(newProduct);
    navigate("/store/products");
  };

  return (
    <>
      <CustomerHeader title="상품 등록" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-32">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold text-emerald-600">{store.name}</p>

          <h1 className="mt-1 text-[22px] font-black text-gray-900">
            마감 할인 상품 등록
          </h1>
        </section>

        <section className="mt-5 flex flex-col gap-4">
          <Input
            label="상품명"
            value={name}
            onChange={setName}
            placeholder="예: 마감 빵 랜덤박스"
          />
          <Input
            label="정가"
            value={originalPrice}
            onChange={setOriginalPrice}
            placeholder="예: 12000"
            type="number"
          />
          <Input
            label="할인가"
            value={salePrice}
            onChange={setSalePrice}
            placeholder="예: 5900"
            type="number"
          />
          <Input
            label="수량"
            value={stock}
            onChange={setStock}
            placeholder="예: 5"
            type="number"
          />
          <Input
            label="수령 시간"
            value={pickupTime}
            onChange={setPickupTime}
            placeholder="예: 20:00"
          />
          <Input
            label="유통기한"
            value={expiryDate}
            onChange={setExpiryDate}
            placeholder="예: 2026년 5월 1일"
          />

          <div>
            <label className="mb-2 block text-[13px] font-bold text-gray-700">
              상품 설명
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="상품 구성을 간단히 입력해주세요"
              className="h-28 w-full resize-none rounded-2xl bg-white px-4 py-4 text-[15px] shadow-sm ring-1 ring-gray-100 outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </section>

        <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 border-t border-gray-100 bg-white p-5">
          <GreenButton disabled={!isValid} onClick={handleSubmit}>
            등록하기
          </GreenButton>
        </div>
      </main>
    </>
  );
}

type InputProps = {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
};

function Input({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-bold text-gray-700">
        {label}
      </label>
      <input
        value={value}
        type={type}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-white px-4 py-4 text-[15px] shadow-sm ring-1 ring-gray-100 outline-none focus:ring-2 focus:ring-emerald-400"
      />
    </div>
  );
}
