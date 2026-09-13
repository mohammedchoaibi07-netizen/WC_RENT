"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { formatDateFr, formatEur } from "@/lib/format";
import { api, ApiError } from "@/lib/api";

interface OrderTracking {
  reference: string;
  status: string;
  dateDebut: string;
  dateFin: string;
  nbCabines: number;
  adresseVille: string;
  montantTotal: string;
  moyenPaiement: string | null;
}

const STATUS_LABELS: Record<string, string> = {
  brouillon: "Brouillon",
  en_attente_paiement: "En attente de paiement",
  payee: "Payée",
  planifiee: "Livraison planifiée",
  livree: "Livrée",
  en_cours: "En cours de location",
  a_enlever: "À enlever",
  cloturee: "Clôturée",
  annulee: "Annulée",
  remboursee: "Remboursée",
};

export function SuiviView({ orderRef, token }: { orderRef?: string; token?: string }) {
  const [order, setOrder] = useState<OrderTracking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(orderRef && token));

  useEffect(() => {
    if (!orderRef || !token) return;
    api
      .get<OrderTracking>(`/orders/${orderRef}?token=${encodeURIComponent(token)}`)
      .then(setOrder)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Suivi indisponible."))
      .finally(() => setLoading(false));
  }, [orderRef, token]);

  if (!orderRef || !token) {
    return (
      <section className="py-10 lg:py-16">
        <Container size="narrow" className="grid gap-4">
          <SectionHeading eyebrow="Suivi de commande" title="Lien de suivi manquant" level="h1" />
          <p className="m-0 text-[15px] leading-[1.5] text-grey-700">
            Le lien de suivi complet (référence et jeton) vous est envoyé par e-mail dès que votre paiement est
            confirmé.
          </p>
          <div className="sm:max-w-xs">
            <Button href="/contact" variant="secondary" block showArrow={false}>
              Nous contacter
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 lg:py-16">
      <Container size="narrow" className="grid gap-4">
        <SectionHeading eyebrow="Suivi de commande" title={`Commande ${orderRef}`} level="h1" />
        {loading && <p className="m-0 text-[15px] text-grey-500">Chargement...</p>}
        {error && <p className="m-0 text-[15px] text-red-600">{error}</p>}
        {order && (
          <div className="grid gap-3 rounded-2xl border border-grey-200 p-5">
            <Badge>{STATUS_LABELS[order.status] ?? order.status}</Badge>
            <Row label="Livraison" value={formatDateFr(order.dateDebut)} />
            <Row label="Enlèvement" value={formatDateFr(order.dateFin)} />
            <Row label="Adresse" value={order.adresseVille} />
            <Row label="Cabines" value={String(order.nbCabines)} />
            <Row label="Total TTC" value={formatEur(Number(order.montantTotal))} />
            {order.moyenPaiement && <Row label="Paiement" value={order.moyenPaiement} />}
          </div>
        )}
      </Container>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[15px]">
      <span className="text-grey-500">{label}</span>
      <span className="font-bold text-navy-800">{value}</span>
    </div>
  );
}
