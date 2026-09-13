const API_BASE = '/api';

export class ApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

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

  if (res.status === 204) return undefined as T;
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('text/csv')) return (await res.text()) as unknown as T;
  return (await res.json()) as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
};

export interface AdminMe {
  id: string;
  nom: string;
  email: string;
  role: 'admin' | 'operateur';
}

export interface OrderSummary {
  id: string;
  reference: string;
  status: string;
  clientType: string;
  province: string;
  dateDebut: string;
  dateFin: string;
  nbCabines: number;
  montantTotal: string;
  moyenPaiement: string | null;
  customer: { nom: string; email: string; telephone: string };
}

export interface Unit {
  id: string;
  code: string;
  etat: string;
  notes: string | null;
  dernierControle: string | null;
}

export interface QuoteRequest {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  codePostal: string;
  typeBesoin: string;
  details: string | null;
  statut: string;
  createdAt: string;
}

export interface PriceList {
  id: string;
  validFrom: string;
  validUntil: string | null;
  prixSemaineCabine: string;
  prixPassageEntretien: string;
  prixLivraisonForfait: string;
  remiseSocietePct: string;
  tvaPct: string;
}
