import { Game } from "@prisma/client";
import prisma from "../config/database.js";
import { GameInput, GameUpdate } from "../protocols/index.js";

async function findGameById(id: number) {
    return await prisma.game.findUnique({ where: { id } });
}

async function checkDuplicatedGame(firstTeam: string, secondTeam: string, dateTime: Date): Promise<boolean> {

    const firstDuplicated = await prisma.game.findFirst({
        where: {
            firstTeam,
            dateTime,
        }
    });
    const secondDuplicated = await prisma.game.findFirst({
        where: {
            secondTeam,
            dateTime
        }
    });

    return (!!firstDuplicated || !!secondDuplicated)
}

async function createGame(data: GameInput): Promise<Game> {
    return await prisma.game.create({
        data
    });
}

async function findAllGames() {
    return await prisma.game.findMany({
        orderBy: { dateTime: "desc" }
    });
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

async function findLastGames() {
    return await prisma.game.findMany({
        take: 9,
        orderBy: {
            dateTime: 'desc'
        }
    });
}



export default {
    findGameById,
    checkDuplicatedGame,
    createGame,
    findAllGames,
    updateGame,
    deleteGame,
    findLastGames,
}