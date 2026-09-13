import { Icon } from "./Icon";

export function ReasonList({ items }: { items: Array<{ title: string; body: string }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {items.map((item) => (
        <div key={item.title} className="flex gap-4">
          <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/10 text-white">
            <Icon name="check" size={18} />
          </span>
          <div className="grid gap-1">
            <p className="m-0 text-[16px] font-bold text-white">{item.title}</p>
            <p className="m-0 text-[16px] leading-[1.5] text-white/80">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
