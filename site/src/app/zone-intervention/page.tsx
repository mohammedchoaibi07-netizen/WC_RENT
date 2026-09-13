import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { zoneRows } from "@/lib/content";

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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {zoneRows.map((z, i) => (
            <Reveal key={z.name} delayMs={i * 40}>
              <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-grey-200 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(8,43,82,0.08)]">
                <span className="text-[16px] font-bold text-navy-800">{z.name}</span>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-050 px-2.5 py-1 text-[13px] font-bold text-navy-800">
                  <Icon name="truck" size={14} className="text-blue-500" />
                  {z.delay}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="m-0 text-[15px] leading-[1.5] text-grey-500">
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
