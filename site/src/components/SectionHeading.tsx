import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  onDark,
  link,
  size = "md",
  level = "h2",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  onDark?: boolean;
  link?: { label: string; href: string };
  /** "lg" pour les titres de hero / premiere section d'une page. */
  size?: "md" | "lg";
  /** "h1" uniquement pour le premier titre de la page (un seul par page). */
  level?: "h1" | "h2";
}) {
  const Title = level;
  const titleSize =
    size === "lg"
      ? "text-[clamp(34px,4.6vw,56px)] leading-[1.05]"
      : "text-[clamp(28px,3.4vw,42px)] leading-[1.1]";

  return (
    <div className="grid gap-4 text-left md:flex md:items-end md:justify-between md:gap-8">
      <div className="grid gap-4 md:max-w-[640px]">
        <p
          className={`m-0 text-[13px] font-bold uppercase tracking-[0.12em] ${
            onDark ? "text-white/70" : "text-blue-500"
          }`}
        >
          {eyebrow}
        </p>
        <Title
          className={`m-0 font-extrabold tracking-[-0.02em] text-wrap-balance ${titleSize} ${
            onDark ? "text-white" : "text-navy-800"
          }`}
        >
          {title}
        </Title>
        {intro && (
          <p className={`m-0 text-[17px] leading-[1.55] md:text-[18px] ${onDark ? "text-white/85" : "text-grey-700"}`}>
            {intro}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap text-[15px] font-bold text-blue-500 no-underline hover:text-blue-600"
        >
          {link.label} →
        </Link>
      )}
    </div>
  );
}
