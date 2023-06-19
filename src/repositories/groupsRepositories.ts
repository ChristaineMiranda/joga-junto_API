import prisma from "../config/database.js";

async function listGroups() {
    return await prisma.group.findMany();    
}

async function createGroup(creatorId: number, codeGroup: string, name:string ) {
    return await prisma.group.create({
        data:{
            creatorId,
            codeGroup,
            name
        }
    });
}

async function findGroupByName(name:string) {
    return await prisma.group.findFirst({
        where: { name }
    });  
}

async function associateUserToGroup(userId:number, groupId:number) {
    await prisma.groupUser.create({
        data: {
            userId,
            groupId,
        }
    });
}

async function rankingGroup(groupId:number) {
    return await prisma.groupUser.findMany({
        where:{
            groupId
        },
        include: { User: true },
        orderBy: { score: "desc"}
    });
}

async function rankingGeral() {
    return await prisma.groupUser.findMany({
        include: { User: true },
        orderBy: { score: "desc" }
    });  
}

export default {
    listGroups,
    createGroup,
    findGroupByName,
    associateUserToGroup,
    rankingGroup, 
    rankingGeral
}