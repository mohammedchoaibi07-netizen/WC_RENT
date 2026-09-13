import { Icon } from "./Icon";

export function TestimonialCard({
  quote,
  author,
  meta,
  rating,
}: {
  quote: string;
  author: string;
  meta: string;
  rating: number;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-grey-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(8,43,82,0.08)]">
      <span className="text-[32px] font-extrabold leading-none text-blue-500">&ldquo;</span>
      <p className="m-0 text-[16px] leading-[1.5] text-grey-700">{quote}</p>
      <div className="flex items-center gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Icon key={i} name="star" size={14} className="fill-amber-500 text-amber-500" />
        ))}
      </div>
      <p className="m-0 text-[14px] font-bold text-navy-800">
        {author} <span className="font-normal text-grey-500">— {meta}</span>
      </p>
    </div>
  );
}
