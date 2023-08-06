/*
  Warnings:

  - You are about to drop the column `groupId` on the `Guess` table. All the data in the column will be lost.
  - Added the required column `groupCode` to the `Guess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guess" DROP COLUMN "groupId",
ADD COLUMN     "groupCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_groupCode_fkey" FOREIGN KEY ("groupCode") REFERENCES "Group"("codeGroup") ON DELETE CASCADE ON UPDATE CASCADE;
