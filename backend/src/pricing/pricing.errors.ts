export class InvalidVisitFrequencyError extends Error {
  constructor() {
    super(
      "Pour une location d'une seule semaine, l'entretien est limite a 0 ou 1 passage.",
    );
    this.name = 'InvalidVisitFrequencyError';
  }
}

export class AmountMismatchError extends Error {
  constructor(expected: number, received: number) {
    super(
      `Montant transmis (${received.toFixed(2)} EUR) incoherent avec le calcul serveur (${expected.toFixed(2)} EUR).`,
    );
    this.name = 'AmountMismatchError';
  }
}
