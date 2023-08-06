import guessRepositories from "../repositories/guessRepositories.js";
import errors from "../errors/index.js";
import groupsRepositories from "../repositories/groupsRepositories.js";
import gamesRepository from "../repositories/gamesRepository.js";

async function createGuess(userId:number, idGame:number, codeGroup:string, goalsFirst:number, goalsSecond:number) {
    const goalsFirstTeam = Number(goalsFirst);
    const goalsSecondTeam = Number(goalsSecond);
    const gameId = Number(idGame);
    
    const gameExists = await gamesRepository.findGameById(gameId);
    if(!gameExists) throw errors.gameNotFound();
    
    const groupExists = await groupsRepositories.findGroupByCode(codeGroup);
    if(!groupExists) throw errors.notFound();

    const guessExists = await guessRepositories.findDuplicatedGuess(userId, gameId, codeGroup);
    if(guessExists) throw errors.conflict();

    const newGuess = await guessRepositories.createGuess(userId, gameId, codeGroup, goalsFirstTeam, goalsSecondTeam);
    return newGuess;
}

async function listAllMyGuessesByGroup(userId:number, codeGroup:string) {
    const groupExists = await groupsRepositories.findGroupByCode(codeGroup);
    if(!groupExists) throw errors.notFound();
    
    const myGuessesList = await guessRepositories.listGuessByUserIdAndCodeGroup(userId, codeGroup);
    return myGuessesList;
}


export default {
    createGuess,
    listAllMyGuessesByGroup,
    
}