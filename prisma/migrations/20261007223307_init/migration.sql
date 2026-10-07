-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "lgpdConsent" BOOLEAN NOT NULL,
    "lgpdConsentAt" TIMESTAMP(3) NOT NULL,
    "contatado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
