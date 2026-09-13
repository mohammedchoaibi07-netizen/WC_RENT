"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TextField } from "@/components/TextField";
import { ChoiceOption } from "@/components/ChoiceOption";
import { Button } from "@/components/Button";
import { api, ApiError, DEV_HCAPTCHA_TOKEN, type QuoteRequestPayload } from "@/lib/api";
import { COMPANY } from "@/lib/content";

const NEED_OPTIONS: Array<{ value: QuoteRequestPayload["typeBesoin"]; label: string; icon: string }> = [
  { value: "chantier", label: "Chantier", icon: "hard-hat" },
  { value: "evenement", label: "Événement", icon: "calendar-days" },
  { value: "industrie", label: "Industrie", icon: "factory" },
  { value: "particulier", label: "Particulier", icon: "heart" },
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [need, setNeed] = useState<QuoteRequestPayload["typeBesoin"]>("chantier");
  const [form, setForm] = useState({ name: "", phone: "", email: "", zip: "", details: "" });
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await api.post("/quote-requests", {
        nom: form.name,
        telephone: form.phone,
        email: form.email,
        codePostal: form.zip,
        typeBesoin: need,
        details: form.details || undefined,
        honeypot: honeypot || undefined,
        hcaptchaToken: DEV_HCAPTCHA_TOKEN,
      } satisfies QuoteRequestPayload);
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue. Merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  const telHref = "tel:" + COMPANY.phone.replace(/\s/g, "");

  return (
    <section className="py-14 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Devis gratuit"
            title="Parlez-nous de votre projet"
            level="h1"
            intro="Réponse en moins de 24h ouvrables. Gratuit et sans engagement."
          />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <Reveal delayMs={80}>
            {sent ? (
              <div className="grid gap-2 rounded-2xl bg-blue-050 p-6">
                <p className="m-0 text-[18px] font-extrabold text-navy-800">Demande envoyée</p>
                <p className="m-0 text-[15px] leading-[1.5] text-grey-700">
                  Merci. Nous revenons vers vous avec une proposition sous 24h ouvrables.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Nom et prénom" placeholder="Marie Dupont" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
                  <TextField label="Téléphone" type="tel" placeholder="+32 470 00 00 00" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="E-mail" type="email" placeholder="marie@entreprise.be" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
                  <TextField label="Code postal du site" placeholder="4000" value={form.zip} onChange={(v) => setForm((f) => ({ ...f, zip: v }))} required />
                </div>
                <div className="grid gap-2">
                  <span className="text-[14px] font-bold text-navy-800">Type de besoin</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {NEED_OPTIONS.map((o) => (
                      <ChoiceOption key={o.value} label={o.label} icon={o.icon} selected={need === o.value} onSelect={() => setNeed(o.value)} />
                    ))}
                  </div>
                </div>
                <TextField
                  label="Détails (durée, nombre d'unités, dates)"
                  placeholder="2 cabines, 6 semaines, à partir du 15 octobre"
                  value={form.details}
                  onChange={(v) => setForm((f) => ({ ...f, details: v }))}
                />
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  aria-hidden="true"
                />
                {error && <p className="m-0 text-[14px] text-red-600">{error}</p>}
                <div className="sm:max-w-xs">
                  <Button type="submit" block disabled={submitting}>
                    {submitting ? "Envoi..." : "Envoyer ma demande"}
                  </Button>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal delayMs={160} className="grid gap-3 rounded-2xl border border-grey-200 p-6">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.10em] text-grey-500">Nous joindre directement</p>
            <a href={telHref} className="text-[18px] font-extrabold text-blue-500 no-underline">
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="text-[16px] text-grey-700 no-underline">
              {COMPANY.email}
            </a>
            <p className="m-0 text-[15px] text-grey-500">Lundi au vendredi, 7h30 – 18h. Urgences week-end sur appel.</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
