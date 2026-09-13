import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { PhotoFrame } from "@/components/PhotoFrame";
import { StatStrip } from "@/components/StatStrip";
import { ReasonList } from "@/components/ReasonList";
import { stats, reasons } from "@/lib/content";

export const metadata: Metadata = {
  title: "À propos — WC Rent Belgium",
  description: "Une équipe belge, un parc entretenu, partout dans les dix provinces.",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-14 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal className="grid gap-6">
              <SectionHeading eyebrow="À propos" title="Une équipe belge, un parc entretenu" level="h1" />
              <p className="m-0 max-w-xl text-[17px] leading-[1.55] text-grey-700">
                WC Rent Belgium loue des sanitaires mobiles partout en Belgique et assure leur entretien. Nous
                livrons, plaçons, nettoyons selon la fréquence convenue et intervenons en cas de bouchon ou de panne.
              </p>
              <p className="m-0 max-w-xl text-[17px] leading-[1.55] text-grey-700">
                Chaque unité est contrôlée au retour : châssis, ventilation, pompe et désinfection complète. Nos
                techniciens couvrent les dix provinces avec des véhicules équipés pour la vidange et le débouchage.
              </p>
              <StatStrip items={stats} />
            </Reveal>
            <Reveal delayMs={100}>
              <PhotoFrame ratio="4 / 3" label="Photo : équipe et camion de service" />
            </Reveal>
          </div>
        </Container>
      </section>
      <section className="bg-navy-800 py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Nos engagements" title="Ce sur quoi vous pouvez compter" onDark />
          </Reveal>
          <Reveal delayMs={100}>
            <ReasonList items={reasons} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
