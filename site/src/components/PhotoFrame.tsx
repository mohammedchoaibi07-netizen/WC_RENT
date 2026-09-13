import { Icon } from "./Icon";

export function PhotoFrame({ ratio = "3 / 2", label }: { ratio?: string; label: string }) {
  return (
    <div
      className="flex items-center justify-center gap-2 bg-grey-100 px-4 text-center"
      style={{ aspectRatio: ratio }}
    >
      <Icon name="file-text" size={18} className="text-grey-400" />
      <span className="text-[13px] text-grey-500">{label}</span>
    </div>
  );
}
