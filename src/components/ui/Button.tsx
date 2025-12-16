import type { ButtonHTMLAttributes, ReactNode } from "react";

export default function Button({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      {...props}
      className={`px-5 py-2 rounded-md bg-accent text-white font-medium hover:bg-primary transition ${className}`}
    >
      {children}
    </button>
  );
}
