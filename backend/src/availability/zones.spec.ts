import { describe, expect, it } from 'vitest';
import { Province } from '@prisma/client';
import { deliveryDelayHours, provinceFromPostalCode } from './zones';

describe('provinceFromPostalCode', () => {
  it('reconnait Bruxelles', () => {
    expect(provinceFromPostalCode('1050')).toBe(Province.BRUXELLES);
  });

  it('reconnait le Brabant wallon', () => {
    expect(provinceFromPostalCode('1400')).toBe(Province.BRABANT_WALLON);
  });

  it('reconnait Anvers', () => {
    expect(provinceFromPostalCode('2000')).toBe(Province.ANVERS);
  });

  it('reconnait le Brabant flamand pour les deux plages (1500-1999 et 3000-3499)', () => {
    expect(provinceFromPostalCode('1800')).toBe(Province.BRABANT_FLAMAND);
    expect(provinceFromPostalCode('3200')).toBe(Province.BRABANT_FLAMAND);
  });

  it('reconnait le Hainaut pour les deux plages (6000-6599 et 7000-7999)', () => {
    expect(provinceFromPostalCode('6000')).toBe(Province.HAINAUT);
    expect(provinceFromPostalCode('7500')).toBe(Province.HAINAUT);
  });

  it('reconnait le Luxembourg', () => {
    expect(provinceFromPostalCode('6800')).toBe(Province.LUXEMBOURG);
  });

  it('retourne null pour un code postal invalide ou hors Belgique', () => {
    expect(provinceFromPostalCode('75000')).toBeNull();
    expect(provinceFromPostalCode('ABCD')).toBeNull();
    expect(provinceFromPostalCode('')).toBeNull();
  });
});

describe('deliveryDelayHours', () => {
  it('donne 24h pour les zones proches', () => {
    expect(deliveryDelayHours(Province.BRUXELLES)).toBe(24);
    expect(deliveryDelayHours(Province.LIEGE)).toBe(24);
    expect(deliveryDelayHours(Province.NAMUR)).toBe(24);
  });

  it('donne 48h pour les zones plus eloignees', () => {
    expect(deliveryDelayHours(Province.HAINAUT)).toBe(48);
    expect(deliveryDelayHours(Province.LUXEMBOURG)).toBe(48);
    expect(deliveryDelayHours(Province.LIMBOURG)).toBe(48);
    expect(deliveryDelayHours(Province.FLANDRE_OCCIDENTALE)).toBe(48);
  });
});
