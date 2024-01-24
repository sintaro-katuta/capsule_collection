/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "UserCapsule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "capsuleId" TEXT NOT NULL,

    CONSTRAINT "UserCapsule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capsule" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "image" TEXT,
    "category" TEXT,

    CONSTRAINT "Capsule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "price" INTEGER,
    "company" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCapsule" ADD CONSTRAINT "UserCapsule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCapsule" ADD CONSTRAINT "UserCapsule_capsuleId_fkey" FOREIGN KEY ("capsuleId") REFERENCES "Capsule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
