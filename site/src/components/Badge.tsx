import { Icon } from "./Icon";
import type { ReactNode } from "react";

export function Badge({
  icon,
  tone = "default",
  children,
}: {
  icon?: string;
  tone?: "default" | "eco";
  children: ReactNode;
}) {
  const toneClasses =
    tone === "eco" ? "bg-green-050 text-green-600" : "bg-blue-050 text-navy-800";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-bold ${toneClasses}`}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </span>
  );
}
