import prisma from "../config/database";

async function createGuess (userId: number, gameId:number, groupId:number, goalsFirstTeam:number, goalsSecondTeam:number, winner:string) {
    return await prisma.guess.create({
        data: {
            userId,
            gameId, 
            groupId,
            goalsFirstTeam,
            goalsSecondTeam,     
            winner
        }
    });
}

async function listGuessByUserId(userId:number) {
    return await prisma.guess.findMany({
        where:{ userId }
    })    
}

export default {
    createGuess,
    listGuessByUserId
}