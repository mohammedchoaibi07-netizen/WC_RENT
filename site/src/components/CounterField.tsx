"use client";

import { Icon } from "./Icon";

export function CounterField({
  label,
  value,
  min = 0,
  max = 99,
  step = 1,
  suffix,
  onChange,
}: {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="grid gap-1.5">
      {label && <span className="text-[14px] font-bold text-navy-800">{label}</span>}
      <div className="flex h-14 items-center justify-between rounded-xl border border-grey-200 px-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - step))}
          disabled={value <= min}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-050 text-navy-800 disabled:opacity-40"
          aria-label="Diminuer"
        >
          <Icon name="minus" size={18} />
        </button>
        <span className="text-[16px] font-bold text-navy-800">
          {value} {suffix}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + step))}
          disabled={value >= max}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-050 text-navy-800 disabled:opacity-40"
          aria-label="Augmenter"
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
    </div>
  );
}
