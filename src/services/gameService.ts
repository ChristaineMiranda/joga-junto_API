import { Game } from "@prisma/client";
import gamesRepository from "../repositories/gamesRepository.js";
import errors from "../errors/index.js";
import { GameInput, GameRequest, GameUpdate } from "../protocols/index.js";
import guessRepositories from "../repositories/guessRepositories.js";
import prisma from "../config/database.js";
import groupsRepositories from "../repositories/groupsRepositories.js";

async function createGame({ firstTeam, secondTeam, date, time, step, round, trip }: GameRequest): Promise<Game> {
   const dateTime = new Date(date + " " + time);
   const gameDuplicated = await gamesRepository.checkDuplicatedGame(firstTeam, secondTeam, dateTime);
   if (gameDuplicated) throw errors.conflict();

   const newGame = await gamesRepository.createGame({ firstTeam, secondTeam, dateTime, step, round, trip });
   return newGame;
}

async function listGames() {
   const games = await gamesRepository.findAllGames();
   return games;
}

async function checkConsequentialUpdates(gameId: number, updatedGame: Game) {
   const guessesForThisGame = await guessRepositories.findGuessByGameId(gameId);
   for (const guess of guessesForThisGame) {

      //acerto por vencedor + placar
      if (updatedGame.goalsFirst === guess.goalsFirstTeam && updatedGame.goalsSecond === guess.goalsSecondTeam) {
         await guessRepositories.updateGuess(guess.id, { isCorrect: true });
         const relation = await groupsRepositories.findRegisterGroupUser(guess.userId, guess.groupId);
         if (!relation) throw errors.notFound();
         const points = relation.score + 3;
         await groupsRepositories.updateScore(relation.id, points);
         return;
      }
      //acerto por vencedor
      const correctWinner = (guess.goalsFirstTeam > guess.goalsSecondTeam && updatedGame.goalsFirst > updatedGame.goalsSecond) || (guess.goalsSecondTeam > guess.goalsFirstTeam && updatedGame.goalsSecond > updatedGame.goalsFirst) || (guess.goalsSecondTeam === guess.goalsFirstTeam && updatedGame.goalsSecond === updatedGame.goalsFirst);
      if (correctWinner) {
         await guessRepositories.updateGuess(guess.id, { isCorrect: false });
         const relation = await groupsRepositories.findRegisterGroupUser(guess.userId, guess.groupId);
         const points = relation.score + 1;
         await groupsRepositories.updateScore(relation.id, points);
         return;
      }
      //erro
      else await guessRepositories.updateGuess(guess.id, { isCorrect: false });
      return;

   }
}
async function updateGame(gameId: number, data: GameUpdate) {

   const gameExists = await gamesRepository.findGameById(gameId);
   if (!gameExists) throw errors.notFound();

   const updateResponse = await prisma.$transaction(async (prisma) => {
      let updatedGame: Game;

      if (data.date && data.time) {
         const dateTime = new Date(data.date + " " + data.time);
         const updateInput = { ...data, dateTime };
         delete updateInput.date;
         delete updateInput.time;
         updatedGame = await gamesRepository.updateGame(gameId, updateInput);
      }
      else if (!data.date && !data.time) updatedGame = await gamesRepository.updateGame(gameId, data);
      else throw errors.incorrectFieldsError(["Provide date and time to be registered for the game"]);
      if (data.winner) checkConsequentialUpdates(gameId, updatedGame);
   return updatedGame;
   });
   return updateResponse;   
}

async function deleteGame(gameId: number) {
   return await gamesRepository.deleteGame(gameId);
}

async function listLastGames() {
   const games = await gamesRepository.findLastGames();
   return games;
}
export default {
   createGame,
   listGames,
   updateGame,
   deleteGame,
   listLastGames
}