-- DropForeignKey
ALTER TABLE "Capsule" DROP CONSTRAINT "Capsule_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserCapsule" DROP CONSTRAINT "UserCapsule_capsuleId_fkey";

-- DropForeignKey
ALTER TABLE "UserCapsule" DROP CONSTRAINT "UserCapsule_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserCapsule" ADD CONSTRAINT "UserCapsule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCapsule" ADD CONSTRAINT "UserCapsule_capsuleId_fkey" FOREIGN KEY ("capsuleId") REFERENCES "Capsule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capsule" ADD CONSTRAINT "Capsule_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
