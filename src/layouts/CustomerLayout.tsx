import { Outlet, useLocation, useNavigate } from "react-router";

import homeIcon from "../assets/home.png";
import starIcon from "../assets/star.png";
import orderIcon from "../assets/grid.png";
import mapIcon from "../assets/maps-and-flags.png";
import userIcon from "../assets/user.png";

const navItems = [
  {
    label: "홈",
    path: "/customer/home",
    icon: homeIcon,
  },
  {
    label: "추천상품",
    path: "/customer/products?category=recommend",
    icon: starIcon,
  },
  {
    label: "주문내역",
    path: "/customer/orders",
    icon: orderIcon,
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
    if (path.includes("?")) {
      const [pathname, search] = path.split("?");

      return location.pathname === pathname && location.search === `?${search}`;
    }

    if (path === "/customer/home") {
      return location.pathname === "/customer/home";
    }

    if (path === "/customer/products?category=recommend") {
      return (
        location.pathname === "/customer/products" &&
        location.search === "?category=recommend"
      );
    }

    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      <Outlet />

      <nav className="fixed bottom-0 left-1/2 z-[100] w-full max-w-[430px] -translate-x-1/2 border-t border-gray-100 bg-white px-4 pt-2 pb-3 shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-5 items-end">
          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center justify-center gap-1"
              >
                {active && (
                  <span className="absolute -top-2 h-1 w-8 rounded-full bg-emerald-700" />
                )}

                <div
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-2xl transition",
                    active ? "bg-emerald-50" : "bg-transparent",
                  ].join(" ")}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={[
                      "h-5 w-5 object-contain transition",
                      active ? "scale-110 opacity-100" : "opacity-65",
                    ].join(" ")}
                  />
                </div>

                <span
                  className={[
                    "text-[11px] font-black leading-none",
                    active ? "text-emerald-700" : "text-gray-500",
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