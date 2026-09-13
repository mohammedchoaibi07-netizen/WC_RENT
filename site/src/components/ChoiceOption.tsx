"use client";

import { Icon } from "./Icon";

export function ChoiceOption({
  icon,
  label,
  description,
  selected,
  onSelect,
}: {
  icon?: string;
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors ${
        selected ? "border-[1.5px] border-blue-500 bg-blue-050" : "border-grey-200 bg-white hover:bg-grey-050"
      }`}
    >
      {icon && (
        <span
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg ${
            selected ? "bg-blue-500 text-white" : "bg-blue-050 text-navy-800"
          }`}
        >
          <Icon name={icon} size={18} />
        </span>
      )}
      <span className="grid gap-0.5">
        <span className="text-[16px] font-bold text-navy-800">{label}</span>
        {description && <span className="text-[13px] text-grey-500">{description}</span>}
      </span>
      {selected && <Icon name="check" size={18} className="ml-auto flex-none text-blue-500" />}
    </button>
  );
}
