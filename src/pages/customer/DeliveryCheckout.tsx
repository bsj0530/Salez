import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CustomerHeader from "../../components/customer/CustomerHeader";
import GreenButton from "../../components/customer/GreenButton";
import { getDeliveryProductById } from "../../data/mockProducts";
import { useSalezStore } from "../../store/useSalezStore";

export default function DeliveryCheckout() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = productId ? getDeliveryProductById(productId) : null;

  const createOrder = useSalezStore((state) => state.createOrder);

  const [quantity, setQuantity] = useState(1);
  const [receiverName, setReceiverName] = useState("채희운");
  const [phone, setPhone] = useState("010-1234-5678");
  const [address, setAddress] = useState("혜화로 8길 15");
  const [detailAddress, setDetailAddress] = useState("");

  const deliveryFee = 3000;

  const productTotal = useMemo(() => {
    if (!product) return 0;
    return product.salePrice * quantity;
  }, [product, quantity]);

  const finalTotal = productTotal + deliveryFee;

  if (!product) {
    return (
      <>
        <CustomerHeader title="배송 주문" showBack />

        <main className="min-h-screen bg-gray-50 px-5 py-10 text-center">
          <p className="text-gray-500">배송 상품 정보를 찾을 수 없습니다.</p>
        </main>
      </>
    );
  }

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(product.stock, prev + 1));
  };

  const handlePayment = () => {
    const orderId = `DEL-${Date.now()}`;
    const fullAddress = `${address} ${detailAddress}`.trim();

    createOrder({
      id: orderId,
      productId: product.id,
      productName: product.name,
      storeName: product.storeName,
      quantity,
      totalPrice: finalTotal,
      pickupTime: product.pickupTime,
      address: fullAddress,
      status: "paid",
      qrCode: orderId,
      items: [
        {
          productId: product.id,
          productName: product.name,
          storeId: product.storeId,
          storeName: product.storeName,
          quantity,
          price: product.salePrice,
          totalPrice: product.salePrice * quantity,
          pickupTime: "배송",
          address: fullAddress,
          imageUrl: product.imageUrl,
        },
      ],
      storeOrders: [
        {
          storeId: product.storeId,
          storeName: product.storeName,
          address: fullAddress,
          pickupTime: product.pickupTime,
          orderNumber: "D-001",
          totalPrice: finalTotal,
          totalQuantity: quantity,
          items: [
            {
              productId: product.id,
              productName: product.name,
              storeId: product.storeId,
              storeName: product.storeName,
              quantity,
              price: product.salePrice,
              totalPrice: product.salePrice * quantity,
              pickupTime: "배송",
              address: fullAddress,
              imageUrl: product.imageUrl,
            },
          ],
        },
      ],
    });

    navigate(`/customer/orders/${orderId}/complete`);
  };

  return (
    <>
      <CustomerHeader title="배송 주문" showBack />

      <main className="min-h-screen bg-gray-50 px-5 pt-5 pb-80">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex gap-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-24 w-24 shrink-0 rounded-2xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-bold text-emerald-600">
                산지배송 · {product.address}
              </p>

              <h1 className="mt-1 line-clamp-2 text-[18px] font-black text-gray-900">
                {product.name}
              </h1>

              <p className="mt-2 text-[13px] font-semibold text-gray-400">
                {product.pickupTime}
              </p>

              <div className="mt-2 flex items-end gap-2">
                <span className="rounded-md bg-red-600 px-2 py-1 text-[13px] font-black text-white">
                  {product.discountRate}%
                </span>

                <span className="text-[22px] font-black text-red-600">
                  {product.salePrice.toLocaleString("ko-KR")}원
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">수량</h2>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handleDecrease}
              className="h-11 w-11 rounded-full bg-gray-100 text-[22px] font-bold"
            >
              -
            </button>

            <span className="text-[22px] font-black">{quantity}</span>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={quantity >= product.stock}
              className="h-11 w-11 rounded-full bg-emerald-500 text-[22px] font-bold text-white disabled:bg-gray-200"
            >
              +
            </button>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-black text-gray-900">배송지</h2>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-black text-emerald-700">
              기본 배송지
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <label className="block">
              <span className="text-[13px] font-bold text-gray-500">
                받는 사람
              </span>
              <input
                value={receiverName}
                onChange={(event) => setReceiverName(event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl bg-gray-50 px-4 text-[15px] font-bold outline-none"
              />
            </label>

            <label className="block">
              <span className="text-[13px] font-bold text-gray-500">
                연락처
              </span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl bg-gray-50 px-4 text-[15px] font-bold outline-none"
              />
            </label>

            <label className="block">
              <span className="text-[13px] font-bold text-gray-500">주소</span>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl bg-gray-50 px-4 text-[15px] font-bold outline-none"
              />
            </label>

            <label className="block">
              <span className="text-[13px] font-bold text-gray-500">
                상세 주소
              </span>
              <input
                value={detailAddress}
                onChange={(event) => setDetailAddress(event.target.value)}
                placeholder="동, 호수 등을 입력해주세요"
                className="mt-2 h-12 w-full rounded-2xl bg-gray-50 px-4 text-[15px] font-bold outline-none placeholder:text-gray-400"
              />
            </label>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">배송 안내</h2>

          <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
            <p className="text-[15px] font-black text-emerald-800">
              🚚 {product.pickupTime}
            </p>

            <p className="mt-1 text-[13px] leading-5 font-semibold text-emerald-700/80">
              산지 농산물은 입력한 배송지로 발송돼요. 매장 방문 수령 상품과
              별도로 주문됩니다.
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-[18px] font-black text-gray-900">결제 금액</h2>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-[14px] font-bold text-gray-500">
              <span>상품 금액</span>
              <span>{productTotal.toLocaleString("ko-KR")}원</span>
            </div>

            <div className="flex justify-between text-[14px] font-bold text-gray-500">
              <span>배송비</span>
              <span>{deliveryFee.toLocaleString("ko-KR")}원</span>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-[16px] font-black text-gray-900">
                  총 결제 금액
                </span>

                <span className="text-[24px] font-black text-red-600">
                  {finalTotal.toLocaleString("ko-KR")}원
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 bg-white px-5 pt-4 pb-[92px] shadow-[0_-10px_30px_rgba(0,0,0,0.04)]">
          <GreenButton onClick={handlePayment}>
            {finalTotal.toLocaleString("ko-KR")}원 결제하기
          </GreenButton>
        </div>
      </main>
    </>
  );
}
