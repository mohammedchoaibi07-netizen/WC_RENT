import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Button } from "@/components/Button";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — WC Rent Belgium",
  description: "Questions fréquentes sur la location, l'entretien et le débouchage de sanitaires mobiles.",
};

export default function FaqPage() {
  const half = Math.ceil(faq.length / 2);
  const left = faq.slice(0, half);
  const right = faq.slice(half);

  return (
    <section className="py-14 lg:py-24">
      <Container className="grid gap-10">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Questions fréquentes" level="h1" />
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <Reveal delayMs={80}>
            <FaqAccordion items={left} defaultOpen={0} />
          </Reveal>
          <Reveal delayMs={140}>
            <FaqAccordion items={right} defaultOpen={null} />
          </Reveal>
        </div>
        <div className="sm:max-w-xs">
          <Button href="/contact" variant="secondary" icon="message-circle" showArrow={false} block>
            Poser une autre question
          </Button>
        </div>
      </Container>
    </section>
  );
}
