-- DropIndex
DROP INDEX "UserCapsule_userId_capsuleId_key";

-- AlterTable
ALTER TABLE "UserCapsule" ADD CONSTRAINT "UserCapsule_pkey" PRIMARY KEY ("userId", "capsuleId");
