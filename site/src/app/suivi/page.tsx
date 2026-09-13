import type { Metadata } from "next";
import { SuiviView } from "./SuiviView";

export const metadata: Metadata = {
  title: "Suivi de commande — WC Rent Belgium",
};

export default async function SuiviPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; token?: string }>;
}) {
  const { ref, token } = await searchParams;
  return <SuiviView orderRef={ref} token={token} />;
}
