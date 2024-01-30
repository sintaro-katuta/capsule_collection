/*
  Warnings:

  - You are about to drop the `User_Capsule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User_Capsule" DROP CONSTRAINT "User_Capsule_capsuleId_fkey";

-- DropForeignKey
ALTER TABLE "User_Capsule" DROP CONSTRAINT "User_Capsule_userId_fkey";

-- DropTable
DROP TABLE "User_Capsule";

-- CreateTable
CREATE TABLE "UserCapsule" (
    "userId" TEXT NOT NULL,
    "capsuleId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCapsule_userId_capsuleId_key" ON "UserCapsule"("userId", "capsuleId");

-- AddForeignKey
ALTER TABLE "UserCapsule" ADD CONSTRAINT "UserCapsule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCapsule" ADD CONSTRAINT "UserCapsule_capsuleId_fkey" FOREIGN KEY ("capsuleId") REFERENCES "Capsule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
