-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceiptStructure" (
    "id" SERIAL NOT NULL,
    "rentPrice" DOUBLE PRECISION NOT NULL,
    "advancePrice" DOUBLE PRECISION NOT NULL,
    "ebPrice" DOUBLE PRECISION NOT NULL,
    "waterPrice" DOUBLE PRECISION NOT NULL,
    "rentalInitiationDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReceiptStructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyRent" (
    "id" SERIAL NOT NULL,
    "pastEbUnit" DOUBLE PRECISION NOT NULL,
    "currentEbUnit" DOUBLE PRECISION NOT NULL,
    "ebUnitCharges" DOUBLE PRECISION NOT NULL,
    "familyMembers" INTEGER NOT NULL,
    "rentPrice" DOUBLE PRECISION NOT NULL,
    "totalMonthStayed" INTEGER NOT NULL,
    "totalRentPrice" DOUBLE PRECISION NOT NULL,
    "billingStartDate" TIMESTAMP(3) NOT NULL,
    "billingEndDate" TIMESTAMP(3) NOT NULL,
    "receiptStructureId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyRent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "ReceiptStructure_userId_key" ON "ReceiptStructure"("userId");

-- AddForeignKey
ALTER TABLE "ReceiptStructure" ADD CONSTRAINT "ReceiptStructure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyRent" ADD CONSTRAINT "MonthlyRent_receiptStructureId_fkey" FOREIGN KEY ("receiptStructureId") REFERENCES "ReceiptStructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyRent" ADD CONSTRAINT "MonthlyRent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
