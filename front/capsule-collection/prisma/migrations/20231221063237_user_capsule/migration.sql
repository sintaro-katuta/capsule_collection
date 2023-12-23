-- CreateTable
CREATE TABLE "User_Capsule" (
    "userId" TEXT NOT NULL,
    "capsuleId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Capsule_userId_capsuleId_key" ON "User_Capsule"("userId", "capsuleId");

-- AddForeignKey
ALTER TABLE "User_Capsule" ADD CONSTRAINT "User_Capsule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Capsule" ADD CONSTRAINT "User_Capsule_capsuleId_fkey" FOREIGN KEY ("capsuleId") REFERENCES "Capsule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
