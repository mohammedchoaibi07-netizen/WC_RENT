import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { NeedTile } from "@/components/NeedTile";
import { ReasonList } from "@/components/ReasonList";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { EcoNote } from "@/components/EcoNote";
import { CtaPanel } from "@/components/CtaPanel";
import { ZonePostalLookup } from "@/components/ZonePostalLookup";
import {
  needs,
  reasons,
  testimonials,
  processSteps,
  assurances,
  COMPANY,
  HERO_PRICE_UNIT,
  heroPriceBenefits,
  heroAssurances,
  trustPoints,
} from "@/lib/content";

export default function HomePage() {
  const telHref = "tel:" + COMPANY.phone.replace(/\s/g, "");

  return (
    <>
      {/* Hero : le prix est le point focal de l'ecran, avant meme le titre —
          demande explicite du client, pas le traitement par defaut. Sur
          mobile, le contenu passe SOUS la photo en flux normal (fond blanc,
          pas de scrim) pour que les CTA restent au-dessus de la ligne de
          flottaison ; a partir de lg, il repasse en incrustation au bas de
          la photo, seul traitement ou une pleine hauteur d'ecran suffit. */}
      <section className="relative w-full lg:min-h-[510px]">
        <div className="relative h-[88px] w-full overflow-hidden sm:h-[300px] lg:absolute lg:inset-0 lg:h-auto">
          <Image
            src="/images/placeholder-hero.png"
            alt="Deux cabines sanitaires WC Rent Belgium installées sur un chantier de construction, technicien au travail à l'arrière-plan"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.96) 30%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.25) 68%, rgba(255,255,255,0) 80%)",
            }}
          />
        </div>
        <div className="relative bg-white py-2 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-transparent lg:py-0 lg:pb-4">
          <Container className="grid gap-2 lg:gap-2.5">
            <div className="grid gap-0.5 lg:gap-1.5 lg:max-w-2xl">
              <h1
                className="m-0 text-[clamp(20px,6vw,52px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-navy-900 text-wrap-balance"
              >
                Des sanitaires pour votre chantier. Simplement.
              </h1>
              <p className="m-0 text-[13px] leading-[1.3] text-grey-500 lg:text-[18px]">
                Un prix clair, une livraison rapide, entretien et reprise inclus.
              </p>
            </div>

            {/* Carte prix — seule surface blanche pleine du hero, l'ancre
                visuelle de l'écran. */}
            <div className="grid max-w-md gap-1.5 rounded-2xl bg-white p-2.5 shadow-[0_16px_40px_rgba(8,43,82,0.16)] lg:gap-3 lg:p-5">
              <div>
                <p className="m-0 text-[11.5px] font-bold text-grey-500 lg:text-[14px]">Cabine sanitaire standard</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[clamp(28px,9vw,72px)] font-extrabold leading-none tracking-[-0.02em] text-blue-500">
                    XX €
                  </span>
                  <span className="text-[13px] font-semibold text-grey-500 lg:text-[18px]">/ {HERO_PRICE_UNIT}</span>
                </div>
                <p className="m-0 mt-0.5 text-[11.5px] text-grey-700 lg:mt-1 lg:text-[15px]">
                  Livraison, entretien, reprise et TVA inclus.
                </p>
              </div>
              <ul className="m-0 grid grid-cols-2 list-none gap-x-3 gap-y-1 p-0 lg:flex lg:flex-col lg:gap-1.5">
                {heroPriceBenefits.map((b) => (
                  <li key={b.label} className="flex items-center gap-1.5 text-[11.5px] font-semibold text-navy-800 lg:gap-2.5 lg:text-[15px]">
                    <Icon name={b.icon} size={14} className="flex-none text-green-600 lg:hidden" />
                    <Icon name={b.icon} size={18} className="hidden flex-none text-green-600 lg:block" />
                    {b.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-1.5 sm:flex sm:flex-wrap">
              <Button href="/reserver" showArrow={false} block size="sm" className="sm:w-auto lg:!h-14 lg:!min-h-14 lg:!px-6 lg:!text-[16px]">
                Réserver maintenant
              </Button>
              <Button href={telHref} variant="phone" icon="phone" block size="sm" className="sm:w-auto lg:!h-14 lg:!min-h-14 lg:!px-6 lg:!text-[16px]">
                Appeler : {COMPANY.phone}
              </Button>
            </div>
          </Container>
        </div>
      </section>

      {/* Bande de reassurance en aplat, sous la photo — pas de scrim a gerer,
          contraste garanti quelle que soit la photo finale. */}
      <div className="border-t border-grey-200 bg-white py-6">
        <Container className="flex flex-wrap justify-center gap-x-8 gap-y-3 lg:justify-between">
          {heroAssurances.map((a) => (
            <span key={a.label} className="flex items-center gap-2 text-[14px] font-semibold text-navy-800">
              <Icon name={a.icon} size={18} className="flex-none text-blue-500" />
              {a.label}
            </span>
          ))}
        </Container>
      </div>

      {/* Bloc confiance — remplace la preuve sociale absente (BRIEF.md), donc
          juste sous le hero, pas relegue en pied de page. Pas d'eyebrow : un
          des tics generiques que ce round retire explicitement. */}
      <section className="bg-grey-050 py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-16">
          <Reveal className="grid gap-6">
            <div className="grid gap-2">
              <h2 className="m-0 text-[clamp(24px,3vw,32px)] font-extrabold tracking-[-0.02em] text-navy-800">
                Une entreprise belge, transparente dès le départ
              </h2>
              <p className="m-0 max-w-xl text-[16px] leading-[1.5] text-grey-700">
                WC Rent Belgium est une entreprise belge. Vous savez à qui vous confiez votre chantier.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
              {trustPoints.map((t) => (
                <div key={t.label} className="flex items-start gap-2.5">
                  <Icon name={t.icon} size={20} className="mt-0.5 flex-none text-blue-500" />
                  <div className="grid gap-0.5">
                    <span className="text-[14px] font-bold text-navy-800">{t.label}</span>
                    <span className="text-[13px] text-grey-500">{t.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delayMs={80} className="grid gap-3 rounded-2xl bg-white p-6">
            <p className="m-0 text-[14px] font-bold text-grey-500">Une question ? On vous répond.</p>
            <a href={telHref} className="text-[22px] font-extrabold text-navy-800 no-underline">
              {COMPANY.phone}
            </a>
            <p className="m-0 text-[14px] text-grey-500">Lun – Ven · 8h – 18h</p>
            <Link
              href="/contact"
              className="mt-1 inline-flex w-fit items-center gap-1.5 text-[15px] font-bold text-blue-500 no-underline hover:text-blue-600"
            >
              <span>Nous contacter</span>
              <Icon name="arrow-right" size={16} />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Zone d'intervention — teaser, pas de carte ici : elle reste sur
          /zone-intervention pour ne pas dupliquer le composant. */}
      <section className="bg-blue-050 py-16 lg:py-24">
        <Container size="narrow" className="grid gap-5">
          <div className="grid gap-2">
            <h2 className="m-0 text-[clamp(24px,3vw,32px)] font-extrabold tracking-[-0.02em] text-navy-800">
              Partout en Belgique, chez vous sous 24h
            </h2>
            <p className="m-0 max-w-xl text-[16px] leading-[1.5] text-grey-700">
              Indiquez votre code postal pour voir le délai exact de votre commune.
            </p>
          </div>
          <Reveal>
            <ZonePostalLookup />
          </Reveal>
          <Link
            href="/zone-intervention"
            className="inline-flex w-fit items-center gap-1.5 text-[15px] font-bold text-blue-600 no-underline hover:text-navy-800"
          >
            <span>Voir toutes les zones et délais</span>
            <Icon name="arrow-right" size={16} />
          </Link>
        </Container>
      </section>

      <section className="bg-grey-050 py-16 lg:py-24">
        <Container className="grid gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Nos solutions"
              title="Une cabine sanitaire, entretien compris"
              intro="Un seul modèle, éprouvé sur chantier comme en événement, livré nettoyé et prêt à l'emploi."
              link={{ label: "Voir toutes nos solutions", href: "/solutions" }}
              typewriter
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <ProductCard
                title="Toilette mobile autonome"
                description="Cabine à fosse, sans raccordement, pour un jour comme pour plusieurs mois."
                image="/images/placeholder-cabine.png"
                imageAlt="Cabine sanitaire WC Rent Belgium, vue de face sur fond neutre"
                imageFit="contain"
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
              typewriter
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
            <SectionHeading eyebrow="Comment ça marche ?" title="Quatre étapes, sans surprise" typewriter />
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
