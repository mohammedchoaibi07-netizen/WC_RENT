import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "onDark" | "phone";
type Size = "md" | "sm";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  icon?: string;
  showArrow?: boolean;
  disabled?: boolean;
  className?: string;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  onClick?: never;
  type?: never;
}

interface ClickButtonProps extends CommonProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
}

type ButtonProps = LinkButtonProps | ClickButtonProps;

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-blue-500 text-white hover:bg-blue-600 active:bg-[#00499A] shadow-[0_6px_16px_rgba(0,110,220,0.28)]",
  secondary: "bg-white text-navy-800 border border-blue-500 hover:bg-blue-050",
  onDark: "bg-white text-navy-800 hover:bg-blue-050",
  phone: "bg-blue-050 text-navy-800 hover:bg-blue-100",
};

const SIZE_CLASSES: Record<Size, string> = {
  md: "h-14 min-h-14 px-6 text-[16px]",
  sm: "h-11 min-h-11 px-5 text-[14px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  block,
  icon,
  showArrow = true,
  disabled,
  className,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-[12px] font-bold transition-colors duration-150",
    SIZE_CLASSES[size],
    block ? "w-full" : "",
    VARIANT_CLASSES[variant],
    disabled ? "opacity-50 pointer-events-none" : "cursor-pointer",
    className ?? "",
  ].join(" ");

  const content = (
    <>
      {icon && <Icon name={icon} size={20} />}
      <span>{children}</span>
      {showArrow && !icon && (
        <Icon name="arrow-right" size={18} className="transition-transform duration-150 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${classes} group`} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${classes} group`}>
      {content}
    </button>
  );
}
