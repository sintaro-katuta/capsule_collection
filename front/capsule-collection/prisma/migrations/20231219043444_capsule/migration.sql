/*
  Warnings:

  - You are about to drop the column `category` on the `Capsule` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserCapsule` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Capsule` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserCapsule" DROP CONSTRAINT "UserCapsule_userId_fkey";

-- AlterTable
ALTER TABLE "Capsule" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "company",
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserCapsule" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "UserCapsule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capsule" ADD CONSTRAINT "Capsule_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
