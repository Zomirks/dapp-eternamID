-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nftId" INTEGER NOT NULL,
    "firstname" TEXT,
    "name" TEXT,
    "hash" TEXT,
    "bornAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
