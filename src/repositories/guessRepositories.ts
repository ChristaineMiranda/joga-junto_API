import prisma from "../config/database.js";

async function createGuess (userId: number, gameId:number, groupCode:string, goalsFirstTeam:number, goalsSecondTeam:number) {
    return await prisma.guess.create({
        data: {
            userId,
            gameId, 
            groupCode,
            goalsFirstTeam,
            goalsSecondTeam,     
        }
    });
}

async function listGuessByUserIdAndCodeGroup(userId:number, groupCode:string) {
    return await prisma.guess.findMany({
        where:{ userId, groupCode }
    });    
}

async function findDuplicatedGuess(userId:number, gameId:number, groupCode:string) {
    return await prisma.guess.findFirst({
        where: {
            userId, gameId, groupCode
        }
    });    
}

export default {
    createGuess,
    listGuessByUserIdAndCodeGroup,
    findDuplicatedGuess
}