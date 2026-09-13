import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { BelgiumMap } from "@/components/BelgiumMap";
import { ZoneGrid } from "@/components/ZoneGrid";
import { ZonePostalLookup } from "@/components/ZonePostalLookup";

export const metadata: Metadata = {
  title: "Zone d'intervention — WC Rent Belgium",
  description: "Délais de livraison indicatifs par province, partout en Belgique.",
};

export default function ZonePage() {
  return (
    <section className="py-14 lg:py-24">
      <Container className="grid gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Zone d'intervention"
            title="Livraison dans tout le pays"
            level="h1"
            intro="Délais indicatifs pour une commande confirmée avant 14h."
          />
        </Reveal>
        <Reveal>
          <ZonePostalLookup />
        </Reveal>
        <Reveal>
          <BelgiumMap />
        </Reveal>
        <ZoneGrid />
        <p className="m-0 text-[16px] leading-[1.5] text-grey-500">
          Grand-Duché de Luxembourg et zones frontalières sur demande.
        </p>
        <div className="sm:max-w-xs">
          <Button href="/reserver" variant="secondary" block showArrow={false}>
            Vérifier ma disponibilité
          </Button>
        </div>
      </Container>
    </section>
  );
}
