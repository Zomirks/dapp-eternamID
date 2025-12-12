/*
  Warnings:

  - You are about to drop the column `nftId` on the `User` table. All the data in the column will be lost.
  - Added the required column `nft_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nftId",
ADD COLUMN     "description" VARCHAR(500),
ADD COLUMN     "nft_id" INTEGER NOT NULL,
ADD COLUMN     "private_notes" VARCHAR(500);
