import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { getProductById } from "../../data/mockProducts";
import { useSalezStore } from "../../store/useSalezStore";
import type { OrderItem, StoreOrder } from "../../types/order";

function createShortOrderNumber(index: number) {
  const prefix = String.fromCharCode(65 + index);
  const number = Math.floor(100 + Math.random() * 900);

  return `${prefix}-${number}`;
}

export default function Checkout() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    createOrder,
    resetQuantity,
    cartItems,
    clearCart,
  } = useSalezStore();

  const singleProduct = productId ? getProductById(productId) : null;
  const isCartCheckout = !productId;

  const checkoutItems = isCartCheckout
    ? cartItems
    : singleProduct
      ? [{ product: singleProduct, quantity }]
      : [];

  const totalPrice = checkoutItems.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0,
  );

  const totalQuantity = checkoutItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const orderTitle =
    checkoutItems.length === 1
      ? checkoutItems[0].product.name
      : `${checkoutItems[0]?.product.name ?? "상품"} 외 ${
          checkoutItems.length - 1
        }개`;

  if (checkoutItems.length === 0) {
    return (
      <>
        <CustomerHeader title="주문 확인" showBack />

        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 pb-28 text-center">
          <div className="text-[48px]">🛒</div>

          <h1 className="mt-4 text-[22px] font-black text-gray-900">
            주문할 상품이 없어요
          </h1>

          <p className="mt-2 text-[14px] text-gray-400">
            장바구니에 상품을 담은 뒤 다시 시도해주세요.
          </p>

          <div className="mt-6 w-full">
            <GreenButton onClick={() => navigate("/customer/home")}>
              홈으로 돌아가기
            </GreenButton>
          </div>
        </main>
      </>
    );
  }

  const handlePayment = () => {
    const orderId = `ORD-${Date.now()}`;

    const orderItems: OrderItem[] = checkoutItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      storeId: item.product.storeId,
      storeName: item.product.storeName,
      quantity: item.quantity,
      price: item.product.salePrice,
      totalPrice: item.product.salePrice * item.quantity,
      pickupTime: item.product.pickupTime,
      address: item.product.address,
      imageUrl: item.product.imageUrl,
    }));

    const storeMap = new Map<string, OrderItem[]>();

    orderItems.forEach((item) => {
      const prev = storeMap.get(item.storeId) ?? [];
      storeMap.set(item.storeId, [...prev, item]);
    });

    const storeOrders: StoreOrder[] = Array.from(storeMap.entries()).map(
      ([storeId, items], index) => {
        const firstItem = items[0];

        return {
          storeId,
          storeName: firstItem.storeName,
          address: firstItem.address,
          pickupTime: firstItem.pickupTime,
          orderNumber: createShortOrderNumber(index),
          totalPrice: items.reduce((sum, item) => sum + item.totalPrice, 0),
          totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
          items,
        };
      },
    );

    createOrder({
      id: orderId,
      productId: checkoutItems[0].product.id,
      productName: orderTitle,
      storeName:
        storeOrders.length === 1
          ? storeOrders[0].storeName
          : `${storeOrders[0].storeName} 외 ${storeOrders.length - 1}곳`,
      quantity: totalQuantity,
      totalPrice,
      pickupTime: checkoutItems[0].product.pickupTime,
      address: checkoutItems[0].product.address,
      status: "paid",
      qrCode: orderId,
      items: orderItems,
      storeOrders,
    });

    if (isCartCheckout) {
      clearCart();
    }

    resetQuantity();
    navigate(`/customer/orders/${orderId}/complete`);
  };

  return (
    <>
      <CustomerHeader title="주문 확인" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-72">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-black text-gray-900">주문 상품</h2>

            <span className="text-[13px] font-bold text-emerald-600">
              총 {checkoutItems.length}개 상품
            </span>
          </div>

          <div className="mt-4 flex flex-col divide-y divide-gray-100">
            {checkoutItems.map((item) => (
              <div key={item.product.id} className="flex gap-4 py-4 first:pt-0">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold text-emerald-600">
                    {item.product.storeName}
                  </p>

                  <h3 className="mt-1 line-clamp-1 text-[17px] font-black text-gray-900">
                    {item.product.name}
                  </h3>

                  <p className="mt-1 text-[12px] text-gray-400">
                    {item.product.pickupTime} 수령
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[16px] font-black text-emerald-600">
                      {item.product.salePrice.toLocaleString("ko-KR")}원
                    </p>

                    <p className="text-[13px] font-bold text-gray-500">
                      수량 {item.quantity}개
                    </p>
                  </div>

                  <p className="mt-1 text-right text-[14px] font-black text-gray-900">
                    {(item.product.salePrice * item.quantity).toLocaleString(
                      "ko-KR",
                    )}
                    원
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {!isCartCheckout && singleProduct && (
          <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-[18px] font-black text-gray-900">수량</h2>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="h-11 w-11 rounded-full bg-gray-100 text-[22px] font-bold"
              >
                -
              </button>

              <span className="text-[22px] font-black">{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={quantity >= singleProduct.stock}
                className="h-11 w-11 rounded-full bg-emerald-500 text-[22px] font-bold text-white disabled:bg-gray-200"
              >
                +
              </button>
            </div>
          </section>
        )}

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">매장별 수령</h2>

          <div className="mt-4 flex flex-col gap-3">
            {Array.from(
              new Map(
                checkoutItems.map((item) => [
                  item.product.storeId,
                  item.product.storeName,
                ]),
              ).entries(),
            ).map(([storeId, storeName]) => {
              const items = checkoutItems.filter(
                (item) => item.product.storeId === storeId,
              );

              const storeTotal = items.reduce(
                (sum, item) => sum + item.product.salePrice * item.quantity,
                0,
              );

              const storeQuantity = items.reduce(
                (sum, item) => sum + item.quantity,
                0,
              );

              return (
                <div key={storeId} className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[15px] font-black text-gray-900">
                    {storeName}
                  </p>

                  <p className="mt-1 text-[12px] font-semibold text-gray-400">
                    상품 {items.length}개 · 수량 {storeQuantity}개
                  </p>

                  <p className="mt-2 text-[15px] font-black text-emerald-600">
                    {storeTotal.toLocaleString("ko-KR")}원
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">결제 수단</h2>

          <button
            type="button"
            className="mt-4 w-full rounded-2xl border-2 border-emerald-500 bg-emerald-50 px-4 py-4 text-left text-[15px] font-bold text-emerald-700"
          >
            간편 결제
          </button>
        </section>

<div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 bg-white px-5 pt-4 pb-[92px] shadow-[0_-10px_30px_rgba(0,0,0,0.04)]">          <div className="mb-4 space-y-2">
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

          <GreenButton onClick={handlePayment}>결제하기</GreenButton>
        </div>
      </main>
    </>
  );
}