import { Icon } from "./Icon";
import { Button } from "./Button";
import { Container } from "./Container";

export function CtaPanel({
  tone = "blue",
  eyebrow,
  title,
  intro,
  assurances,
  href,
}: {
  tone?: "blue" | "navy";
  eyebrow: string;
  title: string;
  intro: string;
  assurances: Array<{ icon: string; label: string }>;
  href: string;
}) {
  const bg = tone === "navy" ? "bg-navy-800" : "bg-blue-500";
  return (
    <section className={`py-14 lg:py-20 ${bg}`}>
      <Container className="grid gap-8 lg:grid-cols-[1.3fr_auto] lg:items-center lg:gap-14">
        <div className="grid gap-4">
          <p className="m-0 text-[13px] font-bold uppercase tracking-[0.12em] text-white/70">{eyebrow}</p>
          <h2 className="m-0 text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white text-wrap-balance">
            {title}
          </h2>
          <p className="m-0 max-w-xl text-[18px] leading-[1.5] text-white/85">{intro}</p>
          <div className="flex flex-wrap gap-5 pt-1">
            {assurances.map((a) => (
              <span key={a.label} className="flex items-center gap-1.5 text-[13px] font-semibold text-white/90">
                <Icon name={a.icon} size={16} />
                {a.label}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full sm:max-w-xs lg:w-auto">
          <Button href={href} variant="onDark" size="md" showArrow={false} block>
            Demander un devis gratuit
          </Button>
        </div>
      </Container>
    </section>
  );
}
