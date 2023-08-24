import groupsRepositories from "../repositories/groupsRepositories.js";
import shortid from "shortid";
import errors from "../errors/index.js";


async function listGroups(userId:number) {
    return await groupsRepositories.listGroups(userId);    
}

async function myGroups(userId:number) {
    return await groupsRepositories.listMyGroups(userId);    
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

async function joinGroup(userId:number, groupId:number) {
    const groupExists = await groupsRepositories.findGroupById(groupId);
    if(!groupExists) throw errors.notFound();
    const isMember = await groupsRepositories.findMemberGroupRelation(userId, groupId);
    if(isMember) throw errors.conflict();
    await groupsRepositories.associateUserToGroup(userId, groupId);
    return;
}

async function rankingGroup(id:number) {
    if(!id || typeof(id) !== 'number') throw errors.notFound();
    const rankingList = await groupsRepositories.rankingGroup(id);
    return rankingList;    
}

async function rankingOverall() {
    const ranking = await groupsRepositories.rankingGeral();
    return ranking;    
}

export default  {
    listGroups,
    myGroups,
    createGroup,
    joinGroup,
    rankingGroup,
    rankingOverall,
}
