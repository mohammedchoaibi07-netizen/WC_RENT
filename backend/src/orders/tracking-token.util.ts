import { createHash, createHmac, randomBytes } from 'node:crypto';

/**
 * Jeton de suivi signe envoye par e-mail au client pour consulter sa
 * commande en lecture seule (GET /api/orders/:ref) sans authentification.
 * Seul le hash est conserve en base ; le jeton clair n'est jamais stocke.
 */
export function generateTrackingToken(orderId: string): { token: string; hash: string } {
  const secret = process.env.ORDER_TRACKING_TOKEN_SECRET ?? 'change-me-dev-only';
  const nonce = randomBytes(16).toString('hex');
  const signature = createHmac('sha256', secret).update(`${orderId}.${nonce}`).digest('hex');
  const token = `${nonce}.${signature}`;
  const hash = hashTrackingToken(token);
  return { token, hash };
}

export function hashTrackingToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function verifyTrackingToken(orderId: string, token: string): boolean {
  const secret = process.env.ORDER_TRACKING_TOKEN_SECRET ?? 'change-me-dev-only';
  const [nonce, signature] = token.split('.');
  if (!nonce || !signature) return false;
  const expected = createHmac('sha256', secret).update(`${orderId}.${nonce}`).digest('hex');
  return expected === signature;
}
