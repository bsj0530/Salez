import { Outlet } from "react-router";

type GlobalLayoutProps = {
  appType?: "customer" | "store";
};

export default function GlobalLayout({ appType }: GlobalLayoutProps) {
  return (
    <div
      data-app-type={appType}
      className="min-h-screen bg-gray-100 text-gray-900"
    >
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}
