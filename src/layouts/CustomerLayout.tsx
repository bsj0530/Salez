import { Outlet, useLocation, useNavigate } from "react-router";
import { useSalezStore } from "../store/useSalezStore";

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = useSalezStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const bottomNav = [
    {
      label: "홈",
      icon: "🏠",
      path: "/customer/home",
      match: "/customer/home",
    },
    {
      label: "추천상품",
      icon: "☆",
      path: "/customer/products",
      match: "/customer/products",
    },
    {
      label: "주문내역",
      icon: "📋",
      path: "/customer/orders",
      match: "/customer/orders",
    },
    {
      label: "지도",
      icon: "📍",
      path: "/customer/map",
      match: "/customer/map",
    },
    {
      label: "MY",
      icon: "👤",
      path: "/customer/my",
      match: "/customer/my",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#f7f8f5] pb-20">
      <Outlet />

      <nav className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-between border-t border-gray-100 bg-white px-4 pt-2 pb-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
        {bottomNav.map((item) => {
          const isActive = location.pathname.startsWith(item.match);

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.path)}
              className={`relative flex w-full flex-col items-center gap-1 pb-1 ${
                isActive ? "text-emerald-800" : "text-gray-500"
              }`}
            >
              <span className="relative text-[22px] leading-none">
                {item.icon}

                {item.label === "추천상품" && cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-black text-white">
                    {cartCount}
                  </span>
                )}
              </span>

              <span className="text-[11px] font-black">{item.label}</span>

              {isActive && (
                <span className="absolute -top-2 h-1 w-9 rounded-full bg-emerald-800" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
