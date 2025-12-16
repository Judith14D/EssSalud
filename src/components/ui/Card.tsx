import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg bg-white shadow-sm ring-1 ring-black/5 ${className}`}
    >
      {children}
    </div>
  );
}
