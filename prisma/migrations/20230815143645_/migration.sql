/*
  Warnings:

  - You are about to drop the column `groupCode` on the `Guess` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `Guess` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Guess" DROP CONSTRAINT "Guess_groupCode_fkey";

-- AlterTable
ALTER TABLE "Guess" DROP COLUMN "groupCode",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
