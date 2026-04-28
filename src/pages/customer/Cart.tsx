import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { useSalezStore } from "../../store/useSalezStore";

export default function Cart() {
  const navigate = useNavigate();

  const cartItems = useSalezStore((state) => state.cartItems);
  const increaseCartItem = useSalezStore((state) => state.increaseCartItem);
  const decreaseCartItem = useSalezStore((state) => state.decreaseCartItem);
  const removeFromCart = useSalezStore((state) => state.removeFromCart);
  const clearCart = useSalezStore((state) => state.clearCart);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <CustomerHeader title="장바구니" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-32">
        {cartItems.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="text-[48px]">🛒</div>

            <h1 className="mt-4 text-[22px] font-black text-gray-900">
              장바구니가 비어있어요
            </h1>

            <p className="mt-2 text-[14px] text-gray-400">
              근처 매장의 마감 할인 상품을 담아보세요.
            </p>

            <div className="mt-6 w-full">
              <GreenButton onClick={() => navigate("/customer/home")}>
                상품 보러가기
              </GreenButton>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[15px] font-black text-gray-900">
                  총 {cartItems.length}개 상품
                </p>
                <p className="mt-1 text-[12px] font-semibold text-gray-400">
                  수량 {totalQuantity}개
                </p>
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="text-[13px] font-bold text-gray-400"
              >
                전체 삭제
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="rounded-3xl bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/customer/products/${item.product.id}`)
                      }
                      className="shrink-0"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-24 w-24 rounded-2xl object-cover"
                      />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/customer/products/${item.product.id}`)
                          }
                          className="min-w-0 text-left"
                        >
                          <p className="line-clamp-1 text-[12px] font-bold text-emerald-600">
                            {item.product.storeName}
                          </p>

                          <h2 className="mt-1 line-clamp-1 text-[17px] font-black text-gray-900">
                            {item.product.name}
                          </h2>
                        </button>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="shrink-0 text-[12px] font-bold text-gray-400"
                        >
                          삭제
                        </button>
                      </div>

                      <p className="mt-1 text-[12px] text-gray-400">
                        {item.product.pickupTime} 수령
                      </p>

                      <div className="mt-2 flex items-end gap-2">
                        <span className="text-[12px] text-gray-400 line-through">
                          {item.product.originalPrice.toLocaleString("ko-KR")}원
                        </span>

                        <span className="text-[17px] font-black text-emerald-600">
                          {item.product.salePrice.toLocaleString("ko-KR")}원
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => decreaseCartItem(item.product.id)}
                            className="h-8 w-8 rounded-full bg-gray-100 text-[18px] font-black"
                          >
                            -
                          </button>

                          <span className="text-[15px] font-black">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseCartItem(item.product.id)}
                            disabled={item.quantity >= item.product.stock}
                            className="h-8 w-8 rounded-full bg-emerald-500 text-[18px] font-black text-white disabled:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-[15px] font-black text-gray-900">
                          {(
                            item.product.salePrice * item.quantity
                          ).toLocaleString("ko-KR")}
                          원
                        </p>
                      </div>

                      <p className="mt-2 text-[11px] font-semibold text-gray-400">
                        남은 수량 {item.product.stock}개
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 border-t border-gray-100 bg-white p-5">
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-gray-500">
                  총 수량
                </span>

                <span className="text-[15px] font-black text-gray-900">
                  {totalQuantity}개
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-gray-500">
                  총 결제 금액
                </span>

                <span className="text-[24px] font-black text-gray-900">
                  {totalPrice.toLocaleString("ko-KR")}원
                </span>
              </div>
            </div>

            <GreenButton onClick={() => navigate("/customer/checkout")}>
              주문하기
            </GreenButton>
          </div>
        )}
      </main>
    </>
  );
}
