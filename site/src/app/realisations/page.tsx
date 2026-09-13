import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { PhotoFrame } from "@/components/PhotoFrame";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Réalisations — WC Rent Belgium",
  description: "Chantiers et événements équipés par WC Rent Belgium.",
};

export default function RealisationsPage() {
  return (
    <section className="py-14 lg:py-24">
      <Container className="grid gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Réalisations"
            title="Chantiers et événements équipés"
            level="h1"
            intro="Quelques installations récentes, du chantier de logements au festival de plusieurs jours."
          />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((pj, i) => (
            <Reveal key={pj.title} delayMs={i * 80}>
              <article className="grid gap-3">
                <PhotoFrame ratio="3 / 2" label={pj.imageLabel} />
                <div className="flex items-start justify-between gap-3">
                  <div className="grid gap-1">
                    <h3 className="m-0 text-[18px] font-extrabold tracking-[-0.02em] text-navy-800">{pj.title}</h3>
                    <p className="m-0 text-[16px] leading-[1.5] text-grey-700">{pj.body}</p>
                  </div>
                  <span className="flex-none text-xs font-bold uppercase tracking-[0.10em] text-grey-500">{pj.place}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
