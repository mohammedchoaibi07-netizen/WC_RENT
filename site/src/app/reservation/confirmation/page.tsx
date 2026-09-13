import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Réservation confirmée — WC Rent Belgium",
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <section className="py-10 lg:py-16">
      <Container size="narrow" className="grid gap-4 justify-items-start">
        <Badge tone="eco" icon="check">
          Paiement confirmé
        </Badge>
        <h1 className="m-0 text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy-800">
          Votre réservation est enregistrée
        </h1>
        <p className="m-0 text-[17px] leading-[1.55] text-grey-700">
          {ref ? (
            <>
              Référence <strong>{ref}</strong>. Vous recevez la confirmation et la facture par e-mail, avec un lien de
              suivi de votre commande.
            </>
          ) : (
            "Vous recevez la confirmation et la facture par e-mail, avec un lien de suivi de votre commande."
          )}
        </p>
        <div className="w-full sm:max-w-xs">
          <Button href="/reserver" variant="secondary" block showArrow={false}>
            Faire une autre réservation
          </Button>
        </div>
      </Container>
    </section>
  );
}
