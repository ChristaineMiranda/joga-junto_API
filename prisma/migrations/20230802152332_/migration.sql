/*
  Warnings:

  - You are about to drop the column `winner` on the `Guess` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "winner" TEXT;

-- AlterTable
ALTER TABLE "Guess" DROP COLUMN "winner",
ADD COLUMN     "isCorrect" BOOLEAN;
