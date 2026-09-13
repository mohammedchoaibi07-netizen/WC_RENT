"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: Array<{ q: string; a: string }>;
  defaultOpen?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="grid gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="rounded-2xl border border-grey-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer bg-transparent border-0"
              aria-expanded={isOpen}
            >
              <span className="text-[16px] font-bold text-navy-800">{item.q}</span>
              <Icon
                name="chevron-down"
                size={20}
                className={`flex-none text-blue-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 -mt-1">
                <p className="m-0 text-[16px] leading-[1.5] text-grey-700">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
