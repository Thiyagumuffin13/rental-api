/*
  Warnings:

  - Added the required column `billingEndDate` to the `MonthlyRent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingStartDate` to the `MonthlyRent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MonthlyRent" ADD COLUMN     "billingEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "billingStartDate" TIMESTAMP(3) NOT NULL;
