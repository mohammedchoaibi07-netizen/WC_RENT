import { Injectable, Logger } from '@nestjs/common';
import { isValidBelgianVatFormat, normalizeBelgianVat } from './belgian-vat.util';

/**
 * Verifie un numero de TVA intracommunautaire via le service VIES de la
 * Commission europeenne.
 *
 * TODO A CONFIRMER: cette implementation ne fait aujourd'hui qu'une
 * validation de format. VIES expose un service SOAP
 * (https://ec.europa.eu/taxation_customs/vies/) qui peut etre indisponible
 * ou lent ; brancher un appel reel (avec cache et repli sur le format
 * seul en cas d'erreur reseau) avant mise en production.
 */
@Injectable()
export class ViesService {
  private readonly logger = new Logger(ViesService.name);

  async isValid(rawVat: string): Promise<boolean> {
    if (!isValidBelgianVatFormat(rawVat)) return false;

    try {
      // Emplacement prevu pour l'appel SOAP VIES reel. En attendant, on se
      // limite a la validation de format ci-dessus.
      normalizeBelgianVat(rawVat);
      return true;
    } catch (error) {
      this.logger.warn(`Verification VIES indisponible, repli sur le format seul: ${error}`);
      return isValidBelgianVatFormat(rawVat);
    }
  }
}
