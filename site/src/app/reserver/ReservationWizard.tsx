"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CounterField } from "@/components/CounterField";
import { TextField } from "@/components/TextField";
import { ChoiceOption } from "@/components/ChoiceOption";
import { StepProgress } from "@/components/StepProgress";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { formatEur } from "@/lib/format";
import { CABIN_PRICE_PER_WEEK } from "@/lib/content";
import {
  api,
  ApiError,
  CGV_VERSION,
  DEV_HCAPTCHA_TOKEN,
  type AvailabilityResult,
  type ClientType,
  type PaymentMethodType,
  type QuoteBreakdown,
} from "@/lib/api";

const STEP_LABELS = ["Matériel", "Durée", "Livraison", "Coordonnées", "Paiement"];

type VisitOption = { n: number; label: string; description: string };

function visitOptionsFor(weeks: number): VisitOption[] {
  if (weeks === 1) {
    return [
      { n: 0, label: "Aucun entretien", description: "La cabine est livrée nettoyée et désinfectée" },
      { n: 1, label: "1 passage en cours de location", description: "Vidange et désinfection à mi-parcours" },
    ];
  }
  return [
    { n: 0, label: "Aucun entretien", description: "Vous gérez le nettoyage" },
    { n: 1, label: "1 passage par semaine", description: "Chantiers, usage courant" },
    { n: 2, label: "2 passages par semaine", description: "Forte fréquentation" },
    { n: 5, label: "5 passages par semaine", description: "Événements, festivals" },
  ];
}

const PAYMENT_METHODS: Array<{ id: PaymentMethodType; label: string; description: string; icon: string }> = [
  { id: "bancontact", label: "Bancontact", description: "Paiement immédiat", icon: "credit-card" },
  { id: "carte", label: "Carte bancaire", description: "Visa, Mastercard", icon: "credit-card" },
  { id: "virement", label: "Virement", description: "Livraison après réception", icon: "landmark" },
];

export function ReservationWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [nbCabines, setNbCabines] = useState(1);
  const [nbSemaines, setNbSemaines] = useState(4);
  const [passagesParSemaine, setPassagesParSemaine] = useState(1);
  const [dateDebut, setDateDebut] = useState("");

  const [adresseCp, setAdresseCp] = useState("");
  const [adresseRue, setAdresseRue] = useState("");
  const [adresseVille, setAdresseVille] = useState("");
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const [clientType, setClientType] = useState<ClientType>("particulier");
  const [societeNom, setSocieteNom] = useState("");
  const [tvaNumero, setTvaNumero] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const [moyenPaiement, setMoyenPaiement] = useState<PaymentMethodType>("bancontact");
  const [cgvAccepted, setCgvAccepted] = useState(false);
  const [quote, setQuote] = useState<QuoteBreakdown | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Empeche une frequence d'entretien invalide quand on repasse a 1 semaine.
  function handleNbSemainesChange(next: number) {
    setNbSemaines(next);
    if (next === 1 && passagesParSemaine > 1) setPassagesParSemaine(1);
  }

  async function checkAvailability() {
    if (!/^\d{4}$/.test(adresseCp) || !dateDebut) return;
    setCheckingAvailability(true);
    setError(null);
    try {
      const result = await api.post<AvailabilityResult>("/availability", {
        zip: adresseCp,
        start: dateDebut,
        weeks: nbSemaines,
        units: nbCabines,
      });
      setAvailability(result);
    } catch {
      setAvailability(null);
    } finally {
      setCheckingAvailability(false);
    }
  }

  async function loadQuote() {
    setQuoteLoading(true);
    setError(null);
    try {
      const result = await api.post<QuoteBreakdown>("/quote/preview", {
        units: nbCabines,
        weeks: nbSemaines,
        visits: passagesParSemaine,
        zip: adresseCp,
        clientType,
      });
      setQuote(result);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Impossible de calculer le tarif.");
    } finally {
      setQuoteLoading(false);
    }
  }

  function goNext() {
    setError(null);
    if (step === 3) {
      void checkAvailability();
    }
    if (step === 4) {
      setStep(5);
      void loadQuote();
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  async function handlePay() {
    if (!cgvAccepted || !quote) return;
    setSubmitting(true);
    setError(null);
    try {
      const customer =
        clientType === "particulier"
          ? { type: "particulier" as const, nom, email, telephone }
          : { type: "societe" as const, nom, email, telephone, societeNom, tvaNumero };

      const result = await api.post<{ reference: string; checkoutUrl: string }>("/orders", {
        customer,
        nbCabines,
        nbSemaines,
        passagesParSemaine,
        dateDebut,
        adresseRue,
        adresseCp,
        adresseVille,
        moyenPaiement,
        montantTotalAttendu: quote.montantTotal,
        cgvVersion: CGV_VERSION,
        hcaptchaToken: DEV_HCAPTCHA_TOKEN,
      });

      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        router.push(`/reservation/confirmation?ref=${result.reference}`);
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 502) {
        setError(
          "Le paiement Mollie n'est pas encore configuré sur cet environnement (compte de test). La commande " +
            "a bien été validée côté serveur jusqu'à cette étape — il ne manque que les vraies clés Mollie.",
        );
      } else {
        setError(err instanceof ApiError ? err.message : "Une erreur est survenue. Merci de réessayer.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const visitOptions = visitOptionsFor(nbSemaines);
  const isCompany = clientType === "societe";
  const canGoStep2 = nbCabines > 0;
  const canGoStep3 = Boolean(dateDebut);
  const canGoStep4 = Boolean(adresseCp && adresseRue && adresseVille);
  const canGoStep5 =
    Boolean(nom && email && telephone) && (!isCompany || Boolean(societeNom && tvaNumero));

  return (
    <section className="py-10 lg:py-16">
    <Container size="narrow" className="grid gap-6">
      <Reveal>
        <StepProgress step={step} total={5} label={STEP_LABELS[step - 1]} />
      </Reveal>

      {step === 1 && (
        <div className="step-enter grid gap-4">
          <SectionHeading eyebrow="Étape 1" title="Combien de cabines ?" level="h1" intro="Prix indiqué hors TVA, par cabine et par semaine." />
          <div className="grid gap-3 rounded-2xl border border-grey-200 p-4">
            <div className="grid gap-1">
              <span className="text-[18px] font-extrabold tracking-[-0.02em] text-navy-800">Toilette mobile autonome</span>
              <span className="text-[14px] text-grey-500">
                Cabine à fosse, sans raccordement · {formatEur(CABIN_PRICE_PER_WEEK)} / semaine
              </span>
            </div>
            <CounterField value={nbCabines} min={0} max={40} suffix="unité(s)" onChange={setNbCabines} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-enter grid gap-4">
          <SectionHeading eyebrow="Étape 2" title="Combien de temps ?" level="h1" intro="Durée de location et fréquence d'entretien souhaitée." />
          <CounterField label="Durée de location" value={nbSemaines} min={1} max={52} suffix="semaine(s)" onChange={handleNbSemainesChange} />
          <TextField label="Date de livraison souhaitée" type="date" value={dateDebut} onChange={setDateDebut} hint="Modifiable jusqu'à 48h avant." />
          <div className="grid gap-2">
            {visitOptions.map((v) => (
              <ChoiceOption
                key={v.n}
                icon="sparkles"
                label={v.label}
                description={v.description}
                selected={passagesParSemaine === v.n}
                onSelect={() => setPassagesParSemaine(v.n)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step-enter grid gap-4">
          <SectionHeading eyebrow="Étape 3" title="Où livrons-nous ?" level="h1" />
          <TextField label="Code postal" placeholder="4000" value={adresseCp} onChange={setAdresseCp} />
          <TextField label="Rue et numéro" placeholder="Rue de la Station 12" value={adresseRue} onChange={setAdresseRue} hint="Accès camion requis à moins de 15 m de l'emplacement." />
          <TextField label="Ville" placeholder="Liège" value={adresseVille} onChange={setAdresseVille} />
          {checkingAvailability && <p className="m-0 text-[14px] text-grey-500">Vérification de la disponibilité...</p>}
          {availability && !checkingAvailability && (
            <Badge icon={availability.available ? "truck" : "clock"} tone={availability.available ? "default" : undefined}>
              {availability.available
                ? `Livraison et enlèvement sous ${availability.deliveryDelayHours}h`
                : availability.reason === "hors_belgique"
                  ? "Hors Belgique — passez par le formulaire de devis"
                  : `Parc complet à cette date — première date libre : ${availability.firstFreeDate ?? "à confirmer"}`}
            </Badge>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="step-enter grid gap-4">
          <SectionHeading eyebrow="Étape 4" title="Vos coordonnées" level="h1" intro="Le tarif dépend de votre statut." />
          <div className="grid gap-2">
            <ChoiceOption
              icon="heart"
              label="Particulier"
              description="TVA de 21% incluse dans le total"
              selected={clientType === "particulier"}
              onSelect={() => setClientType("particulier")}
            />
            <ChoiceOption
              icon="landmark"
              label="Société"
              description="Tarif professionnel : 10% sur la location, TVA récupérable"
              selected={clientType === "societe"}
              onSelect={() => setClientType("societe")}
            />
          </div>
          {isCompany && (
            <div className="grid gap-4">
              <TextField label="Société" placeholder="Entreprise SPRL" value={societeNom} onChange={setSocieteNom} />
              <TextField label="Numéro de TVA" placeholder="BE 0123.456.789" value={tvaNumero} onChange={setTvaNumero} hint="Nécessaire pour la facture." />
            </div>
          )}
          <TextField label="Nom et prénom" placeholder="Marie Dupont" value={nom} onChange={setNom} />
          <TextField label="E-mail" type="email" placeholder="marie@entreprise.be" value={email} onChange={setEmail} />
          <TextField label="Téléphone" type="tel" placeholder="+32 470 00 00 00" value={telephone} onChange={setTelephone} />
        </div>
      )}

      {step === 5 && (
        <div className="step-enter grid gap-4">
          <SectionHeading eyebrow="Étape 5" title="Récapitulatif et paiement" level="h1" />

          {quoteLoading && <p className="m-0 text-[14px] text-grey-500">Calcul du tarif...</p>}

          {quote && (
            <div className="grid gap-2.5 rounded-2xl bg-blue-050 p-5">
              <Row label="Durée" value={`${nbSemaines} semaine${nbSemaines > 1 ? "s" : ""}`} strong />
              <Row label="Livraison" value={`${dateDebut || "à définir"} · ${adresseCp || "Belgique"}`} strong />
              <Row label={`${nbCabines} × Toilette mobile autonome`} value={formatEur(quote.montantLocation)} />
              {quote.remiseSocieteAppliquee && (
                <Row label="Tarif société (10%)" value={`– ${formatEur(quote.montantRemise)}`} className="text-green-600" />
              )}
              <Row
                label={`Entretien · ${passagesParSemaine === 0 ? "Sans entretien" : nbSemaines === 1 ? "1 passage" : `${passagesParSemaine} passage(s)/semaine`}`}
                value={formatEur(quote.montantEntretien)}
              />
              <Row label="Livraison et enlèvement" value={formatEur(quote.montantLivraison)} />
              <div className="h-px bg-[rgba(8,43,82,0.12)]" />
              <Row label="Total hors TVA" value={formatEur(quote.montantHtva)} className="text-grey-500" />
              <Row label="TVA 21%" value={formatEur(quote.montantTva)} className="text-grey-500" />
              <Row label="Total à payer" value={formatEur(quote.montantTotal)} big />
            </div>
          )}

          <div className="grid gap-2">
            {PAYMENT_METHODS.map((m) => (
              <ChoiceOption
                key={m.id}
                icon={m.icon}
                label={m.label}
                description={m.description}
                selected={moyenPaiement === m.id}
                onSelect={() => setMoyenPaiement(m.id)}
              />
            ))}
          </div>

          <label className="flex items-start gap-2.5 text-[14px] text-grey-700">
            <input
              type="checkbox"
              checked={cgvAccepted}
              onChange={(e) => setCgvAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 flex-none accent-blue-500"
            />
            <span>J&apos;accepte les conditions générales de vente.</span>
          </label>

          {error && <p className="m-0 text-[14px] text-red-600">{error}</p>}

          <Button onClick={handlePay} block icon="shield-check" showArrow={false} disabled={!cgvAccepted || !quote || submitting}>
            {submitting ? "Traitement..." : quote ? `Confirmer et payer ${formatEur(quote.montantTotal)}` : "Confirmer et payer"}
          </Button>
          <p className="m-0 text-[14px] leading-[1.5] text-grey-500">
            {clientType === "societe" ? "Société" : "Particulier"} ·{" "}
            {clientType === "societe" ? "TVA récupérable sur facture." : "TVA de 21% incluse dans le total."} Paiement
            sécurisé, annulation sans frais jusqu&apos;à 48h avant la livraison.
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {step > 1 && (
          <Button variant="secondary" icon="chevron-left" showArrow={false} onClick={goBack}>
            Retour
          </Button>
        )}
        {step === 1 && (
          <Button block disabled={!canGoStep2} onClick={goNext}>
            Continuer
          </Button>
        )}
        {step === 2 && (
          <Button block disabled={!canGoStep3} onClick={goNext}>
            Continuer
          </Button>
        )}
        {step === 3 && (
          <Button block disabled={!canGoStep4} onClick={goNext}>
            Continuer
          </Button>
        )}
        {step === 4 && (
          <Button block disabled={!canGoStep5} onClick={goNext}>
            Vers le paiement
          </Button>
        )}
      </div>
    </Container>
    </section>
  );
}

function Row({
  label,
  value,
  strong,
  big,
  className,
}: {
  label: string;
  value: string;
  strong?: boolean;
  big?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between gap-3 text-[16px] text-grey-700 ${className ?? ""}`}>
      <span>{label}</span>
      <span
        className={
          big
            ? "text-[20px] font-extrabold text-navy-800"
            : strong
              ? "font-bold text-navy-800"
              : ""
        }
      >
        {value}
      </span>
    </div>
  );
}
