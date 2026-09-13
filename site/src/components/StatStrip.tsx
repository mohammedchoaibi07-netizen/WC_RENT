import { Icon } from "./Icon";

export function StatStrip({
  items,
}: {
  items: Array<{ icon: string; value: string; label: string; tone?: "eco" }>;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 rounded-2xl border border-grey-200 p-4">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1 text-center">
          <Icon name={item.icon} size={20} className={item.tone === "eco" ? "text-green-600" : "text-blue-500"} />
          <span className="text-[18px] font-extrabold text-navy-800">{item.value}</span>
          <span className="text-[12px] text-grey-500 leading-tight">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
