import type { Metadata } from "next";
import { ReservationWizard } from "./ReservationWizard";

export const metadata: Metadata = {
  title: "Réserver en ligne — WC Rent Belgium",
  description: "Réservez votre cabine sanitaire en ligne en 5 étapes.",
};

export default function ReserverPage() {
  return <ReservationWizard />;
}
