import type { ButtonHTMLAttributes, ReactNode } from "react";

type GreenButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
};

export default function GreenButton({
  children,
  variant = "solid",
  className = "",
  ...props
}: GreenButtonProps) {
  const base =
    "w-full rounded-2xl px-4 py-4 text-[15px] font-bold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";

  const variants = {
    solid: "bg-emerald-500 text-white hover:bg-emerald-600",
    outline:
      "border border-emerald-500 bg-white text-emerald-600 hover:bg-emerald-50",
    ghost: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
