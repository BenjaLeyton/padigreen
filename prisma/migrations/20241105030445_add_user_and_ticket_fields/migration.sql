/*
  Warnings:

  - You are about to drop the column `location` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyNumber` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeHours` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "location",
ADD COLUMN     "comments" TEXT,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "adminName" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "companyNumber" TEXT NOT NULL,
ADD COLUMN     "storeHours" TEXT NOT NULL;
