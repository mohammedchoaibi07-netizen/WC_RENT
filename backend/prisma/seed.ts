import 'reflect-metadata';
import { PrismaClient, OrderStatus, CustomerType, Province, PaymentMethod, ServiceVisitStatus, UnitState, QuoteStatus, QuoteNeedType, AdminRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'node:crypto';

const prisma = new PrismaClient();

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function randomHash(): string {
  return createHash('sha256').update(randomBytes(16)).digest('hex');
}

const ALL_STATUSES: OrderStatus[] = [
  OrderStatus.brouillon,
  OrderStatus.en_attente_paiement,
  OrderStatus.payee,
  OrderStatus.planifiee,
  OrderStatus.livree,
  OrderStatus.en_cours,
  OrderStatus.a_enlever,
  OrderStatus.cloturee,
  OrderStatus.annulee,
  OrderStatus.remboursee,
];

async function main() {
  console.log('Seed: grille tarifaire...');
  const priceList = await prisma.priceList.create({
    data: {
      validFrom: new Date('2026-01-01T00:00:00.000Z'),
      prixSemaineCabine: 35,
      prixPassageEntretien: 25,
      prixLivraisonForfait: 75,
      remiseSocietePct: 0.1,
      tvaPct: 0.21,
    },
  });

  console.log('Seed: comptes admin...');
  await prisma.adminUser.upsert({
    where: { email: 'admin@wcrentbelgium.be' },
    update: {},
    create: {
      email: 'admin@wcrentbelgium.be',
      nom: 'Administrateur',
      role: AdminRole.admin,
      passwordHash: await bcrypt.hash('ChangeMoi123!', 12),
    },
  });
  await prisma.adminUser.upsert({
    where: { email: 'operateur@wcrentbelgium.be' },
    update: {},
    create: {
      email: 'operateur@wcrentbelgium.be',
      nom: 'Operateur Terrain',
      role: AdminRole.operateur,
      passwordHash: await bcrypt.hash('ChangeMoi123!', 12),
    },
  });

  console.log('Seed: parc de cabines...');
  const units = [];
  for (let i = 1; i <= 15; i += 1) {
    units.push(
      await prisma.unit.create({
        data: { code: `CAB-${String(i).padStart(3, '0')}`, etat: i > 13 ? UnitState.maintenance : UnitState.disponible },
      }),
    );
  }

  console.log('Seed: demandes de devis...');
  const needTypes: QuoteNeedType[] = [QuoteNeedType.chantier, QuoteNeedType.evenement, QuoteNeedType.industrie, QuoteNeedType.particulier];
  for (let i = 0; i < 5; i += 1) {
    await prisma.quoteRequest.create({
      data: {
        nom: `Prospect ${i + 1}`,
        telephone: `04${70000000 + i}`,
        email: `prospect${i + 1}@example.be`,
        codePostal: '4000',
        typeBesoin: needTypes[i % needTypes.length],
        details: 'Demande generee par le jeu de donnees de demonstration.',
        statut: i < 2 ? QuoteStatus.nouveau : QuoteStatus.en_cours,
      },
    });
  }

  console.log('Seed: 20 commandes de demonstration...');
  const provinces: Province[] = [Province.BRUXELLES, Province.LIEGE, Province.HAINAUT, Province.ANVERS, Province.NAMUR];

  for (let i = 0; i < 20; i += 1) {
    const status = ALL_STATUSES[i % ALL_STATUSES.length];
    const clientType = i % 3 === 0 ? CustomerType.societe : CustomerType.particulier;
    const province = provinces[i % provinces.length];
    const nbCabines = 1 + (i % 3);
    const nbSemaines = 1 + (i % 4);
    const passagesParSemaine = nbSemaines === 1 ? i % 2 : 1;
    const dateDebut = addDays(new Date(), i - 10);
    const dateFin = addDays(dateDebut, nbSemaines * 7 - 1);

    const customer = await prisma.customer.create({
      data: {
        type: clientType,
        nom: `Client Demo ${i + 1}`,
        email: `client-demo-${i + 1}@example.be`,
        telephone: `04${80000000 + i}`,
        societeNom: clientType === CustomerType.societe ? `Societe Demo ${i + 1} SRL` : null,
        tvaNumero: clientType === CustomerType.societe ? `BE0${(700000000 + i).toString().padStart(9, '0')}` : null,
        tvaValide: clientType === CustomerType.societe ? true : null,
        adresseRue: `Rue de Demonstration ${i + 1}`,
        adresseCp: '4000',
        adresseVille: 'Liege',
      },
    });

    const location = nbCabines * Number(priceList.prixSemaineCabine) * nbSemaines;
    const remise = clientType === CustomerType.societe ? location * Number(priceList.remiseSocietePct) : 0;
    const entretien = nbCabines * passagesParSemaine * nbSemaines * Number(priceList.prixPassageEntretien);
    const livraison = Number(priceList.prixLivraisonForfait);
    const htva = location - remise + entretien + livraison;
    const tva = htva * Number(priceList.tvaPct);
    const total = htva + tva;

    const order = await prisma.order.create({
      data: {
        reference: `WCR-2026-DEMO-${String(i + 1).padStart(4, '0')}`,
        customerId: customer.id,
        status,
        dateDebut,
        dateFin,
        nbCabines,
        passagesParSemaine,
        adresseRue: customer.adresseRue!,
        adresseCp: customer.adresseCp!,
        adresseVille: customer.adresseVille!,
        province,
        clientType,
        societeRemiseAppliquee: clientType === CustomerType.societe,
        montantLocation: location,
        montantRemise: remise,
        montantEntretien: entretien,
        montantLivraison: livraison,
        montantHtva: htva,
        montantTva: tva,
        montantTotal: total,
        priceListId: priceList.id,
        moyenPaiement: [PaymentMethod.bancontact, PaymentMethod.carte, PaymentMethod.virement][i % 3],
        molliePaymentId: status === OrderStatus.brouillon ? null : `tr_demo_${i + 1}`,
        trackingTokenHash: randomHash(),
        cgvVersion: '2026-09-05',
        cgvAccepteesLe: dateDebut,
        statusEvents: { create: { to: status, auteur: 'seed' } },
      },
    });

    const noUnitStatuses: OrderStatus[] = [OrderStatus.brouillon, OrderStatus.en_attente_paiement, OrderStatus.annulee];
    if (!noUnitStatuses.includes(status)) {
      const availableUnits = units.slice((i * nbCabines) % 10, ((i * nbCabines) % 10) + nbCabines);
      for (const unit of availableUnits) {
        await prisma.orderUnit.create({ data: { orderId: order.id, unitId: unit.id } }).catch(() => undefined);
      }

      if (passagesParSemaine > 0) {
        await prisma.serviceVisit.create({
          data: {
            orderId: order.id,
            datePlanifiee: addDays(dateDebut, 3),
            statut: status === OrderStatus.cloturee ? ServiceVisitStatus.effectue : ServiceVisitStatus.prevu,
          },
        });
      }
    }

    const invoicedStatuses: OrderStatus[] = [
      OrderStatus.payee,
      OrderStatus.planifiee,
      OrderStatus.livree,
      OrderStatus.en_cours,
      OrderStatus.a_enlever,
      OrderStatus.cloturee,
    ];
    if (invoicedStatuses.includes(status)) {
      const seq = await prisma.sequenceCounter.upsert({
        where: { id: 'invoice:2026' },
        update: { dernier: { increment: 1 } },
        create: { id: 'invoice:2026', dernier: 1 },
      });
      await prisma.invoice.create({
        data: {
          orderId: order.id,
          numero: `2026-${String(seq.dernier).padStart(6, '0')}`,
          montantTotal: total,
        },
      });
    }
  }

  console.log('Seed termine.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
