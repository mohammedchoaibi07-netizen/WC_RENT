const API_BASE = "/api";

export class ApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

async function request<T>(path: string, options: RequestInit = {}, timeoutMs?: number): Promise<T> {
  const controller = timeoutMs ? new AbortController() : undefined;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : undefined;

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: controller?.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } finally {
    if (timer) clearTimeout(timer);
  }

  if (!res.ok) {
    let payload: unknown;
    try {
      payload = await res.json();
    } catch {
      payload = null;
    }
    const message =
      (payload as { message?: string } | null)?.message ?? `Erreur ${res.status}`;
    throw new ApiError(res.status, message, payload);
  }

  return (await res.json()) as T;
}

export const api = {
  get: <T>(path: string, timeoutMs?: number) => request<T>(path, {}, timeoutMs),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
};

export type Province =
  | "ANVERS"
  | "BRABANT_FLAMAND"
  | "BRABANT_WALLON"
  | "BRUXELLES"
  | "FLANDRE_ORIENTALE"
  | "FLANDRE_OCCIDENTALE"
  | "HAINAUT"
  | "LIEGE"
  | "LIMBOURG"
  | "LUXEMBOURG"
  | "NAMUR";

export interface ZoneInfo {
  province: Province;
  deliveryDelayHours: 24 | 48;
}

export interface ZoneLookupResult {
  province: Province | null;
  deliveryDelayHours: 24 | 48 | null;
}

export interface AvailabilityResult {
  available: boolean;
  firstFreeDate: string | null;
  deliveryDelayHours: 24 | 48 | null;
  earliestDeliverableDate: string | null;
  province: string | null;
  reason?: string;
}

export interface QuoteBreakdown {
  priceListId: string;
  montantLocation: number;
  montantRemise: number;
  montantEntretien: number;
  montantLivraison: number;
  montantHtva: number;
  montantTva: number;
  montantTotal: number;
  remiseSocieteAppliquee: boolean;
}

export type ClientType = "particulier" | "societe";
export type PaymentMethodType = "bancontact" | "carte" | "virement";

export interface CreateOrderPayload {
  customer:
    | { type: "particulier"; nom: string; email: string; telephone: string }
    | {
        type: "societe";
        nom: string;
        email: string;
        telephone: string;
        societeNom: string;
        tvaNumero: string;
      };
  nbCabines: number;
  nbSemaines: number;
  passagesParSemaine: number;
  dateDebut: string;
  adresseRue: string;
  adresseCp: string;
  adresseVille: string;
  moyenPaiement: PaymentMethodType;
  montantTotalAttendu: number;
  cgvVersion: string;
  honeypot?: string;
  hcaptchaToken: string;
}

export interface CreateOrderResult {
  reference: string;
  checkoutUrl: string;
}

export interface QuoteRequestPayload {
  nom: string;
  telephone: string;
  email: string;
  codePostal: string;
  typeBesoin: "chantier" | "evenement" | "industrie" | "particulier";
  details?: string;
  honeypot?: string;
  hcaptchaToken: string;
}

/**
 * Aucun compte hCaptcha reel n'est configure pour l'instant (TODO A CONFIRMER
 * cote backend). En attendant, le backend ignore la verification tant que
 * HCAPTCHA_SECRET n'est pas renseigne : cette valeur sert de placeholder.
 */
export const DEV_HCAPTCHA_TOKEN = "dev-preview-bypass";

export const CGV_VERSION = "2026-09-05";
