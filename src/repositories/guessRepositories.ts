import prisma from "../config/database.js";

async function createGuess (userId: number, gameId:number, groupId:number, goalsFirstTeam:number, goalsSecondTeam:number) {
    return await prisma.guess.create({
        data: {
            userId,
            gameId, 
            groupId,
            goalsFirstTeam,
            goalsSecondTeam,     
        }
    });
}

async function listGuessByUserIdAndIdGroup(userId:number, groupId:number) {
    return await prisma.guess.findMany({
        where:{ userId, groupId }
    });    
}

async function findDuplicatedGuess(userId:number, gameId:number, groupId:number) {
    return await prisma.guess.findFirst({
        where: {
            userId, gameId, groupId
        }
    });    
}
async function findGuessByGameId(gameId:number){
    return await prisma.guess.findMany({
        where: {gameId}
    });    
}

async function updateGuess(id:number, data) {
    return await prisma.guess.update({
        where:{id},
        data
    });
}

export default {
    createGuess,
    listGuessByUserIdAndIdGroup,
    findDuplicatedGuess,
    findGuessByGameId,
    updateGuess
}