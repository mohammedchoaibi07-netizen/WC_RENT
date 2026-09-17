import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  onDark,
  link,
  level = "h2",
  typewriter = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  onDark?: boolean;
  link?: { label: string; href: string };
  /** "h1" uniquement pour le premier titre de la page (un seul par page). */
  level?: "h1" | "h2";
  /**
   * Effet machine à écrire au premier passage dans le viewport (déclenché
   * par l'IntersectionObserver de Reveal.tsx, pas un second). À réserver à
   * 2-3 titres par page — un accent, pas un réflexe systématique.
   */
  typewriter?: boolean;
}) {
  const Title = level;
  const steps = Math.max(8, Math.min(40, title.length));
  const durationMs = Math.max(500, Math.min(1600, title.length * 35));

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
          className={`m-0 font-extrabold tracking-[-0.02em] text-wrap-balance text-[clamp(28px,3.4vw,42px)] leading-[1.1] ${
            onDark ? "text-white" : "text-navy-800"
          } ${typewriter ? "type-reveal" : ""}`}
          style={
            typewriter
              ? { animationTimingFunction: `steps(${steps}, end)`, animationDuration: `${durationMs}ms` }
              : undefined
          }
        >
          {title}
        </Title>
        {intro && (
          <p className={`m-0 text-[18px] leading-[1.55] ${onDark ? "text-white/85" : "text-grey-700"}`}>
            {intro}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap text-[16px] font-bold text-blue-500 no-underline hover:text-blue-600"
        >
          {link.label} →
        </Link>
      )}
    </div>
  );
}
