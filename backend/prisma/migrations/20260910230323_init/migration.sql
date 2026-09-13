-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('particulier', 'societe');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('brouillon', 'en_attente_paiement', 'payee', 'planifiee', 'livree', 'en_cours', 'a_enlever', 'cloturee', 'annulee', 'remboursee');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('bancontact', 'carte', 'virement');

-- CreateEnum
CREATE TYPE "UnitState" AS ENUM ('disponible', 'en_location', 'maintenance', 'hors_service');

-- CreateEnum
CREATE TYPE "ServiceVisitStatus" AS ENUM ('prevu', 'effectue', 'reporte');

-- CreateEnum
CREATE TYPE "QuoteNeedType" AS ENUM ('chantier', 'evenement', 'industrie', 'particulier');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('nouveau', 'en_cours', 'devis_envoye', 'gagne', 'perdu');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('admin', 'operateur');

-- CreateEnum
CREATE TYPE "Province" AS ENUM ('ANVERS', 'BRABANT_FLAMAND', 'BRABANT_WALLON', 'BRUXELLES', 'FLANDRE_ORIENTALE', 'LIEGE', 'NAMUR', 'FLANDRE_OCCIDENTALE', 'HAINAUT', 'LIMBOURG', 'LUXEMBOURG');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "type" "CustomerType" NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "societeNom" TEXT,
    "tvaNumero" TEXT,
    "tvaValide" BOOLEAN,
    "adresseRue" TEXT,
    "adresseCp" TEXT,
    "adresseVille" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "etat" "UnitState" NOT NULL DEFAULT 'disponible',
    "dernierControle" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceList" (
    "id" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3),
    "prixSemaineCabine" DECIMAL(10,2) NOT NULL,
    "prixPassageEntretien" DECIMAL(10,2) NOT NULL,
    "prixLivraisonForfait" DECIMAL(10,2) NOT NULL,
    "remiseSocietePct" DECIMAL(5,4) NOT NULL,
    "tvaPct" DECIMAL(5,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "PriceList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'brouillon',
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "nbCabines" INTEGER NOT NULL,
    "passagesParSemaine" INTEGER NOT NULL DEFAULT 0,
    "adresseRue" TEXT NOT NULL,
    "adresseCp" TEXT NOT NULL,
    "adresseVille" TEXT NOT NULL,
    "province" "Province" NOT NULL,
    "clientType" "CustomerType" NOT NULL,
    "societeRemiseAppliquee" BOOLEAN NOT NULL DEFAULT false,
    "montantLocation" DECIMAL(10,2) NOT NULL,
    "montantRemise" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "montantEntretien" DECIMAL(10,2) NOT NULL,
    "montantLivraison" DECIMAL(10,2) NOT NULL,
    "montantHtva" DECIMAL(10,2) NOT NULL,
    "montantTva" DECIMAL(10,2) NOT NULL,
    "montantTotal" DECIMAL(10,2) NOT NULL,
    "priceListId" TEXT NOT NULL,
    "moyenPaiement" "PaymentMethod",
    "molliePaymentId" TEXT,
    "trackingTokenHash" TEXT NOT NULL,
    "cgvVersion" TEXT NOT NULL,
    "cgvAccepteesLe" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderUnit" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "OrderUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderStatusEvent" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "from" "OrderStatus",
    "to" "OrderStatus" NOT NULL,
    "auteur" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderStatusEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceVisit" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "datePlanifiee" TIMESTAMP(3) NOT NULL,
    "statut" "ServiceVisitStatus" NOT NULL DEFAULT 'prevu',
    "technicien" TEXT,
    "note" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceVisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "nom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "typeBesoin" "QuoteNeedType" NOT NULL,
    "details" TEXT,
    "statut" "QuoteStatus" NOT NULL DEFAULT 'nouveau',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "dateEmission" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pdfPath" TEXT,
    "montantTotal" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SequenceCounter" (
    "id" TEXT NOT NULL,
    "dernier" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SequenceCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'operateur',
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_code_key" ON "Unit"("code");

-- CreateIndex
CREATE INDEX "Unit_etat_idx" ON "Unit"("etat");

-- CreateIndex
CREATE INDEX "PriceList_validFrom_validUntil_idx" ON "PriceList"("validFrom", "validUntil");

-- CreateIndex
CREATE UNIQUE INDEX "Order_reference_key" ON "Order"("reference");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_dateDebut_dateFin_idx" ON "Order"("dateDebut", "dateFin");

-- CreateIndex
CREATE INDEX "Order_province_idx" ON "Order"("province");

-- CreateIndex
CREATE INDEX "OrderUnit_unitId_idx" ON "OrderUnit"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderUnit_orderId_unitId_key" ON "OrderUnit"("orderId", "unitId");

-- CreateIndex
CREATE INDEX "OrderStatusEvent_orderId_idx" ON "OrderStatusEvent"("orderId");

-- CreateIndex
CREATE INDEX "ServiceVisit_orderId_idx" ON "ServiceVisit"("orderId");

-- CreateIndex
CREATE INDEX "ServiceVisit_datePlanifiee_statut_idx" ON "ServiceVisit"("datePlanifiee", "statut");

-- CreateIndex
CREATE INDEX "QuoteRequest_statut_idx" ON "QuoteRequest"("statut");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_orderId_key" ON "Invoice"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_numero_key" ON "Invoice"("numero");

-- CreateIndex
CREATE INDEX "Invoice_numero_idx" ON "Invoice"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSession_tokenHash_key" ON "AdminSession"("tokenHash");

-- CreateIndex
CREATE INDEX "AdminSession_adminId_idx" ON "AdminSession"("adminId");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_priceListId_fkey" FOREIGN KEY ("priceListId") REFERENCES "PriceList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderUnit" ADD CONSTRAINT "OrderUnit_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderUnit" ADD CONSTRAINT "OrderUnit_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderStatusEvent" ADD CONSTRAINT "OrderStatusEvent_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceVisit" ADD CONSTRAINT "ServiceVisit_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteRequest" ADD CONSTRAINT "QuoteRequest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
