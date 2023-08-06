/*
  Warnings:

  - Added the required column `round` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "round" TEXT NOT NULL,
ADD COLUMN     "step" TEXT NOT NULL,
ADD COLUMN     "trip" TEXT NOT NULL,
ALTER COLUMN "goalsFirst" DROP NOT NULL,
ALTER COLUMN "goalsSecond" DROP NOT NULL;
