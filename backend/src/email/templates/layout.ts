const NAVY = '#082B52';
const BLUE = '#006EDC';

/** Gabarit commun (identite visuelle du site) pour tous les e-mails. */
export function emailLayout(params: { title: string; bodyHtml: string; ctaLabel?: string; ctaUrl?: string }): string {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#f4f6f8; padding:24px 0; margin:0;">
    <div style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden;">
      <div style="background:${NAVY}; padding:20px 24px;">
        <span style="color:#ffffff; font-size:18px; font-weight:bold;">WC Rent Belgium</span>
      </div>
      <div style="padding:24px; color:#1a1a1a; font-size:15px; line-height:1.5;">
        <h1 style="font-size:19px; color:${NAVY}; margin-top:0;">${params.title}</h1>
        ${params.bodyHtml}
        ${
          params.ctaUrl
            ? `<p style="margin-top:24px;"><a href="${params.ctaUrl}" style="background:${BLUE}; color:#ffffff; text-decoration:none; padding:12px 20px; border-radius:8px; display:inline-block; font-weight:bold;">${params.ctaLabel ?? 'Voir'}</a></p>`
            : ''
        }
      </div>
      <div style="padding:16px 24px; color:#8a8a8a; font-size:12px; border-top:1px solid #eee;">
        WC Rent Belgium — location, nettoyage et debouchage de sanitaires mobiles en Belgique.
      </div>
    </div>
  </div>`;
}

export function formatEur(amount: number): string {
  return new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function formatDateFr(date: Date): string {
  return new Intl.DateTimeFormat('fr-BE', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
}
