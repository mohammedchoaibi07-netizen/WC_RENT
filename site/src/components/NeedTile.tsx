import Link from "next/link";
import { Icon } from "./Icon";

export function NeedTile({
  icon,
  label,
  caption,
  href,
}: {
  icon: string;
  label: string;
  caption: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group grid gap-2 rounded-2xl border border-grey-200 p-4 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_10px_24px_rgba(8,43,82,0.08)]"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-050 text-navy-800 transition-colors duration-200 group-hover:bg-blue-500 group-hover:text-white">
        <Icon name={icon} size={20} />
      </span>
      <span className="text-[15px] font-bold text-navy-800">{label}</span>
      <span className="text-[13px] text-grey-500">{caption}</span>
    </Link>
  );
}
