import { Icon } from "./Icon";

export function FeatureRow({ items }: { items: Array<{ icon: string; label: string }> }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-050 text-navy-800">
            <Icon name={item.icon} size={22} />
          </span>
          <span className="text-[13px] font-semibold text-navy-800">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
