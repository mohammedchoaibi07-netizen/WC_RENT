export class OutOfBelgiumError extends Error {
  constructor() {
    super('Livraison hors Belgique : merci de passer par le formulaire de devis.');
    this.name = 'OutOfBelgiumError';
  }
}

export class InsufficientFleetError extends Error {
  constructor(public readonly firstFreeDate: string | null) {
    super('Parc de cabines insuffisant sur la periode demandee.');
    this.name = 'InsufficientFleetError';
  }
}

export class CaptchaFailedError extends Error {
  constructor() {
    super('Verification anti-spam echouee, merci de reessayer.');
    this.name = 'CaptchaFailedError';
  }
}

export class InvalidVatError extends Error {
  constructor() {
    super('Numero de TVA belge invalide (format attendu: BE 0xxx.xxx.xxx).');
    this.name = 'InvalidVatError';
  }
}

export class OrderNotFoundError extends Error {
  constructor() {
    super('Commande introuvable.');
    this.name = 'OrderNotFoundError';
  }
}

export class InvalidTrackingTokenError extends Error {
  constructor() {
    super('Jeton de suivi invalide.');
    this.name = 'InvalidTrackingTokenError';
  }
}

export class PaymentInitializationError extends Error {
  constructor() {
    super("Le paiement n'a pas pu etre initialise pour le moment. Merci de reessayer dans un instant.");
    this.name = 'PaymentInitializationError';
  }
}

export class CancellationNotAllowedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CancellationNotAllowedError';
  }
}
