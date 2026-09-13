import { Injectable, Logger } from '@nestjs/common';

/**
 * Verifie un jeton hCaptcha aupres de l'API hCaptcha.
 *
 * En developpement (HCAPTCHA_SECRET non renseigne / valeur placeholder),
 * la verification est court-circuitee pour ne pas bloquer les tests locaux.
 */
@Injectable()
export class HCaptchaService {
  private readonly logger = new Logger(HCaptchaService.name);

  async verify(token: string): Promise<boolean> {
    const secret = process.env.HCAPTCHA_SECRET;
    if (!secret || secret === 'hcaptcha_placeholder') {
      this.logger.warn('HCAPTCHA_SECRET non configure — verification ignoree (dev uniquement).');
      return true;
    }

    try {
      const response = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }).toString(),
      });
      const data = (await response.json()) as { success: boolean };
      return data.success === true;
    } catch (error) {
      this.logger.error(`Verification hCaptcha impossible: ${error}`);
      return false;
    }
  }
}
