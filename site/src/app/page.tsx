import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { NeedTile } from "@/components/NeedTile";
import { ReasonList } from "@/components/ReasonList";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { EcoNote } from "@/components/EcoNote";
import { CtaPanel } from "@/components/CtaPanel";
import { tickerItems, needs, reasons, testimonials, processSteps, assurances } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero : titre et accroche superposes a la photo (scrim blanc) pour rester
          entierement visibles au premier ecran, quelle que soit la hauteur du viewport. */}
      <section className="relative w-full">
        <div className="relative h-[580px] w-full overflow-hidden lg:h-[520px]">
          <Image
            src="/images/landing.png"
            alt="Technicien WC Rent Belgium en intervention d'entretien sur un site événementiel"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Scrim concentre sur la zone de texte ; le haut de la photo reste
              pleinement visible. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(255,255,255,0.99) 0%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.7) 32%, rgba(255,255,255,0.22) 48%, rgba(255,255,255,0) 64%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 pb-5 lg:pb-7">
            <Container className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end md:gap-10">
              <div className="grid gap-2.5">
                <p
                  className="m-0 text-[13px] font-extrabold uppercase tracking-[0.14em] text-blue-600"
                  style={{ textShadow: "0 1px 16px rgba(255,255,255,0.9)" }}
                >
                  Partout en Belgique
                </p>
                <h1
                  className="m-0 max-w-3xl text-[clamp(32px,6vw,60px)] font-extrabold leading-[1] tracking-[-0.03em] text-navy-900 text-wrap-balance"
                  style={{ textShadow: "0 2px 28px rgba(255,255,255,0.85), 0 1px 2px rgba(255,255,255,0.9)" }}
                >
                  Des sanitaires pour tous vos projets
                </h1>
                <p
                  className="max-w-xl text-[16px] leading-[1.4] text-grey-700 lg:text-[18px]"
                  style={{ textShadow: "0 1px 16px rgba(255,255,255,0.9)" }}
                >
                  Location de toilettes mobiles pour chantiers et événements. Nettoyage, entretien et débouchage
                  assurés par nos équipes.
                </p>
              </div>
              {/* CTA a droite du titre a partir de md, au-dessus de la ligne de flottaison. */}
              <div className="grid grid-cols-2 gap-3 sm:max-w-md md:flex md:w-56 md:flex-col">
                <Button href="/reserver" size="sm" block>
                  Réserver
                </Button>
                <Button href="/contact" variant="secondary" size="sm" block showArrow={false}>
                  Devis gratuit
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* Bande defilante d'infos clef, posee juste sur la ligne de flottaison. */}
      <Marquee items={tickerItems} />

      <section className="bg-grey-050 py-16 lg:py-24">
        <Container className="grid gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Nos solutions"
              title="Une cabine sanitaire, entretien compris"
              intro="Un seul modèle, éprouvé sur chantier comme en événement, livré nettoyé et prêt à l'emploi."
              link={{ label: "Voir toutes nos solutions", href: "/solutions" }}
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <ProductCard
                title="Toilette mobile autonome"
                description="Cabine à fosse, sans raccordement, pour un jour comme pour plusieurs mois."
                image="/images/hero.png"
                ctaLabel="Réserver"
                href="/reserver"
              />
            </Reveal>
            <Reveal delayMs={100}>
              <ProductCard
                title="Nettoyage, vidange et débouchage"
                description="Entretien programmé de nos cabines et interventions sur vos installations existantes."
                image="/images/service.png"
                ctaLabel="Voir le service"
                href="/solutions"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-10">
          <Reveal>
            <SectionHeading eyebrow="Pour qui" title="Nous équipons vos sites et vos événements" />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {needs.map((n, i) => (
              <Reveal key={n.label} delayMs={i * 60}>
                <NeedTile icon={n.icon} label={n.label} caption={n.caption} href="/contact" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-800 py-16 lg:py-24">
        <Container className="grid gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Pourquoi WC Rent ?"
              title="Un service tenu, du devis au dernier enlèvement"
              onDark
            />
          </Reveal>
          <Reveal delayMs={80}>
            <ReasonList items={reasons} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-grey-050 py-16 lg:py-24">
        <Container className="grid gap-10">
          <Reveal>
            <SectionHeading eyebrow="Avis clients" title="Ce que disent nos clients" />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delayMs={i * 80}>
                <TestimonialCard {...t} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <Reveal className="grid gap-8">
            <SectionHeading eyebrow="Comment ça marche ?" title="Quatre étapes, sans surprise" />
            <ProcessSteps steps={processSteps} />
          </Reveal>
          <Reveal delayMs={120}>
            <EcoNote
              body="Vidanges traitées en filière agréée et produits d'entretien biodégradables sur l'ensemble de notre parc."
              linkLabel="Notre engagement"
              href="/a-propos"
            />
          </Reveal>
        </Container>
      </section>

      <Reveal>
        <CtaPanel
          eyebrow="Un projet ? Un devis ?"
          title="Obtenez votre devis gratuit en moins de 24h"
          intro="Décrivez votre chantier ou votre événement : nous proposons le matériel et la fréquence d'entretien adaptés."
          assurances={assurances}
          href="/contact"
        />
      </Reveal>
    </>
  );
}
