import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import guessService from "../services/guessService.js";

async function createGuess(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;
    const { gameId, codeGroup, goalsFirstTeam, goalsSecondTeam } = req.body;

    try {
        await guessService.createGuess(user, gameId, codeGroup, goalsFirstTeam, goalsSecondTeam);

        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        next(error);
    }
}

async function listMyGuessesByGroup(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;
    const { codeGroup } = req.body;

    try {
        const myGuessesList = await guessService.listAllMyGuessesByGroup(user, codeGroup);
        return res.status(httpStatus.OK).send(myGuessesList);

    } catch (error) {
        next(error);
    }
}


export default {
    createGuess,
    listMyGuessesByGroup,
    
}