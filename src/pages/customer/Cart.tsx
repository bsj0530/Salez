import { useNavigate } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { useSalezStore } from "../../store/useSalezStore";

function isDeliveryProduct(product: any) {
  return (
    product.deliveryType === "delivery" ||
    product.isDelivery === true ||
    product.fulfillmentType === "delivery" ||
    product.saleChannel === "delivery"
  );
}

export default function Cart() {
  const navigate = useNavigate();

  const cartItems = useSalezStore((state) => state.cartItems);
  const increaseCartItem = useSalezStore((state) => state.increaseCartItem);
  const decreaseCartItem = useSalezStore((state) => state.decreaseCartItem);
  const removeFromCart = useSalezStore((state) => state.removeFromCart);
  const clearCart = useSalezStore((state) => state.clearCart);

  const deliveryItems = cartItems.filter((item) =>
    isDeliveryProduct(item.product),
  );

  const pickupItems = cartItems.filter(
    (item) => !isDeliveryProduct(item.product),
  );

  const pickupTotalPrice = pickupItems.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0,
  );

  const pickupTotalQuantity = pickupItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const deliveryTotalPrice = deliveryItems.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0,
  );

  const deliveryTotalQuantity = deliveryItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const totalPrice = pickupTotalPrice + deliveryTotalPrice;
  const totalQuantity = pickupTotalQuantity + deliveryTotalQuantity;

  const handleProductClick = (item: (typeof cartItems)[number]) => {
    if (isDeliveryProduct(item.product)) {
      navigate(`/customer/delivery-checkout/${item.product.id}`);
      return;
    }

    navigate(`/customer/products/${item.product.id}`);
  };

  const renderCartItem = (item: (typeof cartItems)[number]) => {
    const isDelivery = isDeliveryProduct(item.product);

    return (
      <div key={item.product.id} className="rounded-3xl bg-white p-4 shadow-sm">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleProductClick(item)}
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
                onClick={() => handleProductClick(item)}
                className="min-w-0 text-left"
              >
                <p
                  className={[
                    "line-clamp-1 text-[12px] font-bold",
                    isDelivery ? "text-blue-500" : "text-emerald-600",
                  ].join(" ")}
                >
                  {isDelivery ? "SALEZ 배송" : item.product.storeName}
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
              {isDelivery
                ? "내일 새벽 도착 예정"
                : `${item.product.pickupTime} 수령`}
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-[12px] text-gray-400 line-through">
                {item.product.originalPrice.toLocaleString("ko-KR")}원
              </span>

              <span
                className={[
                  "text-[17px] font-black",
                  isDelivery ? "text-red-600" : "text-emerald-600",
                ].join(" ")}
              >
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

                <span className="text-[15px] font-black">{item.quantity}</span>

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
                {(item.product.salePrice * item.quantity).toLocaleString(
                  "ko-KR",
                )}
                원
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold text-gray-400">
                남은 수량 {item.product.stock}개
              </p>

              {isDelivery && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/customer/delivery-checkout/${item.product.id}`)
                  }
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-[12px] font-black text-blue-600"
                >
                  배송 주문
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <CustomerHeader title="장바구니" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-80">
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
                  수량 {totalQuantity}개 · {totalPrice.toLocaleString("ko-KR")}
                  원
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

            {deliveryItems.length > 0 && (
              <section className="mb-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-[18px] font-black text-gray-900">
                      배송 상품
                    </h2>

                    <p className="mt-1 text-[12px] font-semibold text-gray-400">
                      입력한 주소로 배송되는 상품이에요.
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[12px] font-black text-blue-600">
                    {deliveryItems.length}개
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {deliveryItems.map(renderCartItem)}
                </div>
              </section>
            )}

            {pickupItems.length > 0 && (
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-[18px] font-black text-gray-900">
                      매장 수령 상품
                    </h2>

                    <p className="mt-1 text-[12px] font-semibold text-gray-400">
                      매장에서 QR 확인 후 수령하는 상품이에요.
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-black text-emerald-600">
                    {pickupItems.length}개
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {pickupItems.map(renderCartItem)}
                </div>
              </section>
            )}
          </>
        )}

        {pickupItems.length > 0 && (
          <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 bg-white px-5 pt-4 pb-[92px] shadow-[0_-10px_30px_rgba(0,0,0,0.04)]">
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-gray-500">
                  매장 수령 수량
                </span>

                <span className="text-[15px] font-black text-gray-900">
                  {pickupTotalQuantity}개
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-gray-500">
                  매장 수령 결제 금액
                </span>

                <span className="text-[24px] font-black text-gray-900">
                  {pickupTotalPrice.toLocaleString("ko-KR")}원
                </span>
              </div>
            </div>

            <GreenButton onClick={() => navigate("/customer/checkout")}>
              매장 수령 주문하기
            </GreenButton>
          </div>
        )}

        {pickupItems.length === 0 && deliveryItems.length > 0 && (
          <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 bg-white px-5 pt-4 pb-[92px] shadow-[0_-10px_30px_rgba(0,0,0,0.04)]">
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-gray-500">
                  배송 상품 수량
                </span>

                <span className="text-[15px] font-black text-gray-900">
                  {deliveryTotalQuantity}개
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-gray-500">
                  배송 상품 금액
                </span>

                <span className="text-[24px] font-black text-red-600">
                  {deliveryTotalPrice.toLocaleString("ko-KR")}원
                </span>
              </div>
            </div>

            <GreenButton
              onClick={() =>
                navigate(
                  `/customer/delivery-checkout/${deliveryItems[0].product.id}`,
                )
              }
            >
              배송 주문하기
            </GreenButton>
          </div>
        )}
      </main>
    </>
  );
}
