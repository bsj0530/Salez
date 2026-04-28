import { useNavigate } from "react-router";

type CustomerHeaderProps = {
  title?: string;
  showBack?: boolean;
};

export default function CustomerHeader({
  title = "SALEZ",
  showBack = false,
}: CustomerHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg"
          >
            ←
          </button>
        )}

        <h1 className="text-[20px] font-extrabold text-green-900">{title}</h1>
      </div>
    </header>
  );
}
