import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { ReasonList } from "@/components/ReasonList";
import { Button } from "@/components/Button";
import { products, maintenance } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nos solutions — WC Rent Belgium",
  description: "Location, entretien et débouchage de sanitaires mobiles partout en Belgique.",
};

export default function SolutionsPage() {
  return (
    <>
      <section className="py-14 lg:py-20">
        <Container className="grid gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Nos solutions"
              title="Location, entretien et débouchage"
              level="h1"
              intro="Un seul modèle de cabine et un seul interlocuteur pour le matériel, le nettoyage et les interventions."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.title} delayMs={i * 80}>
                <ProductCard
                  title={p.title}
                  description={p.description}
                  image={p.image}
                  imageLabel={p.imageLabel}
                  ctaLabel={p.cta}
                  href={p.href}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-navy-800 py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <Reveal className="grid gap-6">
            <SectionHeading eyebrow="Services d'entretien" title="Nettoyage, vidange, débouchage" onDark />
            <div className="sm:max-w-xs">
              <Button href="/contact" variant="onDark" block showArrow={false}>
                Demander un devis gratuit
              </Button>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <ReasonList items={maintenance} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
