import Link from "next/link";
import { Icon } from "./Icon";
import { COMPANY } from "@/lib/content";

export function StickyActionBar() {
  const telHref = "tel:" + COMPANY.phone.replace(/\s/g, "");

  return (
    <div className="sticky bottom-0 z-40 flex h-[72px] items-stretch gap-2 border-t border-grey-200 bg-white px-3 py-2 shadow-[0_-6px_24px_rgba(8,43,82,0.10)] lg:hidden">
      <a
        href={telHref}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg text-navy-800 no-underline hover:bg-grey-050"
      >
        <Icon name="phone" size={20} />
        <span className="text-[12px] font-semibold">Appeler</span>
      </a>
      <Link
        href="/contact"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg text-navy-800 no-underline hover:bg-grey-050"
      >
        <Icon name="file-text" size={20} />
        <span className="text-[12px] font-semibold">Devis</span>
      </Link>
      <Link
        href="/reserver"
        className="flex flex-[1.4] items-center justify-center gap-2 rounded-lg bg-blue-500 text-white no-underline shadow-[0_6px_16px_rgba(0,110,220,0.28)]"
      >
        <Icon name="message-circle" size={18} />
        <span className="text-[14px] font-bold">Réserver</span>
      </Link>
    </div>
  );
}
