import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { getProductById } from "../../data/mockProducts";
import { useSalezStore } from "../../store/useSalezStore";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isAdded, setIsAdded] = useState(false);

  const product = getProductById(productId ?? "");
  const addToCart = useSalezStore((state) => state.addToCart);
  const cartItems = useSalezStore((state) => state.cartItems);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!product) {
    return (
      <>
        <CustomerHeader title="상품 상세" showBack />
        <main className="px-5 py-10 text-center">
          <p className="text-gray-500">상품을 찾을 수 없습니다.</p>
        </main>
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsAdded(true);

    window.setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <>
      <CustomerHeader title="상품 상세" showBack />

      <main className="min-h-screen bg-white pb-32">
        <div className="h-72 w-full bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <section className="px-5 py-5">
          <p className="text-[14px] font-bold text-emerald-600">
            {product.storeName} · {product.distance}
          </p>

          <h1 className="mt-2 text-[26px] font-black text-gray-900">
            {product.name}
          </h1>

          <p className="mt-2 text-[14px] leading-6 text-gray-500">
            {product.description}
          </p>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-[15px] text-gray-400 line-through">
              {product.originalPrice.toLocaleString("ko-KR")}원
            </span>

            <span className="text-[28px] font-black text-emerald-600">
              {product.salePrice.toLocaleString("ko-KR")}원
            </span>

            <span className="mb-1 rounded-full bg-emerald-50 px-2 py-1 text-[12px] font-bold text-emerald-700">
              {product.discountRate}% 할인
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-[12px] font-semibold text-gray-400">
                유통기한
              </p>
              <p className="mt-1 text-[17px] font-black text-gray-900">
                {product.expiryDate}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-[12px] font-semibold text-gray-400">
                남은 수량
              </p>
              <p className="mt-1 text-[17px] font-black text-gray-900">
                {product.stock}개
              </p>
            </div>
          </div>
        </section>

        {isAdded && (
          <div className="fixed bottom-[104px] left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-5">
            <div className="rounded-2xl bg-gray-900 px-4 py-3 text-center text-[14px] font-bold text-white shadow-xl">
              장바구니에 담겼어요
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 border-t border-gray-100 bg-white p-5">
          {cartCount > 0 && (
            <button
              type="button"
              onClick={() => navigate("/customer/cart")}
              className="mb-3 w-full rounded-2xl bg-gray-100 py-3 text-[14px] font-black text-gray-700"
            >
              🛒 장바구니 {cartCount}개 보기
            </button>
          )}

          <div className="grid grid-cols-[1fr_1.4fr] gap-3">
            <GreenButton variant="outline" onClick={handleAddToCart}>
              담기
            </GreenButton>

            <GreenButton
              onClick={() => navigate(`/customer/checkout/${product.id}`)}
            >
              바로 결제
            </GreenButton>
          </div>
        </div>
      </main>
    </>
  );
}
