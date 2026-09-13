import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & devis — WC Rent Belgium",
  description: "Demandez votre devis gratuit, réponse en moins de 24h ouvrables.",
};

export default function ContactPage() {
  return <ContactForm />;
}
