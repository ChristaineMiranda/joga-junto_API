import groupsRepositories from "../repositories/groupsRepositories.js";
import shortid from "shortid";
import errors from "../errors/index.js";


async function listGroups() {
    return await groupsRepositories.listGroups();    
}

async function createGroup(userId:number, name:string) {
    const nameExists = await groupsRepositories.findGroupByName(name);
    if(nameExists) throw errors.conflict();
    
    const codeGroup = shortid.generate();
    const newGroup = await groupsRepositories.createGroup(userId, codeGroup, name);
    await groupsRepositories.associateUserToGroup(userId, newGroup.id);
    return newGroup;
}

async function joinGroup(codeGroup:string, userId:number) {
    const groupExists = await groupsRepositories.findGroupByCode(codeGroup);
    if(!groupExists) throw errors.notFound;

    await groupsRepositories.associateUserToGroup(userId, groupExists.id);
    return;
}

export default  {
    listGroups,
    createGroup,
    joinGroup,
    
}