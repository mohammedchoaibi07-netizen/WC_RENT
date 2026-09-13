"use client";

export function TextField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  hint,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[14px] font-bold text-navy-800">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 rounded-lg border border-grey-200 px-4 text-[16px] text-navy-800 outline-none focus:border-blue-500 focus:ring-[3px] focus:ring-[#7FB6F5]"
      />
      {hint && <span className="text-[13px] text-grey-500">{hint}</span>}
    </label>
  );
}
