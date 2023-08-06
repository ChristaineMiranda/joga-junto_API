-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "firstTeam" TEXT NOT NULL,
    "secondTeam" TEXT NOT NULL,
    "goalsFirst" INTEGER NOT NULL,
    "goalsSecond" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
