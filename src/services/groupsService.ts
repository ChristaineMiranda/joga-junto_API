import groupsRepositories from "../repositories/groupsRepositories.js";
import shortid from "shortid";
import errors from "../errors/index.js";


async function listGroups() {
    return await groupsRepositories.listGroups();    
}

async function createGroup(userId:number, name:string) {
    if(!name) throw errors.incorrectFieldsError(["Name field cannot be empty"]);
    const nameExists = await groupsRepositories.findGroupByName(name);
    if(nameExists) throw errors.conflict();
    
    const codeGroup = shortid.generate();
    const newGroup = await groupsRepositories.createGroup(userId, codeGroup, name);
    await groupsRepositories.associateUserToGroup(userId, newGroup.id);
    return newGroup;
}

async function joinGroup(codeGroup:string, userId:number) {
    const groupExists = await groupsRepositories.findGroupByCode(codeGroup);
    if(!groupExists) throw errors.notFound();
    await groupsRepositories.associateUserToGroup(userId, groupExists.id);
    return;
}

async function rankingGroup(id:number) {
    if(!id || typeof(id) !== 'number') throw errors.notFound();
    const rankingList = await groupsRepositories.rankingGroup(id);
    return rankingList;    
}

async function rankingOverall() {
    const ranking = await groupsRepositories.rankingOverall();
    return ranking;    
}

export default  {
    listGroups,
    createGroup,
    joinGroup,
    rankingGroup,
    rankingOverall   
}