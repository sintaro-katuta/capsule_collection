/*
  Warnings:

  - You are about to drop the `Capsule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCapsule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Capsule" DROP CONSTRAINT "Capsule_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_fkey";

-- DropForeignKey
ALTER TABLE "UserCapsule" DROP CONSTRAINT "UserCapsule_capsuleId_fkey";

-- DropTable
DROP TABLE "Capsule";

-- DropTable
DROP TABLE "UserCapsule";
