import { Game } from "@prisma/client";
import prisma from "../config/database.js";
import { GameRequest, GameUpdate } from "../protocols/index.js";

async function findGameById(id: number) {
    return await prisma.game.findUnique({ where: { id } });
}

async function checkDuplicatedGame(firstTeam: string, secondTeam: string, date: string): Promise<boolean> {

    const firstDuplicated = await prisma.game.findFirst({
        where: {
            firstTeam,
            date,
        }
    });
    const secondDuplicated = await prisma.game.findFirst({
        where: {
            secondTeam,
            date
        }
    });

    return (!!firstDuplicated || !!secondDuplicated)
}

async function createGame(data: GameRequest): Promise<Game> {
    return await prisma.game.create({
        data
    });
}

async function findAllGames() {
    return await prisma.game.findMany();
}

async function updateGame(id: number, data: GameUpdate) {
    return await prisma.game.update({
        where: { id },
        data
    });
}

async function deleteGame(id: number) {
    return await prisma.game.delete({ where: { id } });
}

export default {
    findGameById,
    checkDuplicatedGame,
    createGame,
    findAllGames,
    updateGame,
    deleteGame
}