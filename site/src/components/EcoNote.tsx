import Link from "next/link";
import { Icon } from "./Icon";

export function EcoNote({
  body,
  linkLabel,
  href,
}: {
  body: string;
  linkLabel: string;
  href: string;
}) {
  return (
    <div className="grid gap-3 rounded-2xl bg-green-050 p-5">
      <Icon name="leaf" size={22} className="text-green-600" />
      <p className="m-0 text-[16px] leading-[1.5] text-grey-700">{body}</p>
      <Link href={href} className="text-[14px] font-bold text-green-600 no-underline">
        {linkLabel} →
      </Link>
    </div>
  );
}
