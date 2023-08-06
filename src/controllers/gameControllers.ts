import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import gameService from "../services/gameService.js"
import { GameRequest } from "../protocols/index.js";

async function createGame(req: Request, res: Response, next: NextFunction) {
    const {firstTeam, secondTeam, date, time, step, round, trip} = req.body as GameRequest;
    try {
        const newGame = await gameService.createGame({firstTeam, secondTeam, date, time, step, round, trip});
        return res.status(httpStatus.CREATED).send(newGame);
    } catch (error) {
        next(error);
    }
}

async function listGames(req:Request, res:Response, next:NextFunction) {
    try {
        const games = await gameService.listGames();
        return res.status(httpStatus.OK).send(games);

    } catch (error) {
        next(error);
    }    
}

async function updateGame(req:Request, res:Response, next:NextFunction) {
    const {id} = req.params;
    const gameId = Number(id);
    const {firstTeam, secondTeam, date, time, step, round, trip, goalsFirst, goalsSecond, winner} = req.body;  
    try {
        const updatedGame = await gameService.updateGame(gameId, {firstTeam, secondTeam, date, time, step, round, trip, goalsFirst, goalsSecond, winner});
        return res.status(httpStatus.OK).send(updatedGame);
    
    } catch (error) {
        next(error);
    }
}

async function deleteGame(req:Request, res:Response, next:NextFunction) {
    const {id} = req.params;
    const gameId = Number(id);
    try {
        await gameService.deleteGame(gameId);
        return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }    
}

export default {
    createGame,
    listGames,
    updateGame,
    deleteGame

}