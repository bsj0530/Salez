import { Outlet, useLocation, useNavigate } from "react-router";

import homeIcon from "../assets/home.png";
import saleIcon from "../assets/sale.png";
import cartIcon from "../assets/cart.png";
import mapIcon from "../assets/maps-and-flags.png";
import userIcon from "../assets/user.png";

const navItems = [
  {
    label: "홈",
    path: "/customer/home",
    icon: homeIcon,
  },
  {
    label: "세일나우",
    path: "/customer/sale",
    icon: saleIcon,
  },
  {
    label: "주문내역",
    path: "/customer/orders",
    icon: cartIcon,
  },
  {
    label: "지도",
    path: "/customer/map",
    icon: mapIcon,
  },
  {
    label: "MY",
    path: "/customer/my",
    icon: userIcon,
  },
];

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/customer/home") {
      return location.pathname === "/customer/home";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      <Outlet />

      <nav className="fixed bottom-0 left-1/2 z-[100] w-full max-w-[430px] -translate-x-1/2 border-t border-gray-200 bg-white px-2 pt-3 pb-[max(28px,calc(12px+env(safe-area-inset-bottom)))]">
        <div className="grid grid-cols-5">
          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center gap-1.5"
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={[
                    "h-6 w-6 object-contain transition",
                    active ? "scale-110 opacity-100" : "opacity-45",
                  ].join(" ")}
                />

                <span
                  className={[
                    "text-[10px] leading-none font-semibold",
                    active ? "text-emerald-700" : "text-gray-400",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
