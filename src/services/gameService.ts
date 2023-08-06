import { Game } from "@prisma/client";
import gamesRepository from "../repositories/gamesRepository.js";
import errors from "../errors/index.js";
import { GameRequest, GameUpdate } from "../protocols/index.js";

async function createGame({ firstTeam, secondTeam, date, time, step, round, trip }: GameRequest): Promise<Game> {
  
   const gameDuplicated = await gamesRepository.checkDuplicatedGame(firstTeam, secondTeam, date);
   if (gameDuplicated) throw errors.conflict();

   const newGame = await gamesRepository.createGame({ firstTeam, secondTeam, date, time, step, round, trip });
   return newGame;
}

async function listGames() {
   const games = await gamesRepository.findAllGames();
   return games;   
}

async function updateGame(gameId: number, data: GameUpdate) {
   const gameExists = await gamesRepository.findGameById(gameId);
   if (!gameExists) throw errors.notFound();
   const updatedGame = await gamesRepository.updateGame(gameId, data);
   return updatedGame;
}

async function deleteGame(gameId:number) {
   return await gamesRepository.deleteGame(gameId);   
}
export default {
   createGame,
   listGames,
   updateGame,
   deleteGame
}