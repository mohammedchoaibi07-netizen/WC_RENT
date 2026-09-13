import Image from "next/image";
import { PhotoFrame } from "./PhotoFrame";
import { Button } from "./Button";

export function ProductCard({
  title,
  description,
  image,
  imageLabel,
  ctaLabel,
  href,
}: {
  title: string;
  description: string;
  image?: string;
  imageLabel?: string;
  ctaLabel: string;
  href: string;
}) {
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-grey-200 bg-white shadow-[0_1px_2px_rgba(8,43,82,0.05),0_6px_16px_rgba(8,43,82,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(8,43,82,0.06),0_16px_32px_rgba(8,43,82,0.12)]">
      {image ? (
        <div className="relative h-[200px] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      ) : (
        <PhotoFrame ratio="16 / 9" label={imageLabel ?? title} />
      )}
      <div className="grid gap-3 p-5">
        <h3 className="m-0 text-[19px] font-extrabold tracking-[-0.02em] text-navy-800">{title}</h3>
        <p className="m-0 text-[15px] leading-[1.5] text-grey-700">{description}</p>
        <Button href={href} variant="secondary" block showArrow={false}>
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
