-- CreateTable
CREATE TABLE "MonthlyRent" (
    "id" SERIAL NOT NULL,
    "pastEbUnit" DOUBLE PRECISION NOT NULL,
    "currentEbUnit" DOUBLE PRECISION NOT NULL,
    "ebUnitCharges" DOUBLE PRECISION NOT NULL,
    "familyMembers" INTEGER NOT NULL,
    "totalRentPrice" DOUBLE PRECISION NOT NULL,
    "receiptStructureId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyRent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlyRent" ADD CONSTRAINT "MonthlyRent_receiptStructureId_fkey" FOREIGN KEY ("receiptStructureId") REFERENCES "ReceiptStructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyRent" ADD CONSTRAINT "MonthlyRent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
